"use client"

import { ChevronDown, X } from 'lucide-react'
import { useState } from "react"

interface FilterButtonProps {
  label: string
  options?: string[]
  onSelect?: (option: string) => void
}

export function FilterButton({ label, options = [], onSelect }: FilterButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const defaultOptions: Record<string, string[]> = {
    Role: ["Player", "Coach", "Club Manager"],
    Country: ["🇨🇦 Canada", "🇺🇸 USA", "🇳🇱 Netherlands", "🇬🇧 UK"],
    Level: ["Elite", "Professional", "Amateur", "Youth"],
    Position: ["Forward", "Midfielder", "Defender", "Goalkeeper"],
    Season: ["Current Season", "Next Season", "Any Time"],
  }

  const items = options.length > 0 ? options : defaultOptions[label] || []

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 bg-dark-gray-2 border border-primary rounded-lg text-foreground transition-all duration-300 text-sm font-medium cursor-pointer hover:scale-105 active:scale-95"
      >
        {label}
        <ChevronDown size={16} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-dark-gray-1 border border-primary rounded-lg shadow-lg z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {items.map((item) => (
            <button
              key={item}
              onClick={() => {
                onSelect?.(item)
                setIsOpen(false)
              }}
              className="w-full text-left px-4 py-2.5 hover:bg-dark-gray-2 text-foreground text-sm transition-colors cursor-pointer border-b border-primary last:border-b-0"
            >
              {item}
            </button>
          ))}
        </div>
      )}

      {/* Backdrop to close dropdown */}
      {isOpen && (
        <button
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40"
          aria-label="Close dropdown"
        />
      )}
    </div>
  )
}
