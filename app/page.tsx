"use client";

import { LoginPage } from "@/components/pages/login-page";
import { Header } from "@/components/layout/header";
import { BottomNavigation } from "@/components/layout/bottom-navigation";
import { FeedPage } from "@/components/pages/feed-page";
import { useAuthStore } from "@/stores/useAuthStore";

export default function Home() {
  const { isLoggedIn, user } = useAuthStore();

  if (!isLoggedIn) {
    return <LoginPage />;
  }

  return (
    <>
      <Header />
      <FeedPage userType={user?.role || "player"} />
      <BottomNavigation />
    </>
  );
}
