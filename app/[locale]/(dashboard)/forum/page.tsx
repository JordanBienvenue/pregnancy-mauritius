"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { SponsorBanner } from "@/components/shared/sponsor-banner";
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
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/shared/animated-section";

const categories = [
  {
    id: "pregnancy",
    icon: Baby,
    color: "text-pink-500 bg-pink-50",
    borderColor: "border-pink-200 hover:border-pink-300",
    posts: 47,
    lastActivity: "Il y a 5 min",
  },
  {
    id: "postpartum",
    icon: Heart,
    color: "text-purple-500 bg-purple-50",
    borderColor: "border-purple-200 hover:border-purple-300",
    posts: 32,
    lastActivity: "Il y a 12 min",
  },
  {
    id: "solo-mothers",
    icon: Shield,
    color: "text-teal-600 bg-teal-50",
    borderColor: "border-teal-200 hover:border-teal-300",
    posts: 21,
    lastActivity: "Il y a 1h",
  },
  {
    id: "general",
    icon: MessageCircle,
    color: "text-blue-500 bg-blue-50",
    borderColor: "border-blue-200 hover:border-blue-300",
    posts: 56,
    lastActivity: "Il y a 2 min",
  },
];

const categoryNameMap: Record<string, string> = {
  pregnancy: "Pregnancy",
  postpartum: "Postpartum",
  "solo-mothers": "Solo Mothers",
  general: "General",
};

const recentPosts = [
  {
    id: "1",
    title: "Tips pou prepare sak lopital",
    category: "pregnancy",
    categoryLabel: "Pregnancy",
    replies: 12,
    views: 89,
    timeAgo: "Il y a 15 min",
    author: "MamaNatasha",
    isAnonymous: false,
    isPinned: true,
  },
  {
    id: "2",
    title: "PPD — mo lexperyans ek konsey",
    category: "postpartum",
    categoryLabel: "Postpartum",
    replies: 8,
    views: 124,
    timeAgo: "Il y a 30 min",
    author: "Anonymous",
    isAnonymous: true,
    isPinned: true,
  },
  {
    id: "3",
    title: "Ki gyneko zot rekomande dan Curepipe?",
    category: "general",
    categoryLabel: "General",
    replies: 3,
    views: 45,
    timeAgo: "Il y a 1h",
    author: "SophieM",
    isAnonymous: false,
    isPinned: false,
  },
  {
    id: "4",
    title: "Craving mangue vert — normal?",
    category: "pregnancy",
    categoryLabel: "Pregnancy",
    replies: 5,
    views: 67,
    timeAgo: "Il y a 2h",
    author: "FutureManman22",
    isAnonymous: false,
    isPinned: false,
  },
  {
    id: "5",
    title: "Resours pou mama solo dan Port Louis",
    category: "solo-mothers",
    categoryLabel: "Solo Mothers",
    replies: 4,
    views: 38,
    timeAgo: "Il y a 3h",
    author: "Anonymous",
    isAnonymous: true,
    isPinned: false,
  },
  {
    id: "6",
    title: "Eski alouda safe pandan grosses?",
    category: "pregnancy",
    categoryLabel: "Pregnancy",
    replies: 6,
    views: 92,
    timeAgo: "Il y a 4h",
    author: "PriyankaD",
    isAnonymous: false,
    isPinned: false,
  },
  {
    id: "7",
    title: "Premie trimestre — fatigue extrem",
    category: "pregnancy",
    categoryLabel: "Pregnancy",
    replies: 7,
    views: 56,
    timeAgo: "Il y a 5h",
    author: "MamzelleRose",
    isAnonymous: false,
    isPinned: false,
  },
  {
    id: "8",
    title: "Kote fer eco a bon pri?",
    category: "general",
    categoryLabel: "General",
    replies: 3,
    views: 31,
    timeAgo: "Il y a 6h",
    author: "Anonymous",
    isAnonymous: true,
    isPinned: false,
  },
];

const categoryBadgeColor: Record<string, string> = {
  pregnancy: "bg-pink-100 text-pink-700 border-pink-200",
  postpartum: "bg-purple-100 text-purple-700 border-purple-200",
  "solo-mothers": "bg-teal-100 text-teal-700 border-teal-200",
  general: "bg-blue-100 text-blue-700 border-blue-200",
};

export default function ForumPage() {
  const t = useTranslations("forum");
  const locale = useLocale();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = recentPosts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedPosts = [
    ...filteredPosts.filter((p) => p.isPinned),
    ...filteredPosts.filter((p) => !p.isPinned),
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
              <Link href={`/${locale}/forum/general`}>
                <Button className="gap-2 bg-primary hover:bg-brand-pink-dark">
                  <Plus className="h-4 w-4" />
                  {t("newPost")}
                </Button>
              </Link>
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
          {categories.map((cat) => {
            const Icon = cat.icon;
            const tKey = cat.id === "solo-mothers" ? "soloMothers" : cat.id === "postpartum" ? "postpartumCat" : cat.id;
            return (
              <StaggerItem key={cat.id}>
                <Link href={`/${locale}/forum/${cat.id}`}>
                  <Card
                    className={`group cursor-pointer border transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 ${cat.borderColor}`}
                  >
                    <CardContent className="p-4">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${cat.color}`}
                      >
                        <Icon className="h-5 w-5" />
                      </motion.div>
                      <h3 className="mt-3 font-semibold text-sm">
                        {t(tKey as "pregnancy" | "postpartumCat" | "soloMothers" | "general")}
                      </h3>
                      <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="font-medium">{cat.posts} {t("posts")}</span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {cat.lastActivity}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

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
              <span>{recentPosts.length} {t("active")}</span>
            </div>
          </div>
        </AnimatedSection>

        <div className="mt-4 space-y-3">
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
              <Link href={`/${locale}/forum/${post.category}/${post.id}`}>
                <Card className="group cursor-pointer border-border/50 transition-all duration-200 hover:border-primary/30 hover:shadow-sm">
                  <CardContent className="flex items-start gap-4 p-4">
                    {/* Avatar placeholder */}
                    <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground">
                      {post.isAnonymous ? "?" : post.author[0]}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        {post.isPinned && (
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
                          className={`text-xs ${categoryBadgeColor[post.category]}`}
                        >
                          {post.categoryLabel}
                        </Badge>
                      </div>
                      <h3 className="mt-1.5 font-medium text-sm group-hover:text-primary transition-colors line-clamp-1">
                        {post.title}
                      </h3>
                      <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="font-medium">
                          {post.isAnonymous ? t("anonymous") : post.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          {post.replies} {t("replies")}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {post.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.timeAgo}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

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
    </div>
  );
}
