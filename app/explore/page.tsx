"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { BottomNavigation } from "@/components/layout/bottom-navigation"
import { ExplorePage } from "@/components/pages/explore-page"

export default function ExploreRoute() {
  const handleLogout = () => {
    window.location.href = "/"
  }

  return (
    <>
      <Header title="Explore" onLogout={handleLogout} />
      <ExplorePage />
      <BottomNavigation />
    </>
  )
}
