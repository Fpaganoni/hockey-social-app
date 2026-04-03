"use client";

import { LandingPage } from "@/components/pages/landing-page";
import { AppShell } from "@/components/layout/app-shell";
import { FeedPage } from "@/components/pages/feed-page";
import { useAuthStore } from "@/stores/useAuthStore";

export default function Home() {
  const { isLoggedIn } = useAuthStore();

  if (!isLoggedIn) {
    return <LandingPage />;
  }

  return (
    <AppShell title="Feed">
      <FeedPage />
    </AppShell>
  );
}
