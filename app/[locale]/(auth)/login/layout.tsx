import type { Metadata } from "next";

const titles: Record<string, string> = {
  en: "Log in | Manman Moris",
  fr: "Se connecter | Manman Moris",
  cr: "Konekte | Manman Moris",
};
const descriptions: Record<string, string> = {
  en: "Log in to your Manman Moris account to access your pregnancy tracker, community forum, and personalised resources.",
  fr: "Connectez-vous a votre compte Manman Moris pour acceder a votre suivi de grossesse, forum communautaire et ressources personnalisees.",
  cr: "Konekte dan ou kont Manman Moris pou aksede ou swivi grosses, forum kominote ek resours personalize.",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://manmanmoris.mu";
  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    alternates: { canonical: `${baseUrl}/${locale}/login`, languages: { en: `${baseUrl}/en/login`, fr: `${baseUrl}/fr/login`, "x-default": `${baseUrl}/cr/login` } },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
