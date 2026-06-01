"use client";

import { usePathname, useRouter } from "next/navigation";
import { useAdmin } from "./admin-context";
import { createClient } from "@/lib/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LogOut, ChevronRight } from "lucide-react";

export function AdminHeader({ locale }: { locale: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const { fullName, role } = useAdmin();

  // Build breadcrumb from pathname
  const segments = pathname
    .replace(`/${locale}/admin`, "")
    .split("/")
    .filter(Boolean);

  const crumbs = [
    { label: "Admin", href: `/${locale}/admin` },
    ...segments.map((seg, i) => ({
      label: seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, " "),
      href: `/${locale}/admin/${segments.slice(0, i + 1).join("/")}`,
    })),
  ];

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push(`/${locale}/login`);
  }

  return (
    <header className="flex h-14 items-center justify-between border-b bg-card px-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm">
        {crumbs.map((crumb, i) => (
          <span key={crumb.href} className="flex items-center gap-1">
            {i > 0 && (
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
            )}
            <span
              className={
                i === crumbs.length - 1
                  ? "font-medium"
                  : "text-muted-foreground"
              }
            >
              {crumb.label}
            </span>
          </span>
        ))}
      </nav>

      {/* User actions */}
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium">{fullName}</p>
          <Badge variant="outline" className="text-[10px] capitalize">
            {role}
          </Badge>
        </div>
        <Button variant="ghost" size="sm" onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
