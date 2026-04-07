"use client";

import { useState } from "react";
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

const donationItems = [
  {
    id: "1",
    name: "Baby clothes 0-3 mois bundle",
    description: "Enn lot linz baba 0-3 mwa — 15 pieces: body, pyjama, bonnet. Tou lave ek repase.",
    condition: "good" as Condition,
    category: "clothing",
    district: "Port Louis",
    donor: "Anita R.",
    postedAgo: "Il y a 2h",
    claimed: false,
  },
  {
    id: "2",
    name: "Graco stroller",
    description: "Poussette Graco en bon eta. Kapav pliye, ena canopy ek panier anba. Kouleur gris.",
    condition: "good" as Condition,
    category: "equipment",
    district: "Curepipe",
    donor: "MamaLeena",
    postedAgo: "Il y a 5h",
    claimed: false,
  },
  {
    id: "3",
    name: "Breast pump Medela Swing",
    description: "Tire-lait Medela Swing elektrik. Servi pandan 4 mwa selman. Tou bann pieces inklir.",
    condition: "likeNew" as Condition,
    category: "feeding",
    district: "Rose Hill",
    donor: "SarahK",
    postedAgo: "Il y a 1 zour",
    claimed: false,
  },
  {
    id: "4",
    name: "Maternity jeans taille M",
    description: "Jean maternite taille M. Mark H&M mama. Servi enn sel fwa. Bleu fonse.",
    condition: "likeNew" as Condition,
    category: "maternity",
    district: "Vacoas",
    donor: "Anonymous",
    postedAgo: "Il y a 1 zour",
    claimed: false,
  },
  {
    id: "5",
    name: "Baby cot avec matelas",
    description: "Lili baba an bwa ar matelas. Ena 3 nivo ajistab. Kouleur blan. Ti servi pou enn zanfan.",
    condition: "good" as Condition,
    category: "equipment",
    district: "Flacq",
    donor: "NadiaP",
    postedAgo: "Il y a 2 zour",
    claimed: false,
  },
  {
    id: "6",
    name: "Nursing pillow",
    description: "Coussin allaitement an form U. Mark Boppy. Lav ek sese. Kouvertir kapav retire pou lave.",
    condition: "good" as Condition,
    category: "feeding",
    district: "Port Louis",
    donor: "CindyJ",
    postedAgo: "Il y a 2 zour",
    claimed: false,
  },
  {
    id: "7",
    name: "Baby carrier / Porte-bebe",
    description: "Porte-bebe Ergobaby. Kouleur nwar. Kapav servi depi nesans ziska 20kg. Ena support latet.",
    condition: "fair" as Condition,
    category: "equipment",
    district: "Curepipe",
    donor: "MamaReshma",
    postedAgo: "Il y a 3 zour",
    claimed: true,
  },
  {
    id: "8",
    name: "Newborn diapers pack (x80)",
    description: "Enn paket 80 couche newborn mark Pampers. Pa finn ouver, so date ankor bon. Mo baba finn grandi tro vit!",
    condition: "new" as Condition,
    category: "clothing",
    district: "Rose Hill",
    donor: "AishaM",
    postedAgo: "Il y a 3 zour",
    claimed: false,
  },
];

export default function DonatePage() {
  const t = useTranslations("donations");
  const locale = useLocale();
  const [activeCategory, setActiveCategory] = useState<DonationCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = donationItems.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
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
        <Tabs defaultValue="browse">
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

            {/* Items Grid */}
            <StaggerContainer className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredItems.map((item) => {
                const CatIcon = categoryIcons[item.category] || Package;
                return (
                  <StaggerItem key={item.id}>
                    <Card
                      className={`group h-full border-border/50 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 ${
                        item.claimed ? "opacity-60" : ""
                      }`}
                    >
                      <CardContent className="p-0">
                        {/* Image placeholder */}
                        <div className="relative h-40 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center rounded-t-xl">
                          <CatIcon className="h-12 w-12 text-muted-foreground/30" />
                          <div className="absolute top-3 left-3 flex gap-2">
                            <Badge
                              variant="outline"
                              className={`text-xs ${conditionColors[item.condition]}`}
                            >
                              {t(conditionTKeys[item.condition])}
                            </Badge>
                          </div>
                          {item.claimed && (
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
                            {item.name}
                          </h3>
                          <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                            {item.description}
                          </p>

                          <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                            <MapPin className="h-3.5 w-3.5 text-primary" />
                            <span>{item.district}</span>
                            <span className="text-border">|</span>
                            <span>{item.donor}</span>
                          </div>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {item.postedAgo}
                          </p>

                          {!item.claimed && (
                            <Button
                              className="mt-3 w-full gap-2 bg-primary hover:bg-brand-pink-dark"
                              size="sm"
                            >
                              <Heart className="h-3.5 w-3.5" />
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

            {filteredItems.length === 0 && (
              <AnimatedSection className="mt-12 text-center">
                <Package className="mx-auto h-12 w-12 text-muted-foreground/30" />
                <p className="mt-3 text-muted-foreground">
                  {t("emptyState")}
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
                      />
                    </div>
                    <div>
                      <Label htmlFor="item-desc">{t("itemDescription")}</Label>
                      <Textarea
                        id="item-desc"
                        placeholder={t("itemDescPlaceholder")}
                        className="mt-1.5 min-h-24"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>{t("category")}</Label>
                        <div className="mt-1.5 grid grid-cols-2 gap-2">
                          {(["clothing", "equipment", "feeding", "maternity"] as const).map((cat) => (
                            <Button
                              key={cat}
                              variant="outline"
                              size="sm"
                              className="text-xs"
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
                              variant="outline"
                              size="sm"
                              className="text-xs"
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
                      />
                    </div>
                    <Button className="w-full gap-2 bg-primary hover:bg-brand-pink-dark mt-2">
                      <Gift className="h-4 w-4" />
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
