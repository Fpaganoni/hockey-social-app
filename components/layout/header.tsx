"use client";

import { Bell, LogOut } from "lucide-react";
import { useState } from "react";
import { HockeyXTicks } from "../ui/hockey-xtick";
import { motion } from "framer-motion";
import { useAuthStore } from "@/stores/useAuthStore";

interface HeaderProps {
  title?: string;
  showNotifications?: boolean;
}

export function Header({
  title = "Hockey Connect",
  showNotifications = true,
}: HeaderProps) {
  const [showLogout, setShowLogout] = useState(false);
  const { logout, user } = useAuthStore();

  return (
    <header className="sticky top-0 bg-background/30 backdrop-blur-sm border-b border-border z-30 px-4 py-3 flex items-center justify-between">
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
        className="flex items-center gap-2 ml-2 cursor-pointer"
      >
        <div className="w-8 h-8 flex items-center justify-center cursor-pointer transition-transform">
          <HockeyXTicks size={28} className="text-foreground" />
        </div>
        <h1 className="text-xl font-bold text-foreground">{title}</h1>
      </motion.div>

      {showNotifications && (
        <div className="flex items-center gap-2">
          <button className="group p-2 hover:bg-primary rounded-lg transition-colors cursor-pointer relative hover:scale-110">
            <Bell
              size={24}
              className="text-foreground group-hover:text-white-black transition-colors"
            />
            <span className="absolute flex items-center justify-center p-1.5 text-xs text-white font-bold top-1 right-1 w-3 h-3 bg-error rounded-full">
              3
            </span>
          </button>
          <div className="relative ">
            <button
              onClick={() => setShowLogout(!showLogout)}
              className="p-2 hover:bg-primary group group-hover:text-white-black rounded-lg transition-colors cursor-pointer"
            >
              <LogOut
                size={20}
                className="text-foreground group-hover:text-white-black transition-colors"
              />
            </button>
            {showLogout && (
              <button
                onClick={logout}
                className="absolute right-0 top-full mt-2 px-4 py-2 bg-background border-2 border-border rounded-lg text-foreground text-sm hover:bg-primary hover:text-background shadow-lg transition-colors cursor-pointer whitespace-nowrap z-50"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
