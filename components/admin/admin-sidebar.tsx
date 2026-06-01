"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdmin } from "./admin-context";
import { hasMinimumRole, type Role } from "@/lib/admin/role-check";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  FileText,
  MessageSquare,
  Gift,
  CalendarCheck,
  Megaphone,
  ShoppingBag,
  Activity,
  Settings,
  Heart,
} from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  icon: React.ElementType;
  minRole: Role;
  section: string;
};

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard, minRole: "editor", section: "Overview" },
  { label: "Blog", href: "/admin/blog", icon: FileText, minRole: "editor", section: "Content" },
  { label: "Marketplace", href: "/admin/marketplace", icon: ShoppingBag, minRole: "moderator", section: "Content" },
  { label: "Forum", href: "/admin/forum", icon: MessageSquare, minRole: "moderator", section: "Community" },
  { label: "Donations", href: "/admin/donations", icon: Gift, minRole: "moderator", section: "Community" },
  { label: "Providers", href: "/admin/providers", icon: Stethoscope, minRole: "moderator", section: "Healthcare" },
  { label: "Bookings", href: "/admin/bookings", icon: CalendarCheck, minRole: "moderator", section: "Healthcare" },
  { label: "PPD Monitor", href: "/admin/ppd", icon: Activity, minRole: "moderator", section: "Healthcare" },
  { label: "Users", href: "/admin/users", icon: Users, minRole: "admin", section: "Platform" },
  { label: "Sponsors", href: "/admin/sponsors", icon: Megaphone, minRole: "admin", section: "Platform" },
  { label: "Settings", href: "/admin/settings", icon: Settings, minRole: "admin", section: "Platform" },
];

export function AdminSidebar({ locale }: { locale: string }) {
  const pathname = usePathname();
  const { role, fullName } = useAdmin();

  const filteredItems = navItems.filter((item) =>
    hasMinimumRole(role, item.minRole)
  );

  const sections = [...new Set(filteredItems.map((i) => i.section))];

  return (
    <aside className="flex h-full w-60 flex-col border-r bg-card">
      {/* Logo */}
      <div className="flex items-center gap-2 border-b px-4 py-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <Heart className="h-4 w-4 text-white" />
        </div>
        <div>
          <p className="text-sm font-bold">Manman Moris</p>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Admin
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {sections.map((section) => (
          <div key={section} className="mb-4">
            <p className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              {section}
            </p>
            {filteredItems
              .filter((item) => item.section === section)
              .map((item) => {
                const isActive =
                  item.href === "/admin"
                    ? pathname === `/${locale}/admin`
                    : pathname.startsWith(`/${locale}${item.href}`);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={`/${locale}${item.href}`}
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors",
                      isActive
                        ? "bg-primary/10 font-medium text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
          </div>
        ))}
      </nav>

      {/* User info */}
      <div className="border-t px-4 py-3">
        <p className="truncate text-sm font-medium">{fullName}</p>
        <p className="text-xs capitalize text-muted-foreground">{role}</p>
      </div>
    </aside>
  );
}
