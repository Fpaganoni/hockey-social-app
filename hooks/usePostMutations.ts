import { useMutation, useQueryClient } from "@tanstack/react-query";
import { graphqlClient } from "@/lib/graphql-client";
import {
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
  LIKE_POST,
  UNLIKE_POST,
  CREATE_COMMENT,
} from "@/graphql/post/mutations";
import { Post, Like, Comment } from "@/types/models/post";
import { Role } from "@/types/enums";
import { useAuthStore } from "@/stores/useAuthStore";

// type user = Pick<User, "id" | "name" | "avatar" | "email">;
type CreatePostVariables = Pick<Post, "content" | "imageUrl">;
type UpdatePostVariables = Pick<Post, "id" | "content" | "imageUrl">;
type DeletePostVariables = Pick<Post, "id">;
type LikePostVariables = { postId: string };
type CreateCommentVariables = { postId: string; content: string };

type PostMutationContext = {
  previousPosts?: { posts: Post[] };
};

/**
 * Hook to create a new post with optimistic updates
 */
export function useCreatePost() {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  if (!user) {
    throw new Error("User not found");
  }

  return useMutation<
    { createPost: Post },
    Error,
    CreatePostVariables,
    PostMutationContext
  >({
    mutationFn: async (variables) =>
      graphqlClient.request(CREATE_POST, variables),

    // Optimistic update: immediately add the post to the UI
    onMutate: async (newPost) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      // Snapshot previous value
      const previousPosts = queryClient.getQueryData<{ posts: Post[] }>(["posts"]);

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
 * Hook to like a post with optimistic update
 */
export function useLikePost() {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  return useMutation<{ likePost: any }, Error, { postId: string }>({
    // Backend requires userId — injected from auth store, not from caller
    mutationFn: async ({ postId }) =>
      graphqlClient.request(LIKE_POST, { postId, userId: user?.id }),

    onMutate: async ({ postId }) => {
      await queryClient.cancelQueries({ queryKey: ["post", postId] });
      const previousPost = queryClient.getQueryData<{ post: Post }>(["post", postId]);

      queryClient.setQueryData<{ post: Post }>([ "post", postId], (old) => {
        if (!old?.post || !user) return old;
        // Like type has no userId field — identify via user.id
        const alreadyLiked = old.post.likes?.some((l) => l.user?.id === user.id);
        if (alreadyLiked) return old;
        return {
          post: {
            ...old.post,
            likes: [
              ...old.post.likes,
              {
                id: `temp-${Date.now()}`,
                postId,
                userId: user.id,
                createdAt: new Date().toISOString(),
                user: {
                  id: user.id,
                  name: user.name,
                  avatar: user.avatar ?? null,
                  email: user.email,
                  username: user.username ?? "",
                  role: user.role,
                  isEmailVerified: user.isEmailVerified ?? false,
                },
              } as Like,
            ],
          },
        };
      });

      return { previousPost };
    },

    onError: (_err, { postId }, context: any) => {
      if (context?.previousPost) {
        queryClient.setQueryData(["post", postId], context.previousPost);
      }
    },

    onSuccess: (_, { postId }) => {
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

/**
 * Hook to unlike a post with optimistic update
 */
export function useUnlikePost() {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  return useMutation<{ unlikePost: any }, Error, { postId: string }>({
    mutationFn: async ({ postId }) =>
      graphqlClient.request(UNLIKE_POST, { postId }),

    onMutate: async ({ postId }) => {
      await queryClient.cancelQueries({ queryKey: ["post", postId] });
      const previousPost = queryClient.getQueryData<{ post: Post }>(["post", postId]);

      queryClient.setQueryData<{ post: Post }>([ "post", postId], (old) => {
        if (!old?.post || !user) return old;
        return {
          post: {
            ...old.post,
            // Like type uses user.id — filter by that
            likes: old.post.likes.filter((l) => l.user?.id !== user.id),
          },
        };
      });

      return { previousPost };
    },

    onError: (_err, { postId }, context: any) => {
      if (context?.previousPost) {
        queryClient.setQueryData(["post", postId], context.previousPost);
      }
    },

    onSuccess: (_, { postId }) => {
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

/**
 * Hook to comment on a post with optimistic update
 */
export function useCreateComment() {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  return useMutation<{ createComment: any }, Error, CreateCommentVariables>({
    // Backend requires userId — injected from auth store, not from caller
    mutationFn: async ({ postId, content }) =>
      graphqlClient.request(CREATE_COMMENT, { postId, userId: user?.id, content }),

    onMutate: async ({ postId, content }) => {
      await queryClient.cancelQueries({ queryKey: ["post", postId] });
      const previousPost = queryClient.getQueryData<{ post: Post }>(["post", postId]);

      queryClient.setQueryData<{ post: Post }>(["post", postId], (old) => {
        if (!old?.post || !user) return old;
        const optimisticComment = {
          id: `temp-${Date.now()}`,
          content,
          postId,
          userId: user.id,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          user: {
            id: user.id,
            name: user.name,
            avatar: user.avatar ?? null,
            email: user.email,
            username: user.username ?? "",
            role: user.role,
            isEmailVerified: user.isEmailVerified ?? false,
          },
        } as Comment;
        return {
          post: {
            ...old.post,
            comments: [...old.post.comments, optimisticComment],
          },
        };
      });

      return { previousPost };
    },

    onError: (_err, { postId }, context: any) => {
      if (context?.previousPost) {
        queryClient.setQueryData(["post", postId], context.previousPost);
      }
    },

    onSuccess: (_, { postId }) => {
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
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
