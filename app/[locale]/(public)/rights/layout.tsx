import type { Metadata } from "next";

const titles: Record<string, string> = {
  en: "Maternity Rights Mauritius — Workers' Rights Act",
  fr: "Droits de Maternite Maurice — Workers' Rights Act",
  cr: "Drwa Maternite Moris — Workers' Rights Act",
};
const descriptions: Record<string, string> = {
  en: "Know your maternity rights in Mauritius. Maternity leave, breastfeeding breaks, and workplace protections under the Workers' Rights Act.",
  fr: "Connaissez vos droits de maternite a Maurice. Conge de maternite, pauses d'allaitement et protections au travail selon le Workers' Rights Act.",
  cr: "Konn ou drwa maternite dan Moris. Konze maternite, poz alitman ek proteksion travay dapre Workers' Rights Act.",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://manmanmoris.mu";
  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    keywords: ["droits maternite Maurice", "conge maternite Maurice", "Workers Rights Act", "maternity leave Mauritius", "maternity rights Mauritius"],
    alternates: { canonical: `${baseUrl}/${locale}/rights`, languages: { en: `${baseUrl}/en/rights`, fr: `${baseUrl}/fr/rights`, "x-default": `${baseUrl}/cr/rights` } },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
