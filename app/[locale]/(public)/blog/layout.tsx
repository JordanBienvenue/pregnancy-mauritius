import type { Metadata } from "next";
import { SITE } from "@/lib/constants/site";
import { JsonLd } from "@/components/shared/json-ld";
import { breadcrumbSchema } from "@/lib/structured-data";

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
  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    keywords: ["blog grossesse Maurice", "conseils grossesse Maurice", "pregnancy blog Mauritius", "postpartum advice Mauritius"],
    alternates: { canonical: `${SITE.url}/${locale}/blog`, languages: { en: `${SITE.url}/en/blog`, fr: `${SITE.url}/fr/blog`, "x-default": `${SITE.url}/cr/blog` } },
  };
}

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: `/${locale}` },
          { name: "Blog", href: `/${locale}/blog` },
        ])}
      />
      {children}
    </>
  );
}
