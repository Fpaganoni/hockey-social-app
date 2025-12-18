"use client";

import { useState } from "react";
import { LoginPage } from "@/components/pages/login-page";
import { Header } from "@/components/layout/header";
import { BottomNavigation } from "@/components/layout/bottom-navigation";
import { FeedPage } from "@/components/pages/feed-page";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<"player" | "club" | null>(null);

  const handleLogin = (type: "player" | "club") => {
    setUserType(type);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType(null);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <>
      <Header onLogout={handleLogout} />
      <FeedPage userType={userType || "player"} />
      <BottomNavigation />
    </>
  );
}
