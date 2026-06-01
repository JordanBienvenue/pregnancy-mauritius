import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { createServerClient } from "@supabase/ssr";
import { routing } from "./i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

const PROTECTED_PATHS = ["/tracker", "/forum", "/marketplace", "/profile", "/postpartum"];
const ADMIN_PATHS = ["/admin"];

export async function proxy(request: NextRequest) {
  // Run i18n middleware first
  const response = intlMiddleware(request);

  const pathname = request.nextUrl.pathname;
  // Extract locale from URL (first segment)
  const segments = pathname.split("/");
  const locale = segments[1] || "cr";
  const pathWithoutLocale = "/" + segments.slice(2).join("/");

  const needsAuth = PROTECTED_PATHS.some((p) => pathWithoutLocale.startsWith(p));
  const needsAdmin = ADMIN_PATHS.some((p) => pathWithoutLocale.startsWith(p));

  if (!needsAuth && !needsAdmin) {
    return response;
  }

  // Check Supabase session
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookies) => {
          for (const cookie of cookies) {
            response.cookies.set(cookie.name, cookie.value, cookie.options);
          }
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    const loginUrl = new URL(`/${locale}/login`, request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (needsAdmin) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    const staffRoles = ["admin", "moderator", "editor"];
    if (!profile?.role || !staffRoles.includes(profile.role)) {
      return NextResponse.redirect(new URL(`/${locale}`, request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
