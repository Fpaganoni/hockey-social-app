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
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";

const registerSchema = z
  .object({
    name: z.string().min(6, "Name must be at least 6 characters long"),
    username: z.string().min(6, "Username must be at least 6 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
    role: z.enum(["player", "club", "Coach"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterData = z.infer<typeof registerSchema>;

export const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterData> = async (data) => {
    console.log(data);
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 pb-32 pt-16">
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
        <div className="relative rounded-2xl border border-primary bg-dark-gray-1 p-6 shadow-xl">
          <h2 className="text-xl text-center font-bold text-foreground mb-6">
            Register
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-error/10 border border-error/30 rounded-lg">
              <p className="text-error text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name input */}
            <div className="mb-4">
              <label
                id="name"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Full Name
              </label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground"
                  size={18}
                />
                <input
                  type="text"
                  {...register("name", {
                    required: true,
                    minLength: 6,
                    maxLength: 30,
                  })}
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
                  {...register("username", { required: true })}
                  type="text"
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
                  {...register("email", { required: true })}
                  type="email"
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
                  {...register("password", { required: true })}
                  type={showPassword ? "text" : "password"}
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
                  {...register("confirmPassword", { required: true })}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-background border border-foreground rounded-lg text-foreground placeholder-text-secondary focus:outline-none focus:border-accent-bright transition-colors cursor-text"
                />
                <button
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/85 hover:text-foreground transition-colors cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
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
                  {...register("role", { required: true })}
                  type="text"
                  placeholder="Player | Coach | Trainer"
                  className="w-full pl-10 pr-10 py-2.5 bg-background border border-foreground rounded-lg text-foreground placeholder-text-secondary focus:outline-none focus:border-accent-bright transition-colors cursor-text"
                />
              </div>
            </div>

            {/* Error message */}
            {Object.keys(errors).length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-84 mr-2 fixed top-72 bottom-16 left-12 p-6 border border-destructive bg-destructive/30 rounded-md"
              >
                <motion.ul
                  initial={{ opacity: 0, x: 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex flex-col gap-2 font-bold"
                >
                  {Object.entries(errors).map(([fieldName, error]) => {
                    return (
                      <motion.li
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="text-destructive text-sm mt-2"
                        key={fieldName}
                      >
                        {error?.message}
                      </motion.li>
                    );
                  })}
                </motion.ul>
              </motion.div>
            )}

            {/* Register button */}

            <button
              onClick={() => handleSubmit(onSubmit)}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-primary/80 text-background font-semibold rounded-lg hover:text-primary-contrast hover:bg-foreground transition-all duration-300 cursor-pointer disabled:opacity-50 mb-4 mt-1"
            >
              <UserPlus size={18} />
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>

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
