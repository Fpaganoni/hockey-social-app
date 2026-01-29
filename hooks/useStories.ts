import { useQuery } from "@tanstack/react-query";
import { graphqlClient } from "@/lib/graphql-client";
import { GET_ACTIVE_STORIES } from "@/graphql/queries";

export interface Story {
  id: string;
  userId: string;
  imageUrl: string;
  text: string;
  createdAt: string;
  viewsCount: number;
  user: {
    id: string;
    name: string;
    username: string;
    avatar: string;
  };
}

interface ActiveStoriesResponse {
  activeStories: Story[];
}

/**
 * Hook to fetch active stories for a specific user
 */
export function useActiveStories(userId: string) {
  return useQuery<ActiveStoriesResponse>({
    queryKey: ["activeStories", userId],
    queryFn: async () => graphqlClient.request(GET_ACTIVE_STORIES, { userId }),
    enabled: !!userId, // Only run query if userId is provided
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
