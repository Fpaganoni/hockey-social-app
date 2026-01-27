"use client";

import { FeedPage } from "@/components/pages/feed-page";
import { Header } from "@/components/layout/header";
import { BottomNavigation } from "@/components/layout/bottom-navigation";

export default function FeedRoute() {
  return (
    <>
      <Header title="Feed" />
      <FeedPage userType="player" />
      <BottomNavigation />
    </>
  );
}
