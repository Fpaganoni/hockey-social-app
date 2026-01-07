"use client";

import { Plus } from "lucide-react";
import { StoriesCarousel } from "@/components/feed/stories-carousel";
import { Posts } from "@/components/feed/posts";

interface FeedPageProps {
  userType: "player" | "club";
}

export function FeedPage({ userType }: FeedPageProps) {
  return (
    <main className="max-w-2xl mx-auto mb-32 ">
      <StoriesCarousel />

      <Posts />

      {/* Floating Action Button */}
      <button className="fixed bottom-24 right-4 w-16 h-16 border-2 border-border-strong hover:border-primary hover:bg-primary active:scale-95 text-foreground hover:text-white-black font-bold rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 z-30 cursor-pointer ">
        <Plus size={32} />
      </button>
    </main>
  );
}
