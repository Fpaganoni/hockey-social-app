"use client";

import { useState, useMemo } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { GroupedStory } from "@/types/models/story";
import { useActiveStories } from "@/hooks/useStories";
import { useAuthStore } from "@/stores/useAuthStore";
import { useStoryStore } from "@/stores/useStoryStore";
import { StoryViewer } from "@/components/feed/story-viewer";

interface AvatarUser {
  id: string;
  name: string;
  username: string;
  avatar: string;
}

interface AvatarWithStoryProps {
  user: AvatarUser;
  imgClassName?: string;
}

export function AvatarWithStory({
  user,
  imgClassName = "w-10 h-10 object-cover",
}: AvatarWithStoryProps) {
  const { user: currentUser } = useAuthStore();
  const { seenStories } = useStoryStore();
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const locale = useLocale();
  const router = useRouter();

  const { data: storiesData } = useActiveStories(currentUser?.id || "");

  const groupedStory = useMemo<GroupedStory | null>(() => {
    if (!storiesData?.activeStories) return null;
    const userStories = storiesData.activeStories
      .filter((s) => s.userId === user.id)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
    if (userStories.length === 0) return null;
    return {
      userId: user.id,
      user: userStories[0].user,
      stories: userStories,
      hasMultiple: userStories.length > 1,
    };
  }, [storiesData?.activeStories, user.id]);

  const hasActiveStory = !!groupedStory;
  const allStoriesSeen =
    hasActiveStory &&
    groupedStory!.stories.every((s) => seenStories.includes(s.id));

  const handleClick = () => {
    if (hasActiveStory) {
      setIsStoryOpen(true);
    } else {
      router.push(`/${locale}/profile/${user.username.replace(/\./g, "/")}`);
    }
  };

  return (
    <>
      <div
        onClick={handleClick}
        className={`rounded-full cursor-pointer shrink-0 p-[2px] ${
          hasActiveStory
            ? allStoriesSeen
              ? "bg-muted"
              : "bg-linear-to-tr from-primary to-primary/50"
            : ""
        }`}
      >
        <div className="rounded-full overflow-hidden">
          <motion.img
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            src={user.avatar || "/user.png"}
            alt={user.name}
            className={imgClassName}
          />
        </div>
      </div>

      {isStoryOpen && groupedStory && (
        <StoryViewer
          groups={[groupedStory]}
          initialGroupIndex={0}
          initialStoryIndex={0}
          onClose={() => setIsStoryOpen(false)}
        />
      )}
    </>
  );
}
