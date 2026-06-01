import type { Metadata } from "next";
import { SITE } from "@/lib/constants/site";

const titles: Record<string, string> = {
  en: "Postpartum Care",
  fr: "Soins post-partum",
  cr: "Swin post-partum",
};
const descriptions: Record<string, string> = {
  en: "Postpartum depression screening, baby milestones, and recovery support for mothers in Mauritius.",
  fr: "Depistage de la depression postnatale, etapes bebe et soutien au retablissement pour les mamans a Maurice.",
  cr: "Depistaz depresion postnatal, letap tibaba ek sipor retablisma pou mama dan Moris.",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    keywords: ["postpartum", "PPD", "baby milestones", "recovery", "postpartum care Mauritius"],
    alternates: { canonical: `${SITE.url}/${locale}/postpartum`, languages: { en: `${SITE.url}/en/postpartum`, fr: `${SITE.url}/fr/postpartum`, "x-default": `${SITE.url}/cr/postpartum` } },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
