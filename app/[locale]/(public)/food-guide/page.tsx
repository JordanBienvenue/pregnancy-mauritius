"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShieldCheck,
  AlertTriangle,
  XCircle,
  Apple,
  Leaf,
  Drumstick,
  Wheat,
  Coffee,
  Cookie,
  Info,
  X,
  CircleCheck,
  CircleAlert,
  CircleX,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/shared/animated-section";

type SafetyStatus = "safe" | "caution" | "avoid";
type FoodCategory =
  | "fruit"
  | "vegetable"
  | "protein"
  | "grains"
  | "drinks"
  | "snacks";

interface FoodItem {
  id: string;
  name: string;
  localName?: string;
  category: FoodCategory;
  status: SafetyStatus;
  notes: string;
}

const categoryIcons: Record<FoodCategory, React.ElementType> = {
  fruit: Apple,
  vegetable: Leaf,
  protein: Drumstick,
  grains: Wheat,
  drinks: Coffee,
  snacks: Cookie,
};

const categoryLabelKeys: Record<FoodCategory, string> = {
  fruit: "categoryFruit",
  vegetable: "categoryVegetable",
  protein: "categoryProtein",
  grains: "categoryGrains",
  drinks: "categoryDrinks",
  snacks: "categorySnacks",
};

const statusConfig: Record<
  SafetyStatus,
  {
    icon: React.ElementType;
    label: string;
    bgCard: string;
    bgBadge: string;
    textBadge: string;
    border: string;
    accent: string;
  }
> = {
  safe: {
    icon: CircleCheck,
    label: "safe",
    bgCard: "bg-emerald-50/50",
    bgBadge: "bg-emerald-100",
    textBadge: "text-emerald-700",
    border: "border-emerald-200/60",
    accent: "text-emerald-600",
  },
  caution: {
    icon: CircleAlert,
    label: "caution",
    bgCard: "bg-amber-50/50",
    bgBadge: "bg-amber-100",
    textBadge: "text-amber-700",
    border: "border-amber-200/60",
    accent: "text-amber-600",
  },
  avoid: {
    icon: CircleX,
    label: "avoid",
    bgCard: "bg-red-50/50",
    bgBadge: "bg-red-100",
    textBadge: "text-red-700",
    border: "border-red-200/60",
    accent: "text-red-600",
  },
};

const foods: FoodItem[] = [
  // SAFE foods
  {
    id: "dal-puri",
    name: "Dal Puri",
    category: "grains",
    status: "safe",
    notes:
      "A great source of carbohydrates and protein from the lentil filling. Eat fresh and in moderation.",
  },
  {
    id: "dholl",
    name: "Dholl (Yellow Split Peas)",
    category: "protein",
    status: "safe",
    notes:
      "Excellent source of plant protein, iron, and folate. Perfect during pregnancy for baby's development.",
  },
  {
    id: "roti",
    name: "Roti / Farata",
    localName: "Farata",
    category: "grains",
    status: "safe",
    notes:
      "Good source of energy. Wholemeal roti is even better for fibre. Pair with vegetables for a balanced meal.",
  },
  {
    id: "riz",
    name: "Riz (Rice)",
    category: "grains",
    status: "safe",
    notes:
      "Staple food and good energy source. Brown rice is preferred for higher fibre and nutrients.",
  },
  {
    id: "bredes",
    name: "Bredes (Leafy Greens)",
    localName: "Bred mouroum, bred sonz",
    category: "vegetable",
    status: "safe",
    notes:
      "Rich in iron, calcium, and vitamins. Bredes mouroum (moringa) is especially nutritious during pregnancy.",
  },
  {
    id: "lentilles",
    name: "Lentilles (Lentils)",
    category: "protein",
    status: "safe",
    notes:
      "Packed with folate, iron, and protein. Essential for preventing neural tube defects. Eat regularly!",
  },
  {
    id: "papaye-mure",
    name: "Papaye Mure (Ripe Papaya)",
    category: "fruit",
    status: "safe",
    notes:
      "Ripe papaya is safe and rich in vitamin C and folate. Only unripe/green papaya should be avoided.",
  },
  {
    id: "banana",
    name: "Banana",
    localName: "Fig",
    category: "fruit",
    status: "safe",
    notes:
      "Great source of potassium, vitamin B6, and quick energy. Helps with morning sickness and leg cramps.",
  },
  {
    id: "coco-water",
    name: "Coconut Water",
    localName: "Dilo coco",
    category: "drinks",
    status: "safe",
    notes:
      "Naturally hydrating with electrolytes. Excellent during Mauritius' hot weather. Helps reduce swelling.",
  },
  {
    id: "lait",
    name: "Lait (Pasteurised Milk)",
    category: "drinks",
    status: "safe",
    notes:
      "Good source of calcium and protein. Always use pasteurised milk. Essential for baby's bone development.",
  },
  {
    id: "poisson-frais",
    name: "Poisson Frais (Fresh Fish)",
    category: "protein",
    status: "safe",
    notes:
      "Excellent source of omega-3 and protein. Choose small fish like mackerel. Limit to 2-3 servings per week.",
  },
  {
    id: "poulet",
    name: "Poulet (Chicken)",
    category: "protein",
    status: "safe",
    notes:
      "Lean protein source. Must be thoroughly cooked. Great in rougaille or grilled. Avoid undercooked chicken.",
  },
  {
    id: "oeuf-cuit",
    name: "Oeuf Bien Cuit (Well-cooked Egg)",
    category: "protein",
    status: "safe",
    notes:
      "Rich in choline for brain development. Always cook until both yolk and white are firm.",
  },
  {
    id: "chatini-cotomili",
    name: "Chatini Cotomili (Coriander Chutney)",
    category: "snacks",
    status: "safe",
    notes:
      "Fresh coriander is safe and rich in vitamins. A nice accompaniment to meals in small quantities.",
  },
  {
    id: "bouillon-bredes",
    name: "Bouillon Bredes",
    category: "vegetable",
    status: "safe",
    notes:
      "Nutritious leafy green soup. Rich in vitamins and minerals. A comforting and healthy Mauritian dish.",
  },
  {
    id: "fruit-a-pain",
    name: "Fruit a Pain (Breadfruit)",
    category: "vegetable",
    status: "safe",
    notes:
      "Good source of fibre and potassium. Can be boiled, fried, or grilled. A Mauritian staple vegetable.",
  },
  {
    id: "manioc-cuit",
    name: "Manioc Cuit (Cooked Cassava)",
    localName: "Manioc bouilli",
    category: "grains",
    status: "safe",
    notes:
      "Good source of carbohydrates and energy. Must always be properly cooked. Never eat raw cassava.",
  },

  // CAUTION foods
  {
    id: "mangue-vert",
    name: "Mangue Vert (Green Mango)",
    category: "fruit",
    status: "caution",
    notes:
      "High acidity can cause heartburn. Eat in moderation. The salt and chilli condiment adds sodium — limit intake.",
  },
  {
    id: "tamarind",
    name: "Tamarind",
    localName: "Tamarin",
    category: "fruit",
    status: "caution",
    notes:
      "High acidity may worsen heartburn. Small amounts in cooking are fine. Avoid eating large quantities as a snack.",
  },
  {
    id: "piment",
    name: "Piment (Hot Pepper)",
    category: "vegetable",
    status: "caution",
    notes:
      "Safe in small amounts but may worsen heartburn and indigestion, which are common in pregnancy. Use sparingly.",
  },
  {
    id: "gato-pima",
    name: "Gato Pima (Chilli Cakes)",
    category: "snacks",
    status: "caution",
    notes:
      "Deep fried and spicy. High in oil and sodium. Occasional treat is fine but avoid eating frequently.",
  },
  {
    id: "mine-frite",
    name: "Mine Frite (Fried Noodles)",
    category: "snacks",
    status: "caution",
    notes:
      "Often contains MSG and high sodium. Eat occasionally and prefer home-made versions with less oil and salt.",
  },
  {
    id: "cafe",
    name: "Cafe (Coffee)",
    category: "drinks",
    status: "caution",
    notes:
      "Limit to 200mg caffeine per day (about 1-2 cups). Excess caffeine is linked to low birth weight. Try decaf.",
  },
  {
    id: "the-noir",
    name: "The Noir (Black Tea)",
    category: "drinks",
    status: "caution",
    notes:
      "Contains caffeine. 2-3 cups per day is generally fine. Avoid drinking with meals as it reduces iron absorption.",
  },
  {
    id: "gato-patate",
    name: "Gato Patate (Sweet Potato Cake)",
    category: "snacks",
    status: "caution",
    notes:
      "High in sugar but also nutritious from sweet potato. Enjoy as an occasional treat, not a daily snack.",
  },
  {
    id: "rougaille-tomate",
    name: "Rougaille Tomate (Spicy Tomato Sauce)",
    category: "vegetable",
    status: "caution",
    notes:
      "Generally safe but the acidity and spice may trigger heartburn. Use less chilli during pregnancy.",
  },
  {
    id: "achard",
    name: "Achard (Pickled Vegetables)",
    category: "vegetable",
    status: "caution",
    notes:
      "High in vinegar, oil, and mustard. Small portions as a side are fine. Avoid large quantities due to sodium.",
  },

  // AVOID foods
  {
    id: "saucisse-crue",
    name: "Rougaille Saucisse (if undercooked)",
    category: "protein",
    status: "avoid",
    notes:
      "Processed sausage may contain listeria if not thoroughly cooked. Always ensure sausage is piping hot throughout.",
  },
  {
    id: "vindaye-mustard",
    name: "Vindaye with Excess Mustard Oil",
    category: "protein",
    status: "avoid",
    notes:
      "Excess mustard oil contains erucic acid which is harmful in large amounts. Small amounts in cooking are OK.",
  },
  {
    id: "alouda-raw",
    name: "Alouda (with Raw Milk)",
    category: "drinks",
    status: "avoid",
    notes:
      "Street alouda may use unpasteurised milk risking listeria and toxoplasmosis. Only drink from trusted sources using pasteurised milk.",
  },
  {
    id: "rhum-arrange",
    name: "Rhum Arrange",
    category: "drinks",
    status: "avoid",
    notes:
      "All alcohol should be completely avoided during pregnancy. No safe level of alcohol consumption is known for pregnancy.",
  },
  {
    id: "cervelle",
    name: "Cervelle (Brain)",
    category: "protein",
    status: "avoid",
    notes:
      "May contain prions and high cholesterol. Risk of transmitting infections. Avoid completely during pregnancy.",
  },
  {
    id: "sashimi",
    name: "Raw Sashimi / Sushi",
    category: "protein",
    status: "avoid",
    notes:
      "Raw fish risks parasites, listeria, and mercury exposure. Only eat fully cooked fish during pregnancy.",
  },
  {
    id: "papaye-verte",
    name: "Papaye Verte (Green/Unripe Papaya)",
    category: "fruit",
    status: "avoid",
    notes:
      "Contains papain which may cause uterine contractions and is potentially harmful. Ripe papaya is safe.",
  },
  {
    id: "beer-phoenix",
    name: "Beer / Phoenix Lager",
    category: "drinks",
    status: "avoid",
    notes:
      "All alcoholic beverages must be avoided during pregnancy. Try sparkling water with lime as an alternative.",
  },
  {
    id: "boulette-steam-street",
    name: "Street Boulettes (if not fresh)",
    category: "snacks",
    status: "avoid",
    notes:
      "Street food kept at warm (not hot) temperatures risks bacterial growth. Only eat freshly steamed boulettes from hygienic sources.",
  },
];

const allCategories: FoodCategory[] = [
  "fruit",
  "vegetable",
  "protein",
  "grains",
  "drinks",
  "snacks",
];

export default function FoodGuidePage() {
  const t = useTranslations("foodGuide");
  const tc = useTranslations("common");

  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<SafetyStatus | "all">("all");

  const filtered = useMemo(() => {
    return foods.filter((food) => {
      const matchesSearch =
        search === "" ||
        food.name.toLowerCase().includes(search.toLowerCase()) ||
        (food.localName &&
          food.localName.toLowerCase().includes(search.toLowerCase())) ||
        food.notes.toLowerCase().includes(search.toLowerCase());

      const matchesTab = activeTab === "all" || food.status === activeTab;

      return matchesSearch && matchesTab;
    });
  }, [search, activeTab]);

  const safeFoods = filtered.filter((f) => f.status === "safe");
  const cautionFoods = filtered.filter((f) => f.status === "caution");
  const avoidFoods = filtered.filter((f) => f.status === "avoid");

  const counts = {
    all: foods.length,
    safe: foods.filter((f) => f.status === "safe").length,
    caution: foods.filter((f) => f.status === "caution").length,
    avoid: foods.filter((f) => f.status === "avoid").length,
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden border-b bg-gradient-to-br from-emerald-50 via-background to-amber-50/50">
        <div className="absolute inset-0">
          <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-emerald-100/40 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-amber-100/40 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-center"
          >
            <Badge variant="secondary" className="mb-4 px-3 py-1 bg-emerald-100 text-emerald-700">
              <Apple className="mr-1 h-3 w-3" />
              {t("foodsReviewed", { count: counts.all })}
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              {t("title")}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              {t("subtitle")}
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto mt-8 max-w-xl"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("searchPlaceholder")}
                className="h-11 pl-9 bg-background/80 backdrop-blur-sm"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </motion.div>

          {/* Summary stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mx-auto mt-8 flex max-w-lg items-center justify-center gap-6"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">
                {counts.safe}
              </div>
              <div className="text-xs text-muted-foreground">{t("safe")}</div>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">
                {counts.caution}
              </div>
              <div className="text-xs text-muted-foreground">{t("caution")}</div>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {counts.avoid}
              </div>
              <div className="text-xs text-muted-foreground">{t("avoid")}</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16">
        {/* Tabs */}
        <AnimatedSection>
          <Tabs
            defaultValue="all"
            onValueChange={(val: string | number | null) =>
              setActiveTab((val as SafetyStatus | "all") ?? "all")
            }
          >
            <TabsList className="mx-auto mb-8 flex w-full max-w-lg">
              <TabsTrigger value="all" className="flex-1 gap-1.5 text-sm">
                {t("all")} ({counts.all})
              </TabsTrigger>
              <TabsTrigger value="safe" className="flex-1 gap-1.5 text-sm">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                {t("safe")} ({counts.safe})
              </TabsTrigger>
              <TabsTrigger value="caution" className="flex-1 gap-1.5 text-sm">
                <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
                {t("caution")} ({counts.caution})
              </TabsTrigger>
              <TabsTrigger value="avoid" className="flex-1 gap-1.5 text-sm">
                <XCircle className="h-3.5 w-3.5 text-red-600" />
                {t("avoid")} ({counts.avoid})
              </TabsTrigger>
            </TabsList>

            {/* All tabs share the same content display */}
            {(["all", "safe", "caution", "avoid"] as const).map((tab) => (
              <TabsContent key={tab} value={tab}>
                <AnimatePresence mode="wait">
                  {filtered.length === 0 ? (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="py-16 text-center"
                    >
                      <Search className="mx-auto h-12 w-12 text-muted-foreground/40" />
                      <p className="mt-4 text-lg font-medium text-muted-foreground">
                        {tc("noResults")}
                      </p>
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => {
                          setSearch("");
                        }}
                      >
                        {t("clearSearch")}
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`results-${tab}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {/* Group by status when showing all */}
                      {tab === "all" ? (
                        <div className="space-y-10">
                          {safeFoods.length > 0 && (
                            <FoodSection
                              status="safe"
                              foods={safeFoods}
                              t={t}
                            />
                          )}
                          {cautionFoods.length > 0 && (
                            <FoodSection
                              status="caution"
                              foods={cautionFoods}
                              t={t}
                            />
                          )}
                          {avoidFoods.length > 0 && (
                            <FoodSection
                              status="avoid"
                              foods={avoidFoods}
                              t={t}
                            />
                          )}
                        </div>
                      ) : (
                        <FoodGrid foods={filtered} />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </TabsContent>
            ))}
          </Tabs>
        </AnimatedSection>
      </section>
    </div>
  );
}

function FoodSection({
  status,
  foods,
  t,
}: {
  status: SafetyStatus;
  foods: FoodItem[];
  t: ReturnType<typeof useTranslations>;
}) {
  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <StatusIcon className={`h-5 w-5 ${config.accent}`} />
        <h3 className="text-lg font-semibold">{t(config.label)}</h3>
        <Badge className={`${config.bgBadge} ${config.textBadge} border-0`}>
          {foods.length}
        </Badge>
      </div>
      <FoodGrid foods={foods} />
    </div>
  );
}

function FoodGrid({ foods }: { foods: FoodItem[] }) {
  return (
    <StaggerContainer className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {foods.map((food) => (
        <StaggerItem key={food.id}>
          <FoodCard food={food} />
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}

function FoodCard({ food }: { food: FoodItem }) {
  const t = useTranslations("foodGuide");
  const config = statusConfig[food.status];
  const StatusIcon = config.icon;
  const CatIcon = categoryIcons[food.category];

  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.01 }}
      transition={{ duration: 0.15 }}
    >
      <Card
        className={`h-full overflow-hidden border ${config.border} transition-all duration-300 hover:shadow-md`}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-3 min-w-0">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${config.bgBadge}`}
              >
                <CatIcon className={`h-4 w-4 ${config.accent}`} />
              </div>
              <div className="min-w-0">
                <h4 className="font-semibold leading-tight truncate">
                  {food.name}
                </h4>
                {food.localName && (
                  <p className="text-xs text-muted-foreground truncate">
                    {food.localName}
                  </p>
                )}
              </div>
            </div>
            <StatusIcon className={`h-4 w-4 shrink-0 ${config.accent}`} />
          </div>

          <div className="mt-2 flex flex-wrap gap-1.5">
            <Badge
              variant="outline"
              className="text-[10px] px-1.5 py-0"
            >
              {t(categoryLabelKeys[food.category])}
            </Badge>
            <Badge
              className={`text-[10px] px-1.5 py-0 ${config.bgBadge} ${config.textBadge} border-0`}
            >
              {t(config.label)}
            </Badge>
          </div>

          <div className="mt-3 flex items-start gap-1.5">
            <Info className="mt-0.5 h-3 w-3 shrink-0 text-muted-foreground" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              {food.notes}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
