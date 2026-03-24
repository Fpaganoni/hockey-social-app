import { Role, Position } from "../enums";
import { Club } from "./club";
import { Post } from "./post";

// Tipos relacionados con User
export interface UserStats {
  gamesPlayed: number;
  goals: number;
  assists: number;
}

export interface TrajectoryItem {
  id?: string;
  title: string;
  organization?: string;
  period: string;
  description: string;
  startDate?: string;
  endDate?: string;
  isCurrent?: boolean;
  order?: number;
  club?: Club;
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
  coverImage?: string;
  bio?: string;
  position?: Position;
  country?: string;
  city?: string;
  level?: string;
  yearsOfExperience?: number;
  cvUrl?: string;
  multimedia?: string[];

  // Relations
  clubId?: string;
  club?: Club;
  statistics?: UserStats;
  trajectories?: TrajectoryItem[];
  posts?: Post[];

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

// Para explore/discovery
export type ExploreUser = Pick<
  User,
  | "id"
  | "name"
  | "role"
  | "position"
  | "country"
  | "city"
  | "avatar"
  | "bio"
  | "level"
> & {
  isVerified?: boolean; // Este campo no está en User principal, lo agregamos aquí
};

// Para crear/actualizar
export type CreateUserInput = Omit<User, "id" | "createdAt" | "updatedAt">;
export type UpdateUserInput = Partial<Omit<User, "id" | "email" | "role">>;

// ============================================
// TYPE DEFINITIONS FOR MUTATION VARIABLES
// ===========================================

export interface FollowMutationVariables {
  followerType: string;
  followerId: string;
  followingType: string;
  followingId: string;
}

export interface UpdateUserVariables {
  id: string;
  name?: string;
  username?: string;
  bio?: string;
  avatar?: string;
  coverImage?: string;
  position?: string;
  clubId?: string;
  cvUrl?: string;
  multimedia?: string[];
  country?: string;
  city?: string;
  yearsOfExperience?: number;
  statistics?: {
    gamesPlayed?: number;
    goals?: number;
    assists?: number;
  };
  trajectories?: any[];
}

export interface UploadCvVariables {
  userId: string;
  base64: string;
}

export interface UploadCvResponse {
  uploadCV: string; // returns the public cvUrl
}

export interface DeleteCvVariables {
  userId: string;
}

export interface DeleteCvResponse {
  deleteCV: boolean;
}

export interface LoginVariables {
  email: string;
  password: string;
}

export interface LoginResponse {
  login: string;
}

export interface RegisterVariables {
  email: string;
  name: string;
  username: string;
  password: string;
  role: string;
}

export interface RegisterResponse {
  register: string;
}

// ============================================
// TYPE DEFINITIONS FOR QUERY VARIABLES
// ============================================

type Followers = {
  id: string;
  followerType: string;
  followerId: string;
  followingType: string;
  followingId: string;
  createdAt: string;
};
export interface FollowUserResponse {
  followers: Followers[];
}

type Following = {
  id: string;
  followingType: string;
  followingId: string;
  followerType: string;
  followerId: string;
  createdAt: string;
};

export interface FollowingUserResponse {
  following: Following[];
}

export interface FollowQueryVariables {
  entityType: string;
  entityId: string;
}
