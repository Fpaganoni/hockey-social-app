"use client";

import { useTranslations } from "next-intl";
import { useClub } from "@/hooks/useClubs";
import { Loader } from "@/components/ui/loader";
import { Error } from "@/components/ui/error";
import { ClubContactSection } from "@/components/clubs/club-contact-section";
import { ClubMembersSection } from "@/components/clubs/club-members-section";
import Image from "next/image";
import { MapPin, CheckCircle } from "lucide-react";

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

  const club = data.club;

  return (
    <main className="bg-overlay max-w-5xl mx-auto pb-24">
      {/* Header con banner y logo */}
      <div className="relative">
        {club.logo && (
          <div className="relative h-72 bg-gradient-to-b from-primary/20 to-background overflow-hidden">
            <Image
              src={club.logo}
              alt={club.name}
              fill
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>
        )}
      </div>

      {/* Club info */}
      <div className="px-6 py-10 sm:px-8">
        {/* Title con badge de verificación */}
        <div className="flex items-start gap-4 mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
                {club.name}
              </h1>
              {club.isVerified && (
                <CheckCircle className="w-8 h-8 text-primary flex-shrink-0" />
              )}
            </div>
          </div>
        </div>

        {/* Ubicación */}
        {(club.city || club.country) && (
          <div className="flex items-center gap-2 text-foreground/70 mb-8 text-lg">
            <MapPin className="w-5 h-5 flex-shrink-0" />
            <span>
              {[club.city, club.country].filter(Boolean).join(", ")}
            </span>
          </div>
        )}

        {/* Descripción */}
        {club.description && (
          <p className="text-foreground/80 text-lg mb-12 leading-relaxed max-w-3xl">
            {club.description}
          </p>
        )}

        {/* Contacto y Redes */}
        <ClubContactSection club={club} />

        {/* Miembros */}
        <ClubMembersSection club={club} />
      </div>
    </main>
  );
}
