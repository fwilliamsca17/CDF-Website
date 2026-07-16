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
  metadataBase: new URL("https://capitaldf.com"),
  title: {
    default:
      "Capital Direct Funding | Fast Private Lending for California Real Estate",
    template: "%s | Capital Direct Funding",
  },
  description:
    "Capital Direct Funding provides fast, flexible private lending solutions for real estate borrowers and whole-note first trust deed investments for accredited investors across California. Over $200M deployed, 500+ loans funded. Close in as few as 7 days.",
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
    url: "https://capitaldf.com",
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
    card: "summary",
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
    canonical: "https://capitaldf.com",
  },
  verification: {},
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
