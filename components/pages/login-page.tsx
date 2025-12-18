"use client";

import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { HockeyXTicks } from "../ui/hockey-xtick";
import Link from "next/link";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";

const DEMO_CREDENTIALS = {
  player: {
    email: "demo@fieldlink.com",
    password: "password123",
    name: "Alex Johnson",
  },
  club: {
    email: "club@fieldlink.com",
    password: "password123",
    name: "HC Davos",
  },
};

interface LoginPageProps {
  onLogin: (type: "player" | "club") => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (type: "player" | "club") => {
    setIsLoading(true);
    setError("");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    const creds = DEMO_CREDENTIALS[type];
    if (email === creds.email && password === creds.password) {
      onLogin(type);
    } else {
      setError(
        `Demo ${type} credentials:\nEmail: ${creds.email}\nPassword: ${creds.password}`
      );
    }
    setIsLoading(false);
  };

  const handleDemoLogin = (type: "player" | "club") => {
    const creds = DEMO_CREDENTIALS[type];
    setEmail(creds.email);
    setPassword(creds.password);
    setTimeout(() => handleLogin(type), 100);
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 pb-32 pt-16">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-26 h-26 flex items-center justify-center mx-auto mb-4 ">
            <HockeyXTicks size={200} className="text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-primary mb-2">
            Hockey Connect
          </h1>
          <p className="text-foreground-muted">
            Field Hockey Community Network
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-border bg-background p-6 shadow-xl">
          <h2 className="text-xl font-medium text-foreground mb-6">Welcome</h2>

          {error && (
            <div className="mb-4 p-3 bg-error/10 border border-error/30 rounded-lg">
              <p className="text-error text-sm">{error}</p>
            </div>
          )}

          {/* Email Input */}
          <div className="mb-5">
            <label id="email" className="block text-sm text-foreground mb-2">
              Email
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground"
                size={18}
              />
              <Input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full pl-10 pr-4 py-2.5 bg-input border border-border rounded-lg text-foreground placeholder-text-foreground focus:outline-none focus:border-strong transition-colors cursor-text"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-5">
            <label id="password" className="block text-sm text-foreground mb-2">
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground"
                size={18}
              />
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 bg-input border border-border rounded-lg text-foreground placeholder-text-foreground-muted focus:outline-none focus:border-strong transition-colors cursor-text"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Demo Buttons */}
          <div className="space-y-2 mb-5">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              onClick={() => handleDemoLogin("player")}
              disabled={isLoading}
              className="w-full py-2.5 bg-primary text-white-black font-semibold rounded-lg hover:bg-primary-hover transition-colors duration-200 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? "Logging in..." : "Demo Login"}
            </motion.button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-border"></div>
            <span className="text-md text-foreground/85">or</span>
            <div className="flex-1 h-px bg-border"></div>
          </div>

          {/* Social Login */}
          <div className="space-y-2">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="w-full h-12 py-2.5 border-2 border-border-strong rounded-lg text-foreground hover:text-white-black hover:bg-foreground transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <img
                src={"/google-icon.svg"}
                alt="Google Icon"
                width={30}
                height={30}
              />
              Continue with Google
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="w-full h-12 py-2.5 border-2 border-border-strong rounded-lg text-foreground hover:text-white-black hover:bg-foreground transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <img
                src={"/apple-icon.svg"}
                className="bg-bg-apple rounded-full"
                alt="Apple"
                width={30}
                height={30}
              />
              Continue with Apple
            </motion.button>
          </div>

          {/* Footer */}
          <p className="text-xs text-foreground text-center mt-5">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-foreground-muted hover:text-foreground cursor-pointer transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
