import { useQuery } from "@tanstack/react-query";
import { graphqlClient } from "@/lib/graphql-client";
import { GET_ACTIVE_STORIES, GET_USER_STORIES } from "@/graphql/story/queries";
import { Story } from "@/types/models/story";

interface ActiveStoriesResponse {
  activeStories: Story[];
}

interface UserStoriesResponse {
  userStories: Story[];
}

/**
 * Hook to fetch active stories from users the given user follows (feed)
 */
export function useActiveStories(userId: string) {
  return useQuery<ActiveStoriesResponse>({
    queryKey: ["activeStories", userId],
    queryFn: async () => graphqlClient.request(GET_ACTIVE_STORIES, { userId }),
    enabled: !!userId,
  });
}

/**
 * Hook to fetch the active stories of a specific user (for profile/avatar display)
 */
export function useUserStories(userId: string) {
  return useQuery<UserStoriesResponse>({
    queryKey: ["userStories", userId],
    queryFn: async () => graphqlClient.request(GET_USER_STORIES, { userId }),
    enabled: !!userId,
  });
}

/**
 * Example usage in a component:
 *
 * function StoriesCarousel() {
 *   const userId = useAuthStore((state) => state.user?.id);
 *   const { data, isLoading, error } = useActiveStories(userId || "");
 *
 *   if (isLoading) return <div>Loading stories...</div>;
 *   if (error) return <div>Error: {error.message}</div>;
 *
 *   return (
 *     <div>
 *       {data?.activeStories.map(story => (
 *         <div key={story.id}>
 *           <img src={story.user.avatar} alt={story.user.name} />
 *           <span>{story.user.name}</span>
 *         </div>
 *       ))}
 *     </div>
 *   );
 * }
 */
