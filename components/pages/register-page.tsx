"use client";

import { useState } from "react";
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
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserRegister } from "@/hooks/useUsers";
import { jwtDecode } from "jwt-decode";
import { graphqlClient } from "@/lib/graphql-client";
import { GET_USER_FOR_LOGIN } from "@/graphql/user/queries";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { GraphQLError } from "@/types/graphql-error";
import { useTranslations } from "next-intl";

type RegisterData = {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "player" | "club" | "Coach";
};

export const RegisterPage = () => {
  const t = useTranslations("register");
  const tValidation = useTranslations("register.validation");

  // Create schema with translated error messages
  const registerSchema = z
    .object({
      name: z
        .string()
        .min(6, tValidation("nameMin"))
        .max(30, tValidation("nameMax")),
      username: z
        .string()
        .min(6, tValidation("usernameMin"))
        .max(30, tValidation("usernameMax")),
      email: z
        .string()
        .email(tValidation("emailInvalid"))
        .regex(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          tValidation("emailValid"),
        ),
      password: z
        .string()
        .min(6, tValidation("passwordMin"))
        .regex(/[A-Z]/, tValidation("passwordUppercase"))
        .regex(/[0-9]/, tValidation("passwordNumber"))
        .regex(/[@$!%*?&#]/, tValidation("passwordSpecial")),
      confirmPassword: z
        .string()
        .min(6, tValidation("confirmPasswordRequired")),
      role: z.enum(["player", "club", "Coach"], {
        message: tValidation("roleInvalid"),
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: tValidation("passwordsNoMatch"),
      path: ["confirmPassword"],
    });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const { mutate: registerUser, isPending } = useUserRegister();
  const router = useRouter();
  const { login } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterData> = (data) => {
    const { email, name, username, password, role } = data;

    registerUser(
      { email, name, username, password, role },
      {
        onSuccess: async (responseData) => {
          const decoded = jwtDecode(responseData.register);
          const userId = decoded.sub;

          const response = await graphqlClient.request(GET_USER_FOR_LOGIN, {
            id: userId,
          });

          const fullUser = response.user;
          login(fullUser);
          router.push("/feed");
        },
        onError: (error) => {
          const errorMsj =
            (error as GraphQLError)?.response?.errors?.[0]?.message ||
            t("registrationFailed");
          setError(errorMsj);
        },
      },
    );
  };

  return (
    <>
      {/* Register Card */}
      <div className="rounded-2xl border border-border bg-background p-6 shadow-xl">
        <h2 className="text-xl font-medium text-foreground mb-4">
          {t("title")}
        </h2>

        {error && (
          <div className="text-error bg-error/20 font-semibold py-2 px-4 text-xs mt-2 rounded-lg mb-5">
            <p className="text-error text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name input */}
          <div className="mb-4">
            <Label id="name" className="mb-2">
              {t("fullName")}
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
                placeholder={t("placeholders.fullName")}
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
          <div className="mb-4">
            <Label id="username" className="mb-2">
              {t("username")}
            </Label>
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground"
                size={18}
              />
              <Input
                {...register("username", { required: true })}
                type="text"
                placeholder={t("placeholders.username")}
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
          <div className="mb-4">
            <Label id="email" className="mb-2">
              {t("email")}
            </Label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground"
                size={18}
              />
              <Input
                {...register("email", { required: true })}
                type="email"
                placeholder={t("placeholders.email")}
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
          <div className="mb-4">
            <Label id="password" className="mb-2">
              {t("password")}
            </Label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground"
                size={18}
              />
              <Input
                {...register("password", { required: true })}
                type={showPassword ? "text" : "password"}
                placeholder={t("placeholders.password")}
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

          {/* Repeat Password Input */}
          <div className="mb-4">
            <Label id="confirm-password" className="mb-2">
              {t("confirmPassword")}
            </Label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground"
                size={18}
              />
              <Input
                {...register("confirmPassword", { required: true })}
                type={showConfirmPassword ? "text" : "password"}
                placeholder={t("placeholders.password")}
                className="pl-10"
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowConfirmPassword(!showConfirmPassword);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground transition-colors cursor-pointer"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
              {t("role")}
            </Label>
            <div className="relative">
              <ClipboardList
                className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground"
                size={18}
              />
              <Input
                {...register("role", { required: true })}
                type="text"
                placeholder={t("placeholders.role")}
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
            type="submit"
            disabled={isPending}
            className="w-full bg-primary hover:bg-primary-hover inline-flex items-center justify-center gap-2 rounded-md mt-2 h-9 px-4 py-2 text-background disabled:opacity-50"
          >
            <UserPlus size={18} />
            {isPending ? t("submitting") : t("submitButton")}
          </motion.button>
        </form>
      </div>
    </>
  );
};
