"use client";

import { useRef } from "react";
import { FileText, Upload, Download, Trash2, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Role } from "@/types/enums";
import { useUploadCv, useDeleteCv } from "@/hooks/useUsers";

const MAX_BYTES = 5 * 1024 * 1024;

interface CvSectionProps {
  userId: string;
  role: Role;
  cvUrl?: string;
  isOwnProfile: boolean;
}

async function toBase64(file: File): Promise<string> {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result as string);
    r.onerror = rej;
    r.readAsDataURL(file);
  });
}

export function CvSection({
  userId,
  role,
  cvUrl,
  isOwnProfile,
}: CvSectionProps) {
  const t = useTranslations("profile.cv");
  const inputRef = useRef<HTMLInputElement>(null);
  const upload = useUploadCv();
  const remove = useDeleteCv();

  const normalizedRole = (role as string).toLowerCase();
  if (normalizedRole !== Role.PLAYER && normalizedRole !== Role.COACH)
    return null;
  if (!isOwnProfile && !cvUrl) return null;

  const busy = upload.isPending || remove.isPending;

  async function handleFile(file: File) {
    if (file.type !== "application/pdf") {
      toast.error(t("invalidType"));
      return;
    }
    if (file.size > MAX_BYTES) {
      toast.error(t("fileTooLarge"));
      return;
    }
    try {
      const base64 = await toBase64(file);
      await upload.mutateAsync({ userId, base64 });
      toast.success(t("uploadSuccess"));
    } catch {
      toast.error(t("uploadError"));
    }
  }

  async function handleDelete() {
    try {
      await remove.mutateAsync({ userId });
      toast.success(t("removeSuccess"));
    } catch {
      toast.error(t("uploadError"));
    }
  }

  return (
    <div className="flex items-center gap-2 text-sm py-1">
      <FileText size={14} className="text-foreground shrink-0" />

      {/* Label */}
      <span className="text-foreground-muted shrink-0">{t("label")}</span>

      {isOwnProfile ? (
        cvUrl ? (
          /* Has CV — download + change + delete */
          <>
            <a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="text-primary font-semibold hover:underline truncate flex-1"
            >
              {t("download")}
            </a>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={busy}
              className="text-foreground-muted hover:text-foreground transition-colors shrink-0 disabled:opacity-40"
              title={t("change")}
            >
              <Upload size={13} />
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={busy}
              className="text-error hover:text-error/70 transition-colors shrink-0 disabled:opacity-40"
              title={t("remove")}
            >
              {remove.isPending ? (
                <Loader2 size={13} className="animate-spin" />
              ) : (
                <Trash2 size={13} />
              )}
            </button>
          </>
        ) : (
          /* No CV — upload prompt */
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={busy}
            className="text-primary font-semibold hover:underline disabled:opacity-40 flex items-center gap-1"
          >
            {upload.isPending ? (
              <Loader2 size={13} className="animate-spin" />
            ) : (
              <Upload size={13} />
            )}
            {t("upload")}
          </button>
        )
      ) : (
        /* Other profile — just download */
        <a
          href={cvUrl}
          target="_blank"
          rel="noopener noreferrer"
          download
          className="text-primary font-semibold hover:underline truncate"
        >
          {t("download")}
        </a>
      )}

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,application/pdf"
        className="hidden"
        aria-hidden="true"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
          e.target.value = "";
        }}
      />
    </div>
  );
}
