import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

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
  "/forgot-password",
];

const authRoutes = [
  "/tracker",
  "/postpartum",
  "/forum",
  "/marketplace",
  "/login",
  "/register",
];

const forumCategories = [
  "/forum/pregnancy",
  "/forum/postpartum",
  "/forum/solo-mothers",
  "/forum/general",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  // Fetch published blog posts from the database
  const supabase = await createClient();
  const { data: blogPosts } = await supabase
    .from("blog_posts")
    .select("slug, published_at")
    .eq("is_published", true);

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

  // Blog articles (dynamic from database)
  if (blogPosts) {
    for (const post of blogPosts) {
      const languages: Record<string, string> = {};
      for (const locale of locales) {
        languages[locale] = `${BASE_URL}/${locale}/blog/${post.slug}`;
      }

      entries.push({
        url: `${BASE_URL}/cr/blog/${post.slug}`,
        lastModified: post.published_at
          ? new Date(post.published_at)
          : new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: { languages },
      });
    }
  }

  // Forum category pages
  for (const route of forumCategories) {
    const languages: Record<string, string> = {};
    for (const locale of locales) {
      languages[locale] = `${BASE_URL}/${locale}${route}`;
    }

    entries.push({
      url: `${BASE_URL}/cr${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
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
