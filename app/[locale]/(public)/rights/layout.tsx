import type { Metadata } from "next";
import { SITE } from "@/lib/constants/site";
import { JsonLd } from "@/components/shared/json-ld";
import { faqSchema } from "@/lib/structured-data";

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

const rightsFaqs = [
  {
    question: "How long is maternity leave in Mauritius?",
    answer: "Under the Workers' Rights Act 2019, female employees are entitled to 14 weeks of maternity leave.",
  },
  {
    question: "Are breastfeeding breaks allowed at work in Mauritius?",
    answer: "Yes, nursing mothers are entitled to one hour per day for breastfeeding breaks, which can be split into two 30-minute breaks, until the child is 6 months old.",
  },
  {
    question: "Can an employer dismiss a pregnant employee in Mauritius?",
    answer: "No, it is unlawful to dismiss an employee on grounds of pregnancy under the Workers' Rights Act 2019.",
  },
  {
    question: "Is maternity leave paid in Mauritius?",
    answer: "Yes, employees who have been in continuous employment for at least 12 months are entitled to full pay during maternity leave.",
  },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    keywords: ["droits maternite Maurice", "conge maternite Maurice", "Workers Rights Act", "maternity leave Mauritius", "maternity rights Mauritius"],
    alternates: { canonical: `${SITE.url}/${locale}/rights`, languages: { en: `${SITE.url}/en/rights`, fr: `${SITE.url}/fr/rights`, "x-default": `${SITE.url}/cr/rights` } },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={faqSchema(rightsFaqs)} />
      {children}
    </>
  );
}
