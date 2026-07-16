import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text a Lead — Internal",
  robots: { index: false, follow: false },
};

export default function TextLeadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
