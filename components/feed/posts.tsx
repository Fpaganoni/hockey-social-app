import { PostCard } from "./post-card";
import { usePosts } from "@/hooks/usePosts";
import { Loader } from "@/components/ui/loader";
import { Error } from "@/components/ui/error";

export function Posts() {
  const { data, isLoading, error } = usePosts({ limit: 10 });

  if (isLoading) {
    return <Loader children="Loading posts..." />;
  }

  if (error) {
    return <Error>{error.message}</Error>;
  }

  return (
    <div className="px-4 py-6 space-y-8">
      {data?.posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
