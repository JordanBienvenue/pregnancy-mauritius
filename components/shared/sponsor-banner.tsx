"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

type Sponsor = {
  name: string;
  tagline: string;
  category: string;
  cta: string;
  href: string;
  package: "basic" | "standard" | "premium" | "exclusive";
};

const sponsors: Record<string, Sponsor[]> = {
  pharmacy: [
    {
      name: "CityPharm",
      tagline: "Prenatal vitamins, baby care, and pregnancy essentials — free delivery over Rs 500",
      category: "Official Pharmacy Partner",
      cta: "Shop pregnancy essentials",
      href: "#",
      package: "exclusive",
    },
  ],
  clinic: [
    {
      name: "Apollo Bramwell Hospital",
      tagline: "State-of-the-art maternity ward with 24/7 NICU. Book your maternity package today.",
      category: "Featured Clinic",
      cta: "View maternity packages",
      href: "#",
      package: "premium",
    },
  ],
  baby_shop: [
    {
      name: "Babyland",
      tagline: "Everything for baby — from newborn essentials to toddler gear. 10% off for Manman Moris members.",
      category: "Featured Baby Shop",
      cta: "Browse collection",
      href: "#",
      package: "standard",
    },
  ],
  insurance: [
    {
      name: "Swan Insurance",
      tagline: "Maternity insurance cover starting from Rs 2,500/month. Protect your family's future.",
      category: "Insurance Partner",
      cta: "Get a free quote",
      href: "#",
      package: "standard",
    },
  ],
  general: [
    {
      name: "CityPharm",
      tagline: "Your trusted pharmacy for pregnancy and baby care needs across Mauritius",
      category: "Official Partner",
      cta: "Visit CityPharm",
      href: "#",
      package: "exclusive",
    },
  ],
};

const packageStyles = {
  exclusive: "border-primary/30 bg-gradient-to-r from-brand-pink-light/50 to-brand-teal-light/50",
  premium: "border-secondary/30 bg-gradient-to-r from-brand-teal-light/30 to-background",
  standard: "border-border bg-muted/30",
  basic: "border-border bg-background",
};

type SponsorBannerProps = {
  category?: keyof typeof sponsors;
  variant?: "inline" | "card" | "minimal";
  className?: string;
};

export function SponsorBanner({
  category = "general",
  variant = "card",
  className = "",
}: SponsorBannerProps) {
  const sponsorList = sponsors[category] || sponsors.general;
  const sponsor = sponsorList[0];
  if (!sponsor) return null;

  if (variant === "minimal") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className={`flex items-center justify-between rounded-lg border px-4 py-3 ${packageStyles[sponsor.package]} ${className}`}
      >
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-[10px] uppercase tracking-wider text-muted-foreground shrink-0">
            Ad
          </Badge>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{sponsor.name}</span>
            {" — "}
            {sponsor.tagline}
          </p>
        </div>
        <a
          href={sponsor.href}
          className="ml-4 shrink-0 text-xs font-medium text-primary hover:underline flex items-center gap-1"
        >
          {sponsor.cta}
          <ExternalLink className="h-3 w-3" />
        </a>
      </motion.div>
    );
  }

  if (variant === "inline") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className={`rounded-xl border p-4 ${packageStyles[sponsor.package]} ${className}`}
      >
        <div className="flex items-start justify-between">
          <Badge variant="outline" className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Sponsored
          </Badge>
        </div>
        <p className="mt-2 text-sm font-medium">{sponsor.name}</p>
        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{sponsor.tagline}</p>
        <a
          href={sponsor.href}
          className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
        >
          {sponsor.cta}
          <ExternalLink className="h-3 w-3" />
        </a>
      </motion.div>
    );
  }

  // Card variant (default)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <Card className={`overflow-hidden ${packageStyles[sponsor.package]}`}>
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <Badge variant="outline" className="text-[10px] uppercase tracking-wider text-muted-foreground mb-3">
                {sponsor.category}
              </Badge>
              <h3 className="text-lg font-semibold">{sponsor.name}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                {sponsor.tagline}
              </p>
            </div>
            <div className="ml-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-background text-xl font-bold text-primary border">
              {sponsor.name.charAt(0)}
            </div>
          </div>
          <a
            href={sponsor.href}
            className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {sponsor.cta}
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </CardContent>
      </Card>
    </motion.div>
  );
}

/** Multi-sponsor strip for sidebars or bottom of pages */
export function SponsorStrip({ className = "" }: { className?: string }) {
  const allSponsors = [
    { name: "CityPharm", category: "Pharmacy", href: "#" },
    { name: "Apollo Bramwell", category: "Hospital", href: "#" },
    { name: "Babyland", category: "Baby Shop", href: "#" },
    { name: "Swan Insurance", category: "Insurance", href: "#" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className={`rounded-xl border bg-muted/20 p-4 ${className}`}
    >
      <p className="mb-3 text-center text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
        Our Partners
      </p>
      <div className="flex flex-wrap items-center justify-center gap-6">
        {allSponsors.map((s) => (
          <a
            key={s.name}
            href={s.href}
            className="group flex flex-col items-center gap-1"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border bg-background text-sm font-bold text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              {s.name.charAt(0)}
            </div>
            <span className="text-[10px] text-muted-foreground">{s.name}</span>
          </a>
        ))}
      </div>
    </motion.div>
  );
}
