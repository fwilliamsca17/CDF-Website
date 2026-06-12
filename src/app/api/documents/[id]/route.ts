import { NextRequest, NextResponse } from "next/server";
import {
  createSupabaseServerClient,
  createSupabaseServiceClient,
} from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const SIGNED_URL_TTL_SECONDS = 60 * 5; // 5 min

/**
 * Document download proxy.
 * - Re-validates user via getUser() (never getSession()).
 * - RLS on loan_documents enforces who can see the row at all — the
 *   borrower/investor/both flag is policy-checked at the data layer.
 * - Signed URL is short-lived; never leaked into logs.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  const { id } = await params;

  const { data: doc, error } = await supabase
    .from("loan_documents")
    .select("storage_path")
    .eq("id", id)
    .single();
  if (error || !doc) {
    // Return uniform 404 so existence isn't leaked.
    return new NextResponse("Not found", { status: 404 });
  }

  const service = createSupabaseServiceClient();
  const { data: signed, error: signErr } = await service.storage
    .from("loan-docs")
    .createSignedUrl(doc.storage_path, SIGNED_URL_TTL_SECONDS);
  if (signErr || !signed?.signedUrl) {
    return new NextResponse("Not found", { status: 404 });
  }
  return NextResponse.redirect(signed.signedUrl);
}
