import type { Metadata } from "next";

const titles: Record<string, string> = {
  en: "Pregnancy Tracker — Week by Week",
  fr: "Suivi de Grossesse — Semaine par Semaine",
  cr: "Swivi Grosses — Semenn par Semenn",
};
const descriptions: Record<string, string> = {
  en: "Track your pregnancy week by week with personalised updates, baby development milestones, and health tips tailored for Mauritius.",
  fr: "Suivez votre grossesse semaine par semaine avec des mises a jour personnalisees, des etapes de developpement du bebe et des conseils de sante adaptes a Maurice.",
  cr: "Swiv ou grosses semenn par semenn avek mizazour personalize, letap devlopman tibaba ek konsey lasante adapte pou Moris.",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://manmanmoris.mu";
  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    keywords: ["suivi grossesse Maurice", "pregnancy tracker Mauritius", "grossesse semaine par semaine", "pregnancy week by week"],
    alternates: { canonical: `${baseUrl}/${locale}/tracker`, languages: { en: `${baseUrl}/en/tracker`, fr: `${baseUrl}/fr/tracker`, "x-default": `${baseUrl}/cr/tracker` } },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
