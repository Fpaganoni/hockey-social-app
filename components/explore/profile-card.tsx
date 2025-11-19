"use client"

import { ArrowRight, MapPin, Star } from 'lucide-react'

export interface ProfileCardProps {
  id: number
  name: string
  role: string
  position: string
  location: string
  country: string
  level?: string
  bio?: string
}

export function ProfileCard({ id, name, role, position, location, country, level, bio }: ProfileCardProps) {
  const roleColors: Record<string, { bg: string; text: string; badge: string }> = {
    Player: { bg: "bg-info/10", text: "text-info", badge: "bg-info/20 text-info border-info/30" },
    Coach: { bg: "bg-warning/10", text: "text-warning", badge: "bg-warning/20 text-warning border-warning/30" },
    Club: { bg: "bg-success/10", text: "text-success", badge: "bg-success/20 text-success border-success/30" },
  }

  const colors = roleColors[role] || roleColors.Player

  return (
    <div className={`${colors.bg} rounded-xl border border-border/50 p-4 cursor-pointer transition-all duration-300 hover:border-accent-bright hover:shadow-lg hover:scale-102 group`}>
      <div className="flex items-start justify-between gap-4">
        {/* Profile Info */}
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <img
            src={`/ceholder-svg-key-prof.jpg?key=prof${id}&height=56&width=56&query=profile-${name}`}
            alt={name}
            className="w-14 h-14 rounded-full object-cover cursor-pointer flex-shrink-0 hover:scale-110 transition-transform group-hover:ring-2 group-hover:ring-accent-bright"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-text truncate">{name}</h3>
              <span className="text-lg flex-shrink-0">{country}</span>
              <span className={`px-2 py-1 text-xs font-semibold rounded-md border ${colors.badge} transition-all`}>
                {role}
              </span>
            </div>
            <p className="text-sm text-text-secondary mb-1 truncate">{position}</p>
            {level && (
              <div className="flex items-center gap-2">
                <Star size={14} className="text-warning flex-shrink-0" />
                <span className="text-xs text-text-secondary">{level} Level</span>
              </div>
            )}
            {bio && <p className="text-xs text-text-secondary mt-1 line-clamp-1">{bio}</p>}
            <div className="flex items-center gap-1 text-xs text-text-secondary mt-1">
              <MapPin size={12} />
              <span>{location}</span>
            </div>
          </div>
        </div>

        <button className="px-4 py-2 rounded-lg bg-accent-bright text-primary font-semibold hover:bg-accent active:scale-95 transition-all duration-300 cursor-pointer flex-shrink-0 group-hover:shadow-lg flex items-center gap-2 min-w-fit">
          View
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  )
}
