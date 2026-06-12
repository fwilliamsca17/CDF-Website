import Link from "next/link";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/supabase/server";
import ListingEditor from "../ListingEditor";

export const metadata: Metadata = {
  title: "New Listing — CDF Admin",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function NewListingPage() {
  const guard = await requireAdmin();
  if ("redirectTo" in guard) redirect(guard.redirectTo ?? "/login");

  return (
    <main className="container-cdf py-12 space-y-8">
      <Link href="/admin/listings" className="text-sm text-champagne-300 underline">
        Back to listings
      </Link>
      <header>
        <h1 className="text-heading-lg font-heading">New listing</h1>
        <p className="text-base text-ivory/70">
          All deal terms must be confirmed before compliance sign-off and publish.
        </p>
      </header>
      <ListingEditor />
    </main>
  );
}
