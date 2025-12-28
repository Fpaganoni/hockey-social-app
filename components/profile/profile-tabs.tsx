"use client";

import { Play } from "lucide-react";
import { motion } from "framer-motion";

interface TrajectoryItem {
  club: string;
  period: string;
  description: string;
}

interface UserData {
  stats: {
    gamesPlayed: number;
    goals: number;
    assists: number;
  };
  trajectory: TrajectoryItem[];
}

interface ProfileTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userData: UserData;
}

export function ProfileTabs({
  activeTab,
  setActiveTab,
  userData,
}: ProfileTabsProps) {
  const tabs = [
    { id: "trajectory", label: "Trajectory" },
    { id: "multimedia", label: "Multimedia" },
    { id: "statistics", label: "Statistics" },
  ];

  return (
    <>
      <div className="flex border-t border-border sticky top-16 z-20 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 text-foreground-muted py-4 font-medium text-center border-b-2 border-l border-r transition-transform duration-300 cursor-pointer whitespace-nowrap min-w-fit hover:text-foreground ${
              activeTab === tab.id
                ? "border-b-border-strong border-b-2 text-primary font-bold hover:text-primary shadow-lg"
                : "border-b-transparent text-foreground-muted hover:text-foreground"
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
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                key={idx}
                className="bg-overlay rounded-xl p-4 border border-border hover:shadow-lg group"
              >
                <h3 className="font-semibold text-foreground text-lg mb-1 transition-colors">
                  {item.club}
                </h3>
                <p className="text-foreground-muted text-sm font-medium mb-2">
                  {item.period}
                </p>
                <p className="text-foreground-muted text-sm">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === "multimedia" && (
          <div className="grid grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                key={i}
                className="aspect-square rounded-lg border border-border overflow-hidden cursor-pointer group relative"
              >
                <img
                  src={`/generic-placeholder-graphic.png?key=${i}&height=120&width=120&query=field-hockey-moment-${i}`}
                  alt={`Media ${i}`}
                  className="w-full h-full object-cover"
                />
                {/* Play button overlay for videos */}
                <div className="absolute inset-0 bg-background/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Play size={24} className="text-white fill-white" />
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === "statistics" && (
          <div className="grid grid-cols-3 gap-3 pb-6">
            <motion.div
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="rounded-xl p-4 border border-border-strong text-center hover:border-primary transition-colors duration-300 hover:shadow-lg cursor-pointer"
            >
              <p className="text-3xl font-bold text-info">
                {userData.stats.gamesPlayed}
              </p>
              <p className="text-foreground-muted text-sm mt-2 font-medium">
                Games Played
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="rounded-xl p-4 border border-border-strong text-center hover:border-primary transition-colors duration-300 hover:shadow-lg cursor-pointer"
            >
              <p className="text-3xl font-bold text-success">
                {userData.stats.goals}
              </p>
              <p className="text-foreground-muted text-sm mt-2 font-medium">
                Goals
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="rounded-xl p-4 border border-border-strong text-center hover:border-primary transition-colors duration-300 hover:shadow-lg cursor-pointer"
            >
              <p className="text-3xl font-bold text-warning">
                {userData.stats.assists}
              </p>
              <p className="text-foreground-muted text-sm mt-2 font-medium">
                Assists
              </p>
            </motion.div>
          </div>
        )}
      </div>
    </>
  );
}
