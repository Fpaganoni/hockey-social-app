import { useQuery } from "@tanstack/react-query";
import { graphqlClient } from "@/lib/graphql-client";
import { GET_CLUBS } from "@/graphql/club/queries";
import { Club } from "@/types/models/club";

export function useClubs(initialData?: { clubs: Club[] }) {
  return useQuery<{ clubs: Club[] }>({
    queryKey: ["clubs"],
    queryFn: async () => graphqlClient.request(GET_CLUBS),
    initialData,
  });
}

export function useClub(id: string | null) {
  const { data, isLoading, error } = useQuery<{ clubs: Club[] }>({
    queryKey: ["clubs"],
    queryFn: async () => graphqlClient.request(GET_CLUBS),
    enabled: !!id,
  });

  const club = data?.clubs?.find((c) => c.id === id);

  return {
    data: club ? { club } : undefined,
    isLoading,
    error: error || (!club && data ? new Error("Club not found") : null),
  };
}
