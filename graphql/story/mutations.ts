import { gql } from "graphql-request";

// ============================================
// STORY MUTATIONS
// ============================================

export const VIEW_STORY = gql`
  mutation ViewStory($storyId: String!, $userId: String!) {
    viewStory(storyId: $storyId, userId: $userId) {
      id
      viewedAt
    }
  }
`;

export const CREATE_STORY = gql`
  mutation CreateStory($userId: String!, $imageUrl: String, $videoUrl: String, $text: String) {
    createStory(userId: $userId, imageUrl: $imageUrl, videoUrl: $videoUrl, text: $text) {
      id
      imageUrl
      videoUrl
      text
      expiresAt
      createdAt
      userId
      user {
        id
        name
        avatar
        username
      }
      viewsCount
    }
  }
`;
