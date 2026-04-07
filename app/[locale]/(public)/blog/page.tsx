"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { SponsorBanner, SponsorStrip } from "@/components/shared/sponsor-banner";
import { motion } from "framer-motion";
import {
  BookOpen,
  Clock,
  Calendar,
  User,
  ArrowRight,
  Stethoscope,
  Scale,
  Apple,
  Baby,
  Heart,
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

const categoryConfig: Record<
  string,
  { color: string; bgColor: string; icon: typeof Stethoscope }
> = {
  Healthcare: {
    color: "text-teal-700",
    bgColor: "bg-teal-100 border-teal-200",
    icon: Stethoscope,
  },
  Rights: {
    color: "text-indigo-700",
    bgColor: "bg-indigo-100 border-indigo-200",
    icon: Scale,
  },
  Nutrition: {
    color: "text-green-700",
    bgColor: "bg-green-100 border-green-200",
    icon: Apple,
  },
  Pregnancy: {
    color: "text-pink-700",
    bgColor: "bg-pink-100 border-pink-200",
    icon: Baby,
  },
  Postpartum: {
    color: "text-purple-700",
    bgColor: "bg-purple-100 border-purple-200",
    icon: Heart,
  },
};

const blogArticles = [
  {
    slug: "choisir-gynecologue-maurice",
    title: "Comment choisir son gynecologue a Maurice",
    excerpt:
      "Un guide complet pour trouver le bon gynecologue: questions a poser, criteres importants, et recommandations par district.",
    author: "Dr. Nadia Doorgakant",
    authorRole: "Gynecologue, Clinique du Nord",
    readTime: 7,
    date: "2 Avril 2026",
    category: "Healthcare",
    isFeatured: true,
  },
  {
    slug: "droits-maternite-maurice-2024",
    title: "Vos droits de maternite a Maurice en 2024",
    excerpt:
      "Tout ce que vous devez savoir sur vos droits en tant que future maman: conge maternite, protection de l'emploi, et allaitement au travail.",
    author: "Me. Priya Ramsaran",
    authorRole: "Avocate en droit du travail",
    readTime: 5,
    date: "28 Mars 2026",
    category: "Rights",
    isFeatured: false,
  },
  {
    slug: "cravings-grossesse-maurice",
    title: "Cravings de grossesse: que manger a Maurice?",
    excerpt:
      "Dal puri, gato pima, mangue vert... Quels sont les aliments locaux a privilegier et ceux a eviter pendant la grossesse?",
    author: "Nutritionniste Aisha Jhurry",
    authorRole: "Dieteticienne clinique",
    readTime: 6,
    date: "22 Mars 2026",
    category: "Nutrition",
    isFeatured: false,
  },
  {
    slug: "guide-premier-trimestre",
    title: "Guide complet du premier trimestre",
    excerpt:
      "Semaines 1 a 12: les changements dans votre corps, les examens a faire, et comment gerer les nausees et la fatigue.",
    author: "Dr. Rajiv Doobur",
    authorRole: "Obstetricien, Wellkin Hospital",
    readTime: 8,
    date: "15 Mars 2026",
    category: "Pregnancy",
    isFeatured: false,
  },
  {
    slug: "allaitement-conseils-maurice",
    title: "Allaitement: conseils pratiques pour les mamans mauriciennes",
    excerpt:
      "Positions, frequence, alimentation de la maman qui allaite, et ou trouver du soutien a Maurice.",
    author: "Sage-femme Marie-Claire Noel",
    authorRole: "Consultante en lactation, IBCLC",
    readTime: 6,
    date: "8 Mars 2026",
    category: "Postpartum",
    isFeatured: false,
  },
];

export default function BlogPage() {
  const t = useTranslations("blog");
  const locale = useLocale();

  const featured = blogArticles.find((a) => a.isFeatured)!;
  const others = blogArticles.filter((a) => !a.isFeatured);

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-pink-light/30 via-background to-background">
      {/* Hero */}
      <section className="border-b bg-white/50 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <AnimatedSection>
            <div className="text-center">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-50"
              >
                <BookOpen className="h-8 w-8 text-pink-500" />
              </motion.div>
              <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                {t("title")}
              </h1>
              <p className="mt-2 text-muted-foreground max-w-lg mx-auto">
                {t("subtitle")}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* Featured Article */}
        <AnimatedSection>
          <Link href={`/${locale}/blog/${featured.slug}`}>
            <Card className="group overflow-hidden border-border/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2">
                  {/* Image placeholder */}
                  <div className="relative h-56 md:h-full bg-gradient-to-br from-primary/20 via-brand-pink-light to-secondary/20 flex items-center justify-center">
                    {(() => {
                      const config = categoryConfig[featured.category];
                      const Icon = config.icon;
                      return <Icon className="h-20 w-20 text-primary/20" />;
                    })()}
                    <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                      {t("featured")}
                    </Badge>
                  </div>

                  <div className="p-6 sm:p-8 flex flex-col justify-center">
                    <Badge
                      variant="outline"
                      className={`w-fit text-xs ${categoryConfig[featured.category].bgColor} ${categoryConfig[featured.category].color}`}
                    >
                      {featured.category}
                    </Badge>
                    <h2 className="mt-3 text-xl font-bold sm:text-2xl group-hover:text-primary transition-colors">
                      {featured.title}
                    </h2>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                      {featured.excerpt}
                    </p>

                    <div className="mt-4 flex items-center gap-3">
                      <Avatar size="sm">
                        <AvatarFallback className="text-xs">
                          {featured.author[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-xs font-medium">{featured.author}</p>
                        <p className="text-xs text-muted-foreground">
                          {featured.authorRole}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {featured.readTime} {t("minuteRead")}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {featured.date}
                      </span>
                    </div>

                    <div className="mt-4">
                      <span className="inline-flex items-center text-sm font-medium text-primary group-hover:underline">
                        {t("readMore")}
                        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </AnimatedSection>

        {/* Article Grid */}
        <StaggerContainer className="mt-8 grid gap-6 sm:grid-cols-2">
          {others.map((article) => {
            const config = categoryConfig[article.category];
            const Icon = config.icon;
            return (
              <StaggerItem key={article.slug}>
                <Link href={`/${locale}/blog/${article.slug}`}>
                  <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
                    <Card className="group h-full border-border/50 overflow-hidden transition-all duration-300 hover:shadow-md">
                      <CardContent className="p-0">
                        {/* Image placeholder */}
                        <div className="relative h-36 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                          <Icon className="h-12 w-12 text-muted-foreground/20" />
                        </div>

                        <div className="p-5">
                          <Badge
                            variant="outline"
                            className={`text-xs ${config.bgColor} ${config.color}`}
                          >
                            {article.category}
                          </Badge>
                          <h3 className="mt-2.5 font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                            {article.title}
                          </h3>
                          <p className="mt-2 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                            {article.excerpt}
                          </p>

                          <div className="mt-4 flex items-center gap-3">
                            <Avatar size="sm">
                              <AvatarFallback className="text-xs">
                                {article.author[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-xs font-medium">{article.author}</p>
                            </div>
                          </div>

                          <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {article.readTime} {t("minuteRead")}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {article.date}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Sponsor placements */}
        <SponsorBanner category="pharmacy" variant="card" className="mt-12" />
        <SponsorStrip className="mt-8" />
      </div>
    </div>
  );
}
