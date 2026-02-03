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
