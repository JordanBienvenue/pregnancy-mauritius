import type { Metadata } from "next";
import { SITE } from "@/lib/constants/site";

const titles: Record<string, string> = {
  en: "Baby Milestones & Vaccines",
  fr: "Etapes bebe & Vaccins",
  cr: "Letap tibaba & Vaksin",
};
const descriptions: Record<string, string> = {
  en: "Track your baby's development month by month with Mauritius vaccination schedule.",
  fr: "Suivez le developpement de votre bebe mois par mois avec le calendrier de vaccination de Maurice.",
  cr: "Swiv devlopman ou tibaba mwa par mwa avek kalandriye vaksinasion Moris.",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    keywords: ["baby milestones", "vaccination Mauritius", "development", "month by month"],
    alternates: { canonical: `${SITE.url}/${locale}/postpartum/milestones`, languages: { en: `${SITE.url}/en/postpartum/milestones`, fr: `${SITE.url}/fr/postpartum/milestones`, "x-default": `${SITE.url}/cr/postpartum/milestones` } },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
