"use client";

import { useTranslations } from "next-intl";
import { useClub } from "@/hooks/useClubs";
import { Loader } from "@/components/ui/loader";
import { Error } from "@/components/ui/error";
import { Avatar } from "@/components/ui/avatar";
import Image from "next/image";
import { MapPin } from "lucide-react";

interface ClubDetailPageProps {
  clubId: string;
}

export function ClubDetailPage({ clubId }: ClubDetailPageProps) {
  const t = useTranslations("clubs");
  const { data, isLoading, error } = useClub(clubId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader>{t("loading")}</Loader>
      </div>
    );
  }

  if (error || !data?.club) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Error>Club not found</Error>
      </div>
    );
  }

  const club = data?.club;

  if (!club) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Error>Club not found</Error>
      </div>
    );
  }

  return (
    <main className="bg-overlay max-w-4xl mx-auto pb-24">
      {/* Cover area */}
      {club.logo && (
        <div className="relative h-64 bg-gradient-to-b from-primary/20 to-background overflow-hidden">
          <Image
            src={club.logo}
            alt={club.name}
            fill
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Club info */}
      <div className="px-6 py-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          {club.name}
        </h1>

        {(club.city || club.country) && (
          <div className="flex items-center gap-2 text-foreground/70 mb-6">
            <MapPin size={20} />
            <span>
              {[club.city, club.country].filter(Boolean).join(", ")}
            </span>
          </div>
        )}

        {club.description && (
          <p className="text-foreground/80 text-lg mb-8 leading-relaxed">
            {club.description}
          </p>
        )}

        {/* Members section */}
        {club.members && club.members.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {t("members")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {club.members.map((member) => (
                <div
                  key={member.id}
                  className="bg-background border border-border rounded-lg p-4 flex items-center gap-4"
                >
                  <Avatar
                    src={member.avatar}
                    alt={member.name}
                    className="w-12 h-12"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">
                      {member.name}
                    </h3>
                    {member.position && (
                      <p className="text-sm text-foreground/70 truncate">
                        {member.position}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
