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

// Backend requires userId as a mandatory argument.
// Like type only exposes: id, user { id name avatar }
export const LIKE_POST = gql`
  mutation LikePost($postId: ID!, $userId: ID!) {
    likePost(postId: $postId, userId: $userId) {
      id
      user {
        id
        name
        avatar
      }
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

// Backend requires userId as a mandatory argument.
// Return only safe fields: id, content, createdAt, user object
export const CREATE_COMMENT = gql`
  mutation CreateComment($postId: ID!, $userId: ID!, $content: String!) {
    createComment(postId: $postId, userId: $userId, content: $content) {
      id
      content
      createdAt
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
