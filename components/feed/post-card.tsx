"use client";

import { Heart, MessageCircle, Share2 } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { formatRelativeTime } from "@/lib/date-utils";

type User = {
  id: string;
  name: string;
  username?: string;
  avatar?: string;
  role?: string;
};

type Likes = {
  id: string;
  user?: { name: string };
};

type Comment = {
  id: string;
  content: string;
  user: User;
};

type Post = {
  id: string;
  content: string;
  imageUrl?: string;
  user: User;
  createdAt: string;
  comments: Comment[];
  updatedAt: string;
  likes: Likes[];
};

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const user = post.user;

  return (
    <motion.div className="max-w-[500px] bg-background rounded-xl overflow-hidden shadow-md hover:shadow-lg">
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-border">
        <div className="flex items-center gap-3">
          <motion.img
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            src={user.avatar}
            alt={user.name}
            className="w-10 h-10 rounded-full cursor-pointer"
          />
          <div>
            <p className="font-semibold text-foreground">{post.user.name}</p>
            <p className="text-xs text-foreground-muted">
              {post.user.role} • {formatRelativeTime(post.createdAt)}
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
        <p className="text-foreground leading-relaxed text-sm">
          {post.content}
        </p>
      </div>

      {/* Image */}
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt="Post content"
          className="w-full h-full object-cover cursor-pointer"
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
          <span className="text-sm font-medium">{post.likes.length}</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 hover:bg-foreground-muted/30 rounded-lg transition-colors duration-300 cursor-pointer">
          <MessageCircle size={18} />
          <span className="text-sm font-medium">{post.comments.length}</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 hover:bg-foreground-muted/30 rounded-lg transition-colors duration-300 cursor-pointer">
          <Share2 size={18} />
        </button>
      </div>
    </motion.div>
  );
}
