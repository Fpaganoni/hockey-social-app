"use client";

import { AppShell } from "@/components/layout/app-shell";
import { ExplorePage } from "@/components/pages/explore-page";

export default function ExploreRoute() {
  return (
    <AppShell title="Explore">
      <ExplorePage />
    </AppShell>
  );
}
