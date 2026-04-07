"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  Phone,
  Navigation,
  MapPin,
  Clock,
  Shield,
  Siren,
  Hospital,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/shared/animated-section";

interface HospitalInfo {
  id: string;
  name: string;
  district: string;
  address: string;
  phone: string;
  type: "public" | "private";
  hasMaternityWard: boolean;
  hasNICU: boolean;
  distancePlaceholder: string;
  openHours: string;
}

const hospitals: HospitalInfo[] = [
  {
    id: "jeetoo",
    name: "Dr. A.G. Jeetoo Hospital",
    district: "Port Louis",
    address: "Volcy Pougnet St, Port Louis",
    phone: "+230 212 3201",
    type: "public",
    hasMaternityWard: true,
    hasNICU: true,
    distancePlaceholder: "~3.2 km",
    openHours: "24/7 Emergency",
  },
  {
    id: "victoria",
    name: "Victoria Hospital",
    district: "Candos",
    address: "Candos, Quatre Bornes",
    phone: "+230 425 3031",
    type: "public",
    hasMaternityWard: true,
    hasNICU: true,
    distancePlaceholder: "~5.8 km",
    openHours: "24/7 Emergency",
  },
  {
    id: "ssrn",
    name: "SSRN Hospital",
    district: "Pamplemousses",
    address: "Pamplemousses",
    phone: "+230 243 3661",
    type: "public",
    hasMaternityWard: true,
    hasNICU: true,
    distancePlaceholder: "~12.4 km",
    openHours: "24/7 Emergency",
  },
  {
    id: "nehru",
    name: "Jawaharlal Nehru Hospital",
    district: "Rose Belle",
    address: "Rose Belle",
    phone: "+230 603 7000",
    type: "public",
    hasMaternityWard: true,
    hasNICU: true,
    distancePlaceholder: "~18.1 km",
    openHours: "24/7 Emergency",
  },
  {
    id: "flacq",
    name: "Flacq Hospital",
    district: "Flacq",
    address: "Centre de Flacq",
    phone: "+230 413 2532",
    type: "public",
    hasMaternityWard: true,
    hasNICU: false,
    distancePlaceholder: "~22.6 km",
    openHours: "24/7 Emergency",
  },
  {
    id: "ccare",
    name: "C-Care Clinic (Darne)",
    district: "Floreal",
    address: "Georges Guibert St, Floreal",
    phone: "+230 601 2300",
    type: "private",
    hasMaternityWard: true,
    hasNICU: true,
    distancePlaceholder: "~7.3 km",
    openHours: "24/7 Emergency",
  },
  {
    id: "apollo",
    name: "Apollo Bramwell Hospital",
    district: "Moka",
    address: "Royal Road, Moka",
    phone: "+230 605 1000",
    type: "private",
    hasMaternityWard: true,
    hasNICU: true,
    distancePlaceholder: "~9.5 km",
    openHours: "24/7 Emergency",
  },
  {
    id: "wellkin",
    name: "Wellkin Hospital",
    district: "Moka",
    address: "Hillcrest, Moka",
    phone: "+230 605 1900",
    type: "private",
    hasMaternityWard: true,
    hasNICU: true,
    distancePlaceholder: "~10.1 km",
    openHours: "24/7 Emergency",
  },
];

const emergencyNumbers = [
  { nameKey: "samuAmbulance" as const, number: "114", primary: true },
  { nameKey: "police" as const, number: "999", primary: false },
  { nameKey: "fireBrigade" as const, number: "115", primary: false },
  { nameKey: "sosDetresse" as const, number: "800 93 93", primary: false },
];

export default function EmergencyPage() {
  const t = useTranslations("emergency");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="min-h-screen">
      {/* Red urgency header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-500 to-red-700">
        <div className="absolute inset-0">
          <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-red-900/20 blur-3xl" />
          {/* Pulsing circle background */}
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.05, 0.1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-white/10"
          />
        </div>

        <div className="relative mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm"
            >
              <Siren className="h-8 w-8 text-white" />
            </motion.div>

            <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-3 text-lg text-white/80">
              {t("subtitle")}
            </p>
          </motion.div>

          {/* BIG ambulance button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8"
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <a
                href="tel:114"
                className="group relative mx-auto flex h-20 max-w-md items-center justify-center gap-3 rounded-2xl bg-white text-red-600 shadow-2xl shadow-red-900/30 transition-all hover:shadow-red-900/40 sm:h-24"
              >
                {/* Pulse ring */}
                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.4, 0, 0.4],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                  className="absolute inset-0 rounded-2xl border-2 border-white/60"
                />
                <Phone className="h-7 w-7 sm:h-8 sm:w-8" />
                <span className="text-xl font-bold sm:text-2xl md:text-3xl">
                  {t("callAmbulance")}
                </span>
              </a>
            </motion.div>
          </motion.div>

          {/* Other emergency numbers */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-3"
          >
            {emergencyNumbers
              .filter((n) => !n.primary)
              .map((num) => (
                <a
                  key={num.number}
                  href={`tel:${num.number.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/25"
                >
                  <Phone className="h-3.5 w-3.5" />
                  {t(num.nameKey)}: {num.number}
                </a>
              ))}
          </motion.div>
        </div>
      </section>

      {/* Disclaimer banner */}
      <div className="border-b border-red-200 bg-red-50">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2 text-sm text-red-700">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <p className="font-medium">{t("disclaimer")}</p>
          </div>
        </div>
      </div>

      {/* Hospitals list */}
      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16">
        <AnimatedSection>
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <Hospital className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold sm:text-2xl">
                {t("hospitalsTitle")}
              </h2>
              <p className="text-sm text-muted-foreground">
                {t("facilitiesCount", { count: hospitals.length })}
              </p>
            </div>
          </div>
        </AnimatedSection>

        <StaggerContainer className="space-y-3">
          {hospitals.map((hospital) => {
            const isExpanded = expandedId === hospital.id;

            return (
              <StaggerItem key={hospital.id}>
                <motion.div whileHover={{ x: 2 }} transition={{ duration: 0.15 }}>
                  <Card
                    className={`overflow-hidden transition-all duration-300 ${
                      isExpanded
                        ? "border-red-200 shadow-md shadow-red-100"
                        : "border-border/50 hover:border-red-200/60"
                    }`}
                  >
                    <CardContent className="p-0">
                      {/* Main row */}
                      <button
                        onClick={() =>
                          setExpandedId(isExpanded ? null : hospital.id)
                        }
                        className="flex w-full items-center gap-4 p-4 text-left sm:p-5"
                      >
                        {/* Icon */}
                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                            hospital.type === "private"
                              ? "bg-amber-50 text-amber-600"
                              : "bg-red-50 text-red-600"
                          }`}
                        >
                          <Hospital className="h-6 w-6" />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-semibold truncate">
                              {hospital.name}
                            </h3>
                            <Badge
                              variant={
                                hospital.type === "private"
                                  ? "outline"
                                  : "secondary"
                              }
                              className="shrink-0 text-[10px]"
                            >
                              {hospital.type === "private"
                                ? t("private")
                                : t("public")}
                            </Badge>
                          </div>
                          <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5" />
                              {hospital.district}
                            </span>
                            <span className="flex items-center gap-1">
                              <Navigation className="h-3.5 w-3.5" />
                              {hospital.distancePlaceholder}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              {t("emergencyHours")}
                            </span>
                          </div>
                        </div>

                        {/* Expand chevron */}
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="shrink-0 text-muted-foreground"
                        >
                          <ChevronDown className="h-5 w-5" />
                        </motion.div>
                      </button>

                      {/* Expanded content */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="border-t px-4 py-4 sm:px-5">
                              <div className="flex flex-wrap gap-2 mb-4">
                                {hospital.hasMaternityWard && (
                                  <Badge
                                    variant="secondary"
                                    className="bg-pink-50 text-pink-700"
                                  >
                                    <Heart className="mr-1 h-3 w-3" />
                                    {t("maternityWard")}
                                  </Badge>
                                )}
                                {hospital.hasNICU && (
                                  <Badge
                                    variant="secondary"
                                    className="bg-blue-50 text-blue-700"
                                  >
                                    <Shield className="mr-1 h-3 w-3" />
                                    {t("nicu")}
                                  </Badge>
                                )}
                              </div>

                              <p className="text-sm text-muted-foreground mb-4">
                                {hospital.address}
                              </p>

                              <div className="flex flex-col gap-2 sm:flex-row">
                                <motion.div
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  className="flex-1"
                                >
                                  <Button
                                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                                    render={
                                      <a
                                        href={`tel:${hospital.phone.replace(/\s/g, "")}`}
                                      />
                                    }
                                  >
                                    <Phone className="mr-2 h-4 w-4" />
                                    {t("callHospital")} {hospital.phone}
                                  </Button>
                                </motion.div>
                                <motion.div
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  className="flex-1"
                                >
                                  <Button
                                    variant="outline"
                                    className="w-full border-red-200 text-red-700 hover:bg-red-50"
                                    render={
                                      <a
                                        href={`https://maps.google.com/?q=${encodeURIComponent(hospital.name + " " + hospital.address + " Mauritius")}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      />
                                    }
                                  >
                                    <Navigation className="mr-2 h-4 w-4" />
                                    {t("directions")}
                                  </Button>
                                </motion.div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Bottom disclaimer */}
        <AnimatedSection delay={0.3}>
          <div className="mt-12 rounded-2xl border border-red-200 bg-red-50/50 p-6 text-center">
            <AlertTriangle className="mx-auto h-8 w-8 text-red-500" />
            <p className="mt-3 text-sm font-medium text-red-700">
              {t("disclaimer")}
            </p>
            <p className="mt-2 text-xs text-red-500">
              {t("distanceDisclaimer")}
            </p>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-4"
            >
              <a
                href="tel:114"
                className="inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-200 transition-all hover:bg-red-700 hover:shadow-red-300"
              >
                <Phone className="h-4 w-4" />
                {t("callAmbulance")}
              </a>
            </motion.div>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}
