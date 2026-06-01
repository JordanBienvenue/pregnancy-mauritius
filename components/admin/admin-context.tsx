"use client";

import { createContext, useContext } from "react";
import type { Role } from "@/lib/admin/role-check";

type AdminContextValue = {
  userId: string;
  fullName: string;
  email: string;
  role: Role;
};

const AdminContext = createContext<AdminContextValue | null>(null);

export function AdminProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: AdminContextValue;
}) {
  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
}
