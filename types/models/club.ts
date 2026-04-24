export interface ClubMember {
  id: string;
  role: string;
  status: string;
  joinedAt?: string;
  user: {
    id: string;
    username: string;
    name: string;
    avatar?: string;
    position?: string;
    role?: string;
  };
}

export interface Club {
  id: string;
  name: string;
  logo?: string;
  coverImage?: string;
  description?: string;
  city?: string;
  country?: string;
  isVerified?: boolean;
  verificationStatus?: "UNVERIFIED" | "PENDING" | "VERIFIED" | "REJECTED";
  verificationDoc?: string;
  website?: string;
  email?: string;
  phone?: string;
  instagram?: string;
  twitter?: string;
  facebook?: string;
  tiktok?: string;
  members?: ClubMember[];
}

export type ClubBasic = Pick<Club, "id" | "name" | "logo">;
