"use client";

import { AppShell } from "@/components/layout/app-shell";
import { PublicUserProfilePage } from "@/components/pages/public-user-profile-page";
import { useAuthStore } from "@/stores/useAuthStore";
import { UserProfilePage } from "@/components/pages/user-profile-page";

interface ProfileSlugWrapperProps {
  username: string;
}

export function ProfileSlugWrapper({ username }: ProfileSlugWrapperProps) {
  const { user: currentUser } = useAuthStore();
  const isOwnProfile = currentUser?.username === username;

  return (
    <AppShell title={isOwnProfile ? "My Profile" : username}>
      {isOwnProfile ? (
        <UserProfilePage isOwnProfile={true} />
      ) : (
        <PublicUserProfilePage username={username} />
      )}
    </AppShell>
  );
}
