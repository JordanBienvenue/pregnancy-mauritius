"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { ImagePlus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

const MAX_BYTES = 5 * 1024 * 1024; // 5MB

/**
 * Uploads an image to the public `forum-media` bucket and calls onUploaded
 * with a Markdown image snippet the caller can append to the textarea.
 */
export function ImageUploadButton({
  onUploaded,
}: {
  onUploaded: (markdown: string) => void;
}) {
  const t = useTranslations("forum");
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file: File) => {
    if (file.size > MAX_BYTES) {
      alert(t("imageTooLarge"));
      return;
    }
    setUploading(true);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setUploading(false);
      return;
    }
    const ext = file.name.split(".").pop() || "png";
    const path = `${user.id}/${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage
      .from("forum-media")
      .upload(path, file, { contentType: file.type, upsert: false });

    if (!error) {
      const {
        data: { publicUrl },
      } = supabase.storage.from("forum-media").getPublicUrl(path);
      onUploaded(`\n![image](${publicUrl})\n`);
    } else {
      console.error("Image upload failed:", error);
      alert(t("imageUploadFailed"));
    }
    setUploading(false);
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        data-testid="forum-image-input"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
          e.target.value = "";
        }}
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="gap-1.5"
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
      >
        {uploading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <ImagePlus className="h-4 w-4" />
        )}
        {t("addImage")}
      </Button>
    </>
  );
}
