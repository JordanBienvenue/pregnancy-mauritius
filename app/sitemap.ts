import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://manmanmoris.mu";
const locales = ["en", "fr", "cr"];

const publicRoutes = [
  "",
  "/directory",
  "/emergency",
  "/food-guide",
  "/rights",
  "/blog",
  "/donate",
];

const authRoutes = [
  "/tracker",
  "/postpartum",
  "/forum",
  "/marketplace",
  "/login",
  "/register",
];

const blogSlugs = [
  "gynecologue-maurice-comment-choisir",
  "droits-maternite-maurice-2024",
  "craving-grossesse-que-manger",
  "premier-trimestre-guide-complet",
  "allaitement-conseils-maurice",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Public routes — high priority
  for (const route of publicRoutes) {
    const languages: Record<string, string> = {};
    for (const locale of locales) {
      languages[locale] = `${BASE_URL}/${locale}${route}`;
    }

    entries.push({
      url: `${BASE_URL}/cr${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? "daily" : "weekly",
      priority: route === "" ? 1.0 : 0.8,
      alternates: { languages },
    });
  }

  // Blog articles
  for (const slug of blogSlugs) {
    const languages: Record<string, string> = {};
    for (const locale of locales) {
      languages[locale] = `${BASE_URL}/${locale}/blog/${slug}`;
    }

    entries.push({
      url: `${BASE_URL}/cr/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages },
    });
  }

  // Auth/dashboard routes — lower priority
  for (const route of authRoutes) {
    const languages: Record<string, string> = {};
    for (const locale of locales) {
      languages[locale] = `${BASE_URL}/${locale}${route}`;
    }

    entries.push({
      url: `${BASE_URL}/cr${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
      alternates: { languages },
    });
  }

  // Tracker weeks (1-40)
  for (let week = 1; week <= 40; week++) {
    const languages: Record<string, string> = {};
    for (const locale of locales) {
      languages[locale] = `${BASE_URL}/${locale}/tracker/${week}`;
    }

    entries.push({
      url: `${BASE_URL}/cr/tracker/${week}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
      alternates: { languages },
    });
  }

  return entries;
}
