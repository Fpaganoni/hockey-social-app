"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { BottomNavigation } from "@/components/layout/bottom-navigation"
import { UserProfilePage } from "@/components/pages/user-profile-page"

export default function ProfileRoute() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  const handleLogout = () => {
    setIsLoggedIn(false)
    // Reset to home with logout
    if (typeof window !== 'undefined') {
      window.location.href = '/'
    }
  }

  return (
    <>
      <Header title="Profile" showNotifications={false} onLogout={handleLogout} />
      <UserProfilePage isOwnProfile={true} />
      <BottomNavigation />
    </>
  )
}
