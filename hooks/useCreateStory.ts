import { useMutation, useQueryClient } from "@tanstack/react-query";
import { graphqlClient } from "@/lib/graphql-client";
import { CREATE_STORY } from "@/graphql/story/mutations";
import { Story } from "@/types/models/story";
import { useAuthStore } from "@/stores/useAuthStore";

type CreateStoryVariables = {
  imageUrl?: string;
  videoUrl?: string;
  text?: string;
};

type StoryMutationContext = {
  previousStories?: { activeStories: Story[] };
};

/**
 * Hook to create a new story with optimistic updates
 * Requires at least one of: imageUrl, videoUrl, or text
 */
export function useCreateStory() {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  if (!user) {
    throw new Error("User not found");
  }

  return useMutation<
    { createStory: Story },
    Error,
    CreateStoryVariables,
    StoryMutationContext
  >({
    mutationFn: async (variables) => {
      if (!variables.imageUrl && !variables.videoUrl && !variables.text) {
        throw new Error("Story must have at least an image, video, or text");
      }
      return graphqlClient.request(CREATE_STORY, {
        userId: user.id,
        ...variables,
      });
    },

    // Optimistic update: immediately add the story to the UI
    onMutate: async (newStory) => {
      await queryClient.cancelQueries({ queryKey: ["activeStories", user.id] });

      const previousStories = queryClient.getQueryData<{ activeStories: Story[] }>([
        "activeStories",
        user.id,
      ]);

      queryClient.setQueryData<{ activeStories: Story[] }>(
        ["activeStories", user.id],
        (old) => {
          if (!old) return old;

          const optimisticStory: Story = {
            id: `temp-${Date.now()}`,
            imageUrl: newStory.imageUrl,
            text: newStory.text || "",
            createdAt: new Date().toISOString(),
            userId: user.id,
            user: {
              id: user.id,
              name: user.name,
              username: user.username || "",
              avatar: user.avatar || "",
            },
            viewsCount: 0,
          };

          return {
            activeStories: [optimisticStory, ...old.activeStories],
          };
        }
      );

      return { previousStories };
    },

    // On success, invalidate and refetch
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activeStories", user.id] });
    },

    // On error, roll back
    onError: (err, newStory, context) => {
      if (context?.previousStories) {
        queryClient.setQueryData(
          ["activeStories", user.id],
          context.previousStories
        );
      }
    },
  });
}
