import type { Metadata } from "next";

const titles: Record<string, string> = {
  en: "Benevolat — Baby Item Donations in Mauritius",
  fr: "Benevolat — Dons d'Articles Bebe a Maurice",
  cr: "Benevolat — Don Lartik Tibaba dan Moris",
};
const descriptions: Record<string, string> = {
  en: "Donate or request baby items for mothers in need across Mauritius. Clothes, cribs, strollers, and essentials for newborns and toddlers.",
  fr: "Donnez ou demandez des articles bebe pour les mamans dans le besoin a Maurice. Vetements, berceaux, poussettes et essentiels pour nouveau-nes et tout-petits.",
  cr: "Done ou dimande lartik tibaba pou mama ki dan bezwin dan Moris. Linz, bersó, pouse ek esansiel pou tibaba ek zanfan.",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://manmanmoris.mu";
  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    keywords: ["don bebe Maurice", "benevolat Maurice", "baby donations Mauritius", "donate baby items Mauritius"],
    alternates: { canonical: `${baseUrl}/${locale}/donate`, languages: { en: `${baseUrl}/en/donate`, fr: `${baseUrl}/fr/donate`, "x-default": `${baseUrl}/cr/donate` } },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
