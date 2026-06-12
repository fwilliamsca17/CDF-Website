import Link from "next/link";
import { CDF_PHONE } from "@/lib/portal/constants";
import SignOutButton from "./SignOutButton";

type NavItem = { href: string; label: string };

interface Props {
  role: "investor" | "borrower" | "both" | "admin";
  fullName?: string | null;
}

const INVESTOR_NAV: NavItem[] = [
  { href: "/listings", label: "Listings" },
  { href: "/portfolio", label: "My Portfolio" },
  { href: "/trust-deeds/how-it-works", label: "How It Works" },
  { href: "/contact", label: "Contact" },
];

const BORROWER_NAV: NavItem[] = [
  { href: "/loans", label: "My Loans" },
  { href: "/trust-deeds/how-it-works", label: "How It Works" },
  { href: "/contact", label: "Contact" },
];

const ADMIN_NAV: NavItem[] = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/applicants", label: "Applicants" },
  { href: "/admin/listings", label: "Listings" },
  { href: "/admin/import", label: "TMO Import" },
];

export default function PortalHeader({ role, fullName }: Props) {
  const items =
    role === "admin"
      ? ADMIN_NAV
      : role === "borrower"
      ? BORROWER_NAV
      : INVESTOR_NAV; // investor + both share the investor nav

  return (
    <header className="bg-ink-900 text-ivory border-b border-champagne-700/30 print:hidden">
      <div className="container-cdf flex items-center gap-6 py-4">
        <Link
          href={role === "admin" ? "/admin" : "/dashboard"}
          className="text-lg font-heading tracking-wide focus-visible:outline focus-visible:outline-2 focus-visible:outline-champagne-400 rounded-sm"
        >
          CDF Investor Group
        </Link>
        <nav aria-label="Primary" className="flex-1">
          <ul className="flex gap-6">
            {items.map((it) => (
              <li key={it.href}>
                <Link
                  href={it.href}
                  className="text-base text-ivory hover:text-champagne-300 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-champagne-400 rounded-sm py-1"
                >
                  {it.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href={`tel:${CDF_PHONE.replace(/[^\d+]/g, "")}`}
          className="text-base text-champagne-300 hover:text-champagne-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-champagne-400 rounded-sm"
          aria-label={`Call CDF at ${CDF_PHONE}`}
        >
          Call us: {CDF_PHONE}
        </a>
        {fullName && (
          <span className="text-sm text-ivory/70" aria-label="Signed in as">
            {fullName}
          </span>
        )}
        <SignOutButton />
      </div>
    </header>
  );
}
