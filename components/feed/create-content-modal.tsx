"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { CreatePost } from "./create-post";
import { CreateStory } from "./create-story";
import { ImageIcon, BookmarkIcon } from "lucide-react";

interface CreateContentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateContentModal({ isOpen, onClose }: CreateContentModalProps) {
  const t = useTranslations("feed.createContent");
  const [mode, setMode] = useState<"select" | "post" | "story">("select");

  const handleClose = () => {
    setMode("select");
    onClose();
  };

  const handleSuccess = () => {
    setMode("select");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogTitle>{t("title")}</DialogTitle>
        <DialogDescription>{t("description")}</DialogDescription>

        {mode === "select" ? (
          <div className="space-y-3 py-4">
            <button
              onClick={() => setMode("post")}
              className="w-full p-4 border border-border rounded-lg hover:bg-surface-elevated transition flex items-center gap-3 text-left"
            >
              <div className="p-2 bg-primary/10 rounded-lg">
                <BookmarkIcon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{t("createPost")}</p>
                <p className="text-xs text-foreground-muted">{t("postDescription")}</p>
              </div>
            </button>

            <button
              onClick={() => setMode("story")}
              className="w-full p-4 border border-border rounded-lg hover:bg-surface-elevated transition flex items-center gap-3 text-left"
            >
              <div className="p-2 bg-primary/10 rounded-lg">
                <ImageIcon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{t("createStory")}</p>
                <p className="text-xs text-foreground-muted">{t("storyDescription")}</p>
              </div>
            </button>
          </div>
        ) : mode === "post" ? (
          <CreatePost
            onSuccess={handleSuccess}
            onCancel={() => setMode("select")}
          />
        ) : (
          <CreateStory
            onSuccess={handleSuccess}
            onCancel={() => setMode("select")}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
