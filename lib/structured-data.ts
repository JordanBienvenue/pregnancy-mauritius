/**
 * Structured Data (JSON-LD) generators for SEO.
 * Renders as <script type="application/ld+json"> in page heads.
 */

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://manmanmoris.mu";

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Manman Moris",
    alternateName: "Pregnancy Mauritius",
    url: BASE_URL,
    description:
      "The first all-in-one pregnancy and postpartum platform for Mauritius. Healthcare directory, pregnancy tracker, community forum — in English, French, and Kreol Morisien.",
    inLanguage: ["en", "fr", "mfe"],
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/cr/directory?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: "Manman Moris",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.png`,
      },
      address: {
        "@type": "PostalAddress",
        addressCountry: "MU",
      },
    },
  };
}

export function medicalWebPageSchema(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Manman Moris — Pregnancy & Postpartum Platform",
    url: `${BASE_URL}/${locale}`,
    about: {
      "@type": "MedicalCondition",
      name: "Pregnancy",
      associatedAnatomy: {
        "@type": "AnatomicalStructure",
        name: "Uterus",
      },
    },
    audience: {
      "@type": "PeopleAudience",
      suggestedGender: "Female",
      suggestedMinAge: 18,
      suggestedMaxAge: 45,
      geographicArea: {
        "@type": "Country",
        name: "Mauritius",
      },
    },
    specialty: "Obstetrics",
    inLanguage: locale === "cr" ? "mfe" : locale,
  };
}

export function localBusinessSchema(provider: {
  name: string;
  type: string;
  address?: string;
  phone?: string;
  lat?: number;
  lng?: number;
  district: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: provider.name,
    medicalSpecialty:
      provider.type === "gynaecologist"
        ? "Obstetrics"
        : provider.type === "midwife"
          ? "Midwifery"
          : "GeneralPractice",
    address: {
      "@type": "PostalAddress",
      streetAddress: provider.address || "",
      addressLocality: provider.district.replace("_", " "),
      addressCountry: "MU",
    },
    telephone: provider.phone || "",
    ...(provider.lat &&
      provider.lng && {
        geo: {
          "@type": "GeoCoordinates",
          latitude: provider.lat,
          longitude: provider.lng,
        },
      }),
  };
}

export function articleSchema(article: {
  title: string;
  excerpt: string;
  slug: string;
  author: string;
  reviewer?: string;
  publishedAt: string;
  category: string;
  locale: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalScholarlyArticle",
    headline: article.title,
    description: article.excerpt,
    url: `${BASE_URL}/${article.locale}/blog/${article.slug}`,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: {
      "@type": "Organization",
      name: article.author,
    },
    ...(article.reviewer && {
      reviewedBy: {
        "@type": "Person",
        name: article.reviewer,
        jobTitle: "Medical Reviewer",
      },
    }),
    publisher: {
      "@type": "Organization",
      name: "Manman Moris",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.png`,
      },
    },
    inLanguage: article.locale === "cr" ? "mfe" : article.locale,
    about: {
      "@type": "MedicalCondition",
      name: "Pregnancy",
    },
  };
}

export function faqSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbSchema(
  items: Array<{ name: string; href: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${BASE_URL}${item.href}`,
    })),
  };
}

export function pregnancyTrackerSchema(week: number, locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: `Pregnancy Week ${week} — Manman Moris`,
    url: `${BASE_URL}/${locale}/tracker/${week}`,
    about: {
      "@type": "MedicalCondition",
      name: "Pregnancy",
      stage: {
        "@type": "MedicalConditionStage",
        stageAsNumber: week,
      },
    },
    specialty: "Obstetrics",
    audience: {
      "@type": "PeopleAudience",
      suggestedGender: "Female",
      geographicArea: {
        "@type": "Country",
        name: "Mauritius",
      },
    },
    inLanguage: locale === "cr" ? "mfe" : locale,
  };
}
