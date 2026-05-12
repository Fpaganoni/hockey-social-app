"use client";

import { Heart, MessageCircle, Share2 } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { formatRelativeTime } from "@/lib/date-utils";
import { Post } from "@/types/models/post";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { PostModal } from "./post-modal";
import { usePost } from "@/hooks/usePosts";
import { useLikePost, useUnlikePost } from "@/hooks/usePostMutations";
import { useAuthStore } from "@/stores/useAuthStore";
import { useToast } from "@/hooks/ui/use-toast";
import { AvatarWithStory } from "@/components/ui/avatar-with-story";

type PostCardProps = {
  post: Pick<
    Post,
    | "id"
    | "content"
    | "imageUrl"
    | "createdAt"
    | "user"
    | "comments"
    | "likes"
    | "updatedAt"
  >;
  isDetailPage?: boolean;
};

export function PostCard({ post, isDetailPage = false }: PostCardProps) {
  const t = useTranslations("feed");
  const tPosts = useTranslations("posts");
  const locale = useLocale() as "en" | "es" | "fr";
  const { id, content, imageUrl, createdAt, user, comments, likes, updatedAt } =
    post;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLikedOptimistic, setIsLikedOptimistic] = useState<boolean | null>(
    null,
  );

  // Real-time data from React Query cache (updated by like/unlike mutations)
  const { data: postData } = usePost(id);
  const liveLikes = postData?.post?.likes ?? likes;
  const liveComments = postData?.post?.comments ?? comments;

  // Auth and mutations
  const { user: currentUser } = useAuthStore();
  const router = useRouter();
  const { toast } = useToast();

  const handleGoToProfile = () => {
    router.push(`/${locale}/profile/${user.username.replace(/\./g, "/")}`);
  };

  const likePost = useLikePost();
  const unlikePost = useUnlikePost();

  // Derive liked state: prefer optimistic state, fallback to server state
  const likeFromServer =
    liveLikes?.some((l) => l.user?.id === currentUser?.id) ?? false;
  const isLiked =
    isLikedOptimistic !== null ? isLikedOptimistic : likeFromServer;

  // Calculate optimistic like count
  const likeCountServer = liveLikes?.length ?? 0;
  const likeCountOptimistic =
    isLikedOptimistic !== null
      ? isLikedOptimistic
        ? likeCountServer + (likeFromServer ? 0 : 1) // Add 1 if wasn't liked before
        : likeCountServer - (likeFromServer ? 1 : 0) // Subtract 1 if was liked before
      : likeCountServer;

  const handleLike = () => {
    if (!currentUser?.id) return;

    // Optimistic update: immediate visual feedback
    const newLikedState = !isLiked;
    setIsLikedOptimistic(newLikedState);

    if (isLiked) {
      unlikePost.mutate(
        { postId: id },
        {
          onSuccess: () => setIsLikedOptimistic(null), // Reset to server state
          onError: () => setIsLikedOptimistic(null), // Reset on error
        },
      );
    } else {
      likePost.mutate(
        { postId: id },
        {
          onSuccess: () => setIsLikedOptimistic(null), // Reset to server state
          onError: () => setIsLikedOptimistic(null), // Reset on error
        },
      );
    }
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/post/${id}`;
    const shareData = {
      title: user?.name ? `${user.name}'s post` : "Hockey post",
      text: content?.slice(0, 100) || "Check out this post on Hockey Connect",
      url: url,
    };

    // Use native share sheet if available (mobile)
    if (typeof navigator.share === "function") {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // User dismissed native share — fall through to clipboard
      }
    }

    // Fallback: copy link to clipboard
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: tPosts("modal.linkCopied"),
        description: url,
        duration: 3000,
      });
    } catch {
      toast({
        title: tPosts("modal.shareFailed"),
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <>
      <motion.div className="w-full bg-background rounded-xl overflow-hidden shadow-md hover:shadow-lg">
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-border">
          <div className="flex items-center gap-3">
            <AvatarWithStory
              user={user}
              imgClassName="w-10 h-10 object-cover"
            />
            <div>
              <p
                onClick={handleGoToProfile}
                className="font-semibold text-foreground cursor-pointer hover:underline"
              >
                {user.name}
              </p>
              <p className="text-xs text-foreground-muted">
                {user.role} • {formatRelativeTime(createdAt, locale)}
              </p>
            </div>
          </div>
          {/* Future implementation:  <button className="group p-2 rounded-lg cursor-pointer transition-colors">
          <span className="text-foreground group-hover:text-foreground-muted text-md">
            •••
          </span>
        </button> */}
        </div>

        {/* Content */}
        <div
          className={`px-4 py-3 ${isDetailPage ? "" : "cursor-pointer"}`}
          onClick={isDetailPage ? undefined : () => setIsModalOpen(true)}
        >
          <p className="text-foreground leading-relaxed text-sm">{content}</p>
        </div>

        {/* Image */}
        {imageUrl && (
          <Image
            src={imageUrl}
            width={600}
            height={300}
            alt={t("postContent")}
            className={`w-full h-[600px] object-cover ${isDetailPage ? "" : "cursor-pointer"}`}
            onClick={isDetailPage ? undefined : () => setIsModalOpen(true)}
          />
        )}

        {/* Actions — hidden on detail page (handled by PostInteractionDetails) */}
        {!isDetailPage && (
          <div className="px-4 py-3 flex items-center justify-around border-t border-border">
            <button
              onClick={handleLike}
              disabled={
                !currentUser?.id || likePost.isPending || unlikePost.isPending
              }
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-300 cursor-pointer ${
                isLiked
                  ? "text-error hover:bg-error/30"
                  : "text-foreground  hover:bg-error/30"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
              <span className="text-sm font-medium">{likeCountOptimistic}</span>
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 hover:bg-foreground-muted/30 rounded-lg transition-colors duration-300 cursor-pointer"
            >
              <MessageCircle size={18} />
              <span className="text-sm font-medium">{liveComments?.length}</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 hover:bg-foreground-muted/30 rounded-lg transition-colors duration-300 cursor-pointer"
            >
              <Share2 size={18} />
            </button>
          </div>
        )}
      </motion.div>

      {!isDetailPage && (
        <PostModal
          postId={id}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
