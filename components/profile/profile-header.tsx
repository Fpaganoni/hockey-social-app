"use client"

import { MessageSquare, Heart, UserPlus, Edit } from 'lucide-react'
import { useState } from "react"

interface ProfileHeaderProps {
  name: string
  role: string
  position: string
  country: string
  bio: string
  isOwnProfile?: boolean
}

export function ProfileHeader({ name, role, position, country, bio, isOwnProfile = false }: ProfileHeaderProps) {
  const [isFollowing, setIsFollowing] = useState(false)

  return (
    <div className="bg-surface">
      <div className="h-48 bg-gradient-to-b from-accent-bright/30 via-accent/20 to-surface relative overflow-hidden">
        <img 
          src="/field-hockey-stadium-cover.jpg" 
          alt="Cover" 
          className="w-full h-full object-cover opacity-60" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-surface"></div>
      </div>

      {/* Profile Content */}
      <div className="px-4 pt-0 pb-6">
        {/* Profile Picture and Info */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-start gap-3 flex-1 -mt-24 relative z-10">
            <img
              src="/field-hockey-player-profile.jpg"
              alt={name}
              className="w-24 h-24 rounded-full border-4 border-primary shadow-lg hover:scale-105 transition-transform cursor-pointer"
            />
            <div className="pt-6">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-bold text-text">{name}</h1>
                <span className="text-2xl">{country}</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-3 py-1 text-xs font-semibold rounded-lg bg-info/20 text-info border border-info/30">
                  {role}
                </span>
                <span className="text-accent-bright font-semibold text-sm">{position}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <p className="text-text-secondary text-sm mb-4 leading-relaxed">{bio}</p>

        <div className="flex flex-col gap-2">
          {isOwnProfile ? (
            <button className="w-full py-3 rounded-lg bg-accent-bright hover:bg-accent active:scale-95 text-primary font-semibold transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 hover:shadow-lg">
              <Edit size={18} />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button 
                onClick={() => setIsFollowing(!isFollowing)}
                className={`flex-1 py-2.5 rounded-lg font-semibold transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 hover:scale-105 active:scale-95 ${
                  isFollowing 
                    ? "bg-accent-bright/20 text-accent-bright border-2 border-accent-bright" 
                    : "bg-surface-light border-2 border-border text-text hover:border-accent"
                }`}
              >
                <Heart size={18} fill={isFollowing ? "currentColor" : "none"} />
                {isFollowing ? "Following" : "Follow"}
              </button>
              <button className="flex-1 py-2.5 rounded-lg bg-surface-light border-2 border-border text-text hover:border-accent font-semibold transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 hover:scale-105 active:scale-95">
                <UserPlus size={18} />
                Connect
              </button>
              <button className="flex-1 py-2.5 rounded-lg bg-accent-bright hover:bg-accent active:scale-95 text-primary font-semibold transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 hover:shadow-lg">
                <MessageSquare size={18} />
                Message
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
