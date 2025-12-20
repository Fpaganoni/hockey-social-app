"use client";

import { Heart, MessageCircle, Share2 } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

interface PostCardProps {
  author: string;
  role: string;
  timeAgo: string;
  content: string;
  image?: string;
}

export function PostCard({
  author,
  role,
  timeAgo,
  content,
  image,
}: PostCardProps) {
  const [liked, setLiked] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-background rounded-xl overflow-hidden shadow-md hover:shadow-lg"
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-border">
        <div className="flex items-center gap-3">
          <motion.img
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            src={`/profile-.jpg?height=40&width=40&query=profile-${author}`}
            alt={author}
            className="w-10 h-10 rounded-full cursor-pointer"
          />
          <div>
            <p className="font-semibold text-foreground">{author}</p>
            <p className="text-xs text-foreground-muted">
              {role} • {timeAgo}
            </p>
          </div>
        </div>
        <button className="group p-2 rounded-lg cursor-pointer transition-colors">
          <span className="text-foreground group-hover:text-foreground-muted text-md">
            •••
          </span>
        </button>
      </div>

      {/* Content */}
      <div className="px-4 py-3">
        <p className="text-foreground leading-relaxed text-sm">{content}</p>
      </div>

      {/* Image */}
      {image && (
        <img
          src={image || "/placeholder.svg"}
          alt="Post content"
          className="w-full h-64 object-cover cursor-pointer"
        />
      )}

      {/* Actions */}
      <div className="px-4 py-3 flex items-center justify-around border-t border-border">
        <button
          onClick={() => setLiked(!liked)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-300 cursor-pointer ${
            liked
              ? "text-error hover:bg-error/30"
              : "text-foreground  hover:bg-error/30"
          }`}
        >
          <Heart size={18} fill={liked ? "currentColor" : "none"} />
          <span className="text-sm font-medium">{liked ? "124" : "123"}</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 hover:bg-foreground-muted/30 rounded-lg transition-colors duration-300 cursor-pointer">
          <MessageCircle size={18} />
          <span className="text-sm font-medium">8</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 hover:bg-foreground-muted/30 rounded-lg transition-colors duration-300 cursor-pointer">
          <Share2 size={18} />
        </button>
      </div>
    </motion.div>
  );
}
