import { Metadata } from "next";
import { AppShell } from "@/components/layout/app-shell";
import { PostDetailPage } from "@/components/pages/post-detail-page";

interface PostRouteProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: PostRouteProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Post | Hockey Social`,
    description: `View post ${id}`,
  };
}

export default async function PostRoute({ params }: PostRouteProps) {
  const { id } = await params;

  return (
    <AppShell title="Post">
      <PostDetailPage postId={id} />
    </AppShell>
  );
}
