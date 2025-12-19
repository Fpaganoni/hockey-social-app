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
  ArrowUpIcon,
} from "lucide-react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const registerSchema = z
  .object({
    name: z
      .string()
      .min(6, "Full name must be at least 6 characters long")
      .max(30, "Full name must be at most 30 characters long"),
    username: z
      .string()
      .min(6, "Username must be at least 6 characters long")
      .max(30, "Username must be at most 30 characters long"),
    email: z
      .string()
      .email("Invalid email address")
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address"
      ),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[@$!%*?&#]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string().min(6, "Please confirm your password"),
    role: z.enum(["player", "club", "Coach"], {
      message: "Select a valid role",
    }),
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
    <main className="min-h-screen flex flex-col gap-8 items-center justify-center px-4 pb-32 pt-16">
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

        {/* Register Card */}
        <div className="rounded-2xl border border-primary bg-dark-gray-1 p-6 shadow-xl">
          <h2 className="text-xl font-medium text-foreground mb-6">Register</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name input */}
            <div className="mb-5">
              <Label id="name" className="mb-2">
                Full Name
              </Label>
              <div className="relative">
                <User
                  className={`absolute left-3 top-1/2 -translate-y-1/2 text-foreground ${
                    errors.name ? "text-destructive" : ""
                  }`}
                  size={18}
                />
                <Input
                  type="text"
                  {...register("name", {
                    required: true,
                    minLength: 6,
                    maxLength: 30,
                  })}
                  placeholder="Billy Backer"
                  className="pl-10"
                />
              </div>
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex gap-1 text-error bg-error/20 font-semibold p-1 text-xs mt-2"
                >
                  <ArrowUpIcon size={16} />
                  {errors.name.message}
                </motion.p>
              )}
            </div>

            {/* Username input */}
            <div className="mb-5">
              <Label id="username" className="mb-2">
                Username
              </Label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground"
                  size={18}
                />
                <Input
                  {...register("username", { required: true })}
                  type="text"
                  placeholder="user_name"
                  className="pl-10"
                />
              </div>
              {errors.username && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex gap-1 text-error bg-error/20 font-semibold p-1 text-xs mt-2"
                >
                  <ArrowUpIcon size={16} />
                  {errors.username.message}
                </motion.p>
              )}
            </div>

            {/* Email Input */}
            <div className="mb-5">
              <Label id="email" className="mb-2">
                Email
              </Label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground"
                  size={18}
                />
                <Input
                  {...register("email", { required: true })}
                  type="email"
                  placeholder="your@email.com"
                  className="pl-10"
                />
              </div>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex gap-1 text-error bg-error/20 font-semibold p-1 text-xs mt-2"
                >
                  <ArrowUpIcon size={16} />
                  {errors.email.message}
                </motion.p>
              )}
            </div>

            {/* Password Input */}
            <div className="mb-5">
              <Label id="password" className="mb-2">
                Password
              </Label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground"
                  size={18}
                />
                <Input
                  {...register("password", { required: true })}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10"
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPassword(!showPassword);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex gap-1 text-error bg-error/20 font-semibold p-1 text-xs mt-2"
                >
                  <ArrowUpIcon size={16} />
                  {errors.password.message}
                </motion.p>
              )}
            </div>

            {/* Reapeat Password Input */}
            <div className="mb-4">
              <Label id="confirm-password" className="mb-2">
                Confirm Password
              </Label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground"
                  size={18}
                />
                <Input
                  {...register("confirmPassword", { required: true })}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10"
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowConfirmPassword(!showConfirmPassword);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground transition-colors cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex gap-1 text-error bg-error/20 font-semibold p-1 text-xs mt-2"
                >
                  <ArrowUpIcon size={16} />
                  {errors.confirmPassword.message}
                </motion.p>
              )}
            </div>

            {/* Role Input */}
            <div className="mb-4">
              <Label id="role" className="mb-2">
                Role
              </Label>
              <div className="relative">
                <ClipboardList
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground"
                  size={18}
                />
                <Input
                  {...register("role", { required: true })}
                  type="text"
                  placeholder="Player | Coach | Trainer"
                  className="pl-10"
                />
              </div>
              {errors.role && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex gap-1 text-error bg-error/20 font-semibold p-1 text-xs mt-2"
                >
                  <ArrowUpIcon size={16} />
                  {errors.role.message}
                </motion.p>
              )}
            </div>

            {/* Register button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSubmit(onSubmit)}
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary-hover inline-flex items-center justify-center gap-2 rounded-md mt-5 h-9 px-4 py-2 text-background"
            >
              <UserPlus size={18} />
              {isLoading ? "Registering..." : "Register"}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-border"></div>
            <span className="text-sm text-foreground-muted">
              Already have an account?
            </span>
            <div className="flex-1 h-px bg-border"></div>
          </div>

          {/* Login option */}

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/login"
              className="w-full h-9 px-4 py-2 border-2 border-border-strong rounded-lg text-foreground hover:text-white-black hover:bg-foreground transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <LogIn size={18} />
              Login
            </Link>
          </motion.div>
        </div>
      </div>
    </main>
  );
};
