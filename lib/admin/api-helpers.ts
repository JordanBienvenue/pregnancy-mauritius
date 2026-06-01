import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { type Role, hasMinimumRole } from "./role-check";

export function apiError(message: string, status: number = 400) {
  return NextResponse.json({ error: message }, { status });
}

export function apiSuccess<T>(data: T, status: number = 200) {
  return NextResponse.json(data, { status });
}

export type AuthResult = {
  userId: string;
  role: Role;
  supabase: Awaited<ReturnType<typeof createClient>>;
};

/**
 * Validates the request is from an authenticated user with the required minimum role.
 * Returns the user info and Supabase client, or a NextResponse error.
 */
export async function requireRole(
  minimumRole: Role
): Promise<AuthResult | NextResponse> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return apiError("Unauthorized", 401);
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    return apiError("Profile not found", 401);
  }

  const userRole = profile.role as Role;

  if (!hasMinimumRole(userRole, minimumRole)) {
    return apiError("Forbidden: insufficient permissions", 403);
  }

  return { userId: user.id, role: userRole, supabase };
}

/** Type guard to check if requireRole returned an error response */
export function isAuthError(
  result: AuthResult | NextResponse
): result is NextResponse {
  return result instanceof NextResponse;
}
