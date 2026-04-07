"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { SponsorBanner } from "@/components/shared/sponsor-banner";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MapPin,
  Phone,
  BadgeCheck,
  Stethoscope,
  Heart,
  Camera,
  Baby,
  Flower2,
  HandHeart,
  ChevronDown,
  ArrowRight,
  Filter,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/shared/animated-section";

type ProviderType =
  | "gynaecologist"
  | "midwife"
  | "counsellor"
  | "photographer"
  | "lactation"
  | "massage";

type District =
  | "Port Louis"
  | "Curepipe"
  | "Rose Hill"
  | "Vacoas"
  | "Flacq"
  | "Mahebourg";

interface Provider {
  id: string;
  name: string;
  type: ProviderType;
  district: District;
  address: string;
  phone: string;
  verified: boolean;
  description: string;
  rating: number;
  reviewCount: number;
  image: string;
}

const typeIcons: Record<ProviderType, React.ElementType> = {
  gynaecologist: Stethoscope,
  midwife: Baby,
  counsellor: HandHeart,
  photographer: Camera,
  lactation: Heart,
  massage: Flower2,
};

const typeColors: Record<ProviderType, string> = {
  gynaecologist: "text-pink-600 bg-pink-50",
  midwife: "text-teal-600 bg-teal-50",
  counsellor: "text-purple-600 bg-purple-50",
  photographer: "text-amber-600 bg-amber-50",
  lactation: "text-rose-600 bg-rose-50",
  massage: "text-green-600 bg-green-50",
};

const providers: Provider[] = [
  {
    id: "dr-anisha-doorgakant",
    name: "Dr. Anisha Doorgakant",
    type: "gynaecologist",
    district: "Curepipe",
    address: "Royal Road, Curepipe 74401",
    phone: "+230 674 1234",
    verified: true,
    description:
      "Experienced gynaecologist-obstetrician with 15 years of practice. Specialises in high-risk pregnancies and prenatal care.",
    rating: 4.8,
    reviewCount: 127,
    image: "/providers/anisha.jpg",
  },
  {
    id: "dr-rajesh-doobur",
    name: "Dr. Rajesh Doobur",
    type: "gynaecologist",
    district: "Port Louis",
    address: "Sir William Newton St, Port Louis",
    phone: "+230 212 5678",
    verified: true,
    description:
      "Consultant obstetrician and gynaecologist at City Clinic. Expert in laparoscopic surgery and fertility treatments.",
    rating: 4.9,
    reviewCount: 203,
    image: "/providers/rajesh.jpg",
  },
  {
    id: "marie-claire-lamy",
    name: "Marie-Claire Lamy",
    type: "midwife",
    district: "Rose Hill",
    address: "Avenue des Roses, Rose Hill 71368",
    phone: "+230 464 3456",
    verified: true,
    description:
      "Certified nurse-midwife offering home birth support and prenatal classes. Fluent in English, French, and Kreol.",
    rating: 4.7,
    reviewCount: 89,
    image: "/providers/marie-claire.jpg",
  },
  {
    id: "priya-ramgoolam",
    name: "Priya Ramgoolam",
    type: "midwife",
    district: "Vacoas",
    address: "John Kennedy Ave, Vacoas",
    phone: "+230 696 7890",
    verified: true,
    description:
      "Independent midwife specialising in natural birthing techniques and postnatal home visits across the Plaines Wilhems district.",
    rating: 4.6,
    reviewCount: 64,
    image: "/providers/priya.jpg",
  },
  {
    id: "dr-nadia-bholah",
    name: "Dr. Nadia Bholah",
    type: "counsellor",
    district: "Port Louis",
    address: "Edith Cavell St, Port Louis",
    phone: "+230 213 4567",
    verified: true,
    description:
      "Clinical psychologist specialising in perinatal mental health and postpartum depression. Bilingual consultations.",
    rating: 4.9,
    reviewCount: 156,
    image: "/providers/nadia.jpg",
  },
  {
    id: "kevin-wong",
    name: "Kevin Wong Photography",
    type: "photographer",
    district: "Curepipe",
    address: "Chasteauneuf St, Curepipe",
    phone: "+230 5987 1234",
    verified: false,
    description:
      "Award-winning maternity and newborn photographer. Specialises in intimate studio sessions and outdoor shoots at Trou aux Cerfs.",
    rating: 4.8,
    reviewCount: 78,
    image: "/providers/kevin.jpg",
  },
  {
    id: "fatima-joonas",
    name: "Fatima Joonas",
    type: "lactation",
    district: "Flacq",
    address: "Royal Road, Centre de Flacq",
    phone: "+230 413 8901",
    verified: true,
    description:
      "International Board Certified Lactation Consultant (IBCLC). Offers in-home breastfeeding support and group workshops.",
    rating: 4.7,
    reviewCount: 92,
    image: "/providers/fatima.jpg",
  },
  {
    id: "sandrine-legoff",
    name: "Sandrine Le Goff",
    type: "massage",
    district: "Mahebourg",
    address: "Rue de la Passe, Mahebourg",
    phone: "+230 631 5678",
    verified: false,
    description:
      "Certified prenatal massage therapist. Gentle techniques for pregnancy comfort, back pain relief, and relaxation.",
    rating: 4.5,
    reviewCount: 45,
    image: "/providers/sandrine.jpg",
  },
  {
    id: "dr-vikash-doorgakant",
    name: "Dr. Vikash Doorgakant",
    type: "gynaecologist",
    district: "Vacoas",
    address: "St Paul Ave, Phoenix",
    phone: "+230 697 2345",
    verified: true,
    description:
      "Senior consultant in obstetrics and gynaecology at Wellkin Hospital. Specialises in gestational diabetes management.",
    rating: 4.6,
    reviewCount: 98,
    image: "/providers/vikash.jpg",
  },
  {
    id: "aisha-curpen",
    name: "Aisha Curpen",
    type: "counsellor",
    district: "Rose Hill",
    address: "Vandermeersch St, Rose Hill",
    phone: "+230 454 6789",
    verified: true,
    description:
      "Certified family therapist with focus on pregnancy anxiety, birth trauma, and couples counselling during the perinatal period.",
    rating: 4.8,
    reviewCount: 67,
    image: "/providers/aisha.jpg",
  },
  {
    id: "jessica-ah-koon",
    name: "Jessica Ah-Koon",
    type: "photographer",
    district: "Mahebourg",
    address: "Coastal Road, Blue Bay",
    phone: "+230 5832 4567",
    verified: true,
    description:
      "Beach maternity and newborn photography specialist. Captures beautiful moments with the backdrop of Mauritius' stunning coastline.",
    rating: 4.9,
    reviewCount: 112,
    image: "/providers/jessica.jpg",
  },
  {
    id: "danielle-minerve",
    name: "Danielle Minerve",
    type: "massage",
    district: "Flacq",
    address: "Belle Mare Road, Flacq",
    phone: "+230 415 3456",
    verified: true,
    description:
      "Holistic prenatal massage and aromatherapy. Combines traditional Mauritian techniques with modern pregnancy wellness.",
    rating: 4.6,
    reviewCount: 53,
    image: "/providers/danielle.jpg",
  },
];

const districts: District[] = [
  "Port Louis",
  "Curepipe",
  "Rose Hill",
  "Vacoas",
  "Flacq",
  "Mahebourg",
];

const providerTypes: ProviderType[] = [
  "gynaecologist",
  "midwife",
  "counsellor",
  "photographer",
  "lactation",
  "massage",
];

export default function DirectoryPage() {
  const t = useTranslations("directory");
  const tc = useTranslations("common");
  const locale = useLocale();

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [districtFilter, setDistrictFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    return providers.filter((p) => {
      const matchesSearch =
        search === "" ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        t(p.type).toLowerCase().includes(search.toLowerCase()) ||
        p.district.toLowerCase().includes(search.toLowerCase());

      const matchesType = typeFilter === "all" || p.type === typeFilter;
      const matchesDistrict =
        districtFilter === "all" || p.district === districtFilter;

      return matchesSearch && matchesType && matchesDistrict;
    });
  }, [search, typeFilter, districtFilter, t]);

  const activeFilters =
    (typeFilter !== "all" ? 1 : 0) + (districtFilter !== "all" ? 1 : 0);

  function clearFilters() {
    setTypeFilter("all");
    setDistrictFilter("all");
    setSearch("");
  }

  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <section className="relative overflow-hidden border-b bg-gradient-to-br from-brand-teal-light via-background to-brand-pink-light">
        <div className="absolute inset-0">
          <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-center"
          >
            <Badge variant="secondary" className="mb-4 px-3 py-1">
              <Stethoscope className="mr-1 h-3 w-3" />
              {providers.length}+ {t("allTypes").toLowerCase()}
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              {t("title")}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              {t("subtitle")}
            </p>
          </motion.div>

          {/* Search and filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.15,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className="mx-auto mt-8 max-w-4xl"
          >
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={t("searchPlaceholder")}
                  className="h-10 pl-9 bg-background/80 backdrop-blur-sm"
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
              <div className="flex gap-2">
                <Select value={typeFilter} onValueChange={(val) => setTypeFilter(val ?? "all")}>
                  <SelectTrigger className="h-10 min-w-[160px] bg-background/80 backdrop-blur-sm">
                    <Filter className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
                    <SelectValue placeholder={t("filterType")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("allTypes")}</SelectItem>
                    {providerTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {t(type)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={districtFilter}
                  onValueChange={(val) => setDistrictFilter(val ?? "all")}
                >
                  <SelectTrigger className="h-10 min-w-[150px] bg-background/80 backdrop-blur-sm">
                    <MapPin className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
                    <SelectValue placeholder={t("filterDistrict")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("allDistricts")}</SelectItem>
                    {districts.map((d) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {activeFilters > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-3 flex items-center gap-2"
              >
                <span className="text-sm text-muted-foreground">
                  {filtered.length} {tc("noResults").split(" ")[0].toLowerCase()}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="h-7 text-xs"
                >
                  <X className="mr-1 h-3 w-3" />
                  Clear filters
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Results */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16">
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="py-20 text-center"
            >
              <Search className="mx-auto h-12 w-12 text-muted-foreground/40" />
              <p className="mt-4 text-lg font-medium text-muted-foreground">
                {tc("noResults")}
              </p>
              <Button
                variant="outline"
                onClick={clearFilters}
                className="mt-4"
              >
                Clear filters
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((provider) => {
                  const Icon = typeIcons[provider.type];
                  const colorClass = typeColors[provider.type];

                  return (
                    <StaggerItem key={provider.id}>
                      <Link href={`/${locale}/directory/${provider.id}`}>
                        <motion.div
                          whileHover={{ y: -4, scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Card className="group h-full cursor-pointer border-border/50 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                            <CardContent className="p-5">
                              <div className="flex items-start justify-between">
                                <div className="flex items-start gap-3">
                                  <div
                                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${colorClass} transition-transform group-hover:scale-110`}
                                  >
                                    <Icon className="h-5 w-5" />
                                  </div>
                                  <div className="min-w-0">
                                    <h3 className="font-semibold leading-tight truncate">
                                      {provider.name}
                                    </h3>
                                    <p className="mt-0.5 text-sm text-muted-foreground">
                                      {t(provider.type)}
                                    </p>
                                  </div>
                                </div>
                                {provider.verified && (
                                  <Badge
                                    variant="secondary"
                                    className="shrink-0 gap-1 bg-emerald-50 text-emerald-700"
                                  >
                                    <BadgeCheck className="h-3 w-3" />
                                    {t("verified")}
                                  </Badge>
                                )}
                              </div>

                              <p className="mt-3 line-clamp-2 text-sm text-muted-foreground leading-relaxed">
                                {provider.description}
                              </p>

                              <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3.5 w-3.5" />
                                  {provider.district}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Phone className="h-3.5 w-3.5" />
                                  {provider.phone}
                                </span>
                              </div>

                              {/* Rating */}
                              <div className="mt-3 flex items-center justify-between">
                                <div className="flex items-center gap-1">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <svg
                                      key={i}
                                      className={`h-3.5 w-3.5 ${
                                        i < Math.floor(provider.rating)
                                          ? "text-amber-400 fill-amber-400"
                                          : "text-gray-200 fill-gray-200"
                                      }`}
                                      viewBox="0 0 20 20"
                                    >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                  ))}
                                  <span className="ml-1 text-xs font-medium">
                                    {provider.rating}
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    ({provider.reviewCount})
                                  </span>
                                </div>
                                <span className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                                  {t("viewProfile")}
                                  <ArrowRight className="h-3 w-3" />
                                </span>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </Link>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sponsor placement */}
        <SponsorBanner category="clinic" variant="card" className="mt-10" />
      </section>
    </div>
  );
}
