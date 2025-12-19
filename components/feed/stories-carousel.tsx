"use client";

export function StoriesCarousel() {
  const stories = Array.from({ length: 10 }, (_, i) => ({
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
    ][i],
    image: `/user.png`,
  }));

  return (
    <div className="bg-dark-gray-2/85 border-b border-primary px-4 py-4 ">
      <div className="flex gap-6 overflow-x-auto hide-scrollbar p-2">
        {stories.map((story) => (
          <button
            key={story.id}
            className="flex flex-col items-center gap-2 shrink-0 group cursor-pointer"
          >
            <div className="w-16 h-16 rounded-full border-3 border-primary overflow-hidden active:scale-95 transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg">
              <img
                src={story.image || "/user.png"}
                alt={story.name}
                className="w-full h-full object-cover cursor-pointer"
              />
            </div>
            <span className="text-xs text-foreground/80 truncate w-16 text-center group-hover:text-foreground group-hover:font-semibold transition-all duration-300">
              {story.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
