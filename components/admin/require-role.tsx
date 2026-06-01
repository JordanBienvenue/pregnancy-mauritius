"use client";

import { useAdmin } from "./admin-context";
import { hasMinimumRole, type Role } from "@/lib/admin/role-check";
import { ShieldX } from "lucide-react";

export function RequireRole({
  minimum,
  children,
}: {
  minimum: Role;
  children: React.ReactNode;
}) {
  const { role } = useAdmin();

  if (!hasMinimumRole(role, minimum)) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <ShieldX className="h-12 w-12 text-muted-foreground/40" />
        <h2 className="mt-4 text-lg font-semibold">Access Denied</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          You do not have permission to access this page.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
