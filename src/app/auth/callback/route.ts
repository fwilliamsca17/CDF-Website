import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const ALLOWED_REDIRECT_PREFIXES = [
  "/dashboard",
  "/listings",
  "/portfolio",
  "/loans",
  "/admin",
];

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const nextRaw = url.searchParams.get("next") ?? "/dashboard";
  const next = ALLOWED_REDIRECT_PREFIXES.some((p) => nextRaw === p || nextRaw.startsWith(p + "/"))
    ? nextRaw
    : "/dashboard";

  if (!code) {
    return NextResponse.redirect(new URL("/login?error=Missing+code", req.url));
  }
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent(error.message)}`, req.url)
    );
  }
  return NextResponse.redirect(new URL(next, req.url));
}
