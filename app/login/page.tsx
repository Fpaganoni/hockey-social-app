"use client";

import { LoginPage } from "@/components/pages/login-page";
import { useRouter } from "next/navigation";

export default function LoginRoute() {
  const router = useRouter();

  const handleLogin = (type: "player" | "club") => {
    router.push("/explore");
  };

  return <LoginPage onLogin={handleLogin} />;
}
