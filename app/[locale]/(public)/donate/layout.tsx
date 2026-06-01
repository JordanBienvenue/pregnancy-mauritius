import type { Metadata } from "next";
import { SITE } from "@/lib/constants/site";

const titles: Record<string, string> = {
  en: "Donate & Share",
  fr: "Dons et partage",
  cr: "Don ek partaz",
};
const descriptions: Record<string, string> = {
  en: "Share baby items with other mothers in Mauritius. Give and receive freely.",
  fr: "Partagez des articles bebe avec d'autres mamans a Maurice. Donnez et recevez librement.",
  cr: "Partaz lartik tibaba avek lezot mama dan Moris. Done ek resevwar libreman.",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    keywords: ["donate", "baby items", "share", "mothers Mauritius"],
    alternates: { canonical: `${SITE.url}/${locale}/donate`, languages: { en: `${SITE.url}/en/donate`, fr: `${SITE.url}/fr/donate`, "x-default": `${SITE.url}/cr/donate` } },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
