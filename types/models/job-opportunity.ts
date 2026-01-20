import { Club } from "./club";

export interface JobOpportunity {
  id: string;
  title: string;
  description: string;
  positionType: string;
  level: "professional" | "amateur";
  country: string;
  city: string;
  salary: number;
  currency: string;
  benefits: string[];
  status: "open" | "closed" | "filled";

  // Relations
  clubId: string;
  club: Club;

  // Metadata
  createdAt: string;
  updatedAt?: string;
}

// Variantes
export type JobOpportunityCard = Pick<
  JobOpportunity,
  | "id"
  | "title"
  | "positionType"
  | "level"
  | "city"
  | "country"
  | "club"
  | "salary"
  | "currency"
>;
export type JobOpportunityBasic = Pick<
  JobOpportunity,
  "id" | "title" | "description" | "status"
>;

// Para crear/actualizar
export type CreateJobOpportunityInput = Omit<
  JobOpportunity,
  "id" | "createdAt" | "updatedAt" | "club"
>;
export type UpdateJobOpportunityInput = Partial<
  Omit<JobOpportunity, "id" | "clubId" | "createdAt">
>;
