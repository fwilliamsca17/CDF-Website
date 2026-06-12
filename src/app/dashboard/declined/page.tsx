import { Metadata } from "next";
import { CDF_PHONE } from "@/lib/portal/constants";

export const metadata: Metadata = {
  title: "Account closed — CDF Investor Group",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default function DeclinedPage() {
  return (
    <main className="min-h-screen bg-ink-950 text-ivory flex items-center justify-center px-4 py-16">
      <div className="max-w-xl text-center space-y-6">
        <h1 className="text-heading-lg font-heading">Account closed</h1>
        <p className="text-lg leading-relaxed">
          Your account is no longer active. If you believe this is in
          error, please call us at{" "}
          <a
            href={`tel:${CDF_PHONE.replace(/[^\d+]/g, "")}`}
            className="text-champagne-300 underline"
          >
            {CDF_PHONE}
          </a>
          .
        </p>
      </div>
    </main>
  );
}
