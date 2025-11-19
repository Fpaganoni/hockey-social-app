"use client"

import { Search } from 'lucide-react'
import { useState } from "react"
import { ProfileCard } from "@/components/explore/profile-card"
import { FilterButton } from "@/components/explore/filter-button"

export function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({})

  const profiles = [
    { 
      id: 1, 
      name: "Alex Johnson", 
      role: "Player",
      position: "Left Forward", 
      location: "Canada", 
      level: "Elite",
      country: "🇨🇦",
      bio: "Skilled forward with 8 years experience"
    },
    { 
      id: 2, 
      name: "Sarah Mitchell", 
      role: "Player",
      position: "Goalkeeper", 
      location: "USA", 
      level: "Professional",
      country: "🇺🇸",
      bio: "Dedicated goalkeeper with international experience"
    },
    { 
      id: 3, 
      name: "HC Amsterdam", 
      role: "Club",
      position: "Elite League", 
      location: "Netherlands", 
      level: "Elite",
      country: "🇳🇱",
      bio: "Top-tier field hockey club"
    },
    { 
      id: 4, 
      name: "Coach Mike", 
      role: "Coach",
      position: "Head Coach", 
      location: "UK", 
      level: "Professional",
      country: "🇬🇧",
      bio: "Experienced coach with 15+ years"
    },
  ]

  return (
    <main className="max-w-2xl mx-auto pb-4">
      <div className="sticky top-16 bg-background dark:bg-primary z-20 px-4 py-4 border-b border-border space-y-4 backdrop-blur-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
          <input
            type="text"
            placeholder="Search by name, club, city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-lg text-text placeholder-text-secondary focus:outline-none focus:border-accent-bright focus:ring-2 focus:ring-accent-bright/20 transition-all duration-300 cursor-text"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <FilterButton label="Role" />
          <FilterButton label="Country" />
          <FilterButton label="Level" />
          <FilterButton label="Position" />
        </div>
      </div>

      {/* Results */}
      <div className="px-4 py-6 space-y-3">
        {searchQuery ? (
          profiles.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase())).length > 0 ? (
            profiles
              .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((profile) => <ProfileCard key={profile.id} {...profile} />)
          ) : (
            <p className="text-center text-text-secondary py-8">No results for "{searchQuery}"</p>
          )
        ) : (
          profiles.map((profile) => <ProfileCard key={profile.id} {...profile} />)
        )}
      </div>
    </main>
  )
}
