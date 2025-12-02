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
    <div className="bg-dark-gray-1">
      <div className="h-60 bg-gradient-to-b from-gray-light-1/30 via-gray-light-2/20 to-gray-light-1/20 relative overflow-hidden">
        <img 
          src="/hockey-stadium.jpg" 
          alt="Cover" 
          className="w-full h-full object-cover opacity-60" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark-gray-1"></div>
      </div>

      {/* Profile Content */}
      <div className="px-4 pt-0 pb-6">
        {/* Profile Picture and Info */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-start gap-3 flex-1 -mt-24 relative z-10">
            <img
              src="/hockey-player.jpg"
              alt={name}
              className="w-32 h-32 rounded-full border-2 border-primary shadow-lg hover:scale-105 transition-transform cursor-pointer mx-2"
            />
            <div className="pt-6">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-bold text-foreground">{name}</h1>
                <span className="text-2xl text-foreground/75">{country}</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-3 py-1 text-xs font-semibold rounded-lg bg-info/20 text-foreground/80 border border-info/30">
                  {role}
                </span>
                <span className="text-gray-light-2 font-semibold text-sm">{position}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <p className="text-foreground/75 text-sm mb-4 leading-relaxed">{bio}</p>

        <div className="flex flex-col gap-2">
          {isOwnProfile ? (
            <button className="w-full py-3 rounded-lg bg-dark-gray-2 hover:bg-primary active:scale-95 text-foreground hover:text-background font-semibold transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 hover:shadow-lg border border-primary">
              <Edit size={18} />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button 
                onClick={() => setIsFollowing(!isFollowing)}
                className={`flex-1 py-2.5 rounded-lg font-semibold transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 hover:scale-105 active:scale-95 ${
                  isFollowing 
                    ? "bg-dark-gray-1/20 text-foreground border-2 border-primary" 
                    : "bg-dark-gray-3 border-2 border-primary text-foreground "
                }`}
              >
                <Heart size={18} fill={isFollowing ? "currentColor" : "none"} />
                {isFollowing ? "Following" : "Follow"}
              </button>
              <button className="flex-1 py-2.5 rounded-lg bg-dark-gray-1 border-2 border-primary text-foreground font-semibold transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 hover:scale-105 active:scale-95">
                <UserPlus size={18} />
                Connect
              </button>
              <button className="flex-1 py-2.5 rounded-lg bg-dark-gray-1 active:scale-95 text-foreground font-semibold transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 hover:shadow-lg">
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
