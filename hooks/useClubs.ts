import { useQuery } from "@tanstack/react-query";
import { graphqlClient } from "@/lib/graphql-client";
import { GET_CLUBS, GET_CLUB } from "@/graphql/club/queries";
import { Club } from "@/types/models/club";

export function useClubs(initialData?: { clubs: Club[] }) {
  return useQuery<{ clubs: Club[] }>({
    queryKey: ["clubs"],
    queryFn: async () => graphqlClient.request(GET_CLUBS),
    initialData,
  });
}

export function useClub(id: string | null) {
  return useQuery<{ club: Club }>({
    queryKey: ["club", id],
    queryFn: async () => graphqlClient.request(GET_CLUB, { id }),
    enabled: !!id,
  });
}
