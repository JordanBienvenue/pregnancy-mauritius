"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Send,
  Heart,
  Building2,
  Handshake,
  MessageSquare,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/shared/animated-section";
import { SITE } from "@/lib/constants/site";

export default function ContactPage() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // mailto fallback — no backend needed
    const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent(formState.subject || "Business Inquiry")}&body=${encodeURIComponent(
      `Name: ${formState.name}\nCompany: ${formState.company}\nEmail: ${formState.email}\n\n${formState.message}`
    )}`;
    window.location.href = mailto;
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
    }, 1000);
  };

  const inquiryTypes = [
    { icon: Handshake, titleKey: "sponsorship", descKey: "sponsorshipDesc" },
    { icon: Building2, titleKey: "partnership", descKey: "partnershipDesc" },
    { icon: MessageSquare, titleKey: "media", descKey: "mediaDesc" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-pink-light via-background to-brand-teal-light" />
        <div className="absolute inset-0">
          <div className="absolute top-10 right-1/4 h-64 w-64 rounded-full bg-primary/8 blur-3xl" />
          <div className="absolute bottom-10 left-1/4 h-48 w-48 rounded-full bg-secondary/8 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
          <AnimatedSection>
            <Badge variant="secondary" className="mb-4 px-3 py-1 text-xs font-medium">
              <Mail className="mr-1.5 h-3 w-3" />
              {t("badge")}
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t("title")}
              </span>
            </h1>
            <p className="mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
              {t("subtitle")}
            </p>
          </AnimatedSection>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Company Details */}
            <AnimatedSection>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-100 text-pink-600">
                      <Heart className="h-4 w-4" />
                    </div>
                    {SITE.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">{t("email")}</p>
                      <a href={`mailto:${SITE.email}`} className="text-sm font-medium text-primary hover:underline">
                        {SITE.email}
                      </a>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">{t("location")}</p>
                      <p className="text-sm font-medium">
                        {SITE.address.addressLocality}, Mauritius
                      </p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-3">
                    <a
                      href={SITE.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 items-center gap-1.5 rounded-lg bg-muted px-3 text-sm text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Instagram
                    </a>
                    <a
                      href={SITE.socials.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 items-center gap-1.5 rounded-lg bg-muted px-3 text-sm text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Facebook
                    </a>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Inquiry Types */}
            <AnimatedSection delay={0.1}>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                {t("weWorkWith")}
              </h3>
              <StaggerContainer className="space-y-2">
                {inquiryTypes.map((item) => {
                  const Icon = item.icon;
                  return (
                    <StaggerItem key={item.titleKey}>
                      <div className="flex items-start gap-3 rounded-lg border border-border/60 p-3 transition-colors hover:bg-muted/50">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{t(item.titleKey)}</p>
                          <p className="text-xs text-muted-foreground">{t(item.descKey)}</p>
                        </div>
                      </div>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </AnimatedSection>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <AnimatedSection delay={0.2}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t("formTitle")}</CardTitle>
                </CardHeader>
                <CardContent>
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-12 text-center"
                    >
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-600">
                        <Send className="h-7 w-7" />
                      </div>
                      <h3 className="mt-4 text-lg font-semibold">{t("sent")}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{t("sentDesc")}</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">{t("nameLabel")}</Label>
                          <Input
                            id="name"
                            placeholder={t("namePlaceholder")}
                            value={formState.name}
                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">{t("emailLabel")}</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder={t("emailPlaceholder")}
                            value={formState.email}
                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="company">{t("companyLabel")}</Label>
                        <Input
                          id="company"
                          placeholder={t("companyPlaceholder")}
                          value={formState.company}
                          onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">{t("subjectLabel")}</Label>
                        <Input
                          id="subject"
                          placeholder={t("subjectPlaceholder")}
                          value={formState.subject}
                          onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">{t("messageLabel")}</Label>
                        <Textarea
                          id="message"
                          rows={5}
                          placeholder={t("messagePlaceholder")}
                          value={formState.message}
                          onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-primary hover:bg-brand-pink-dark"
                        disabled={sending}
                      >
                        {sending ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white"
                          />
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            {t("send")}
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
}
