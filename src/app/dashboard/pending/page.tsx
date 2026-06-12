import { Metadata } from "next";
import Link from "next/link";
import { CDF_PHONE } from "@/lib/portal/constants";

export const metadata: Metadata = {
  title: "Pending review — CDF Investor Group",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default function PendingPage() {
  return (
    <main className="min-h-screen bg-ink-950 text-ivory flex items-center justify-center px-4 py-16">
      <div className="max-w-xl text-center space-y-6">
        <h1 className="text-heading-lg font-heading">
          Your account is under review
        </h1>
        <p className="text-lg leading-relaxed">
          Thanks for requesting access to the CDF Investor Group. A
          principal will personally review your information and reach out
          shortly. Most reviews complete within one business day.
        </p>
        <p className="text-base text-ivory/80">
          Questions? Call us directly at{" "}
          <a
            href={`tel:${CDF_PHONE.replace(/[^\d+]/g, "")}`}
            className="text-champagne-300 underline"
          >
            {CDF_PHONE}
          </a>
          .
        </p>
        <Link
          href="/trust-deeds/how-it-works"
          className="inline-block mt-4 text-base text-champagne-300 underline"
        >
          While you wait, read how trust deed investing works →
        </Link>
      </div>
    </main>
  );
}
