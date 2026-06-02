"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
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
    if (!title.trim() || !content.trim()) return;

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

      // Reset form
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
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t("createPost")}</DialogTitle>
          <DialogDescription className="sr-only">
            {t("createPost")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Category select */}
          <div className="space-y-2">
            <Label htmlFor="category">{t("categories")}</Label>
            <Select
              value={category}
              onValueChange={(val) => setCategory(val as string)}
            >
              <SelectTrigger className="w-full">
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
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="post-title">{t("postTitle")}</Label>
            <Input
              id="post-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t("postTitle")}
              maxLength={200}
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="post-content">{t("postContent")}</Label>
            <Textarea
              id="post-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={t("postPlaceholder")}
              className="min-h-32 resize-none"
            />
            <div className="flex items-center justify-between">
              <ImageUploadButton
                onUploaded={(md) => setContent((c) => c + md)}
              />
              <span className="text-xs text-muted-foreground">
                {t("markdownHint")}
              </span>
            </div>
          </div>

          {/* Anonymous toggle */}
          <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="rounded border-input"
            />
            {t("anonymous")}
          </label>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
        </div>

        <DialogFooter>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !title.trim() || !content.trim()}
            className="gap-2 bg-primary hover:bg-brand-pink-dark"
          >
            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {t("submitPost")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
