"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Home, MessageCircle, Baby, HeartHandshake, User } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const tabs = [
  { key: "home", href: "", icon: Home, labelKey: "home" },
  { key: "forum", href: "/forum", icon: MessageCircle, labelKey: "forum" },
  { key: "tracker", href: "/tracker", icon: Baby, labelKey: "tracker" },
  { key: "donate", href: "/donate", icon: HeartHandshake, labelKey: "donations" },
  { key: "profile", href: "/profile", icon: User, labelKey: "profile" },
] as const;

/**
 * App-style bottom tab bar for authenticated users on mobile (< lg).
 * Hidden on desktop (the header nav takes over) and when signed out.
 */
export function BottomNav() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setAuthed(!!data.user));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) =>
      setAuthed(!!session?.user)
    );
    return () => subscription.unsubscribe();
  }, []);

  if (!authed) return null;

  // Path without the locale prefix, e.g. "/en/forum/x" -> "/forum/x".
  const rest = "/" + pathname.split("/").slice(2).join("/");

  return (
    <>
      {/* In-flow spacer so fixed bar never hides page bottom on mobile. */}
      <div aria-hidden className="h-16 lg:hidden" />
      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/95 backdrop-blur-sm lg:hidden pb-[env(safe-area-inset-bottom)]"
      >
        <ul className="mx-auto flex max-w-md items-stretch">
          {tabs.map((tab) => {
            const href = `/${locale}${tab.href}`;
            const active =
              tab.href === ""
                ? rest === "/"
                : rest === tab.href || rest.startsWith(`${tab.href}/`);
            const Icon = tab.icon;
            return (
              <li key={tab.key} className="flex-1">
                <Link
                  href={href}
                  data-testid={`bottom-nav-${tab.key}`}
                  aria-current={active ? "page" : undefined}
                  className={`flex h-16 flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors ${
                    active
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 ${active ? "fill-primary/10" : ""}`}
                  />
                  {t(tab.labelKey)}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
