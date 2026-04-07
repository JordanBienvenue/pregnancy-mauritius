"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Baby,
  Heart,
  Globe,
  Bell,
  Shield,
  LogOut,
  ChevronRight,
  Edit3,
  Camera,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/shared/animated-section";

// Dummy user data
const dummyUser = {
  name: "Priya Ramgoolam",
  email: "priya.ramgoolam@email.com",
  phone: "+230 5748 2391",
  avatar: "",
  initials: "PR",
  dueDate: "2026-07-15",
  currentWeek: 24,
  trimester: 2,
  joinedDate: "2026-01-10",
  isSoloMother: false,
  language: "en" as "en" | "fr" | "cr",
  notifications: true,
};

const languageNames: Record<string, string> = {
  en: "English",
  fr: "Fran\u00e7ais",
  cr: "Kreol Morisien",
};

const trimesterColors: Record<number, string> = {
  1: "bg-pink-100 text-pink-700",
  2: "bg-amber-100 text-amber-700",
  3: "bg-teal-100 text-teal-700",
};

const trimesterKeys: Record<number, string> = {
  1: "firstTrimester",
  2: "secondTrimester",
  3: "thirdTrimester",
};

export default function ProfilePage() {
  const t = useTranslations("profile");
  const tc = useTranslations("common");
  const tn = useTranslations("nav");
  const tt = useTranslations("tracker");
  const locale = useLocale();

  const [selectedLang, setSelectedLang] = useState(dummyUser.language);
  const [notificationsOn, setNotificationsOn] = useState(dummyUser.notifications);

  const progress = Math.round((dummyUser.currentWeek / 40) * 100);
  const weeksToGo = 40 - dummyUser.currentWeek;
  const dueDateFormatted = new Date(dummyUser.dueDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen">
      {/* Hero / Profile header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-pink-light via-background to-brand-teal-light">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-1/4 h-52 w-52 rounded-full bg-primary/8 blur-3xl" />
          <div className="absolute bottom-10 right-1/4 h-64 w-64 rounded-full bg-secondary/8 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
          <AnimatedSection>
            <div className="flex flex-col items-center gap-6 sm:flex-row">
              {/* Avatar */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
                className="relative"
              >
                <Avatar size="lg" className="h-24 w-24 text-2xl ring-4 ring-white shadow-xl">
                  {dummyUser.avatar ? (
                    <AvatarImage src={dummyUser.avatar} alt={dummyUser.name} />
                  ) : null}
                  <AvatarFallback className="bg-gradient-to-br from-primary to-brand-pink-dark text-white text-2xl font-bold">
                    {dummyUser.initials}
                  </AvatarFallback>
                </Avatar>
                <button
                  className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-white text-muted-foreground shadow-md transition-colors hover:bg-muted hover:text-foreground"
                  aria-label="Change avatar"
                >
                  <Camera className="h-4 w-4" />
                </button>
              </motion.div>

              <div className="flex-1 text-center sm:text-left">
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl font-bold tracking-tight sm:text-3xl"
                >
                  {dummyUser.name}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="mt-1 text-sm text-muted-foreground"
                >
                  {dummyUser.email}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:justify-start"
                >
                  <Badge className={trimesterColors[dummyUser.trimester]}>
                    {t(trimesterKeys[dummyUser.trimester])}
                  </Badge>
                  <Badge variant="outline" className="gap-1.5">
                    <Baby className="h-3 w-3" />
                    {t("weekOf", { week: dummyUser.currentWeek })}
                  </Badge>
                  <Badge variant="outline" className="gap-1.5">
                    <Calendar className="h-3 w-3" />
                    {t("dueDate")}: {dueDateFormatted}
                  </Badge>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
              >
                <Button variant="outline" className="gap-1.5">
                  <Edit3 className="h-3.5 w-3.5" />
                  {t("edit")}
                </Button>
              </motion.div>
            </div>

            {/* Pregnancy progress */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8"
            >
              <Card className="border-primary/10">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{t("pregnancyProgress")}</span>
                    <span className="text-muted-foreground">{t("weeksToGo", { count: weeksToGo })}</span>
                  </div>
                  <div className="mt-3">
                    <Progress value={progress}>
                      <ProgressLabel className="sr-only">{tt("progress")}</ProgressLabel>
                      <ProgressValue>
                        {() => `${progress}%`}
                      </ProgressValue>
                    </Progress>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{tt("week")} 1</span>
                    <span className="font-medium text-primary">{tt("week")} {dummyUser.currentWeek}</span>
                    <span>{tt("week")} 40</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Content sections */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <StaggerContainer className="grid gap-6 md:grid-cols-2">
            {/* Personal Information */}
            <StaggerItem>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-100 text-pink-600">
                      <User className="h-4 w-4" />
                    </div>
                    {t("personalInfo")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">{t("fullName")}</p>
                      <p className="text-sm font-medium">{dummyUser.name}</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">{t("email")}</p>
                      <p className="text-sm font-medium">{dummyUser.email}</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">{t("phone")}</p>
                      <p className="text-sm font-medium">{dummyUser.phone}</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">{t("memberSince")}</p>
                      <p className="text-sm font-medium">
                        {new Date(dummyUser.joinedDate).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>

            {/* Pregnancy Information */}
            <StaggerItem>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-100 text-teal-600">
                      <Baby className="h-4 w-4" />
                    </div>
                    {t("pregnancyInfo")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">{t("dueDate")}</p>
                      <p className="text-sm font-medium">{dueDateFormatted}</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-3">
                    <Baby className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">{t("currentWeek")}</p>
                      <p className="text-sm font-medium">{t("weekOf", { week: dummyUser.currentWeek })}</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-3">
                    <Heart className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">{t("trimester")}</p>
                      <p className="text-sm font-medium">{t(trimesterKeys[dummyUser.trimester])}</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-3">
                    <Heart className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">{t("soloMother")}</p>
                      <p className="text-sm font-medium">{dummyUser.isSoloMother ? t("yes") : t("no")}</p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full gap-1.5"
                      render={<Link href={`/${locale}/tracker`} />}
                    >
                      {t("viewPregnancyTracker")}
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>

            {/* Language preference */}
            <StaggerItem>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                      <Globe className="h-4 w-4" />
                    </div>
                    {t("language")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-muted-foreground">
                    {t("chooseLanguage")}
                  </p>
                  <div className="space-y-2">
                    {(["en", "fr", "cr"] as const).map((lang) => (
                      <motion.button
                        key={lang}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => setSelectedLang(lang)}
                        className={`flex w-full items-center gap-3 rounded-xl border p-3.5 text-left transition-all ${
                          selectedLang === lang
                            ? "border-primary bg-primary/5 shadow-sm"
                            : "border-border/60 hover:border-border hover:bg-muted/50"
                        }`}
                      >
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold ${
                            selectedLang === lang
                              ? "bg-primary text-white"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {lang.toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{languageNames[lang]}</p>
                        </div>
                        {selectedLang === lang && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white"
                          >
                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </motion.div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>

            {/* Settings */}
            <StaggerItem>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                      <Shield className="h-4 w-4" />
                    </div>
                    {t("settings")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* Notifications toggle */}
                  <div className="flex items-center justify-between rounded-xl border border-border/60 p-3.5">
                    <div className="flex items-center gap-3">
                      <Bell className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{t("notifications")}</p>
                        <p className="text-xs text-muted-foreground">
                          {t("weeklyUpdates")}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={notificationsOn}
                      onClick={() => setNotificationsOn(!notificationsOn)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ${
                        notificationsOn ? "bg-primary" : "bg-muted"
                      }`}
                    >
                      <motion.span
                        layout
                        className="pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0"
                        style={{ x: notificationsOn ? 20 : 0 }}
                      />
                    </button>
                  </div>

                  {/* Settings links */}
                  {[
                    { icon: Shield, label: t("privacySecurity"), description: t("privacyDesc") },
                    { icon: Heart, label: t("aboutApp"), description: t("aboutDesc") },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <motion.button
                        key={item.label}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="flex w-full items-center gap-3 rounded-xl border border-border/60 p-3.5 text-left transition-all hover:border-border hover:bg-muted/50"
                      >
                        <Icon className="h-4 w-4 text-muted-foreground" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{item.label}</p>
                          <p className="text-xs text-muted-foreground">{item.description}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </motion.button>
                    );
                  })}

                  {/* Logout */}
                  <Separator className="my-2" />
                  <Button
                    variant="outline"
                    className="w-full gap-2 text-destructive hover:bg-destructive/5 hover:text-destructive"
                  >
                    <LogOut className="h-4 w-4" />
                    {tc("logout")}
                  </Button>
                </CardContent>
              </Card>
            </StaggerItem>
          </StaggerContainer>

          {/* Quick links */}
          <AnimatedSection delay={0.2}>
            <Card className="mt-6">
              <CardContent className="p-5">
                <h3 className="mb-4 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  {t("quickLinks")}
                </h3>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    { href: "/tracker", label: tn("tracker"), icon: Baby, color: "bg-pink-100 text-pink-600" },
                    { href: "/postpartum", label: tn("postpartum"), icon: Heart, color: "bg-purple-100 text-purple-600" },
                    { href: "/forum", label: tn("forum"), icon: User, color: "bg-blue-100 text-blue-600" },
                    { href: "/directory", label: tn("directory"), icon: Globe, color: "bg-teal-100 text-teal-600" },
                  ].map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link key={link.href} href={`/${locale}${link.href}`}>
                        <motion.div
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex flex-col items-center gap-2 rounded-xl border border-border/50 p-4 transition-all hover:border-primary/30 hover:shadow-sm"
                        >
                          <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${link.color}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <span className="text-xs font-medium">{link.label}</span>
                        </motion.div>
                      </Link>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
