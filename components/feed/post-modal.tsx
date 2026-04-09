"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { formatRelativeTime } from "@/lib/date-utils";
import { Heart, MessageCircle, Share2, Loader2, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePost } from "@/hooks/usePosts";
import { useAuthStore } from "@/stores/useAuthStore";
import { useFollowMutation, useUnfollowMutation, useFollowingUser } from "@/hooks/useUsers";
import { useLikePost, useUnlikePost, useCreateComment } from "@/hooks/usePostMutations";

interface PostModalProps {
  postId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PostModal({ postId, isOpen, onClose }: PostModalProps) {
  const { data, isLoading } = usePost(isOpen ? postId : null);
  const locale = useLocale() as "en" | "es" | "fr";
  const t = useTranslations("posts.modal");
  
  const { user: currentUser } = useAuthStore();
  const { data: followingData } = useFollowingUser("User", currentUser?.id || "");
  const followingIds = new Set(followingData?.following.map((f) => f.followingId) || []);

  const followMutation = useFollowMutation();
  const unfollowMutation = useUnfollowMutation();
  const likeMutation = useLikePost();
  const unlikeMutation = useUnlikePost();
  const commentMutation = useCreateComment();

  const [activeTab, setActiveTab] = useState<"comments" | "likes">("comments");
  const [commentText, setCommentText] = useState("");

  if (!isOpen) return null;

  const isLikedByMe = data?.post?.likes?.some((l) => l.user?.id === currentUser?.id);

  const handleLikeToggle = () => {
    if (!postId) return;
    if (isLikedByMe) {
      unlikeMutation.mutate({ postId });
    } else {
      likeMutation.mutate({ postId });
    }
  };

  const handlePostComment = () => {
    if (!postId || !commentText.trim() || commentMutation.isPending) return;
    commentMutation.mutate(
      { postId, content: commentText },
      { onSuccess: () => setCommentText("") }
    );
  };

  const handleFollowToggle = (targetUserId: string) => {
    if (!currentUser?.id) return;
    const isFollowing = followingIds.has(targetUserId);

    if (isFollowing) {
      unfollowMutation.mutate({
        followerType: "User",
        followerId: currentUser.id,
        followingType: "User",
        followingId: targetUserId,
      });
    } else {
      followMutation.mutate({
        followerType: "User",
        followerId: currentUser.id,
        followingType: "User",
        followingId: targetUserId,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent 
        className="max-w-7xl w-full p-0 overflow-hidden h-[90vh] flex flex-col md:flex-row gap-0 rounded-2xl bg-black"
        showCloseButton={false} 
      >
        <div className="sr-only">
          <DialogTitle>Post visualization</DialogTitle>
          <DialogDescription>Details for the selected post, including comments and likes.</DialogDescription>
        </div>

        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-50 p-2 bg-black/40 hover:bg-black/60 rounded-full text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isLoading || !data?.post ? (
          <div className="w-full h-full flex items-center justify-center bg-background rounded-l-2xl">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            {/* Left Side - Image/Content */}
            <div className="flex-1 relative w-full h-[50vh] md:h-full flex items-center justify-center">
              {data.post.imageUrl ? (
                <div className="relative w-full h-full flex items-center justify-center p-4">
                  <Image
                    src={data.post.imageUrl}
                    alt={data.post.content || "Post content"}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 70vw"
                  />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center p-8 overflow-auto text-xl text-center text-white bg-zinc-900">
                  <p>{data.post.content}</p>
                </div>
              )}
            </div>

            {/* Right Side - Details, Comments, Likes */}
            <div className="w-full md:w-[400px] lg:w-[450px] shrink-0 flex flex-col bg-background h-[50vh] md:h-full border-l border-border relative">
              {/* Header: User Info */}
              <div className="p-4 flex items-center justify-between border-b border-border shadow-sm z-10 shrink-0">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={data.post.user?.avatar || "/default-avatar.png"} />
                    <AvatarFallback>{data.post.user?.name?.[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm hover:underline cursor-pointer">{data.post.user?.name}</p>
                  </div>
                </div>
              </div>

              {/* Tabs for comments & likes */}
              <Tabs
                defaultValue="comments"
                value={activeTab}
                onValueChange={(val) => setActiveTab(val as "comments" | "likes")}
                className="flex-1 flex flex-col overflow-hidden min-h-0"
              >
                <div className="px-4 pt-2 border-b border-border/50 shrink-0">
                  <TabsList className="w-full grid grid-cols-2">
                    <TabsTrigger value="comments">{t("commentsTab", { count: data.post.comments?.length || 0 })}</TabsTrigger>
                    <TabsTrigger value="likes">{t("likesTab", { count: data.post.likes?.length || 0 })}</TabsTrigger>
                  </TabsList>
                </div>

                <div className="flex-1 overflow-hidden">
                  <TabsContent value="comments" className="m-0 h-full">
                    <ScrollArea className="h-full px-4 py-4">
                      {/* Post caption as the first "comment" */}
                      {data.post.content && (
                        <div className="flex gap-3 mb-6">
                           <Avatar className="w-8 h-8">
                             <AvatarImage src={data.post.user?.avatar || "/default-avatar.png"} />
                             <AvatarFallback>{data.post.user?.name?.[0]}</AvatarFallback>
                           </Avatar>
                           <div>
                             <p className="text-sm">
                               <span className="font-semibold mr-2">{data.post.user?.name}</span>
                               {data.post.content}
                             </p>
                             <p className="text-xs text-muted-foreground mt-1">
                               {formatRelativeTime(data.post.createdAt, locale)}
                             </p>
                           </div>
                        </div>
                      )}
                      
                      {/* Actual Comments */}
                      {data.post.comments && data.post.comments.length > 0 ? (
                        <div className="flex flex-col gap-4 pb-4">
                          {data.post.comments.map((comment) => (
                            <div key={comment.id} className="flex gap-3 group">
                              <Avatar className="w-8 h-8 shrink-0">
                                <AvatarImage src={comment.user?.avatar || "/default-avatar.png"} />
                                <AvatarFallback>{comment.user?.name?.[0] || "?"}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm break-words">
                                  <span className="font-semibold mr-2">{comment.user?.name}</span>
                                  {comment.content}
                                </p>
                                <div className="flex items-center gap-3 mt-1">
                                  <p className="text-xs text-muted-foreground shrink-0">
                                    {formatRelativeTime(comment.createdAt, locale)}
                                  </p>
                                  <button className="text-xs text-muted-foreground font-medium hidden group-hover:block hover:text-foreground">
                                    {t("reply")}
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center text-muted-foreground text-sm py-10">
                          {t("noCommentsYet")}
                        </div>
                      )}
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="likes" className="m-0 h-full">
                    <ScrollArea className="h-full px-4 py-4">
                      {data.post.likes && data.post.likes.length > 0 ? (
                        <div className="flex flex-col gap-4">
                          {data.post.likes.map((like) => {
                            if (!like.user) return null;
                            const isMe = like.user.id === currentUser?.id;
                            const isFollowing = followingIds.has(like.user.id);
                            
                            return (
                              <div key={like.id} className="flex items-center justify-between cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-colors">
                                <div className="flex items-center gap-3">
                                  <Avatar className="w-8 h-8 shrink-0">
                                    <AvatarImage src={like.user.avatar || '/default-avatar.png'} /> 
                                    <AvatarFallback>{like.user.name?.[0]}</AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm font-semibold truncate hover:underline">{like.user.name}</span>
                                </div>
                                {!isMe && (
                                  <button 
                                    onClick={() => handleFollowToggle(like.user!.id)}
                                    disabled={followMutation.isPending || unfollowMutation.isPending}
                                    className={`text-xs px-3 py-1.5 rounded-md font-semibold transition-colors disabled:opacity-70 ${
                                      isFollowing 
                                        ? "bg-secondary text-secondary-foreground hover:bg-secondary/80" 
                                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                                    }`}
                                  >
                                    {isFollowing ? t("following") : t("follow")}
                                  </button>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      ) : (
                        <div className="text-center text-muted-foreground text-sm py-10">
                          {t("noLikesYet")}
                        </div>
                      )}
                    </ScrollArea>
                  </TabsContent>
                </div>
              </Tabs>

              {/* Actions Footer */}
              <div className="p-4 border-t border-border bg-background z-10 shrink-0">
                <div className="flex items-center gap-4 mb-3">
                  <button onClick={handleLikeToggle} className="transition-colors hover:scale-110 active:scale-95">
                    <Heart size={26} fill={isLikedByMe ? "currentColor" : "none"} className={isLikedByMe ? "text-error" : "text-foreground"} />
                  </button>
                  <button onClick={() => setActiveTab("comments")} className="hover:scale-110 active:scale-95 transition-transform text-foreground">
                    <MessageCircle size={26} />
                  </button>
                  <button className="hover:scale-110 active:scale-95 transition-transform text-foreground">
                    <Share2 size={26} />
                  </button>
                </div>
                <p className="font-semibold text-sm mb-1">{t("likesCount", { count: data.post.likes?.length || 0 })}</p>
                <p className="text-[11px] text-muted-foreground uppercase tracking-wider">{formatRelativeTime(data.post.createdAt, locale)}</p>
                
                {/* Input for comments */}
                <div className="mt-4 pt-3 border-t border-border flex items-center">
                  <input 
                    type="text" 
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handlePostComment(); }}
                    placeholder={t("addCommentPlaceholder")} 
                    className="flex-1 bg-transparent border-none outline-none text-sm focus:ring-0 text-foreground"
                  />
                  <button 
                    onClick={handlePostComment}
                    disabled={!commentText.trim() || commentMutation.isPending}
                    className="text-primary font-semibold text-sm ml-2 disabled:opacity-50 transition-opacity"
                  >
                    {commentMutation.isPending ? t("publishing") : t("publish")}
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
