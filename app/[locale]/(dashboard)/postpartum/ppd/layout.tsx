import type { Metadata } from "next";
import { SITE } from "@/lib/constants/site";

const titles: Record<string, string> = {
  en: "PPD Screening (EPDS)",
  fr: "Depistage DPP (EPDS)",
  cr: "Depistaz DPP (EPDS)",
};
const descriptions: Record<string, string> = {
  en: "Edinburgh Postnatal Depression Scale — confidential self-screening tool for postpartum depression in Mauritius.",
  fr: "Echelle de depression postnatale d'Edimbourg — outil de depistage confidentiel pour la depression post-partum a Maurice.",
  cr: "Edinburgh Postnatal Depression Scale — zouti depistaz konfidansiel pou depresion post-partum dan Moris.",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    keywords: ["PPD", "EPDS", "Edinburgh", "postnatal depression", "screening"],
    alternates: { canonical: `${SITE.url}/${locale}/postpartum/ppd`, languages: { en: `${SITE.url}/en/postpartum/ppd`, fr: `${SITE.url}/fr/postpartum/ppd`, "x-default": `${SITE.url}/cr/postpartum/ppd` } },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
