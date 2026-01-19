import { useQuery } from "@tanstack/react-query";
import { graphqlClient } from "@/lib/graphql-client";
import { GET_POSTS, GET_POST } from "@/graphql/queries";
import { Post } from "@/types/models/post";

interface GetPostsVariables {
  limit?: number;
  offset?: number;
}

/**
 * Hook to fetch posts with pagination
 */
export function usePosts(variables?: GetPostsVariables) {
  return useQuery<{ posts: Post[] }>({
    queryKey: ["posts", variables],
    queryFn: async () => graphqlClient.request(GET_POSTS, variables),
  });
}

/**
 * Hook to fetch a single post by ID
 */
export function usePost(postId: string | null) {
  return useQuery<{ post: Post }>({
    queryKey: ["post", postId],
    queryFn: async () => graphqlClient.request(GET_POST, { id: postId }),
    enabled: !!postId,
  });
}

/**
 * Example usage in a component:
 *
 * function PostFeed() {
 *   const { data, isLoading, error, refetch } = usePosts({ limit: 10 });
 *
 *   if (isLoading) return <div>Loading posts...</div>;
 *   if (error) return <div>Error: {error.message}</div>;
 *
 *   return (
 *     <div>
 *       {data?.posts.map(post => (
 *         <div key={post.id}>
 *           <h3>{post.user.name}</h3>
 *           <p>{post.content}</p>
 *           <span>{post.likes.length} likes</span>
 *         </div>
 *       ))}
 *       <button onClick={() => refetch()}>Refresh</button>
 *     </div>
 *   );
 * }
 */
