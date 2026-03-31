"use client";

import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Story, GroupedStory } from "@/types/models/story";
import { useStoryStore } from "@/stores/useStoryStore";
import Image from "next/image";

interface StoryViewerProps {
  groups: GroupedStory[];
  initialGroupIndex?: number;
  initialStoryIndex?: number;
  onClose: () => void;
}

/**
 * Story viewer component for displaying multiple stories from a user
 * Similar to Instagram's story viewer with progress bars and navigation
 *
 * Usage:
 * <StoryViewer
 *   stories={groupedStory.stories}
 *   onClose={() => setSelectedGroup(null)}
 * />
 */
export function StoryViewer({
  groups,
  initialGroupIndex = 0,
  initialStoryIndex = 0,
  onClose,
}: StoryViewerProps) {
  const [groupIndex, setGroupIndex] = useState(initialGroupIndex);
  const [storyIndex, setStoryIndex] = useState(initialStoryIndex);
  const { markAsSeen } = useStoryStore();

  const currentGroup = groups[groupIndex];
  const currentStory = currentGroup?.stories[storyIndex];

  useEffect(() => {
    if (currentStory) {
      markAsSeen(currentStory.id);
    }
  }, [currentStory, markAsSeen]);

  // Navigate to next story
  const goToNext = () => {
    if (storyIndex < currentGroup.stories.length - 1) {
      setStoryIndex(storyIndex + 1);
    } else if (groupIndex < groups.length - 1) {
      setGroupIndex(groupIndex + 1);
      setStoryIndex(0);
    } else {
      onClose(); // Close viewer when reaching the end
    }
  };

  // Navigate to previous story
  const goToPrevious = () => {
    if (storyIndex > 0) {
      setStoryIndex(storyIndex - 1);
    } else if (groupIndex > 0) {
      setGroupIndex(groupIndex - 1);
      setStoryIndex(groups[groupIndex - 1].stories.length - 1);
    }
  };

  // Auto-advance to next story after 5 seconds (like Instagram)
  useEffect(() => {
    const timer = setTimeout(() => {
      goToNext();
    }, 5000);

    return () => clearTimeout(timer);
  }, [groupIndex, storyIndex]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [groupIndex, storyIndex]);

  return (
    <div className="fixed inset-0 z-50 bg-overlay flex items-center justify-center">
      <div className="relative w-full max-w-md h-full md:h-[90vh] bg-background">
        {/* Progress Bars */}
        <div className="absolute top-0 left-0 right-0 z-20 flex gap-1 p-2">
          {currentGroup.stories.map((_, index) => (
            <div
              key={index}
              className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden"
            >
              <div
                className={`h-full bg-white transition-all duration-300 ${
                  index < storyIndex
                    ? "w-full"
                    : index === storyIndex
                      ? "w-full animate-progress"
                      : "w-0"
                }`}
              />
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="absolute top-4 left-0 right-0 z-10 px-4 pt-4 pb-2 flex items-center justify-between bg-linear-to-b from-black/60 to-transparent">
          <div className="flex items-center gap-2">
            <Image
              src={currentStory.user.avatar || "/user.png"}
              alt={currentStory.user.name}
              width={40}
              height={40}
              className="rounded-full border-2 border-white"
            />
            <div>
              <p className="text-white font-semibold text-sm">
                {currentStory.user.name}
              </p>
              <p className="text-white/80 text-xs">
                @{currentStory.user.username}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
            aria-label="Close story"
          >
            <X size={24} />
          </button>
        </div>

        {/* Story Image */}
        <div className="w-full h-full flex items-center justify-center bg-black">
          <Image
            src={currentStory.imageUrl || "/user.png"}
            alt="Story"
            fill
            sizes="100vw 100vh"
            className="object-contain"
          />
        </div>

        {/* Navigation Areas (tap left/right to navigate) */}
        <div className="absolute inset-0 flex">
          {/* Left tap area */}
          {(groupIndex > 0 || storyIndex > 0) && (
            <button
              onClick={goToPrevious}
              className="flex-1 group cursor-pointer"
              aria-label="Previous story"
            >
              <div className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronLeft size={32} className="text-white drop-shadow-lg" />
              </div>
            </button>
          )}

          {/* Right tap area */}
          <button
            onClick={goToNext}
            className="flex-1 group cursor-pointer"
            aria-label="Next story"
          >
            {(groupIndex < groups.length - 1 || storyIndex < currentGroup.stories.length - 1) && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight size={32} className="text-white drop-shadow-lg" />
              </div>
            )}
          </button>
        </div>

        {/* Story Text (if any) */}
        {currentStory.text && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/60 to-transparent">
            <p className="text-white text-sm">{currentStory.text}</p>
          </div>
        )}

        {/* Story Metadata */}
        <div className="absolute bottom-4 right-4">
          <p className="text-white/60 text-xs">
            {currentStory.viewsCount} views
          </p>
        </div>
      </div>
    </div>
  );
}
