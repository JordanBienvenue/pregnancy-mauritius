"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  ArrowBigUp,
  MessageSquare,
  Pencil,
  Trash2,
  X,
  Check,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MarkdownContent } from "@/components/forum/markdown-content";

export interface ForumReply {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  is_anonymous: boolean;
  like_count: number;
  created_at: string;
  edited_at: string | null;
  parent_reply_id: string | null;
  profiles: { full_name: string } | null;
}

interface CommentNodeProps {
  reply: ForumReply;
  childrenMap: Map<string, ForumReply[]>;
  depth: number;
  userId: string | null;
  likedReplyIds: Set<string>;
  onLike: (reply: ForumReply) => void;
  onSubmitReply: (parentId: string, text: string) => Promise<boolean>;
  onSaveEdit: (reply: ForumReply, text: string) => Promise<boolean>;
  onDelete: (reply: ForumReply) => void;
  timeAgo: (s: string) => string;
}

const MAX_INDENT = 5;

export function CommentNode({
  reply,
  childrenMap,
  depth,
  userId,
  likedReplyIds,
  onLike,
  onSubmitReply,
  onSaveEdit,
  onDelete,
  timeAgo,
}: CommentNodeProps) {
  const t = useTranslations("forum");
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(reply.content);
  const [savingEdit, setSavingEdit] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const liked = likedReplyIds.has(reply.id);
  const children = childrenMap.get(reply.id) ?? [];
  const isOwner = userId === reply.user_id;
  const name = reply.is_anonymous
    ? t("anonymous")
    : reply.profiles?.full_name ?? t("anonymous");

  const submitReply = async () => {
    if (!replyText.trim()) return;
    setSubmitting(true);
    const ok = await onSubmitReply(reply.id, replyText);
    if (ok) {
      setReplyText("");
      setReplyOpen(false);
    }
    setSubmitting(false);
  };

  const submitEdit = async () => {
    if (!editText.trim()) return;
    setSavingEdit(true);
    const ok = await onSaveEdit(reply, editText);
    if (ok) setEditing(false);
    setSavingEdit(false);
  };

  return (
    <div
      className={depth > 0 ? "border-l border-border/60 pl-3" : ""}
      data-testid="comment-node"
    >
      <div className="py-2">
        <div className="flex items-center gap-2">
          <Avatar size="sm">
            <AvatarFallback className="text-xs">
              {reply.is_anonymous ? "?" : (reply.profiles?.full_name?.[0] ?? "?")}
            </AvatarFallback>
          </Avatar>
          <span className="text-xs font-medium">{name}</span>
          <span className="text-xs text-muted-foreground">
            · {timeAgo(reply.created_at)}
            {reply.edited_at ? ` · ${t("edited")}` : ""}
          </span>
          {children.length > 0 && (
            <button
              type="button"
              onClick={() => setCollapsed((c) => !c)}
              className="ml-auto text-xs text-muted-foreground hover:text-foreground"
            >
              {collapsed ? `[+${children.length}]` : "[−]"}
            </button>
          )}
        </div>

        {!collapsed && (
          <div className="ml-8">
            {editing ? (
              <div className="mt-1 space-y-2">
                <Textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="min-h-16 resize-none"
                  aria-label={t("writeReply")}
                />
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    className="h-7 gap-1.5 bg-primary hover:bg-brand-pink-dark"
                    onClick={submitEdit}
                    disabled={savingEdit || !editText.trim()}
                  >
                    {savingEdit ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Check className="h-3.5 w-3.5" />
                    )}
                    {t("save")}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 gap-1.5"
                    onClick={() => setEditing(false)}
                  >
                    <X className="h-3.5 w-3.5" />
                    {t("cancel")}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="mt-0.5 text-sm">
                <MarkdownContent>{reply.content}</MarkdownContent>
              </div>
            )}

            {/* Action row */}
            <div className="mt-1 flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                data-testid="reply-like-button"
                aria-pressed={liked}
                className={`h-7 gap-1 px-2 ${liked ? "text-primary" : "text-muted-foreground"}`}
                onClick={() => onLike(reply)}
              >
                <ArrowBigUp
                  className={`h-4 w-4 ${liked ? "fill-primary" : ""}`}
                />
                <span className="text-xs" data-testid="reply-like-count">
                  {reply.like_count ?? 0}
                </span>
              </Button>
              {userId && (
                <Button
                  variant="ghost"
                  size="sm"
                  data-testid="reply-reply-button"
                  className="h-7 gap-1 px-2 text-muted-foreground"
                  onClick={() => setReplyOpen((o) => !o)}
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span className="text-xs">{t("replyButton")}</span>
                </Button>
              )}
              {isOwner && !editing && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    data-testid="reply-edit-button"
                    className="h-7 gap-1 px-2 text-muted-foreground"
                    onClick={() => {
                      setEditText(reply.content);
                      setEditing(true);
                    }}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    <span className="text-xs">{t("edit")}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    data-testid="reply-delete-button"
                    className="h-7 gap-1 px-2 text-muted-foreground hover:text-destructive"
                    onClick={() => onDelete(reply)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span className="text-xs">{t("delete")}</span>
                  </Button>
                </>
              )}
            </div>

            {/* Inline reply box */}
            {replyOpen && (
              <div className="mt-2 space-y-2">
                <Textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={t("replyPlaceholder")}
                  className="min-h-16 resize-none"
                  aria-label={t("writeReply")}
                  data-testid="reply-input"
                />
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    data-testid="reply-submit"
                    className="h-7 gap-1.5 bg-primary hover:bg-brand-pink-dark"
                    onClick={submitReply}
                    disabled={submitting || !replyText.trim()}
                  >
                    {submitting ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : null}
                    {t("replyButton")}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7"
                    onClick={() => setReplyOpen(false)}
                  >
                    {t("cancel")}
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Children */}
      {!collapsed && children.length > 0 && (
        <div className={depth < MAX_INDENT ? "ml-3" : ""}>
          {children.map((child) => (
            <CommentNode
              key={child.id}
              reply={child}
              childrenMap={childrenMap}
              depth={depth + 1}
              userId={userId}
              likedReplyIds={likedReplyIds}
              onLike={onLike}
              onSubmitReply={onSubmitReply}
              onSaveEdit={onSaveEdit}
              onDelete={onDelete}
              timeAgo={timeAgo}
            />
          ))}
        </div>
      )}
    </div>
  );
}
