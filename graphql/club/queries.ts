import { gql } from "graphql-request";

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
      isVerified
      website
      email
      phone
      instagram
      twitter
      facebook
      tiktok
      members {
        id
        role
        status
        joinedAt
        user {
          id
          username
          name
          avatar
          position
          role
        }
      }
    }
  }
`;
