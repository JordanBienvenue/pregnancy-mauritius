"use client";

import { use, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  MessageSquare,
  Heart,
  Share2,
  Flag,
  Send,
  Pin,
  Loader2,
  Pencil,
  Trash2,
  X,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { AnimatedSection } from "@/components/shared/animated-section";

const categoryBadgeColor: Record<string, string> = {
  pregnancy: "bg-pink-100 text-pink-700 border-pink-200",
  postpartum: "bg-purple-100 text-purple-700 border-purple-200",
  "solo-mothers": "bg-teal-100 text-teal-700 border-teal-200",
  general: "bg-blue-100 text-blue-700 border-blue-200",
};

const categoryNameMap: Record<string, string> = {
  pregnancy: "Pregnancy",
  postpartum: "Postpartum",
  "solo-mothers": "Solo Mothers",
  general: "General",
};

interface ForumPostData {
  id: string;
  title: string;
  content: string;
  category: string;
  user_id: string;
  is_anonymous: boolean;
  is_pinned: boolean;
  reply_count: number;
  like_count: number;
  created_at: string;
  edited_at: string | null;
  profiles: { full_name: string } | null;
}

interface ForumReply {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  is_anonymous: boolean;
  like_count: number;
  created_at: string;
  edited_at: string | null;
  profiles: { full_name: string } | null;
}

function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `${diffH}h ago`;
  const diffD = Math.floor(diffH / 24);
  return `${diffD}d ago`;
}

export default function ForumThreadPage({
  params,
}: {
  params: Promise<{ category: string; postId: string }>;
}) {
  const { category, postId } = use(params);
  const t = useTranslations("forum");
  const locale = useLocale();
  const router = useRouter();

  const [post, setPost] = useState<ForumPostData | null>(null);
  const [replies, setReplies] = useState<ForumReply[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyContent, setReplyContent] = useState("");
  const [replyAnonymous, setReplyAnonymous] = useState(false);
  const [submittingReply, setSubmittingReply] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [hasLiked, setHasLiked] = useState(false);
  const [optimisticLikeCount, setOptimisticLikeCount] = useState(0);
  const [likedReplyIds, setLikedReplyIds] = useState<Set<string>>(new Set());

  // Author edit/delete state
  const [editingPost, setEditingPost] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [savingPost, setSavingPost] = useState(false);
  const [editingReplyId, setEditingReplyId] = useState<string | null>(null);
  const [editReplyContent, setEditReplyContent] = useState("");
  const [savingReply, setSavingReply] = useState(false);

  // Which reply ids the current user has liked (refreshed alongside replies).
  const refreshLikedReplies = useCallback(async (replyList: ForumReply[]) => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user || replyList.length === 0) {
      setLikedReplyIds(new Set());
      return;
    }
    const { data } = await supabase
      .from("forum_reply_likes")
      .select("reply_id")
      .eq("user_id", user.id)
      .in(
        "reply_id",
        replyList.map((r) => r.id)
      );
    setLikedReplyIds(
      new Set((data ?? []).map((d: { reply_id: string }) => d.reply_id))
    );
  }, []);

  const fetchPost = useCallback(async () => {
    const supabase = createClient();

    const [postResult, repliesResult, userResult] = await Promise.all([
      supabase
        .from("forum_posts")
        .select("*, profiles(full_name)")
        .eq("id", postId)
        .single(),
      supabase
        .from("forum_replies")
        .select("*, profiles(full_name)")
        .eq("post_id", postId)
        .order("created_at", { ascending: true }),
      supabase.auth.getUser(),
    ]);

    if (postResult.data) {
      const postData = postResult.data as ForumPostData;
      setPost(postData);
      setOptimisticLikeCount(postData.like_count ?? 0);
    }

    if (repliesResult.data) {
      setReplies(repliesResult.data as ForumReply[]);
      refreshLikedReplies(repliesResult.data as ForumReply[]);
    }

    const currentUserId = userResult.data?.user?.id ?? null;
    setUserId(currentUserId);

    // Check if user has liked this post
    if (currentUserId) {
      const { data: likeData } = await supabase
        .from("forum_post_likes")
        .select("id")
        .eq("post_id", postId)
        .eq("user_id", currentUserId)
        .single();
      setHasLiked(!!likeData);
    }

    setLoading(false);
  }, [postId, refreshLikedReplies]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const refreshReplies = useCallback(async () => {
    const supabase = createClient();
    const [repliesResult, postResult] = await Promise.all([
      supabase
        .from("forum_replies")
        .select("*, profiles(full_name)")
        .eq("post_id", postId)
        .order("created_at", { ascending: true }),
      supabase
        .from("forum_posts")
        .select("*, profiles(full_name)")
        .eq("id", postId)
        .single(),
    ]);
    if (repliesResult.data) {
      setReplies(repliesResult.data as ForumReply[]);
      refreshLikedReplies(repliesResult.data as ForumReply[]);
    }
    if (postResult.data) {
      const postData = postResult.data as ForumPostData;
      setPost(postData);
      setOptimisticLikeCount(postData.like_count ?? 0);
    }
  }, [postId, refreshLikedReplies]);

  // Subscribe to realtime changes so replies from other users appear live.
  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel(`forum-thread-${postId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "forum_replies",
          filter: `post_id=eq.${postId}`,
        },
        () => {
          refreshReplies();
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "forum_posts",
          filter: `id=eq.${postId}`,
        },
        () => {
          refreshReplies();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [postId, refreshReplies]);

  const handleReply = async () => {
    if (!replyContent.trim() || !userId) return;

    setSubmittingReply(true);
    const supabase = createClient();

    const { error } = await supabase.from("forum_replies").insert({
      post_id: postId,
      user_id: userId,
      content: replyContent.trim(),
      is_anonymous: replyAnonymous,
    });

    if (!error) {
      // reply_count is maintained by the sync_forum_post_reply_count trigger.
      setReplyContent("");
      setReplyAnonymous(false);

      // Re-fetch replies and post (realtime will also refresh other viewers)
      await refreshReplies();
    }

    setSubmittingReply(false);
  };

  const handleReplyLike = async (reply: ForumReply) => {
    if (!userId) return;
    const supabase = createClient();
    const liked = likedReplyIds.has(reply.id);

    // Optimistic toggle; like_count is maintained by a DB trigger and
    // reconciled live via the forum_replies realtime subscription.
    setLikedReplyIds((prev) => {
      const next = new Set(prev);
      if (liked) next.delete(reply.id);
      else next.add(reply.id);
      return next;
    });
    setReplies((prev) =>
      prev.map((r) =>
        r.id === reply.id
          ? { ...r, like_count: Math.max(0, (r.like_count ?? 0) + (liked ? -1 : 1)) }
          : r
      )
    );

    if (liked) {
      await supabase
        .from("forum_reply_likes")
        .delete()
        .eq("reply_id", reply.id)
        .eq("user_id", userId);
    } else {
      await supabase
        .from("forum_reply_likes")
        .insert({ reply_id: reply.id, user_id: userId });
    }
  };

  const startEditPost = () => {
    if (!post) return;
    setEditTitle(post.title);
    setEditContent(post.content);
    setEditingPost(true);
  };

  const handlePostEditSave = async () => {
    if (!post || !editTitle.trim() || !editContent.trim()) return;
    setSavingPost(true);
    const supabase = createClient();
    const { error } = await supabase
      .from("forum_posts")
      .update({
        title: editTitle.trim(),
        content: editContent.trim(),
        edited_at: new Date().toISOString(),
      })
      .eq("id", postId);
    if (!error) {
      setEditingPost(false);
      await refreshReplies(); // also refetches the post
    }
    setSavingPost(false);
  };

  const handlePostDelete = async () => {
    if (!post || userId !== post.user_id) return;
    if (!window.confirm(t("deleteConfirm"))) return;
    const supabase = createClient();
    const { error } = await supabase.from("forum_posts").delete().eq("id", postId);
    if (!error) router.push(`/${locale}/forum/${category}`);
  };

  const handleReplyEditSave = async (reply: ForumReply) => {
    if (!editReplyContent.trim()) return;
    setSavingReply(true);
    const supabase = createClient();
    const { error } = await supabase
      .from("forum_replies")
      .update({
        content: editReplyContent.trim(),
        edited_at: new Date().toISOString(),
      })
      .eq("id", reply.id);
    if (!error) {
      setEditingReplyId(null);
      await refreshReplies();
    }
    setSavingReply(false);
  };

  const handleReplyDelete = async (reply: ForumReply) => {
    if (userId !== reply.user_id) return;
    if (!window.confirm(t("deleteConfirm"))) return;
    const supabase = createClient();
    // reply_count is maintained by the sync_forum_post_reply_count trigger.
    await supabase.from("forum_replies").delete().eq("id", reply.id);
    await refreshReplies();
  };

  const handleLike = async () => {
    if (!userId) return;

    const supabase = createClient();

    // like_count on forum_posts is maintained by a DB trigger
    // (sync_forum_post_like_count); clients only toggle their own like row.
    if (hasLiked) {
      // Optimistic: unlike
      setHasLiked(false);
      setOptimisticLikeCount((c) => Math.max(0, c - 1));

      await supabase
        .from("forum_post_likes")
        .delete()
        .eq("post_id", postId)
        .eq("user_id", userId);
    } else {
      // Optimistic: like
      setHasLiked(true);
      setOptimisticLikeCount((c) => c + 1);

      await supabase.from("forum_post_likes").insert({
        post_id: postId,
        user_id: userId,
      });
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert(t("linkCopied"));
    } catch {
      // Fallback for older browsers
      alert(t("linkCopied"));
    }
  };

  const handleReport = async () => {
    if (!userId) return;

    const reason = window.prompt(t("reportReason"));
    if (!reason || !reason.trim()) return;

    const supabase = createClient();
    await supabase.from("forum_reports").insert({
      post_id: postId,
      user_id: userId,
      reason: reason.trim(),
    });

    alert(t("reportSubmitted"));
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-brand-pink-light/30 via-background to-background">
        <section className="border-b bg-white/50 backdrop-blur-sm">
          <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
            <Skeleton className="h-5 w-32" />
          </div>
        </section>
        <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 space-y-4">
          <Card className="border-border/50">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-start gap-3">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <Skeleton className="h-7 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="border-border/50">
              <CardContent className="p-4 flex items-start gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-brand-pink-light/30 via-background to-background flex items-center justify-center">
        <p className="text-muted-foreground">{t("noPostsYet")}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-pink-light/30 via-background to-background">
      {/* Header */}
      <section className="border-b bg-white/50 backdrop-blur-sm">
        <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
          <Link
            href={`/${locale}/forum/${category}`}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("backTo")} {categoryNameMap[post.category] || post.category}
          </Link>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
        {/* Original Post */}
        <AnimatedSection>
          <Card className="border-border/50 overflow-hidden">
            <CardContent className="p-0">
              {/* Post header */}
              <div className="flex items-start gap-3 p-5 pb-0">
                <Avatar size="lg">
                  <AvatarFallback className="text-base">
                    {post.is_anonymous
                      ? "?"
                      : (post.profiles?.full_name?.[0] ?? "?")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-sm">
                      {post.is_anonymous
                        ? t("anonymous")
                        : post.profiles?.full_name ?? t("anonymous")}
                    </span>
                    {post.is_pinned && (
                      <Badge
                        variant="secondary"
                        className="gap-1 bg-amber-100 text-amber-700 border-amber-200 text-xs"
                      >
                        <Pin className="h-3 w-3" />
                        {t("pinned")}
                      </Badge>
                    )}
                    <Badge
                      variant="outline"
                      className={`text-xs ${categoryBadgeColor[post.category] || ""}`}
                    >
                      {categoryNameMap[post.category] || post.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {timeAgo(post.created_at)}
                    </span>
                  </div>
                </div>
              </div>

              {editingPost ? (
                /* Edit mode */
                <div className="px-5 pt-4 pb-4 space-y-3">
                  <Input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    maxLength={200}
                    aria-label={t("postTitle")}
                  />
                  <Textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="min-h-32 resize-none"
                    aria-label={t("postContent")}
                  />
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      className="gap-1.5 bg-primary hover:bg-brand-pink-dark"
                      onClick={handlePostEditSave}
                      disabled={savingPost || !editTitle.trim() || !editContent.trim()}
                    >
                      {savingPost ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Check className="h-4 w-4" />
                      )}
                      {t("save")}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="gap-1.5"
                      onClick={() => setEditingPost(false)}
                    >
                      <X className="h-4 w-4" />
                      {t("cancel")}
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Post title */}
                  <div className="px-5 pt-4">
                    <h1 className="text-xl font-bold sm:text-2xl">
                      {post.title}
                    </h1>
                  </div>

                  {/* Post content */}
                  <div className="px-5 pt-3 pb-4">
                    <div className="prose prose-sm max-w-none text-foreground/90 whitespace-pre-line leading-relaxed">
                      {post.content}
                    </div>
                    {post.edited_at && (
                      <span className="text-xs text-muted-foreground italic">
                        ({t("edited")})
                      </span>
                    )}
                  </div>
                </>
              )}

              {/* Post actions */}
              <div className="flex items-center gap-1 px-5 pb-4">
                <Button
                  variant="ghost"
                  size="sm"
                  data-testid="post-like-button"
                  aria-pressed={hasLiked}
                  className={`gap-1.5 ${hasLiked ? "text-pink-500" : "text-muted-foreground"}`}
                  onClick={handleLike}
                >
                  <Heart
                    className={`h-4 w-4 ${hasLiked ? "fill-pink-500" : ""}`}
                  />
                  <span className="text-xs" data-testid="post-like-count">
                    {optimisticLikeCount}
                  </span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 text-muted-foreground"
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4" />
                  <span className="text-xs">{t("share")}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 text-muted-foreground"
                  onClick={handleReport}
                >
                  <Flag className="h-4 w-4" />
                  <span className="text-xs">{t("report")}</span>
                </Button>
                {userId === post.user_id && !editingPost && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      data-testid="post-edit-button"
                      className="gap-1.5 text-muted-foreground"
                      onClick={startEditPost}
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="text-xs">{t("edit")}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      data-testid="post-delete-button"
                      className="gap-1.5 text-muted-foreground hover:text-destructive"
                      onClick={handlePostDelete}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="text-xs">{t("delete")}</span>
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Reply count */}
        <AnimatedSection delay={0.1} className="mt-6">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            <h2 className="font-semibold">
              {replies.length} {t("replies")}
            </h2>
          </div>
        </AnimatedSection>

        {/* Replies */}
        <div className="mt-4 space-y-3">
          {replies.map((reply, index) => (
            <motion.div
              key={reply.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.1 + 0.08 * index,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
            >
              <Card className="border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar>
                      <AvatarFallback>
                        {reply.is_anonymous
                          ? "?"
                          : (reply.profiles?.full_name?.[0] ?? "?")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">
                          {reply.is_anonymous
                            ? t("anonymous")
                            : reply.profiles?.full_name ?? t("anonymous")}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {timeAgo(reply.created_at)}
                          {reply.edited_at ? ` · ${t("edited")}` : ""}
                        </span>
                      </div>

                      {editingReplyId === reply.id ? (
                        <div className="mt-2 space-y-2">
                          <Textarea
                            value={editReplyContent}
                            onChange={(e) => setEditReplyContent(e.target.value)}
                            className="min-h-20 resize-none"
                            aria-label={t("writeReply")}
                          />
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              className="gap-1.5 h-7 bg-primary hover:bg-brand-pink-dark"
                              onClick={() => handleReplyEditSave(reply)}
                              disabled={savingReply || !editReplyContent.trim()}
                            >
                              {savingReply ? (
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              ) : (
                                <Check className="h-3.5 w-3.5" />
                              )}
                              {t("save")}
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="gap-1.5 h-7"
                              onClick={() => setEditingReplyId(null)}
                            >
                              <X className="h-3.5 w-3.5" />
                              {t("cancel")}
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <p className="mt-2 text-sm text-foreground/90 leading-relaxed whitespace-pre-line">
                          {reply.content}
                        </p>
                      )}

                      <div className="mt-2 flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          data-testid="reply-like-button"
                          aria-pressed={likedReplyIds.has(reply.id)}
                          className={`gap-1.5 h-7 px-2 ${
                            likedReplyIds.has(reply.id)
                              ? "text-pink-500"
                              : "text-muted-foreground"
                          }`}
                          onClick={() => handleReplyLike(reply)}
                        >
                          <Heart
                            className={`h-3.5 w-3.5 ${
                              likedReplyIds.has(reply.id) ? "fill-pink-500" : ""
                            }`}
                          />
                          <span className="text-xs" data-testid="reply-like-count">
                            {reply.like_count ?? 0}
                          </span>
                        </Button>
                        {userId === reply.user_id &&
                          editingReplyId !== reply.id && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                data-testid="reply-edit-button"
                                className="gap-1.5 h-7 px-2 text-muted-foreground"
                                onClick={() => {
                                  setEditingReplyId(reply.id);
                                  setEditReplyContent(reply.content);
                                }}
                              >
                                <Pencil className="h-3.5 w-3.5" />
                                <span className="text-xs">{t("edit")}</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                data-testid="reply-delete-button"
                                className="gap-1.5 h-7 px-2 text-muted-foreground hover:text-destructive"
                                onClick={() => handleReplyDelete(reply)}
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                                <span className="text-xs">{t("delete")}</span>
                              </Button>
                            </>
                          )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Reply input */}
        <AnimatedSection delay={0.4} className="mt-6">
          <Card className="border-primary/20">
            <CardContent className="p-4">
              <h3 className="font-medium text-sm mb-3">{t("writeReply")}</h3>
              <Textarea
                placeholder={t("replyPlaceholder")}
                className="min-h-24 resize-none"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
              />
              <div className="mt-3 flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-input"
                    checked={replyAnonymous}
                    onChange={(e) => setReplyAnonymous(e.target.checked)}
                  />
                  {t("postAnonymously")}
                </label>
                <Button
                  className="gap-2 bg-primary hover:bg-brand-pink-dark"
                  onClick={handleReply}
                  disabled={submittingReply || !replyContent.trim()}
                >
                  {submittingReply ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  {t("replyButton")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
    </div>
  );
}
