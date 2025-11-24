"use client"

import { Bell, LogOut } from 'lucide-react'
import { useState } from "react"
import { HockeyXTicks } from "../ui/hockey-xtick"

interface HeaderProps {
  title?: string
  showNotifications?: boolean
  onLogout?: () => void
}

export function Header({ title = "Hockey Connect", showNotifications = true, onLogout }: HeaderProps) {
  const [showLogout, setShowLogout] = useState(false)

  return (
    <header className="sticky top-0 bg-dark-gray-1 border-b border-primary z-30 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
          <HockeyXTicks size={28} className="text-light-gray-1" />
        </div>
        <h1 className="text-xl font-bold text-light-gray-1">{title}</h1>
      </div>

      {showNotifications && (
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-dark-gray-3 rounded-lg transition-colors cursor-pointer relative hover:scale-110">
            <Bell size={24} className="text-light-gray-1" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-error rounded-full animate-pulse"></span>
          </button>
          {onLogout && (
            <div className="relative">
              <button
                onClick={() => setShowLogout(!showLogout)}
                className="p-2 hover:bg-dark-gray-3 rounded-lg transition-colors cursor-pointer"
              >
                <LogOut size={20} className="text-foreground/80 hover:text-foreground transition-colors" />
              </button>
              {showLogout && (
                <button
                  onClick={onLogout}
                  className="absolute right-0 top-full mt-2 px-4 py-2 bg-dark-gray-2 border border-2 border-primary rounded-lg text-foreground text-sm hover:bg-primary hover:text-background shadow-lg transition-colors cursor-pointer whitespace-nowrap z-50"
                >
                  Logout
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </header>
  )
}
