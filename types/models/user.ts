import { Role, Position } from "../enums";
import { Club } from "./club";

// Tipos relacionados con User
export interface UserStats {
  gamesPlayed: number;
  goals: number;
  assists: number;
}

export interface TrajectoryItem {
  club: Club;
  period: string;
  description: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  role: Role;
  isEmailVerified: boolean;

  // Profile
  avatar?: string;
  bio?: string;
  position?: Position;
  country?: string;
  city?: string;

  // Relations
  clubId?: string;
  club?: Club;
  statistics?: UserStats;
  trajectories?: TrajectoryItem[];

  // Metadata (opcional)
  createdAt?: string;
  updatedAt?: string;
}

// Variantes para diferentes contextos
export type AuthUser = User;
export type UserBasic = Pick<User, "id" | "name" | "avatar" | "role">;
export type UserCard = Pick<
  User,
  "id" | "name" | "avatar" | "role" | "position"
>;
export type UserProfile = Omit<User, "email" | "isEmailVerified">;

// Para crear/actualizar
export type CreateUserInput = Omit<User, "id" | "createdAt" | "updatedAt">;
export type UpdateUserInput = Partial<Omit<User, "id" | "email" | "role">>;
