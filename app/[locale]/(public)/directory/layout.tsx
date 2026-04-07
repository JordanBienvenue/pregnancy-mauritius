import type { Metadata } from "next";

const titles: Record<string, string> = {
  en: "Healthcare Directory — Find Gynaecologists in Mauritius",
  fr: "Annuaire Medical — Trouvez un Gynecologue a Maurice",
  cr: "Aniver Medikal — Rod Zinekolog dan Moris",
};
const descriptions: Record<string, string> = {
  en: "Find trusted gynaecologists, midwives, clinics, and maternity wards across all districts in Mauritius. Verified healthcare providers.",
  fr: "Trouvez des gynecologues, sages-femmes, cliniques et maternites de confiance dans tous les districts de Maurice.",
  cr: "Rod zinekolog, saz-fam, klinik ek maternite konfians dan tou distrik Moris.",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://manmanmoris.mu";
  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    keywords: ["gynecologue Maurice", "clinique maternite Maurice", "sage-femme Maurice", "gynecologist Mauritius", "maternity clinic Mauritius"],
    alternates: { canonical: `${baseUrl}/${locale}/directory`, languages: { en: `${baseUrl}/en/directory`, fr: `${baseUrl}/fr/directory`, "x-default": `${baseUrl}/cr/directory` } },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
