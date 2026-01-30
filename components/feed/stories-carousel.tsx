"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useActiveStories } from "@/hooks/useStories";
import { useAuthStore } from "@/stores/useAuthStore";
import { Loader } from "../ui/loader";
import { Error } from "../ui/error";
import { Story } from "@/types/models/story";
import { StoryViewer } from "./story-viewer";
import Image from "next/image";

// Helper type for grouped stories (like Instagram)
interface GroupedStory {
  userId: string;
  user: Story["user"];
  stories: Story[];
  hasMultiple: boolean;
}

// Helper function to group stories by user
function groupStoriesByUser(stories: Story[]): GroupedStory[] {
  const grouped = new Map<string, GroupedStory>();

  stories.forEach((story) => {
    const existing = grouped.get(story.userId);

    if (existing) {
      // Add story to existing user group
      existing.stories.push(story);
      existing.hasMultiple = true;
    } else {
      // Create new user group
      grouped.set(story.userId, {
        userId: story.userId,
        user: story.user,
        stories: [story],
        hasMultiple: false,
      });
    }
  });

  // Sort stories within each group by creation date (oldest first)
  grouped.forEach((group) => {
    group.stories.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );
  });

  return Array.from(grouped.values());
}

export function StoriesCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [selectedStories, setSelectedStories] = useState<GroupedStory | null>(
    null,
  );
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  // Open viewer function

  const handleStoryClick = (group: GroupedStory) => {
    setSelectedStories(group);
    setIsViewerOpen(true);
  };

  // Get current user ID from auth store
  const user = useAuthStore((state) => state.user);

  // Fetch active stories
  const { data, isLoading, error } = useActiveStories(user?.id || "");

  // Group stories by user (like Instagram)
  const groupedStories = useMemo(() => {
    if (!data?.activeStories) return [];
    return groupStoriesByUser(data.activeStories);
  }, [data?.activeStories]);

  // Check scroll position to show/hide arrows
  const checkScrollPosition = () => {
    if (!scrollContainerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;

    // Show left arrow if not at the beginning
    setShowLeftArrow(scrollLeft > 0);

    // Show right arrow if not at the end
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScrollPosition();
    const container = scrollContainerRef.current;

    if (container) {
      container.addEventListener("scroll", checkScrollPosition);
      return () => container.removeEventListener("scroll", checkScrollPosition);
    }
  }, [groupedStories]); // Re-check when stories load

  // Scroll by a specific amount (300px by default)
  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;

    const scrollAmount = 300;
    const newScrollPosition =
      direction === "left"
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;

    scrollContainerRef.current.scrollTo({
      left: newScrollPosition,
      behavior: "smooth",
    });

    // Check position after scroll animation completes (smooth scroll takes ~300ms)
    setTimeout(() => {
      checkScrollPosition();
    }, 350);
  };

  // Show loading state
  if (isLoading) {
    return <Loader children="Loading stories..." />;
  }

  // Show error state
  if (error) {
    return <Error children="Error loading stories" />;
  }

  // Don't render if there are no stories
  if (!groupedStories || groupedStories.length === 0) {
    return (
      <div className="bg-background border-b border-border px-4 py-4">
        <span className="text-center text-foreground">
          No stories available
        </span>
      </div>
    );
  }

  return (
    <div className="relative bg-background border-b border-border px-4 py-4">
      {/* Left Arrow */}
      {showLeftArrow && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-primary/80 hover:bg-primary text-white-black rounded-full p-2 shadow-lg transition-transform duration-300 hover:scale-110 active:scale-95"
          aria-label="Scroll left"
        >
          <ChevronLeft size={20} />
        </button>
      )}

      {/* Stories Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto hide-scrollbar p-2"
      >
        {groupedStories.map((group) => (
          <button
            key={group.userId}
            className="flex flex-col items-center gap-2 shrink-0 group cursor-pointer"
            onClick={() => handleStoryClick(group)}
            title={`${group.user.name} - ${group.stories.length} ${
              group.stories.length === 1 ? "story" : "stories"
            }`}
          >
            <div className="relative">
              {/* Avatar with border (indicates unviewed stories) */}
              <div
                className={`relative w-16 h-16 rounded-full overflow-hidden active:scale-95 transition-transform duration-300 hover:scale-110 shadow-md hover:shadow-lg ${
                  group.hasMultiple
                    ? "border-3 border-primary ring-2 ring-primary/30"
                    : "border-3 border-primary"
                }`}
              >
                <Image
                  src={group.user.avatar || "/user.png"}
                  alt={group.user.name}
                  fill
                  sizes="64px"
                  className="object-cover cursor-pointer rounded-full"
                />
              </div>

              {/* Multiple stories indicator */}
              {group.hasMultiple && (
                <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-background">
                  {group.stories.length}
                </div>
              )}
            </div>

            <span className="text-xs text-foreground truncate w-16 text-center group-hover:text-foreground group-hover:font-semibold transition-transform duration-300">
              {group.user.name}
            </span>
          </button>
        ))}
      </div>

      {/* Right Arrow */}
      {showRightArrow && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-primary/80 hover:bg-primary text-white-black rounded-full p-2 shadow-lg transition-transform duration-300 hover:scale-110 active:scale-95"
          aria-label="Scroll right"
        >
          <ChevronRight size={20} />
        </button>
      )}

      {isViewerOpen && selectedStories && (
        <StoryViewer
          stories={selectedStories?.stories || []}
          onClose={() => setIsViewerOpen(false)}
        />
      )}
    </div>
  );
}
