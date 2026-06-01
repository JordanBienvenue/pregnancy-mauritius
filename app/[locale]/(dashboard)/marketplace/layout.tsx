import type { Metadata } from "next";
import { SITE } from "@/lib/constants/site";

const titles: Record<string, string> = {
  en: "Marketplace",
  fr: "Boutique",
  cr: "Laboutik",
};
const descriptions: Record<string, string> = {
  en: "Products and services for your pregnancy journey in Mauritius.",
  fr: "Produits et services pour votre parcours de grossesse a Maurice.",
  cr: "Prodwi ek servis pou ou parkour grosses dan Moris.",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    keywords: ["pregnancy products", "maternity Mauritius", "baby shop"],
    alternates: { canonical: `${SITE.url}/${locale}/marketplace`, languages: { en: `${SITE.url}/en/marketplace`, fr: `${SITE.url}/fr/marketplace`, "x-default": `${SITE.url}/cr/marketplace` } },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
