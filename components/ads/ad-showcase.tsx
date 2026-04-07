"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, Monitor, Smartphone, Megaphone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  LeaderboardBanner,
  StickyTopBar,
  StickyBottomBar,
  InterstitialAd,
  NativeInFeedAd,
  SidebarRectangle,
  SponsoredContentCard,
  CategorySponsorBadge,
  type SponsorData,
} from "@/components/ads/ad-variants";

/* -------------------------------------------------------------------------- */
/*  Dummy sponsor data                                                        */
/* -------------------------------------------------------------------------- */

const sponsors: Record<string, SponsorData> = {
  citypharm: {
    name: "CityPharm",
    tagline:
      "Prenatal vitamins, baby care, and pregnancy essentials — free delivery over Rs 500",
    cta: "Shop essentials",
    href: "#",
    logoInitial: "C",
  },
  apollo: {
    name: "Apollo Bramwell",
    tagline:
      "State-of-the-art maternity ward with 24/7 NICU. Book your maternity package today.",
    cta: "View packages",
    href: "#",
    logoInitial: "A",
  },
  babyland: {
    name: "Babyland",
    tagline:
      "Everything for baby — from newborn essentials to toddler gear. 10% off for members.",
    cta: "Browse collection",
    href: "#",
    logoInitial: "B",
  },
  swan: {
    name: "Swan Insurance",
    tagline:
      "Maternity insurance cover starting from Rs 2,500/month. Protect your family.",
    cta: "Get a free quote",
    href: "#",
    logoInitial: "S",
  },
};

/* -------------------------------------------------------------------------- */
/*  Section wrapper for showcase                                              */
/* -------------------------------------------------------------------------- */

function ShowcaseSection({
  title,
  description,
  format,
  pricing,
  children,
  isFullWidth,
}: {
  title: string;
  description: string;
  format: string;
  pricing: string;
  children: React.ReactNode;
  isFullWidth?: boolean;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm sm:p-8"
    >
      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground">{title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Badge
            variant="outline"
            className="border-secondary/30 text-[10px] uppercase tracking-widest text-secondary"
          >
            {format}
          </Badge>
          <Badge className="bg-primary/10 text-[10px] font-semibold text-primary">
            {pricing}
          </Badge>
        </div>
      </div>

      {/* Preview */}
      <div
        className={`relative rounded-xl border border-dashed border-muted-foreground/20 bg-muted/20 p-6 ${
          isFullWidth ? "" : "flex items-center justify-center"
        }`}
      >
        <div className="absolute left-3 top-3">
          <span className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-widest text-muted-foreground/50">
            <Eye className="h-3 w-3" />
            Preview
          </span>
        </div>
        <div className={`${isFullWidth ? "mt-4" : "mt-6"} w-full`}>
          {children}
        </div>
      </div>
    </motion.section>
  );
}

/* -------------------------------------------------------------------------- */
/*  AdShowcase component                                                      */
/* -------------------------------------------------------------------------- */

export function AdShowcase() {
  const [showInterstitial, setShowInterstitial] = useState(false);

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-10 sm:px-6">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10"
        >
          <Megaphone className="h-8 w-8 text-primary" />
        </motion.div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Ad Placement Demo
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
          Premium advertising placements for sponsors on Manman Moris. Each
          format is designed to deliver engagement while respecting the user
          experience.
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <Badge variant="outline" className="gap-1 text-xs">
            <Monitor className="h-3 w-3" />
            Desktop optimized
          </Badge>
          <Badge variant="outline" className="gap-1 text-xs">
            <Smartphone className="h-3 w-3" />
            Mobile responsive
          </Badge>
        </div>
      </motion.div>

      {/* 1. Leaderboard Banner */}
      <ShowcaseSection
        title="1. Leaderboard Banner"
        description="Horizontal banner for top or bottom of content. High visibility, classic format."
        format="728 x 90"
        pricing="Rs 8,000/mo"
        isFullWidth
      >
        <LeaderboardBanner sponsor={sponsors.citypharm} />
      </ShowcaseSection>

      {/* 2. Sticky Top Bar */}
      <ShowcaseSection
        title="2. Sticky Top Bar"
        description="Slim persistent banner at the very top of the page. Dismissible by the user."
        format="Full Width"
        pricing="Rs 12,000/mo"
        isFullWidth
      >
        <div className="relative overflow-hidden rounded-lg">
          <StickyTopBar
            sponsor={sponsors.apollo}
            className="!relative !z-auto"
          />
        </div>
      </ShowcaseSection>

      {/* 3. Sticky Bottom Bar */}
      <ShowcaseSection
        title="3. Sticky Bottom Bar"
        description="Mobile-first bottom bar ad. Persistent until dismissed. Maximum mobile engagement."
        format="Full Width"
        pricing="Rs 10,000/mo"
        isFullWidth
      >
        <div className="relative overflow-hidden rounded-lg">
          <StickyBottomBar
            sponsor={sponsors.babyland}
            className="!relative !z-auto !shadow-none"
          />
        </div>
      </ShowcaseSection>

      {/* 4. Interstitial */}
      <ShowcaseSection
        title="4. Interstitial / Full Page Takeover"
        description='Full-screen ad with countdown timer. Ideal for "Branding Day" sponsorships.'
        format="Full Screen"
        pricing="Rs 20,000/day"
      >
        <div className="flex flex-col items-center gap-4">
          <p className="text-sm text-muted-foreground">
            Click below to preview the full-screen interstitial ad.
          </p>
          <motion.button
            onClick={() => setShowInterstitial(true)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20"
          >
            <Eye className="h-4 w-4" />
            Launch Interstitial Preview
          </motion.button>
        </div>
        {showInterstitial && (
          <InterstitialAd
            sponsor={sponsors.swan}
            onClose={() => setShowInterstitial(false)}
            countdownSeconds={3}
          />
        )}
      </ShowcaseSection>

      {/* 5. Native In-Feed */}
      <ShowcaseSection
        title="5. Native In-Feed Ad"
        description="Ad card that blends with content listings. Looks like editorial content for higher engagement."
        format="Content Card"
        pricing="Rs 6,000/mo"
      >
        <div className="mx-auto max-w-sm">
          <NativeInFeedAd sponsor={sponsors.citypharm} />
        </div>
      </ShowcaseSection>

      {/* 6. Sidebar Rectangle */}
      <ShowcaseSection
        title="6. Sidebar Rectangle"
        description="Classic medium rectangle for sidebars. Always visible during scroll."
        format="300 x 250"
        pricing="Rs 6,000/mo"
      >
        <SidebarRectangle sponsor={sponsors.apollo} />
      </ShowcaseSection>

      {/* 7. Sponsored Content Card */}
      <ShowcaseSection
        title="7. Sponsored Content Card"
        description="Premium card for featured sponsor articles and promotions. Top-tier engagement."
        format="Premium Card"
        pricing="Rs 15,000/mo"
      >
        <div className="mx-auto max-w-lg">
          <SponsoredContentCard sponsor={sponsors.babyland} />
        </div>
      </ShowcaseSection>

      {/* 8. Category Sponsor Badge */}
      <ShowcaseSection
        title="8. Category Sponsor Badge"
        description='Small "Sponsored by [Brand]" badge for section-level sponsorships. Subtle but persistent.'
        format="Inline Badge"
        pricing="Rs 8,000/mo"
      >
        <div className="flex flex-col items-center gap-4">
          <CategorySponsorBadge
            sponsor={sponsors.swan}
            categoryName="Healthcare"
          />
          <CategorySponsorBadge
            sponsor={sponsors.citypharm}
            categoryName="Nutrition"
          />
          <CategorySponsorBadge
            sponsor={sponsors.apollo}
            categoryName="Clinics"
          />
        </div>
      </ShowcaseSection>

      {/* Footer note */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="rounded-xl border border-dashed border-primary/20 bg-brand-pink-light/20 p-6 text-center"
      >
        <p className="text-sm font-medium text-foreground">
          Interested in advertising on Manman Moris?
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Contact us at{" "}
          <span className="font-medium text-primary">ads@manmanmoris.mu</span>{" "}
          for custom packages and multi-format bundles.
        </p>
      </motion.div>
    </div>
  );
}
