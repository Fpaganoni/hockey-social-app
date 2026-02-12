import { useQuery } from "@tanstack/react-query";
import { EXPLORE_USERS_QUERY } from "@/graphql/user/queries";
import { graphqlClient } from "@/lib/graphql-client";
import { ExploreUser } from "@/types/models/user";

interface ExploreUsersResponse {
  exploreUsers: ExploreUser[];
}

export function useExploreUsers(role: string, limit: number) {
  return useQuery<ExploreUsersResponse>({
    queryKey: ["explore", role, limit],
    queryFn: () =>
      graphqlClient.request<ExploreUsersResponse>(EXPLORE_USERS_QUERY, {
        role,
        limit,
      }),
  });
}
