import { gql } from "graphql-request";

// ============================================
// POST QUERIES
// ============================================

export const GET_POSTS = gql`
  query GetPosts($limit: Int, $offset: Int) {
    posts(limit: $limit, offset: $offset) {
      id
      content
      imageUrl
      createdAt
      updatedAt
      userId
      user {
        id
        name
        username
        avatar
        role
      }
      likes {
        id
      }
      comments {
        id
        content
        userId
        user {
          id
          name
          avatar
        }
      }
    }
  }
`;

export const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      content
      imageUrl
      createdAt
      updatedAt
      userId
      user {
        id
        name
        avatar
      }
      likes {
        id
        userId
        user {
          id
          name
        }
      }
      comments {
        id
        content
        createdAt
        userId
        user {
          id
          name
          avatar
        }
      }
    }
  }
`;
