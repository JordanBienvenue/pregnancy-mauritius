"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  PartyPopper,
  Gift,
  Camera,
  Shirt,
  Star,
  ShoppingCart,
  Calendar,
  Heart,
  Sparkles,
  MapPin,
  Loader2,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/shared/animated-section";
import { createClient } from "@/lib/supabase/client";

type MarketCategory = "gender-reveal" | "baby-gifts" | "photography" | "maternity-wear";

const categoryMeta: Record<
  MarketCategory,
  { icon: typeof PartyPopper; color: string; bgColor: string; tKey: string }
> = {
  "gender-reveal": {
    icon: PartyPopper,
    color: "text-pink-500",
    bgColor: "bg-pink-50",
    tKey: "genderReveal",
  },
  "baby-gifts": {
    icon: Gift,
    color: "text-teal-600",
    bgColor: "bg-teal-50",
    tKey: "babyGifts",
  },
  photography: {
    icon: Camera,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    tKey: "photography",
  },
  "maternity-wear": {
    icon: Shirt,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    tKey: "maternityWear",
  },
};

const categoryGradients: Record<string, string> = {
  "gender-reveal": "from-pink-100 to-blue-100",
  "baby-gifts": "from-amber-100 to-orange-100",
  photography: "from-violet-100 to-purple-100",
  "maternity-wear": "from-blue-100 to-indigo-100",
};

interface MarketplaceItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string | null;
  seller_name: string;
  is_available: boolean;
  created_at: string;
}

function mapCategoryToTab(category: string): MarketCategory {
  const normalized = category.toLowerCase().replace(/[\s_]+/g, "-");
  if (normalized.includes("gender") || normalized.includes("reveal")) return "gender-reveal";
  if (normalized.includes("gift") || normalized.includes("baby-gift")) return "baby-gifts";
  if (normalized.includes("photo")) return "photography";
  if (normalized.includes("maternity") || normalized.includes("wear")) return "maternity-wear";
  return "baby-gifts"; // default fallback
}

function isBookableCategory(category: string): boolean {
  const normalized = category.toLowerCase();
  return normalized.includes("photo") || normalized.includes("service");
}

export default function MarketplacePage() {
  const t = useTranslations("marketplace");
  const locale = useLocale();
  const [items, setItems] = useState<MarketplaceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookingId, setBookingId] = useState<string | null>(null);

  const supabase = createClient();

  const fetchItems = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("marketplace_items")
      .select("*")
      .eq("is_available", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching marketplace items:", error);
    } else {
      setItems((data as MarketplaceItem[]) || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleBookOrBuy = async (item: MarketplaceItem) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert(t("loginToBook"));
      return;
    }

    const isBookable = isBookableCategory(item.category);
    const confirmMsg = isBookable
      ? `Book "${item.name}" for Rs ${item.price.toLocaleString()}?`
      : `Purchase "${item.name}" for Rs ${item.price.toLocaleString()}?`;

    if (!window.confirm(confirmMsg)) return;

    setBookingId(item.id);

    const { error } = await supabase.from("bookings").insert({
      user_id: user.id,
      service_type: item.category,
      notes: item.name,
      status: "pending",
    });

    if (error) {
      console.error("Error creating booking:", error);
    } else {
      alert(t("bookingSuccess"));
    }

    setBookingId(null);
  };

  // Group items by tab category
  const groupedItems: Record<MarketCategory, MarketplaceItem[]> = {
    "gender-reveal": [],
    "baby-gifts": [],
    photography: [],
    "maternity-wear": [],
  };

  items.forEach((item) => {
    const tab = mapCategoryToTab(item.category);
    groupedItems[tab].push(item);
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-pink-light/30 via-background to-background">
      {/* Hero */}
      <section className="border-b bg-white/50 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <AnimatedSection>
            <div className="text-center">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50"
              >
                <ShoppingBag className="h-8 w-8 text-indigo-500" />
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
        {/* Loading State */}
        {loading && (
          <div className="mt-12 flex flex-col items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-3 text-sm text-muted-foreground">Loading...</p>
          </div>
        )}

        {!loading && (
          <Tabs defaultValue="gender-reveal">
            <AnimatedSection>
              <TabsList className="mx-auto w-full overflow-x-auto flex-nowrap sm:w-auto">
                {(Object.keys(categoryMeta) as MarketCategory[]).map((cat) => {
                  const meta = categoryMeta[cat];
                  const Icon = meta.icon;
                  return (
                    <TabsTrigger
                      key={cat}
                      value={cat}
                      className="gap-1.5 whitespace-nowrap flex-shrink-0"
                    >
                      <Icon className="h-4 w-4" />
                      <span className="hidden sm:inline">
                        {t(meta.tKey as "genderReveal" | "babyGifts" | "photography" | "maternityWear")}
                      </span>
                      <span className="sm:hidden text-xs">
                        {t(meta.tKey as "genderReveal" | "babyGifts" | "photography" | "maternityWear")}
                      </span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </AnimatedSection>

            {(Object.keys(categoryMeta) as MarketCategory[]).map((cat) => (
              <TabsContent key={cat} value={cat}>
                {groupedItems[cat].length === 0 ? (
                  <AnimatedSection className="mt-12 text-center">
                    <Package className="mx-auto h-12 w-12 text-muted-foreground/30" />
                    <p className="mt-3 text-muted-foreground">{t("noItems")}</p>
                  </AnimatedSection>
                ) : (
                  <StaggerContainer className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {groupedItems[cat].map((item) => {
                      const gradient = categoryGradients[cat] || "from-gray-100 to-gray-200";
                      const isBookable = isBookableCategory(item.category);
                      return (
                        <StaggerItem key={item.id}>
                          <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
                            <Card className="group h-full border-border/50 overflow-hidden transition-all duration-300 hover:shadow-lg">
                              <CardContent className="p-0">
                                {/* Image placeholder */}
                                <div
                                  className={`relative h-44 bg-gradient-to-br ${gradient} flex items-center justify-center`}
                                >
                                  {(() => {
                                    const Icon = categoryMeta[cat].icon;
                                    return (
                                      <Icon className="h-16 w-16 text-foreground/10" />
                                    );
                                  })()}
                                </div>

                                <div className="p-4">
                                  <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-primary transition-colors">
                                    {item.name}
                                  </h3>
                                  <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                                    {item.description}
                                  </p>

                                  {/* Seller */}
                                  <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                                    <MapPin className="h-3 w-3" />
                                    <span>{item.seller_name}</span>
                                  </div>

                                  {/* Price + CTA */}
                                  <div className="mt-4 flex items-center justify-between">
                                    <div>
                                      <span className="text-lg font-bold text-primary">
                                        Rs {item.price.toLocaleString()}
                                      </span>
                                    </div>
                                    <Button
                                      size="sm"
                                      className="gap-1.5 bg-primary hover:bg-brand-pink-dark"
                                      disabled={bookingId === item.id}
                                      onClick={() => handleBookOrBuy(item)}
                                    >
                                      {bookingId === item.id ? (
                                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                      ) : isBookable ? (
                                        <>
                                          <Calendar className="h-3.5 w-3.5" />
                                          {t("bookNow")}
                                        </>
                                      ) : (
                                        <>
                                          <ShoppingCart className="h-3.5 w-3.5" />
                                          {t("addToCart")}
                                        </>
                                      )}
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        </StaggerItem>
                      );
                    })}
                  </StaggerContainer>
                )}
              </TabsContent>
            ))}
          </Tabs>
        )}

        {/* Trust Badges */}
        {!loading && (
          <AnimatedSection delay={0.4} className="mt-12">
            <Card className="border-teal-200 bg-teal-50/50">
              <CardContent className="flex flex-col sm:flex-row items-center gap-4 p-5 text-center sm:text-left">
                <div className="flex gap-6">
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100">
                      <ShoppingBag className="h-5 w-5 text-teal-600" />
                    </div>
                    <span className="text-xs font-medium text-teal-800">
                      {t("verifiedSeller")}
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100">
                      <Heart className="h-5 w-5 text-teal-600" />
                    </div>
                    <span className="text-xs font-medium text-teal-800">
                      {t("localOnly")}
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100">
                      <Star className="h-5 w-5 text-teal-600" />
                    </div>
                    <span className="text-xs font-medium text-teal-800">
                      {t("realReviews")}
                    </span>
                  </div>
                </div>
                <p className="flex-1 text-sm text-teal-700">
                  {t("trustMessage")}
                </p>
              </CardContent>
            </Card>
          </AnimatedSection>
        )}
      </div>
    </div>
  );
}
