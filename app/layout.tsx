import type { Metadata } from "next";
import { SITE } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — Pregnancy & Postpartum Support for Mauritius`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "The first all-in-one pregnancy and postpartum platform for Mauritius. Healthcare directory, pregnancy tracker, community forum, and more — in English, French, and Kreol.",
  keywords: [
    ...SITE.keywords.fr,
    ...SITE.keywords.en,
    SITE.name,
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  metadataBase: new URL(SITE.url),
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "fr_MU",
    alternateLocale: ["en_MU", "fr_FR"],
    images: [
      {
        url: SITE.ogImage,
        width: 1200,
        height: 630,
        alt: `${SITE.name} — Pregnancy & Postpartum Support for Mauritius`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Pregnancy Support for Mauritius`,
    description:
      "The first pregnancy and postpartum platform built for Mauritius. In English, French, and Kreol.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
