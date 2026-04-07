"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Menu,
  ChevronDown,
  Stethoscope,
  AlertTriangle,
  Apple,
  Scale,
  BookOpen,
  Gift,
  Baby,
  Activity,
  Users,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { LanguageSwitcher } from "./language-switcher";

type DropdownItem = {
  href: string;
  key: string;
  icon: React.ElementType;
  descKey?: string;
};

const primaryLinks = [
  { href: "/tracker", key: "tracker" },
  { href: "/directory", key: "directory" },
  { href: "/forum", key: "forum" },
] as const;

const resourcesDropdown: DropdownItem[] = [
  { href: "/food-guide", key: "foodGuide", icon: Apple },
  { href: "/rights", key: "rights", icon: Scale },
  { href: "/blog", key: "blog", icon: BookOpen },
  { href: "/emergency", key: "emergency", icon: AlertTriangle },
];

const servicesDropdown: DropdownItem[] = [
  { href: "/postpartum", key: "postpartum", icon: Activity },
  { href: "/donate", key: "donations", icon: Gift },
  { href: "/marketplace", key: "marketplace", icon: ShoppingBag },
];

const allMobileLinks = [
  { href: "/tracker", key: "tracker", icon: Baby, group: "main" },
  { href: "/directory", key: "directory", icon: Stethoscope, group: "main" },
  { href: "/forum", key: "forum", icon: Users, group: "main" },
  { href: "/postpartum", key: "postpartum", icon: Activity, group: "services" },
  { href: "/donate", key: "donations", icon: Gift, group: "services" },
  { href: "/marketplace", key: "marketplace", icon: ShoppingBag, group: "services" },
  { href: "/food-guide", key: "foodGuide", icon: Apple, group: "resources" },
  { href: "/rights", key: "rights", icon: Scale, group: "resources" },
  { href: "/blog", key: "blog", icon: BookOpen, group: "resources" },
  { href: "/emergency", key: "emergency", icon: AlertTriangle, group: "resources" },
];

function NavDropdown({
  label,
  items,
  locale,
}: {
  label: string;
  items: DropdownItem[];
  locale: string;
}) {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>(undefined);

  function handleEnter() {
    clearTimeout(timeoutRef.current);
    setOpen(true);
  }

  function handleLeave() {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  }

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        {label}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-0 top-full z-50 mt-1 w-56 overflow-hidden rounded-xl border bg-background p-1.5 shadow-lg"
          >
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.key}
                  href={`/${locale}${item.href}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-muted group"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
                    <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <span className="font-medium text-foreground">
                    {t(item.key)}
                  </span>
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Header() {
  const t = useTranslations("nav");
  const tc = useTranslations("common");
  const locale = useLocale();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2 group shrink-0">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"
          >
            <Heart className="h-4 w-4" />
          </motion.div>
          <span className="text-base font-semibold tracking-tight hidden sm:block">
            Manman<span className="text-primary"> Moris</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {primaryLinks.map((link) => (
            <Link
              key={link.key}
              href={`/${locale}${link.href}`}
              className="relative px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground group"
            >
              {t(link.key)}
              <span className="absolute inset-x-3 -bottom-px h-0.5 scale-x-0 bg-primary transition-transform group-hover:scale-x-100" />
            </Link>
          ))}

          <NavDropdown
            label={t("resources") ?? "Resources"}
            items={resourcesDropdown}
            locale={locale}
          />
          <NavDropdown
            label={t("services") ?? "Services"}
            items={servicesDropdown}
            locale={locale}
          />
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-1.5">
          <LanguageSwitcher />
          <div className="hidden md:flex items-center gap-1.5">
            <Button variant="ghost" size="sm" render={<Link href={`/${locale}/login`} />}>
              {tc("login")}
            </Button>
            <Button size="sm" className="bg-primary hover:bg-brand-pink-dark" render={<Link href={`/${locale}/register`} />}>
              {tc("register")}
            </Button>
          </div>

          {/* Mobile menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              className="lg:hidden"
              render={
                <Button variant="ghost" size="icon" aria-label="Open menu" />
              }
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-80 overflow-y-auto">
              <SheetTitle className="flex items-center gap-2 mb-2">
                <Heart className="h-5 w-5 text-primary" />
                Manman Moris
              </SheetTitle>

              {/* Main links */}
              <nav className="flex flex-col gap-0.5 mt-4">
                {allMobileLinks
                  .filter((l) => l.group === "main")
                  .map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.key}
                        href={`/${locale}${link.href}`}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                      >
                        <Icon className="h-4 w-4 text-muted-foreground" />
                        {t(link.key)}
                      </Link>
                    );
                  })}

                <Separator className="my-2" />
                <p className="px-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-1">
                  {t("services") ?? "Services"}
                </p>
                {allMobileLinks
                  .filter((l) => l.group === "services")
                  .map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.key}
                        href={`/${locale}${link.href}`}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                      >
                        <Icon className="h-4 w-4 text-muted-foreground" />
                        {t(link.key)}
                      </Link>
                    );
                  })}

                <Separator className="my-2" />
                <p className="px-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-1">
                  {t("resources") ?? "Resources"}
                </p>
                {allMobileLinks
                  .filter((l) => l.group === "resources")
                  .map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.key}
                        href={`/${locale}${link.href}`}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                      >
                        <Icon className="h-4 w-4 text-muted-foreground" />
                        {t(link.key)}
                      </Link>
                    );
                  })}

                <Separator className="my-3" />
                <div className="flex flex-col gap-2 px-1">
                  <Button
                    className="w-full"
                    onClick={() => setMobileOpen(false)}
                    render={<Link href={`/${locale}/register`} />}
                  >
                    {tc("register")}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setMobileOpen(false)}
                    render={<Link href={`/${locale}/login`} />}
                  >
                    {tc("login")}
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
