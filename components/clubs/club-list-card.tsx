"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { MapPin } from "lucide-react";
import { Club } from "@/types/models/club";
import Image from "next/image";

export function ClubListCard(club: Club) {
  const router = useRouter();
  const locale = useLocale();

  const handleClick = () => {
    router.push(`/${locale}/clubs/${club.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-background rounded-xl overflow-hidden shadow-md hover:shadow-lg border-l-4 border-l-accent hover:border-l-accent-bright hover:translate-x-1 transition-all duration-200 cursor-pointer"
    >
      <div className="p-4">
        <div className="mb-4">
          <div className="flex justify-between items-start gap-3">
            {club.logo && (
              <div className="flex-shrink-0">
                <Image
                  src={club.logo}
                  alt={club.name}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-lg object-cover"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-foreground truncate">
                {club.name}
              </h3>
            </div>
          </div>
        </div>

        {(club.city || club.country) && (
          <div className="flex gap-3 text-sm text-foreground/70 mb-3">
            <div className="flex items-center gap-1">
              <MapPin size={16} />
              <span>
                {[club.city, club.country].filter(Boolean).join(", ")}
              </span>
            </div>
          </div>
        )}

        {club.description && (
          <p className="text-sm text-foreground/80 line-clamp-2">
            {club.description}
          </p>
        )}
      </div>
    </div>
  );
}
