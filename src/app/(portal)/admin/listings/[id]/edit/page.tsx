import Link from "next/link";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { requireAdmin } from "@/lib/supabase/server";
import ListingEditor from "../../ListingEditor";

export const metadata: Metadata = {
  title: "Edit Listing — CDF Admin",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function EditListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const guard = await requireAdmin();
  if ("redirectTo" in guard) redirect(guard.redirectTo ?? "/login");
  const { supabase } = guard;
  const { id } = await params;

  const [{ data: listing }, { data: privateRow }] = await Promise.all([
    supabase.from("listings").select("*").eq("id", id).single(),
    supabase.from("listing_private").select("*").eq("listing_id", id).maybeSingle(),
  ]);
  if (!listing) notFound();

  return (
    <main className="container-cdf py-12 space-y-8">
      <Link href="/admin/listings" className="text-sm text-champagne-300 underline">
        Back to listings
      </Link>
      <header>
        <h1 className="text-heading-lg font-heading">Edit listing</h1>
        <p className="text-base text-ivory/70">
          Publishing sends a member-only alert after compliance sign-off.
        </p>
      </header>
      <ListingEditor
        initial={{
          listing_id: listing.id,
          amount: listing.amount,
          remaining_amount: listing.remaining_amount,
          yield_pct: listing.yield_pct,
          lien_position: listing.lien_position,
          property_type: listing.property_type,
          city: listing.city,
          state: listing.state,
          ltv_pct: listing.ltv_pct,
          cltv_pct: listing.cltv_pct,
          term_months: listing.term_months,
          amortization: listing.amortization,
          prepay_months: listing.prepay_months,
          occupancy: listing.occupancy,
          status: listing.status,
          rate_increase: listing.rate_increase,
          compliance_approved: listing.compliance_approved,
          address: privateRow?.address,
          appraised_value: privateRow?.appraised_value,
          purpose: privateRow?.purpose,
          borrower_notes: privateRow?.borrower_notes,
        }}
      />
    </main>
  );
}
