"use client";

import { MessageSquare, Heart, UserPlus, Edit } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "../ui/badge";

interface ProfileHeaderProps {
  name: string;
  role: string;
  position: string;
  country: string;
  bio: string;
  isOwnProfile?: boolean;
}

export function ProfileHeader({
  name,
  role,
  position,
  country,
  bio,
  isOwnProfile = false,
}: ProfileHeaderProps) {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className="bg-background">
      <div className="h-60 relative overflow-hidden">
        <img
          src="/hockey-stadium.jpg"
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/10 to-transparent"></div>
      </div>

      {/* Profile Content */}
      <div className="px-4 pt-0 pb-6">
        {/* Profile Picture and Info */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-start gap-3 flex-1 -mt-24 relative z-10">
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              src="/hockey-player.jpg"
              alt={name}
              className="w-32 h-32 rounded-full border-2 border-border shadow-lg cursor-pointer mx-2"
            />
            <div className="pt-6">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-bold text-foreground">{name}</h1>
                <span className="text-2xl text-foreground-muted">
                  {country}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="player">{role}</Badge>
                <span className="text-foreground font-semibold text-sm">
                  {position}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <p className="text-foreground-muted text-sm mb-4 leading-relaxed">
          {bio}
        </p>

        <div className="flex flex-col gap-2">
          {isOwnProfile ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="w-[90%] mx-auto flex items-center gap-2 justify-center h-(--input-button-height) px-4 py-2 bg-primary text-white-black font-semibold rounded-lg hover:bg-primary-hover transition-colors duration-200 cursor-pointer disabled:opacity-50"
            >
              <Edit size={18} />
              Edit Profile
            </motion.button>
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
  );
}
