"use client";

import { useState, useEffect, useCallback, use } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import { CreatePostDialog } from "@/components/forum/create-post-dialog";
import { motion } from "framer-motion";
import {
  Baby,
  Heart,
  Users,
  MessageCircle,
  Pin,
  Plus,
  Clock,
  MessageSquare,
  Eye,
  ArrowLeft,
  Filter,
  Shield,
  Search,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

const PAGE_SIZE = 20;
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/shared/animated-section";

type CategoryKey = "pregnancy" | "postpartum" | "solo-mothers" | "general";

const categoryConfig: Record<
  CategoryKey,
  {
    icon: typeof Baby;
    color: string;
    bgColor: string;
    descKey: string;
    tKey: string;
  }
> = {
  pregnancy: {
    icon: Baby,
    color: "text-pink-500",
    bgColor: "bg-pink-50",
    descKey: "categoryDescPregnancy",
    tKey: "pregnancy",
  },
  postpartum: {
    icon: Heart,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    descKey: "categoryDescPostpartum",
    tKey: "postpartumCat",
  },
  "solo-mothers": {
    icon: Shield,
    color: "text-teal-600",
    bgColor: "bg-teal-50",
    descKey: "categoryDescSoloMothers",
    tKey: "soloMothers",
  },
  general: {
    icon: MessageCircle,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    descKey: "categoryDescGeneral",
    tKey: "general",
  },
};

interface ForumPost {
  id: string;
  title: string;
  content: string;
  category: string;
  is_anonymous: boolean;
  is_pinned: boolean;
  reply_count: number;
  like_count: number;
  created_at: string;
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

export default function ForumCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = use(params);
  const t = useTranslations("forum");
  const locale = useLocale();
  const [sortBy, setSortBy] = useState<"newest" | "replies">("newest");
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [limit, setLimit] = useState(PAGE_SIZE);
  const [hasMore, setHasMore] = useState(false);

  const catKey = category as CategoryKey;
  const config = categoryConfig[catKey] || categoryConfig.general;
  const Icon = config.icon;

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();

    let query = supabase
      .from("forum_posts")
      .select("*, profiles(full_name)")
      .eq("category", category);

    const q = searchQuery.trim();
    if (q) {
      // Search title + content (escape PostgREST `or` separators).
      const safe = q.replace(/[(),]/g, " ");
      query = query.or(`title.ilike.%${safe}%,content.ilike.%${safe}%`);
    }

    if (sortBy === "newest") {
      query = query.order("created_at", { ascending: false });
    } else {
      query = query.order("reply_count", { ascending: false });
    }

    query = query.range(0, limit - 1);

    const { data } = await query;

    if (data) {
      setPosts(data as ForumPost[]);
      setHasMore(data.length === limit);
    }

    setLoading(false);
  }, [category, sortBy, searchQuery, limit]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Live-update this category's listing when its posts change.
  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel(`forum-category-${category}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "forum_posts",
          filter: `category=eq.${category}`,
        },
        () => {
          fetchPosts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [category, fetchPosts]);

  // Sort pinned to top while maintaining sort order for rest
  const sortedPosts = [
    ...posts.filter((p) => p.is_pinned),
    ...posts.filter((p) => !p.is_pinned),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-pink-light/30 via-background to-background">
      {/* Header */}
      <section className="border-b bg-white/50 backdrop-blur-sm">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
          <AnimatedSection>
            <Link
              href={`/${locale}/forum`}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("backToForum")}
            </Link>
            <div className="flex items-start gap-4">
              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${config.bgColor}`}
              >
                <Icon className={`h-7 w-7 ${config.color}`} />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {t(config.tKey as "pregnancy" | "postpartumCat" | "soloMothers" | "general")}
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t(config.descKey as "categoryDescPregnancy" | "categoryDescPostpartum" | "categoryDescSoloMothers" | "categoryDescGeneral")}
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setLimit(PAGE_SIZE);
            }}
            placeholder={t("searchPlaceholder")}
            className="pl-9"
            aria-label={t("searchPlaceholder")}
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Button
              variant={sortBy === "newest" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("newest")}
              className={sortBy === "newest" ? "bg-primary hover:bg-brand-pink-dark" : ""}
            >
              <Clock className="mr-1.5 h-3.5 w-3.5" />
              {t("newest")}
            </Button>
            <Button
              variant={sortBy === "replies" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("replies")}
              className={sortBy === "replies" ? "bg-primary hover:bg-brand-pink-dark" : ""}
            >
              <MessageSquare className="mr-1.5 h-3.5 w-3.5" />
              {t("mostReplies")}
            </Button>
          </div>
          <Button
            className="gap-2 bg-primary hover:bg-brand-pink-dark"
            size="sm"
            onClick={() => setCreateDialogOpen(true)}
          >
            <Plus className="h-4 w-4" />
            {t("newPost")}
          </Button>
        </div>

        {/* Loading skeleton (initial load only) */}
        {loading && posts.length === 0 && (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Card key={i} className="border-border/50">
                <CardContent className="flex items-start gap-4 p-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && sortedPosts.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>{t("noPostsYet")}</p>
          </div>
        )}

        {/* Threads */}
        {!loading && sortedPosts.length > 0 && (
          <div className="space-y-3">
            {sortedPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.05 * index,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
              >
                <Link href={`/${locale}/forum/${category}/${post.id}`}>
                  <Card className="group cursor-pointer border-border/50 transition-all duration-200 hover:border-primary/30 hover:shadow-sm">
                    <CardContent className="flex items-start gap-4 p-4">
                      <Avatar size="default" className="mt-0.5">
                        <AvatarFallback>
                          {post.is_anonymous
                            ? "?"
                            : (post.profiles?.full_name?.[0] ?? "?")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          {post.is_pinned && (
                            <Badge
                              variant="secondary"
                              className="gap-1 bg-amber-100 text-amber-700 border-amber-200 text-xs"
                            >
                              <Pin className="h-3 w-3" />
                              {t("pinned")}
                            </Badge>
                          )}
                        </div>
                        <h3 className="mt-1 font-medium group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
                          {post.content}
                        </p>
                        <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="font-medium">
                            {post.is_anonymous
                              ? t("anonymous")
                              : post.profiles?.full_name ?? t("anonymous")}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="h-3 w-3" />
                            {post.reply_count ?? 0} {t("replies")}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {timeAgo(post.created_at)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Load more */}
        {!loading && hasMore && (
          <div className="mt-6 flex justify-center">
            <Button
              variant="outline"
              data-testid="load-more"
              onClick={() => setLimit((l) => l + PAGE_SIZE)}
            >
              {t("loadMore")}
            </Button>
          </div>
        )}
      </div>

      {/* Create Post Dialog */}
      <CreatePostDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        defaultCategory={category}
        onPostCreated={fetchPosts}
      />
    </div>
  );
}
