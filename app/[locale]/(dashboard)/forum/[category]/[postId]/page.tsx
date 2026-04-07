"use client";

import { use } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  MessageSquare,
  Eye,
  Heart,
  Share2,
  Flag,
  Send,
  Pin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { AnimatedSection } from "@/components/shared/animated-section";

const threadsData: Record<
  string,
  {
    title: string;
    content: string;
    author: string;
    isAnonymous: boolean;
    isPinned: boolean;
    timeAgo: string;
    views: number;
    likes: number;
    category: string;
    categoryLabel: string;
    replies: Array<{
      id: string;
      author: string;
      isAnonymous: boolean;
      content: string;
      timeAgo: string;
      likes: number;
    }>;
  }
> = {
  "1": {
    title: "Tips pou prepare sak lopital",
    content: `Mo finn prepare mo sak lopital ek mo anvi partaz mo list ar zot tou. Mo dan semenn 36 ek mo gyneko finn dir mwa prepare depi aster.

Pou mama:
- 2-3 chemise de nuit (ki ouver devan pou allaitement)
- Pantouf ek flip flops pou douche
- Produit toilette (savon, shampoo, brosse dan)
- Serviette maternite (bann gro la — pa bann normal!)
- Soutien-gorge allaitement x2
- Linz pou retour lakaz

Pou baba:
- 3-4 body/grenouillere (0-1 mwa)
- 2 bonnet
- Couverture leze
- Couche newborn (enn paket)
- Linz pou retour lakaz

Pa bliye: dokiman (ID card, carnet grosses, plan akousman si ou ena).

Ki zot pou azoute? Mo sir mo pe bliye kiksoz!`,
    author: "MamaNatasha",
    isAnonymous: false,
    isPinned: true,
    timeAgo: "Il y a 15 min",
    views: 89,
    likes: 23,
    category: "pregnancy",
    categoryLabel: "Pregnancy",
    replies: [
      {
        id: "r1",
        author: "SophieM",
        isAnonymous: false,
        content:
          "Merci pou sa list la! Mo ti bliye coussin allaitement. Sa enn must-have! Osi enn ti bouteille dilo ek bann snack pou mama — ou pou ena faim apre akousman.",
        timeAgo: "Il y a 12 min",
        likes: 8,
      },
      {
        id: "r2",
        author: "Anonymous",
        isAnonymous: true,
        content:
          "Mo ti amenn mo prop orye parski lopital so orye pa konfortab ditou. Ek enn ti anz pou baba — pou bann foto!",
        timeAgo: "Il y a 10 min",
        likes: 5,
      },
      {
        id: "r3",
        author: "PriyankaD",
        isAnonymous: false,
        content:
          "Pa bliye chargeur telephone! Ou pou bizin li pou inform fami ek osi pou pas letan. Ek bann long cable charger parski priz parfwa lwin depi lili.",
        timeAgo: "Il y a 8 min",
        likes: 12,
      },
      {
        id: "r4",
        author: "FutureManman22",
        isAnonymous: false,
        content:
          "Si ou fer akousman dan clinique prive (City Clinic, Wellkin etc), zot donn buku zafer. Me dan lopital gouvernman, ou bizin amenn tou ou mem. Mo ti dan SSRN ek mo ti kontan mo ti prepare bien!",
        timeAgo: "Il y a 5 min",
        likes: 15,
      },
      {
        id: "r5",
        author: "ManmanJulie",
        isAnonymous: false,
        content:
          "Enn bon tip: met tou baba so zafer dan enn ti sak separe dan ou gro sak. Koumsa li pli fasil pou trouve. Ek prepare enn sak apart pou papa osi — snacks, linz chanze, etc.",
        timeAgo: "Il y a 2 min",
        likes: 7,
      },
    ],
  },
  "2": {
    title: "PPD — mo lexperyans ek konsey",
    content: `Mo anvi partaz mo lexperyans ar depresyon postnatal parski mo kone buku mama pas par la me pa koze.

Apre mo baba finn ne, mo ti panse mo ti pou kontan me mo ti santi mwa vid. Mo pa ti anvi get mo baba parfwa ek mo ti santi mwa coupable pou sa. Mo ti plore tou le zour san rezon.

Mo mari ti remarke ek li ti ankouraz mwa al get enn psychologue. Sa ti sanz mo lavi. Apre 3 mwa therapi ek enn ti medikaman, mo ti koumans santi mwa mwa-mem ankor.

Si ou pe santi ou koumsa:
1. Pa onte — sa enn maladi, pa enn faiblès
2. Koze ar kikenn — ou partner, ou mama, enn ami
3. Apel SOS Detresse: 800 93 93 (gratis, 24/7)
4. Al get enn professionel — dokter ou psychologue

Ou pa sel. Ek ou pou al mie. ❤️`,
    author: "Anonymous",
    isAnonymous: true,
    isPinned: true,
    timeAgo: "Il y a 30 min",
    views: 124,
    likes: 45,
    category: "postpartum",
    categoryLabel: "Postpartum",
    replies: [
      {
        id: "r1",
        author: "Anonymous",
        isAnonymous: true,
        content:
          "Merci pou partaz sa. Mo pe viv mem zafer ek mo ti kwar mo ti sel. Sa post la finn donn mwa kouraz pou dimand led. ❤️",
        timeAgo: "Il y a 25 min",
        likes: 18,
      },
      {
        id: "r2",
        author: "AishaB",
        isAnonymous: false,
        content:
          "Mo finn pas par la osi. Therapi CBT ti vreman ed mwa. Dr. Soobrayen dan Rose Hill enn bon psychologue pou PPD. Pa ezite al get li.",
        timeAgo: "Il y a 20 min",
        likes: 12,
      },
      {
        id: "r3",
        author: "Anonymous",
        isAnonymous: true,
        content:
          "Mo baba ena 4 mwa ek mo toizer pe realize ki mo ena PPD. Merci pou sa post la. Mo pou apel SOS Detresse zordi.",
        timeAgo: "Il y a 15 min",
        likes: 22,
      },
    ],
  },
};

const defaultThread = {
  title: "Diskisyon forum",
  content:
    "Konteni sa post la pe load... Revini pli tar pou lir tou bann repons.",
  author: "MamaMoris",
  isAnonymous: false,
  isPinned: false,
  timeAgo: "Il y a 1h",
  views: 42,
  likes: 5,
  category: "general",
  categoryLabel: "General",
  replies: [
    {
      id: "r1",
      author: "SophieM",
      isAnonymous: false,
      content: "Mersi pou partaz sa! Mo osi mo ti ena mem kestion.",
      timeAgo: "Il y a 45 min",
      likes: 3,
    },
    {
      id: "r2",
      author: "Anonymous",
      isAnonymous: true,
      content: "Bien itil sa informasyon la. Mo finn partaz ar mo bann kamarad.",
      timeAgo: "Il y a 30 min",
      likes: 2,
    },
    {
      id: "r3",
      author: "PriyankaD",
      isAnonymous: false,
      content:
        "Mo dakor ar twa! Mo ti gagn mem lexperyans. Fode nou partaz plis ant nou.",
      timeAgo: "Il y a 20 min",
      likes: 4,
    },
  ],
};

const categoryBadgeColor: Record<string, string> = {
  pregnancy: "bg-pink-100 text-pink-700 border-pink-200",
  postpartum: "bg-purple-100 text-purple-700 border-purple-200",
  "solo-mothers": "bg-teal-100 text-teal-700 border-teal-200",
  general: "bg-blue-100 text-blue-700 border-blue-200",
};

export default function ForumThreadPage({
  params,
}: {
  params: Promise<{ category: string; postId: string }>;
}) {
  const { category, postId } = use(params);
  const t = useTranslations("forum");
  const locale = useLocale();

  const thread = threadsData[postId] || defaultThread;

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
            {t("backTo")} {thread.categoryLabel}
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
                    {thread.isAnonymous ? "?" : thread.author[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-sm">
                      {thread.isAnonymous ? t("anonymous") : thread.author}
                    </span>
                    {thread.isPinned && (
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
                      className={`text-xs ${categoryBadgeColor[thread.category]}`}
                    >
                      {thread.categoryLabel}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {thread.timeAgo}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {thread.views} {t("views")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Post title */}
              <div className="px-5 pt-4">
                <h1 className="text-xl font-bold sm:text-2xl">
                  {thread.title}
                </h1>
              </div>

              {/* Post content */}
              <div className="px-5 pt-3 pb-4">
                <div className="prose prose-sm max-w-none text-foreground/90 whitespace-pre-line leading-relaxed">
                  {thread.content}
                </div>
              </div>

              {/* Post actions */}
              <div className="flex items-center gap-1 px-5 pb-4">
                <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
                  <Heart className="h-4 w-4" />
                  <span className="text-xs">{thread.likes}</span>
                </Button>
                <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
                  <Share2 className="h-4 w-4" />
                  <span className="text-xs">{t("share")}</span>
                </Button>
                <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
                  <Flag className="h-4 w-4" />
                  <span className="text-xs">{t("report")}</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Reply count */}
        <AnimatedSection delay={0.1} className="mt-6">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            <h2 className="font-semibold">
              {thread.replies.length} {t("replies")}
            </h2>
          </div>
        </AnimatedSection>

        {/* Replies */}
        <div className="mt-4 space-y-3">
          {thread.replies.map((reply, index) => (
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
                        {reply.isAnonymous ? "?" : reply.author[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">
                          {reply.isAnonymous ? t("anonymous") : reply.author}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {reply.timeAgo}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-foreground/90 leading-relaxed">
                        {reply.content}
                      </p>
                      <div className="mt-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1.5 text-muted-foreground h-7 px-2"
                        >
                          <Heart className="h-3.5 w-3.5" />
                          <span className="text-xs">{reply.likes}</span>
                        </Button>
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
              />
              <div className="mt-3 flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                  <input type="checkbox" className="rounded border-input" />
                  {t("postAnonymously")}
                </label>
                <Button className="gap-2 bg-primary hover:bg-brand-pink-dark">
                  <Send className="h-4 w-4" />
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
