"use client"

import { useState } from "react"
import { ArrowLeft, Send, Plus } from 'lucide-react'

interface ChatMessage {
  id: number
  sender: "user" | "other"
  text: string
  timestamp: Date
}

interface ChatConversationProps {
  conversationId: number
  onBack: () => void
}

export function ChatConversation({ conversationId, onBack }: ChatConversationProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: "other",
      text: "Hey! How are you doing?",
      timestamp: new Date(Date.now() - 10 * 60000),
    },
    {
      id: 2,
      sender: "user",
      text: "Great! Just finished training",
      timestamp: new Date(Date.now() - 8 * 60000),
    },
    {
      id: 3,
      sender: "other",
      text: "That sounds great! See you tomorrow at 8am",
      timestamp: new Date(Date.now() - 5 * 60000),
    },
  ])
  const [newMessage, setNewMessage] = useState("")

  const handleSend = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: "user",
          text: newMessage,
          timestamp: new Date(),
        },
      ])
      setNewMessage("")
    }
  }

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col bg-background dark:bg-primary">
      <div className="sticky top-16 bg-surface border-b border-border px-4 py-3 flex items-center gap-3 z-20 shadow-sm">
        <button 
          onClick={onBack} 
          className="p-2 hover:bg-surface-light rounded-lg transition-all duration-300 cursor-pointer hover:scale-110 active:scale-95"
        >
          <ArrowLeft size={24} className="text-text" />
        </button>
        <img 
          src="/conversation-avatar.jpg" 
          alt="Conversation" 
          className="w-10 h-10 rounded-full object-cover cursor-pointer hover:scale-110 transition-transform" 
        />
        <div className="flex-1">
          <p className="font-semibold text-text">Sarah Mitchell</p>
          <p className="text-xs text-text-secondary">Active now</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scroll-smooth">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
          >
            <div
              className={`max-w-xs px-4 py-3 rounded-2xl transition-all duration-300 hover:scale-105 ${
                msg.sender === "user"
                  ? "bg-accent-bright text-primary rounded-br-none shadow-md hover:shadow-lg"
                  : "bg-surface border border-border text-text rounded-bl-none shadow-sm hover:shadow-md"
              }`}
            >
              <p className="text-sm break-words">{msg.text}</p>
              <p className={`text-xs mt-2 ${msg.sender === "user" ? "text-primary/70" : "text-text-secondary"}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-border bg-surface px-4 py-3 flex items-center gap-2 shadow-lg">
        <button 
          className="p-2 hover:bg-surface-light rounded-lg transition-all duration-300 cursor-pointer hover:scale-110 active:scale-95 flex-shrink-0 text-text-secondary hover:text-text"
        >
          <Plus size={20} />
        </button>
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 px-4 py-2.5 bg-primary border border-border rounded-full text-text placeholder-text-secondary focus:outline-none focus:border-accent-bright focus:ring-2 focus:ring-accent-bright/20 transition-all duration-300 cursor-text"
        />
        <button
          onClick={handleSend}
          disabled={!newMessage.trim()}
          className="p-2 hover:bg-surface-light rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex-shrink-0 hover:scale-110 active:scale-95"
        >
          <Send size={20} className={newMessage.trim() ? "text-accent-bright" : "text-text-secondary"} />
        </button>
      </div>
    </div>
  )
}
