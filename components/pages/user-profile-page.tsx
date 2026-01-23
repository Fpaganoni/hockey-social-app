"use client";

import { useState } from "react";
import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileTabs } from "@/components/profile/profile-tabs";
import { useAuthStore } from "@/stores/useAuthStore";

interface UserProfilePageProps {
  isOwnProfile?: boolean;
}

export function UserProfilePage({
  isOwnProfile = false,
}: UserProfilePageProps) {
  const [activeTab, setActiveTab] = useState("trajectory");
  const { user } = useAuthStore();

  if (!user) {
    return <div>PLEASE LOGIN</div>;
  }

  const userData = {
    name: user.name,
    role: user.role,
    position: user.position,
    country: user.country,
    avatar: user.avatar || "/user.png",
    bio: user.bio,
    stats: user.statistics || { gamesPlayed: 0, goals: 0, assists: 0 },
    trajectories:
      user.trajectories?.map((t) => ({
        club: t.club,
        period: t.period,
        description: t.description,
        title: t.title,
      })) || [],
  };

  return (
    <main className="bg-overlay max-w-2xl mx-auto pb-24">
      <ProfileHeader {...userData} />
      <ProfileTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userData={userData}
      />
    </main>
  );
}
