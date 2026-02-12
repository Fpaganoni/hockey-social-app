"use client";

import { useEffect, useState, useCallback } from "react";
import { ThemeToggleButton, useThemeTransition } from "./toggleThemeRight";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);
  const { startTransition } = useThemeTransition();

  useEffect(() => {
    setMounted(true);

    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (!savedTheme) {
      localStorage.setItem("theme", "light");
      setTheme("light");
      document.documentElement.classList.remove("dark");
    } else {
      setTheme(savedTheme);
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  if (!mounted) return <>{children}</>;

  return <>{children}</>;
}

// Export component for use in header on mobile
export function useThemeControl() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const { startTransition } = useThemeTransition();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    startTransition(() => {
      const newTheme = theme === "dark" ? "light" : "dark";
      setTheme(newTheme);
      localStorage.setItem("theme", newTheme);

      if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    });
  }, [theme, startTransition]);

  return { theme, toggleTheme };
}

export function ThemeToggleControl() {
  const { theme, toggleTheme } = useThemeControl();

  return (
    <ThemeToggleButton
      theme={theme}
      onClick={toggleTheme}
      className="w-8 h-8 rounded-sm bg-background-gradient border-2 border-primary hover:border-primary text-foreground text-sm hover:bg-primary hover:text-background shadow-lg"
    />
  );
}
