import type { Metadata } from "next";
import { Montserrat, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

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
  title: {
    default: "Capital Direct Funding | Fast Private Lending for California Real Estate",
    template: "%s | Capital Direct Funding",
  },
  description:
    "Capital Direct Funding provides fast, flexible private lending solutions for real estate borrowers and whole-note first trust deed investments for accredited investors across California. Over $200M deployed, 500+ loans funded.",
  keywords: [
    "private lending",
    "hard money loans",
    "bridge loans",
    "California real estate",
    "fix and flip loans",
    "trust deed investments",
    "accredited investors",
    "private money lender",
    "real estate financing",
    "probate loans",
    "construction loans",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://capitaldf.com",
    siteName: "Capital Direct Funding",
    title: "Capital Direct Funding | Fast Private Lending for California Real Estate",
    description:
      "Fast, flexible private lending for California real estate. Over $200M deployed, 500+ loans funded. Close in as few as 7 days.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${sourceSans.variable}`}>
      <body className="font-sans antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
