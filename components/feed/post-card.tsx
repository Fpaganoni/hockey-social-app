"use client"

import { Heart, MessageCircle, Share2 } from 'lucide-react'
import { useState } from "react"

interface PostCardProps {
  author: string
  role: string
  timeAgo: string
  content: string
  image?: string
}

export function PostCard({ author, role, timeAgo, content, image }: PostCardProps) {
  const [liked, setLiked] = useState(false)

  return (
    <div className="bg-surface rounded-xl border border-border overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:border-accent/50">
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-border">
        <div className="flex items-center gap-3">
          <img
            src={`/profile-.jpg?height=40&width=40&query=profile-${author}`}
            alt={author}
            className="w-10 h-10 rounded-full cursor-pointer hover:scale-110 transition-transform"
          />
          <div>
            <p className="font-semibold text-text">{author}</p>
            <p className="text-xs text-text-secondary">
              {role} • {timeAgo}
            </p>
          </div>
        </div>
        <button className="p-2 hover:bg-surface-light rounded-lg transition-colors cursor-pointer hover:scale-110">
          <span className="text-text-secondary text-xl">•••</span>
        </button>
      </div>

      {/* Content */}
      <div className="px-4 py-3">
        <p className="text-text leading-relaxed text-sm">{content}</p>
      </div>

      {/* Image */}
      {image && <img src={image || "/placeholder.svg"} alt="Post content" className="w-full h-64 object-cover cursor-pointer hover:opacity-90 transition-opacity" />}

      {/* Actions */}
      <div className="px-4 py-3 flex items-center justify-around border-t border-border">
        <button
          onClick={() => setLiked(!liked)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer hover:scale-105 ${
            liked ? "text-error bg-error/10" : "text-text-secondary hover:text-text hover:bg-surface-light"
          }`}
        >
          <Heart size={18} fill={liked ? "currentColor" : "none"} />
          <span className="text-sm font-medium">{liked ? "124" : "123"}</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 text-text-secondary hover:text-text hover:bg-surface-light rounded-lg transition-all duration-300 cursor-pointer hover:scale-105">
          <MessageCircle size={18} />
          <span className="text-sm font-medium">8</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 text-text-secondary hover:text-text hover:bg-surface-light rounded-lg transition-all duration-300 cursor-pointer hover:scale-105">
          <Share2 size={18} />
        </button>
      </div>
    </div>
  )
}
