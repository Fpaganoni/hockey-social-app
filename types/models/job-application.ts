import { User } from "./user";
import { JobOpportunity } from "./job-opportunity";

export type ApplicationStatus =
  | "PENDING"
  | "UNDER_REVIEW"
  | "ACCEPTED"
  | "REJECTED"
  | "WITHDRAWN";

export interface JobApplication {
  id: string;
  jobOpportunityId: string;
  userId: string;
  status: ApplicationStatus;
  coverLetter?: string;
  resumeUrl?: string;
  appliedAt: string;
  updatedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  notes?: string;

  // Relations
  user?: User;
  jobOpportunity?: JobOpportunity;
}

export type CreateJobApplicationInput = Pick<
  JobApplication,
  "jobOpportunityId" | "userId" | "coverLetter" | "resumeUrl"
>;

export type JobApplicationResponse = Pick<
  JobApplication,
  "id" | "status" | "appliedAt" | "updatedAt"
>;
