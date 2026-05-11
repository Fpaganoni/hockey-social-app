"use client";

import { usePost } from "@/hooks/usePosts";
import { PostCard } from "@/components/feed/post-card";
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
    <div className="max-w-2xl mx-auto py-6 px-4">
      <PostCard post={data.post} />
    </div>
  );
}
