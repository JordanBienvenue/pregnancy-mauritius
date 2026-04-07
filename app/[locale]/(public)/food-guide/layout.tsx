import type { Metadata } from "next";

const titles: Record<string, string> = {
  en: "Safe Food Guide for Pregnancy — Mauritian Foods",
  fr: "Guide Alimentaire Grossesse — Aliments Mauriciens",
  cr: "Gid Manze Grosses — Manze Morisien",
};
const descriptions: Record<string, string> = {
  en: "Which Mauritian foods are safe during pregnancy? A complete guide to eating safely while pregnant in Mauritius, including dal puri, briani, and local dishes.",
  fr: "Quels aliments mauriciens sont sans danger pendant la grossesse? Guide complet pour manger en securite enceinte a Maurice, y compris dal puri, briani et plats locaux.",
  cr: "Ki manze Morisien ki san danze pandan grosses? Gid konple pou manze an sekirite ansent dan Moris, enkli dal puri, briani ek plat lokal.",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://manmanmoris.mu";
  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    keywords: ["aliments grossesse Maurice", "manger enceinte Maurice", "dal puri grossesse", "pregnancy food Mauritius", "safe food pregnancy"],
    alternates: { canonical: `${baseUrl}/${locale}/food-guide`, languages: { en: `${baseUrl}/en/food-guide`, fr: `${baseUrl}/fr/food-guide`, "x-default": `${baseUrl}/cr/food-guide` } },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
