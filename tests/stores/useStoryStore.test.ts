/**
 * What: Unit tests for useStoryStore (Zustand + persist).
 * Why: The deduplication guard (markAsSeen idempotency) is a correctness
 *      invariant — a stale re-render must not flip a story back to "unseen".
 */
import { describe, it, expect, beforeEach } from "vitest";
import { act } from "react";
import { useStoryStore } from "@/stores/useStoryStore";

function resetStore() {
  useStoryStore.setState({ seenStories: [] });
}

describe("useStoryStore", () => {
  beforeEach(resetStore);

  it("starts with empty seenStories", () => {
    expect(useStoryStore.getState().seenStories).toEqual([]);
  });

  it("markAsSeen() adds a storyId", () => {
    act(() => useStoryStore.getState().markAsSeen("story-1"));
    expect(useStoryStore.getState().seenStories).toContain("story-1");
  });

  it("markAsSeen() is idempotent — no duplicates on repeated calls", () => {
    act(() => {
      useStoryStore.getState().markAsSeen("story-1");
      useStoryStore.getState().markAsSeen("story-1");
      useStoryStore.getState().markAsSeen("story-1");
    });
    const { seenStories } = useStoryStore.getState();
    expect(seenStories.filter((id) => id === "story-1")).toHaveLength(1);
  });

  it("markAsSeen() tracks multiple distinct stories independently", () => {
    act(() => {
      useStoryStore.getState().markAsSeen("story-1");
      useStoryStore.getState().markAsSeen("story-2");
    });
    expect(useStoryStore.getState().seenStories).toEqual(["story-1", "story-2"]);
  });

  it("clearSeen() resets the list completely", () => {
    act(() => {
      useStoryStore.getState().markAsSeen("story-1");
      useStoryStore.getState().markAsSeen("story-2");
      useStoryStore.getState().clearSeen();
    });
    expect(useStoryStore.getState().seenStories).toEqual([]);
  });
});
