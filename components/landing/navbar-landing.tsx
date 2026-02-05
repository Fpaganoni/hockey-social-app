"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { HockeyXTicks } from "@/components/ui/hockey-xtick";
import { Button } from "@/components/ui/button";

export function NavbarLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#features", label: "Features" },
    { href: "#about", label: "About Us" },
    { href: "#stats", label: "Stats" },
    { href: "#cta", label: "Join Us" },
  ];

  return (
    <header className="sticky top-0 bg-background/30 backdrop-blur-sm border-b border-border z-50 px-4 py-3">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/landing" className="flex items-center gap-2">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-8 h-8 flex items-center justify-center">
              <HockeyXTicks size={28} className="text-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">
              Hockey Connect
            </h1>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/login">
            <Button
              variant="ghost"
              size="default"
              className="bg-input/30 hover:bg-input/80 text-foreground "
            >
              Sign In
            </Button>
          </Link>
          <Link href="/register">
            <Button
              variant="ghost"
              size="default"
              className="text-pure-white hover:text-pure-white bg-primary/80 hover:bg-primary"
            >
              Sign Up
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 hover:bg-primary/10 rounded-lg transition-colors"
        >
          {isMenuOpen ? (
            <X size={24} className="text-foreground" />
          ) : (
            <Menu size={24} className="text-foreground" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-border mt-3 pt-4 pb-4"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-foreground hover:text-primary transition-colors font-medium px-2 py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" size="default" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="default" size="default" className="w-full">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
