"use client";

import { use } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  Calendar,
  Share2,
  Globe,
  MessageCircle,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  Stethoscope,
  Scale,
  Apple,
  Baby,
  Heart,
  Link2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { AnimatedSection } from "@/components/shared/animated-section";

const categoryConfig: Record<
  string,
  { color: string; bgColor: string; icon: typeof Stethoscope }
> = {
  Healthcare: {
    color: "text-teal-700",
    bgColor: "bg-teal-100 border-teal-200",
    icon: Stethoscope,
  },
  Rights: {
    color: "text-indigo-700",
    bgColor: "bg-indigo-100 border-indigo-200",
    icon: Scale,
  },
  Nutrition: {
    color: "text-green-700",
    bgColor: "bg-green-100 border-green-200",
    icon: Apple,
  },
  Pregnancy: {
    color: "text-pink-700",
    bgColor: "bg-pink-100 border-pink-200",
    icon: Baby,
  },
  Postpartum: {
    color: "text-purple-700",
    bgColor: "bg-purple-100 border-purple-200",
    icon: Heart,
  },
};

const articlesData: Record<
  string,
  {
    title: string;
    author: string;
    authorRole: string;
    reviewer: string;
    reviewerRole: string;
    readTime: number;
    date: string;
    category: string;
    content: string[];
    keyPoints: string[];
  }
> = {
  "choisir-gynecologue-maurice": {
    title: "Comment choisir son gynecologue a Maurice",
    author: "Dr. Nadia Doorgakant",
    authorRole: "Gynecologue, Clinique du Nord",
    reviewer: "Dr. Rajiv Doobur",
    reviewerRole: "Obstetricien, Wellkin Hospital",
    readTime: 7,
    date: "2 Avril 2026",
    category: "Healthcare",
    content: [
      "Choisir son gynecologue est une des decisions les plus importantes de votre grossesse. A Maurice, vous avez le choix entre le secteur public (hopitaux regionaux comme SSRN, Victoria, Jawaharlal Nehru) et le prive (Clinique du Nord, Wellkin, City Clinic, Apollo Bramwell). Chaque option a ses avantages, et le plus important est de trouver un praticien avec qui vous vous sentez en confiance.",
      "Dans le secteur public, les consultations prenatales sont gratuites et les equipes sont competentes. Cependant, vous ne choisissez pas toujours le medecin qui vous suit, et le jour de l'accouchement, c'est le medecin de garde qui intervient. Si la continuite des soins est importante pour vous, le prive offre cette garantie — mais a un cout qui varie de Rs 80,000 a Rs 150,000 pour un accouchement normal.",
      "Voici les questions essentielles a poser lors de votre premiere consultation: Quel est votre taux de cesarienne? Etes-vous disponible 24/7 pour l'accouchement? Quelle est votre politique sur l'episiotomie? Acceptez-vous un plan de naissance? Comment gerez-vous les urgences? Un bon gynecologue prendra le temps de repondre a toutes vos questions sans vous faire sentir pressee.",
      "Nos recommandations par district: a Port Louis, le Dr. Doorgakant (Clinique du Nord) et le Dr. Doobur (SSRN) sont tres bien notes. A Curepipe, le Dr. Ramjaun et le Dr. Doobur (Wellkin) sont recommandes. A Rose Hill, le Dr. Doobur (clinique privee) a d'excellents avis. N'hesitez pas a consulter notre annuaire pour voir les avis verifies des autres mamans.",
    ],
    keyPoints: [
      "Comparez secteur public (gratuit) et prive (Rs 80,000-150,000)",
      "Privilegiez un medecin qui respecte vos choix",
      "Posez des questions sur le taux de cesarienne",
      "Demandez la disponibilite 24/7 pour l'accouchement",
      "Consultez les avis d'autres mamans",
    ],
  },
  "droits-maternite-maurice-2024": {
    title: "Vos droits de maternite a Maurice en 2024",
    author: "Me. Priya Ramsaran",
    authorRole: "Avocate en droit du travail",
    reviewer: "Ministry of Labour",
    reviewerRole: "Government of Mauritius",
    readTime: 5,
    date: "28 Mars 2026",
    category: "Rights",
    content: [
      "En tant que femme enceinte travaillant a Maurice, vous beneficiez de protections legales solides sous le Workers' Rights Act 2019. Malheureusement, beaucoup de mamans ne connaissent pas leurs droits et n'osent pas les faire valoir. Cet article vous explique tout ce que vous devez savoir.",
      "Le conge maternite a Maurice est de 14 semaines payees a 100% de votre salaire. Vous pouvez commencer votre conge jusqu'a 6 semaines avant la date prevue d'accouchement. Important: si vous avez des complications, votre medecin peut prescrire un arret maladie supplementaire qui ne sera pas decompte de vos 14 semaines. Apres l'accouchement, vous avez droit a un minimum de 8 semaines de conge.",
      "Votre employeur ne peut PAS vous licencier pendant votre grossesse ni pendant votre conge maternite. C'est un licenciement abusif passible de poursuites. Si vous etes confrontee a cette situation, contactez immediatement le Ministry of Labour au 207 2600. De meme, votre employeur ne peut pas vous refuser une promotion ou changer vos conditions de travail a cause de votre grossesse.",
      "Pour l'allaitement, la loi vous accorde deux pauses de 30 minutes par jour pendant les 6 premiers mois de votre bebe. Ces pauses sont payees et ne peuvent pas etre deduites de votre salaire. Vous avez egalement le droit de vous absenter pour vos rendez-vous prenataux sans perte de salaire, a condition de presenter un certificat medical.",
    ],
    keyPoints: [
      "14 semaines de conge maternite paye a 100%",
      "Interdiction de licenciement pendant la grossesse",
      "2 pauses de 30 min/jour pour l'allaitement pendant 6 mois",
      "Droit aux rendez-vous prenataux sans perte de salaire",
      "Ministry of Labour: 207 2600 en cas de violation",
    ],
  },
  "cravings-grossesse-maurice": {
    title: "Cravings de grossesse: que manger a Maurice?",
    author: "Nutritionniste Aisha Jhurry",
    authorRole: "Dieteticienne clinique",
    reviewer: "Dr. Nadia Doorgakant",
    reviewerRole: "Gynecologue",
    readTime: 6,
    date: "22 Mars 2026",
    category: "Nutrition",
    content: [
      "Les envies de grossesse (cravings) sont parfaitement normales et touchent environ 75% des femmes enceintes. A Maurice, nos cravings ont une saveur locale: mangue vert avec sel et piment, tamarin confit, alouda, gato pima... Mais est-ce que tout est safe? Faisons le tri ensemble.",
      "La bonne nouvelle: la plupart des plats mauriciens sont tout a fait adaptes a la grossesse. Le dal puri, le riz avec brede, le rougaille poisson, le dholl puri — tout cela est nutritif et sans risque. Les fruits tropicaux (mangue, papaye mure, litchi, longan) sont excellents pour les vitamines. La mangue vert avec moderation est OK, mais attention a l'exces de sel et de piment qui peut aggraver les brulures d'estomac.",
      "Les aliments a eviter ou limiter: le poisson cru ou mal cuit (sashimi, mine bouille avec poisson pas assez cuit), les fromages non pasteurises (rare a Maurice mais vigilance), l'alouda en exces (la tukmariya est safe mais l'exces de lait concentre et de sucre n'est pas ideal). Le gato pima est OK avec moderation — il est frit, donc pas ideal en grande quantite.",
      "Nos super-aliments locaux pour la grossesse: les bredes (brede songe, brede mouroungue) sont riches en fer et acide folique. Le poisson frais bien cuit (bourgeois, sacree chien) apporte les omega-3 essentiels. Le curcuma dans le curry est anti-inflammatoire. Et n'oubliez pas le yaourt local pour le calcium et les probiotiques!",
    ],
    keyPoints: [
      "La plupart des plats mauriciens sont safe pendant la grossesse",
      "Evitez le poisson cru et les fromages non pasteurises",
      "Les bredes sont riches en fer et acide folique",
      "Alouda avec moderation — attention au sucre",
      "Mangue vert OK mais moderez le sel et le piment",
    ],
  },
  "guide-premier-trimestre": {
    title: "Guide complet du premier trimestre",
    author: "Dr. Rajiv Doobur",
    authorRole: "Obstetricien, Wellkin Hospital",
    reviewer: "Sage-femme Marie-Claire Noel",
    reviewerRole: "Consultante en lactation",
    readTime: 8,
    date: "15 Mars 2026",
    category: "Pregnancy",
    content: [
      "Le premier trimestre (semaines 1 a 12) est une periode cruciale ou votre bebe se developpe a une vitesse incroyable. C'est aussi la periode ou vous ressentirez les changements les plus intenses dans votre corps. A Maurice, beaucoup de mamans gardent leur grossesse secrete pendant cette periode — c'est une tradition culturelle, mais n'hesitez pas a en parler a votre medecin et a vos proches si vous avez besoin de soutien.",
      "Les symptomes courants: nausees matinales (qui peuvent durer toute la journee!), fatigue extreme, seins sensibles, envies frequentes d'uriner, et des emotions en montagnes russes. Chaque femme est differente — certaines n'auront aucun symptome, d'autres auront tout. Les nausees sont souvent pires entre les semaines 6 et 9 et s'ameliorent vers la semaine 12-14.",
      "Les examens a faire a Maurice pendant le premier trimestre: prise de sang complete (NFS, groupe sanguin, serologies), premiere echographie entre 11 et 13 semaines (echo de datation + mesure de la clarte nucale). A Maurice, ces examens sont disponibles dans tous les hopitaux publics gratuitement. En prive, comptez Rs 2,000-3,500 pour l'echographie du premier trimestre.",
      "Conseils pratiques: prenez de l'acide folique (5mg/jour, prescrit par votre medecin), reposez-vous autant que possible, buvez beaucoup d'eau (surtout avec la chaleur mauricienne), et ne culpabilisez pas si vous ne pouvez pas manger equilibre a cause des nausees — mangez ce que vous pouvez tolerer. Les biscuits cream crackers avant de se lever le matin aident beaucoup de mamans mauriciennes!",
    ],
    keyPoints: [
      "Premie echo entre 11-13 semaines",
      "Acide folique 5mg/jour des le debut",
      "Nausees normales — pics entre semaines 6-9",
      "Examens publics gratuits, prive Rs 2,000-3,500",
      "Reposez-vous — la fatigue du 1er trimestre est reelle",
    ],
  },
  "allaitement-conseils-maurice": {
    title: "Allaitement: conseils pratiques pour les mamans mauriciennes",
    author: "Sage-femme Marie-Claire Noel",
    authorRole: "Consultante en lactation, IBCLC",
    reviewer: "Dr. Nadia Doorgakant",
    reviewerRole: "Gynecologue",
    readTime: 6,
    date: "8 Mars 2026",
    category: "Postpartum",
    content: [
      "L'allaitement est un choix personnel et il n'y a pas de bonne ou mauvaise decision. A Maurice, la culture encourage fortement l'allaitement, ce qui peut etre a la fois un soutien et une pression. Que vous allaitiez exclusivement, en mixte, ou au biberon, vous etes une bonne maman. Cet article est pour celles qui souhaitent allaiter et cherchent des conseils pratiques adaptes a notre contexte mauricien.",
      "Les premieres 48 heures sont cruciales: mettez votre bebe au sein le plus tot possible apres la naissance (idealement dans l'heure). Le colostrum, ce premier lait jaune et epais, est un veritable or liquide pour l'immunite de votre bebe. Ne vous inquietez pas de la quantite — l'estomac d'un nouveau-ne est minuscule (comme une cerise!). Allaitez a la demande, pas selon un horaire fixe.",
      "Les positions qui marchent bien avec la chaleur mauricienne: la position allongee sur le cote est parfaite pour les nuits chaudes — moins de contact peau a peau qui fait transpirer. La position 'football' (bebe sous le bras) est ideale si vous avez eu une cesarienne. Investissez dans un bon coussin d'allaitement — on en trouve chez Babyland et Baby&Co a partir de Rs 800.",
      "Si vous rencontrez des difficultes (douleur, crevasses, bebe qui ne prend pas bien le sein), ne souffrez pas en silence. Il existe des consultantes en lactation certifiees IBCLC a Maurice. Le CHU de SSRN et Victoria Hospital ont des cliniques d'allaitement gratuites. En prive, une consultation avec une IBCLC coute entre Rs 1,500 et Rs 2,500. L'investissement en vaut la peine — la majorite des problemes d'allaitement se resolvent avec un bon accompagnement.",
    ],
    keyPoints: [
      "Mise au sein dans l'heure qui suit la naissance",
      "Allaitement a la demande, pas selon un horaire fixe",
      "Position allongee ideale pour le climat mauricien",
      "Cliniques d'allaitement gratuites dans les hopitaux publics",
      "Consultante IBCLC en prive: Rs 1,500-2,500",
    ],
  },
};

const relatedArticles = [
  {
    slug: "choisir-gynecologue-maurice",
    title: "Comment choisir son gynecologue a Maurice",
    readTime: 7,
    category: "Healthcare",
  },
  {
    slug: "guide-premier-trimestre",
    title: "Guide complet du premier trimestre",
    readTime: 8,
    category: "Pregnancy",
  },
  {
    slug: "cravings-grossesse-maurice",
    title: "Cravings de grossesse: que manger a Maurice?",
    readTime: 6,
    category: "Nutrition",
  },
];

export default function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const t = useTranslations("blog");
  const locale = useLocale();

  const article = articlesData[slug] || articlesData["choisir-gynecologue-maurice"];
  const config = categoryConfig[article.category] || categoryConfig.Healthcare;
  const Icon = config.icon;

  const filteredRelated = relatedArticles.filter((r) => r.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-pink-light/30 via-background to-background">
      {/* Back nav */}
      <section className="border-b bg-white/50 backdrop-blur-sm">
        <div className="mx-auto max-w-3xl px-4 py-4 sm:px-6">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("backToBlog")}
          </Link>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        {/* Article Header */}
        <AnimatedSection>
          <Badge
            variant="outline"
            className={`text-xs ${config.bgColor} ${config.color}`}
          >
            <Icon className="mr-1 h-3 w-3" />
            {article.category}
          </Badge>

          <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            {article.title}
          </h1>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>{article.author[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{article.author}</p>
                <p className="text-xs text-muted-foreground">
                  {article.authorRole}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {article.readTime} {t("minuteRead")}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {article.date}
              </span>
            </div>
          </div>

          {/* Reviewer badge */}
          <div className="mt-4">
            <Badge variant="secondary" className="gap-1.5 text-xs">
              <CheckCircle2 className="h-3 w-3 text-green-600" />
              {t("byDoctor")}: {article.reviewer} — {article.reviewerRole}
            </Badge>
          </div>
        </AnimatedSection>

        {/* Hero image placeholder */}
        <AnimatedSection delay={0.1} className="mt-6">
          <div className="h-56 sm:h-72 rounded-2xl bg-gradient-to-br from-primary/10 via-brand-pink-light to-secondary/10 flex items-center justify-center">
            <Icon className="h-20 w-20 text-primary/15" />
          </div>
        </AnimatedSection>

        {/* Key Points */}
        <AnimatedSection delay={0.15} className="mt-8">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-5">
              <h3 className="font-semibold text-sm flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                {t("keyPoints")}
              </h3>
              <ul className="mt-3 space-y-2">
                {article.keyPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Article Content */}
        <AnimatedSection delay={0.2} className="mt-8">
          <div className="prose prose-sm sm:prose-base max-w-none">
            {article.content.map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.3 + 0.08 * i,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                className="text-foreground/90 leading-7 mb-6"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </AnimatedSection>

        {/* Share */}
        <AnimatedSection delay={0.4} className="mt-8">
          <Separator className="mb-6" />
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">{t("shareArticle")}</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1.5">
                <Globe className="h-4 w-4" />
                Facebook
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5">
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Link2 className="h-4 w-4" />
                {t("copyLink")}
              </Button>
            </div>
          </div>
        </AnimatedSection>

        {/* Related Articles */}
        <AnimatedSection delay={0.5} className="mt-10">
          <h2 className="text-lg font-semibold mb-4">{t("relatedArticles")}</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {filteredRelated.map((related) => {
              const relConfig = categoryConfig[related.category] || categoryConfig.Healthcare;
              return (
                <Link key={related.slug} href={`/${locale}/blog/${related.slug}`}>
                  <Card className="group h-full border-border/50 transition-all duration-200 hover:shadow-sm hover:border-primary/30">
                    <CardContent className="p-4">
                      <Badge
                        variant="outline"
                        className={`text-xs ${relConfig.bgColor} ${relConfig.color}`}
                      >
                        {related.category}
                      </Badge>
                      <h3 className="mt-2 text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                        {related.title}
                      </h3>
                      <p className="mt-2 text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {related.readTime} {t("minuteRead")}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
