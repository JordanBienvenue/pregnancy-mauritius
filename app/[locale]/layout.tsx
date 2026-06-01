import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { JsonLd } from "@/components/shared/json-ld";
import { websiteSchema, medicalWebPageSchema, organizationSchema } from "@/lib/structured-data";
import { SITE } from "@/lib/constants/site";
import { SkipLink } from "@/components/shared/skip-link";
import { MotionProvider } from "@/components/shared/reduced-motion";
import { PublicShell } from "@/components/shared/public-shell";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

const langMap: Record<string, string> = {
  en: "en",
  fr: "fr",
  cr: "mfe",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const baseUrl = SITE.url;

  const titles: Record<string, string> = {
    en: `${SITE.name} — Pregnancy & Postpartum Support for Mauritius`,
    fr: `${SITE.name} — Grossesse et Post-partum a Maurice`,
    cr: `${SITE.name} — Sipor Grosses ek Apre Akousman dan Moris`,
  };

  const descriptions: Record<string, string> = {
    en: "The first all-in-one pregnancy and postpartum platform for Mauritius. Healthcare directory, pregnancy tracker, community forum — in English, French, and Kreol.",
    fr: "La premiere plateforme de grossesse et post-partum pour Maurice. Annuaire medical, suivi de grossesse, forum communautaire — en anglais, francais et kreol.",
    cr: "Premie platform grosses ek apre akousman pou Moris. Aniver medikal, swivi grosses, forum kominote — an angle, franse ek kreol.",
  };

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        en: `${baseUrl}/en`,
        fr: `${baseUrl}/fr`,
        "x-default": `${baseUrl}/cr`,
      },
    },
    openGraph: {
      locale: locale === "cr" ? "fr_MU" : locale === "fr" ? "fr_FR" : "en_US",
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "fr" | "cr")) {
    notFound();
  }

  const messages = await getMessages();
  const htmlLang = langMap[locale] || "mfe";

  return (
    <html lang={htmlLang} className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <SkipLink />
        <MotionProvider>
          <JsonLd data={websiteSchema()} />
          <JsonLd data={medicalWebPageSchema(locale)} />
          <JsonLd data={organizationSchema()} />
          <NextIntlClientProvider messages={messages}>
            <PublicShell>{children}</PublicShell>
          </NextIntlClientProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
