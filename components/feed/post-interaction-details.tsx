"use client";

import { useState, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { formatRelativeTime } from "@/lib/date-utils";
import {
  Heart,
  MessageCircle,
  Share2,
  Loader2,
  ChevronLeft,
  Send,
  Check,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePost } from "@/hooks/usePosts";
import { useAuthStore } from "@/stores/useAuthStore";
import {
  useFollowMutation,
  useUnfollowMutation,
  useFollowingUser,
} from "@/hooks/useUsers";
import {
  useLikePost,
  useUnlikePost,
  useCreateComment,
} from "@/hooks/usePostMutations";
import { useToast } from "@/hooks/ui/use-toast";

interface PostInteractionDetailsProps {
  postId: string;
  className?: string;
}

export function PostInteractionDetails({
  postId,
  className = "",
}: PostInteractionDetailsProps) {
  const { data, isLoading } = usePost(postId);
  const locale = useLocale() as "en" | "es" | "fr";
  const t = useTranslations("posts.modal");

  const { user: currentUser } = useAuthStore();
  const { data: followingData } = useFollowingUser(
    "USER",
    currentUser?.id || "",
  );
  const followingIds = new Set(
    followingData?.following.map((f) => f.followingId) || [],
  );

  const followMutation = useFollowMutation();
  const unfollowMutation = useUnfollowMutation();
  const likeMutation = useLikePost();
  const unlikeMutation = useUnlikePost();
  const commentMutation = useCreateComment();

  const [commentText, setCommentText] = useState("");
  const [showLikes, setShowLikes] = useState(false);
  const [sharecopied, setShareCopied] = useState(false);
  const commentsEndRef = useRef<HTMLDivElement>(null);
  const commentInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  if (isLoading || !data?.post) {
    return (
      <div
        className={`flex items-center justify-center min-h-[200px] bg-background border border-border rounded-xl ${className}`}
      >
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  const post = data.post;

  const isLikedByMe = post.likes?.some(
    (l) => l.user?.id === currentUser?.id || l.userId === currentUser?.id,
  );

  const handleLikeToggle = () => {
    if (!currentUser?.id) return;
    if (isLikedByMe) {
      unlikeMutation.mutate({ postId });
    } else {
      likeMutation.mutate({ postId });
    }
  };

  const handlePostComment = () => {
    if (!currentUser?.id || !commentText.trim() || commentMutation.isPending)
      return;
    commentMutation.mutate(
      { postId, content: commentText },
      {
        onSuccess: () => {
          setCommentText("");
          setTimeout(() => {
            commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
          }, 100);
        },
      },
    );
  };

  const handleFollowToggle = (targetUserId: string) => {
    if (!currentUser?.id) return;
    const isFollowing = followingIds.has(targetUserId);
    if (isFollowing) {
      unfollowMutation.mutate({
        followerType: "USER",
        followerId: currentUser.id,
        followingType: "USER",
        followingId: targetUserId,
      });
    } else {
      followMutation.mutate({
        followerType: "USER",
        followerId: currentUser.id,
        followingType: "USER",
        followingId: targetUserId,
      });
    }
  };

  const handleShare = async () => {
    const postUrl = `${window.location.origin}/post/${postId}`;
    const shareData = {
      title: post.user?.name ? `${post.user.name}'s post` : "Hockey post",
      text:
        post.content?.slice(0, 100) || "Check out this post on Hockey Connect",
      url: postUrl,
    };

    if (typeof navigator.share === "function") {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // dismissed — fall through to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(postUrl);
      setShareCopied(true);
      toast({ title: t("linkCopied"), description: postUrl, duration: 3000 });
      setTimeout(() => setShareCopied(false), 2000);
    } catch {
      toast({
        title: t("shareFailed"),
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <div
      className={`flex flex-col bg-background border border-border rounded-xl overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="px-4 py-3 flex items-center border-b border-border shrink-0">
        {showLikes ? (
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowLikes(false)}
              className="hover:opacity-70 transition-opacity text-foreground"
            >
              <ChevronLeft size={24} />
            </button>
            <span className="font-bold text-base text-foreground">
              {t("likesTab", { count: post.likes?.length || 0 })}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={post.user?.avatar || "/default-avatar.png"} />
              <AvatarFallback>{post.user?.name?.[0]}</AvatarFallback>
            </Avatar>
            <p className="font-semibold text-sm text-foreground hover:underline cursor-pointer">
              {post.user?.name}
            </p>
          </div>
        )}
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-hidden min-h-0">
        <ScrollArea className="h-full">
          <div className="px-4 py-4">
            {showLikes ? (
              post.likes && post.likes.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {post.likes.map((like) => {
                    if (!like.user) return null;
                    const isMe = like.user.id === currentUser?.id;
                    const isFollowing = followingIds.has(like.user.id);
                    return (
                      <div
                        key={like.id}
                        className="flex items-center justify-between py-1"
                      >
                        <div className="flex items-center gap-3 cursor-pointer">
                          <Avatar className="w-10 h-10">
                            <AvatarImage
                              src={like.user.avatar || "/default-avatar.png"}
                            />
                            <AvatarFallback>
                              {like.user.name?.[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-foreground truncate hover:underline">
                              {like.user.name}
                            </span>
                            <span className="text-xs text-foreground-muted">
                              {like.user.username || like.user.name}
                            </span>
                          </div>
                        </div>
                        {!isMe && (
                          <button
                            onClick={() => handleFollowToggle(like.user!.id)}
                            disabled={
                              followMutation.isPending ||
                              unfollowMutation.isPending
                            }
                            className={`text-xs px-4 py-1.5 rounded-md font-semibold transition-colors disabled:opacity-70 ${
                              isFollowing
                                ? "bg-surface-elevated text-foreground hover:bg-surface-elevated/80"
                                : "bg-primary text-white-black hover:bg-primary-hover"
                            }`}
                          >
                            {isFollowing ? t("following") : t("follow")}
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center text-foreground-muted text-sm py-10">
                  {t("noLikesYet")}
                </div>
              )
            ) : (
              <div className="flex flex-col gap-5">
                {post.content && (
                  <div className="flex gap-3">
                    <Avatar className="w-8 h-8 shrink-0">
                      <AvatarImage
                        src={post.user?.avatar || "/default-avatar.png"}
                      />
                      <AvatarFallback>{post.user?.name?.[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm wrap-break-word leading-relaxed text-foreground">
                        <span className="font-semibold mr-2">
                          {post.user?.name}
                        </span>
                        {post.content}
                      </p>
                      <p className="text-xs text-foreground-muted mt-2">
                        {formatRelativeTime(post.createdAt, locale)}
                      </p>
                    </div>
                  </div>
                )}

                {post.comments?.map((comment) => (
                  <div key={comment.id} className="flex gap-3 group">
                    <Avatar className="w-8 h-8 shrink-0">
                      <AvatarImage
                        src={comment.user?.avatar || "/default-avatar.png"}
                      />
                      <AvatarFallback>
                        {comment.user?.name?.[0] || "?"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm wrap-break-word leading-relaxed text-foreground">
                        <span className="font-semibold mr-2">
                          {comment.user?.name}
                        </span>
                        {comment.content}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <p className="text-xs text-foreground-muted">
                          {formatRelativeTime(comment.createdAt, locale)}
                        </p>
                        <button className="text-xs text-foreground-muted font-bold hidden group-hover:block hover:text-foreground">
                          {t("reply")}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={commentsEndRef} />
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-border bg-background shrink-0">
        <div className="flex items-center gap-4 mb-2">
          <button
            onClick={handleLikeToggle}
            disabled={!currentUser?.id}
            className="transition-transform hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Heart
              size={24}
              fill={isLikedByMe ? "currentColor" : "none"}
              className={isLikedByMe ? "text-error" : "text-foreground"}
            />
          </button>
          <button
            onClick={() => {
              setShowLikes(false);
              setTimeout(() => commentInputRef.current?.focus(), 0);
            }}
            className="hover:scale-110 active:scale-95 transition-transform text-foreground"
          >
            <MessageCircle size={24} />
          </button>
          <button
            onClick={handleShare}
            className="hover:scale-110 active:scale-95 transition-all text-foreground"
            title={t("share")}
          >
            {sharecopied ? (
              <Check size={22} className="text-accent" />
            ) : (
              <Share2 size={22} />
            )}
          </button>
        </div>

        <p
          className="font-bold text-sm mb-0.5 cursor-pointer hover:underline text-foreground w-fit"
          onClick={() => setShowLikes(true)}
        >
          {t("likesCount", { count: post.likes?.length || 0 })}
        </p>
        <p className="text-[11px] text-foreground-muted uppercase tracking-wider">
          {formatRelativeTime(post.createdAt, locale)}
        </p>

        <div className="mt-3 pt-3 border-t border-border flex items-center gap-2">
          <input
            ref={commentInputRef}
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handlePostComment();
            }}
            placeholder={t("addCommentPlaceholder")}
            className="flex-1 bg-transparent border-none outline-none text-sm focus:ring-0 text-foreground placeholder:text-foreground-muted disabled:opacity-50"
            disabled={!currentUser?.id || commentMutation.isPending}
          />
          <button
            onClick={handlePostComment}
            disabled={
              !currentUser?.id ||
              !commentText.trim() ||
              commentMutation.isPending
            }
            className="flex items-center gap-1 text-primary font-semibold text-sm disabled:opacity-40 transition-all hover:text-primary-hover shrink-0"
          >
            {commentMutation.isPending ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Send size={16} />
            )}
            <span>{t("publish")}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
