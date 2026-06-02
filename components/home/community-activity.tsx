"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import {
  MessageCircle,
  HeartHandshake,
  Stethoscope,
  Shield,
  ArrowRight,
  Clock,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

interface RecentPost {
  id: string;
  title: string;
  category: string;
  reply_count: number | null;
}
interface RecentDonation {
  id: string;
  item_name: string;
  category: string | null;
  district: string | null;
}
interface FeaturedProvider {
  id: string;
  name: string;
  type: string | null;
  district: string | null;
}

/**
 * Live homepage island: surfaces real platform activity — recent forum
 * discussions (realtime), items available to donate, and verified providers —
 * so the landing page reflects what's actually happening on the platform.
 */
export function CommunityActivity() {
  const t = useTranslations("home");
  const locale = useLocale();
  const [posts, setPosts] = useState<RecentPost[]>([]);
  const [donations, setDonations] = useState<RecentDonation[]>([]);
  const [providers, setProviders] = useState<FeaturedProvider[]>([]);

  const fetchPosts = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("forum_posts")
      .select("id, title, category, reply_count")
      .order("created_at", { ascending: false })
      .limit(4);
    if (data) setPosts(data as RecentPost[]);
  }, []);

  useEffect(() => {
    const supabase = createClient();
    fetchPosts();
    supabase
      .from("donations")
      .select("id, item_name, category, district")
      .eq("is_available", true)
      .order("created_at", { ascending: false })
      .limit(4)
      .then(({ data }) => data && setDonations(data as RecentDonation[]));
    supabase
      .from("providers")
      .select("id, name, type, district")
      .eq("is_verified", true)
      .limit(4)
      .then(({ data }) => data && setProviders(data as FeaturedProvider[]));

    // Recent discussions update live as new posts arrive.
    const channel = supabase
      .channel("home-recent-posts")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "forum_posts" },
        () => fetchPosts()
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchPosts]);

  const fmt = (s: string | null) =>
    s ? s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : "";

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {t("liveTitle")}
        </h2>
        <p className="mt-2 text-muted-foreground">{t("liveSubtitle")}</p>

        {/* Solo-mother initiative call-out */}
        <Link href={`/${locale}/forum/solo-mothers`} className="mt-6 block">
          <Card className="border-teal-200 bg-teal-50/60 transition-colors hover:border-teal-300">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-teal-100">
                <Shield className="h-6 w-6 text-teal-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{t("soloTitle")}</h3>
                <p className="text-sm text-muted-foreground">{t("soloDesc")}</p>
              </div>
              <ArrowRight className="h-5 w-5 text-teal-600 shrink-0" />
            </CardContent>
          </Card>
        </Link>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {/* Recent discussions */}
          <Card className="border-border/50">
            <CardContent className="p-5">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">{t("recentDiscussions")}</h3>
                </div>
                <Link
                  href={`/${locale}/forum`}
                  className="text-xs text-primary hover:underline"
                >
                  {t("seeAll")}
                </Link>
              </div>
              <ul className="space-y-3" data-testid="home-recent-discussions">
                {posts.length === 0 && (
                  <li className="text-sm text-muted-foreground">
                    {t("nothingYet")}
                  </li>
                )}
                {posts.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/${locale}/forum/${p.category}/${p.id}`}
                      className="group block"
                    >
                      <span className="line-clamp-1 text-sm font-medium group-hover:text-primary">
                        {p.title}
                      </span>
                      <span className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {p.reply_count ?? 0} {t("repliesShort")}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Available to donate */}
          <Card className="border-border/50">
            <CardContent className="p-5">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HeartHandshake className="h-5 w-5 text-rose-500" />
                  <h3 className="font-semibold">{t("availableDonations")}</h3>
                </div>
                <Link
                  href={`/${locale}/donate`}
                  className="text-xs text-primary hover:underline"
                >
                  {t("seeAll")}
                </Link>
              </div>
              <ul className="space-y-3">
                {donations.length === 0 && (
                  <li className="text-sm text-muted-foreground">
                    {t("nothingYet")}
                  </li>
                )}
                {donations.map((d) => (
                  <li key={d.id} className="text-sm">
                    <span className="line-clamp-1 font-medium">
                      {d.item_name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {fmt(d.category)}
                      {d.district ? ` · ${fmt(d.district)}` : ""}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Verified providers */}
          <Card className="border-border/50">
            <CardContent className="p-5">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Stethoscope className="h-5 w-5 text-blue-500" />
                  <h3 className="font-semibold">{t("featuredProviders")}</h3>
                </div>
                <Link
                  href={`/${locale}/directory`}
                  className="text-xs text-primary hover:underline"
                >
                  {t("seeAll")}
                </Link>
              </div>
              <ul className="space-y-3">
                {providers.length === 0 && (
                  <li className="text-sm text-muted-foreground">
                    {t("nothingYet")}
                  </li>
                )}
                {providers.map((p) => (
                  <li key={p.id} className="text-sm">
                    <span className="line-clamp-1 font-medium">{p.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {fmt(p.type)}
                      {p.district ? ` · ${fmt(p.district)}` : ""}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={`/${locale}/forum`}>
            <Button className="gap-2 bg-primary hover:bg-brand-pink-dark">
              <MessageCircle className="h-4 w-4" />
              {t("joinForum")}
            </Button>
          </Link>
          <Link href={`/${locale}/emergency`}>
            <Button variant="outline" className="gap-2">
              {t("emergencyShortcut")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
