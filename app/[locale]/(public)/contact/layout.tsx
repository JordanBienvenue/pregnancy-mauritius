import { SITE } from "@/lib/constants/site";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

const titles: Record<string, string> = {
  en: "Contact Us",
  fr: "Nous contacter",
  cr: "Kontakte nou",
};

const descriptions: Record<string, string> = {
  en: "Get in touch with Manman Moris for sponsorships, partnerships, media inquiries, or business collaborations in Mauritius.",
  fr: "Contactez Manman Moris pour des partenariats, sponsoring, demandes media ou collaborations professionnelles a Maurice.",
  cr: "Kontakte Manman Moris pou sponsorship, partnership, demand media ou kolaborasion biznes dan Moris.",
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const baseUrl = SITE.url;
  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    keywords: ["contact Manman Moris", "partnership Mauritius", "sponsorship pregnancy", "business inquiry"],
    alternates: {
      canonical: `${baseUrl}/${locale}/contact`,
      languages: {
        en: `${baseUrl}/en/contact`,
        fr: `${baseUrl}/fr/contact`,
        "x-default": `${baseUrl}/cr/contact`,
      },
    },
  };
}

export default function ContactLayout({ children }: Props) {
  return children;
}
