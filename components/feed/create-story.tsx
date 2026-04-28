"use client";

import { useRef, useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { useCreateStory } from "@/hooks/useCreateStory";
import { useToast } from "@/hooks/ui/use-toast";

interface CreateStoryProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function CreateStory({ onSuccess, onCancel }: CreateStoryProps) {
  const t = useTranslations("feed.createStory");
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const createStory = useCreateStory();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setError(null);

    // Validar tamaño (máx 50MB)
    if (selectedFile.size > 50 * 1024 * 1024) {
      setError(t("fileTooLarge"));
      return;
    }

    // Validar tipo (imagen o video)
    const validTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "video/mp4",
      "video/webm",
    ];
    if (!validTypes.includes(selectedFile.type)) {
      setError(t("invalidFileType"));
      return;
    }

    setFile(selectedFile);

    // Preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    setFile(null);
    setPreview(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async () => {
    if (!file && !text.trim()) {
      setError(t("requiresFileOrText"));
      return;
    }

    if (!file) {
      setError(t("requiresFile"));
      return;
    }

    setIsUploading(true);

    try {
      // Upload file
      const formData = new FormData();
      formData.append("file", file);

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        headers: { "x-content-type": "story" },
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error(t("uploadFailed"));
      }

      const uploadData = await uploadResponse.json();
      const fileUrl = uploadData.url;

      // Determine if it's image or video
      const isVideo = file.type.startsWith("video/");

      // Create story
      createStory.mutate(
        {
          imageUrl: isVideo ? undefined : fileUrl,
          videoUrl: isVideo ? fileUrl : undefined,
          text: text.trim() || undefined,
        },
        {
          onSuccess: () => {
            toast({
              title: t("storyCreated"),
              duration: 3000,
            });
            setFile(null);
            setPreview(null);
            setText("");
            onSuccess?.();
          },
          onError: (error) => {
            toast({
              title: t("storyCreationFailed"),
              description: error.message,
              variant: "destructive",
              duration: 3000,
            });
          },
        }
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : t("uploadFailed"));
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      {!preview ? (
        <button
          onClick={handleClick}
          disabled={isUploading || createStory.isPending}
          className="w-full border-2 border-dashed border-primary/30 rounded-lg p-8 text-center hover:border-primary/50 hover:bg-primary/5 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Upload className="w-8 h-8 mx-auto mb-2 text-primary" />
          <p className="text-sm text-foreground">
            {isUploading || createStory.isPending
              ? t("uploading")
              : t("dragOrClick")}
          </p>
          <p className="text-xs text-foreground-muted mt-1">
            {t("supportedFormats")}
          </p>
        </button>
      ) : (
        <div className="relative rounded-lg overflow-hidden bg-black/10">
          {preview.startsWith("data:video") ? (
            <video
              src={preview}
              className="w-full h-64 object-cover"
              controls
            />
          ) : (
            <img
              src={preview}
              alt="Story preview"
              className="w-full h-64 object-cover"
            />
          )}
          {!isUploading && !createStory.isPending && (
            <button
              onClick={handleRemove}
              className="absolute top-2 right-2 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t("addTextPlaceholder")}
        maxLength={300}
        className="w-full p-3 border border-border rounded-lg bg-background text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        rows={3}
      />

      <div className="text-xs text-foreground-muted">
        {text.length}/300
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex gap-2 justify-end">
        <Button
          variant="outline"
          onClick={onCancel}
          disabled={isUploading || createStory.isPending}
        >
          {t("cancel")}
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={
            isUploading || createStory.isPending || (!file && !text.trim())
          }
        >
          {createStory.isPending || isUploading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              {t("creating")}
            </>
          ) : (
            t("createStory")
          )}
        </Button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        accept="image/*,video/*"
        className="hidden"
        disabled={isUploading || createStory.isPending}
      />
    </div>
  );
}
