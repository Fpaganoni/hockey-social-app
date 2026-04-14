import { gql } from "graphql-request";

/// ============================================
/// JOB OPPORTUNITY MUTATIONS
/// ============================================

export const APPLY_FOR_JOB = gql`
  mutation ApplyForJob(
    $jobOpportunityId: String!
    $userId: String!
    $coverLetter: String
    $resumeUrl: String
  ) {
    applyForJob(
      jobOpportunityId: $jobOpportunityId
      userId: $userId
      coverLetter: $coverLetter
      resumeUrl: $resumeUrl
    ) {
      id
      status
      appliedAt
      updatedAt
    }
  }
`;
