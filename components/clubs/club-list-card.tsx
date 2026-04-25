"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { MapPin, BadgeCheck } from "lucide-react";
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
      className="bg-background rounded-xl overflow-hidden shadow-md hover:shadow-lg border border-border hover:border-accent-bright hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
    >
      {/* Cover Image Banner */}
      <div className="relative h-24 w-full bg-accent/20">
        {club.coverImage ? (
          <Image
            src={club.coverImage}
            alt={`${club.name} cover`}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-accent/30 to-accent-bright/10" />
        )}

        {club.logo && (
          <div className="absolute -bottom-5 left-4">
            <Image
              src={club.logo}
              alt={club.name}
              width={44}
              height={44}
              className="w-11 h-11 rounded-lg object-cover border-2 border-background shadow"
            />
          </div>
        )}
      </div>

      <div className="p-4 pt-7">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-base font-semibold text-foreground truncate leading-tight">
            {club.name}
          </h3>
          {club.isVerified && (
            <BadgeCheck size={16} className="text-accent shrink-0 mt-0.5" />
          )}
        </div>

        {(club.city || club.country) && (
          <div className="flex items-center gap-1 text-xs text-foreground/60 mb-2">
            <MapPin size={12} />
            <span>{[club.city, club.country].filter(Boolean).join(", ")}</span>
          </div>
        )}

        {club.league && (
          <span className="inline-block text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full mb-2">
            {club.league}
          </span>
        )}

        {club.description && (
          <p className="text-xs text-foreground/70 line-clamp-2 mt-1">
            {club.description}
          </p>
        )}
      </div>
    </div>
  );
}
