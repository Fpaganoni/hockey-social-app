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

export const GET_USER = gql`
  query GetUser($id: ID!) {
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

// ============================================
// TYPE DEFINITIONS (adjust based on your schema)
// ============================================

export interface User {
  id: string;
  email: string;
  name: string;
  username?: string;
  avatar?: string;
  bio?: string;
  position?: string;
  role?: string;
  clubId?: string;
  club?: Club;
  posts?: Post[];
  followers?: User[];
  following?: User[];
}

export interface Post {
  id: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: User;
  likes: Like[];
  comments: Comment[];
}

export interface Club {
  id: string;
  name: string;
  logo?: string;
  description?: string;
  city?: string;
  country?: string;
  members?: User[];
}

export interface Like {
  id: string;
  userId: string;
  user?: User;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  userId: string;
  user: User;
}
