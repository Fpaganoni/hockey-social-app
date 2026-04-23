import { useMutation, useQueryClient } from "@tanstack/react-query";
import { graphqlClient } from "@/lib/graphql-client";
import { REQUEST_CLUB_VERIFICATION } from "@/graphql/club/mutations";
import { Club } from "@/types/models/club";

type RequestVerificationVariables = { clubId: string; documentUrl: string };

type ClubMutationContext = {
  previousClub?: { club: Club };
};

export function useRequestClubVerification() {
  const queryClient = useQueryClient();

  return useMutation<
    { requestClubVerification: Club },
    Error,
    RequestVerificationVariables,
    ClubMutationContext
  >({
    mutationFn: async (variables) =>
      graphqlClient.request(REQUEST_CLUB_VERIFICATION, variables),

    onMutate: async ({ clubId }) => {
      await queryClient.cancelQueries({ queryKey: ["club", clubId] });

      const previousClub = queryClient.getQueryData<{ club: Club }>([
        "club",
        clubId,
      ]);

      queryClient.setQueryData<{ club: Club }>(["club", clubId], (old) => {
        if (!old) return old;
        return {
          club: { ...old.club, verificationStatus: "PENDING" },
        };
      });

      return { previousClub };
    },

    onSuccess: (data, { clubId }) => {
      queryClient.setQueryData<{ club: Club }>(["club", clubId], {
        club: data.requestClubVerification,
      });
    },

    onError: (err, { clubId }, context) => {
      if (context?.previousClub) {
        queryClient.setQueryData(["club", clubId], context.previousClub);
      }
    },
  });
}
