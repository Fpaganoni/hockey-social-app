"use client"

import { Header } from "@/components/layout/header"
import { BottomNavigation } from "@/components/layout/bottom-navigation"
import { OpportunitiesPage } from "@/components/pages/opportunities-page"

export default function OpportunitiesRoute() {
  const handleLogout = () => {
    window.location.href = "/"
  }

  return (
    <>
      <Header title="Opportunities" onLogout={handleLogout} />
      <OpportunitiesPage />
      <BottomNavigation />
    </>
  )
}
