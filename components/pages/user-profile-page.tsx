"use client"

import { useState } from "react"
import { ProfileHeader } from "@/components/profile/profile-header"
import { ProfileTabs } from "@/components/profile/profile-tabs"

interface UserProfilePageProps {
  isOwnProfile?: boolean
}

export function UserProfilePage({ isOwnProfile = false }: UserProfilePageProps) {
  const [activeTab, setActiveTab] = useState("trajectory")

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
        club: "HC Amsterdam",
        period: "2022 - Present",
        description: "Professional midfielder, key player in Elite League",
      },
      {
        club: "Toronto Field Hockey Academy",
        period: "2018 - 2022",
        description: "Youth development program, represented Canada internationally",
      },
    ],
  }

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
        description: "Won the national championship with outstanding team performance",
      },
      {
        club: "European Cup 2023",
        period: "2023",
        description: "Reached semi-finals of the European Field Hockey Cup",
      },
    ],
  }

  const userData = isOwnProfile ? playerData : clubData

  return (
    <main className="max-w-2xl mx-auto mb-24">
      <ProfileHeader {...userData} isOwnProfile={isOwnProfile} />
      <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} userData={userData} />
    </main>
  )
}
