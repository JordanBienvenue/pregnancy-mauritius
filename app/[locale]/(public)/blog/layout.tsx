import type { Metadata } from "next";

const titles: Record<string, string> = {
  en: "Blog — Pregnancy Advice for Mauritian Mothers",
  fr: "Blog — Conseils Grossesse pour Mamans Mauriciennes",
  cr: "Blog — Konsey Grosses pou Mama Morisien",
};
const descriptions: Record<string, string> = {
  en: "Expert pregnancy, birth, and postpartum advice tailored for Mauritius. Tips, guides, and stories from local healthcare professionals and mothers.",
  fr: "Conseils experts sur la grossesse, l'accouchement et le post-partum adaptes a Maurice. Astuces, guides et temoignages de professionnels de sante et mamans locales.",
  cr: "Konsey exper lor grosses, akousman ek apre akousman adapte pou Moris. Tips, gid ek zistwar profesionel lasante ek mama lokal.",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://manmanmoris.mu";
  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    keywords: ["blog grossesse Maurice", "conseils grossesse Maurice", "pregnancy blog Mauritius", "postpartum advice Mauritius"],
    alternates: { canonical: `${baseUrl}/${locale}/blog`, languages: { en: `${baseUrl}/en/blog`, fr: `${baseUrl}/fr/blog`, "x-default": `${baseUrl}/cr/blog` } },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
