"use client";

import { AppShell } from "@/components/layout/app-shell";
import { UserProfilePage } from "@/components/pages/user-profile-page";
import { ClubProfilePage } from "@/components/pages/club-profile-page";
import { useAuthStore } from "@/stores/useAuthStore";

export default function ProfileRoute() {
  const { user } = useAuthStore();

  return (
    <AppShell title="Profile">
      {user?.role === "club" ? (
        <ClubProfilePage isOwnProfile={true} />
      ) : (
        <UserProfilePage isOwnProfile={true} />
      )}
    </AppShell>
  );
}
