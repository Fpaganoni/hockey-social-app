"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { ThemeToggleButton, useThemeTransition } from "./toggleThemeRight";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);
  const { startTransition } = useThemeTransition();

  // Drag and Drop state
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 120 });
  const [isMobile, setIsMobile] = useState(true); // Default to mobile for SSR
  const dragRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef({ x: 0, y: 0 });
  const hasMovedRef = useRef(false); // Track if actually moved during drag
  const startPositionRef = useRef({ x: 0, y: 0 }); // Track starting position for movement threshold

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

    // Load saved position
    const savedPosition = localStorage.getItem("theme-toggle-position");
    if (savedPosition) {
      try {
        const pos = JSON.parse(savedPosition);
        setPosition(pos);
      } catch (e) {
        // Use default position if parsing fails
      }
    }

    // Detect screen size
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleTheme = () => {
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
  };

  // Drag handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Start tracking for potential drag
    setIsDragging(true);
    hasMovedRef.current = false; // Reset movement flag
    startPositionRef.current = { x: e.clientX, y: e.clientY }; // Store start position

    if (dragRef.current) {
      const rect = dragRef.current.getBoundingClientRect();
      offsetRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      // Calculate distance moved from start position
      const deltaX = Math.abs(e.clientX - startPositionRef.current.x);
      const deltaY = Math.abs(e.clientY - startPositionRef.current.y);
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      // Only mark as moved if user dragged more than 5 pixels (helps differentiate click from drag)
      if (distance > 5) {
        hasMovedRef.current = true;
      }

      const newX = e.clientX - offsetRef.current.x;
      const newY = e.clientY - offsetRef.current.y;

      // Keep within viewport bounds
      const maxX = window.innerWidth - 60; // 60px is approximate width
      const maxY = window.innerHeight - 60;

      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
      });
    },
    [isDragging],
  );

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      // Save position to localStorage
      localStorage.setItem("theme-toggle-position", JSON.stringify(position));
    }
  }, [isDragging, position]);

  // Touch handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      e.preventDefault();
      e.stopPropagation();

      setIsDragging(true);
      hasMovedRef.current = false;
      startPositionRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };

      if (dragRef.current) {
        const rect = dragRef.current.getBoundingClientRect();
        offsetRef.current = {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
        };
      }
    }
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;

      e.preventDefault();
      const touch = e.touches[0];

      // Calculate distance moved from start position
      const deltaX = Math.abs(touch.clientX - startPositionRef.current.x);
      const deltaY = Math.abs(touch.clientY - startPositionRef.current.y);
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      // Only mark as moved if user dragged more than 5 pixels
      if (distance > 5) {
        hasMovedRef.current = true;
      }

      const newX = touch.clientX - offsetRef.current.x;
      const newY = touch.clientY - offsetRef.current.y;

      const maxX = window.innerWidth - 60;
      const maxY = window.innerHeight - 60;

      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
      });
    },
    [isDragging],
  );

  const handleTouchEnd = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      localStorage.setItem("theme-toggle-position", JSON.stringify(position));
    }
  }, [isDragging, position]);

  // Add/remove event listeners
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handleTouchEnd);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
        window.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [
    isDragging,
    handleMouseMove,
    handleMouseUp,
    handleTouchMove,
    handleTouchEnd,
  ]);

  const handleThemeClick = useCallback(() => {
    // Only toggle theme if we didn't just drag the component
    if (!hasMovedRef.current) {
      toggleTheme();
    }
  }, [toggleTheme]);

  if (!mounted) return <>{children}</>;

  return (
    <>
      {children}
      {/* Only show draggable toggle on desktop */}
      {!isMobile && (
        <div
          ref={dragRef}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          style={{
            position: "fixed",
            left: `${position.x}px`,
            top: `${position.y}px`,
            zIndex: 50,
            cursor: isDragging ? "grabbing" : "grab",
            padding: "4px",
            borderRadius: "12px",
            transition: isDragging ? "none" : "box-shadow 0.2s",
          }}
          className={isDragging ? "ring-2 ring-primary/50" : ""}
        >
          <ThemeToggleButton
            theme={theme}
            variant="circle-blur"
            start="top-right"
            onClick={handleThemeClick}
            className="w-12 h-12 rounded-full bg-background-gradient border-2 border-primary hover:border-primary text-foreground text-sm hover:bg-primary hover:text-background shadow-lg pointer-events-auto"
          />
        </div>
      )}
    </>
  );
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
      className="hover:bg-primary/10 transition-colors"
    />
  );
}
