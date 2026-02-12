"use client";

import { LandingPage } from "@/components/pages/landing-page";
import { Header } from "@/components/layout/header";
import { BottomNavigation } from "@/components/layout/bottom-navigation";
import { FeedPage } from "@/components/pages/feed-page";
import { useAuthStore } from "@/stores/useAuthStore";

export default function Home() {
  const { isLoggedIn, user } = useAuthStore();

  if (!isLoggedIn) {
    return <LandingPage />;
  }

  return (
    <>
      <Header />
      <FeedPage />
      <BottomNavigation />
    </>
  );
}
