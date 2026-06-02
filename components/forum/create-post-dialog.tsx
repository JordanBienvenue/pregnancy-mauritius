"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Loader2, X } from "lucide-react";
import { ImageUploadButton } from "@/components/forum/image-upload-button";

interface CreatePostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultCategory?: string;
  onPostCreated?: () => void;
}

const categoryOptions = [
  { value: "pregnancy", labelKey: "pregnancy" },
  { value: "postpartum", labelKey: "postpartumCat" },
  { value: "solo-mothers", labelKey: "soloMothers" },
  { value: "general", labelKey: "general" },
] as const;

export function CreatePostDialog({
  open,
  onOpenChange,
  defaultCategory,
  onPostCreated,
}: CreatePostDialogProps) {
  const t = useTranslations("forum");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(defaultCategory || "general");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!title.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("You must be logged in to create a post.");
        setIsSubmitting(false);
        return;
      }

      const { error: insertError } = await supabase
        .from("forum_posts")
        .insert({
          user_id: user.id,
          category,
          title: title.trim(),
          content: content.trim(),
          is_anonymous: isAnonymous,
        });

      if (insertError) {
        setError(insertError.message);
        setIsSubmitting(false);
        return;
      }

      setTitle("");
      setContent("");
      setIsAnonymous(false);
      setCategory(defaultCategory || "general");
      onOpenChange(false);
      onPostCreated?.();
      alert(t("postCreated"));
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="top-0 left-0 flex h-[100dvh] w-screen max-w-full translate-x-0 translate-y-0 flex-col gap-0 rounded-none p-0 ring-0 sm:top-1/2 sm:left-1/2 sm:h-auto sm:max-h-[90vh] sm:w-full sm:max-w-lg sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-xl sm:ring-1"
      >
        <DialogTitle className="sr-only">{t("createPost")}</DialogTitle>

        {/* Reddit-style top bar: close (left) + submit (right) */}
        <div className="flex items-center justify-between border-b px-3 py-2.5">
          <DialogClose
            render={<Button variant="ghost" size="icon-sm" aria-label={t("cancel")} />}
          >
            <X className="h-5 w-5" />
          </DialogClose>
          <Button
            size="sm"
            className="rounded-full bg-primary px-5 hover:bg-brand-pink-dark"
            onClick={handleSubmit}
            disabled={isSubmitting || !title.trim()}
          >
            {isSubmitting && <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />}
            {t("submitPost")}
          </Button>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {/* Community pill */}
          <Select
            value={category}
            onValueChange={(val) => setCategory(val as string)}
          >
            <SelectTrigger className="h-9 w-auto gap-2 rounded-full border-border bg-muted/60 px-4 text-sm font-medium">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categoryOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {t(opt.labelKey)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Title (big, borderless) */}
          <Input
            id="post-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t("postTitle")}
            maxLength={200}
            className="border-0 bg-transparent px-0 text-xl font-semibold shadow-none focus-visible:ring-0 dark:bg-transparent"
          />

          {/* Body (optional, borderless) */}
          <Textarea
            id="post-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={t("postPlaceholder")}
            className="min-h-40 resize-none border-0 bg-transparent px-0 shadow-none focus-visible:ring-0 dark:bg-transparent"
          />

          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        {/* Bottom toolbar */}
        <div className="flex items-center justify-between gap-3 border-t px-4 py-3">
          <div className="flex items-center gap-3">
            <ImageUploadButton onUploaded={(md) => setContent((c) => c + md)} />
            <span className="text-xs text-muted-foreground">
              {t("markdownHint")}
            </span>
          </div>
          <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="rounded border-input"
            />
            {t("anonymous")}
          </label>
        </div>
      </DialogContent>
    </Dialog>
  );
}
