import { useQuery, useMutation } from "@tanstack/react-query";
import { graphqlClient } from "@/lib/graphql-client";
import { GET_USERS, GET_USER } from "@/graphql/queries";
import { LOGIN, REGISTER } from "@/graphql/mutations";
import {
  LoginVariables,
  LoginResponse,
  RegisterVariables,
  RegisterResponse,
} from "@/graphql/mutations";
import { User } from "@/types/models/user";

/**
 * Hook to fetch all users
 */
export function useUsers() {
  return useQuery<{ users: User[] }>({
    queryKey: ["users"],
    queryFn: async () => graphqlClient.request(GET_USERS),
  });
}

/**
 * Hook to fetch a single user by ID
 */
export function useUser(userId: string | null) {
  return useQuery<{ user: User }>({
    queryKey: ["user", userId],
    queryFn: async () => graphqlClient.request(GET_USER, { id: userId }),
    // Only run query if userId is provided
    enabled: !!userId,
  });
}

/* login user */

export function useUserLogin() {
  return useMutation<LoginResponse, Error, LoginVariables>({
    mutationFn: async (variables) => graphqlClient.request(LOGIN, variables),
  });
}

/**
 * Register user
 */
export function useUserRegister() {
  return useMutation<RegisterResponse, Error, RegisterVariables>({
    mutationFn: async (variables) => graphqlClient.request(REGISTER, variables),
  });
}

/**
 * Example usage in a component:
 *
 * function UserList() {
 *   const { data, isLoading, error } = useUsers();
 *
 *   if (isLoading) return <div>Loading users...</div>;
 *   if (error) return <div>Error: {error.message}</div>;
 *
 *   return (
 *     <div>
 *       {data?.users.map(user => (
 *         <div key={user.id}>{user.name}</div>
 *       ))}
 *     </div>
 *   );
 * }
 */
