import { FeedPage } from "@/components/pages/feed-page";
import { AppShell } from "@/components/layout/app-shell";

export default function FeedRoute() {
  return (
    <AppShell title="Feed">
      <FeedPage />
    </AppShell>
  );
}
