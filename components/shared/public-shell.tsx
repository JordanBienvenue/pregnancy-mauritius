"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { BottomNav } from "@/components/shared/bottom-nav";

export function PublicShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.includes("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main id="main-content" className="flex-1" role="main">
        {children}
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
