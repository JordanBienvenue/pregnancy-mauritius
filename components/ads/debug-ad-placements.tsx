"use client";

import { Suspense } from "react";
import { useDebugAds } from "@/hooks/use-debug-ads";
import {
  LeaderboardBanner,
  StickyTopBar,
  StickyBottomBar,
  NativeInFeedAd,
  SidebarRectangle,
  SponsoredContentCard,
  CategorySponsorBadge,
  type SponsorData,
} from "./ad-variants";

/* -------------------------------------------------------------------------- */
/*  Dummy sponsor data                                                        */
/* -------------------------------------------------------------------------- */

const dummySponsors: Record<string, SponsorData> = {
  pharmacy: {
    name: "CityPharm",
    tagline: "Your trusted pregnancy pharmacy — prenatal vitamins, supplements & more",
    cta: "Shop Now",
    href: "#",
    logoInitial: "C",
    imageSrc: "https://placehold.co/400x300/E8D5E0/D4406C?text=CityPharm&font=raleway",
    imageAlt: "CityPharm pharmacy ad",
  },
  clinic: {
    name: "Apollo Bramwell",
    tagline: "World-class maternity care in Mauritius — book your consultation today",
    cta: "Book Appointment",
    href: "#",
    logoInitial: "A",
    imageSrc: "https://placehold.co/400x300/D5E8E0/2A9D8F?text=Apollo+Bramwell&font=raleway",
    imageAlt: "Apollo Bramwell Hospital ad",
  },
  babyShop: {
    name: "Babyland",
    tagline: "Everything for your little one — strollers, cribs, clothes & toys",
    cta: "Browse Collection",
    href: "#",
    logoInitial: "B",
    imageSrc: "https://placehold.co/400x300/FDE8D0/E67E22?text=Babyland&font=raleway",
    imageAlt: "Babyland baby products ad",
  },
  insurance: {
    name: "Swan Insurance",
    tagline: "Maternity cover that gives you peace of mind — plans from Rs 500/month",
    cta: "Get a Quote",
    href: "#",
    logoInitial: "S",
    imageSrc: "https://placehold.co/400x300/D0D5FD/4F46E5?text=Swan+Insurance&font=raleway",
    imageAlt: "Swan Insurance maternity plan ad",
  },
  fitness: {
    name: "MamaFit MU",
    tagline: "Prenatal yoga & postnatal fitness classes across Mauritius",
    cta: "Join a Class",
    href: "#",
    logoInitial: "F",
    imageSrc: "https://placehold.co/400x300/D5E8E0/2A9D8F.gif?text=MamaFit+%F0%9F%A7%98&font=raleway",
    imageAlt: "MamaFit prenatal fitness animated ad",
  },
  nutrition: {
    name: "NutriBaby",
    tagline: "Organic prenatal supplements made for Mauritian mamas",
    cta: "Learn More",
    href: "#",
    logoInitial: "N",
    imageSrc: "https://placehold.co/400x300/D0FDE0/16A34A?text=NutriBaby&font=raleway",
    imageAlt: "NutriBaby supplements ad",
  },
};

/* -------------------------------------------------------------------------- */
/*  Debug wrapper — renders nothing unless ?console_debug=1                   */
/* -------------------------------------------------------------------------- */

function DebugAdInner({
  placement,
  sponsor = "pharmacy",
  className,
  categoryName,
}: {
  placement:
    | "leaderboard"
    | "sticky-top"
    | "sticky-bottom"
    | "native-feed"
    | "sidebar-rectangle"
    | "sponsored-card"
    | "category-badge";
  sponsor?: keyof typeof dummySponsors;
  className?: string;
  categoryName?: string;
}) {
  const showAds = useDebugAds();
  if (!showAds) return null;

  const data = dummySponsors[sponsor];

  const adComponent = (() => {
    switch (placement) {
      case "leaderboard":
        return <LeaderboardBanner sponsor={data} className={className} />;
      case "sticky-top":
        return <StickyTopBar sponsor={data} className={className} />;
      case "sticky-bottom":
        return <StickyBottomBar sponsor={data} className={className} />;
      case "native-feed":
        return <NativeInFeedAd sponsor={data} className={className} />;
      case "sidebar-rectangle":
        return <SidebarRectangle sponsor={data} className={className} />;
      case "sponsored-card":
        return <SponsoredContentCard sponsor={data} className={className} />;
      case "category-badge":
        return (
          <CategorySponsorBadge
            sponsor={data}
            categoryName={categoryName}
            className={className}
          />
        );
    }
  })();

  return (
    <div className="relative">
      <div className="absolute -top-2 left-2 z-10 rounded bg-red-500 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
        Debug Ad — {placement}
      </div>
      <div className="rounded-lg border-2 border-dashed border-red-300/60 p-1">
        {adComponent}
      </div>
    </div>
  );
}

/**
 * Conditionally renders an ad placement only when `?console_debug=1` is present.
 * Wrapped in Suspense because useSearchParams requires it.
 */
export function DebugAd(props: {
  placement:
    | "leaderboard"
    | "sticky-top"
    | "sticky-bottom"
    | "native-feed"
    | "sidebar-rectangle"
    | "sponsored-card"
    | "category-badge";
  sponsor?: keyof typeof dummySponsors;
  className?: string;
  categoryName?: string;
}) {
  return (
    <Suspense fallback={null}>
      <DebugAdInner {...props} />
    </Suspense>
  );
}
