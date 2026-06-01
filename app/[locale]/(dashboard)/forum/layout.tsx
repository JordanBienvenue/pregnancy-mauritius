import type { Metadata } from "next";
import { SITE } from "@/lib/constants/site";

const titles: Record<string, string> = {
  en: "Community Forum",
  fr: "Forum communautaire",
  cr: "Forum kominote",
};
const descriptions: Record<string, string> = {
  en: "Connect with other mothers in Mauritius. Share experiences, ask questions.",
  fr: "Connectez-vous avec d'autres mamans a Maurice. Partagez vos experiences, posez des questions.",
  cr: "Konekte avek lezot mama dan Moris. Partaz ou lexperyans, poz kestion.",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    keywords: ["pregnancy forum", "community", "mothers Mauritius"],
    alternates: { canonical: `${SITE.url}/${locale}/forum`, languages: { en: `${SITE.url}/en/forum`, fr: `${SITE.url}/fr/forum`, "x-default": `${SITE.url}/cr/forum` } },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
