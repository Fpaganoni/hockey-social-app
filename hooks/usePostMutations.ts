import { useMutation, useQueryClient } from "@tanstack/react-query";
import { graphqlClient } from "@/lib/graphql-client";
import { CREATE_POST, UPDATE_POST, DELETE_POST } from "@/graphql/mutations";
import { Post } from "@/types/models/post";
import { Role } from "@/types/enums";
import { useAuthStore } from "@/stores/useAuthStore";

// type user = Pick<User, "id" | "name" | "avatar" | "email">;
type CreatePostVariables = Pick<Post, "content" | "imageUrl">;
type UpdatePostVariables = Pick<Post, "id" | "content" | "imageUrl">;
type DeletePostVariables = Pick<Post, "id">;

/**
 * Hook to create a new post with optimistic updates
 */
export function useCreatePost() {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  if (!user) {
    throw new Error("User not found");
  }

  return useMutation<{ createPost: Post }, Error, CreatePostVariables>({
    mutationFn: async (variables) =>
      graphqlClient.request(CREATE_POST, variables),

    // Optimistic update: immediately add the post to the UI
    onMutate: async (newPost) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      // Snapshot previous value
      const previousPosts = queryClient.getQueryData(["posts"]);

      // Optimistically update to the new value
      queryClient.setQueryData<{ posts: Post[] }>(["posts"], (old) => {
        if (!old) return old;

        const optimisticPost: Post = {
          id: `temp-${Date.now()}`,
          content: newPost.content,
          imageUrl: newPost.imageUrl,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          userId: user.id || "", // Replace with actual user ID
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            username: "",
            role: Role.PLAYER,
            isEmailVerified: false,
          },
          likes: [],
          comments: [],
        };

        return {
          posts: [optimisticPost, ...old.posts],
        };
      });

      return { previousPosts };
    },

    // On success, invalidate and refetch
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },

    // On error, roll back to previous value
    onError: (err, newPost, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(["posts"], context.previousPosts);
      }
    },
  });
}

/**
 * Hook to update an existing post
 */
export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation<{ updatePost: Post }, Error, UpdatePostVariables>({
    mutationFn: async (variables) =>
      graphqlClient.request(UPDATE_POST, variables),
    onSuccess: (data) => {
      // Invalidate specific post and posts list
      queryClient.invalidateQueries({ queryKey: ["post", data.updatePost.id] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

/**
 * Hook to delete a post
 */
export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation<
    { deletePost: { id: string } },
    Error,
    DeletePostVariables
  >({
    mutationFn: async (variables) =>
      graphqlClient.request(DELETE_POST, variables),
    onSuccess: () => {
      // Invalidate posts list
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

/**
 * Example usage in a component:
 *
 * function CreatePostForm() {
 *   const createPost = useCreatePost();
 *   const [content, setContent] = useState('');
 *
 *   const handleSubmit = (e: React.FormEvent) => {
 *     e.preventDefault();
 *     createPost.mutate(
 *       { content },
 *       {
 *         onSuccess: () => {
 *           setContent('');
 *           console.log('Post created!');
 *         },
 *         onError: (error) => {
 *           console.error('Failed to create post:', error);
 *         },
 *       }
 *     );
 *   };
 *
 *   return (
 *     <form onSubmit={handleSubmit}>
 *       <textarea
 *         value={content}
 *         onChange={(e) => setContent(e.target.value)}
 *         placeholder="What's on your mind?"
 *       />
 *       <button type="submit" disabled={createPost.isPending}>
 *         {createPost.isPending ? 'Posting...' : 'Post'}
 *       </button>
 *       {createPost.isError && (
 *         <p>Error: {createPost.error.message}</p>
 *       )}
 *     </form>
 *   );
 * }
 */
