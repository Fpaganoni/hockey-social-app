import { gql } from "graphql-request";

// ============================================
// POST MUTATIONS
// ============================================

export const CREATE_POST = gql`
  mutation CreatePost($content: String!, $imageUrl: String) {
    createPost(content: $content, imageUrl: $imageUrl) {
      id
      content
      imageUrl
      createdAt
      userId
      user {
        id
        name
        avatar
      }
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost($id: ID!, $content: String, $imageUrl: String) {
    updatePost(id: $id, content: $content, imageUrl: $imageUrl) {
      id
      content
      imageUrl
      updatedAt
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`;

// ============================================
// LIKE MUTATIONS
// ============================================

export const LIKE_POST = gql`
  mutation LikePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      userId
      postId
    }
  }
`;

export const UNLIKE_POST = gql`
  mutation UnlikePost($postId: ID!) {
    unlikePost(postId: $postId) {
      id
    }
  }
`;

// ============================================
// COMMENT MUTATIONS
// ============================================

export const CREATE_COMMENT = gql`
  mutation CreateComment($postId: ID!, $content: String!) {
    createComment(postId: $postId, content: $content) {
      id
      content
      createdAt
      userId
      postId
      user {
        id
        name
        avatar
      }
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation DeleteComment($id: ID!) {
    deleteComment(id: $id) {
      id
    }
  }
`;

// ============================================
// FOLLOW MUTATIONS
// ============================================

export const FOLLOW_USER = gql`
  mutation FollowUser($userId: ID!) {
    followUser(userId: $userId) {
      id
      followerId
      followingId
    }
  }
`;

export const UNFOLLOW_USER = gql`
  mutation UnfollowUser($userId: ID!) {
    unfollowUser(userId: $userId) {
      id
    }
  }
`;

// ============================================
// USER MUTATIONS
// ============================================

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $name: String
    $bio: String
    $avatar: String
    $position: String
    $clubId: ID
  ) {
    updateUser(
      name: $name
      bio: $bio
      avatar: $avatar
      position: $position
      clubId: $clubId
    ) {
      id
      name
      bio
      avatar
      position
      clubId
    }
  }
`;

// ============================================
// TYPE DEFINITIONS FOR MUTATION VARIABLES
// ============================================

export interface CreatePostVariables {
  content: string;
  imageUrl?: string;
}

export interface UpdatePostVariables {
  id: string;
  content?: string;
  imageUrl?: string;
}

export interface DeletePostVariables {
  id: string;
}

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

export interface FollowUserVariables {
  userId: string;
}

export interface UpdateUserVariables {
  name?: string;
  bio?: string;
  avatar?: string;
  position?: string;
  clubId?: string;
}
