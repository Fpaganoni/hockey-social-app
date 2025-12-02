"use client"

import { formatDistanceToNow } from "date-fns"
import { Trash2 } from 'lucide-react'

interface Conversation {
  id: number
  name: string
  avatar: string
  lastMessage: string
  lastMessageTime: Date
  unread: boolean
  unreadCount: number
}

interface ConversationListProps {
  searchQuery: string
  onSelectChat: (id: number) => void
}

export function ConversationList({ searchQuery, onSelectChat }: ConversationListProps) {
  const conversations: Conversation[] = [
    {
      id: 1,
      name: "Sarah Mitchell",
      avatar: "/user.png",
      lastMessage: "That sounds great! See you tomorrow at 8am",
      lastMessageTime: new Date(Date.now() - 5 * 60000),
      unread: false,
      unreadCount: 0,
    },
    {
      id: 2,
      name: "HC Amsterdam Recruiting",
      avatar: "/user.png",
      lastMessage: "We received your application! Thanks for your interest.",
      lastMessageTime: new Date(Date.now() - 2 * 60 * 60000),
      unread: true,
      unreadCount: 2,
    },
    {
      id: 3,
      name: "Coach Mike",
      avatar: "/user.png",
      lastMessage: "Great performance in the last match!",
      lastMessageTime: new Date(Date.now() - 24 * 60 * 60000),
      unread: false,
      unreadCount: 0,
    },
    {
      id: 4,
      name: "Team Netherlands Players",
      avatar: "/user.png",
      lastMessage: "Practice moved to 7pm next Tuesday",
      lastMessageTime: new Date(Date.now() - 2 * 24 * 60 * 60000),
      unread: false,
      unreadCount: 0,
    },
  ]

  const filtered = conversations.filter((conv) => conv.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="flex-1 overflow-y-auto">
      {filtered.length > 0 ? (
        <div className="divide-y divide-border">
          {filtered.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => onSelectChat(conversation.id)}
              className="w-full px-4 py-3 bg-dark-gray-1/40 backdrop-blur-md hover:bg-dark-gray-1 transition-all duration-300 text-left flex items-center gap-3 border-b border-primary last:border-b-0 cursor-pointer group active:scale-95"
            >
              <img
                src={conversation.avatar || "/placeholder.svg"}
                alt={conversation.name}
                className="w-12 h-12 rounded-full object-cover flex-shrink-0 hover:scale-110 transition-transform"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <p className={`font-semibold text-foreground truncate ${conversation.unread ? "font-bold" : ""}`}>
                    {conversation.name}
                  </p>
                  <span className="text-xs text-foreground flex-shrink-0">
                    {formatDistanceToNow(conversation.lastMessageTime, { addSuffix: false })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <p
                    className={`text-sm truncate ${conversation.unread ? "text-foreground font-medium" : "text-foreground/70"}`}
                  >
                    {conversation.lastMessage}
                  </p>
                  {conversation.unread && (
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-info text-background text-xs font-bold flex items-center justify-center shadow-md">
                      {conversation.unreadCount}
                    </span>
                  )}
                </div>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation()
                }}
                className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer p-2 hover:bg-error/10 hover:text-error rounded-lg text-foreground transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </button>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-foreground text-lg text-center">No conversations found</p>
        </div>
      )}
    </div>
  )
}
