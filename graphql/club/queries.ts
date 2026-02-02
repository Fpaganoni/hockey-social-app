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
      members {
        id
        name
        avatar
        position
      }
    }
  }
`;
