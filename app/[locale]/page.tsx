"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import {
  Heart,
  MapPin,
  Baby,
  Users,
  Gift,
  ShoppingBag,
  Apple,
  Scale,
  AlertTriangle,
  ArrowRight,
  Stethoscope,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/shared/animated-section";

const features = [
  { icon: Baby, key: "featureTracker", descKey: "featureTrackerDesc", href: "/tracker", color: "text-pink-500 bg-pink-50" },
  { icon: Stethoscope, key: "featureDirectory", descKey: "featureDirectoryDesc", href: "/directory", color: "text-teal-600 bg-teal-50" },
  { icon: AlertTriangle, key: "featureEmergency", descKey: "featureEmergencyDesc", href: "/emergency", color: "text-red-500 bg-red-50" },
  { icon: Activity, key: "featurePPD", descKey: "featurePPDDesc", href: "/postpartum", color: "text-purple-500 bg-purple-50" },
  { icon: Users, key: "featureForum", descKey: "featureForumDesc", href: "/forum", color: "text-blue-500 bg-blue-50" },
  { icon: Gift, key: "featureDonations", descKey: "featureDonationsDesc", href: "/donate", color: "text-orange-500 bg-orange-50" },
  { icon: Apple, key: "featureFood", descKey: "featureFoodDesc", href: "/food-guide", color: "text-green-500 bg-green-50" },
  { icon: Scale, key: "featureRights", descKey: "featureRightsDesc", href: "/rights", color: "text-indigo-500 bg-indigo-50" },
];

const stats = [
  { value: "19,000+", key: "statsBirths" },
  { value: "50+", key: "statsProviders" },
  { value: "3", key: "statsLanguages" },
  { value: "100%", key: "statsFree" },
];

const sponsors = ["CityPharm", "Apollo Bramwell", "Babyland", "Swan Insurance"];

export default function HomePage() {
  const t = useTranslations("home");
  const locale = useLocale();

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-pink-light via-background to-brand-teal-light" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium">
              <Heart className="mr-1.5 h-3.5 w-3.5 text-primary" />
              The first pregnancy platform for Mauritius
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="mx-auto max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <span className="bg-gradient-to-r from-primary via-brand-pink-dark to-secondary bg-clip-text text-transparent">
              {t("heroTitle")}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl"
          >
            {t("heroSubtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Button size="lg" className="group h-12 px-8 text-base bg-primary hover:bg-brand-pink-dark" render={<Link href={`/${locale}/register`} />}>
              {t("heroCta")}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base" render={<Link href={`/${locale}/directory`} />}>
              <MapPin className="mr-2 h-4 w-4" />
              {t("heroSecondary")}
            </Button>
          </motion.div>

          {/* Floating badges */}
          <div className="relative mt-16 hidden md:block">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-4 top-0"
            >
              <Badge className="bg-white text-foreground shadow-lg border">
                <Baby className="mr-1 h-3 w-3 text-primary" /> Week-by-week tracker
              </Badge>
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute right-10 top-4"
            >
              <Badge className="bg-white text-foreground shadow-lg border">
                <Heart className="mr-1 h-3 w-3 text-red-500" /> PPD support
              </Badge>
            </motion.div>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute left-1/4 top-12"
            >
              <Badge className="bg-white text-foreground shadow-lg border">
                <MapPin className="mr-1 h-3 w-3 text-teal-600" /> 50+ providers
              </Badge>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <StaggerContainer className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <StaggerItem key={stat.key} className="text-center">
                <div className="text-3xl font-bold text-primary sm:text-4xl">{stat.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{t(stat.key)}</div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <AnimatedSection className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t("featuresTitle")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              {t("featuresSubtitle")}
            </p>
          </AnimatedSection>

          <StaggerContainer className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <StaggerItem key={feature.key}>
                  <Link href={`/${locale}${feature.href}`}>
                    <Card className="group relative h-full overflow-hidden border-border/50 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
                      <CardContent className="p-6">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.color}`}
                        >
                          <Icon className="h-6 w-6" />
                        </motion.div>
                        <h3 className="mt-4 font-semibold">{t(feature.key)}</h3>
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                          {t(feature.descKey)}
                        </p>
                        <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                          Learn more <ArrowRight className="ml-1 h-3.5 w-3.5" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Sponsors */}
      <section className="border-y bg-muted/30 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <AnimatedSection className="text-center">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              {t("sponsorTitle")}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
              {sponsors.map((sponsor) => (
                <motion.div
                  key={sponsor}
                  whileHover={{ scale: 1.05 }}
                  className="text-lg font-semibold text-muted-foreground/60 transition-colors hover:text-muted-foreground"
                >
                  {sponsor}
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <AnimatedSection>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-brand-pink-dark px-6 py-16 text-center sm:px-12 sm:py-20">
              <div className="absolute inset-0">
                <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
              </div>
              <div className="relative">
                <h2 className="text-3xl font-bold text-white sm:text-4xl">
                  {t("ctaTitle")}
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
                  {t("ctaSubtitle")}
                </p>
                <Button
                  size="lg"
                  className="mt-8 h-12 bg-white px-8 text-base text-primary hover:bg-white/90"
                  render={<Link href={`/${locale}/register`} />}
                >
                  {t("ctaButton")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
