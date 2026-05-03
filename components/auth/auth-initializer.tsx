"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { setAuthToken } from "@/lib/graphql-client";

/**
 * Syncs the persisted JWT token from Zustand (localStorage) to the graphqlClient
 * on every mount and whenever the token changes. Ensures auth header survives
 * page refreshes and tab switches.
 */
export function AuthInitializer() {
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    setAuthToken(token);
  }, [token]);

  return null;
}
