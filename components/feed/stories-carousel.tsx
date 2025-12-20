"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function StoriesCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const stories = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    name: [
      "Alex J.",
      "Sarah M.",
      "HC Amsterdam",
      "Coach Mike",
      "Team Netherlands",
      "James P.",
      "Old Club de Liege",
      "Fiorela Tirabassi",
      "Tom Boom",
      "Club Genk",
      "Coach John",
      "Coach Mike",
      "Coach John",
      "Coach Mike",
      "Coach John",
      "Coach Mike",
      "Bautista Polleti",
      "Juan Cuello",
      "Matias Fernandez",
      "Marcelo Sanchez",
      "Manuel Ponce",
      "Maximiliano Casas",
    ][i],
    image: `/user.png`,
  }));

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
  }, []);

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
  };

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
        {stories.map((story) => (
          <button
            key={story.id}
            className="flex flex-col items-center gap-2 shrink-0 group cursor-pointer"
          >
            <div className="w-16 h-16 rounded-full border-3 border-border overflow-hidden active:scale-95 transition-transform duration-300 hover:scale-110 shadow-md hover:shadow-lg">
              <img
                src={story.image || "/user.png"}
                alt={story.name}
                className="w-full h-full object-cover cursor-pointer"
              />
            </div>
            <span className="text-xs text-foreground truncate w-16 text-center group-hover:text-foreground group-hover:font-semibold transition-transform duration-300">
              {story.name}
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
    </div>
  );
}
