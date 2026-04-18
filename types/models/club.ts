export interface Club {
  id: string;
  name: string;
  logo?: string;
  description?: string;
  city?: string;
  country?: string;
  isVerified?: boolean;
  members?: { id: string; name: string; avatar?: string; position?: string }[];
}

export type ClubBasic = Pick<Club, "id" | "name" | "logo">;
