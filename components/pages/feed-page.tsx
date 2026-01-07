"use client";

import { Plus } from "lucide-react";
import { StoriesCarousel } from "@/components/feed/stories-carousel";
import { PostCard } from "@/components/feed/post-card";
import { OpportunityListCard } from "@/components/opportunities/opportunity-list-card";
import { usePosts } from "@/hooks/usePosts";

interface FeedPageProps {
  userType: "player" | "club";
}

export function FeedPage({ userType }: FeedPageProps) {
  const { data, isLoading, error } = usePosts();
  console.log("🔍 Hook completo:", data);
  console.log("Error:", error);

  // const feedItems = [
  //   {
  //     type: "opportunity",
  //     data: {
  //       title: "Left Midfielder Position",
  //       club: "HC Amsterdam",
  //       location: "Netherlands",
  //       level: "Professional",
  //       salary: "€2,500 - €4,000",
  //       tags: ["Professional", "1 Year Contract", "EU"],
  //     },
  //   },
  //   {
  //     type: "post",
  //     data: {
  //       author: "Alex Johnson",
  //       role: "Player",
  //       timeAgo: "2h",
  //       content:
  //         "Just finished an intense training session! 💪 Ready for the upcoming match 🏑",
  //       image: "/field-hockey-training.jpg",
  //     },
  //   },
  //   {
  //     type: "post",
  //     data: {
  //       author: "HC Davos",
  //       role: "Club",
  //       timeAgo: "4h",
  //       content:
  //         "Congratulations to our team for the amazing performance tonight! 🎉 Great victory against rivals!",
  //       image: "/field-hockey-celebration.jpg",
  //     },
  //   },
  //   {
  //     type: "post",
  //     data: {
  //       author: "Club Genk",
  //       role: "Club",
  //       timeAgo: "18h",
  //       content:
  //         "Tonight we have the big celebratin, our U12 won the championship!",
  //       image: "/genk-u12.jpg",
  //     },
  //   },
  // ];

  if (isLoading) {
    return <div>Loading posts...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <main className="max-w-2xl mx-auto mb-32 ">
      <StoriesCarousel />

      <div className="px-4 py-6 space-y-8">
        {data?.posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-24 right-4 w-16 h-16 border-2 border-border-strong hover:border-primary hover:bg-primary active:scale-95 text-foreground hover:text-white-black font-bold rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 z-30 cursor-pointer ">
        <Plus size={32} />
      </button>
    </main>
  );
}
