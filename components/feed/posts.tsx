"use client";

import { PostCard } from "./post-card";
import { usePosts } from "@/hooks/usePosts";
import { Loader } from "@/components/ui/loader";
import { Error } from "@/components/ui/error";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useTranslations } from "next-intl";

export function Posts() {
  const t = useTranslations("feed");
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePosts(5);

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "100px",
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return <Loader children={t("loadingPosts")} />;
  }

  if (error) {
    return <Error>{error.message}</Error>;
  }

  const allPost = data?.pages.flatMap((page) => page.posts) ?? [];

  return (
    <div className="flex flex-col items-center  px-4 py-6 space-y-8">
      {allPost.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {hasNextPage && (
        <div ref={ref} className="py-4 text-center">
          {isFetchingNextPage ? (
            <Loader children={t("loadingMorePosts")} />
          ) : (
            <span className="text-muted-foreground">
              {t("scrollToLoadMore")}
            </span>
          )}
        </div>
      )}

      {!hasNextPage && allPost.length > 0 && (
        <div className="py-8 text-center text-muted-foreground">
          {t("noMorePosts")}
        </div>
      )}
    </div>
  );
}
