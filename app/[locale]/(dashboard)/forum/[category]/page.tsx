"use client";

import { useState, use } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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

const threadsByCategory: Record<CategoryKey, Array<{
  id: string;
  title: string;
  author: string;
  isAnonymous: boolean;
  replies: number;
  views: number;
  lastActivity: string;
  isPinned: boolean;
  preview: string;
}>> = {
  pregnancy: [
    {
      id: "1",
      title: "Tips pou prepare sak lopital",
      author: "MamaNatasha",
      isAnonymous: false,
      replies: 12,
      views: 89,
      lastActivity: "Il y a 15 min",
      isPinned: true,
      preview: "Mo finn prepare mo sak lopital ek mo anvi partaz mo list...",
    },
    {
      id: "4",
      title: "Craving mangue vert — normal?",
      author: "FutureManman22",
      isAnonymous: false,
      replies: 5,
      views: 67,
      lastActivity: "Il y a 2h",
      isPinned: false,
      preview: "Depi semenn 12, mo pe craving mangue vert ar sel ek pima...",
    },
    {
      id: "6",
      title: "Eski alouda safe pandan grosses?",
      author: "PriyankaD",
      isAnonymous: false,
      replies: 6,
      views: 92,
      lastActivity: "Il y a 4h",
      isPinned: false,
      preview: "Mo mari kontan bwar alouda me mo pa sir si safe pandan grosses...",
    },
    {
      id: "7",
      title: "Premie trimestre — fatigue extrem",
      author: "MamzelleRose",
      isAnonymous: false,
      replies: 7,
      views: 56,
      lastActivity: "Il y a 5h",
      isPinned: false,
      preview: "Mo dan semenn 8 ek mo telman fatigue mo pa kapav leve...",
    },
    {
      id: "9",
      title: "Kifer mo gagn contraction Braxton Hicks so boner?",
      author: "Anonymous",
      isAnonymous: true,
      replies: 4,
      views: 41,
      lastActivity: "Il y a 8h",
      isPinned: false,
      preview: "Mo dan semenn 24 ek mo pe gagn bann contraction leze...",
    },
    {
      id: "10",
      title: "Amnio ou non? Mo pe ezite",
      author: "NadiaK",
      isAnonymous: false,
      replies: 9,
      views: 78,
      lastActivity: "Yer",
      isPinned: false,
      preview: "Mo dokter finn rekomand amniocentese me mo per...",
    },
  ],
  postpartum: [
    {
      id: "2",
      title: "PPD — mo lexperyans ek konsey",
      author: "Anonymous",
      isAnonymous: true,
      replies: 8,
      views: 124,
      lastActivity: "Il y a 30 min",
      isPinned: true,
      preview: "Mo ti soufer PPD pandan 6 mwa. Mo anvi partaz mo lexperyans...",
    },
    {
      id: "11",
      title: "Allaitement difisil — bizen led",
      author: "ManmanJulie",
      isAnonymous: false,
      replies: 6,
      views: 52,
      lastActivity: "Il y a 1h",
      isPinned: false,
      preview: "Mo baba 3 semenn ek lallaitement fer tro mal...",
    },
    {
      id: "12",
      title: "Recovery apre cesarienne — timeline reel",
      author: "AishaB",
      isAnonymous: false,
      replies: 11,
      views: 98,
      lastActivity: "Il y a 3h",
      isPinned: false,
      preview: "Mo finn fer cesarienne 2 mwa desela ek mo anvi partaz...",
    },
    {
      id: "13",
      title: "Baba pa dormi lasit — konsey?",
      author: "Anonymous",
      isAnonymous: true,
      replies: 15,
      views: 134,
      lastActivity: "Il y a 5h",
      isPinned: false,
      preview: "Mo baba 6 semenn ek pa dormi plis ki 2h daffile...",
    },
    {
      id: "14",
      title: "Ki vizit postnatal fer dan Mauritius?",
      author: "SarahL",
      isAnonymous: false,
      replies: 3,
      views: 29,
      lastActivity: "Yer",
      isPinned: false,
      preview: "Mo donn nesans semenn prosenn ek mo pa kone ki vizit...",
    },
  ],
  "solo-mothers": [
    {
      id: "5",
      title: "Resours pou mama solo dan Port Louis",
      author: "Anonymous",
      isAnonymous: true,
      replies: 4,
      views: 38,
      lastActivity: "Il y a 3h",
      isPinned: true,
      preview: "Mo pe rod resours ek support group pou mama solo...",
    },
    {
      id: "15",
      title: "Drwa legal papa absent — ki fer?",
      author: "Anonymous",
      isAnonymous: true,
      replies: 7,
      views: 65,
      lastActivity: "Il y a 2h",
      isPinned: false,
      preview: "Papa mo baba finn ale ek pa donn okenn support...",
    },
    {
      id: "16",
      title: "Laloz pou mama solo — ki ed disponib?",
      author: "MarieC",
      isAnonymous: false,
      replies: 5,
      views: 47,
      lastActivity: "Il y a 6h",
      isPinned: false,
      preview: "Mo pe rod kone si ena laloz gourvernman pou mama solo...",
    },
    {
      id: "17",
      title: "Travay full-time ek baba sel — mo rutinn",
      author: "CindyR",
      isAnonymous: false,
      replies: 8,
      views: 71,
      lastActivity: "Yer",
      isPinned: false,
      preview: "Mo anvi partaz mo rutinn kouma mama solo ki travay full-time...",
    },
    {
      id: "18",
      title: "Sipor emosyonel — pa onte dimand led",
      author: "Anonymous",
      isAnonymous: true,
      replies: 12,
      views: 89,
      lastActivity: "2 zour desela",
      isPinned: false,
      preview: "Mo finn pase par moman difisil ek mo anvi dir tou mama solo...",
    },
  ],
  general: [
    {
      id: "3",
      title: "Ki gyneko zot rekomande dan Curepipe?",
      author: "SophieM",
      isAnonymous: false,
      replies: 3,
      views: 45,
      lastActivity: "Il y a 1h",
      isPinned: false,
      preview: "Mo pe rod enn bon gyneko dan Curepipe. Kiken kapav rekomande?",
    },
    {
      id: "8",
      title: "Kote fer eco a bon pri?",
      author: "Anonymous",
      isAnonymous: true,
      replies: 3,
      views: 31,
      lastActivity: "Il y a 6h",
      isPinned: false,
      preview: "Mo pe rod kone kote fer echographie a bon pri dan Mauritius...",
    },
    {
      id: "19",
      title: "Clinique du Nord vs Wellkin — lexperyans?",
      author: "ReshmaP",
      isAnonymous: false,
      replies: 14,
      views: 112,
      lastActivity: "Il y a 2h",
      isPinned: true,
      preview: "Mo pe ezite ant Clinique du Nord ek Wellkin pou akousman...",
    },
    {
      id: "20",
      title: "Klas preparasyon akousman dan Maurice",
      author: "LindaJ",
      isAnonymous: false,
      replies: 6,
      views: 58,
      lastActivity: "Il y a 4h",
      isPinned: false,
      preview: "Eski kiken finn fer klas preparasyon akousman? Kote ek kombie?",
    },
    {
      id: "21",
      title: "Assurance maternite — ki plan zot ena?",
      author: "Anonymous",
      isAnonymous: true,
      replies: 9,
      views: 83,
      lastActivity: "Yer",
      isPinned: false,
      preview: "Mo pe rod enn bon plan assurance ki cover maternite...",
    },
  ],
};

export default function ForumCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = use(params);
  const t = useTranslations("forum");
  const locale = useLocale();
  const [sortBy, setSortBy] = useState<"newest" | "replies">("newest");

  const catKey = category as CategoryKey;
  const config = categoryConfig[catKey] || categoryConfig.general;
  const threads = threadsByCategory[catKey] || threadsByCategory.general;
  const Icon = config.icon;

  const sortedThreads = [...threads].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    if (sortBy === "replies") return b.replies - a.replies;
    return 0;
  });

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
          <Button className="gap-2 bg-primary hover:bg-brand-pink-dark" size="sm">
            <Plus className="h-4 w-4" />
            {t("newPost")}
          </Button>
        </div>

        {/* Threads */}
        <div className="space-y-3">
          {sortedThreads.map((thread, index) => (
            <motion.div
              key={thread.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.05 * index,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
            >
              <Link href={`/${locale}/forum/${category}/${thread.id}`}>
                <Card className="group cursor-pointer border-border/50 transition-all duration-200 hover:border-primary/30 hover:shadow-sm">
                  <CardContent className="flex items-start gap-4 p-4">
                    <Avatar size="default" className="mt-0.5">
                      <AvatarFallback>
                        {thread.isAnonymous ? "?" : thread.author[0]}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        {thread.isPinned && (
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
                        {thread.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
                        {thread.preview}
                      </p>
                      <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="font-medium">
                          {thread.isAnonymous ? t("anonymous") : thread.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          {thread.replies} {t("replies")}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {thread.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {thread.lastActivity}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
