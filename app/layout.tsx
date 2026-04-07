import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SkipLink } from "@/components/shared/skip-link";
import { MotionProvider } from "@/components/shared/reduced-motion";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Manman Moris — Pregnancy & Postpartum Support for Mauritius",
    template: "%s | Manman Moris",
  },
  description:
    "The first all-in-one pregnancy and postpartum platform for Mauritius. Healthcare directory, pregnancy tracker, community forum, and more — in English, French, and Kreol.",
  keywords: [
    "grossesse Maurice",
    "pregnancy Mauritius",
    "gynecologue Maurice",
    "maternite Maurice",
    "postpartum Mauritius",
    "Manman Moris",
    "enceinte Maurice",
    "sage-femme Maurice",
    "accouchement Maurice",
  ],
  authors: [{ name: "Manman Moris" }],
  creator: "Manman Moris",
  publisher: "Manman Moris",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://manmanmoris.mu"
  ),
  openGraph: {
    type: "website",
    siteName: "Manman Moris",
    locale: "fr_MU",
    alternateLocale: ["en_MU", "fr_FR"],
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Manman Moris — Pregnancy & Postpartum Support for Mauritius",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Manman Moris — Pregnancy Support for Mauritius",
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
  verification: {
    google: "GOOGLE_SITE_VERIFICATION_TOKEN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mfe" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <SkipLink />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
