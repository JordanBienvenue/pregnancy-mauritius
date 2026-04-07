"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BadgeCheck,
  Calendar,
  Clock,
  Mail,
  MapPin,
  Phone,
  Star,
  Stethoscope,
  Baby,
  HandHeart,
  Camera,
  Heart,
  Flower2,
  Navigation,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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

interface ProviderDetail {
  id: string;
  name: string;
  type: ProviderType;
  district: string;
  address: string;
  phone: string;
  email: string;
  verified: boolean;
  description: string;
  longDescription: string;
  rating: number;
  reviewCount: number;
  languages: string[];
  specialisations: string[];
  openingHours: { day: string; hours: string }[];
  reviews: {
    id: string;
    author: string;
    date: string;
    rating: number;
    text: string;
  }[];
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

const allProviders: Record<string, ProviderDetail> = {
  "dr-anisha-doorgakant": {
    id: "dr-anisha-doorgakant",
    name: "Dr. Anisha Doorgakant",
    type: "gynaecologist",
    district: "Curepipe",
    address: "Royal Road, Curepipe 74401, Mauritius",
    phone: "+230 674 1234",
    email: "dr.anisha@medclinic.mu",
    verified: true,
    description:
      "Experienced gynaecologist-obstetrician with 15 years of practice.",
    longDescription:
      "Dr. Anisha Doorgakant is a highly regarded gynaecologist-obstetrician practicing in Curepipe since 2011. She completed her MBBS at the University of Mauritius and specialised in Obstetrics & Gynaecology at the Royal College of Obstetricians and Gynaecologists (MRCOG) in London. She has a particular interest in high-risk pregnancies, gestational diabetes, and minimally invasive gynaecological surgery. Dr. Doorgakant is known for her patient-centred approach and takes time to explain every step of the pregnancy journey. She consults in English, French, and Kreol Morisien.",
    rating: 4.8,
    reviewCount: 127,
    languages: ["English", "French", "Kreol"],
    specialisations: [
      "High-risk pregnancies",
      "Gestational diabetes",
      "Prenatal screening",
      "Caesarean section",
      "Laparoscopic surgery",
    ],
    openingHours: [
      { day: "Monday", hours: "08:30 - 16:00" },
      { day: "Tuesday", hours: "08:30 - 16:00" },
      { day: "Wednesday", hours: "08:30 - 12:00" },
      { day: "Thursday", hours: "08:30 - 16:00" },
      { day: "Friday", hours: "08:30 - 16:00" },
      { day: "Saturday", hours: "09:00 - 12:00" },
      { day: "Sunday", hours: "Closed" },
    ],
    reviews: [
      {
        id: "r1",
        author: "Priya M.",
        date: "2026-03-15",
        rating: 5,
        text: "Dr. Anisha was absolutely wonderful throughout my pregnancy. She explained everything clearly and I always felt safe. She detected my gestational diabetes early which made all the difference. Highly recommend!",
      },
      {
        id: "r2",
        author: "Nathalie L.",
        date: "2026-02-28",
        rating: 5,
        text: "I was so anxious for my first pregnancy and Dr. Doorgakant made me feel completely at ease. She is patient, thorough, and genuinely caring. The staff at her clinic are also very kind.",
      },
      {
        id: "r3",
        author: "Sheila R.",
        date: "2026-01-10",
        rating: 4,
        text: "Very good doctor, explains everything well. Only downside is the wait times can be long. But once you are in the consultation room, she gives you her full attention. Worth the wait!",
      },
    ],
  },
  "dr-rajesh-doobur": {
    id: "dr-rajesh-doobur",
    name: "Dr. Rajesh Doobur",
    type: "gynaecologist",
    district: "Port Louis",
    address: "Sir William Newton St, Port Louis, Mauritius",
    phone: "+230 212 5678",
    email: "dr.doobur@cityclinic.mu",
    verified: true,
    description:
      "Consultant obstetrician and gynaecologist at City Clinic. Expert in laparoscopic surgery and fertility treatments.",
    longDescription:
      "Dr. Rajesh Doobur is a leading obstetrician-gynaecologist based in Port Louis with over 20 years of experience. He is the head of the Obstetrics Department at City Clinic and is renowned for his expertise in fertility treatments and complex deliveries. A graduate of the University of Cape Town, he has performed over 5,000 successful deliveries. Dr. Doobur is passionate about reducing maternal mortality rates in Mauritius and actively participates in community health education programmes.",
    rating: 4.9,
    reviewCount: 203,
    languages: ["English", "French", "Hindi", "Kreol"],
    specialisations: [
      "Fertility treatments",
      "IVF assistance",
      "Complex deliveries",
      "Prenatal diagnostics",
      "Gynaecological oncology",
    ],
    openingHours: [
      { day: "Monday", hours: "09:00 - 17:00" },
      { day: "Tuesday", hours: "09:00 - 17:00" },
      { day: "Wednesday", hours: "09:00 - 17:00" },
      { day: "Thursday", hours: "09:00 - 17:00" },
      { day: "Friday", hours: "09:00 - 15:00" },
      { day: "Saturday", hours: "09:00 - 12:00" },
      { day: "Sunday", hours: "Closed" },
    ],
    reviews: [
      {
        id: "r1",
        author: "Asha D.",
        date: "2026-03-20",
        rating: 5,
        text: "Dr. Doobur helped us through a difficult fertility journey. After 3 years of trying, we are finally expecting! He is truly exceptional at what he does.",
      },
      {
        id: "r2",
        author: "Sophie T.",
        date: "2026-02-14",
        rating: 5,
        text: "The most professional and caring doctor I have ever met. He performed my C-section and the experience was as calm as it could be. Forever grateful.",
      },
      {
        id: "r3",
        author: "Kavita P.",
        date: "2026-01-22",
        rating: 5,
        text: "Excellent doctor. His clinic is modern and well-equipped. He takes time to answer every question. A bit pricey but worth every rupee.",
      },
    ],
  },
  "marie-claire-lamy": {
    id: "marie-claire-lamy",
    name: "Marie-Claire Lamy",
    type: "midwife",
    district: "Rose Hill",
    address: "Avenue des Roses, Rose Hill 71368, Mauritius",
    phone: "+230 464 3456",
    email: "mc.lamy@midwifemu.com",
    verified: true,
    description:
      "Certified nurse-midwife offering home birth support and prenatal classes.",
    longDescription:
      "Marie-Claire Lamy is a certified nurse-midwife with 12 years of experience supporting women through pregnancy, birth, and the postnatal period. She trained at the University of Mauritius School of Nursing and completed additional certification in water birth and hypnobirthing in Australia. Marie-Claire offers comprehensive prenatal classes, home birth support, and postnatal home visits. She is particularly passionate about empowering women to make informed choices about their birth experience and advocates for natural birthing methods when safe to do so.",
    rating: 4.7,
    reviewCount: 89,
    languages: ["English", "French", "Kreol"],
    specialisations: [
      "Home births",
      "Water birth",
      "Hypnobirthing",
      "Prenatal classes",
      "Postnatal home visits",
    ],
    openingHours: [
      { day: "Monday", hours: "08:00 - 18:00" },
      { day: "Tuesday", hours: "08:00 - 18:00" },
      { day: "Wednesday", hours: "08:00 - 14:00" },
      { day: "Thursday", hours: "08:00 - 18:00" },
      { day: "Friday", hours: "08:00 - 18:00" },
      { day: "Saturday", hours: "By appointment" },
      { day: "Sunday", hours: "Emergency only" },
    ],
    reviews: [
      {
        id: "r1",
        author: "Camille F.",
        date: "2026-03-05",
        rating: 5,
        text: "Marie-Claire supported my home birth and it was the most empowering experience of my life. She is so calm and knowledgeable. Her prenatal classes also prepared us incredibly well.",
      },
      {
        id: "r2",
        author: "Devi J.",
        date: "2026-02-10",
        rating: 4,
        text: "Wonderful midwife who truly cares. Her postnatal visits were a lifeline in those first few weeks. She helped me with breastfeeding and checked on my recovery. So reassuring.",
      },
      {
        id: "r3",
        author: "Ayesha N.",
        date: "2025-12-18",
        rating: 5,
        text: "I did her prenatal course and it was amazing. She covers everything from breathing techniques to what to pack for hospital. Best decision I made during my pregnancy.",
      },
    ],
  },
};

// Fallback provider for unknown IDs
function createFallbackProvider(id: string): ProviderDetail {
  return {
    id,
    name: "Dr. Anisha Doorgakant",
    type: "gynaecologist",
    district: "Curepipe",
    address: "Royal Road, Curepipe 74401, Mauritius",
    phone: "+230 674 1234",
    email: "dr.anisha@medclinic.mu",
    verified: true,
    description:
      "Experienced gynaecologist-obstetrician with 15 years of practice.",
    longDescription:
      "Dr. Anisha Doorgakant is a highly regarded gynaecologist-obstetrician practicing in Curepipe since 2011. She completed her MBBS at the University of Mauritius and specialised in Obstetrics & Gynaecology at the Royal College of Obstetricians and Gynaecologists (MRCOG) in London. She has a particular interest in high-risk pregnancies, gestational diabetes, and minimally invasive gynaecological surgery.",
    rating: 4.8,
    reviewCount: 127,
    languages: ["English", "French", "Kreol"],
    specialisations: [
      "High-risk pregnancies",
      "Gestational diabetes",
      "Prenatal screening",
    ],
    openingHours: [
      { day: "Monday", hours: "08:30 - 16:00" },
      { day: "Tuesday", hours: "08:30 - 16:00" },
      { day: "Wednesday", hours: "08:30 - 12:00" },
      { day: "Thursday", hours: "08:30 - 16:00" },
      { day: "Friday", hours: "08:30 - 16:00" },
      { day: "Saturday", hours: "09:00 - 12:00" },
      { day: "Sunday", hours: "Closed" },
    ],
    reviews: [
      {
        id: "r1",
        author: "Priya M.",
        date: "2026-03-15",
        rating: 5,
        text: "Wonderful doctor, very caring and professional. I felt safe throughout my entire pregnancy.",
      },
      {
        id: "r2",
        author: "Nathalie L.",
        date: "2026-02-28",
        rating: 5,
        text: "So patient and thorough. Explains everything clearly. Highly recommended!",
      },
      {
        id: "r3",
        author: "Sheila R.",
        date: "2026-01-10",
        rating: 4,
        text: "Great doctor, very knowledgeable. The clinic environment is also very nice.",
      },
    ],
  };
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < Math.floor(rating)
              ? "fill-amber-400 text-amber-400"
              : i < rating
                ? "fill-amber-400/50 text-amber-400"
                : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

export default function ProviderDetailPage() {
  const t = useTranslations("directory");
  const tc = useTranslations("common");
  const locale = useLocale();
  const params = useParams();
  const id = params.id as string;

  const provider = useMemo(() => {
    return allProviders[id] || createFallbackProvider(id);
  }, [id]);

  const Icon = typeIcons[provider.type];
  const colorClass = typeColors[provider.type];

  return (
    <div className="min-h-screen">
      {/* Top nav */}
      <div className="border-b bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
          <Link
            href={`/${locale}/directory`}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {tc("back")} {t("title").toLowerCase()}
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header card */}
            <AnimatedSection>
              <Card>
                <CardContent className="p-6 sm:p-8">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${colorClass}`}
                    >
                      <Icon className="h-8 w-8" />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h1 className="text-2xl font-bold sm:text-3xl">
                          {provider.name}
                        </h1>
                        {provider.verified && (
                          <Badge
                            variant="secondary"
                            className="gap-1 bg-emerald-50 text-emerald-700"
                          >
                            <BadgeCheck className="h-3.5 w-3.5" />
                            {t("verified")}
                          </Badge>
                        )}
                      </div>
                      <p className="mt-1 text-muted-foreground">
                        {t(provider.type)}
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-1.5">
                          <StarRating rating={provider.rating} />
                          <span className="text-sm font-medium">
                            {provider.rating}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            ({provider.reviewCount} {t("reviews").toLowerCase()})
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {provider.languages.map((lang) => (
                          <Badge key={lang} variant="outline" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* About */}
            <AnimatedSection delay={0.1}>
              <Card>
                <CardHeader>
                  <CardTitle>{t("about")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {provider.longDescription}
                  </p>
                  {provider.specialisations.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-sm font-semibold mb-3">
                        {t("specialisations")}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {provider.specialisations.map((spec) => (
                          <Badge key={spec} variant="secondary">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Map placeholder */}
            <AnimatedSection delay={0.15}>
              <Card className="overflow-hidden">
                <div className="relative h-64 bg-gradient-to-br from-brand-teal-light to-secondary/10">
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                        <MapPin className="h-6 w-6" />
                      </div>
                    </motion.div>
                    <div className="mt-3 rounded-full bg-primary/20 px-4 py-1 text-sm font-medium text-primary">
                      {provider.address}
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {t("mapComingSoon")}
                    </p>
                  </div>
                  {/* Grid pattern overlay */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
                      `,
                      backgroundSize: "40px 40px",
                    }}
                  />
                </div>
              </Card>
            </AnimatedSection>

            {/* Reviews */}
            <AnimatedSection delay={0.2}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                    {t("reviews")} ({provider.reviews.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <StaggerContainer className="space-y-6">
                    {provider.reviews.map((review) => (
                      <StaggerItem key={review.id}>
                        <div className="group">
                          <div className="flex items-start gap-3">
                            <Avatar className="h-9 w-9 shrink-0">
                              <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                                {review.author
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-semibold">
                                  {review.author}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(review.date).toLocaleDateString(
                                    locale === "fr" ? "fr-FR" : "en-GB",
                                    {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    }
                                  )}
                                </span>
                              </div>
                              <StarRating rating={review.rating} />
                              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                                {review.text}
                              </p>
                            </div>
                          </div>
                          {review.id !==
                            provider.reviews[provider.reviews.length - 1].id && (
                            <Separator className="mt-6" />
                          )}
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Action buttons */}
            <AnimatedSection delay={0.1} direction="right">
              <Card className="sticky top-20">
                <CardContent className="p-5 space-y-3">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button className="w-full h-11 bg-primary hover:bg-brand-pink-dark text-base">
                      <Calendar className="mr-2 h-4 w-4" />
                      {t("bookAppointment")}
                    </Button>
                  </motion.div>

                  <div className="grid grid-cols-2 gap-2">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant="outline"
                        className="w-full"
                        render={
                          <a href={`tel:${provider.phone.replace(/\s/g, "")}`} />
                        }
                      >
                        <Phone className="mr-1.5 h-4 w-4" />
                        {t("callNow")}
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant="outline"
                        className="w-full"
                        render={
                          <a
                            href={`https://maps.google.com/?q=${encodeURIComponent(provider.address)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          />
                        }
                      >
                        <Navigation className="mr-1.5 h-4 w-4" />
                        {t("getDirections")}
                      </Button>
                    </motion.div>
                  </div>

                  <Separator />

                  {/* Contact info */}
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {provider.address}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 shrink-0 text-muted-foreground" />
                      <a
                        href={`tel:${provider.phone.replace(/\s/g, "")}`}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {provider.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />
                      <a
                        href={`mailto:${provider.email}`}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {provider.email}
                      </a>
                    </div>
                  </div>

                  <Separator />

                  {/* Opening hours */}
                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-semibold mb-3">
                      <Clock className="h-4 w-4" />
                      {t("openingHours")}
                    </h4>
                    <div className="space-y-1.5">
                      {provider.openingHours.map((oh) => {
                        const isToday =
                          new Date()
                            .toLocaleDateString("en-US", { weekday: "long" }) ===
                          oh.day;
                        return (
                          <div
                            key={oh.day}
                            className={`flex items-center justify-between text-sm rounded-md px-2 py-1 ${
                              isToday
                                ? "bg-primary/5 font-medium text-primary"
                                : "text-muted-foreground"
                            }`}
                          >
                            <span>{oh.day}</span>
                            <span>{oh.hours}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
}
