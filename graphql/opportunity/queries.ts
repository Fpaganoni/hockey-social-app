import { gql } from "graphql-request";

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
