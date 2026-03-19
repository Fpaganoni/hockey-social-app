"use client";

import { use } from "react";
import { Header } from "@/components/layout/header";
import { BottomNavigation } from "@/components/layout/bottom-navigation";
import { PublicUserProfilePage } from "@/components/pages/public-user-profile-page";
import { useAuthStore } from "@/stores/useAuthStore";
import { UserProfilePage } from "@/components/pages/user-profile-page";

interface PublicProfileRouteProps {
  params: Promise<{
    slug: string[];
  }>;
}

export default function PublicProfileRoute({ params }: PublicProfileRouteProps) {
  // Join the slug segments to reconstruct the full username (e.g. ["franco", "paganoni"] → "franco.paganoni")
  const { slug } = use(params);
  const username = slug.join(".");
  const { user: currentUser } = useAuthStore();

  const isOwnProfile = currentUser?.username === username;

  return (
    <>
      <Header title={isOwnProfile ? "My Profile" : username} />
      {isOwnProfile ? (
        <UserProfilePage isOwnProfile={true} />
      ) : (
        <PublicUserProfilePage username={username} />
      )}
      <BottomNavigation />
    </>
  );
}
