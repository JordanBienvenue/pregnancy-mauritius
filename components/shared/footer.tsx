"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Heart } from "lucide-react";

export function Footer() {
  const t = useTranslations("nav");
  const locale = useLocale();

  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href={`/${locale}`} className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Heart className="h-4 w-4" />
              </div>
              <span className="font-semibold">
                Manman<span className="text-primary"> Moris</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The first all-in-one pregnancy platform for Mauritius.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h3 className="mb-3 text-sm font-semibold">Platform</h3>
            <ul className="space-y-2">
              {[
                { href: "/tracker", label: t("tracker") },
                { href: "/directory", label: t("directory") },
                { href: "/emergency", label: t("emergency") },
                { href: "/postpartum", label: t("postpartum") },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="mb-3 text-sm font-semibold">Community</h3>
            <ul className="space-y-2">
              {[
                { href: "/forum", label: t("forum") },
                { href: "/donate", label: t("donations") },
                { href: "/marketplace", label: t("marketplace") },
                { href: "/blog", label: t("blog") },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-3 text-sm font-semibold">Resources</h3>
            <ul className="space-y-2">
              {[
                { href: "/food-guide", label: t("foodGuide") },
                { href: "/rights", label: t("rights") },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Manman Moris. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Made with <Heart className="inline h-3 w-3 text-primary" /> in Mauritius
          </p>
        </div>
      </div>
    </footer>
  );
}
