"use client";

import { LoginPage } from "@/components/pages/login-page";
import { useState } from "react";

export default function LoginRoute() {
  const [userType, setUserType] = useState<"player" | "club" | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (type: "player" | "club") => {
    setUserType(type);
    setIsLoggedIn(true);
  };

  return <LoginPage onLogin={handleLogin} />;
}
