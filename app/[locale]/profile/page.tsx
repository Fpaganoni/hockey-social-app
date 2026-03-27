"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { UserProfilePage } from "@/components/pages/user-profile-page";

export default function ProfileRoute() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    setIsLoggedIn(false);
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  };

  return (
    <AppShell title="Profile">
      <UserProfilePage isOwnProfile={true} />
    </AppShell>
  );
}
