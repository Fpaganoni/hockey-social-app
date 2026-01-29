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
    }
  }
`;

export const GET_USER_FOR_LOGIN = gql`
  query GetUserForLogin($id: String!) {
    user(id: $id) {
      id
      email
      name
      username
      avatar
      bio
      position
      role
      clubId
      country
      city
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
        club {
          name
          logo
        }
        period
        description
        title
      }
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: String!) {
    user(id: $id) {
      id
      email
      name
      avatar
      bio
      position
      clubId
      club {
        id
        name
        logo
      }
      posts {
        id
        content
        createdAt
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
    }
  }
`;

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

// ============================================
// CLUB QUERIES
// ============================================

export const GET_CLUBS = gql`
  query GetClubs {
    clubs {
      id
      name
      logo
      description
      city
      country
    }
  }
`;

export const GET_CLUB = gql`
  query GetClub($id: ID!) {
    club(id: $id) {
      id
      name
      logo
      description
      city
      country
      members {
        id
        name
        avatar
        position
      }
    }
  }
`;

/// ============================================
/// OPPORTUNITIES QUERIES
/// ============================================

export const GET_JOB_OPPORTUNITIES = gql`
  query {
    jobOpportunities {
      id
      title
      description
      positionType
      club {
        name
        city
        country
        isVerified
      }
      level
      country
      city
      salary
      currency
      benefits
      status
      createdAt
    }
  }
`;

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
