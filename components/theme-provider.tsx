"use client"

import { useEffect, useState } from "react"

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("dark")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light")
    setTheme(initialTheme)
    document.documentElement.classList.toggle("dark", initialTheme === "dark")
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  if (!mounted) return <>{children}</>

  return (
    <>
      {children}
      <div
        style={{
          position: "fixed",
          bottom: "100px",
          right: "20px",
          zIndex: 50,
        }}
      >
        <button
          onClick={toggleTheme}
          className="w-12 h-12 rounded-full bg-accent-bright dark:bg-accent text-primary dark:text-primary flex items-center justify-center hover:opacity-90 cursor-pointer transition-all duration-300 shadow-lg"
          title="Toggle theme"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </div>
    </>
  )
}
