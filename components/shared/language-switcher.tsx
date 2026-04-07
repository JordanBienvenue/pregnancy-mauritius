"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";

const locales = [
  { code: "cr", label: "Kreol" },
  { code: "fr", label: "Francais" },
  { code: "en", label: "English" },
];

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function handleChange(newLocale: string | null) {
    if (!newLocale) return;
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  }

  return (
    <Select value={locale} onValueChange={handleChange}>
      <SelectTrigger
        className="h-8 w-auto gap-1.5 border-none bg-transparent px-2 text-xs font-medium shadow-none focus:ring-0"
        aria-label="Select language"
      >
        <Globe className="h-3.5 w-3.5 text-muted-foreground" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="end">
        {locales.map((l) => (
          <SelectItem key={l.code} value={l.code} className="text-xs">
            {l.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
