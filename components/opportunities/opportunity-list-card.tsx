"use client"

import { useState } from "react"
import { CheckCircle, MapPin, Calendar, Award } from 'lucide-react'

interface OpportunityListCardProps {
  id: number
  title: string
  club: string
  location: string
  description: string
  tags: string[]
  deadline: string
  level?: string
  salary?: string
}

export function OpportunityListCard({
  id,
  title,
  club,
  location,
  description,
  tags,
  deadline,
  level,
  salary,
}: OpportunityListCardProps) {
  const [applied, setApplied] = useState(false)

  const tagColorMap: Record<string, string> = {
    Professional: "bg-info/20 text-info border-info/30",
    Amateur: "bg-warning/20 text-warning border-warning/30",
    Elite: "bg-success/20 text-success border-success/30",
    "Contract 1 Year": "bg-accent-bright/20 text-accent-bright border-accent-bright/30",
    "Contract 2 Years": "bg-accent-bright/20 text-accent-bright border-accent-bright/30",
    EU: "bg-info/20 text-info border-info/30",
  }

  return (
    <div className="bg-surface rounded-xl border border-border/50 overflow-hidden shadow-md hover:shadow-lg hover:border-accent-bright transition-all duration-300 hover:scale-102 cursor-pointer group border-l-4 border-l-accent-bright">
      <div className="p-4">
        <div className="mb-4">
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-text group-hover:text-accent-bright transition-colors">{title}</h3>
              <p className="text-text-secondary font-medium mt-1">{club}</p>
            </div>
            {level && (
              <span className="px-3 py-1 text-xs font-semibold rounded-lg bg-success/20 text-success border border-success/30 flex-shrink-0 whitespace-nowrap">
                {level}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm text-text-secondary mb-4">
            <div className="flex items-center gap-1">
              <MapPin size={16} />
              <span>{location}</span>
            </div>
            {salary && (
              <div className="flex items-center gap-1">
                <Award size={16} />
                <span>{salary}</span>
              </div>
            )}
          </div>

          <p className="text-sm text-text-secondary mb-4">{description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all duration-300 ${
                  tagColorMap[tag] || "bg-surface-light text-text-secondary border-border"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-text-secondary mb-4">
            <Calendar size={14} />
            <span>Deadline: {deadline}</span>
          </div>
        </div>

        {applied ? (
          <button
            disabled
            className="w-full py-3 rounded-lg border-2 border-accent-bright bg-accent-bright/10 font-semibold text-accent-bright flex items-center justify-center gap-2 transition-all duration-300 cursor-default"
          >
            <CheckCircle size={18} />
            Application Sent
          </button>
        ) : (
          <button
            onClick={() => setApplied(true)}
            className="w-full py-3 rounded-lg bg-accent-bright hover:bg-accent active:scale-95 text-primary font-semibold transition-all duration-300 cursor-pointer hover:shadow-lg"
          >
            Apply with Profile
          </button>
        )}
      </div>
    </div>
  )
}
