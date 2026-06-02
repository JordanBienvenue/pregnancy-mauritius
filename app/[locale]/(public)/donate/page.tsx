"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import {
  Gift,
  MapPin,
  Package,
  Shirt,
  Baby,
  Heart,
  Filter,
  Search,
  Plus,
  CheckCircle2,
  Sparkles,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/shared/animated-section";
import { createClient } from "@/lib/supabase/client";

type DonationCategory = "all" | "clothing" | "equipment" | "feeding" | "maternity";
type Condition = "new" | "likeNew" | "good" | "fair";

const conditionColors: Record<Condition, string> = {
  new: "bg-green-100 text-green-700 border-green-200",
  likeNew: "bg-blue-100 text-blue-700 border-blue-200",
  good: "bg-amber-100 text-amber-700 border-amber-200",
  fair: "bg-orange-100 text-orange-700 border-orange-200",
};

const conditionTKeys: Record<Condition, string> = {
  new: "new",
  likeNew: "likeNew",
  good: "good",
  fair: "fair",
};

const categoryIcons: Record<string, typeof Shirt> = {
  clothing: Shirt,
  equipment: Package,
  feeding: Baby,
  maternity: Heart,
};

interface DonationItem {
  id: string;
  item_name: string;
  description: string;
  condition: Condition;
  category: string;
  district: string;
  is_available: boolean;
  claimed_by: string | null;
  claimed_at: string | null;
  images: string[] | null;
  created_at: string;
  profiles?: { full_name: string } | null;
}

export default function DonatePage() {
  const t = useTranslations("donations");
  const locale = useLocale();
  const [activeCategory, setActiveCategory] = useState<DonationCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [donations, setDonations] = useState<DonationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [claimingId, setClaimingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("browse");

  // List form state
  const [listItemName, setListItemName] = useState("");
  const [listDescription, setListDescription] = useState("");
  const [listCategory, setListCategory] = useState<string>("");
  const [listCondition, setListCondition] = useState<Condition | "">("");
  const [listDistrict, setListDistrict] = useState("");
  const [publishing, setPublishing] = useState(false);

  const supabase = createClient();

  const fetchDonations = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("donations")
      // donations has two FKs to profiles (donor_id + claimed_by); disambiguate
      // the embed to the donor to avoid PostgREST PGRST201.
      .select("*, profiles!donor_id(full_name)")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching donations:", error);
    } else {
      setDonations((data as DonationItem[]) || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchDonations();
  }, [fetchDonations]);

  const handleClaim = async (itemId: string) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert(t("loginToRequest"));
      return;
    }

    setClaimingId(itemId);

    // Optimistic update
    setDonations((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              is_available: false,
              claimed_by: user.id,
              claimed_at: new Date().toISOString(),
            }
          : item
      )
    );

    // Only one claimer can win: the `is_available = true` filter means a
    // concurrent loser updates 0 rows. Use .select() to confirm a row was
    // actually claimed rather than assuming success on a null error.
    const { data: claimed, error } = await supabase
      .from("donations")
      .update({
        claimed_by: user.id,
        claimed_at: new Date().toISOString(),
        is_available: false,
      })
      .eq("id", itemId)
      .eq("is_available", true)
      .select("id");

    const won = !error && claimed && claimed.length > 0;

    if (won) {
      alert(t("claimSuccess"));
    } else {
      if (error) console.error("Error claiming item:", error);
      // Lost the race (or errored): revert optimism and resync from server.
      setDonations((prev) =>
        prev.map((item) =>
          item.id === itemId
            ? { ...item, is_available: true, claimed_by: null, claimed_at: null }
            : item
        )
      );
      if (!error) alert(t("alreadyClaimed"));
      await fetchDonations();
    }

    setClaimingId(null);
  };

  const handlePublish = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert(t("loginToRequest"));
      return;
    }

    if (!listItemName || !listDescription || !listCategory || !listCondition || !listDistrict) {
      return;
    }

    setPublishing(true);

    const { error } = await supabase.from("donations").insert({
      donor_id: user.id,
      item_name: listItemName,
      description: listDescription,
      condition: listCondition,
      category: listCategory,
      district: listDistrict,
    });

    if (error) {
      console.error("Error listing item:", error);
    } else {
      alert(t("listingSuccess"));
      // Reset form
      setListItemName("");
      setListDescription("");
      setListCategory("");
      setListCondition("");
      setListDistrict("");
      // Switch back to browse and refresh
      setActiveTab("browse");
      fetchDonations();
    }

    setPublishing(false);
  };

  const filteredItems = donations.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch =
      item.item_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getTimeAgo = (dateStr: string) => {
    const now = new Date();
    const date = new Date(dateStr);
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return locale === "fr" ? "Il y a quelques minutes" : locale === "cr" ? "Enn tigit minit desela" : "A few minutes ago";
    if (diffHours < 24) return locale === "fr" ? `Il y a ${diffHours}h` : locale === "cr" ? `${diffHours}h desela` : `${diffHours}h ago`;
    return locale === "fr" ? `Il y a ${diffDays} jour${diffDays > 1 ? "s" : ""}` : locale === "cr" ? `${diffDays} zour desela` : `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-pink-light/30 via-background to-background">
      {/* Hero */}
      <section className="border-b bg-white/50 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <AnimatedSection>
            <div className="text-center">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50"
              >
                <Gift className="h-8 w-8 text-orange-500" />
              </motion.div>
              <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                {t("title")}
              </h1>
              <p className="mt-2 text-muted-foreground max-w-lg mx-auto">
                {t("subtitle")}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <AnimatedSection>
            <TabsList className="mx-auto w-full sm:w-auto">
              <TabsTrigger value="browse" className="flex-1 sm:flex-initial gap-1.5">
                <Search className="h-4 w-4" />
                {t("browseItems")}
              </TabsTrigger>
              <TabsTrigger value="list" className="flex-1 sm:flex-initial gap-1.5">
                <Plus className="h-4 w-4" />
                {t("listItem")}
              </TabsTrigger>
            </TabsList>
          </AnimatedSection>

          {/* Browse Tab */}
          <TabsContent value="browse">
            {/* Filters */}
            <AnimatedSection delay={0.1} className="mt-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder={t("searchPlaceholder")}
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  {(["all", "clothing", "equipment", "feeding", "maternity"] as DonationCategory[]).map(
                    (cat) => (
                      <Button
                        key={cat}
                        variant={activeCategory === cat ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActiveCategory(cat)}
                        className={
                          activeCategory === cat
                            ? "bg-primary hover:bg-brand-pink-dark"
                            : ""
                        }
                      >
                        {cat === "all"
                          ? t("all")
                          : t(cat as "clothing" | "equipment" | "feeding" | "maternity")}
                      </Button>
                    )
                  )}
                </div>
              </div>
            </AnimatedSection>

            {/* Loading State */}
            {loading && (
              <div className="mt-12 flex flex-col items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="mt-3 text-sm text-muted-foreground">{t("loading") ?? "Loading..."}</p>
              </div>
            )}

            {/* Items Grid */}
            {!loading && filteredItems.length > 0 && (
              <StaggerContainer className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredItems.map((item) => {
                  const CatIcon = categoryIcons[item.category] || Package;
                  const isClaimed = !item.is_available;
                  const donorName = item.profiles?.full_name || "Anonymous";
                  return (
                    <StaggerItem key={item.id}>
                      <Card
                        className={`group h-full border-border/50 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 ${
                          isClaimed ? "opacity-60" : ""
                        }`}
                      >
                        <CardContent className="p-0">
                          {/* Photo, or icon placeholder when none */}
                          <div className="relative h-40 overflow-hidden bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center rounded-t-xl">
                            {item.images && item.images[0] ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={item.images[0]}
                                alt={item.item_name}
                                className="h-full w-full object-cover"
                                loading="lazy"
                              />
                            ) : (
                              <CatIcon className="h-12 w-12 text-muted-foreground/30" />
                            )}
                            <div className="absolute top-3 left-3 flex gap-2">
                              <Badge
                                variant="outline"
                                className={`text-xs ${conditionColors[item.condition] || ""}`}
                              >
                                {t(conditionTKeys[item.condition] || "good")}
                              </Badge>
                            </div>
                            {isClaimed && (
                              <div className="absolute inset-0 flex items-center justify-center bg-background/60 rounded-t-xl">
                                <Badge className="gap-1.5 bg-green-600 text-white">
                                  <CheckCircle2 className="h-3.5 w-3.5" />
                                  {t("claimed")}
                                </Badge>
                              </div>
                            )}
                          </div>

                          <div className="p-4">
                            <h3 className="font-semibold text-sm line-clamp-1">
                              {item.item_name}
                            </h3>
                            <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                              {item.description}
                            </p>

                            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                              <MapPin className="h-3.5 w-3.5 text-primary" />
                              <span>{item.district}</span>
                              <span className="text-border">|</span>
                              <span>{donorName}</span>
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground">
                              {getTimeAgo(item.created_at)}
                            </p>

                            {!isClaimed && (
                              <Button
                                className="mt-3 w-full gap-2 bg-primary hover:bg-brand-pink-dark"
                                size="sm"
                                disabled={claimingId === item.id}
                                onClick={() => handleClaim(item.id)}
                              >
                                {claimingId === item.id ? (
                                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                ) : (
                                  <Heart className="h-3.5 w-3.5" />
                                )}
                                {t("requestItem")}
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            )}

            {!loading && filteredItems.length === 0 && (
              <AnimatedSection className="mt-12 text-center">
                <Package className="mx-auto h-12 w-12 text-muted-foreground/30" />
                <p className="mt-3 text-muted-foreground">
                  {donations.length === 0 ? t("noDonations") : t("emptyState")}
                </p>
              </AnimatedSection>
            )}
          </TabsContent>

          {/* List Tab */}
          <TabsContent value="list">
            <AnimatedSection delay={0.1} className="mt-6">
              <Card className="max-w-xl mx-auto">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <Sparkles className="mx-auto h-8 w-8 text-primary" />
                    <h2 className="mt-2 text-lg font-semibold">
                      {t("shareItem")}
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {t("shareItemDesc")}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="item-name">{t("itemName")}</Label>
                      <Input
                        id="item-name"
                        placeholder={t("itemNamePlaceholder")}
                        className="mt-1.5"
                        value={listItemName}
                        onChange={(e) => setListItemName(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="item-desc">{t("itemDescription")}</Label>
                      <Textarea
                        id="item-desc"
                        placeholder={t("itemDescPlaceholder")}
                        className="mt-1.5 min-h-24"
                        value={listDescription}
                        onChange={(e) => setListDescription(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>{t("category")}</Label>
                        <div className="mt-1.5 grid grid-cols-2 gap-2">
                          {(["clothing", "equipment", "feeding", "maternity"] as const).map((cat) => (
                            <Button
                              key={cat}
                              variant={listCategory === cat ? "default" : "outline"}
                              size="sm"
                              className={`text-xs ${listCategory === cat ? "bg-primary hover:bg-brand-pink-dark" : ""}`}
                              onClick={() => setListCategory(cat)}
                            >
                              {t(cat)}
                            </Button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Label>{t("conditionLabel")}</Label>
                        <div className="mt-1.5 grid grid-cols-2 gap-2">
                          {(["new", "likeNew", "good", "fair"] as Condition[]).map((cond) => (
                            <Button
                              key={cond}
                              variant={listCondition === cond ? "default" : "outline"}
                              size="sm"
                              className={`text-xs ${listCondition === cond ? "bg-primary hover:bg-brand-pink-dark" : ""}`}
                              onClick={() => setListCondition(cond)}
                            >
                              {t(conditionTKeys[cond])}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="item-district">{t("district")}</Label>
                      <Input
                        id="item-district"
                        placeholder={t("districtPlaceholder")}
                        className="mt-1.5"
                        value={listDistrict}
                        onChange={(e) => setListDistrict(e.target.value)}
                      />
                    </div>
                    <Button
                      className="w-full gap-2 bg-primary hover:bg-brand-pink-dark mt-2"
                      onClick={handlePublish}
                      disabled={publishing || !listItemName || !listDescription || !listCategory || !listCondition || !listDistrict}
                    >
                      {publishing ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Gift className="h-4 w-4" />
                      )}
                      {t("publishItem")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
