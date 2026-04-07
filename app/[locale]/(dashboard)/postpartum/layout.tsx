import type { Metadata } from "next";

const titles: Record<string, string> = {
  en: "Postpartum Care & PPD Support — Mauritius",
  fr: "Soins Post-partum et Soutien PPD — Maurice",
  cr: "Swin Apre Akousman ek Sipor PPD — Moris",
};
const descriptions: Record<string, string> = {
  en: "Postpartum care resources and postpartum depression screening for mothers in Mauritius. Get support, track your recovery, and access local mental health services.",
  fr: "Ressources de soins post-partum et depistage de la depression postnatale pour les mamans a Maurice. Obtenez du soutien, suivez votre retablissement et accedez aux services de sante mentale locaux.",
  cr: "Resours swin apre akousman ek depistaz depresion postnatal pou mama dan Moris. Gagn sipor, swiv ou retablisma ek aksede servis sante mantal lokal.",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://manmanmoris.mu";
  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    keywords: ["depression postpartum Maurice", "postpartum Mauritius", "PPD screening", "soins post-partum Maurice", "postpartum care Mauritius"],
    alternates: { canonical: `${baseUrl}/${locale}/postpartum`, languages: { en: `${baseUrl}/en/postpartum`, fr: `${baseUrl}/fr/postpartum`, "x-default": `${baseUrl}/cr/postpartum` } },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
