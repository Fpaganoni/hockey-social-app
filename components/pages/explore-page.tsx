"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { ProfileCard } from "@/components/explore/profile-card";
import { FilterButton } from "@/components/explore/filter-button";
import { Input } from "@/components/ui/input";
import { Filter } from "@/components/ui/filter";
import { useTranslations } from "next-intl";

export function ExplorePage() {
  const t = useTranslations("explore");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string>
  >({});

  const profiles = [
    {
      id: "1",
      name: "Alex Johnson",
      role: "Player",
      position: "Left Forward",
      location: "Canada",
      level: "Elite",
      country: "🇨🇦",
      bio: "Skilled forward with 8 years experience",
    },
    {
      id: "2",
      name: "Sarah Mitchell",
      role: "Player",
      position: "Goalkeeper",
      location: "USA",
      level: "Professional",
      country: "🇺🇸",
      bio: "Dedicated goalkeeper with international experience",
    },
    {
      id: "3",
      name: "HC Amsterdam",
      role: "Club",
      position: "Elite League",
      location: "Netherlands",
      level: "Elite",
      country: "🇳🇱",
      bio: "Top-tier field hockey club",
    },
    {
      id: "4",
      name: "Coach Mike",
      role: "Coach",
      position: "Head Coach",
      location: "UK",
      level: "Professional",
      country: "🇬🇧",
      bio: "Experienced coach with 15+ years",
    },
    {
      id: "5",
      name: "Carlos Mendez",
      role: "Player",
      position: "Defense",
      location: "Spain",
      level: "Professional",
      country: "🇪🇸",
      bio: "Strong defensive player",
    },
  ];

  return (
    <main className="max-w-2xl mx-auto pb-4">
      <div className="sticky top-16 bg-background/30 z-20 px-4 py-4 border-b border-border space-y-4 backdrop-blur-sm">
        <Filter
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder={t("searchPlaceholder")}
          className="relative"
        />

        <div className="grid grid-cols-4 gap-0">
          <FilterButton label={t("filters.role")} />
          <FilterButton label={t("filters.country")} />
          <FilterButton label={t("filters.level")} />
          <FilterButton label={t("filters.position")} />
        </div>
      </div>

      {/* Results */}
      <div className="px-4 mt-8 mb-28">
        {searchQuery ? (
          profiles.filter((p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()),
          ).length > 0 ? (
            profiles
              .filter((p) =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase()),
              )
              .map((profile) => <ProfileCard key={profile.id} {...profile} />)
          ) : (
            <p className="text-center text-foreground py-8">
              {t("noResults")} "{searchQuery}"
            </p>
          )
        ) : (
          profiles.map((profile) => (
            <ProfileCard key={profile.id} {...profile} />
          ))
        )}
      </div>
    </main>
  );
}
