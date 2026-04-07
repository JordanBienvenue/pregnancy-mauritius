"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import {
  Heart,
  MapPin,
  Baby,
  ArrowRight,
  ChevronDown,
  Search,
  MessageCircle,
  Star,
  Stethoscope,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/* ============================================================
   Shared animation constants
   ============================================================ */

const ease = [0.21, 0.47, 0.32, 0.98] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease },
});

/* ============================================================
   Shared floating heart component (used in V2 & V5)
   ============================================================ */

function FloatingHeart({
  delay,
  left,
  size,
  opacity,
  duration,
  xDrift,
}: {
  delay: number;
  left: string;
  size: number;
  opacity: number;
  duration: number;
  xDrift: [number, number];
}) {
  return (
    <motion.div
      className="absolute bottom-0 pointer-events-none"
      style={{ left }}
      initial={{ y: 0, opacity: 0 }}
      animate={{
        y: [0, -600, -900],
        opacity: [0, opacity, 0],
        x: [0, xDrift[0], xDrift[1]],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    >
      <Heart
        className="text-primary/40"
        style={{ width: size, height: size }}
        fill="currentColor"
      />
    </motion.div>
  );
}

/* ============================================================
   Animated counter hook
   ============================================================ */

function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 2,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(count, target, {
      duration,
      ease: "easeOut",
    });
    const unsubscribe = rounded.on("change", (v) => setDisplay(v));
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [count, rounded, target, duration]);

  return (
    <span>
      {prefix}
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ============================================================
   VARIANT 1: SPLIT — Image + Text side by side
   ============================================================ */

export function HeroSplit() {
  const t = useTranslations("home");
  const locale = useLocale();

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-pink-light via-background to-brand-teal-light" />

      <div className="relative mx-auto max-w-7xl w-full px-4 sm:px-6 py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left: Text */}
          <div className="order-2 md:order-1">
            <motion.div {...fadeUp(0)}>
              <Badge
                variant="secondary"
                className="mb-6 px-4 py-1.5 text-sm font-medium"
              >
                <Heart className="mr-1.5 h-3.5 w-3.5 text-primary" />
                {t("heroTitle").split(" ").slice(0, 3).join(" ")}
              </Badge>
            </motion.div>

            <motion.h1
              {...fadeUp(0.1)}
              className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            >
              <span className="bg-gradient-to-r from-primary via-brand-pink-dark to-secondary bg-clip-text text-transparent">
                {t("heroTitle")}
              </span>
            </motion.h1>

            <motion.p
              {...fadeUp(0.2)}
              className="mt-6 text-lg text-muted-foreground sm:text-xl max-w-lg"
            >
              {t("heroSubtitle")}
            </motion.p>

            <motion.div
              {...fadeUp(0.3)}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <Button
                size="lg"
                className="group h-12 px-8 text-base bg-primary hover:bg-brand-pink-dark"
                render={<Link href={`/${locale}/register`} />}
              >
                {t("heroCta")}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 text-base"
                render={<Link href={`/${locale}/directory`} />}
              >
                <MapPin className="mr-2 h-4 w-4" />
                {t("heroSecondary")}
              </Button>
            </motion.div>

            {/* Floating badges */}
            <motion.div
              {...fadeUp(0.5)}
              className="mt-10 flex flex-wrap gap-3"
            >
              {[
                {
                  icon: Baby,
                  label: "Week-by-week tracker",
                  color: "text-primary",
                },
                {
                  icon: Stethoscope,
                  label: "50+ providers",
                  color: "text-secondary",
                },
                {
                  icon: Heart,
                  label: "PPD support",
                  color: "text-red-500",
                },
              ].map((badge, i) => (
                <motion.div
                  key={badge.label}
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 3.5 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.8,
                  }}
                >
                  <Badge className="bg-white text-foreground shadow-md border px-3 py-1">
                    <badge.icon
                      className={`mr-1.5 h-3 w-3 ${badge.color}`}
                    />
                    {badge.label}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: Illustrated placeholder */}
          <motion.div
            className="relative order-1 md:order-2 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease }}
          >
            {/* Gradient circle */}
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 via-brand-pink-light to-secondary/30"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute inset-4 rounded-full bg-gradient-to-tr from-primary/20 via-white/80 to-secondary/20 backdrop-blur-sm"
                animate={{ scale: [1, 0.97, 1] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              />

              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Baby className="h-20 w-20 text-primary/60" />
                </motion.div>
              </div>

              {/* Orbiting icons */}
              {[
                { Icon: Heart, angle: 0, distance: "52%", delay: 0 },
                { Icon: Heart, angle: 72, distance: "48%", delay: 1 },
                { Icon: Baby, angle: 144, distance: "50%", delay: 2 },
                { Icon: Heart, angle: 216, distance: "46%", delay: 3 },
                { Icon: Baby, angle: 288, distance: "54%", delay: 4 },
              ].map((item, i) => {
                const rad = (item.angle * Math.PI) / 180;
                const x = Math.cos(rad) * 50;
                const y = Math.sin(rad) * 50;
                return (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      left: `calc(50% + ${x}%)`,
                      top: `calc(50% + ${y}%)`,
                      transform: "translate(-50%, -50%)",
                    }}
                    animate={{
                      y: [0, -12, 0],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 4 + i * 0.3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: item.delay * 0.6,
                    }}
                  >
                    <item.Icon
                      className={`h-6 w-6 ${i % 2 === 0 ? "text-primary/50" : "text-secondary/50"}`}
                      fill="currentColor"
                    />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   VARIANT 2: VISUAL — Full-width visual background
   ============================================================ */

export function HeroVisual() {
  const t = useTranslations("home");
  const locale = useLocale();

  const stats = [
    { target: 19000, suffix: "+", label: t("statsBirths") },
    { target: 50, suffix: "+", label: t("statsProviders") },
    { target: 3, suffix: "", label: t("statsLanguages") },
  ];

  const hearts = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        delay: i * 1.5,
        left: `${5 + ((i * 7.3 + 13) % 90)}%`,
        size: 10 + ((i * 3.7) % 14),
        opacity: 0.15 + ((i * 0.04) % 0.2),
        duration: 8 + ((i * 1.3) % 6),
        xDrift: [((i * 11) % 40) - 20, ((i * 17) % 60) - 30] as [number, number],
      })),
    []
  );

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/20 via-brand-pink-light to-secondary/20"
          animate={{
            background: [
              "linear-gradient(135deg, oklch(0.59 0.16 356 / 0.2), oklch(0.92 0.04 356), oklch(0.57 0.13 163 / 0.2))",
              "linear-gradient(225deg, oklch(0.57 0.13 163 / 0.2), oklch(0.92 0.04 163), oklch(0.59 0.16 356 / 0.2))",
              "linear-gradient(135deg, oklch(0.59 0.16 356 / 0.2), oklch(0.92 0.04 356), oklch(0.57 0.13 163 / 0.2))",
            ],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />

        {/* Morphing blobs */}
        <motion.div
          className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full bg-secondary/10 blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, -60, 0],
            scale: [1.1, 0.9, 1.1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-brand-pink-light/40 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Floating hearts/baby icons drifting upward */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {hearts.map((h, i) => (
          <FloatingHeart key={i} {...h} />
        ))}
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 py-20 text-center">
        {/* Glassmorphism card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease }}
          className="rounded-3xl border border-white/30 bg-white/60 backdrop-blur-xl shadow-2xl shadow-primary/5 px-6 py-12 sm:px-12 sm:py-16"
        >
          <motion.div {...fadeUp(0.1)}>
            <Badge
              variant="secondary"
              className="mb-6 px-4 py-1.5 text-sm font-medium"
            >
              <Heart className="mr-1.5 h-3.5 w-3.5 text-primary" />
              Manman Moris
            </Badge>
          </motion.div>

          <motion.h1
            {...fadeUp(0.2)}
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <span className="bg-gradient-to-r from-primary via-brand-pink-dark to-secondary bg-clip-text text-transparent">
              {t("heroTitle")}
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.3)}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl"
          >
            {t("heroSubtitle")}
          </motion.p>

          {/* Counter stats */}
          <motion.div
            {...fadeUp(0.4)}
            className="mt-10 grid grid-cols-3 gap-4 sm:gap-8"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary">
                  <AnimatedCounter
                    target={stat.target}
                    suffix={stat.suffix}
                    duration={2.5}
                  />
                </div>
                <div className="mt-1 text-xs sm:text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            {...fadeUp(0.5)}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Button
              size="lg"
              className="group h-12 px-8 text-base bg-primary hover:bg-brand-pink-dark"
              render={<Link href={`/${locale}/register`} />}
            >
              {t("heroCta")}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 text-base"
              render={<Link href={`/${locale}/directory`} />}
            >
              <MapPin className="mr-2 h-4 w-4" />
              {t("heroSecondary")}
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="h-6 w-6 text-muted-foreground/60" />
      </motion.div>
    </section>
  );
}

/* ============================================================
   VARIANT 3: CARDS — Interactive feature preview
   ============================================================ */

function TrackerMiniDemo() {
  const fruits = [
    { week: 8, name: "Raspberry", emoji: "\ud83e\uddc6" },
    { week: 12, name: "Lime", emoji: "\ud83c\udf4b" },
    { week: 16, name: "Avocado", emoji: "\ud83e\udd51" },
    { week: 20, name: "Banana", emoji: "\ud83c\udf4c" },
    { week: 24, name: "Mango", emoji: "\ud83e\udd6d" },
  ];

  const [activeIndex, setActiveIndex] = useState(2);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % fruits.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [fruits.length]);

  const fruit = fruits[activeIndex];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          Week {fruit.week}
        </span>
        <span>{Math.round((fruit.week / 40) * 100)}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
          animate={{ width: `${(fruit.week / 40) * 100}%` }}
          transition={{ duration: 0.6, ease }}
        />
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={fruit.week}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3 pt-1"
        >
          <span className="text-3xl">{fruit.emoji}</span>
          <div>
            <div className="text-sm font-medium">Baby is a {fruit.name}</div>
            <div className="text-xs text-muted-foreground">
              Week {fruit.week} of 40
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function DoctorMiniDemo() {
  const [isPinVisible, setIsPinVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsPinVisible(true), 600);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-2">
        <Search className="h-3.5 w-3.5 text-muted-foreground" />
        <motion.span
          className="text-xs text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Gynaecologist near Port Louis...
        </motion.span>
      </div>
      <div className="relative h-20 w-full rounded-lg bg-gradient-to-br from-secondary/10 to-brand-teal-light overflow-hidden">
        {/* Mini map grid */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute w-full border-t border-secondary/30"
              style={{ top: `${(i + 1) * 25}%` }}
            />
          ))}
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute h-full border-l border-secondary/30"
              style={{ left: `${(i + 1) * 25}%` }}
            />
          ))}
        </div>
        <AnimatePresence>
          {isPinVisible && (
            <motion.div
              className="absolute"
              style={{ left: "60%", top: "35%" }}
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
            >
              <MapPin className="h-6 w-6 text-secondary fill-secondary/30" />
              <motion.div
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1.5 w-3 rounded-full bg-secondary/30"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.2, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {isPinVisible && (
            <motion.div
              className="absolute"
              style={{ left: "30%", top: "55%" }}
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: 0.3,
              }}
            >
              <MapPin className="h-5 w-5 text-primary fill-primary/30" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="flex items-center gap-2"
      >
        <Stethoscope className="h-3.5 w-3.5 text-secondary" />
        <span className="text-xs text-muted-foreground">
          3 providers found nearby
        </span>
      </motion.div>
    </div>
  );
}

const chatMessages = [
  {
    text: "Ki bon gyneko dan Port Louis?",
    align: "left" as const,
    delay: 0,
  },
  { text: "Dr. Ramkhelawon! Li extra.", align: "right" as const, delay: 1.2 },
  {
    text: "Mersi! Mo pou pran rdv \u2764\ufe0f",
    align: "left" as const,
    delay: 2.4,
  },
];

function CommunityMiniDemo() {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount < chatMessages.length) {
      const timeout = setTimeout(
        () => setVisibleCount((c) => c + 1),
        chatMessages[visibleCount]?.delay ? chatMessages[visibleCount].delay * 1000 : 800
      );
      return () => clearTimeout(timeout);
    }
    // Reset after showing all
    const resetTimeout = setTimeout(() => setVisibleCount(0), 3000);
    return () => clearTimeout(resetTimeout);
  }, [visibleCount]);

  return (
    <div className="space-y-2.5 min-h-[100px]">
      <div className="flex items-center gap-2 mb-3">
        <Users className="h-3.5 w-3.5 text-primary" />
        <span className="text-xs text-muted-foreground">Community Forum</span>
      </div>
      <AnimatePresence>
        {chatMessages.slice(0, visibleCount).map((msg, i) => (
          <motion.div
            key={`${msg.text}-${i}`}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, ease }}
            className={`flex ${msg.align === "right" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-3 py-1.5 text-xs ${
                msg.align === "right"
                  ? "bg-primary text-primary-foreground rounded-br-sm"
                  : "bg-muted text-foreground rounded-bl-sm"
              }`}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      {visibleCount < chatMessages.length && (
        <motion.div
          className={`flex ${chatMessages[visibleCount]?.align === "right" ? "justify-end" : "justify-start"}`}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <div className="flex gap-1 px-3 py-2">
            <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
            <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
            <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
          </div>
        </motion.div>
      )}
    </div>
  );
}

export function HeroCards() {
  const t = useTranslations("home");
  const locale = useLocale();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const cards = [
    {
      title: t("featureTracker"),
      desc: t("featureTrackerDesc"),
      icon: Baby,
      color: "text-primary",
      bgColor: "bg-primary/5",
      borderColor: "hover:border-primary/30",
      demo: <TrackerMiniDemo />,
    },
    {
      title: t("featureDirectory"),
      desc: t("featureDirectoryDesc"),
      icon: MapPin,
      color: "text-secondary",
      bgColor: "bg-secondary/5",
      borderColor: "hover:border-secondary/30",
      demo: <DoctorMiniDemo />,
    },
    {
      title: t("featureForum"),
      desc: t("featureForumDesc"),
      icon: MessageCircle,
      color: "text-primary",
      bgColor: "bg-primary/5",
      borderColor: "hover:border-primary/30",
      demo: <CommunityMiniDemo />,
    },
  ];

  return (
    <section className="relative py-16 sm:py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-pink-light/50 via-background to-background" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Title */}
        <div className="text-center mb-14">
          <motion.div {...fadeUp(0)}>
            <Badge
              variant="secondary"
              className="mb-4 px-4 py-1.5 text-sm font-medium"
            >
              <Heart className="mr-1.5 h-3.5 w-3.5 text-primary" />
              Manman Moris
            </Badge>
          </motion.div>

          <motion.h1
            {...fadeUp(0.1)}
            className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
          >
            <span className="bg-gradient-to-r from-primary via-brand-pink-dark to-secondary bg-clip-text text-transparent">
              {t("heroTitle")}
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.2)}
            className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground"
          >
            {t("heroSubtitle")}
          </motion.p>
        </div>

        {/* Interactive cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, i) => {
            const isHovered = hoveredCard === i;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease }}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <Card
                  className={`relative h-full cursor-pointer overflow-hidden border transition-all duration-500 ${card.borderColor} ${isHovered ? "shadow-xl shadow-primary/5 -translate-y-2" : "shadow-sm"}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <motion.div
                        animate={
                          isHovered
                            ? { scale: 1.1, rotate: 5 }
                            : { scale: 1, rotate: 0 }
                        }
                        transition={{ duration: 0.3 }}
                        className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${card.bgColor}`}
                      >
                        <card.icon className={`h-5 w-5 ${card.color}`} />
                      </motion.div>
                      <h3 className="font-semibold text-base">{card.title}</h3>
                    </div>

                    <AnimatePresence mode="wait">
                      {isHovered ? (
                        <motion.div
                          key="demo"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4, ease }}
                        >
                          {card.demo}
                        </motion.div>
                      ) : (
                        <motion.p
                          key="desc"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-sm text-muted-foreground leading-relaxed"
                        >
                          {card.desc}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.6)}
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Button
            size="lg"
            className="group h-12 px-8 text-base bg-primary hover:bg-brand-pink-dark"
            render={<Link href={`/${locale}/register`} />}
          >
            {t("heroCta")}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 px-8 text-base"
            render={<Link href={`/${locale}/directory`} />}
          >
            <MapPin className="mr-2 h-4 w-4" />
            {t("heroSecondary")}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   VARIANT 4: TESTIMONIAL — Social proof focused
   ============================================================ */

const testimonials = [
  {
    text: "Manman Moris finn sanz mo lavi. Mo finn trouv enn bon gyneko gras a zot.",
    name: "Priya",
    district: "Port Louis",
    initials: "PR",
    rating: 5,
  },
  {
    text: "Le forum m\u2019a beaucoup aid\u00e9e pendant mon premier trimestre.",
    name: "Marie",
    district: "Curepipe",
    initials: "MA",
    rating: 5,
  },
  {
    text: "Mo ti santi mwa izole koman mama solo. Aster mo ena enn kominote.",
    name: "Anisha",
    district: "Rose Hill",
    initials: "AN",
    rating: 5,
  },
  {
    text: "Sa platform la ti bizin existe depi lontan!",
    name: "Fatima",
    district: "Flacq",
    initials: "FA",
    rating: 5,
  },
];

export function HeroTestimonial() {
  const t = useTranslations("home");
  const locale = useLocale();
  const [activeIndex, setActiveIndex] = useState(0);

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next]);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-pink-light via-background to-brand-teal-light" />
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl"
        animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-secondary/5 blur-3xl"
        animate={{ x: [0, -30, 0], y: [0, -25, 0] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 py-20 text-center">
        {/* Badge */}
        <motion.div {...fadeUp(0)}>
          <Badge
            variant="secondary"
            className="mb-6 px-4 py-1.5 text-sm font-medium"
          >
            <Heart className="mr-1.5 h-3.5 w-3.5 text-primary" />
            Manman Moris
          </Badge>
        </motion.div>

        {/* Gradient headline */}
        <motion.h1
          {...fadeUp(0.1)}
          className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
        >
          <span className="bg-gradient-to-r from-primary via-brand-pink-dark to-secondary bg-clip-text text-transparent">
            {t("heroTitle")}
          </span>
        </motion.h1>

        <motion.p
          {...fadeUp(0.2)}
          className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground"
        >
          {t("heroSubtitle")}
        </motion.p>

        {/* Testimonial carousel */}
        <motion.div
          {...fadeUp(0.3)}
          className="mt-12 mx-auto max-w-2xl"
        >
          <div className="relative min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.97 }}
                transition={{ duration: 0.5, ease }}
              >
                <Card className="border border-white/50 bg-white/70 backdrop-blur-sm shadow-lg">
                  <CardContent className="p-8">
                    {/* Stars */}
                    <div className="flex justify-center gap-1 mb-4">
                      {Array.from({ length: testimonials[activeIndex].rating }).map(
                        (_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 text-amber-400 fill-amber-400"
                          />
                        )
                      )}
                    </div>

                    {/* Quote */}
                    <p className="text-base sm:text-lg italic text-foreground leading-relaxed">
                      &ldquo;{testimonials[activeIndex].text}&rdquo;
                    </p>

                    {/* Author */}
                    <div className="mt-6 flex items-center justify-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-white text-sm font-semibold">
                        {testimonials[activeIndex].initials}
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-semibold">
                          {testimonials[activeIndex].name}
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {testimonials[activeIndex].district}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="mt-6 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "w-8 bg-primary"
                    : "w-2 bg-primary/30 hover:bg-primary/50"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.5)}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Button
            size="lg"
            className="group h-12 px-8 text-base bg-primary hover:bg-brand-pink-dark"
            render={<Link href={`/${locale}/register`} />}
          >
            {t("heroCta")}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 px-8 text-base"
            render={<Link href={`/${locale}/directory`} />}
          >
            <MapPin className="mr-2 h-4 w-4" />
            {t("heroSecondary")}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   VARIANT 5: MINIMAL — Clean, zen aesthetic
   ============================================================ */

const cyclingWords = ["support", "community", "guidance", "care"];

export function HeroMinimal() {
  const t = useTranslations("home");
  const locale = useLocale();
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % cyclingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const sparseHearts = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        delay: i * 3,
        left: `${10 + i * 20}%`,
        size: 8 + ((i * 3.1) % 8),
        opacity: 0.1 + ((i * 0.03) % 0.1),
        duration: 12 + ((i * 2.7) % 8),
        xDrift: [((i * 9) % 40) - 20, ((i * 13) % 60) - 30] as [number, number],
      })),
    []
  );

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-background" />

      {/* Sparse floating hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {sparseHearts.map((h, i) => (
          <FloatingHeart key={i} {...h} />
        ))}
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 py-20 text-center">
        {/* Main line with cycling word */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-foreground">
            Every mum deserves{" "}
            <span className="relative inline-block min-w-[200px] sm:min-w-[280px] text-left">
              <AnimatePresence mode="wait">
                <motion.span
                  key={cyclingWords[wordIndex]}
                  className="inline-block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                  initial={{ y: 30, opacity: 0, filter: "blur(8px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -30, opacity: 0, filter: "blur(8px)" }}
                  transition={{ duration: 0.5, ease }}
                >
                  {cyclingWords[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>
        </motion.div>

        {/* Gradient underline */}
        <motion.div
          className="mx-auto mt-6 h-1 w-32 sm:w-48 rounded-full bg-gradient-to-r from-primary/60 via-brand-pink-dark/40 to-secondary/60"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, ease }}
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mx-auto mt-8 max-w-xl text-lg text-muted-foreground"
        >
          {t("heroSubtitle")}
        </motion.p>

        {/* Minimal CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Button
            size="lg"
            className="group h-12 px-10 text-base bg-primary hover:bg-brand-pink-dark"
            render={<Link href={`/${locale}/register`} />}
          >
            {t("heroCta")}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            size="lg"
            variant="ghost"
            className="h-12 px-8 text-base text-muted-foreground hover:text-foreground"
            render={<Link href={`/${locale}/directory`} />}
          >
            {t("heroSecondary")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
