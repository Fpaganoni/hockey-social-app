"use client"

import { Filter } from 'lucide-react'
import { useState } from "react"
import { OpportunityListCard } from "@/components/opportunities/opportunity-list-card"

export function OpportunitiesPage() {
  const [showFilters, setShowFilters] = useState(false)

  const opportunities = [
    {
      id: 1,
      title: "Left Midfielder",
      club: "HC Amsterdam",
      location: "Netherlands",
      description: "We are looking for a skilled midfielder to join our professional field hockey team.",
      tags: ["Professional", "Contract 1 Year", "EU"],
      deadline: "30 Dec 2025",
      level: "Elite",
      salary: "€2,500 - €4,000",
    },
    {
      id: 2,
      title: "Defender",
      club: "British Field Hockey Club",
      location: "UK",
      description: "Seeking an experienced defender for the upcoming season.",
      tags: ["Professional", "Contract 2 Years", "EU"],
      deadline: "15 Jan 2026",
      level: "Professional",
      salary: "€2,000 - €3,500",
    },
    {
      id: 3,
      title: "Goalkeeper",
      club: "Team Sweden Elite",
      location: "Sweden",
      description: "Top-tier goalkeeper position available for the elite league.",
      tags: ["Professional", "Contract 1 Year", "EU"],
      deadline: "5 Jan 2026",
      level: "Elite",
      salary: "€3,000 - €5,000",
    },
  ]

  return (
    <main className="max-w-2xl mx-auto pb-4">
      <div className="sticky top-16 bg-surface border-b border-border px-4 py-4 z-20 flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-text">Available Positions</h2>
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="p-2 hover:bg-surface-light rounded-lg transition-all duration-300 cursor-pointer hover:scale-110 active:scale-95 text-text-secondary hover:text-text"
        >
          <Filter size={24} />
        </button>
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div className="bg-surface border-b border-border px-4 py-4 grid grid-cols-2 gap-2">
          {["Experience", "Location", "Contract", "Salary"].map((filter) => (
            <button 
              key={filter}
              className="px-3 py-2 bg-surface-light border border-border rounded-lg text-text-secondary hover:text-text hover:border-accent-bright transition-all duration-300 cursor-pointer text-sm font-medium"
            >
              {filter}
            </button>
          ))}
        </div>
      )}

      <div className="px-4 py-6 space-y-4">
        {opportunities.length > 0 ? (
          opportunities.map((opp) => <OpportunityListCard key={opp.id} {...opp} />)
        ) : (
          <p className="text-center text-text-secondary py-12">No opportunities available at the moment.</p>
        )}
      </div>
    </main>
  )
}
