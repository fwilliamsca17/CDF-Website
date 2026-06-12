"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const CHROMELESS_PREFIXES = [
  "/admin",
  "/auth/callback",
  "/dashboard",
  "/listings",
  "/loans",
  "/login",
  "/portfolio",
];

function isChromeless(pathname: string) {
  return CHROMELESS_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + "/"),
  );
}

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (isChromeless(pathname)) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
