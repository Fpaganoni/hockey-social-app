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

interface PostModalProps {
  postId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PostModal({ postId, isOpen, onClose }: PostModalProps) {
  const { data, isLoading } = usePost(isOpen ? postId : null);
  const locale = useLocale() as "en" | "es" | "fr";
  const t = useTranslations("feed");

  // State to manage if we are viewing comments or likes
  const [activeTab, setActiveTab] = useState<"comments" | "likes">("comments");
  const [liked, setLiked] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      {/* max-w-5xl for a large modal, p-0 to allow edge-to-edge content */}
      <DialogContent 
        className="max-w-5xl w-full p-0 overflow-hidden h-[90vh] md:h-[80vh] flex flex-col md:flex-row gap-0 rounded-2xl"
        showCloseButton={false} 
      >
        {/* Invisible Title to fix aria-describedby warning from DialogPrimitive */}
        <div className="sr-only">
          <DialogTitle>Post visualization</DialogTitle>
          <DialogDescription>Details for the selected post, including comments and likes.</DialogDescription>
        </div>

        {/* Close Button on top right corner overlaying the content */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-50 p-2 bg-black/40 hover:bg-black/60 rounded-full text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isLoading || !data?.post ? (
          <div className="w-full h-full flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            {/* Left Side - Image/Content */}
            <div className="flex-1 bg-black flex flex-col relative w-full h-[50vh] md:h-full border-b md:border-b-0 md:border-r border-border items-center justify-center">
              {data.post.imageUrl ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={data.post.imageUrl}
                    alt={data.post.content || "Post content"}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 60vw"
                  />
                </div>
              ) : (
                <div className="w-full h-full p-8 flex items-center justify-center overflow-auto text-xl text-center text-white bg-secondary/20">
                  <p>{data.post.content}</p>
                </div>
              )}
            </div>

            {/* Right Side - Details, Comments, Likes */}
            <div className="w-full md:w-[400px] flex flex-col bg-background h-[40vh] md:h-full">
              {/* Header: User Info */}
              <div className="p-4 flex items-center gap-3 border-b border-border shadow-sm z-10">
                <Avatar>
                  <AvatarImage src={data.post.user?.avatar || "/default-avatar.png"} />
                  <AvatarFallback>{data.post.user?.name?.[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-sm hover:underline cursor-pointer">{data.post.user?.name}</p>
                </div>
              </div>

              {/* Tabs for comments & likes */}
              <Tabs
                defaultValue="comments"
                value={activeTab}
                onValueChange={(val) => setActiveTab(val as "comments" | "likes")}
                className="flex-1 flex flex-col overflow-hidden"
              >
                <div className="px-4 pt-2 border-b border-border/50">
                  <TabsList className="w-full grid grid-cols-2">
                    <TabsTrigger value="comments">Comentarios ({data.post.comments?.length || 0})</TabsTrigger>
                    <TabsTrigger value="likes">Me gusta ({data.post.likes?.length || 0})</TabsTrigger>
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
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={comment.user?.avatar || "/default-avatar.png"} />
                                <AvatarFallback>{comment.user?.name?.[0] || "?"}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm">
                                  <span className="font-semibold mr-2">{comment.user?.name}</span>
                                  {comment.content}
                                </p>
                                <div className="flex items-center gap-3 mt-1">
                                  <p className="text-xs text-muted-foreground">
                                    {formatRelativeTime(comment.createdAt, locale)}
                                  </p>
                                  <button className="text-xs text-muted-foreground font-medium hidden group-hover:block hover:text-foreground">
                                    Responder
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center text-muted-foreground text-sm py-10">
                          Aún no hay comentarios.
                        </div>
                      )}
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="likes" className="m-0 h-full">
                    <ScrollArea className="h-full px-4 py-4">
                      {data.post.likes && data.post.likes.length > 0 ? (
                        <div className="flex flex-col gap-4">
                          {data.post.likes.map((like) => (
                            <div key={like.id} className="flex items-center justify-between cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-colors">
                              <div className="flex items-center gap-3">
                                <Avatar className="w-8 h-8">
                                  <AvatarImage src={like.user?.avatar || '/default-avatar.png'} /> 
                                  <AvatarFallback>{like.user?.name?.[0]}</AvatarFallback>
                                </Avatar>
                                <span className="text-sm font-semibold">{like.user?.name}</span>
                              </div>
                              <button className="text-xs bg-primary text-primary-foreground px-3 py-1 rounded-md">
                                Seguir
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center text-muted-foreground text-sm py-10">
                          Nadie ha dado me gusta todavía.
                        </div>
                      )}
                    </ScrollArea>
                  </TabsContent>
                </div>
              </Tabs>

              {/* Actions Footer */}
              <div className="p-4 border-t border-border bg-background z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                <div className="flex items-center gap-4 mb-3">
                  <button onClick={() => setLiked(!liked)} className={`transition-colors hover:scale-110 active:scale-95 ${liked ? "text-error" : "text-foreground"}`}>
                    <Heart size={26} fill={liked ? "currentColor" : "none"} className={liked ? "text-error" : ""} />
                  </button>
                  <button onClick={() => setActiveTab("comments")} className="hover:scale-110 active:scale-95 transition-transform text-foreground">
                    <MessageCircle size={26} />
                  </button>
                  <button className="hover:scale-110 active:scale-95 transition-transform text-foreground">
                    <Share2 size={26} />
                  </button>
                </div>
                <p className="font-semibold text-sm mb-1">{data.post.likes?.length || 0} Me gusta</p>
                <p className="text-[11px] text-muted-foreground uppercase tracking-wider">{formatRelativeTime(data.post.createdAt, locale)}</p>
                
                {/* Input for comments could go here */}
                <div className="mt-4 pt-3 border-t border-border flex items-center">
                  <input 
                    type="text" 
                    placeholder="Agrega un comentario..." 
                    className="flex-1 bg-transparent border-none outline-none text-sm focus:ring-0"
                  />
                  <button className="text-primary font-semibold text-sm ml-2 disabled:opacity-50">
                    Publicar
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
