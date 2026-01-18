export interface Club {
  id: string;
  name: string;
  logo?: string;
  description?: string;
  city?: string;
  country?: string;
  isVerified?: boolean;
}

export type ClubBasic = Pick<Club, "id" | "name" | "logo">;
