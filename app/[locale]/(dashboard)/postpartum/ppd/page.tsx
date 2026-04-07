"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  ArrowLeft,
  ArrowRight,
  Phone,
  AlertTriangle,
  CheckCircle,
  Shield,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AnimatedSection } from "@/components/shared/animated-section";

/* ─── Edinburgh Postnatal Depression Scale (EPDS) ────────────────────── */

interface EPDSQuestion {
  id: number;
  text: string;
  options: string[];
  /** For questions 1, 2 and 4 scoring is 0,1,2,3.
   *  For reverse-scored questions (3,5-10) scoring is 3,2,1,0. */
  reverseScored: boolean;
}

const QUESTIONS: EPDSQuestion[] = [
  {
    id: 1,
    text: "I have been able to laugh and see the funny side of things",
    options: [
      "As much as I always could",
      "Not quite so much now",
      "Definitely not so much now",
      "Not at all",
    ],
    reverseScored: false,
  },
  {
    id: 2,
    text: "I have looked forward with enjoyment to things",
    options: [
      "As much as I ever did",
      "Rather less than I used to",
      "Definitely less than I used to",
      "Hardly at all",
    ],
    reverseScored: false,
  },
  {
    id: 3,
    text: "I have blamed myself unnecessarily when things went wrong",
    options: [
      "No, never",
      "Not very often",
      "Yes, some of the time",
      "Yes, most of the time",
    ],
    reverseScored: true,
  },
  {
    id: 4,
    text: "I have been anxious or worried for no good reason",
    options: [
      "No, not at all",
      "Hardly ever",
      "Yes, sometimes",
      "Yes, very often",
    ],
    reverseScored: true,
  },
  {
    id: 5,
    text: "I have felt scared or panicky for no very good reason",
    options: [
      "No, not at all",
      "No, not much",
      "Yes, sometimes",
      "Yes, quite a lot",
    ],
    reverseScored: true,
  },
  {
    id: 6,
    text: "Things have been getting on top of me",
    options: [
      "No, I have been coping as well as ever",
      "No, most of the time I have coped quite well",
      "Yes, sometimes I haven\u2019t been coping as well as usual",
      "Yes, most of the time I haven\u2019t been able to cope at all",
    ],
    reverseScored: true,
  },
  {
    id: 7,
    text: "I have been so unhappy that I have had difficulty sleeping",
    options: [
      "No, not at all",
      "Not very often",
      "Yes, sometimes",
      "Yes, most of the time",
    ],
    reverseScored: true,
  },
  {
    id: 8,
    text: "I have felt sad or miserable",
    options: [
      "No, not at all",
      "Not very often",
      "Yes, quite often",
      "Yes, most of the time",
    ],
    reverseScored: true,
  },
  {
    id: 9,
    text: "I have been so unhappy that I have been crying",
    options: [
      "No, never",
      "Only occasionally",
      "Yes, quite often",
      "Yes, most of the time",
    ],
    reverseScored: true,
  },
  {
    id: 10,
    text: "The thought of harming myself has occurred to me",
    options: [
      "Never",
      "Hardly ever",
      "Sometimes",
      "Yes, quite often",
    ],
    reverseScored: true,
  },
];

type ScoreCategory = "normal" | "monitor" | "atRisk" | "crisis";

function getScoreCategory(score: number): ScoreCategory {
  if (score <= 8) return "normal";
  if (score <= 12) return "monitor";
  if (score <= 19) return "atRisk";
  return "crisis";
}

function getOptionScore(
  optionIndex: number,
  reverseScored: boolean
): number {
  return reverseScored ? optionIndex : optionIndex;
}

/* ─── Page Component ─────────────────────────────────────────────────── */

export default function PPDCheckin() {
  const t = useTranslations("postpartum");
  const tc = useTranslations("common");
  const locale = useLocale();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(QUESTIONS.length).fill(null)
  );
  const [isCompleted, setIsCompleted] = useState(false);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

  const totalQuestions = QUESTIONS.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;
  const question = QUESTIONS[currentQuestion];
  const selectedOption = answers[currentQuestion];

  const handleSelectOption = useCallback(
    (optionIndex: number) => {
      setAnswers((prev) => {
        const next = [...prev];
        next[currentQuestion] = optionIndex;
        return next;
      });
    },
    [currentQuestion]
  );

  const goNext = useCallback(() => {
    if (currentQuestion < totalQuestions - 1) {
      setDirection(1);
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  }, [currentQuestion, totalQuestions]);

  const goPrev = useCallback(() => {
    if (currentQuestion > 0) {
      setDirection(-1);
      setCurrentQuestion((prev) => prev - 1);
    }
  }, [currentQuestion]);

  const restart = useCallback(() => {
    setAnswers(new Array(QUESTIONS.length).fill(null));
    setCurrentQuestion(0);
    setIsCompleted(false);
    setDirection(1);
  }, []);

  // Calculate total score
  const totalScore = answers.reduce<number>((sum, answer, idx) => {
    if (answer === null) return sum;
    return sum + getOptionScore(answer, QUESTIONS[idx].reverseScored);
  }, 0);

  const category = getScoreCategory(totalScore);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
    }),
  };

  /* ─── Results Screen ───────────────────────────────────────────────── */
  if (isCompleted) {
    return (
      <div className="min-h-screen">
        {/* Crisis banner -- ALWAYS visible at the top when score >= 20 */}
        {category === "crisis" && (
          <div className="border-b-2 border-red-300 bg-red-600 text-white">
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 px-4 py-5 text-center sm:flex-row sm:text-left">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/20">
                <Phone className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <p className="text-lg font-bold">
                  {t("crisisLine")}
                </p>
                <p className="mt-0.5 text-sm text-red-100">
                  {t("ppdCrisis")}
                </p>
              </div>
              <Button
                className="shrink-0 bg-white text-red-700 hover:bg-red-50 font-bold"
                render={<a href="tel:80093 93" />}
              >
                <Phone className="mr-2 h-4 w-4" />
                {t("callNow")}
              </Button>
            </div>
          </div>
        )}

        <div className="mx-auto max-w-2xl px-4 py-10 sm:py-16">
          <AnimatedSection>
            <div className="text-center">
              <Link
                href={`/${locale}/postpartum`}
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
              >
                <ArrowLeft className="mr-1.5 h-4 w-4" />
                {tc("back")}
              </Link>

              {/* Score Display */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
              >
                <div
                  className={`mx-auto flex h-28 w-28 items-center justify-center rounded-full ${
                    category === "normal"
                      ? "bg-green-100"
                      : category === "monitor"
                      ? "bg-yellow-100"
                      : category === "atRisk"
                      ? "bg-orange-100"
                      : "bg-red-100"
                  }`}
                >
                  <div className="text-center">
                    <span
                      className={`text-3xl font-bold ${
                        category === "normal"
                          ? "text-green-700"
                          : category === "monitor"
                          ? "text-yellow-700"
                          : category === "atRisk"
                          ? "text-orange-700"
                          : "text-red-700"
                      }`}
                    >
                      {totalScore}
                    </span>
                    <p className="text-xs text-muted-foreground">/30</p>
                  </div>
                </div>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 text-2xl font-bold"
              >
                {t("ppdScore")}
              </motion.h2>

              {/* Category Badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-3"
              >
                <Badge
                  className={`px-4 py-1.5 text-sm font-semibold ${
                    category === "normal"
                      ? "bg-green-100 text-green-800"
                      : category === "monitor"
                      ? "bg-yellow-100 text-yellow-800"
                      : category === "atRisk"
                      ? "bg-orange-100 text-orange-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {category === "normal" && (
                    <CheckCircle className="mr-1.5 h-4 w-4" />
                  )}
                  {category === "monitor" && (
                    <Info className="mr-1.5 h-4 w-4" />
                  )}
                  {category === "atRisk" && (
                    <AlertTriangle className="mr-1.5 h-4 w-4" />
                  )}
                  {category === "crisis" && (
                    <AlertTriangle className="mr-1.5 h-4 w-4" />
                  )}
                  {category === "normal" && t("scoreNormal")}
                  {category === "monitor" && t("scoreMonitor")}
                  {category === "atRisk" && t("scoreAtRisk")}
                  {category === "crisis" && t("scoreCrisis")}
                </Badge>
              </motion.div>
            </div>

            {/* Result Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8"
            >
              {/* Normal */}
              {category === "normal" && (
                <Card className="border-green-200 bg-green-50/50">
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <p className="text-base text-green-800 leading-relaxed">
                      {t("ppdNormal")}
                    </p>
                    <p className="mt-3 text-sm text-green-600">
                      {t("repeatRecommendation")}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Monitor */}
              {category === "monitor" && (
                <Card className="border-yellow-200 bg-yellow-50/50">
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
                      <Info className="h-6 w-6 text-yellow-600" />
                    </div>
                    <p className="text-base text-yellow-800 leading-relaxed">
                      {t("ppdMonitor")}
                    </p>
                    <div className="mt-5 space-y-2 text-sm text-yellow-700">
                      <p>{t("considerResources")}</p>
                      <ul className="space-y-1.5 text-left max-w-md mx-auto">
                        <li className="flex items-start gap-2">
                          <Heart className="mt-0.5 h-4 w-4 shrink-0 text-yellow-500" />
                          {t("talkToPartner")}
                        </li>
                        <li className="flex items-start gap-2">
                          <Heart className="mt-0.5 h-4 w-4 shrink-0 text-yellow-500" />
                          {t("speakWithMidwife")}
                        </li>
                        <li className="flex items-start gap-2">
                          <Heart className="mt-0.5 h-4 w-4 shrink-0 text-yellow-500" />
                          {t("joinSupportGroup")}
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* At Risk */}
              {category === "atRisk" && (
                <div className="space-y-4">
                  <Card className="border-orange-200 bg-orange-50/50">
                    <CardContent className="p-6 text-center">
                      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                        <AlertTriangle className="h-6 w-6 text-orange-600" />
                      </div>
                      <p className="text-base text-orange-800 leading-relaxed">
                        {t("ppdAtRisk")}
                      </p>
                      <div className="mt-5 space-y-3">
                        <Button
                          className="w-full bg-orange-600 hover:bg-orange-700 text-white h-11"
                          render={<a href="tel:80093 93" />}
                        >
                          <Phone className="mr-2 h-4 w-4" />
                          {t("crisisLine")}
                        </Button>
                        <p className="text-sm text-orange-600">
                          {t("mentalHealthMatters")}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* CRISIS -- Most prominent */}
              {category === "crisis" && (
                <div className="space-y-4">
                  {/* Primary crisis card */}
                  <Card className="border-2 border-red-400 bg-red-50">
                    <CardContent className="p-6 text-center">
                      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
                        <AlertTriangle className="h-7 w-7 text-red-600" />
                      </div>
                      <p className="text-lg font-semibold text-red-800">
                        {t("ppdCrisis")}
                      </p>
                      <p className="mt-2 text-base text-red-700">
                        {t("notAlone")}
                      </p>
                      <div className="mt-5 space-y-3">
                        <Button
                          className="w-full bg-red-600 hover:bg-red-700 text-white h-12 text-base font-bold"
                          render={<a href="tel:80093 93" />}
                        >
                          <Phone className="mr-2 h-5 w-5" />
                          {t("crisisLine")}
                        </Button>
                        <p className="text-sm text-red-600 font-medium">
                          {t("freeConfidential")}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Additional emergency contacts */}
                  <Card className="border-red-200 bg-red-50/50">
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-red-800 mb-3">
                        {t("additionalEmergencyContacts")}
                      </h3>
                      <ul className="space-y-2 text-sm text-red-700">
                        <li className="flex items-center gap-2">
                          <Phone className="h-4 w-4 shrink-0" />
                          <span>Emergency: <strong>999</strong></span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Phone className="h-4 w-4 shrink-0" />
                          <span>SAMU: <strong>114</strong></span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Shield className="h-4 w-4 shrink-0" />
                          <span>{t("goToNearestHospital")}</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              )}
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center"
            >
              <Button variant="outline" onClick={restart} className="h-10">
                {t("retakeCheckin")}
              </Button>
              <Button variant="outline" className="h-10" render={<Link href={`/${locale}/postpartum`} />}>
                <ArrowLeft className="mr-1.5 h-4 w-4" />
                {t("backToDashboard")}
              </Button>
            </motion.div>

            {/* Disclaimer */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-8 text-center text-xs text-muted-foreground max-w-lg mx-auto leading-relaxed"
            >
              {t("disclaimerEPDS")}
            </motion.p>
          </AnimatedSection>
        </div>
      </div>
    );
  }

  /* ─── Question Screen ──────────────────────────────────────────────── */
  return (
    <div className="min-h-screen">
      {/* Soft gradient header */}
      <div className="relative overflow-hidden border-b bg-gradient-to-br from-brand-pink-light/50 via-background to-brand-teal-light/30">
        <div className="mx-auto max-w-2xl px-4 py-6 sm:py-8">
          <Link
            href={`/${locale}/postpartum`}
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-1.5 h-4 w-4" />
            {tc("back")}
          </Link>

          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="h-5 w-5 text-primary" />
              <h1 className="text-xl font-bold sm:text-2xl">{t("ppdTitle")}</h1>
            </div>
            <p className="text-sm text-muted-foreground">
              {t("ppdSubtitle")}
            </p>
          </div>

          {/* Progress */}
          <div className="mt-5">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">
                {t("ppdQuestion")} {currentQuestion + 1} {t("ppdOf")} {totalQuestions}
              </span>
              <span className="font-medium text-primary">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="mx-auto max-w-2xl px-4 py-8 sm:py-12">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentQuestion}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            {/* Question number indicator */}
            <div className="mb-4 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {question.id}
              </span>
              {question.id === 10 && (
                <Badge className="bg-rose-100 text-rose-700 text-xs">
                  <Shield className="mr-1 h-3 w-3" />
                  {t("important")}
                </Badge>
              )}
            </div>

            {/* Question text */}
            <h2 className="text-lg font-semibold leading-relaxed text-foreground sm:text-xl">
              {question.text}
            </h2>

            {/* Options */}
            <div className="mt-6 space-y-3">
              {question.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                return (
                  <motion.button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`w-full rounded-xl border-2 px-5 py-4 text-left text-sm transition-all duration-200 sm:text-base ${
                      isSelected
                        ? "border-primary bg-primary/5 text-foreground shadow-sm"
                        : "border-border/60 bg-card text-muted-foreground hover:border-primary/30 hover:bg-muted/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                          isSelected
                            ? "border-primary bg-primary"
                            : "border-muted-foreground/30"
                        }`}
                      >
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="h-2 w-2 rounded-full bg-white"
                          />
                        )}
                      </div>
                      <span
                        className={
                          isSelected
                            ? "font-medium text-foreground"
                            : ""
                        }
                      >
                        {option}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={goPrev}
            disabled={currentQuestion === 0}
            className="h-10 gap-1.5"
          >
            <ArrowLeft className="h-4 w-4" />
            {tc("back")}
          </Button>

          <Button
            onClick={goNext}
            disabled={selectedOption === null}
            className="h-10 gap-1.5 bg-primary hover:bg-brand-pink-dark"
          >
            {currentQuestion === totalQuestions - 1 ? (
              <>
                {tc("submit")}
                <CheckCircle className="h-4 w-4" />
              </>
            ) : (
              <>
                {tc("next")}
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>

        {/* Question dots indicator */}
        <div className="mt-8 flex justify-center gap-1.5">
          {QUESTIONS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (answers[idx] !== null || idx <= currentQuestion) {
                  setDirection(idx > currentQuestion ? 1 : -1);
                  setCurrentQuestion(idx);
                }
              }}
              className={`h-2 rounded-full transition-all duration-200 ${
                idx === currentQuestion
                  ? "w-6 bg-primary"
                  : answers[idx] !== null
                  ? "w-2 bg-primary/40"
                  : "w-2 bg-muted-foreground/20"
              }`}
              aria-label={`Go to question ${idx + 1}`}
            />
          ))}
        </div>

        {/* Reassurance message */}
        <div className="mt-8 rounded-xl bg-muted/40 px-4 py-3">
          <p className="text-center text-xs text-muted-foreground leading-relaxed">
            {t("answersPrivate")}
          </p>
        </div>
      </div>
    </div>
  );
}
