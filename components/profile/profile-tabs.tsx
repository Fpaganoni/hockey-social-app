"use client";

import Image from "next/image";

// Keep existing imports below...
import { motion } from "framer-motion";
import { TrajectoryItem, UserStats } from "@/types/models/user";
import { Post } from "@/types/models/post";
import { useTranslations } from "next-intl";
import { YoutubeWidget } from "@/components/ui/youtube-widget";
import { PostCard } from "@/components/feed/post-card";
import { FileText, Loader2, Heart, MessageCircle, Copy } from "lucide-react";
import { usePostsByUser } from "@/hooks/usePosts";
import { UserApplications } from "./user-applications";

interface UserData {
  id: string;
  stats: UserStats;
  trajectories: TrajectoryItem[];
  multimedia?: string[];
}

interface ProfileTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userData: UserData;
}

export function ProfileTabs({
  activeTab,
  setActiveTab,
  userData,
}: ProfileTabsProps) {
  const t = useTranslations("profile");
  
  const tabs = [
    { id: "posts", label: t("tabs.posts") },
    { id: "trajectory", label: t("tabs.trajectory") },
    { id: "multimedia", label: t("tabs.multimedia") },
    { id: "statistics", label: t("tabs.statistics") },
    { id: "applications", label: t("tabs.applications") },
  ];

  const { data: postsData, isLoading: isLoadingPosts } = usePostsByUser(
    activeTab === "posts" ? userData.id : null
  );

  const posts = postsData?.postsByUser ?? [];

  return (
    <>
      <div className="flex bg-background border-t border-border sticky top-16 z-20 overflow-x-auto ">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 text-foreground-muted py-4 font-medium text-center border-b-2 border-l border-r transition-transform duration-300 cursor-pointer whitespace-nowrap min-w-fit hover:text-foreground ${
              activeTab === tab.id
                ? "border-b-border-strong border-b-2 text-primary font-bold hover:text-primary shadow-lg"
                : "border-b-transparent text-foreground-muted hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="px-4 py-6">
        {activeTab === "posts" && (
          <div className="w-full">
            {isLoadingPosts ? (
              <div className="flex justify-center p-8">
                <Loader2 className="animate-spin text-primary" size={32} />
              </div>
            ) : posts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full py-12 text-center border-2 border-dashed border-border rounded-xl"
              >
                <FileText className="mx-auto mb-3 text-foreground-muted" size={32} />
                <p className="text-foreground-muted font-medium">
                  {t("noPosts")}
                </p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-3 gap-1 md:gap-2">
                {posts.map((post) => {
                  const imageUrl = post.imageUrl || post.images?.[0];
                  
                  return (
                    <div key={post.id} className="relative aspect-square bg-foreground-muted/10 group overflow-hidden cursor-pointer">
                      {imageUrl ? (
                        <Image src={imageUrl} alt="Post" fill sizes="(max-width: 768px) 33vw, 25vw" className="object-cover" />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full p-4 text-xs md:text-sm text-center text-foreground break-all overflow-hidden">
                          {post.content.length > 80 ? post.content.substring(0, 80) + "..." : post.content}
                        </div>
                      )}
                      
                      {post.images && post.images.length > 1 && (
                        <div className="absolute top-2 right-2 text-white drop-shadow-md">
                          <Copy size={18} />
                        </div>
                      )}
                      
                      <div className="absolute inset-0 bg-black/40 flex opacity-0 group-hover:opacity-100 transition-opacity duration-200 justify-center items-center gap-4 md:gap-6 text-white text-sm md:text-lg font-semibold z-10">
                        <div className="flex items-center gap-1.5">
                          <Heart fill="currentColor" size={20} />
                          <span>{post.likesCount ?? post.likes?.length ?? 0}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MessageCircle fill="currentColor" size={20} />
                          <span>{post.comments?.length ?? 0}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === "trajectory" && (
          <div className="space-y-4">
            {userData.trajectories.map((item, idx) => (
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                key={idx}
                className="bg-background rounded-xl py-4 px-8 border border-border hover:shadow-lg group"
              >
                <h3 className="font-semibold text-foreground text-lg mb-1 transition-colors">
                  {item.club?.name || item.title}
                </h3>
                <p className="text-foreground-muted text-sm font-medium mb-2">
                  {item.period}
                </p>
                <p className="text-foreground-muted text-sm">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === "multimedia" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userData.multimedia && userData.multimedia.length > 0 ? (
              userData.multimedia.map((url, i) => (
                <YoutubeWidget key={i} url={url} title={`Video highlight ${i + 1}`} />
              ))
            ) : (
              <div className="col-span-full py-8 text-center border-2 border-dashed border-border rounded-xl">
                <p className="text-foreground-muted font-medium">
                  No multimedia available
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === "statistics" && (
          <div className="grid grid-cols-3 gap-3 pb-6">
            <motion.div
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="rounded-xl p-4 border border-border-strong text-center hover:border-primary transition-colors duration-300 hover:shadow-lg cursor-pointer"
            >
              <p className="text-3xl font-bold text-info">
                {userData.stats.gamesPlayed}
              </p>
              <p className="text-foreground-muted text-sm mt-2 font-medium">
                {t("stats.gamesPlayed")}
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="rounded-xl p-4 border border-border-strong text-center hover:border-primary transition-colors duration-300 hover:shadow-lg cursor-pointer"
            >
              <p className="text-3xl font-bold text-success">
                {userData.stats.goals}
              </p>
              <p className="text-foreground-muted text-sm mt-2 font-medium">
                {t("stats.goals")}
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="rounded-xl p-4 border border-border-strong text-center hover:border-primary transition-colors duration-300 hover:shadow-lg cursor-pointer"
            >
              <p className="text-3xl font-bold text-warning">
                {userData.stats.assists}
              </p>
              <p className="text-foreground-muted text-sm mt-2 font-medium">
                {t("stats.assists")}
              </p>
            </motion.div>
          </div>
        )}

        {activeTab === "applications" && <UserApplications />}
      </div>
    </>
  );
}
