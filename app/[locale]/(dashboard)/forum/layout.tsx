import type { Metadata } from "next";

const titles: Record<string, string> = {
  en: "Community Forum for Mauritian Mothers",
  fr: "Forum Communautaire pour Mamans Mauriciennes",
  cr: "Forum Kominote pou Mama Morisien",
};
const descriptions: Record<string, string> = {
  en: "Join the community forum for mothers in Mauritius. Share experiences, ask questions, and connect with other mums during pregnancy and postpartum.",
  fr: "Rejoignez le forum communautaire pour les mamans a Maurice. Partagez vos experiences, posez des questions et connectez-vous avec d'autres mamans pendant la grossesse et le post-partum.",
  cr: "Zwenn forum kominote pou mama dan Moris. Partaz ou lexperyans, poz kestion ek konekte avek lezot mama pandan grosses ek apre akousman.",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://manmanmoris.mu";
  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    keywords: ["forum mamans Maurice", "communaute meres Maurice", "mothers forum Mauritius", "pregnancy community Mauritius"],
    alternates: { canonical: `${baseUrl}/${locale}/forum`, languages: { en: `${baseUrl}/en/forum`, fr: `${baseUrl}/fr/forum`, "x-default": `${baseUrl}/cr/forum` } },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
