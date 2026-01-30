"use client";

import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Story } from "@/types/models/story";

interface StoryViewerProps {
  stories: Story[]; // Array of stories from the same user
  onClose: () => void;
  initialIndex?: number;
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
  stories,
  onClose,
  initialIndex = 0,
}: StoryViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const currentStory = stories[currentIndex];

  // Navigate to next story
  const goToNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onClose(); // Close viewer when reaching the end
    }
  };

  // Navigate to previous story
  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Auto-advance to next story after 5 seconds (like Instagram)
  useEffect(() => {
    const timer = setTimeout(() => {
      goToNext();
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
      <div className="relative w-full max-w-md h-full md:h-[90vh] bg-background">
        {/* Progress Bars */}
        <div className="absolute top-0 left-0 right-0 z-20 flex gap-1 p-2">
          {stories.map((_, index) => (
            <div
              key={index}
              className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden"
            >
              <div
                className={`h-full bg-white transition-all duration-300 ${
                  index < currentIndex
                    ? "w-full"
                    : index === currentIndex
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
            <img
              src={currentStory.user.avatar || "/user.png"}
              alt={currentStory.user.name}
              className="w-10 h-10 rounded-full border-2 border-white"
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
          <img
            src={currentStory.imageUrl}
            alt="Story"
            className="max-w-full max-h-full object-contain"
          />
        </div>

        {/* Navigation Areas (tap left/right to navigate) */}
        <div className="absolute inset-0 flex">
          {/* Left tap area */}
          {currentIndex > 0 && (
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
            {currentIndex < stories.length - 1 && (
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

      <style jsx>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
        .animate-progress {
          animation: progress 5s linear forwards;
        }
      `}</style>
    </div>
  );
}
