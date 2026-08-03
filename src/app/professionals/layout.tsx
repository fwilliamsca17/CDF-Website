import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Referral Partners — Private Lender for Professionals",
  description:
    "Capital Direct Funding is a direct private money lender partnering with California attorneys, CPAs, fiduciaries, escrow officers, contractors, advisors, mortgage pros, and agents. 7-day closings.",
  keywords: [
    "private lender referral partner",
    "attorney referral hard money",
    "CPA real estate referral",
    "mortgage broker referral partner",
    "real estate agent hard money lender",
    "probate attorney lender",
    "trust deed investment referral",
    "private money lender partnership",
    "California referral partner lender",
  ],
  openGraph: {
    title: "Professional Referral Partners — Capital Direct Funding",
    description:
      "Partner with a direct private lender your clients can trust. Fast closings, transparent terms, protected relationships.",
  },
  alternates: { canonical: `${SITE_URL}/professionals` },
};

export default function ProfessionalsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // NOTE: no PageSeo here. Nested layouts render into every child route, so
  // a WebPage graph emitted from this layout appears on all
  // /professionals/* pages alongside their own — two conflicting WebPage
  // identities per URL (caught in the 2026-08-03 audit). The hub's PageSeo
  // lives in professionals/page.tsx; each child renders its own.
  return <>{children}</>;
}
