"use client";

import { useState } from "react";
import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileTabs } from "@/components/profile/profile-tabs";

interface UserProfilePageProps {
  isOwnProfile?: boolean;
}

export function UserProfilePage({
  isOwnProfile = false,
}: UserProfilePageProps) {
  const [activeTab, setActiveTab] = useState("trajectory");

  // Demo player data
  const playerData = {
    name: "Fiorela Tirabassi",
    role: "Player",
    position: "Central Defender",
    country: "🇮🇹",
    bio: "Passionate field hockey player with 10+ years of experience. Love competing at the highest level.",
    stats: {
      gamesPlayed: 156,
      goals: 38,
      assists: 6,
    },
    trajectory: [
      {
        club: "Duendes Rugby Club AR",
        period: "2004 - Present",
        description:
          "Beginning of my career as a Defender - I started playing field hockey at the age of 5.",
      },
      {
        club: "Polisportiva Valverde IT",
        period: "2023 - 2024",
        description:
          "First international experience - First season, promotion A1 => Elite - Second season, 2nd position Elite.",
      },
      {
        club: "Old Club de Liege BE",
        period: "2024 - 2025",
        description: "First experience in Belgium - A1 level.",
      },
    ],
  };

  // Demo club data
  const clubData = {
    name: "HC Amsterdam",
    role: "Club",
    position: "Elite League",
    country: "🇳🇱",
    bio: "Top-tier field hockey club based in Amsterdam. Home of champions with 5+ national titles.",
    stats: {
      gamesPlayed: 28,
      goals: 145,
      assists: 89,
    },
    trajectory: [
      {
        club: "National Championship 2024",
        period: "2024",
        description:
          "Won the national championship with outstanding team performance",
      },
      {
        club: "European Cup 2023",
        period: "2023",
        description: "Reached semi-finals of the European Field Hockey Cup",
      },
    ],
  };

  const userData = isOwnProfile ? playerData : clubData;

  return (
    <main className="max-w-2xl mx-auto mb-24">
      <ProfileHeader {...userData} isOwnProfile={isOwnProfile} />
      <ProfileTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userData={userData}
      />
    </main>
  );
}
