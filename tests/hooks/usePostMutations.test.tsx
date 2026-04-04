/**
 * What: Integration tests for useCreatePost — optimistic update + rollback.
 * Why: This is the highest-risk mutation in the feed. A failed rollback would
 *      leave a ghost "temp-" post in the UI permanently. Also tests the early
 *      throw when the user is unauthenticated (hook called without login).
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { useCreatePost } from "@/hooks/usePostMutations";
import { useAuthStore } from "@/stores/useAuthStore";
import { mockUser } from "../test-utils";
import { Role } from "@/types/enums";
import type { Post } from "@/types/models/post";

const mockRequest = vi.fn();
vi.mock("@/lib/graphql-client", () => ({
  graphqlClient: { request: (...args: unknown[]) => mockRequest(...args) },
}));

const existingPost: Post = {
  id: "post-existing",
  content: "Existing post",
  imageUrl: undefined,
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z",
  userId: "user-1",
  user: {
    id: "user-1",
    name: "Franco Test",
    email: "franco@test.com",
    avatar: undefined,
    username: "franco_test",
    role: Role.PLAYER,
    isEmailVerified: true,
  },
  likes: [],
  comments: [],
};

describe("useCreatePost", () => {
  let qc: QueryClient;

  function makeWrapper() {
    return ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={qc}>{children}</QueryClientProvider>
    );
  }

  beforeEach(() => {
    mockRequest.mockReset();
    qc = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          // Keep cache alive during the test — gcTime: 0 evicts immediately on invalidate
          gcTime: 60_000,
          staleTime: 60_000,
        },
        mutations: { retry: false },
      },
    });
    qc.setQueryData(["posts"], { posts: [existingPost] });
    useAuthStore.setState({ user: mockUser, isLoggedIn: true });
  });

  it("throws synchronously when user is not authenticated", () => {
    useAuthStore.setState({ user: null, isLoggedIn: false });
    expect(() =>
      renderHook(() => useCreatePost(), { wrapper: makeWrapper() })
    ).toThrow("User not found");
  });

  it("optimistically prepends the new post before the server responds", async () => {
    // Keep server response pending so we can assert the optimistic state before onSuccess
    let resolveRequest!: (v: unknown) => void;
    mockRequest.mockImplementation(
      () => new Promise((res) => { resolveRequest = res; })
    );

    const { result } = renderHook(() => useCreatePost(), {
      wrapper: makeWrapper(),
    });

    act(() =>
      result.current.mutate({ content: "New post!", imageUrl: undefined })
    );

    // Optimistic update should be visible while request is pending
    await waitFor(() => {
      const cached = qc.getQueryData<{ posts: Post[] }>(["posts"]);
      expect(cached).toBeDefined();
      expect(cached!.posts[0].id).toMatch(/^temp-/);
      expect(cached!.posts[0].content).toBe("New post!");
    });

    // Resolve so the hook cleans up properly
    resolveRequest({ createPost: { ...existingPost, id: "post-new" } });
  });

  it("rolls back optimistic update on server error", async () => {
    mockRequest.mockRejectedValueOnce(new Error("500 Internal Server Error"));

    const { result } = renderHook(() => useCreatePost(), {
      wrapper: makeWrapper(),
    });

    act(() =>
      result.current.mutate({ content: "Will fail", imageUrl: undefined })
    );

    await waitFor(() => expect(result.current.isError).toBe(true));

    // After rollback: the temp post is gone, only the seeded post remains
    await waitFor(() => {
      const cached = qc.getQueryData<{ posts: Post[] }>(["posts"]);
      expect(cached).toBeDefined();
      expect(cached!.posts).toHaveLength(1);
      expect(cached!.posts[0].id).toBe("post-existing");
    });
  });
});
