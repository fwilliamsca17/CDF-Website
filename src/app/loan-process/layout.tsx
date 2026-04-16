import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loan Process — From Application to Funding in 7 Days",
  description:
    "Our 4-step private lending process: Apply, Underwrite, Approve, Fund. Close in as few as 7 business days. 24-hour response on all inquiries. No committee approvals, no bureaucratic delays.",
  openGraph: {
    title: "How Our Loan Process Works — Capital Direct Funding",
    description:
      "4 steps from application to funding. Close in as few as 7 days. 24-hour response guaranteed.",
  },
  alternates: { canonical: "https://capitaldf.com/loan-process" },
};

export default function LoanProcessLayout({ children }: { children: React.ReactNode }) {
  return children;
}
