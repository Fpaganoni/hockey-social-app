"use client"

import { Header } from "@/components/layout/header"
import { BottomNavigation } from "@/components/layout/bottom-navigation"
import { MessagesPage } from "@/components/pages/messages-page"

export default function MessagesRoute() {
  const handleLogout = () => {
    window.location.href = "/"
  }

  return (
    <>
      <Header title="Messages" onLogout={handleLogout} />
      <MessagesPage />
      <BottomNavigation />
    </>
  )
}
