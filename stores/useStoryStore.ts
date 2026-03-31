import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StoryState {
  seenStories: string[];
  markAsSeen: (storyId: string) => void;
  clearSeen: () => void;
}

export const useStoryStore = create<StoryState>()(
  persist(
    (set) => ({
      seenStories: [],
      markAsSeen: (storyId: string) =>
        set((state) => ({
          seenStories: state.seenStories.includes(storyId)
            ? state.seenStories
            : [...state.seenStories, storyId],
        })),
      clearSeen: () => set({ seenStories: [] }),
    }),
    {
      name: "stories-storage",
    }
  )
);
