"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import { SponsorBanner } from "@/components/shared/sponsor-banner";
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
  TrendingUp,
  Shield,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/shared/animated-section";
import { DebugAd } from "@/components/ads/debug-ad-placements";

const categoryMeta = [
  {
    id: "pregnancy",
    icon: Baby,
    color: "text-pink-500 bg-pink-50",
    borderColor: "border-pink-200 hover:border-pink-300",
  },
  {
    id: "postpartum",
    icon: Heart,
    color: "text-purple-500 bg-purple-50",
    borderColor: "border-purple-200 hover:border-purple-300",
  },
  {
    id: "solo-mothers",
    icon: Shield,
    color: "text-teal-600 bg-teal-50",
    borderColor: "border-teal-200 hover:border-teal-300",
  },
  {
    id: "general",
    icon: MessageCircle,
    color: "text-blue-500 bg-blue-50",
    borderColor: "border-blue-200 hover:border-blue-300",
  },
];

const categoryNameMap: Record<string, string> = {
  pregnancy: "Pregnancy",
  postpartum: "Postpartum",
  "solo-mothers": "Solo Mothers",
  general: "General",
};

const categoryBadgeColor: Record<string, string> = {
  pregnancy: "bg-pink-100 text-pink-700 border-pink-200",
  postpartum: "bg-purple-100 text-purple-700 border-purple-200",
  "solo-mothers": "bg-teal-100 text-teal-700 border-teal-200",
  general: "bg-blue-100 text-blue-700 border-blue-200",
};

interface ForumPost {
  id: string;
  title: string;
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

export default function ForumPage() {
  const t = useTranslations("forum");
  const locale = useLocale();
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();

    // Fetch recent posts and category counts in parallel
    const [postsResult, ...countResults] = await Promise.all([
      supabase
        .from("forum_posts")
        .select("*, profiles(full_name)")
        .order("created_at", { ascending: false })
        .limit(10),
      ...["pregnancy", "postpartum", "solo-mothers", "general"].map((cat) =>
        supabase
          .from("forum_posts")
          .select("id", { count: "exact", head: true })
          .eq("category", cat)
      ),
    ]);

    if (postsResult.data) {
      setPosts(postsResult.data as ForumPost[]);
    }

    const cats = ["pregnancy", "postpartum", "solo-mothers", "general"];
    const counts: Record<string, number> = {};
    countResults.forEach((result, i) => {
      counts[cats[i]] = result.count ?? 0;
    });
    setCategoryCounts(counts);

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Live-update the listing when any forum post changes (new threads, counts).
  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel("forum-index")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "forum_posts" },
        () => {
          fetchData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchData]);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedPosts = [
    ...filteredPosts.filter((p) => p.is_pinned),
    ...filteredPosts.filter((p) => !p.is_pinned),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-pink-light/30 via-background to-background">
      {/* Header */}
      <section className="border-b bg-white/50 backdrop-blur-sm">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
          <AnimatedSection>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  {t("title")}
                </h1>
                <p className="mt-2 text-muted-foreground">{t("subtitle")}</p>
              </div>
              <Button
                className="gap-2 bg-primary hover:bg-brand-pink-dark"
                onClick={() => setCreateDialogOpen(true)}
              >
                <Plus className="h-4 w-4" />
                {t("newPost")}
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        {/* Categories Grid */}
        <AnimatedSection>
          <h2 className="mb-4 text-lg font-semibold">{t("categories")}</h2>
        </AnimatedSection>
        <StaggerContainer className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {categoryMeta.map((cat) => {
            const Icon = cat.icon;
            const tKey = cat.id === "solo-mothers" ? "soloMothers" : cat.id === "postpartum" ? "postpartumCat" : cat.id;
            return (
              <StaggerItem key={cat.id}>
                <Link href={`/${locale}/forum/${cat.id}`}>
                  <Card
                    className={`group cursor-pointer border transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 ${cat.borderColor}`}
                  >
                    <CardContent className="flex items-center gap-3 p-3">
                      <div
                        className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${cat.color}`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-semibold leading-tight">
                          {t(tKey as "pregnancy" | "postpartumCat" | "soloMothers" | "general")}
                        </h3>
                        <span className="text-xs text-muted-foreground">
                          {loading ? "…" : categoryCounts[cat.id] ?? 0} {t("posts")}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Debug: Leaderboard Ad between categories and search */}
        <div className="mt-6">
          <DebugAd placement="leaderboard" sponsor="babyShop" />
        </div>

        {/* Search */}
        <AnimatedSection delay={0.2} className="mt-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={t("forumSearchPlaceholder")}
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </AnimatedSection>

        {/* Recent Posts */}
        <AnimatedSection delay={0.3} className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{t("recentDiscussions")}</h2>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
              <span>{posts.length} {t("active")}</span>
            </div>
          </div>
        </AnimatedSection>

        {/* Loading skeleton */}
        {loading && (
          <div className="mt-4 space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="border-border/50">
                <CardContent className="flex items-start gap-4 p-4">
                  <Skeleton className="hidden sm:block h-10 w-10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Posts list */}
        {!loading && sortedPosts.length === 0 && (
          <div className="mt-4 text-center py-12 text-muted-foreground">
            <p>{t("noPostsYet")}</p>
          </div>
        )}

        {!loading && sortedPosts.length > 0 && (
          <div className="mt-4 flex flex-col gap-3">
            {sortedPosts.map((post, index) => (
              <React.Fragment key={post.id}>
                {index === 4 && (
                  <div>
                    <DebugAd placement="native-feed" sponsor="fitness" />
                  </div>
                )}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.05 * index,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  }}
                >
                  <Link href={`/${locale}/forum/${post.category}/${post.id}`}>
                    <Card size="sm" className="group cursor-pointer border-border/50 transition-all duration-200 hover:border-primary/30 hover:shadow-sm">
                      <CardContent className="flex items-start gap-3">
                        {/* Avatar placeholder */}
                        <div className="hidden sm:flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground">
                          {post.is_anonymous
                            ? "?"
                            : (post.profiles?.full_name?.[0] ?? "?")}
                        </div>

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
                            <Badge
                              variant="outline"
                              className={`text-xs ${categoryBadgeColor[post.category] || ""}`}
                            >
                              {categoryNameMap[post.category] || post.category}
                            </Badge>
                          </div>
                          <h3 className="mt-1 font-medium text-sm group-hover:text-primary transition-colors line-clamp-1">
                            {post.title}
                          </h3>
                          <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
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
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Community Note */}
        <AnimatedSection delay={0.5} className="mt-10">
          <Card className="border-teal-200 bg-teal-50/50">
            <CardContent className="flex items-start gap-3 p-4">
              <Shield className="h-5 w-5 text-teal-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-sm text-teal-800">
                  {t("safeSpace")}
                </p>
                <p className="mt-1 text-xs text-teal-700/80">
                  {t("safeSpaceDesc")}
                </p>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Sponsor placement */}
        <SponsorBanner category="baby_shop" variant="inline" className="mt-8" />
      </div>

      {/* Create Post Dialog */}
      <CreatePostDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onPostCreated={fetchData}
      />
    </div>
  );
}
