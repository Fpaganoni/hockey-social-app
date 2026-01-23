"use client";

import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowUpIcon } from "lucide-react";
import { HockeyXTicks } from "../ui/hockey-xtick";
import Link from "next/link";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/stores/useAuthStore";
import { jwtDecode } from "jwt-decode";
import { useUserLogin } from "@/hooks/useUsers";
import { graphqlClient } from "@/lib/graphql-client";
import { GET_USER_FOR_LOGIN } from "@/graphql/queries";
import { Role } from "@/types/enums";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address",
    ),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type LoginData = z.infer<typeof loginSchema>;

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuthStore();
  const { mutate: loginUser, isPending, error: loginError } = useUserLogin();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginData> = (data) => {
    loginUser(
      { email: data.email, password: data.password },
      {
        onSuccess: async (responseData) => {
          const decoded = jwtDecode(responseData.login);
          const userId = decoded.sub;

          const response = await graphqlClient.request(GET_USER_FOR_LOGIN, {
            id: userId,
          });
          const fullUser = response.user;
          login(fullUser);
          router.push("/feed");
        },
        onError: (error) => {
          setError(error.message || "Login failed");
        },
      },
    );
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
            <div className="text-error bg-error/20 font-semibold py-2 px-4 text-xs mt-2 rounded-lg mb-5">
              <p className="text-error text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
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
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground bg-input cursor-pointer"
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

            {/* Login Button */}
            <div className="space-y-2 mb-5">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                type="submit"
                disabled={isPending}
                className="w-full h-(--input-button-height) px-4 py-2 bg-primary text-white-black font-semibold rounded-lg hover:bg-primary-hover transition-colors duration-200 cursor-pointer disabled:opacity-50"
              >
                {isPending ? "Logging in..." : "Login"}
              </motion.button>
            </div>
          </form>

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
              className="w-full h-(var(--input-button-height)) px-4 py-2 border-2 border-border-strong rounded-lg text-foreground hover:text-white-black hover:bg-foreground transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <img
                src={"/google-icon.svg"}
                alt="Google Icon"
                width={26}
                height={26}
              />
              Continue with Google
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="w-full h-(--input-button-height) px-4 py-2 border-2 border-border-strong rounded-lg text-foreground hover:text-white-black hover:bg-foreground transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <img
                src={"/apple-icon.svg"}
                className="bg-bg-apple rounded-full"
                alt="Apple"
                width={26}
                height={26}
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
