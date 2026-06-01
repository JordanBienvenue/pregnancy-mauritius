import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isStaffRole, type Role } from "@/lib/admin/role-check";
import { AdminProvider } from "@/components/admin/admin-context";
import { AdminLayout } from "@/components/admin/admin-layout";

export default async function AdminRootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/${locale}/login?redirect=/${locale}/admin`);
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("id", user.id)
    .single();

  const role = (profile?.role ?? "user") as Role;

  if (!isStaffRole(role)) {
    redirect(`/${locale}`);
  }

  return (
    <AdminProvider
      value={{
        userId: user.id,
        fullName: profile?.full_name ?? user.email ?? "Admin",
        email: user.email ?? "",
        role,
      }}
    >
      <AdminLayout locale={locale}>{children}</AdminLayout>
    </AdminProvider>
  );
}
