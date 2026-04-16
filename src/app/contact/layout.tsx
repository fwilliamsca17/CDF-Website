import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Get Funded in as Few as 7 Days",
  description:
    "Contact Capital Direct Funding for private lending inquiries. Call (626) 796-1680 or visit us at 100 N Citrus St, Suite 530, West Covina, CA 91791. We respond within 24 hours. DRE# 01885595 | NMLS# 1159831.",
  openGraph: {
    title: "Contact Capital Direct Funding",
    description:
      "Call (626) 796-1680. 100 N Citrus St, Suite 530, West Covina, CA 91791. 24-hour response.",
  },
  alternates: { canonical: "https://capitaldf.com/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
