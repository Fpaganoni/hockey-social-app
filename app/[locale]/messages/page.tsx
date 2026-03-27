"use client";

import { AppShell } from "@/components/layout/app-shell";
import { MessagesPage } from "@/components/pages/messages-page";

export default function MessagesRoute() {
  return (
    <AppShell title="Messages">
      <MessagesPage />
    </AppShell>
  );
}
