"use client"

import { useEffect, useState } from "react"
import { ThemeToggleButton, useThemeTransition } from "./toggleThemeRight"

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null)
  const [mounted, setMounted] = useState(false)
  const { startTransition } = useThemeTransition()

  useEffect(() => {
    setMounted(true)
    
    // Read the theme if there is one saved in localStorage 
    const isThereTheme = localStorage.getItem("theme");
    const initialTheme = isThereTheme === "light" ? "light" : "dark";
    setTheme(initialTheme)
  }, [])

  const toggleTheme = () => {
    startTransition(() => {
      const newTheme = theme === "dark" ? "light" : "dark"
      setTheme(newTheme)
      localStorage.setItem("theme", newTheme)
      // document.documentElement.classList.toggle("dark", newTheme === "dark")
    })
  }

  if (!mounted) return <>{children}</>

  return (
    <>
      {children}
      <div
        style={{
          position: "fixed",
          top: "100px",
          right: "20px",
          zIndex: 50,
        }}
      >
        <ThemeToggleButton
          theme={theme}
          variant="circle-blur"
          start="top-right"
          onClick={toggleTheme}
          className="w-12 h-12 rounded-full bg-primary dark:bg-primary dark:hover:bg-red-500 text-primary-foreground dark:text-primary-foreground shadow-lg"
        />
      </div>
    </>
  )
}
