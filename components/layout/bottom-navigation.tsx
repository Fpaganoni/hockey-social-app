"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, Target, MessageSquare, User } from "lucide-react";

const navItems = [
  { href: "/feed", label: "Feed", icon: Home },
  { href: "/explore", label: "Explore", icon: Compass },
  { href: "/opportunities", label: "Opportunities", icon: Target },
  { href: "/messages", label: "Messages", icon: MessageSquare },
  { href: "/profile", label: "Profile", icon: User },
];

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/30 border-t border-border h-20 flex items-center justify-around px-4 z-40 backdrop-blur-sm">
      {navItems.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-lg transition-transform duration-200 cursor-pointer hover:scale-105 ${
              isActive
                ? "text-primary scale-110 "
                : "text-foreground hover:text-primary"
            }`}
          >
            <Icon size={24} className={isActive ? "animate-bounce" : ""} />
            <span className="text-xs font-medium">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
