import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { JsonLd } from "@/components/shared/json-ld";
import { websiteSchema, medicalWebPageSchema } from "@/lib/structured-data";

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
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://manmanmoris.mu";

  const titles: Record<string, string> = {
    en: "Manman Moris — Pregnancy & Postpartum Support for Mauritius",
    fr: "Manman Moris — Grossesse et Post-partum a Maurice",
    cr: "Manman Moris — Sipor Grosses ek Apre Akousman dan Moris",
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
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang="${htmlLang}"`,
        }}
      />
      <JsonLd data={websiteSchema()} />
      <JsonLd data={medicalWebPageSchema(locale)} />
      <NextIntlClientProvider messages={messages}>
        <Header />
        <main id="main-content" className="flex-1" role="main">
          {children}
        </main>
        <Footer />
      </NextIntlClientProvider>
    </>
  );
}
