"use client";

import { ArrowRight, MapPin, Star } from "lucide-react";
import { motion } from "framer-motion";

export interface ProfileCardProps {
  id: number;
  name: string;
  role: string;
  position: string;
  location: string;
  country: string;
  level?: string;
  bio?: string;
}

export function ProfileCard({
  id,
  name,
  role,
  position,
  location,
  country,
  level,
  bio,
}: ProfileCardProps) {
  const roleColors: Record<
    string,
    { bg: string; text: string; badge: string }
  > = {
    Player: {
      bg: "bg-info/20",
      text: "text-info",
      badge: "bg-info/20 text-foreground border-border-strong",
    },
    Coach: {
      bg: "bg-warning/20",
      text: "text-warning",
      badge: "bg-warning/20 text-foreground border-border-strong",
    },
    Club: {
      bg: "bg-success/20",
      text: "text-success",
      badge: "bg-success/20 text-foreground border-border-strong",
    },
  };

  const colors = roleColors[role] || roleColors.Player;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`${colors.bg} rounded-xl p-4 hover:shadow-lg group mb-6`}
    >
      <div className="flex items-start justify-between gap-4">
        {/* Profile Info */}
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <img
            src="/user.png"
            alt={name}
            className="w-14 h-14 rounded-full object-cover cursor-pointer shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-medium text-foreground truncate">{name}</h3>
              <span className="shrink-0">{country}</span>
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-md border ${colors.badge}`}
              >
                {role}
              </span>
            </div>
            <p className="text-sm text-foreground-muted mb-1 truncate">
              {position}
            </p>
            {level && (
              <div className="flex items-center gap-2">
                <Star size={14} className="text-warning shrink-0" />
                <span className="text-xs text-foreground-muted">
                  {level} Level
                </span>
              </div>
            )}
            {bio && (
              <p className="text-xs text-foreground-muted mt-1 line-clamp-1">
                {bio}
              </p>
            )}
            <div className="flex items-center gap-1 text-xs text-foreground-muted mt-1">
              <MapPin size={12} />
              <span>{location}</span>
            </div>
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 rounded-lg bg-background text-foreground font-medium cursor-pointer shrink-0 group-hover:shadow-lg flex items-center gap-2 min-w-fit"
        >
          View
          <ArrowRight
            size={16}
            className="group-hover:translate-x-1 transition-transform"
          />
        </motion.button>
      </div>
    </motion.div>
  );
}
