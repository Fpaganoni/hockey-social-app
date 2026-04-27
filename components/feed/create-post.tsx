"use client";

import { useRef, useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { useCreatePost } from "@/hooks/usePostMutations";
import { useToast } from "@/hooks/ui/use-toast";

interface CreatePostProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function CreatePost({ onSuccess, onCancel }: CreatePostProps) {
  const t = useTranslations("feed.createPost");
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [content, setContent] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const createPost = useCreatePost();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setError(null);

    // Validar tamaño (máx 50MB)
    if (selectedFile.size > 50 * 1024 * 1024) {
      setError(t("fileTooLarge"));
      return;
    }

    // Validar tipo (solo imagen)
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
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
    if (!content.trim()) {
      setError(t("contentRequired"));
      return;
    }

    setIsUploading(true);

    try {
      let imageUrl: string | undefined;

      // Upload image if selected
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          headers: { "x-content-type": "post" },
          body: formData,
        });

        if (!uploadResponse.ok) {
          throw new Error(t("uploadFailed"));
        }

        const uploadData = await uploadResponse.json();
        imageUrl = uploadData.url;
      }

      // Create post
      createPost.mutate(
        {
          content: content.trim(),
          imageUrl,
        },
        {
          onSuccess: () => {
            toast({
              title: t("postCreated"),
              duration: 3000,
            });
            setContent("");
            setFile(null);
            setPreview(null);
            onSuccess?.();
          },
          onError: (error) => {
            toast({
              title: t("postCreationFailed"),
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
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={t("contentPlaceholder")}
        maxLength={2000}
        className="w-full p-3 border border-border rounded-lg bg-background text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        rows={4}
      />

      <div className="text-xs text-foreground-muted">
        {content.length}/2000
      </div>

      {!preview ? (
        <button
          onClick={handleClick}
          disabled={isUploading || createPost.isPending}
          className="w-full border-2 border-dashed border-primary/30 rounded-lg p-6 text-center hover:border-primary/50 hover:bg-primary/5 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Upload className="w-6 h-6 mx-auto mb-2 text-primary" />
          <p className="text-sm text-foreground">
            {isUploading || createPost.isPending
              ? t("uploading")
              : t("addImageOptional")}
          </p>
        </button>
      ) : (
        <div className="relative rounded-lg overflow-hidden bg-black/10">
          <img
            src={preview}
            alt="Post preview"
            className="w-full h-64 object-cover"
          />
          {!isUploading && !createPost.isPending && (
            <button
              onClick={handleRemove}
              className="absolute top-2 right-2 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex gap-2 justify-end">
        <Button
          variant="outline"
          onClick={onCancel}
          disabled={isUploading || createPost.isPending}
        >
          {t("cancel")}
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={
            isUploading || createPost.isPending || !content.trim()
          }
        >
          {createPost.isPending || isUploading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              {t("creating")}
            </>
          ) : (
            t("createPost")
          )}
        </Button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        disabled={isUploading || createPost.isPending}
      />
    </div>
  );
}
