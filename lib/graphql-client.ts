import { GraphQLClient } from "graphql-request";

const endpoint =
  process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:4000/graphql";

export const graphqlClient = new GraphQLClient(endpoint, {
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper function to add authorization token if needed
export const setAuthToken = (token: string | null) => {
  if (token) {
    graphqlClient.setHeader("Authorization", `Bearer ${token}`);
  } else {
    graphqlClient.setHeader("Authorization", "");
  }
};
