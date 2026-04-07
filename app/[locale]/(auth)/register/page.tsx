"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  Calendar,
  Baby,
  ArrowRight,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function RegisterPage() {
  const t = useTranslations("auth");
  const tc = useTranslations("common");
  const locale = useLocale();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isPostpartum, setIsPostpartum] = useState(false);
  const [isSoloMother, setIsSoloMother] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    dueDate: "",
    babyDob: "",
  });

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  const steps = [
    { label: "Account", icon: User },
    { label: "Personal", icon: Heart },
    { label: "Pregnancy", icon: Baby },
  ];

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden px-4 py-12">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-teal-light via-background to-brand-pink-light" />
      <div className="absolute inset-0">
        <div className="absolute top-20 right-1/4 h-72 w-72 rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute bottom-20 left-1/4 h-64 w-64 rounded-full bg-secondary/8 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative w-full max-w-lg"
      >
        {/* Top gradient accent */}
        <div className="absolute -top-px left-1/2 h-1 w-2/3 -translate-x-1/2 rounded-full bg-gradient-to-r from-secondary via-primary to-brand-pink-dark" />

        <Card className="overflow-hidden border-border/50 shadow-xl shadow-primary/5">
          <CardContent className="p-6 sm:p-8">
            {/* Header */}
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary to-brand-teal-dark text-white shadow-lg shadow-secondary/25"
              >
                <Heart className="h-7 w-7" />
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-4 text-2xl font-bold tracking-tight"
              >
                {t("registerTitle")}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-1.5 text-sm text-muted-foreground"
              >
                {t("registerSubtitle")}
              </motion.p>
            </div>

            {/* Step indicators (visual only) */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38 }}
              className="mt-6 flex items-center justify-center gap-2"
            >
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={step.label} className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <span className="hidden text-xs font-medium text-muted-foreground sm:inline">
                        {step.label}
                      </span>
                    </div>
                    {i < steps.length - 1 && (
                      <div className="h-px w-6 bg-border sm:w-10" />
                    )}
                  </div>
                );
              })}
            </motion.div>

            {/* Social login buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6 grid grid-cols-2 gap-3"
            >
              <Button
                variant="outline"
                size="lg"
                className="h-11 gap-2 text-sm font-medium"
                type="button"
              >
                <svg className="h-4.5 w-4.5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Google
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-11 gap-2 text-sm font-medium"
                type="button"
              >
                <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </Button>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="relative my-6"
            >
              <Separator />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-3 text-xs text-muted-foreground">
                {t("orContinueWith")}
              </span>
            </motion.div>

            {/* Registration form */}
            <motion.form
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {/* Section: Account info */}
              <div className="space-y-4">
                {/* Full name */}
                <div className="space-y-2">
                  <Label htmlFor="name">{t("fullName")}</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Priya Ramgoolam"
                      value={form.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      className="h-11 pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="reg-email">{t("email")}</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="reg-email"
                      type="email"
                      placeholder="mama@email.com"
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className="h-11 pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">{t("phone")}</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+230 5XXX XXXX"
                      value={form.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      className="h-11 pl-10"
                    />
                  </div>
                </div>
              </div>

              <Separator className="my-2" />

              {/* Section: Password */}
              <div className="space-y-4">
                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="reg-password">{t("password")}</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="reg-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={form.password}
                      onChange={(e) => updateField("password", e.target.value)}
                      className="h-11 pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm password */}
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">{t("confirmPassword")}</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="confirm-password"
                      type={showConfirm ? "text" : "password"}
                      placeholder="••••••••"
                      value={form.confirmPassword}
                      onChange={(e) => updateField("confirmPassword", e.target.value)}
                      className="h-11 pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={showConfirm ? "Hide password" : "Show password"}
                    >
                      {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {form.confirmPassword && form.password !== form.confirmPassword && (
                    <p className="text-xs text-destructive">Passwords do not match</p>
                  )}
                </div>
              </div>

              <Separator className="my-2" />

              {/* Section: Pregnancy info */}
              <div className="space-y-4">
                {/* Postpartum toggle */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    role="switch"
                    aria-checked={isPostpartum}
                    onClick={() => setIsPostpartum(!isPostpartum)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                      isPostpartum ? "bg-primary" : "bg-muted"
                    }`}
                  >
                    <motion.span
                      layout
                      className="pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0"
                      style={{ x: isPostpartum ? 20 : 0 }}
                    />
                  </button>
                  <div className="flex items-center gap-2">
                    <Baby className="h-4 w-4 text-muted-foreground" />
                    <Label className="cursor-pointer" onClick={() => setIsPostpartum(!isPostpartum)}>
                      {t("imPostpartum")}
                    </Label>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {isPostpartum ? (
                    <motion.div
                      key="baby-dob"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="baby-dob">{t("babyDob")}</Label>
                        <div className="relative">
                          <Baby className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="baby-dob"
                            type="date"
                            value={form.babyDob}
                            onChange={(e) => updateField("babyDob", e.target.value)}
                            className="h-11 pl-10"
                          />
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="due-date"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="due-date">{t("dueDate")}</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="due-date"
                            type="date"
                            value={form.dueDate}
                            onChange={(e) => updateField("dueDate", e.target.value)}
                            className="h-11 pl-10"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Solo mother checkbox */}
                <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-border/60 p-3 transition-all hover:border-primary/30 hover:bg-brand-pink-light/30">
                  <div
                    role="checkbox"
                    aria-checked={isSoloMother}
                    onClick={() => setIsSoloMother(!isSoloMother)}
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
                      isSoloMother
                        ? "border-primary bg-primary text-white"
                        : "border-muted-foreground/30"
                    }`}
                  >
                    <AnimatePresence>
                      {isSoloMother && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                        >
                          <Check className="h-3.5 w-3.5" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div>
                    <span className="text-sm font-medium">{t("isSoloMother")}</span>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Join a supportive community of solo mothers in Mauritius
                    </p>
                  </div>
                  <Heart className="ml-auto h-4 w-4 text-primary/40" />
                </label>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                size="lg"
                className="h-11 w-full bg-primary text-base font-semibold hover:bg-brand-pink-dark transition-all duration-200"
                disabled={isLoading}
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white"
                  />
                ) : (
                  <>
                    {tc("register")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </motion.form>

            {/* Login link */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 text-center text-sm text-muted-foreground"
            >
              {t("hasAccount")}{" "}
              <Link
                href={`/${locale}/login`}
                className="font-semibold text-primary hover:text-brand-pink-dark transition-colors"
              >
                {tc("login")}
              </Link>
            </motion.p>
          </CardContent>
        </Card>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 text-center text-xs text-muted-foreground/60"
        >
          {tc("appName")} — {tc("tagline")}
        </motion.p>
      </motion.div>
    </div>
  );
}
