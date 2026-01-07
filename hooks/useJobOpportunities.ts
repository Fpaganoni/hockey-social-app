import { useQuery } from "@tanstack/react-query";
import { graphqlClient } from "@/lib/graphql-client";
import { GET_JOB_OPPORTUNITIES } from "@/graphql/queries";
import { JobOpportunity } from "@/graphql/queries";

/**
 * Hook to fetch job opportunities with pagination
 */
interface GetJobOpportunitiesVariables {
  limit?: number;
  offset?: number;
}

export function useJobOpportunities(variables?: GetJobOpportunitiesVariables) {
  return useQuery<{ jobOpportunities: JobOpportunity[] }>({
    queryKey: ["jobOpportunities", variables],
    queryFn: async () =>
      graphqlClient.request(GET_JOB_OPPORTUNITIES, variables),
  });
}
