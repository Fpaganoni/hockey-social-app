"use client";

import type React from "react";
import { SideNavigation } from "./side-navigation";
import { Header } from "./header";

interface AppShellProps {
  children: React.ReactNode;
  title?: string;
}

/**
 * AppShell wraps every authenticated page with:
 *  - A fixed left sidebar (SideNavigation)
 *  - A top Header (sticky)
 *  - A scrollable main content area
 */
export function AppShell({ children, title }: AppShellProps) {
  return (
    <div className="flex min-h-screen">
      {/* Fixed sidebar – 80px wide (w-20) */}
      <SideNavigation />

      {/* Main column pushed right by the sidebar width */}
      <div className="flex flex-col flex-1 ml-20 min-h-screen">
        <Header title={title} />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
