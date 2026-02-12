"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { ProfileCard } from "@/components/explore/profile-card";
import { FilterButton } from "@/components/explore/filter-button";
import { Input } from "@/components/ui/input";
import { Filter } from "@/components/ui/filter";
import { useTranslations } from "next-intl";
import { useExploreUsers } from "@/hooks/useExplore";
import { Loader } from "../ui/loader";
import { Error } from "../ui/error";

export function ExplorePage() {
  const t = useTranslations("explore");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string>
  >({});

  const {
    data: players,
    isLoading: playersLoading,
    error: playersError,
  } = useExploreUsers("PLAYER", 50);

  const {
    data: coaches,
    isLoading: coachesLoading,
    error: coachesError,
  } = useExploreUsers("COACH", 50);

  if (playersLoading && coachesLoading) return <Loader children="Loading" />;

  if (playersError || coachesError)
    return <Error children="Error loading users" />;

  if (players?.exploreUsers.length === 0 && coaches?.exploreUsers.length === 0)
    return <p>No users found</p>;

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
          (players?.exploreUsers.filter((p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()),
          ).length ?? 0 > 0) ? (
            players?.exploreUsers
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
          [
            ...(players?.exploreUsers ?? []),
            ...(coaches?.exploreUsers ?? []),
          ].map((profile) => <ProfileCard key={profile.id} {...profile} />)
        )}
      </div>
    </main>
  );
}
