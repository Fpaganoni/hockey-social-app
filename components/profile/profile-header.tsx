"use client";

import {
  Edit,
  UserPlus,
  UserCheck,
  MessageCircle,
  Download,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { Badge } from "../ui/badge";
import { User } from "@/types/models/user";
import { GroupedStory } from "@/types/models/story";
import { useAuthStore } from "@/stores/useAuthStore";
import { useStoryStore } from "@/stores/useStoryStore";
import {
  useFollowUser,
  useFollowMutation,
  useUnfollowMutation,
} from "@/hooks/useUsers";
import { useActiveStories } from "@/hooks/useStories";
import { mapRoleToEntityType } from "@/lib/utils/entity-type";
import { ProfileStats } from "./profile-stats";
import { CvSection } from "./cv-section";
import { StoryViewer } from "@/components/feed/story-viewer";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ProfileHeaderProps = Pick<
  User,
  | "id"
  | "name"
  | "role"
  | "avatar"
  | "coverImage"
  | "position"
  | "country"
  | "bio"
  | "cvUrl"
> & {
  isOwnProfile?: boolean;
};

export function ProfileHeader({
  id,
  name,
  role,
  position,
  country,
  bio,
  avatar,
  coverImage,
  cvUrl,
  isOwnProfile = false,
}: ProfileHeaderProps) {
  const t = useTranslations("profile");
  const { user: currentUser } = useAuthStore();
  const router = useRouter();
  const { seenStories } = useStoryStore();
  const [isStoryOpen, setIsStoryOpen] = useState(false);

  const { data: storiesData } = useActiveStories(id);

  const profileGroupedStory = useMemo<GroupedStory | null>(() => {
    if (!storiesData?.activeStories) return null;
    const userStories = storiesData.activeStories
      .filter((s) => s.userId === id)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
    if (userStories.length === 0) return null;
    return {
      userId: id,
      user: userStories[0].user,
      stories: userStories,
      hasMultiple: userStories.length > 1,
    };
  }, [storiesData?.activeStories, id]);

  const hasActiveStory = !!profileGroupedStory;
  const allStoriesSeen =
    hasActiveStory &&
    profileGroupedStory!.stories.every((s) => seenStories.includes(s.id));

  const entityType = mapRoleToEntityType(role);
  // Only fetch followers when we have a valid id
  const { data: followersData } = useFollowUser(entityType, id);
  const isFollowing = followersData?.followers?.some(
    (f: any) => f.followerId === currentUser?.id,
  );

  const followMutation = useFollowMutation();
  const unfollowMutation = useUnfollowMutation();

  const handleToggleFollow = () => {
    if (!currentUser) {
      toast.error("You must be logged in to follow users");
      return;
    }

    const followerId = currentUser.id;
    const followerType = mapRoleToEntityType(currentUser.role);
    const followingId = id;
    const followingType = entityType;

    if (isFollowing) {
      unfollowMutation.mutate(
        { followerId, followerType, followingId, followingType },
        {
          onSuccess: () => toast.success(`Unfollowed ${name}`),
          onError: () => toast.error("Failed to unfollow"),
        },
      );
    } else {
      followMutation.mutate(
        { followerId, followerType, followingId, followingType },
        {
          onSuccess: () => toast.success(`Now following ${name}`),
          onError: () => toast.error("Failed to follow"),
        },
      );
    }
  };

  const handleMessage = () => {
    // Navigate to messages and pass the target user id as a query param
    router.push(`/messages?userId=${id}&name=${encodeURIComponent(name)}`);
  };

  return (
    <div className="bg-background">
      <div className="h-86 relative overflow-hidden">
        <Image
          src={coverImage || "/hockey-stadium.jpg"}
          alt="Cover"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/10 to-transparent z-10"></div>
      </div>

      {/* Profile Content */}
      <div className="px-4 pt-0 pb-6">
        {/* Profile Picture and Info */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-start gap-3 flex-1 -mt-24 relative z-10">
            <div
              onClick={hasActiveStory ? () => setIsStoryOpen(true) : undefined}
              className={`rounded-full shrink-0 mx-2 p-[3px] ${
                hasActiveStory
                  ? allStoriesSeen
                    ? "bg-muted cursor-pointer"
                    : "bg-gradient-to-tr from-primary to-primary/50 cursor-pointer"
                  : ""
              }`}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="w-32 h-32 rounded-full border-2 border-background shadow-lg relative overflow-hidden bg-muted"
              >
                <Image
                  src={avatar || "/hockey-stadium.jpg"}
                  alt={name}
                  fill
                  priority
                  sizes="128px"
                  className="object-cover"
                />
              </motion.div>
            </div>
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
                <ProfileStats userId={id} userRole={role} />
              </div>

              {/* CV Section — only renders for player / coach roles */}
              <CvSection
                userId={id}
                role={role}
                cvUrl={cvUrl}
                isOwnProfile={isOwnProfile}
              />

              {/* Bio */}
              <p className="text-foreground-muted text-sm text-center mb-2 leading-relaxed">
                {bio || t("noBio")}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {isOwnProfile ? (
            <Link href="/profile/edit" className="w-[50%] mx-auto block">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="w-full flex items-center gap-2 justify-center h-(--input-button-height) px-4 py-2 bg-primary text-white-black font-semibold rounded-lg hover:bg-primary-hover transition-colors duration-200 cursor-pointer disabled:opacity-50"
              >
                <Edit size={18} />
                {t("editProfile")}
              </motion.button>
            </Link>
          ) : (
            <div className="flex gap-4 justify-start ml-40">
              <motion.button
                onClick={handleToggleFollow}
                disabled={
                  followMutation.isPending || unfollowMutation.isPending
                }
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-3 rounded-full border-2 transition-colors flex items-center justify-center shadow-sm ${
                  isFollowing
                    ? "bg-primary text-foreground border-2 border-primary"
                    : "text-foreground border-primary hover:bg-primary-hover"
                }`}
                title={
                  isFollowing
                    ? t("unfollow", { fallback: "Unfollow" })
                    : t("follow")
                }
              >
                {followMutation.isPending || unfollowMutation.isPending ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : isFollowing ? (
                  <UserCheck className="w-5 h-5" />
                ) : (
                  <UserPlus className="w-5 h-5" />
                )}
              </motion.button>

              <motion.button
                onClick={handleMessage}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-full border-2 border-primary text-foreground hover:bg-primary transition-colors flex items-center justify-center shadow-sm"
                title={t("message")}
              >
                <MessageCircle className="w-5 h-5" />
              </motion.button>

              {cvUrl && (
                <motion.a
                  href={cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-full border-2 border-primary text-foreground hover:bg-primary-hover transition-colors flex items-center justify-center shadow-sm"
                  title={t("cv.download", { fallback: "Download CV" })}
                >
                  <Download className="w-5 h-5" />
                </motion.a>
              )}
            </div>
          )}
        </div>
      </div>
      {isStoryOpen && profileGroupedStory && (
        <StoryViewer
          groups={[profileGroupedStory]}
          initialGroupIndex={0}
          initialStoryIndex={0}
          onClose={() => setIsStoryOpen(false)}
        />
      )}
    </div>
  );
}
