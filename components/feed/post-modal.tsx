"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { formatRelativeTime } from "@/lib/date-utils";
import {
  Heart,
  MessageCircle,
  Share2,
  Loader2,
  X,
  MoreHorizontal,
  ChevronLeft,
  Send,
  Check,
  Link2,
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

interface PostModalProps {
  postId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

// Breakpoint at which we switch to side-by-side layout (px)
const SIDE_BY_SIDE_BREAKPOINT = 900;

export function PostModal({ postId, isOpen, onClose }: PostModalProps) {
  const { data, isLoading } = usePost(isOpen ? postId : null);
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
  const [isWide, setIsWide] = useState(false);
  const [sharecopied, setShareCopied] = useState(false);
  const commentsEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Track actual window width to determine layout, bypassing Tailwind's
  // breakpoint system which can be unreliable inside portal-mounted dialogs.
  useEffect(() => {
    const update = () =>
      setIsWide(window.innerWidth >= SIDE_BY_SIDE_BREAKPOINT);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const handleClose = () => {
    setShowLikes(false);
    onClose();
  };

  if (!isOpen) return null;

  // Scroll to bottom of comments when a new one is added
  // We do this after render via a layout effect in the scroll area

  // isLikedByMe checks both user.id and userId for optimistic update compatibility
  const isLikedByMe = data?.post?.likes?.some(
    (l) => l.user?.id === currentUser?.id || l.userId === currentUser?.id,
  );

  const handleLikeToggle = () => {
    if (!postId || !currentUser?.id) return;
    if (isLikedByMe) {
      unlikeMutation.mutate({ postId });
    } else {
      likeMutation.mutate({ postId });
    }
  };

  const handlePostComment = () => {
    if (!postId || !currentUser?.id || !commentText.trim() || commentMutation.isPending) return;
    commentMutation.mutate(
      { postId, content: commentText },
      {
        onSuccess: () => {
          setCommentText("");
          // Scroll to bottom after the DOM updates
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
      title: data?.post?.user?.name
        ? `${data.post.user.name}'s post`
        : "Hockey post",
      text:
        data?.post?.content?.slice(0, 100) ||
        "Check out this post on Hockey Connect",
      url: postUrl,
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
      await navigator.clipboard.writeText(postUrl);
      setShareCopied(true);
      toast({
        title: t("linkCopied"),
        description: postUrl,
        duration: 3000,
      });
      setTimeout(() => setShareCopied(false), 2000);
    } catch {
      toast({
        title: t("shareFailed"),
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  // Sidebar width in the side-by-side layout
  const SIDEBAR_W = 380;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent
        // Use inline style for the layout — this is reliable inside a portal
        className="p-0 overflow-hidden rounded-lg bg-surface border border-border"
        style={{
          width: "95vw",
          maxWidth: 1400,
          height: "92vh",
          maxHeight: "92vh",
          display: "flex",
          flexDirection: isWide ? "row" : "column",
          gap: 0,
        }}
        showCloseButton={false}
      >
        <div className="sr-only">
          <DialogTitle>Post visualization</DialogTitle>
          <DialogDescription>
            Details for the selected post, including comments and likes.
          </DialogDescription>
        </div>

        {/* Close button — visible on narrow screens */}
        {!isWide && (
          <button
            onClick={handleClose}
            className="absolute right-3 top-3 z-50 p-2 bg-background/70 backdrop-blur-sm hover:bg-background/90 rounded-full text-foreground transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {isLoading || !data?.post ? (
          <div className="w-full h-full flex items-center justify-center bg-background">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            {/* ===== IMAGE PANEL ===== */}
            <div
              className="relative flex items-center justify-center bg-black/90 overflow-hidden"
              style={
                isWide
                  ? { flex: 1, minWidth: 0, height: "100%" }
                  : { width: "100%", height: "45%" }
              }
            >
              {data.post.imageUrl ? (
                <Image
                  src={data.post.imageUrl}
                  alt={data.post.content || "Post content"}
                  fill
                  className="object-contain"
                  sizes="(max-width: 900px) 95vw, 70vw"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center p-8 overflow-auto text-xl text-center text-foreground bg-surface-elevated">
                  <p>{data.post.content}</p>
                </div>
              )}
            </div>

            {/* ===== SIDEBAR PANEL ===== */}
            <div
              className="flex flex-col bg-background border-border overflow-hidden"
              style={
                isWide
                  ? {
                      width: SIDEBAR_W,
                      minWidth: SIDEBAR_W,
                      maxWidth: SIDEBAR_W,
                      height: "100%",
                      borderLeft: "1px solid var(--border)",
                    }
                  : {
                      width: "100%",
                      flex: 1,
                      minHeight: 0,
                      borderTop: "1px solid var(--border)",
                    }
              }
            >
              {/* Header */}
              <div className="px-4 py-3 flex items-center justify-between border-b border-border shrink-0">
                {showLikes ? (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setShowLikes(false)}
                      className="hover:opacity-70 transition-opacity text-foreground"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <span className="font-bold text-base text-foreground">
                      {t("likesTab", { count: data.post.likes?.length || 0 })}
                    </span>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage
                          src={data.post.user?.avatar || "/default-avatar.png"}
                        />
                        <AvatarFallback>
                          {data.post.user?.name?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <p className="font-semibold text-sm text-foreground hover:underline cursor-pointer">
                        {data.post.user?.name}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={handleClose}
                        className="text-foreground-muted hover:text-foreground transition-colors p-1"
                      >
                        <X size={20} />
                      </button>
                      <button className="text-foreground-muted hover:text-foreground transition-colors p-1">
                        <MoreHorizontal size={20} />
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Scrollable content */}
              <div className="flex-1 overflow-hidden min-h-0">
                <ScrollArea className="h-full">
                  <div className="px-4 py-4">
                    {showLikes ? (
                      /* LIKES */
                      data.post.likes && data.post.likes.length > 0 ? (
                        <div className="flex flex-col gap-3">
                          {data.post.likes.map((like) => {
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
                                      src={
                                        like.user.avatar ||
                                        "/default-avatar.png"
                                      }
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
                                    onClick={() =>
                                      handleFollowToggle(like.user!.id)
                                    }
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
                      /* COMMENTS */
                      <div className="flex flex-col gap-5">
                        {data.post.content && (
                          <div className="flex gap-3">
                            <Avatar className="w-8 h-8 shrink-0">
                              <AvatarImage
                                src={
                                  data.post.user?.avatar ||
                                  "/default-avatar.png"
                                }
                              />
                              <AvatarFallback>
                                {data.post.user?.name?.[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="text-sm wrap-break-word leading-relaxed text-foreground">
                                <span className="font-semibold mr-2">
                                  {data.post.user?.name}
                                </span>
                                {data.post.content}
                              </p>
                              <p className="text-xs text-foreground-muted mt-2">
                                {formatRelativeTime(
                                  data.post.createdAt,
                                  locale,
                                )}
                              </p>
                            </div>
                          </div>
                        )}

                        {data.post.comments?.map((comment) => (
                          <div key={comment.id} className="flex gap-3 group">
                            <Avatar className="w-8 h-8 shrink-0">
                              <AvatarImage
                                src={
                                  comment.user?.avatar || "/default-avatar.png"
                                }
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
                                  {formatRelativeTime(
                                    comment.createdAt,
                                    locale,
                                  )}
                                </p>
                                <button className="text-xs text-foreground-muted font-bold hidden group-hover:block hover:text-foreground">
                                  {t("reply")}
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                        {/* Sentinel for scroll-to-bottom */}
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
                    onClick={() => setShowLikes(false)}
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
                  {t("likesCount", { count: data.post.likes?.length || 0 })}
                </p>
                <p className="text-[11px] text-foreground-muted uppercase tracking-wider">
                  {formatRelativeTime(data.post.createdAt, locale)}
                </p>

                <div className="mt-3 pt-3 border-t border-border flex items-center gap-2">
                  <input
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
                    disabled={!currentUser?.id || !commentText.trim() || commentMutation.isPending}
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
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
