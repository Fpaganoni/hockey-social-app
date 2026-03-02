"use client";

import { Edit } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "../ui/badge";
import { User } from "@/types/models/user";
import { useAuthStore } from "@/stores/useAuthStore";
import { ProfileStats } from "./profile-stats";
import { CvSection } from "./cv-section";
import { useTranslations } from "next-intl";
import Image from "next/image";

type ProfileHeaderProps = Pick<
  User,
  "name" | "role" | "avatar" | "position" | "country" | "bio" | "cvUrl"
> & {
  isOwnProfile?: boolean;
};

export function ProfileHeader({
  name,
  role,
  position,
  country,
  bio,
  avatar,
  cvUrl,
  isOwnProfile = false,
}: ProfileHeaderProps) {
  const t = useTranslations("profile");
  const { user } = useAuthStore();

  return (
    <div className="bg-background">
      <div className="h-60 relative overflow-hidden">
        <Image
          src="/hockey-stadium.jpg"
          alt="Cover"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/10 to-transparent"></div>
      </div>

      {/* Profile Content */}
      <div className="px-4 pt-0 pb-6">
        {/* Profile Picture and Info */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-start gap-3 flex-1 -mt-24 relative z-10">
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              src={avatar}
              alt={name}
              className="w-32 h-32 rounded-full border-2 border-border shadow-lg cursor-pointer mx-2"
            />
            <div className="pt-6">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-bold text-foreground">{name}</h1>
                <span className="text-2xl text-foreground-muted">
                  {country || "🌍"}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="player">{role}</Badge>
                <span className="text-foreground font-semibold text-sm">
                  {position || t("positionNotSet")}
                </span>
              </div>
              <div className="mt-1">
                <ProfileStats
                  userId={user?.id || ""}
                  userRole={user?.role || ""}
                />
              </div>

              {/* CV Section — only renders for player / coach roles */}
              <CvSection
                userId={user?.id || ""}
                role={role}
                cvUrl={cvUrl}
                isOwnProfile={isOwnProfile}
              />
            </div>
          </div>
        </div>

        {/* Bio */}
        <p className="text-foreground-muted text-sm text-center mb-4 leading-relaxed">
          {bio || t("noBio")}
        </p>

        <div className="flex flex-col gap-2">
          {isOwnProfile && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="w-[90%] mx-auto flex items-center gap-2 justify-center h-(--input-button-height) px-4 py-2 bg-primary text-white-black font-semibold rounded-lg hover:bg-primary-hover transition-colors duration-200 cursor-pointer disabled:opacity-50"
            >
              <Edit size={18} />
              {t("editProfile")}
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}
