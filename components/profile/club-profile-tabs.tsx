"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Users, Briefcase, FileText, Loader2, Copy, Heart, MessageCircle, MapPin } from "lucide-react";
import { usePostsByUser } from "@/hooks/usePosts";

interface ClubData {
  id: string;
  bio?: string;
  city?: string;
  country?: string;
}

interface ClubProfileTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  clubData: ClubData;
}

export function ClubProfileTabs({
  activeTab,
  setActiveTab,
  clubData,
}: ClubProfileTabsProps) {
  const t = useTranslations("clubProfile");

  const tabs = [
    { id: "posts", label: t("tabs.posts") },
    { id: "squad", label: t("tabs.squad") },
    { id: "opportunities", label: t("tabs.opportunities") },
    { id: "about", label: t("tabs.about") },
  ];

  const { data: postsData, isLoading: isLoadingPosts } = usePostsByUser(
    activeTab === "posts" ? clubData.id : null
  );

  const posts = postsData?.postsByUser ?? [];

  return (
    <>
      <div className="flex bg-background border-t border-border sticky top-16 z-20 overflow-x-auto">
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
        {/* Posts Tab */}
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
                  {t("noPosts", { fallback: "No posts yet" })}
                </p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-3 gap-1 md:gap-2">
                {posts.map((post) => {
                  const imageUrl = post.imageUrl || post.images?.[0];
                  return (
                    <div
                      key={post.id}
                      className="relative aspect-square bg-foreground-muted/10 group overflow-hidden cursor-pointer"
                    >
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt="Post"
                          fill
                          sizes="(max-width: 768px) 33vw, 25vw"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full p-4 text-xs md:text-sm text-center text-foreground break-all overflow-hidden">
                          {post.content.length > 80
                            ? post.content.substring(0, 80) + "..."
                            : post.content}
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

        {/* Squad Tab */}
        {activeTab === "squad" && (
          <div className="py-12">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full text-center border-2 border-dashed border-border rounded-xl p-8"
            >
              <Users className="mx-auto mb-3 text-foreground-muted" size={40} />
              <p className="text-foreground-muted font-medium">
                {t("squad.noMembers")}
              </p>
            </motion.div>
          </div>
        )}

        {/* Opportunities Tab */}
        {activeTab === "opportunities" && (
          <div className="py-12">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full text-center border-2 border-dashed border-border rounded-xl p-8"
            >
              <Briefcase className="mx-auto mb-3 text-foreground-muted" size={40} />
              <p className="text-foreground-muted font-medium">
                {t("opportunities.noOpportunities")}
              </p>
            </motion.div>
          </div>
        )}

        {/* About Tab */}
        {activeTab === "about" && (
          <div className="space-y-4 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-background rounded-xl p-6 border border-border"
            >
              <h3 className="font-bold text-foreground text-lg mb-4">
                {t("about.title")}
              </h3>

              {/* Location */}
              {(clubData.city || clubData.country) && (
                <div className="flex items-start gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-foreground-muted text-sm font-medium">
                      {t("about.location")}
                    </p>
                    <p className="text-foreground text-sm">
                      {[clubData.city, clubData.country]
                        .filter(Boolean)
                        .join(", ") || t("about.noLocation")}
                    </p>
                  </div>
                </div>
              )}

              {/* Bio/Description */}
              {clubData.bio && (
                <div className="border-t border-border pt-4">
                  <p className="text-foreground-muted text-sm font-medium mb-2">
                    Description
                  </p>
                  <p className="text-foreground text-sm leading-relaxed">
                    {clubData.bio}
                  </p>
                </div>
              )}

              {!clubData.bio && !(clubData.city || clubData.country) && (
                <p className="text-foreground-muted text-sm text-center py-4">
                  {t("noBio")}
                </p>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </>
  );
}
