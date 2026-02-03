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
