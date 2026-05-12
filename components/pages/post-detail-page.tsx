"use client";

import { usePost } from "@/hooks/usePosts";
import { PostCard } from "@/components/feed/post-card";
import { PostInteractionDetails } from "@/components/feed/post-interaction-details";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

interface PostDetailPageProps {
  postId: string;
}

export function PostDetailPage({ postId }: PostDetailPageProps) {
  const { data, isLoading, isError } = usePost(postId);
  const t = useTranslations("feed");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 size={24} className="animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError || !data?.post) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-sm text-muted-foreground">{t("postNotFound")}</p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto py-6 px-4">
      <div className="flex flex-col lg:flex-row lg:items-start gap-4">
        {/* Left: post content/image */}
        <div className="w-full lg:flex-1 lg:min-w-0">
          <PostCard post={data.post} isDetailPage />
        </div>

        {/* Right: interactions with independent scroll on desktop */}
        <div className="w-full lg:w-[380px] lg:shrink-0 lg:sticky lg:top-6 h-auto lg:h-[calc(100vh-80px)]">
          <PostInteractionDetails postId={postId} className="h-full" />
        </div>
      </div>
    </div>
  );
}
