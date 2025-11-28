"use client"

import { useState } from "react"
import { Search, Plus } from "lucide-react"
import { ChatConversation } from "@/components/messages/chat-conversation"
import { ConversationList } from "@/components/messages/conversation-list"

export function MessagesPage() {
  const [activeChat, setActiveChat] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  if (activeChat !== null) {
    return <ChatConversation conversationId={activeChat} onBack={() => setActiveChat(null)} />
  }

  return (
    <main className="max-w-lg mx-auto h-[calc(100vh-120px)] flex flex-col">
      <div className="sticky top-16 bg-dark-gray-1 z-20 px-4 py-4 border-b border-primary rounded-b-lg">
        <div className="flex items-center gap-2 mb-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground" size={18} />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background border border-primary rounded-lg text-sm text-foreground placeholder-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <button className="p-2 hover:bg-dark-gray-3 rounded-lg transition-colors">
            <Plus size={20} className="text-foreground" />
          </button>
        </div>
      </div>

      <ConversationList searchQuery={searchQuery} onSelectChat={setActiveChat} />
    </main>
  )
}
