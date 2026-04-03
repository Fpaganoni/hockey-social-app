"use client";

import { FileText } from "lucide-react";
import { useTranslations } from "next-intl";
import { Role } from "@/types/enums";

interface CvSectionProps {
  userId: string;
  role: Role;
  cvUrl?: string;
  isOwnProfile: boolean;
}

export function CvSection({
  role,
  cvUrl,
}: CvSectionProps) {
  const t = useTranslations("profile.cv");

  const normalizedRole = (role as string).toLowerCase();
  if (normalizedRole !== Role.PLAYER && normalizedRole !== Role.COACH)
    return null;
  
  if (!cvUrl) return null;

  return (
    <div className="flex items-center gap-2 text-sm py-1">
      <FileText size={14} className="text-foreground shrink-0" />
      <span className="text-foreground-muted shrink-0">{t("label")}</span>
      
      <a
        href={cvUrl}
        target="_blank"
        rel="noopener noreferrer"
        download
        className="text-primary font-semibold hover:underline truncate"
      >
        {t("download")}
      </a>
    </div>
  );
}
