"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { setAuthToken } from "@/lib/graphql-client";
import { useNotificationSocket } from "@/hooks/useNotificationSocket";

export function AuthInitializer() {
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    setAuthToken(token);
  }, [token]);

  useNotificationSocket();

  return null;
}
