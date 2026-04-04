/**
 * What: Integration tests for useFollowMutation / useUnfollowMutation.
 * Why: Follow/unfollow must invalidate BOTH "followers" and "following" query
 *      keys. If either is missed the UI shows stale follower counts — a silent
 *      prod bug that's hard to catch without this test.
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { useFollowMutation, useUnfollowMutation } from "@/hooks/useUsers";

const mockRequest = vi.fn();
vi.mock("@/lib/graphql-client", () => ({
  graphqlClient: { request: (...args: unknown[]) => mockRequest(...args) },
}));

type InvalidateArgs = { queryKey: string[] };

function makeWrapper(qc: QueryClient) {
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={qc}>{children}</QueryClientProvider>
  );
}

describe("useFollowMutation / useUnfollowMutation cache invalidation", () => {
  let qc: QueryClient;
  const invalidateSpy = vi.fn();

  beforeEach(() => {
    mockRequest.mockReset();
    invalidateSpy.mockReset();
    qc = new QueryClient({
      defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
    });
    // Spy on invalidateQueries to assert the exact keys hit
    vi.spyOn(qc, "invalidateQueries").mockImplementation((...args) => {
      invalidateSpy(...args);
      return Promise.resolve();
    });
  });

  const followVars = {
    followerType: "USER",
    followerId: "user-1",
    followingType: "USER",
    followingId: "user-2",
  };

  it("follow success invalidates BOTH followers and following keys", async () => {
    mockRequest.mockResolvedValueOnce({ follow: { id: "follow-1" } });
    const { result } = renderHook(() => useFollowMutation(), {
      wrapper: makeWrapper(qc),
    });
    act(() => result.current.mutate(followVars));
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const invalidatedKeys = invalidateSpy.mock.calls.map(
      (call: unknown[]) => (call[0] as InvalidateArgs).queryKey[0]
    );
    expect(invalidatedKeys).toContain("followers");
    expect(invalidatedKeys).toContain("following");
  });

  it("unfollow success invalidates BOTH followers and following keys", async () => {
    mockRequest.mockResolvedValueOnce({ unfollow: true });
    const { result } = renderHook(() => useUnfollowMutation(), {
      wrapper: makeWrapper(qc),
    });
    act(() => result.current.mutate(followVars));
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const invalidatedKeys = invalidateSpy.mock.calls.map(
      (call: unknown[]) => (call[0] as InvalidateArgs).queryKey[0]
    );
    expect(invalidatedKeys).toContain("followers");
    expect(invalidatedKeys).toContain("following");
  });
});
