import type { Metadata } from "next";

const titles: Record<string, string> = {
  en: "Profile | Manman Moris",
  fr: "Profil | Manman Moris",
  cr: "Profil | Manman Moris",
};
const descriptions: Record<string, string> = {
  en: "Manage your Manman Moris profile. Update your preferences, pregnancy details, and account settings.",
  fr: "Gerez votre profil Manman Moris. Mettez a jour vos preferences, details de grossesse et parametres de compte.",
  cr: "Zer ou profil Manman Moris. Met azour ou preferans, detay grosses ek paramet kont.",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://manmanmoris.mu";
  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    alternates: { canonical: `${baseUrl}/${locale}/profile`, languages: { en: `${baseUrl}/en/profile`, fr: `${baseUrl}/fr/profile`, "x-default": `${baseUrl}/cr/profile` } },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
