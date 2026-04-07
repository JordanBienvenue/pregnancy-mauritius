"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { SponsorBanner } from "@/components/shared/sponsor-banner";
import { motion } from "framer-motion";
import {
  Baby,
  Calendar,
  ArrowRight,
  Stethoscope,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/shared/animated-section";

// ── All 40 weeks with Mauritian fruit comparisons ────────────────────────
const weekData = [
  { week: 1, fruit: "Grain de vanille", emoji: "🫘", size: "< 1 mm", weight: "—", trimester: 1, note: "Fertilisation occurs; cells begin dividing rapidly." },
  { week: 2, fruit: "Grain de poivre", emoji: "🫘", size: "< 1 mm", weight: "—", trimester: 1, note: "The blastocyst implants into the uterine wall." },
  { week: 3, fruit: "Grain de sésame", emoji: "🌱", size: "1 mm", weight: "—", trimester: 1, note: "The embryo forms three layers of cells." },
  { week: 4, fruit: "Grain de moutarde", emoji: "🌱", size: "2 mm", weight: "—", trimester: 1, note: "The heart begins to form and beat." },
  { week: 5, fruit: "Ti pima", emoji: "🟢", size: "5 mm", weight: "—", trimester: 1, note: "Tiny arm and leg buds appear." },
  { week: 6, fruit: "Grain grenade", emoji: "🔴", size: "8 mm", weight: "—", trimester: 1, note: "The nose, mouth, and ears begin to form." },
  { week: 7, fruit: "Ti raisin", emoji: "🍇", size: "1.3 cm", weight: "—", trimester: 1, note: "Brain is growing rapidly, hands and feet forming." },
  { week: 8, fruit: "Framboise", emoji: "🫐", size: "1.6 cm", weight: "1 g", trimester: 1, note: "Fingers and toes are developing, baby starts moving." },
  { week: 9, fruit: "Cerise", emoji: "🍒", size: "2.3 cm", weight: "2 g", trimester: 1, note: "All essential organs have formed." },
  { week: 10, fruit: "Kumquat", emoji: "🍊", size: "3 cm", weight: "4 g", trimester: 1, note: "Tiny nails begin to form on fingers and toes." },
  { week: 11, fruit: "Ti fig", emoji: "🟡", size: "4 cm", weight: "7 g", trimester: 1, note: "Baby can open and close fists." },
  { week: 12, fruit: "Prune", emoji: "🟣", size: "5.4 cm", weight: "14 g", trimester: 1, note: "Reflexes develop, baby can squint and suck thumb." },
  { week: 13, fruit: "Citron vert", emoji: "🍋", size: "7.4 cm", weight: "23 g", trimester: 2, note: "Vocal cords are forming, fingerprints appear." },
  { week: 14, fruit: "Petit limon", emoji: "🍋", size: "8.7 cm", weight: "43 g", trimester: 2, note: "Baby can make facial expressions." },
  { week: 15, fruit: "Pomme d'amour", emoji: "🍎", size: "10 cm", weight: "70 g", trimester: 2, note: "Bones are hardening, baby can sense light." },
  { week: 16, fruit: "Avocat", emoji: "🥑", size: "11.6 cm", weight: "100 g", trimester: 2, note: "Baby can hear sounds! Talk to your bump." },
  { week: 17, fruit: "Grenadine", emoji: "🫒", size: "13 cm", weight: "140 g", trimester: 2, note: "Fat begins to form under baby's skin." },
  { week: 18, fruit: "Patisson", emoji: "🫑", size: "14 cm", weight: "190 g", trimester: 2, note: "You may start feeling baby's movements (quickening)." },
  { week: 19, fruit: "Mangue ti-carotte", emoji: "🥭", size: "15 cm", weight: "240 g", trimester: 2, note: "Vernix caseosa covers baby's skin for protection." },
  { week: 20, fruit: "Banane", emoji: "🍌", size: "16.5 cm", weight: "300 g", trimester: 2, note: "Halfway there! Baby swallows amniotic fluid." },
  { week: 21, fruit: "Carotte", emoji: "🥕", size: "27 cm", weight: "360 g", trimester: 2, note: "Baby's movements become more coordinated." },
  { week: 22, fruit: "Ti papaye", emoji: "🟠", size: "28 cm", weight: "430 g", trimester: 2, note: "Eyebrows and eyelids are fully formed." },
  { week: 23, fruit: "Gros mangue", emoji: "🥭", size: "29 cm", weight: "500 g", trimester: 2, note: "Baby can hear your heartbeat and your voice." },
  { week: 24, fruit: "Maïs doux", emoji: "🌽", size: "30 cm", weight: "600 g", trimester: 2, note: "Lungs are developing surfactant for breathing." },
  { week: 25, fruit: "Chou-fleur", emoji: "🥦", size: "35 cm", weight: "660 g", trimester: 2, note: "Baby responds to your touch through the belly." },
  { week: 26, fruit: "Laitue", emoji: "🥬", size: "36 cm", weight: "760 g", trimester: 2, note: "Eyes begin to open, baby can blink." },
  { week: 27, fruit: "Brocoli", emoji: "🥦", size: "37 cm", weight: "875 g", trimester: 3, note: "Baby has regular sleep and wake cycles." },
  { week: 28, fruit: "Aubergine", emoji: "🍆", size: "38 cm", weight: "1 kg", trimester: 3, note: "Baby can dream! REM sleep begins." },
  { week: 29, fruit: "Giraumon", emoji: "🎃", size: "39 cm", weight: "1.15 kg", trimester: 3, note: "Baby's bones are fully developed but still soft." },
  { week: 30, fruit: "Bon coco vert", emoji: "🥥", size: "40 cm", weight: "1.3 kg", trimester: 3, note: "Baby is gaining weight rapidly now." },
  { week: 31, fruit: "Noix de coco", emoji: "🥥", size: "41 cm", weight: "1.5 kg", trimester: 3, note: "All five senses are working." },
  { week: 32, fruit: "Jicama", emoji: "🫒", size: "42 cm", weight: "1.7 kg", trimester: 3, note: "Baby practices breathing movements." },
  { week: 33, fruit: "Ananas", emoji: "🍍", size: "44 cm", weight: "1.9 kg", trimester: 3, note: "Bones are hardening, except for the skull." },
  { week: 34, fruit: "Melon miel", emoji: "🍈", size: "45 cm", weight: "2.1 kg", trimester: 3, note: "Baby's nervous system is maturing." },
  { week: 35, fruit: "Melon brodé", emoji: "🍈", size: "46 cm", weight: "2.4 kg", trimester: 3, note: "Most babies move into head-down position." },
  { week: 36, fruit: "Papaye", emoji: "🧡", size: "47 cm", weight: "2.6 kg", trimester: 3, note: "Baby drops lower into the pelvis (lightening)." },
  { week: 37, fruit: "Lalos (gombo)", emoji: "🟢", size: "48 cm", weight: "2.9 kg", trimester: 3, note: "Baby is now considered early term!" },
  { week: 38, fruit: "Poireau", emoji: "🥒", size: "49 cm", weight: "3 kg", trimester: 3, note: "Organs are fully mature and ready." },
  { week: 39, fruit: "Pastèque", emoji: "🍉", size: "50 cm", weight: "3.2 kg", trimester: 3, note: "Baby is full term! Could arrive any day." },
  { week: 40, fruit: "Jacque (Ti-Jacques)", emoji: "🍈", size: "51 cm", weight: "3.4 kg", trimester: 3, note: "Due date week! Baby is ready to meet you." },
];

const CURRENT_WEEK = 24;

const trimesterColors: Record<number, string> = {
  1: "border-pink-200 bg-pink-50/50 hover:border-pink-300 hover:shadow-pink-100",
  2: "border-amber-200 bg-amber-50/50 hover:border-amber-300 hover:shadow-amber-100",
  3: "border-teal-200 bg-teal-50/50 hover:border-teal-300 hover:shadow-teal-100",
};

const trimesterBadgeColors: Record<number, string> = {
  1: "bg-pink-100 text-pink-700",
  2: "bg-amber-100 text-amber-700",
  3: "bg-teal-100 text-teal-700",
};

export default function TrackerPage() {
  const t = useTranslations("tracker");
  const tc = useTranslations("common");
  const locale = useLocale();

  const [selectedTrimester, setSelectedTrimester] = useState<number | null>(null);
  const [lastPeriod, setLastPeriod] = useState("");
  const [calculatedDue, setCalculatedDue] = useState("");
  const [calculatedWeek, setCalculatedWeek] = useState<number | null>(null);

  const currentWeekData = weekData.find((w) => w.week === CURRENT_WEEK)!;
  const progress = Math.round((CURRENT_WEEK / 40) * 100);
  const weeksToGo = 40 - CURRENT_WEEK;

  const filteredWeeks = useMemo(() => {
    if (!selectedTrimester) return weekData;
    return weekData.filter((w) => w.trimester === selectedTrimester);
  }, [selectedTrimester]);

  const calculateDueDate = () => {
    if (!lastPeriod) return;
    const lmp = new Date(lastPeriod);
    const due = new Date(lmp);
    due.setDate(due.getDate() + 280);
    setCalculatedDue(due.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }));
    const now = new Date();
    const diffMs = now.getTime() - lmp.getTime();
    const diffWeeks = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7));
    setCalculatedWeek(Math.max(1, Math.min(40, diffWeeks)));
  };

  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-pink-light via-background to-brand-teal-light">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-1/4 h-64 w-64 rounded-full bg-primary/8 blur-3xl" />
          <div className="absolute bottom-10 right-1/4 h-80 w-80 rounded-full bg-secondary/8 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <AnimatedSection>
            <div className="text-center">
              <Badge variant="secondary" className="mb-4 px-4 py-1.5">
                <Baby className="mr-1.5 h-3.5 w-3.5 text-primary" />
                {t("week")} {CURRENT_WEEK} / 40
              </Badge>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                <span className="bg-gradient-to-r from-primary via-brand-pink-dark to-secondary bg-clip-text text-transparent">
                  {t("title")}
                </span>
              </h1>
              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                {t("subtitle")}
              </p>
            </div>
          </AnimatedSection>

          {/* Current week highlight */}
          <AnimatedSection delay={0.15}>
            <Card className="mx-auto mt-8 max-w-2xl overflow-hidden border-primary/20 shadow-lg shadow-primary/5">
              <CardContent className="p-6 sm:p-8">
                <div className="flex flex-col items-center gap-6 sm:flex-row">
                  {/* Fruit visualization */}
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="flex h-28 w-28 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10"
                  >
                    <span className="text-6xl">{currentWeekData.emoji}</span>
                  </motion.div>

                  <div className="flex-1 text-center sm:text-left">
                    <p className="text-sm font-medium text-muted-foreground">
                      {t("babySize")}
                    </p>
                    <h2 className="mt-1 text-2xl font-bold text-primary">
                      {currentWeekData.fruit}
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {currentWeekData.note}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                      <Badge variant="outline" className="gap-1.5">
                        <Sparkles className="h-3 w-3" />
                        {currentWeekData.size}
                      </Badge>
                      <Badge variant="outline" className="gap-1.5">
                        {currentWeekData.weight}
                      </Badge>
                      <Badge variant="secondary" className="gap-1.5">
                        {t("trimester")} {currentWeekData.trimester}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-6">
                  <Progress value={progress}>
                    <ProgressLabel>{t("progress")}</ProgressLabel>
                    <ProgressValue>
                      {() => `${progress}% — ${weeksToGo} ${t("weeksToGo")}`}
                    </ProgressValue>
                  </Progress>
                </div>

                <div className="mt-4 text-center">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-brand-pink-dark"
                    render={<Link href={`/${locale}/tracker/${CURRENT_WEEK}`} />}
                  >
                    {t("week")} {CURRENT_WEEK} {t("details")}
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </section>

      {/* Due date calculator */}
      <section className="border-b bg-muted/30 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <AnimatedSection>
            <Card className="mx-auto max-w-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calendar className="h-5 w-5 text-primary" />
                  {t("dueDateCalc")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="lmp">{t("lastPeriod")}</Label>
                  <Input
                    id="lmp"
                    type="date"
                    value={lastPeriod}
                    onChange={(e) => setLastPeriod(e.target.value)}
                    className="h-11"
                  />
                </div>
                <Button
                  onClick={calculateDueDate}
                  className="w-full bg-primary hover:bg-brand-pink-dark"
                  disabled={!lastPeriod}
                >
                  {t("calculate")}
                </Button>
                {calculatedDue && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl bg-gradient-to-br from-brand-pink-light to-brand-teal-light p-4 text-center"
                  >
                    <p className="text-sm font-medium text-muted-foreground">
                      {t("yourDueDate")}
                    </p>
                    <p className="mt-1 text-xl font-bold text-primary">{calculatedDue}</p>
                    {calculatedWeek && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {t("currentWeek")} <strong>{calculatedWeek}</strong>
                      </p>
                    )}
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </section>

      {/* Week grid */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <AnimatedSection>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  40 {t("week")}s
                </h2>
                <p className="mt-1 text-muted-foreground">
                  {t("subtitle")}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={selectedTrimester === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTrimester(null)}
                >
                  {t("all")}
                </Button>
                <Button
                  variant={selectedTrimester === 1 ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTrimester(1)}
                  className={selectedTrimester === 1 ? "bg-pink-500 hover:bg-pink-600" : ""}
                >
                  {t("trimester1")}
                </Button>
                <Button
                  variant={selectedTrimester === 2 ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTrimester(2)}
                  className={selectedTrimester === 2 ? "bg-amber-500 hover:bg-amber-600" : ""}
                >
                  {t("trimester2")}
                </Button>
                <Button
                  variant={selectedTrimester === 3 ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTrimester(3)}
                  className={selectedTrimester === 3 ? "bg-teal-500 hover:bg-teal-600" : ""}
                >
                  {t("trimester3")}
                </Button>
              </div>
            </div>
          </AnimatedSection>

          <StaggerContainer className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {filteredWeeks.map((w) => {
              const isCurrent = w.week === CURRENT_WEEK;
              const isPast = w.week < CURRENT_WEEK;
              return (
                <StaggerItem key={w.week}>
                  <Link href={`/${locale}/tracker/${w.week}`}>
                    <motion.div whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Card
                        className={`relative overflow-hidden transition-all duration-200 ${
                          trimesterColors[w.trimester]
                        } ${
                          isCurrent
                            ? "ring-2 ring-primary shadow-lg shadow-primary/10"
                            : ""
                        } ${
                          isPast ? "opacity-70" : ""
                        } hover:shadow-md cursor-pointer`}
                      >
                        <CardContent className="p-3 sm:p-4">
                          {isCurrent && (
                            <div className="absolute right-1.5 top-1.5">
                              <span className="relative flex h-2.5 w-2.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
                              </span>
                            </div>
                          )}
                          <div className="text-center">
                            <span className="text-2xl sm:text-3xl">{w.emoji}</span>
                            <p className="mt-1 text-xs font-bold text-foreground/80">
                              {t("week")} {w.week}
                            </p>
                            <p className="mt-0.5 text-[10px] font-medium text-muted-foreground leading-tight line-clamp-1">
                              {w.fruit}
                            </p>
                          </div>
                          {isPast && (
                            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-primary/40" />
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {/* Trimester legend */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-pink-300" />
              {t("trimester1")} (1-12)
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-amber-300" />
              {t("trimester2")} (13-26)
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-teal-300" />
              {t("trimester3")} (27-40)
            </div>
          </div>
        </div>
      </section>

      {/* Sponsor placement */}
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6">
        <SponsorBanner category="pharmacy" variant="minimal" />
      </section>
    </div>
  );
}
