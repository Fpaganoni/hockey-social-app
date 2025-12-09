"use client";

import { useState } from "react";
import { HockeyXTicks } from "../ui/hockey-xtick";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  LogIn,
  ClipboardList,
  UserPlus,
} from "lucide-react";
import Link from "next/link";

type RegisterData = {
  email: string;
  password: string;
  name: string;
  username: string;
  role: "player" | "club" | "Coach" | "Trainer";
};

export const RegisterPage = ({ data }: { data: RegisterData }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("player");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // const handleOnRegister = (userRegisterData: RegisterData) => {
  //   setIsLoading(true);

  // }

  return (
    <main className="min-h-screen  flex items-center justify-center px-4 pb-32 pt-16">
      <div className="w-full  max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-26 h-26 flex items-center justify-center mx-auto mb-4 ">
            <HockeyXTicks size={200} className="text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-primary mb-2">
            Hockey Connect
          </h1>
          <p className="text-primary-primary/85">
            Field Hockey Community Network
          </p>
        </div>

        {/* Register Card */}
        <div className="rounded-2xl border border-primary bg-dark-gray-1 p-6 shadow-xl">
          <h2 className="text-xl text-center font-bold text-foreground mb-6">
            Register
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-error/10 border border-error/30 rounded-lg">
              <p className="text-error text-sm">{error}</p>
            </div>
          )}

          {/* Name input */}
          <div className="mb-4">
            <label
              id="name"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Name
            </label>
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground"
                size={18}
              />
              <input
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Billy Backer"
                className="w-full pl-10 pr-4 py-2.5 bg-background border border-foreground rounded-lg text-foreground focus:outline-none focus:border-primary transition-colors cursor-text"
              />
            </div>
          </div>

          {/* Username input */}
          <div className="mb-4">
            <label
              id="username"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Username
            </label>
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground"
                size={18}
              />
              <input
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="user_name"
                className="w-full pl-10 pr-4 py-2.5 bg-background border border-foreground rounded-lg text-foreground focus:outline-none focus:border-primary transition-colors cursor-text"
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label
              id="email"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Email
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground"
                size={18}
              />
              <input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full pl-10 pr-4 py-2.5 bg-background border border-foreground rounded-lg text-foreground focus:outline-none focus:border-primary transition-colors cursor-text"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label
              id="password"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground"
                size={18}
              />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 bg-background border border-foreground rounded-lg text-foreground placeholder-text-secondary focus:outline-none focus:border-accent-bright transition-colors cursor-text"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/85 hover:text-foreground transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Reapeat Password Input */}
          <div className="mb-6">
            <label
              id="repeat-password"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Confirm Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground"
                size={18}
              />
              <input
                name="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 bg-background border border-foreground rounded-lg text-foreground placeholder-text-secondary focus:outline-none focus:border-accent-bright transition-colors cursor-text"
              />
              <button
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/85 hover:text-foreground transition-colors cursor-pointer"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Role Input */}
          <div className="mb-6">
            <label
              id="role"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Role
            </label>
            <div className="relative">
              <ClipboardList
                className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground"
                size={18}
              />
              <input
                name="role"
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Player | Coach | Trainer"
                className="w-full pl-10 pr-10 py-2.5 bg-background border border-foreground rounded-lg text-foreground placeholder-text-secondary focus:outline-none focus:border-accent-bright transition-colors cursor-text"
              />
            </div>
          </div>

          {/* Register button */}

          <button
            // onClick={() => handleRegister("player")}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-3 bg-primary/80 text-background font-semibold rounded-lg hover:text-primary-contrast hover:bg-foreground transition-all duration-300 cursor-pointer disabled:opacity-50 mb-4 mt-1"
          >
            <UserPlus size={18} />
            {isLoading ? "Registering..." : "Register"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-foreground/80"></div>
            <span className="text-sm text-foreground/85">
              Already have an account?
            </span>
            <div className="flex-1 h-px bg-foreground/80"></div>
          </div>

          {/* Login option */}

          <Link
            href="/login"
            className="w-full h-12 py-2.5 border border-primary   rounded-lg text-foreground bg-dark-gray-1/80 hover:bg-dark-gray-2 transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <LogIn size={18} />
            Login
          </Link>
        </div>
      </div>
    </main>
  );
};
