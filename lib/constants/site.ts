export const SITE = {
  name: "Manman Moris",
  legalName: "Manman Moris Ltd",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://manmanmoris.mu",
  description: {
    en: "Pregnancy & postpartum support platform for Mauritius",
    fr: "Plateforme de soutien grossesse et post-partum pour Maurice",
    cr: "Platform sipor grosses ek post-partum pou Moris",
  } as Record<string, string>,
  tagline: {
    en: "Your pregnancy companion in Mauritius",
    fr: "Votre compagnon de grossesse a Maurice",
    cr: "To konpanion grosses dan Moris",
  } as Record<string, string>,
  email: "hello@manmanmoris.mu",
  socials: {
    instagram: "https://instagram.com/manmanmoris",
    facebook: "https://facebook.com/manmanmoris",
  },
  address: {
    streetAddress: "Port Louis",
    addressLocality: "Port Louis",
    addressRegion: "Port Louis",
    postalCode: "",
    addressCountry: "MU",
  },
  geo: { latitude: -20.1609, longitude: 57.5012 },
  locales: ["en", "fr", "cr"] as const,
  defaultLocale: "cr" as const,
  foundingDate: "2026",
  ogImage: "/og-image.png",
  keywords: {
    en: ["pregnancy Mauritius", "postpartum support", "maternity care Mauritius", "prenatal care", "gynaecologist Mauritius"],
    fr: ["grossesse Maurice", "post-partum", "soins maternite Maurice", "gynecologue Maurice", "sage-femme"],
    cr: ["grosses Moris", "post-partum", "swin maternite", "gyneko Moris"],
  } as Record<string, string[]>,
} as const;

export type Locale = (typeof SITE.locales)[number];
