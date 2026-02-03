import { gql } from "graphql-request";

// ============================================
// STORIES QUERIES
// ============================================

export const GET_ACTIVE_STORIES = gql`
  query GetActiveStories($userId: String!) {
    activeStories(userId: $userId) {
      id
      userId
      imageUrl
      text
      createdAt
      viewsCount
      user {
        id
        name
        username
        avatar
      }
    }
  }
`;
