"use client";

import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

const DEMO_CREDENTIALS = {
  player: {
    email: "player@fieldlink.com",
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
    <main className="min-h-screen bg-linear-to-br from-gray-light-1 via-gray-light-2 to-gray-light-3 flex items-center justify-center px-4 pb-32 pt-16">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-accent-bright rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-3xl">🏑</span>
          </div>
          <h1 className="text-3xl font-bold text-text mb-2">FieldLink</h1>
          <p className="text-primary">Field Hockey Community Network</p>
        </div>

        {/* Login Card */}
        <div className="bg-gray-light-1 rounded-2xl border border-border p-6 shadow-xl">
          <h2 className="text-xl font-bold text-background mb-6">Welcome</h2>

          {error && (
            <div className="mb-4 p-3 bg-error/10 border border-error/30 rounded-lg">
              <p className="text-error text-sm">{error}</p>
            </div>
          )}

          {/* Email Input */}
          <div className="mb-4">
            <label
              id="email"
              className="block text-sm font-medium text-background mb-2"
            >
              Email
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-background"
                size={18}
              />
              <input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full pl-10 pr-4 py-2.5 bg-foreground border border-border rounded-lg text-background focus:outline-none focus:border-primary transition-colors cursor-text"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label
              id="password"
              className="block text-sm font-medium text-background mb-2"
            >
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-background"
                size={18}
              />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 bg-foreground border border-border rounded-lg text-background placeholder-text-secondary focus:outline-none focus:border-accent-bright transition-colors cursor-text"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-background hover:text-background/85 transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Demo Buttons */}
          <div className="space-y-2 mb-6">
            <button
              onClick={() => handleDemoLogin("player")}
              disabled={isLoading}
              className="w-full py-2.5 bg-background text-primary font-semibold rounded-lg hover:bg-accent transition-all duration-300 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? "Logging in..." : "Demo: Player"}
            </button>
            <button
              onClick={() => handleDemoLogin("club")}
              disabled={isLoading}
              className="w-full py-2.5 bg-accent/90 text-primary font-semibold rounded-lg hover:bg-primary-foreground hover:text-primary transition-all duration-300 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? "Logging in..." : "Demo: Club"}
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-border"></div>
            <span className="text-md text-background">or</span>
            <div className="flex-1 h-px bg-border"></div>
          </div>

          {/* Social Login */}
          <div className="space-y-2">
            <button className="w-full py-2.5 border border-border rounded-lg text-background hover:bg-gray-light-3 transition-colors cursor-pointer flex items-center justify-center gap-2">
              <span>👤</span>
              Continue with Google
            </button>
            <button className="w-full py-2.5 border border-border rounded-lg text-background hover:bg-gray-light-3 transition-colors cursor-pointer flex items-center justify-center gap-2">
              <span>🍎</span>
              Continue with Apple
            </button>
          </div>

          {/* Footer */}
          <p className="text-xs text-background text-center mt-6">
            Don't have an account?{" "}
            <button className="text-gay-light-1/80 hover:text-accent cursor-pointer transition-colors">
              Sign up
            </button>
          </p>
        </div>
      </div>
    </main>
  );
}
