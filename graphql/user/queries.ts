import { gql } from "graphql-request";

// ============================================
// USER QUERIES
// ============================================

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      email
      name
      avatar
      bio
      position
      clubId
      cvUrl
    }
  }
`;

export const GET_USER_FOR_LOGIN = gql`
  query GetUserForLogin($id: ID!) {
    user(id: $id) {
      id
      email
      name
      username
      avatar
      coverImage
      bio
      position
      role
      clubId
      country
      city
      cvUrl
      multimedia
      club {
        name
        logo
      }
      statistics {
        gamesPlayed
        goals
        assists
      }
      trajectories {
        title
        organization
        period
        description
        startDate
        endDate
        isCurrent
        club {
          name
          logo
        }
      }
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      email
      name
      avatar
      coverImage
      bio
      position
      clubId
      cvUrl
      multimedia
      club {
        id
        name
        logo
      }
      followers {
        id
        name
        avatar
      }
      following {
        id
        name
        avatar
      }
      trajectories {
        title
        organization
        period
        description
        startDate
        endDate
        isCurrent
        club {
          name
          logo
        }
      }
    }
  }
`;

// ============================================
// USER FOLLOWERS/FOLLOWING QUERIES
// ============================================

export const GET_FOLLOWERS = gql`
  query GetFollowers($entityType: String!, $entityId: String!) {
    followers(entityType: $entityType, entityId: $entityId) {
      id
      followerType
      followerId
      createdAt
    }
  }
`;

export const GET_FOLLOWING = gql`
  query GetFollowing($entityType: String!, $entityId: String!) {
    following(entityType: $entityType, entityId: $entityId) {
      id
      followingType
      followingId
      createdAt
    }
  }
`;

export const GET_USER_BY_USERNAME = gql`
  query GetUserByUsername($username: String!) {
    getUserByUsername(username: $username) {
      id
      email
      name
      username
      avatar
      coverImage
      bio
      position
      role
      country
      city
      cvUrl
      multimedia
      statistics {
        gamesPlayed
        goals
        assists
      }
      trajectories {
        title
        organization
        period
        description
        startDate
        endDate
        isCurrent
        club {
          name
          logo
        }
      }
    }
  }
`;

export const EXPLORE_USERS_QUERY = gql`
  query ExploreUsers($role: String!, $limit: Int!) {
    exploreUsers(role: $role, limit: $limit) {
      id
      name
      role
      position
      country
      city
      avatar
      isVerified
      bio
      level
      cvUrl
    }
  }
`;
