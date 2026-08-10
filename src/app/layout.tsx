import type { Metadata } from "next";
import { Montserrat, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  OrganizationSchema,
  LocalBusinessSchema,
  WebSiteSchema,
} from "@/components/JsonLd";
import { SITE_URL } from "@/lib/constants";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Capital Direct Funding | Fast Private Lending for California Real Estate",
    template: "%s | Capital Direct Funding",
  },
  // ≤160 chars — the old 253-char version truncated mid-sentence in SERPs.
  description:
    "Direct private money lender for California real estate — 8 programs from 9.50%, $50K–$5M, closing in as few as 7 days. $200M+ funded since 2009. DRE# 01885595.",
  keywords: [
    "private money lender",
    "private money lender California",
    "hard money lender",
    "hard money lender California",
    "hard money lender Los Angeles",
    "hard money lender Orange County",
    "private lending",
    "hard money loans",
    "bridge loans California",
    "fix and flip loans",
    "fix and flip lender",
    "trust deed investments",
    "trust deed investing",
    "first trust deed investment",
    "accredited investor real estate",
    "private money loan",
    "real estate financing",
    "probate loans California",
    "construction loans private lender",
    "ADU construction loans",
    "cash out refinance private lender",
    "self employed real estate loan",
    "no tax return mortgage",
    "foreclosure bail out loans",
    "asset based lender",
    "direct private lender",
    "California real estate lending",
    "whole note investment",
    "West Covina lender",
    "fast close hard money",
    "7 day close hard money",
  ],
  authors: [{ name: "Capital Direct Funding, Inc." }],
  creator: "Capital Direct Funding, Inc.",
  publisher: "Capital Direct Funding, Inc.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Capital Direct Funding",
    title:
      "Capital Direct Funding | Fast Private Lending for California Real Estate",
    description:
      "Fast, flexible private lending for California real estate. Over $200M deployed, 500+ loans funded. Close in as few as 7 days. DRE# 01885595 | NMLS# 1159831",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Capital Direct Funding — Fast Private Lending for California Real Estate",
      },
    ],
  },
  twitter: {
    // opengraph-image is 1200x630, which is the large-image aspect — "summary"
    // would crop it to a small square thumbnail and waste the real estate.
    card: "summary_large_image",
    title: "Capital Direct Funding | Fast Private Lending",
    description:
      "Fast, flexible private lending for California real estate. Over $200M deployed, 500+ loans funded.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  // Search-console ownership tokens. Set in Vercel env (and .env.local for
  // parity); Next omits the meta tag entirely when the value is undefined, so
  // an unset var is safe — it just means that console stays unverified.
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
      : {},
  },
  category: "Finance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${montserrat.variable} ${sourceSans.variable}`}
    >
      <head>
        {/* Plain link tag, not metadata alternates.types: child pages define
            their own alternates.canonical, which replaces the parent object
            wholesale and would silently drop the feed link on every page. */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Capital Direct Funding — Blog"
          href={`${SITE_URL}/feed.xml`}
        />
        <OrganizationSchema />
        <LocalBusinessSchema />
        <WebSiteSchema />
      </head>
      <body className="font-sans antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
