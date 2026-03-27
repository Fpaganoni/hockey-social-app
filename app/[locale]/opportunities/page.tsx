"use client";

import { AppShell } from "@/components/layout/app-shell";
import { OpportunitiesPage } from "@/components/pages/opportunities-page";

export default function OpportunitiesRoute() {
  return (
    <AppShell title="Opportunities">
      <OpportunitiesPage />
    </AppShell>
  );
}
