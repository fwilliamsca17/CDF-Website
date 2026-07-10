import type { Metadata } from "next";
import LoanPageLayout from "@/components/templates/LoanPageLayout";
import { buildLoanPageMetadata } from "@/lib/loan-pages";

const PATH = "/foreclosure-bankruptcy-loans";

export const metadata: Metadata = buildLoanPageMetadata(PATH);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <LoanPageLayout path={PATH}>{children}</LoanPageLayout>;
}
