"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  Baby,
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronUp,
  Shield,
  Calendar,
  Star,
  Syringe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/shared/animated-section";

/* ─── Milestone Data ─────────────────────────────────────────────────── */

interface Milestone {
  id: string;
  text: string;
  category: "motor" | "cognitive" | "social";
}

interface MonthData {
  month: number;
  milestones: Milestone[];
}

const MILESTONES_DATA: MonthData[] = [
  {
    month: 1,
    milestones: [
      { id: "1-1", text: "First smile", category: "social" },
      { id: "1-2", text: "Lifts head briefly", category: "motor" },
      { id: "1-3", text: "Responds to sounds", category: "cognitive" },
    ],
  },
  {
    month: 2,
    milestones: [
      { id: "2-1", text: "Follows objects with eyes", category: "cognitive" },
      { id: "2-2", text: "Coos", category: "social" },
      { id: "2-3", text: "Holds head up", category: "motor" },
    ],
  },
  {
    month: 3,
    milestones: [
      { id: "3-1", text: "Laughs", category: "social" },
      { id: "3-2", text: "Grabs objects", category: "motor" },
      { id: "3-3", text: "Supports head steadily", category: "motor" },
    ],
  },
  {
    month: 4,
    milestones: [
      { id: "4-1", text: "Rolls over", category: "motor" },
      { id: "4-2", text: "Reaches for toys", category: "motor" },
      { id: "4-3", text: "Babbles", category: "cognitive" },
    ],
  },
  {
    month: 5,
    milestones: [
      { id: "5-1", text: "Sits with support", category: "motor" },
      { id: "5-2", text: "Transfers objects between hands", category: "motor" },
      { id: "5-3", text: "Recognizes own name", category: "cognitive" },
    ],
  },
  {
    month: 6,
    milestones: [
      { id: "6-1", text: "Sits alone", category: "motor" },
      { id: "6-2", text: "Ready for first foods", category: "cognitive" },
      { id: "6-3", text: "Stranger anxiety begins", category: "social" },
    ],
  },
  {
    month: 7,
    milestones: [
      { id: "7-1", text: "Crawls", category: "motor" },
      { id: "7-2", text: "Pulls to stand", category: "motor" },
      { id: "7-3", text: 'Says "mama" or "dada"', category: "cognitive" },
    ],
  },
  {
    month: 8,
    milestones: [
      { id: "8-1", text: "Picks up small objects (pincer grasp)", category: "motor" },
      { id: "8-2", text: "Waves bye-bye", category: "social" },
      { id: "8-3", text: "Claps hands", category: "social" },
    ],
  },
  {
    month: 9,
    milestones: [
      { id: "9-1", text: "Stands holding furniture", category: "motor" },
      { id: "9-2", text: 'Understands "no"', category: "cognitive" },
      { id: "9-3", text: "Points at objects", category: "social" },
    ],
  },
  {
    month: 10,
    milestones: [
      { id: "10-1", text: "Takes first steps (supported)", category: "motor" },
      { id: "10-2", text: "Stacks blocks", category: "motor" },
      { id: "10-3", text: "Imitates actions", category: "social" },
    ],
  },
  {
    month: 11,
    milestones: [
      { id: "11-1", text: "Walks with help", category: "motor" },
      { id: "11-2", text: "Says 1-2 words", category: "cognitive" },
      { id: "11-3", text: "Follows simple commands", category: "cognitive" },
    ],
  },
  {
    month: 12,
    milestones: [
      { id: "12-1", text: "First independent steps", category: "motor" },
      { id: "12-2", text: "Says 3-5 words", category: "cognitive" },
      { id: "12-3", text: "Drinks from a cup", category: "motor" },
    ],
  },
];

/* ─── Vaccination Data (Mauritius MoH) ───────────────────────────────── */

interface Vaccine {
  id: string;
  name: string;
}

interface VaccinationSchedule {
  age: string;
  monthNumber: number;
  vaccines: Vaccine[];
}

const VACCINATION_SCHEDULE: VaccinationSchedule[] = [
  {
    age: "Birth",
    monthNumber: 0,
    vaccines: [
      { id: "v-bcg", name: "BCG" },
      { id: "v-opv0", name: "OPV-0" },
      { id: "v-hepb1", name: "Hep B-1" },
    ],
  },
  {
    age: "2 months",
    monthNumber: 2,
    vaccines: [
      { id: "v-dtpw1", name: "DTPw-HepB-Hib-1" },
      { id: "v-opv1", name: "OPV-1" },
      { id: "v-pcv1", name: "PCV-1" },
      { id: "v-rota1", name: "Rotavirus-1" },
    ],
  },
  {
    age: "4 months",
    monthNumber: 4,
    vaccines: [
      { id: "v-dtpw2", name: "DTPw-HepB-Hib-2" },
      { id: "v-opv2", name: "OPV-2" },
      { id: "v-pcv2", name: "PCV-2" },
      { id: "v-rota2", name: "Rotavirus-2" },
    ],
  },
  {
    age: "6 months",
    monthNumber: 6,
    vaccines: [
      { id: "v-dtpw3", name: "DTPw-HepB-Hib-3" },
      { id: "v-opv3", name: "OPV-3" },
      { id: "v-pcv3", name: "PCV-3" },
    ],
  },
  {
    age: "9 months",
    monthNumber: 9,
    vaccines: [
      { id: "v-measles1", name: "Measles-1" },
    ],
  },
  {
    age: "12 months",
    monthNumber: 12,
    vaccines: [
      { id: "v-mmr1", name: "MMR-1" },
    ],
  },
];

/* ─── Constants ──────────────────────────────────────────────────────── */

const BABY_AGE_MONTHS = 3; // dummy

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  motor: { bg: "bg-blue-100", text: "text-blue-700" },
  cognitive: { bg: "bg-purple-100", text: "text-purple-700" },
  social: { bg: "bg-amber-100", text: "text-amber-700" },
};

const CATEGORY_KEYS: Record<string, string> = {
  motor: "motor",
  cognitive: "cognitive",
  social: "social",
};

/* ─── Page Component ─────────────────────────────────────────────────── */

export default function BabyMilestones() {
  const t = useTranslations("postpartum");
  const tc = useTranslations("common");
  const locale = useLocale();

  const [checkedMilestones, setCheckedMilestones] = useState<Set<string>>(
    new Set()
  );
  const [checkedVaccines, setCheckedVaccines] = useState<Set<string>>(
    new Set()
  );
  const [expandedMonth, setExpandedMonth] = useState<number | null>(
    BABY_AGE_MONTHS
  );

  const toggleMilestone = useCallback((id: string) => {
    setCheckedMilestones((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const toggleVaccine = useCallback((id: string) => {
    setCheckedVaccines((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const toggleMonth = useCallback((month: number) => {
    setExpandedMonth((prev) => (prev === month ? null : month));
  }, []);

  function getMonthProgress(monthData: MonthData): number {
    const total = monthData.milestones.length;
    if (total === 0) return 0;
    const checked = monthData.milestones.filter((m) =>
      checkedMilestones.has(m.id)
    ).length;
    return Math.round((checked / total) * 100);
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative overflow-hidden border-b bg-gradient-to-br from-purple-50/80 via-background to-brand-teal-light/30">
        <div className="absolute inset-0">
          <div className="absolute top-5 right-16 h-48 w-48 rounded-full bg-purple-200/20 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-6 sm:py-8">
          <Link
            href={`/${locale}/postpartum`}
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-1.5 h-4 w-4" />
            {tc("back")}
          </Link>

          <div className="mt-4 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Baby className="h-5 w-5 text-purple-500" />
                <h1 className="text-xl font-bold sm:text-2xl">{t("milestones")}</h1>
              </div>
              <p className="text-sm text-muted-foreground">
                {t("milestonesSubtitle")}
              </p>
            </div>
            <Badge className="bg-purple-100 text-purple-700 text-xs shrink-0">
              <Baby className="mr-1 h-3 w-3" />
              {BABY_AGE_MONTHS} {t("months")}
            </Badge>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-10">
        <Tabs defaultValue="milestones">
          <TabsList className="mb-6 w-full grid grid-cols-2">
            <TabsTrigger value="milestones" className="gap-1.5">
              <Star className="h-4 w-4" />
              {t("milestones")}
            </TabsTrigger>
            <TabsTrigger value="vaccines" className="gap-1.5">
              <Syringe className="h-4 w-4" />
              {t("vaccines")}
            </TabsTrigger>
          </TabsList>

          {/* ─── Milestones Tab ──────────────────────────────────────── */}
          <TabsContent value="milestones">
            {/* Legend */}
            <div className="mb-6 flex flex-wrap gap-2">
              {Object.entries(CATEGORY_KEYS).map(([key, tKey]) => (
                <Badge
                  key={key}
                  className={`${CATEGORY_COLORS[key].bg} ${CATEGORY_COLORS[key].text} text-xs`}
                >
                  {t(tKey)}
                </Badge>
              ))}
            </div>

            <StaggerContainer className="space-y-3">
              {MILESTONES_DATA.map((monthData) => {
                const isExpanded = expandedMonth === monthData.month;
                const prog = getMonthProgress(monthData);
                const isCurrent = monthData.month === BABY_AGE_MONTHS;
                const isPast = monthData.month < BABY_AGE_MONTHS;

                return (
                  <StaggerItem key={monthData.month}>
                    <Card
                      className={`overflow-hidden transition-all duration-200 ${
                        isCurrent
                          ? "border-primary/40 shadow-md shadow-primary/5"
                          : "border-border/50"
                      }`}
                    >
                      {/* Month Header */}
                      <button
                        onClick={() => toggleMonth(monthData.month)}
                        className="flex w-full items-center gap-3 p-4 text-left hover:bg-muted/30 transition-colors sm:gap-4"
                      >
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${
                            isCurrent
                              ? "bg-primary text-primary-foreground"
                              : isPast
                              ? "bg-green-100 text-green-700"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {monthData.month}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold">
                              {t("month")} {monthData.month}
                            </span>
                            {isCurrent && (
                              <Badge className="bg-primary/10 text-primary text-xs">
                                {t("current")}
                              </Badge>
                            )}
                            {isPast && prog === 100 && (
                              <Badge className="bg-green-100 text-green-700 text-xs">
                                <Check className="mr-0.5 h-3 w-3" />
                                {t("complete")}
                              </Badge>
                            )}
                          </div>

                          {/* Mini progress bar */}
                          <div className="mt-1.5 flex items-center gap-2">
                            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                              <motion.div
                                className={`h-full rounded-full ${
                                  prog === 100
                                    ? "bg-green-500"
                                    : "bg-primary"
                                }`}
                                initial={{ width: 0 }}
                                animate={{ width: `${prog}%` }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                              />
                            </div>
                            <span className="text-xs text-muted-foreground tabular-nums w-8 text-right">
                              {prog}%
                            </span>
                          </div>
                        </div>

                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4 shrink-0 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                        )}
                      </button>

                      {/* Milestones List */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="border-t px-4 pb-4 pt-3 space-y-2">
                              {monthData.milestones.map((milestone) => {
                                const isChecked = checkedMilestones.has(
                                  milestone.id
                                );
                                const catColor =
                                  CATEGORY_COLORS[milestone.category];

                                return (
                                  <motion.button
                                    key={milestone.id}
                                    onClick={() =>
                                      toggleMilestone(milestone.id)
                                    }
                                    whileTap={{ scale: 0.98 }}
                                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-all duration-200 ${
                                      isChecked
                                        ? "bg-green-50"
                                        : "bg-muted/20 hover:bg-muted/40"
                                    }`}
                                  >
                                    {/* Checkbox */}
                                    <div
                                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all duration-200 ${
                                        isChecked
                                          ? "border-green-500 bg-green-500"
                                          : "border-muted-foreground/30"
                                      }`}
                                    >
                                      <AnimatePresence>
                                        {isChecked && (
                                          <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            exit={{ scale: 0 }}
                                            transition={{ duration: 0.15 }}
                                          >
                                            <Check className="h-3 w-3 text-white" />
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                    </div>

                                    {/* Milestone text */}
                                    <span
                                      className={`flex-1 text-sm ${
                                        isChecked
                                          ? "text-green-700 line-through decoration-green-300"
                                          : "text-foreground"
                                      }`}
                                    >
                                      {milestone.text}
                                    </span>

                                    {/* Category badge */}
                                    <Badge
                                      className={`${catColor.bg} ${catColor.text} text-[10px] px-1.5 py-0`}
                                    >
                                      {t(CATEGORY_KEYS[milestone.category])}
                                    </Badge>
                                  </motion.button>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Card>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>

            {/* Note */}
            <div className="mt-6 rounded-xl bg-muted/40 px-4 py-3">
              <p className="text-center text-xs text-muted-foreground leading-relaxed">
                {t("milestonesNote")}
              </p>
            </div>
          </TabsContent>

          {/* ─── Vaccination Tab ─────────────────────────────────────── */}
          <TabsContent value="vaccines">
            <AnimatedSection>
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                  <Shield className="h-5 w-5 text-blue-500" />
                  <h2 className="text-lg font-bold">{t("vaccines")}</h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t("vaccinesSubtitle")}
                </p>
              </div>
            </AnimatedSection>

            <StaggerContainer className="space-y-4">
              {VACCINATION_SCHEDULE.map((schedule) => {
                const isPast = schedule.monthNumber < BABY_AGE_MONTHS;
                const isCurrent = schedule.monthNumber === BABY_AGE_MONTHS;
                const isUpcoming = schedule.monthNumber > BABY_AGE_MONTHS;
                const allChecked = schedule.vaccines.every((v) =>
                  checkedVaccines.has(v.id)
                );

                return (
                  <StaggerItem key={schedule.age}>
                    <Card
                      className={`transition-all duration-200 ${
                        isCurrent
                          ? "border-blue-300 shadow-md shadow-blue-500/5"
                          : isPast && allChecked
                          ? "border-green-200 bg-green-50/30"
                          : "border-border/50"
                      }`}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                                isPast && allChecked
                                  ? "bg-green-100 text-green-600"
                                  : isCurrent
                                  ? "bg-blue-100 text-blue-600"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {isPast && allChecked ? (
                                <Check className="h-5 w-5" />
                              ) : (
                                <Calendar className="h-5 w-5" />
                              )}
                            </div>
                            <div>
                              <CardTitle className="text-sm font-semibold">
                                {schedule.age}
                              </CardTitle>
                              <CardDescription className="text-xs">
                                {schedule.vaccines.length} vaccine
                                {schedule.vaccines.length > 1 ? "s" : ""}
                              </CardDescription>
                            </div>
                          </div>

                          {isCurrent && (
                            <Badge className="bg-blue-100 text-blue-700 text-xs">
                              {t("dueNow")}
                            </Badge>
                          )}
                          {isUpcoming && (
                            <Badge variant="outline" className="text-xs text-muted-foreground">
                              {t("upcoming")}
                            </Badge>
                          )}
                          {isPast && allChecked && (
                            <Badge className="bg-green-100 text-green-700 text-xs">
                              <Check className="mr-0.5 h-3 w-3" />
                              {t("done")}
                            </Badge>
                          )}
                        </div>
                      </CardHeader>

                      <CardContent className="pt-0">
                        <div className="space-y-2">
                          {schedule.vaccines.map((vaccine) => {
                            const isChecked = checkedVaccines.has(vaccine.id);
                            return (
                              <motion.button
                                key={vaccine.id}
                                onClick={() => toggleVaccine(vaccine.id)}
                                whileTap={{ scale: 0.98 }}
                                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all ${
                                  isChecked
                                    ? "bg-green-50"
                                    : "bg-muted/20 hover:bg-muted/40"
                                }`}
                              >
                                <div
                                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all ${
                                    isChecked
                                      ? "border-green-500 bg-green-500"
                                      : "border-muted-foreground/30"
                                  }`}
                                >
                                  <AnimatePresence>
                                    {isChecked && (
                                      <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                      >
                                        <Check className="h-3 w-3 text-white" />
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>

                                <div className="flex-1 flex items-center gap-2">
                                  <Syringe
                                    className={`h-3.5 w-3.5 ${
                                      isChecked
                                        ? "text-green-500"
                                        : "text-muted-foreground"
                                    }`}
                                  />
                                  <span
                                    className={`text-sm ${
                                      isChecked
                                        ? "text-green-700 line-through decoration-green-300"
                                        : "text-foreground"
                                    }`}
                                  >
                                    {vaccine.name}
                                  </span>
                                </div>
                              </motion.button>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>

            {/* Source note */}
            <div className="mt-6 rounded-xl bg-blue-50/50 border border-blue-100 px-4 py-3">
              <p className="text-center text-xs text-blue-600 leading-relaxed">
                {t("vaccinesSource")}
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
