"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { SponsorBanner } from "@/components/shared/sponsor-banner";
import { motion } from "framer-motion";
import {
  Heart,
  Baby,
  Activity,
  Calendar,
  Stethoscope,
  ArrowRight,
  Shield,
  Milk,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/shared/animated-section";

export default function PostpartumDashboard() {
  const t = useTranslations("postpartum");
  const locale = useLocale();

  const dashboardCards = [
    {
      title: t("ppdTitle"),
      description: t("ppdSubtitle"),
      icon: Heart,
      href: `/${locale}/postpartum/ppd`,
      color: "text-rose-500",
      bgColor: "bg-rose-50",
      borderHover: "hover:border-rose-200",
      cta: t("ppdStart"),
    },
    {
      title: t("milestones"),
      description: t("milestonesSubtitle"),
      icon: Baby,
      href: `/${locale}/postpartum/milestones`,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      borderHover: "hover:border-purple-200",
      cta: t("view"),
    },
    {
      title: t("recovery"),
      description: t("recoverySubtitle"),
      icon: TrendingUp,
      href: `/${locale}/postpartum`,
      color: "text-teal-500",
      bgColor: "bg-teal-50",
      borderHover: "hover:border-teal-200",
      cta: t("view"),
    },
    {
      title: t("vaccines"),
      description: t("vaccinesSubtitle"),
      icon: Shield,
      href: `/${locale}/postpartum/milestones`,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      borderHover: "hover:border-blue-200",
      cta: t("view"),
    },
    {
      title: t("breastfeeding"),
      description: t("breastfeedingSubtitle"),
      icon: Milk,
      href: `/${locale}/postpartum`,
      color: "text-amber-500",
      bgColor: "bg-amber-50",
      borderHover: "hover:border-amber-200",
      cta: t("view"),
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-pink-light via-background to-brand-teal-light" />
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 h-64 w-64 rounded-full bg-primary/8 blur-3xl" />
          <div className="absolute bottom-0 left-10 h-48 w-48 rounded-full bg-secondary/8 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-10 sm:px-6 sm:pt-16 sm:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <Badge variant="secondary" className="mb-4 px-3 py-1 text-xs font-medium">
              <Activity className="mr-1.5 h-3 w-3" />
              {t("title")}
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t("title")}
              </span>
            </h1>
            <p className="mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
              {t("subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Summary Cards Row */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="-mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* PPD Score Summary */}
          <AnimatedSection delay={0.1}>
            <Card className="border-border/50 transition-shadow hover:shadow-md">
              <CardContent className="flex items-center gap-4 p-4 sm:p-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-50">
                  <Heart className="h-7 w-7 text-green-500" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-muted-foreground">{t("ppdTitle")}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-foreground">6</span>
                    <span className="text-sm text-muted-foreground">/30</span>
                    <Badge className="ml-1 bg-green-100 text-green-700 text-xs">
                      {t("normal")}
                    </Badge>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">{t("lastCheck", { days: 2 })}</p>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>

          {/* Baby Age */}
          <AnimatedSection delay={0.2}>
            <Card className="border-border/50 transition-shadow hover:shadow-md">
              <CardContent className="flex items-center gap-4 p-4 sm:p-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-purple-50">
                  <Baby className="h-7 w-7 text-purple-500" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-muted-foreground">{t("babyAge")}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-foreground">3</span>
                    <span className="text-sm text-muted-foreground">{t("months")}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">{t("bornDate", { date: "Jan 7, 2026" })}</p>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>

          {/* Next Vaccination */}
          <AnimatedSection delay={0.3}>
            <Card className="border-border/50 transition-shadow hover:shadow-md">
              <CardContent className="flex items-center gap-4 p-4 sm:p-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50">
                  <Calendar className="h-7 w-7 text-blue-500" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-muted-foreground">{t("nextVaccination")}</p>
                  <p className="text-base font-semibold text-foreground">4 {t("months")}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">DTPw-HepB-Hib-2, OPV-2</p>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </div>

      {/* Feature Cards Grid */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {dashboardCards.map((card) => {
            const Icon = card.icon;
            return (
              <StaggerItem key={card.title}>
                <Link href={card.href} className="block h-full">
                  <Card
                    className={`group h-full border-border/50 transition-all duration-300 ${card.borderHover} hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1`}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${card.bgColor}`}
                        >
                          <Icon className={`h-6 w-6 ${card.color}`} />
                        </motion.div>
                      </div>
                      <CardTitle className="mt-3 text-base font-semibold">
                        {card.title}
                      </CardTitle>
                      <CardDescription className="text-sm leading-relaxed">
                        {card.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center text-sm font-medium text-primary opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
                        {card.cta}
                        <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>

      {/* Crisis Help Footer */}
      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6">
        <AnimatedSection>
          <Card className="border-rose-200 bg-rose-50/50">
            <CardContent className="flex flex-col items-center gap-3 p-5 text-center sm:flex-row sm:text-left">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-100">
                <Stethoscope className="h-5 w-5 text-rose-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-rose-800">
                  {t("ppdCrisis")}
                </p>
                <p className="mt-0.5 text-lg font-bold text-rose-700">
                  {t("crisisLine")}
                </p>
              </div>
              <Button
                className="shrink-0 bg-rose-600 hover:bg-rose-700 text-white"
                render={<a href="tel:80093 93" />}
              >
                {t("callNow")}
              </Button>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Sponsor placement */}
        <SponsorBanner category="insurance" variant="minimal" className="mt-8" />
      </div>
    </div>
  );
}
