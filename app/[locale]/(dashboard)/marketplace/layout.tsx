import type { Metadata } from "next";

const titles: Record<string, string> = {
  en: "Marketplace — Baby Products & Services in Mauritius",
  fr: "Boutique — Produits et Services Bebe a Maurice",
  cr: "Laboutik — Prodwi ek Servis Tibaba dan Moris",
};
const descriptions: Record<string, string> = {
  en: "Browse baby products and maternity services from verified sellers in Mauritius. New and pre-loved items for pregnancy, newborns, and toddlers.",
  fr: "Parcourez les produits bebe et services de maternite de vendeurs verifies a Maurice. Articles neufs et d'occasion pour la grossesse, les nouveau-nes et les tout-petits.",
  cr: "Get prodwi tibaba ek servis maternite depi vander verifie dan Moris. Lartik nef ek dezyem men pou grosses, tibaba ek zanfan.",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://manmanmoris.mu";
  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    keywords: ["produits bebe Maurice", "marketplace bebe Maurice", "baby products Mauritius", "maternity services Mauritius"],
    alternates: { canonical: `${baseUrl}/${locale}/marketplace`, languages: { en: `${baseUrl}/en/marketplace`, fr: `${baseUrl}/fr/marketplace`, "x-default": `${baseUrl}/cr/marketplace` } },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
