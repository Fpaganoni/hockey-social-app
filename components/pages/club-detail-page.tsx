"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useClub } from "@/hooks/useClubs";
import { useAuthStore } from "@/stores/useAuthStore";
import { Loader } from "@/components/ui/loader";
import { Error } from "@/components/ui/error";
import { ClubContactSection } from "@/components/clubs/club-contact-section";
import { ClubMembersSection } from "@/components/clubs/club-members-section";
import { VerificationBanner } from "@/components/clubs/verification-banner";
import { VerificationModal } from "@/components/clubs/verification-modal";
import Image from "next/image";
import { MapPin, CheckCircle } from "lucide-react";

interface ClubDetailPageProps {
  clubId: string;
}

export function ClubDetailPage({ clubId }: ClubDetailPageProps) {
  const t = useTranslations("clubs");
  const { user } = useAuthStore();
  const { data, isLoading, error } = useClub(clubId);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);

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

  // Check if user is admin of this club
  const isClubAdmin = club.members?.some(
    (m) => m.user.id === user?.id && m.role.toUpperCase() === "ADMIN"
  );

  return (
    <>
      <main className="bg-overlay max-w-5xl mx-auto pb-24">
        {/* Cover image */}
        <div className="relative h-80 bg-gradient-to-b from-primary/10 to-background overflow-hidden">
          {club.coverImage ? (
            <Image
              src={club.coverImage}
              alt={club.name}
              fill
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        {/* Club info */}
        <div className="px-6 sm:px-8">
          {/* Logo + Title section */}
          <div className="flex items-end gap-4 -mt-16 mb-8 relative z-10">
            {/* Logo */}
            {club.logo && (
              <div className="flex-shrink-0">
                <Image
                  src={club.logo}
                  alt={club.name}
                  width={120}
                  height={120}
                  className="w-32 h-32 rounded-lg object-cover border-4 border-background shadow-lg"
                />
              </div>
            )}

            {/* Title con badge */}
            <div className="flex-1 pb-2">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                  {club.name}
                </h1>
                {club.isVerified && (
                  <CheckCircle className="w-7 h-7 text-primary flex-shrink-0" />
                )}
              </div>
            </div>
          </div>

          {/* Verification banner - only show to admin */}
          {isClubAdmin && (
            <VerificationBanner
              club={club}
              onVerifyClick={() => setIsVerificationModalOpen(true)}
            />
          )}

          {/* Ubicación */}
          {(club.city || club.country) && (
            <div className="flex items-center gap-2 text-foreground/70 mb-6 text-base">
              <MapPin className="w-5 h-5 flex-shrink-0" />
              <span>
                {[club.city, club.country].filter(Boolean).join(", ")}
              </span>
            </div>
          )}

          {/* Descripción */}
          {club.description && (
            <p className="text-foreground/80 text-base mb-12 leading-relaxed max-w-3xl">
              {club.description}
            </p>
          )}

          {/* Contacto y Redes */}
          <ClubContactSection club={club} />

          {/* Miembros */}
          <ClubMembersSection club={club} />
        </div>
      </main>

      {/* Verification Modal */}
      {isVerificationModalOpen && (
        <VerificationModal
          clubId={clubId}
          onClose={() => setIsVerificationModalOpen(false)}
        />
      )}
    </>
  );
}
