"use client"

import { Bell, LogOut } from 'lucide-react'
import { useState } from "react"

interface HeaderProps {
  title?: string
  showNotifications?: boolean
  onLogout?: () => void
}

export function Header({ title = "FieldLink", showNotifications = true, onLogout }: HeaderProps) {
  const [showLogout, setShowLogout] = useState(false)

  return (
    <header className="sticky top-0 bg-surface border-b border-border z-30 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-accent-bright rounded-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
          <span className="text-xl">🏑</span>
        </div>
        <h1 className="text-xl font-bold text-text">{title}</h1>
      </div>

      {showNotifications && (
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-surface-light rounded-lg transition-colors cursor-pointer relative hover:scale-110">
            <Bell size={24} className="text-text" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-error rounded-full animate-pulse"></span>
          </button>
          {onLogout && (
            <div className="relative">
              <button
                onClick={() => setShowLogout(!showLogout)}
                className="p-2 hover:bg-surface-light rounded-lg transition-colors cursor-pointer"
              >
                <LogOut size={20} className="text-text-secondary hover:text-text transition-colors" />
              </button>
              {showLogout && (
                <button
                  onClick={onLogout}
                  className="absolute right-0 top-full mt-2 px-4 py-2 bg-surface-light border border-border rounded-lg text-text text-sm hover:bg-primary transition-colors cursor-pointer whitespace-nowrap z-50"
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
