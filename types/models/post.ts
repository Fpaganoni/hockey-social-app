import { User } from "./user";

export interface Comment {
  id: string;
  content: string;
  postId: string;
  userId: string;
  user: User;
  createdAt: string;
  updatedAt: string;
}

export interface Like {
  id: string;
  postId: string;
  userId: string;
  user?: User;
  createdAt: string;
}

export interface Post {
  id: string;
  content: string;
  imageUrl?: string;
  images?: string[];
  videoUrl?: string;
  userId: string;
  clubId?: string;
  isClubPost?: boolean;
  visibility?: "public" | "private" | "friends";
  isPinned?: boolean;

  // Relations
  user: User;
  comments: Comment[];
  likes: Like[];
  likesCount?: number;

  // Metadata
  createdAt: string;
  updatedAt: string;
}

// Variantes
export type PostBasic = Pick<Post, "id" | "content" | "imageUrl" | "createdAt">;
export type PostWithUser = Pick<
  Post,
  "id" | "content" | "imageUrl" | "createdAt" | "user"
>;

// Para crear/actualizar
export type CreatePostInput = Pick<Post, "content" | "imageUrl" | "userId">;
export type UpdatePostInput = Partial<Pick<Post, "content" | "imageUrl">>;

// ============================================
// TYPE DEFINITIONS FOR MUTATION VARIABLES
// ===========================================

export interface LikePostVariables {
  postId: string;
}

export interface CreateCommentVariables {
  postId: string;
  content: string;
}

export interface DeleteCommentVariables {
  id: string;
}
