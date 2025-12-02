"use client"

import { Play } from 'lucide-react'

interface TrajectoryItem {
  club: string
  period: string
  description: string
}

interface UserData {
  stats: {
    gamesPlayed: number
    goals: number
    assists: number
  }
  trajectory: TrajectoryItem[]
}

interface ProfileTabsProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  userData: UserData
}

export function ProfileTabs({ activeTab, setActiveTab, userData }: ProfileTabsProps) {
  const tabs = [
    { id: "trajectory", label: "Trajectory" },
    { id: "multimedia", label: "Multimedia" },
    { id: "statistics", label: "Statistics" },
  ]

  return (
    <>
      <div className="flex border-t border-primary bg-dark-gray-1 sticky top-16 z-20 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-4 font-medium text-center border-b-2 transition-all duration-300 cursor-pointer whitespace-nowrap min-w-fit hover:text-foreground ${
              activeTab === tab.id
                ? "border-b-primary border-b-3 text-primary font-bold hover:text-primary"
                : "border-b-transparent text-foreground/70 hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="px-4 py-6">
        {activeTab === "trajectory" && (
          <div className="space-y-4">
            {userData.trajectory.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-dark-gray-1 rounded-xl p-4 border border-primary transition-all duration-300 hover:shadow-md cursor-pointer hover:scale-102 group"
              >
                <h3 className="font-bold text-foreground text-lg mb-1 transition-colors">{item.club}</h3>
                <p className="text-foreground/75 text-sm font-medium mb-2">{item.period}</p>
                <p className="text-foreground/75 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "multimedia" && (
          <div className="grid grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-lg bg-dark-gray-1 border  overflow-hidden cursor-pointer hover:border-primary transition-all duration-300 hover:scale-105 group relative"
              >
                <img
                  src={`/generic-placeholder-graphic.png?key=${i}&height=120&width=120&query=field-hockey-moment-${i}`}
                  alt={`Media ${i}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {/* Play button overlay for videos */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Play size={24} className="text-white fill-white" />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "statistics" && (
          <div className="grid grid-cols-3 gap-3 pb-6">
            <div className="bg-dark-gray-3 rounded-xl p-4 border border-primary text-center hover:border-gray-light-2 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer group">
              <p className="text-3xl font-bold text-info group-hover:scale-110 transition-transform">{userData.stats.gamesPlayed}</p>
              <p className="text-foreground/70 text-sm mt-2 font-medium">Games Played</p>
            </div>
            <div className="bg-dark-gray-3 rounded-xl p-4 border border-primary text-center hover:border-gray-light-2 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer group">
              <p className="text-3xl font-bold text-success group-hover:scale-110 transition-transform">{userData.stats.goals}</p>
              <p className="text-foreground/70 text-sm mt-2 font-medium">Goals</p>
            </div>
            <div className="bg-dark-gray-3 rounded-xl p-4 border border-primary text-center hover:border-gray-light-2 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer group">
              <p className="text-3xl font-bold text-warning group-hover:scale-110 transition-transform">{userData.stats.assists}</p>
              <p className="text-foreground/70 text-sm mt-2 font-medium">Assists</p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
