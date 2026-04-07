"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Scale,
  Calendar,
  Shield,
  Baby,
  Stethoscope,
  ChevronDown,
  ChevronUp,
  Phone,
  ExternalLink,
  BookOpen,
  AlertCircle,
  CheckCircle2,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/shared/animated-section";

const rightsData = [
  {
    id: "leave",
    icon: Calendar,
    color: "text-pink-500",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200",
    tTitleKey: "leaveTitle" as const,
    tDescKey: "leaveDesc" as const,
    detailKeys: [
      "leaveDetail1" as const,
      "leaveDetail2" as const,
      "leaveDetail3" as const,
      "leaveDetail4" as const,
      "leaveDetail5" as const,
    ],
    legalRefKey: "leaveLegalRef" as const,
  },
  {
    id: "protection",
    icon: Shield,
    color: "text-teal-600",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200",
    tTitleKey: "protectionTitle" as const,
    tDescKey: "protectionDesc" as const,
    detailKeys: [
      "protectionDetail1" as const,
      "protectionDetail2" as const,
      "protectionDetail3" as const,
      "protectionDetail4" as const,
      "protectionDetail5" as const,
    ],
    legalRefKey: "protectionLegalRef" as const,
  },
  {
    id: "breastfeeding",
    icon: Baby,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    tTitleKey: "breastfeedingTitle" as const,
    tDescKey: "breastfeedingDesc" as const,
    detailKeys: [
      "breastfeedingDetail1" as const,
      "breastfeedingDetail2" as const,
      "breastfeedingDetail3" as const,
      "breastfeedingDetail4" as const,
      "breastfeedingDetail5" as const,
    ],
    legalRefKey: "breastfeedingLegalRef" as const,
  },
  {
    id: "medical",
    icon: Stethoscope,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    tTitleKey: "medicalTitle" as const,
    tDescKey: "medicalDesc" as const,
    detailKeys: [
      "medicalDetail1" as const,
      "medicalDetail2" as const,
      "medicalDetail3" as const,
      "medicalDetail4" as const,
      "medicalDetail5" as const,
    ],
    legalRefKey: "medicalLegalRef" as const,
  },
];

const faqKeys = [
  { questionKey: "faqQuestion1" as const, answerKey: "faqAnswer1" as const },
  { questionKey: "faqQuestion2" as const, answerKey: "faqAnswer2" as const },
  { questionKey: "faqQuestion3" as const, answerKey: "faqAnswer3" as const },
  { questionKey: "faqQuestion4" as const, answerKey: "faqAnswer4" as const },
  { questionKey: "faqQuestion5" as const, answerKey: "faqAnswer5" as const },
  { questionKey: "faqQuestion6" as const, answerKey: "faqAnswer6" as const },
];

export default function RightsPage() {
  const t = useTranslations("rights");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [expandedRight, setExpandedRight] = useState<string | null>("leave");

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-pink-light/30 via-background to-background">
      {/* Hero */}
      <section className="border-b bg-white/50 backdrop-blur-sm">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
          <AnimatedSection>
            <div className="text-center">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50"
              >
                <Scale className="h-8 w-8 text-indigo-500" />
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

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        {/* Emergency Contact */}
        <AnimatedSection>
          <Card className="border-amber-200 bg-amber-50/50">
            <CardContent className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4">
              <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5 sm:mt-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-amber-800">
                  {t("emergencyContact")}
                </p>
                <p className="text-xs text-amber-700/80 mt-0.5">
                  {t("emergencyContactDesc")}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 border-amber-300 text-amber-800 hover:bg-amber-100 shrink-0"
              >
                <Phone className="h-3.5 w-3.5" />
                207 2600
              </Button>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Rights Cards */}
        <StaggerContainer className="mt-8 grid gap-4 sm:grid-cols-2">
          {rightsData.map((right) => {
            const Icon = right.icon;
            const isExpanded = expandedRight === right.id;
            return (
              <StaggerItem key={right.id}>
                <Card
                  className={`h-full border transition-all duration-300 ${right.borderColor} ${
                    isExpanded ? "shadow-md" : "hover:shadow-sm"
                  }`}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${right.bgColor}`}
                      >
                        <Icon className={`h-6 w-6 ${right.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h2 className="font-semibold">{t(right.tTitleKey)}</h2>
                        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                          {t(right.tDescKey)}
                        </p>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-3 w-full gap-1.5 justify-between"
                      onClick={() =>
                        setExpandedRight(isExpanded ? null : right.id)
                      }
                    >
                      <span className="text-xs">
                        {isExpanded ? t("lessDetails") : t("moreDetails")}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>

                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-2"
                      >
                        <Separator className="mb-3" />
                        <ul className="space-y-2">
                          {right.detailKeys.map((detailKey, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm"
                            >
                              <CheckCircle2
                                className={`h-4 w-4 mt-0.5 shrink-0 ${right.color}`}
                              />
                              <span className="text-foreground/85">
                                {t(detailKey)}
                              </span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                          <BookOpen className="h-3 w-3" />
                          <span>{t(right.legalRefKey)}</span>
                        </div>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Source Citation */}
        <AnimatedSection delay={0.3} className="mt-8">
          <Card className="border-border/50 bg-muted/30">
            <CardContent className="flex items-start gap-3 p-4">
              <Info className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium">{t("source")}</p>
                <a
                  href="https://labour.govmu.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-1 text-xs text-primary hover:underline"
                >
                  labour.govmu.org
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* FAQ Section */}
        <AnimatedSection delay={0.4} className="mt-10">
          <h2 className="text-2xl font-bold text-center mb-2">
            {t("faqTitle")}
          </h2>
          <p className="text-center text-muted-foreground text-sm mb-6">
            {t("faqSubtitle")}
          </p>
        </AnimatedSection>

        <div className="space-y-3">
          {faqKeys.map((faq, index) => {
            const isOpen = expandedFaq === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.5 + 0.05 * index,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
              >
                <Card className="border-border/50">
                  <CardContent className="p-0">
                    <button
                      className="flex w-full items-start gap-3 p-4 text-left"
                      onClick={() => setExpandedFaq(isOpen ? null : index)}
                    >
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{t(faq.questionKey)}</h3>
                      </div>
                      {isOpen ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                      )}
                    </button>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="px-4 pb-4"
                      >
                        <Separator className="mb-3" />
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {t(faq.answerKey)}
                        </p>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <AnimatedSection delay={0.7} className="mt-10">
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardContent className="p-6 text-center">
              <Scale className="mx-auto h-8 w-8 text-primary" />
              <h3 className="mt-3 text-lg font-semibold">
                {t("ctaTitle")}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
                {t("ctaDesc")}
              </p>
              <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button className="gap-2 bg-primary hover:bg-brand-pink-dark">
                  <Phone className="h-4 w-4" />
                  {t("ctaCall")}
                </Button>
                <Button variant="outline" className="gap-2">
                  <ExternalLink className="h-4 w-4" />
                  {t("ctaWebsite")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
    </div>
  );
}
