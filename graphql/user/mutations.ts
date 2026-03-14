import { gql } from "graphql-request";

// ============================================
// USER MUTATIONS
// ============================================

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export const REGISTER = gql`
  mutation Register(
    $email: String!
    $name: String!
    $username: String!
    $password: String!
    $role: String!
  ) {
    register(
      email: $email
      name: $name
      username: $username
      password: $password
      role: $role
    )
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $id: ID!
    $name: String
    $bio: String
    $avatar: String
    $position: String
    $clubId: ID
    $multimedia: [String!]
    $country: String
    $city: String
    $yearsOfExperience: Int
    $statistics: StatisticsInput
  ) {
    updateUser(
      id: $id
      name: $name
      bio: $bio
      avatar: $avatar
      position: $position
      clubId: $clubId
      multimedia: $multimedia
      country: $country
      city: $city
      yearsOfExperience: $yearsOfExperience
      statistics: $statistics
    ) {
      id
      name
      bio
      avatar
      position
      clubId
      multimedia
      country
      city
      yearsOfExperience
      trajectories {
        title
        organization
        period
        description
        startDate
        endDate
        isCurrent
      }
      statistics {
        gamesPlayed
        goals
        assists
      }
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
// CV MUTATIONS
// ============================================

export const UPLOAD_CV = gql`
  mutation UploadCV($userId: ID!, $base64: String!) {
    uploadCV(userId: $userId, base64: $base64)
  }
`;

export const DELETE_CV = gql`
  mutation DeleteCV($userId: ID!) {
    deleteCV(userId: $userId)
  }
`;
