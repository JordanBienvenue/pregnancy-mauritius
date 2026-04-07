"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, ArrowRight, Clock, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

/* -------------------------------------------------------------------------- */
/*  Shared types                                                              */
/* -------------------------------------------------------------------------- */

export type SponsorData = {
  name: string;
  tagline: string;
  cta: string;
  href: string;
  logoInitial: string;
};

type BaseAdProps = {
  sponsor: SponsorData;
  onClose?: () => void;
  className?: string;
};

/* -------------------------------------------------------------------------- */
/*  Shared logo component                                                     */
/* -------------------------------------------------------------------------- */

function SponsorLogo({
  initial,
  size = "md",
  className,
}: {
  initial: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-12 w-12 text-base",
    lg: "h-16 w-16 text-xl",
    xl: "h-20 w-20 text-2xl",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: 2 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={cn(
        "flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 font-bold text-primary ring-1 ring-primary/10",
        sizeClasses[size],
        className
      )}
    >
      {initial}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  1. Leaderboard Banner (728x90)                                            */
/* -------------------------------------------------------------------------- */

export function LeaderboardBanner({ sponsor, className }: BaseAdProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn(
        "mx-auto w-full max-w-[728px] overflow-hidden rounded-xl border border-primary/10 bg-gradient-to-r from-brand-pink-light/60 via-white to-brand-teal-light/60",
        className
      )}
    >
      <div className="flex h-[90px] items-center justify-between px-5">
        <div className="flex items-center gap-4">
          <SponsorLogo initial={sponsor.logoInitial} size="md" />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="truncate text-sm font-semibold text-foreground">
                {sponsor.name}
              </p>
              <Badge
                variant="outline"
                className="shrink-0 border-primary/20 text-[9px] uppercase tracking-widest text-muted-foreground"
              >
                Ad
              </Badge>
            </div>
            <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
              {sponsor.tagline}
            </p>
          </div>
        </div>

        <motion.a
          href={sponsor.href}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="ml-4 shrink-0 inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground shadow-sm transition-shadow hover:shadow-md"
        >
          {sponsor.cta}
          <ArrowRight className="h-3.5 w-3.5" />
        </motion.a>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  2. Sticky Top Bar                                                         */
/* -------------------------------------------------------------------------- */

export function StickyTopBar({ sponsor, onClose, className }: BaseAdProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    onClose?.();
  }, [onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -48, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -48, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={cn(
            "relative z-50 w-full border-b border-primary/10 bg-gradient-to-r from-brand-pink-light/80 via-white to-brand-teal-light/80 backdrop-blur-md",
            className
          )}
        >
          <div className="mx-auto flex h-10 max-w-7xl items-center justify-center gap-3 px-4 sm:gap-4">
            <Badge
              variant="outline"
              className="hidden border-primary/20 text-[9px] uppercase tracking-widest text-muted-foreground sm:inline-flex"
            >
              Sponsored
            </Badge>
            <div className="flex items-center gap-2 truncate text-xs sm:text-sm">
              <span className="font-medium text-foreground">
                {sponsor.name}
              </span>
              <span className="hidden text-muted-foreground sm:inline">—</span>
              <span className="hidden truncate text-muted-foreground sm:inline">
                {sponsor.tagline}
              </span>
            </div>
            <motion.a
              href={sponsor.href}
              whileHover={{ x: 2 }}
              className="shrink-0 text-xs font-medium text-primary hover:underline"
            >
              {sponsor.cta} &rarr;
            </motion.a>
            <button
              onClick={handleClose}
              aria-label="Dismiss advertisement"
              className="ml-1 shrink-0 rounded-full p-1 text-muted-foreground/60 transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* -------------------------------------------------------------------------- */
/*  3. Sticky Bottom Bar (mobile-first)                                       */
/* -------------------------------------------------------------------------- */

export function StickyBottomBar({ sponsor, onClose, className }: BaseAdProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    onClose?.();
  }, [onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30, delay: 1 }}
          className={cn(
            "fixed bottom-0 left-0 right-0 z-50 border-t border-primary/10 bg-white/95 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur-md",
            className
          )}
        >
          <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
            <SponsorLogo initial={sponsor.logoInitial} size="sm" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <p className="truncate text-sm font-medium text-foreground">
                  {sponsor.name}
                </p>
                <Badge
                  variant="outline"
                  className="shrink-0 border-primary/20 text-[8px] uppercase tracking-widest text-muted-foreground"
                >
                  Ad
                </Badge>
              </div>
              <p className="truncate text-xs text-muted-foreground">
                {sponsor.tagline}
              </p>
            </div>
            <motion.a
              href={sponsor.href}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="shrink-0 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground shadow-sm"
            >
              {sponsor.cta}
            </motion.a>
            <button
              onClick={handleClose}
              aria-label="Dismiss advertisement"
              className="shrink-0 rounded-full p-1.5 text-muted-foreground/60 transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* -------------------------------------------------------------------------- */
/*  4. Interstitial / Full Page Takeover                                      */
/* -------------------------------------------------------------------------- */

export function InterstitialAd({
  sponsor,
  onClose,
  className,
  countdownSeconds = 5,
}: BaseAdProps & { countdownSeconds?: number }) {
  const [isVisible, setIsVisible] = useState(true);
  const [countdown, setCountdown] = useState(countdownSeconds);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleClose = useCallback(() => {
    if (countdown > 0) return;
    setIsVisible(false);
    onClose?.();
  }, [countdown, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className={cn(
            "fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-brand-pink-light via-white to-brand-teal-light p-6",
            className
          )}
        >
          {/* Decorative elements */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/5"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-secondary/5"
            />
          </div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.15,
            }}
            className="relative w-full max-w-lg"
          >
            {/* Close / countdown button */}
            <div className="absolute -top-2 right-0 z-10">
              <motion.button
                onClick={handleClose}
                disabled={countdown > 0}
                whileHover={countdown <= 0 ? { scale: 1.05 } : undefined}
                whileTap={countdown <= 0 ? { scale: 0.95 } : undefined}
                className={cn(
                  "flex items-center gap-1.5 rounded-full border bg-white px-3 py-1.5 text-xs font-medium shadow-sm transition-all",
                  countdown > 0
                    ? "cursor-not-allowed border-muted text-muted-foreground"
                    : "border-primary/20 text-foreground hover:border-primary/40"
                )}
                aria-label={
                  countdown > 0
                    ? `Ad closes in ${countdown} seconds`
                    : "Close advertisement"
                }
              >
                {countdown > 0 ? (
                  <>
                    <Clock className="h-3 w-3" />
                    Skip in {countdown}s
                  </>
                ) : (
                  <>
                    <X className="h-3 w-3" />
                    Close
                  </>
                )}
              </motion.button>
            </div>

            <Card className="overflow-hidden border-primary/10 shadow-2xl">
              <CardContent className="p-0">
                {/* Top gradient bar */}
                <div className="h-1.5 bg-gradient-to-r from-primary via-brand-pink to-secondary" />

                <div className="flex flex-col items-center px-8 py-10 text-center">
                  <Badge
                    variant="outline"
                    className="mb-6 border-primary/20 text-[10px] uppercase tracking-widest text-muted-foreground"
                  >
                    Sponsored
                  </Badge>

                  <SponsorLogo initial={sponsor.logoInitial} size="xl" />

                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-6 text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
                  >
                    {sponsor.name}
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base"
                  >
                    {sponsor.tagline}
                  </motion.p>

                  <motion.a
                    href={sponsor.href}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-shadow hover:shadow-xl hover:shadow-primary/30"
                  >
                    <Sparkles className="h-4 w-4" />
                    {sponsor.cta}
                    <ArrowRight className="h-4 w-4" />
                  </motion.a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* -------------------------------------------------------------------------- */
/*  5. Native In-Feed Ad                                                      */
/* -------------------------------------------------------------------------- */

export function NativeInFeedAd({ sponsor, className }: BaseAdProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn("group", className)}
    >
      <Card className="overflow-hidden border-border/50 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
        <CardContent className="p-0">
          {/* Simulated content image area */}
          <div className="relative h-40 bg-gradient-to-br from-primary/10 via-brand-pink-light/40 to-secondary/10 sm:h-48">
            <SponsorLogo
              initial={sponsor.logoInitial}
              size="lg"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30"
            />
            <Badge
              variant="outline"
              className="absolute left-3 top-3 border-white/30 bg-white/80 text-[9px] uppercase tracking-widest text-muted-foreground backdrop-blur-sm"
            >
              Sponsored
            </Badge>
          </div>

          <div className="p-5">
            <div className="flex items-start gap-3">
              <SponsorLogo initial={sponsor.logoInitial} size="sm" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">
                  {sponsor.name} &middot; Promoted
                </p>
              </div>
            </div>

            <h3 className="mt-3 text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
              {sponsor.tagline}
            </h3>

            <motion.a
              href={sponsor.href}
              whileHover={{ x: 3 }}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary"
            >
              {sponsor.cta}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </motion.a>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  6. Sidebar Rectangle (300x250)                                            */
/* -------------------------------------------------------------------------- */

export function SidebarRectangle({ sponsor, className }: BaseAdProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn("w-[300px]", className)}
    >
      <Card className="overflow-hidden border-primary/10 shadow-sm transition-shadow hover:shadow-md">
        <CardContent className="p-0">
          {/* Visual area */}
          <div className="relative flex h-[140px] items-center justify-center bg-gradient-to-br from-brand-pink-light/50 via-white to-brand-teal-light/50">
            <SponsorLogo initial={sponsor.logoInitial} size="lg" />
            <Badge
              variant="outline"
              className="absolute right-2 top-2 border-primary/15 bg-white/80 text-[8px] uppercase tracking-widest text-muted-foreground backdrop-blur-sm"
            >
              Ad
            </Badge>
          </div>

          {/* Content area */}
          <div className="flex flex-col items-center px-4 py-4 text-center">
            <p className="text-sm font-semibold text-foreground">
              {sponsor.name}
            </p>
            <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
              {sponsor.tagline}
            </p>
            <motion.a
              href={sponsor.href}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mt-3 w-full rounded-lg bg-primary px-4 py-2 text-center text-xs font-medium text-primary-foreground shadow-sm transition-shadow hover:shadow-md"
            >
              {sponsor.cta}
            </motion.a>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  7. Sponsored Content Card                                                 */
/* -------------------------------------------------------------------------- */

export function SponsoredContentCard({ sponsor, className }: BaseAdProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn("group", className)}
    >
      <Card className="overflow-hidden border-primary/10 bg-gradient-to-br from-brand-pink-light/30 via-white to-brand-teal-light/30 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <CardContent className="p-0">
          {/* Premium gradient header */}
          <div className="h-1 bg-gradient-to-r from-primary via-brand-pink to-secondary" />

          <div className="p-6">
            <div className="flex items-start justify-between">
              <Badge
                variant="outline"
                className="border-primary/20 text-[10px] uppercase tracking-widest text-primary"
              >
                <Sparkles className="mr-1 h-3 w-3" />
                Sponsored Content
              </Badge>
              <SponsorLogo initial={sponsor.logoInitial} size="md" />
            </div>

            <h3 className="mt-4 text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary sm:text-xl">
              {sponsor.tagline}
            </h3>

            <div className="mt-3 flex items-center gap-3">
              <SponsorLogo
                initial={sponsor.logoInitial}
                size="sm"
                className="ring-0"
              />
              <div>
                <p className="text-xs font-medium text-foreground">
                  {sponsor.name}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Official Partner
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <motion.a
                href={sponsor.href}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-md shadow-primary/15 transition-shadow hover:shadow-lg hover:shadow-primary/25"
              >
                {sponsor.cta}
                <ExternalLink className="h-3.5 w-3.5" />
              </motion.a>
              <span className="text-[11px] text-muted-foreground">
                Paid partnership
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  8. Category Sponsor Badge                                                 */
/* -------------------------------------------------------------------------- */

export function CategorySponsorBadge({
  sponsor,
  categoryName = "This Section",
  className,
}: BaseAdProps & { categoryName?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className={cn("inline-flex", className)}
    >
      <motion.a
        href={sponsor.href}
        whileHover={{ y: -1 }}
        className="group inline-flex items-center gap-2 rounded-full border border-primary/10 bg-gradient-to-r from-brand-pink-light/40 to-brand-teal-light/40 px-3 py-1.5 text-xs transition-all hover:border-primary/20 hover:shadow-sm"
      >
        <span className="text-muted-foreground">{categoryName} sponsored by</span>
        <span className="flex items-center gap-1.5 font-semibold text-foreground">
          <span className="flex h-5 w-5 items-center justify-center rounded-md bg-primary/10 text-[10px] font-bold text-primary">
            {sponsor.logoInitial}
          </span>
          {sponsor.name}
        </span>
        <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
      </motion.a>
    </motion.div>
  );
}
