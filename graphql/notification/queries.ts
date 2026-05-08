import { gql } from "graphql-request";

// ============================================
// NOTIFICATION QUERIES
// ============================================

export const GET_NOTIFICATIONS = gql`
  query GetNotifications($userId: ID!, $limit: Int, $offset: Int) {
    notifications(userId: $userId, limit: $limit, offset: $offset) {
      id
      type
      isRead
      message
      entityId
      entityType
      createdAt
      userId
      actor {
        id
        name
        avatar
      }
    }
  }
`;

export const GET_UNREAD_NOTIFICATIONS_COUNT = gql`
  query GetUnreadNotificationsCount($userId: ID!) {
    unreadNotificationsCount(userId: $userId)
  }
`;
