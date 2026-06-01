import type { Metadata } from "next";
import { SITE } from "@/lib/constants/site";
import { JsonLd } from "@/components/shared/json-ld";
import { breadcrumbSchema } from "@/lib/structured-data";

const titles: Record<string, string> = {
  en: "Emergency Maternity Map — Nearest Maternity Ward in Mauritius",
  fr: "Carte d'Urgence Maternite — Maternite la Plus Proche a Maurice",
  cr: "Map Irzans Maternite — Maternite Pli Pre dan Moris",
};
const descriptions: Record<string, string> = {
  en: "Find the nearest maternity ward or emergency hospital in Mauritius. Real-time directions to maternity services across all districts.",
  fr: "Trouvez la maternite ou l'hopital d'urgence le plus proche a Maurice. Itineraires en temps reel vers les services de maternite.",
  cr: "Rod maternite ou lopital irzans pli pre dan Moris. Direksion an tan reel ver servis maternite dan tou distrik.",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    keywords: ["urgence maternite Maurice", "hopital maternite Maurice", "SAMU Maurice", "emergency maternity Mauritius", "nearest hospital Mauritius"],
    alternates: { canonical: `${SITE.url}/${locale}/emergency`, languages: { en: `${SITE.url}/en/emergency`, fr: `${SITE.url}/fr/emergency`, "x-default": `${SITE.url}/cr/emergency` } },
  };
}

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: `/${locale}` },
          { name: "Emergency", href: `/${locale}/emergency` },
        ])}
      />
      {children}
    </>
  );
}
