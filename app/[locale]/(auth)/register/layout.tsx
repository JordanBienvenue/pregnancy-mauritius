import type { Metadata } from "next";

const titles: Record<string, string> = {
  en: "Sign up | Manman Moris",
  fr: "S'inscrire | Manman Moris",
  cr: "Enskrir | Manman Moris",
};
const descriptions: Record<string, string> = {
  en: "Create your free Manman Moris account. Access the pregnancy tracker, community forum, healthcare directory, and more.",
  fr: "Creez votre compte Manman Moris gratuit. Accedez au suivi de grossesse, forum communautaire, annuaire medical et plus encore.",
  cr: "Kree ou kont Manman Moris gratis. Aksede swivi grosses, forum kominote, aniver medikal ek plis ankor.",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://manmanmoris.mu";
  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    alternates: { canonical: `${baseUrl}/${locale}/register`, languages: { en: `${baseUrl}/en/register`, fr: `${baseUrl}/fr/register`, "x-default": `${baseUrl}/cr/register` } },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
