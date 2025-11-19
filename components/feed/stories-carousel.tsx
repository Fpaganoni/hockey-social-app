"use client"

export function StoriesCarousel() {
  const stories = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    name: ["Alex J.", "Sarah M.", "HC Amsterdam", "Coach Mike", "Team Netherlands", "James P."][i],
    image: `/placeholder.svg?key=${i}&height=80&width=80&query=player-profile-${i}`,
  }))

  return (
    <div className="bg-surface/50 border-b border-border backdrop-blur-sm px-4 py-4">
      <div className="flex gap-3 overflow-x-auto pb-2 scroll-smooth">
        {stories.map((story) => (
          <button 
            key={story.id} 
            className="flex flex-col items-center gap-2 flex-shrink-0 group cursor-pointer"
          >
            <div className="w-16 h-16 rounded-full border-3 border-accent-bright overflow-hidden hover:border-accent active:scale-95 transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg">
              <img 
                src={story.image || "/placeholder.svg"} 
                alt={story.name} 
                className="w-full h-full object-cover cursor-pointer" 
              />
            </div>
            <span className="text-xs text-text-secondary truncate w-16 text-center group-hover:text-text group-hover:font-semibold transition-all duration-300">
              {story.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
