import type { Meta, StoryObj } from "@storybook/nextjs";
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
/*  Sample sponsor data                                                       */
/* -------------------------------------------------------------------------- */

const textOnlySponsor: SponsorData = {
  name: "MauriPharma",
  tagline: "Your trusted pharmacy partner across Mauritius",
  cta: "Visit MauriPharma",
  href: "#",
  logoInitial: "M",
};

/** Uses a static PNG placeholder */
const imageSponsor: SponsorData = {
  name: "BébéPlus",
  tagline: "Premium baby products delivered to your door in Mauritius",
  cta: "Shop Now",
  href: "#",
  logoInitial: "B",
  imageSrc: "https://placehold.co/400x300/E8D5E0/D4406C?text=B%C3%A9b%C3%A9Plus&font=raleway",
  imageAlt: "BébéPlus baby products advertisement",
};

/** Uses an animated GIF */
const gifSponsor: SponsorData = {
  name: "MamaFit",
  tagline: "Prenatal yoga & fitness classes — online and in-person across Mauritius",
  cta: "Join a Class",
  href: "#",
  logoInitial: "F",
  imageSrc: "https://placehold.co/400x300/D5E8E0/2A9D8F.gif?text=MamaFit+%F0%9F%A7%98&font=raleway",
  imageAlt: "MamaFit prenatal fitness animated ad",
};

/* -------------------------------------------------------------------------- */
/*  1. Leaderboard Banner                                                     */
/* -------------------------------------------------------------------------- */

const leaderboardMeta: Meta<typeof LeaderboardBanner> = {
  title: "Ads/LeaderboardBanner",
  component: LeaderboardBanner,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    sponsor: { control: "object" },
  },
};
export default leaderboardMeta;

type LeaderboardStory = StoryObj<typeof LeaderboardBanner>;

export const Default: LeaderboardStory = {
  args: { sponsor: textOnlySponsor },
};

export const WithImage: LeaderboardStory = {
  name: "With Picture Ad",
  args: { sponsor: imageSponsor },
};

export const WithGif: LeaderboardStory = {
  name: "With GIF Ad",
  args: { sponsor: gifSponsor },
};

/* -------------------------------------------------------------------------- */
/*  All variants showcase                                                     */
/* -------------------------------------------------------------------------- */

export const AllVariantsTextOnly: StoryObj = {
  name: "All Variants — Text Only",
  parameters: { layout: "padded" },
  render: () => (
    <div className="space-y-12 max-w-4xl mx-auto">
      <Section title="Leaderboard Banner (728×90)">
        <LeaderboardBanner sponsor={textOnlySponsor} />
      </Section>
      <Section title="Sticky Top Bar">
        <StickyTopBar sponsor={textOnlySponsor} />
      </Section>
      <Section title="Native In-Feed Ad">
        <NativeInFeedAd sponsor={textOnlySponsor} />
      </Section>
      <Section title="Sidebar Rectangle (300×250)">
        <SidebarRectangle sponsor={textOnlySponsor} />
      </Section>
      <Section title="Sponsored Content Card">
        <SponsoredContentCard sponsor={textOnlySponsor} />
      </Section>
      <Section title="Category Sponsor Badge">
        <CategorySponsorBadge sponsor={textOnlySponsor} categoryName="Directory" />
      </Section>
    </div>
  ),
};

export const AllVariantsWithImage: StoryObj = {
  name: "All Variants — Picture Ads",
  parameters: { layout: "padded" },
  render: () => (
    <div className="space-y-12 max-w-4xl mx-auto">
      <Section title="Leaderboard Banner (728×90)">
        <LeaderboardBanner sponsor={imageSponsor} />
      </Section>
      <Section title="Sticky Top Bar">
        <StickyTopBar sponsor={imageSponsor} />
      </Section>
      <Section title="Native In-Feed Ad">
        <NativeInFeedAd sponsor={imageSponsor} />
      </Section>
      <Section title="Sidebar Rectangle (300×250)">
        <SidebarRectangle sponsor={imageSponsor} />
      </Section>
      <Section title="Sponsored Content Card">
        <SponsoredContentCard sponsor={imageSponsor} />
      </Section>
      <Section title="Category Sponsor Badge">
        <CategorySponsorBadge sponsor={imageSponsor} categoryName="Baby Shop" />
      </Section>
    </div>
  ),
};

export const AllVariantsWithGif: StoryObj = {
  name: "All Variants — GIF Ads",
  parameters: { layout: "padded" },
  render: () => (
    <div className="space-y-12 max-w-4xl mx-auto">
      <Section title="Leaderboard Banner (728×90)">
        <LeaderboardBanner sponsor={gifSponsor} />
      </Section>
      <Section title="Sticky Top Bar">
        <StickyTopBar sponsor={gifSponsor} />
      </Section>
      <Section title="Native In-Feed Ad">
        <NativeInFeedAd sponsor={gifSponsor} />
      </Section>
      <Section title="Sidebar Rectangle (300×250)">
        <SidebarRectangle sponsor={gifSponsor} />
      </Section>
      <Section title="Sponsored Content Card">
        <SponsoredContentCard sponsor={gifSponsor} />
      </Section>
      <Section title="Category Sponsor Badge">
        <CategorySponsorBadge sponsor={gifSponsor} categoryName="Fitness" />
      </Section>
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/*  Sticky bars & Interstitial (separate since they overlay)                  */
/* -------------------------------------------------------------------------- */

export const StickyBottom: StoryObj = {
  name: "Sticky Bottom Bar",
  parameters: { layout: "fullscreen" },
  render: () => (
    <div className="relative min-h-[400px] bg-muted/30 p-8">
      <p className="text-sm text-muted-foreground">Scroll down — sticky bar pinned to bottom.</p>
      <StickyBottomBar sponsor={imageSponsor} />
    </div>
  ),
};

export const StickyBottomGif: StoryObj = {
  name: "Sticky Bottom Bar — GIF",
  parameters: { layout: "fullscreen" },
  render: () => (
    <div className="relative min-h-[400px] bg-muted/30 p-8">
      <p className="text-sm text-muted-foreground">Sticky bottom bar with animated GIF logo.</p>
      <StickyBottomBar sponsor={gifSponsor} />
    </div>
  ),
};

export const Interstitial: StoryObj = {
  name: "Interstitial — Picture",
  parameters: { layout: "fullscreen" },
  render: () => <InterstitialAd sponsor={imageSponsor} countdownSeconds={3} />,
};

export const InterstitialGif: StoryObj = {
  name: "Interstitial — GIF",
  parameters: { layout: "fullscreen" },
  render: () => <InterstitialAd sponsor={gifSponsor} countdownSeconds={3} />,
};

/* -------------------------------------------------------------------------- */
/*  Helper                                                                    */
/* -------------------------------------------------------------------------- */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-medium text-muted-foreground">{title}</h3>
      {children}
    </div>
  );
}
