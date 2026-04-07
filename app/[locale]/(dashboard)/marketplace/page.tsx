"use client";

import { useState } from "react";
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

const marketplaceItems: Record<
  MarketCategory,
  Array<{
    id: string;
    name: string;
    description: string;
    price: number;
    priceLabel?: string;
    seller: string;
    sellerLocation: string;
    rating: number;
    reviews: number;
    isBookable: boolean;
    isPopular: boolean;
    gradient: string;
  }>
> = {
  "gender-reveal": [
    {
      id: "gr1",
      name: "Gender Reveal Balloon Box",
      description: "Gro bwat nwar ar bann ballon ble ou rose andan. Inklir konfeti ek enn banner 'Boy or Girl?'",
      price: 1200,
      seller: "PartyBox MU",
      sellerLocation: "Port Louis",
      rating: 4.8,
      reviews: 24,
      isBookable: false,
      isPopular: true,
      gradient: "from-pink-100 to-blue-100",
    },
    {
      id: "gr2",
      name: "Smoke Cannon Gender Reveal",
      description: "2 canons a fumee (ble ou rose). Parfait pou photoshoot gender reveal. Livrezon dan tou Maurice.",
      price: 800,
      seller: "CelebrateMU",
      sellerLocation: "Curepipe",
      rating: 4.6,
      reviews: 18,
      isBookable: false,
      isPopular: false,
      gradient: "from-purple-100 to-pink-100",
    },
  ],
  "baby-gifts": [
    {
      id: "bg1",
      name: "Coffret Cadeau Naissance Premium",
      description: "Coffret luxury: body en coton bio, doudou, chaussettes, bonnet, ek enn ti kart personalize.",
      price: 2500,
      seller: "BabyLux MU",
      sellerLocation: "Ebene",
      rating: 4.9,
      reviews: 42,
      isBookable: false,
      isPopular: true,
      gradient: "from-amber-100 to-orange-100",
    },
    {
      id: "bg2",
      name: "Personalised Baby Blanket",
      description: "Couverture baba personnalize ar nom baba brode. 100% coton, plizir kouleur disponib.",
      price: 1500,
      seller: "StitchCraft MU",
      sellerLocation: "Quatre Bornes",
      rating: 4.7,
      reviews: 31,
      isBookable: false,
      isPopular: false,
      gradient: "from-teal-100 to-green-100",
    },
    {
      id: "bg3",
      name: "Diaper Cake 3 Tiers",
      description: "Gato couche 3 nivo ar bann zafer itil pou baba: couche, bavwar, ti zoue. Bel cadeau!",
      price: 1800,
      seller: "GiftsFromHeart",
      sellerLocation: "Rose Hill",
      rating: 4.8,
      reviews: 27,
      isBookable: false,
      isPopular: true,
      gradient: "from-rose-100 to-pink-100",
    },
  ],
  photography: [
    {
      id: "ph1",
      name: "Maternity Photoshoot",
      description: "Session photo maternite 1h30 — outdoor ou studio. 30 photos editees, galerie en ligne.",
      price: 5500,
      priceLabel: "par session",
      seller: "Lumiere Studio",
      sellerLocation: "Grand Baie",
      rating: 5.0,
      reviews: 56,
      isBookable: true,
      isPopular: true,
      gradient: "from-violet-100 to-purple-100",
    },
    {
      id: "ph2",
      name: "Newborn Photoshoot",
      description: "Session photo newborn (5-14 zour). Dan studio ar props ek setup professionel. 25 photos.",
      price: 7000,
      priceLabel: "par session",
      seller: "TinyToes Photography",
      sellerLocation: "Flic en Flac",
      rating: 4.9,
      reviews: 38,
      isBookable: true,
      isPopular: true,
      gradient: "from-pink-100 to-rose-100",
    },
    {
      id: "ph3",
      name: "Gender Reveal Photoshoot",
      description: "Session 45 min pou gender reveal. Inklir smoke bombs ek props. 20 photos editees.",
      price: 3500,
      priceLabel: "par session",
      seller: "Lumiere Studio",
      sellerLocation: "Grand Baie",
      rating: 4.8,
      reviews: 19,
      isBookable: true,
      isPopular: false,
      gradient: "from-blue-100 to-pink-100",
    },
  ],
  "maternity-wear": [
    {
      id: "mw1",
      name: "Robe Maternite en Lin",
      description: "Robe an lin natirel, parfait pou klima Maurice. Taille ajistab, disponib S-XL. Kouleur blan kreol.",
      price: 2200,
      seller: "MamanChic MU",
      sellerLocation: "Port Louis",
      rating: 4.7,
      reviews: 15,
      isBookable: false,
      isPopular: true,
      gradient: "from-amber-100 to-yellow-100",
    },
    {
      id: "mw2",
      name: "Jean Maternite Confort",
      description: "Jean strech ar bann elastik anba vant. Super konfortab, disponib taille 36-44.",
      price: 1800,
      seller: "MaterniStyle",
      sellerLocation: "Vacoas",
      rating: 4.5,
      reviews: 22,
      isBookable: false,
      isPopular: false,
      gradient: "from-blue-100 to-indigo-100",
    },
    {
      id: "mw3",
      name: "Soutien-gorge Allaitement (lot de 3)",
      description: "Lot 3 soutien-gorge allaitement san armatir. Coton strech, konfortab zour kouma aswar.",
      price: 1200,
      seller: "MamanChic MU",
      sellerLocation: "Port Louis",
      rating: 4.8,
      reviews: 34,
      isBookable: false,
      isPopular: true,
      gradient: "from-rose-100 to-pink-100",
    },
  ],
};

export default function MarketplacePage() {
  const t = useTranslations("marketplace");
  const locale = useLocale();

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

          {(Object.keys(marketplaceItems) as MarketCategory[]).map((cat) => (
            <TabsContent key={cat} value={cat}>
              <StaggerContainer className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {marketplaceItems[cat].map((item) => (
                  <StaggerItem key={item.id}>
                    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
                      <Card className="group h-full border-border/50 overflow-hidden transition-all duration-300 hover:shadow-lg">
                        <CardContent className="p-0">
                          {/* Image placeholder */}
                          <div
                            className={`relative h-44 bg-gradient-to-br ${item.gradient} flex items-center justify-center`}
                          >
                            {(() => {
                              const Icon = categoryMeta[cat].icon;
                              return (
                                <Icon className="h-16 w-16 text-foreground/10" />
                              );
                            })()}
                            {item.isPopular && (
                              <Badge className="absolute top-3 right-3 gap-1 bg-primary text-primary-foreground">
                                <Sparkles className="h-3 w-3" />
                                {t("popular")}
                              </Badge>
                            )}
                          </div>

                          <div className="p-4">
                            <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-primary transition-colors">
                              {item.name}
                            </h3>
                            <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                              {item.description}
                            </p>

                            {/* Rating */}
                            <div className="mt-3 flex items-center gap-1.5">
                              <div className="flex items-center gap-0.5">
                                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                                <span className="text-xs font-medium">{item.rating}</span>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                ({item.reviews} {t("reviews")})
                              </span>
                            </div>

                            {/* Seller */}
                            <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              <span>{item.seller}</span>
                              <span className="text-border">-</span>
                              <span>{item.sellerLocation}</span>
                            </div>

                            {/* Price + CTA */}
                            <div className="mt-4 flex items-center justify-between">
                              <div>
                                <span className="text-lg font-bold text-primary">
                                  Rs {item.price.toLocaleString()}
                                </span>
                                {item.priceLabel && (
                                  <span className="text-xs text-muted-foreground ml-1">
                                    /{item.priceLabel}
                                  </span>
                                )}
                              </div>
                              <Button
                                size="sm"
                                className="gap-1.5 bg-primary hover:bg-brand-pink-dark"
                              >
                                {item.isBookable ? (
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
                ))}
              </StaggerContainer>
            </TabsContent>
          ))}
        </Tabs>

        {/* Trust Badges */}
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
      </div>
    </div>
  );
}
