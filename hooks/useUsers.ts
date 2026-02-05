import { useQuery, useMutation } from "@tanstack/react-query";
import { graphqlClient } from "@/lib/graphql-client";
import { GET_USERS, GET_USER } from "@/graphql/user/queries";
import { LOGIN, REGISTER } from "@/graphql/user/mutations";
import { GET_FOLLOWERS, GET_FOLLOWING } from "@/graphql/user/queries";
import {
  LoginVariables,
  LoginResponse,
  RegisterVariables,
  RegisterResponse,
} from "@/types/models/user";
import {
  User,
  FollowUserResponse,
  FollowUserVariables,
  FollowingUserResponse,
} from "@/types/models/user";

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

// ==================
// FOLLOW USER
// ==================

export function useFollowUser(entityType: string, entityId: string) {
  return useQuery<FollowUserResponse, Error>({
    queryKey: ["followers", entityType, entityId],
    queryFn: async () =>
      graphqlClient.request(GET_FOLLOWERS, { entityType, entityId }),
  });
}

// ==================
// FOLLOWING USER
// ==================

export function useFollowingUser(entityType: string, entityId: string) {
  return useQuery<FollowingUserResponse, Error>({
    queryKey: ["following", entityType, entityId],
    queryFn: async () =>
      graphqlClient.request(GET_FOLLOWING, { entityType, entityId }),
  });
}
