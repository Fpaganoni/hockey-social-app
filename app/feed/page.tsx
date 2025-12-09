"use client";

import { FeedPage } from "@/components/pages/feed-page";
import { Header } from "@/components/layout/header";
import { BottomNavigation } from "@/components/layout/bottom-navigation";

export default function FeedRoute() {
  const handleLogout = () => {
    window.location.href = "/";
  };

  return (
    <>
      <Header title="Feed" onLogout={handleLogout} />
      <FeedPage userType="player" />
      <BottomNavigation />
    </>
  );
}
