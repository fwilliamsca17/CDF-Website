import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  Landmark,
  ReceiptText,
  ShieldCheck,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { money, pct } from "@/lib/portal/format";
import { SAMPLE_PORTFOLIO_ACCOUNTS } from "@/lib/trust-deed-examples";

export const metadata: Metadata = {
  title: "Investor Portfolio Servicing Example",
  description:
    "Synthetic example of the Capital Direct Funding investor servicing portal showing existing trust deed positions, documents, payment history, and account grouping.",
};

export default function ServicingExamplePage() {
  const totalPrincipal = SAMPLE_PORTFOLIO_ACCOUNTS.flatMap((account) =>
    account.positions.map((position) => position.currentBalance),
  ).reduce((sum, value) => sum + value, 0);

  const monthlyInterest = SAMPLE_PORTFOLIO_ACCOUNTS.flatMap((account) =>
    account.positions.map((position) => position.payments[0]?.interest ?? 0),
  ).reduce((sum, value) => sum + value, 0);

  return (
    <div className="bg-light text-body">
      <section className="bg-ink-950 text-ivory pt-32 pb-16">
        <div className="max-container section-padding">
          <Link
            href="/trust-deeds"
            className="inline-flex items-center gap-2 text-sm font-semibold text-champagne-300 hover:text-champagne-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to trust deed listings
          </Link>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-end">
            <div>
              <p className="eyebrow !text-champagne-300 mb-4">
                Investor servicing example
              </p>
              <h1 className="font-heading text-display md:text-display-lg font-bold text-white">
                Existing trust deeds, grouped by investor account.
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ivory/75">
                This sample shows what an approved investor would see after
                funding: owned trust deed interests, current balances, net
                rates, documents, and payment history by account.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-white/10 bg-white/[0.06] p-5">
                <p className="text-sm text-ivory/60">Current principal</p>
                <p className="mt-1 font-heading text-heading text-champagne-300">
                  {money(totalPrincipal)}
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[0.06] p-5">
                <p className="text-sm text-ivory/60">Sample monthly interest</p>
                <p className="mt-1 font-heading text-heading text-champagne-300">
                  {money(monthlyInterest)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="max-container section-padding">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Portfolio positions",
                body: "Each loan is shown as a trust deed interest with current principal, ownership percentage, net rate, and status.",
                icon: ShieldCheck,
              },
              {
                title: "Documents",
                body: "Assignments, deeds of trust, servicing agreements, and statements stay attached to the loan record.",
                icon: FileText,
              },
              {
                title: "Payment history",
                body: "Investors can review monthly interest, principal activity, and balances without seeing other investors' identities.",
                icon: ReceiptText,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-lg border border-cdf/10 bg-white p-6">
                  <Icon className="h-7 w-7 text-champagne-700" />
                  <h2 className="mt-4 font-heading text-lg font-bold text-cdf">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-body/75">
                    {item.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="max-container section-padding space-y-8">
          {SAMPLE_PORTFOLIO_ACCOUNTS.map((account) => (
            <section
              key={account.accountName}
              className="rounded-lg border border-cdf/10 bg-white overflow-hidden"
            >
              <header className="bg-cdf p-6 text-white">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm text-white/65">{account.accountType}</p>
                    <h2 className="font-heading text-heading font-bold">
                      {account.accountName}
                    </h2>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-md bg-white/10 px-4 py-2 text-sm">
                    <Landmark className="h-4 w-4 text-champagne-300" />
                    Sample account grouping
                  </div>
                </div>
              </header>

              <div className="divide-y divide-cdf/10">
                {account.positions.map((position) => (
                  <article key={position.loanRef} className="p-6">
                    <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
                      <div>
                        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                          <div>
                            <p className="text-sm font-semibold text-champagne-700">
                              {position.loanRef}
                            </p>
                            <h3 className="font-heading text-heading-sm font-bold text-cdf">
                              {position.title}
                            </h3>
                            <p className="text-body/60">{position.city}</p>
                          </div>
                          <span className="rounded-full bg-cdf-50 px-3 py-1 text-sm font-bold text-cdf">
                            {position.status}
                          </span>
                        </div>

                        <dl className="mt-6 grid gap-4 sm:grid-cols-4">
                          <div>
                            <dt className="text-sm text-body/55">Net rate</dt>
                            <dd className="font-heading text-lg font-bold text-cdf">
                              {pct(position.netRatePct)}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm text-body/55">Ownership</dt>
                            <dd className="font-heading text-lg font-bold text-cdf">
                              {pct(position.ownershipPct, 0)}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm text-body/55">Invested</dt>
                            <dd className="font-heading text-lg font-bold text-cdf">
                              {money(position.investedPrincipal)}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm text-body/55">Current balance</dt>
                            <dd className="font-heading text-lg font-bold text-cdf">
                              {money(position.currentBalance)}
                            </dd>
                          </div>
                        </dl>

                        <div className="mt-6 rounded-md bg-champagne-200/45 p-4 text-sm leading-relaxed text-cdf">
                          The displayed rate is net to this investor. CDF&apos;s
                          servicing spread is tracked separately and is not
                          shown as a borrower-rate calculation to the investor.
                        </div>
                      </div>

                      <div className="grid gap-4">
                        <div className="rounded-lg border border-cdf/10 bg-light p-5">
                          <h4 className="font-heading font-bold text-cdf">
                            Documents
                          </h4>
                          <ul className="mt-3 space-y-2 text-sm text-body/75">
                            {position.documents.map((doc) => (
                              <li key={doc} className="flex gap-2">
                                <FileText className="h-4 w-4 text-champagne-700 mt-0.5 shrink-0" />
                                <span>{doc}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="rounded-lg border border-cdf/10 bg-light p-5">
                          <h4 className="font-heading font-bold text-cdf">
                            Payment history
                          </h4>
                          <div className="mt-3 overflow-x-auto">
                            <table className="w-full text-left text-sm">
                              <thead className="text-body/55">
                                <tr>
                                  <th className="pb-2 font-medium">Date</th>
                                  <th className="pb-2 font-medium">Interest</th>
                                  <th className="pb-2 font-medium">Principal</th>
                                  <th className="pb-2 font-medium">Balance</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-cdf/10">
                                {position.payments.map((payment) => (
                                  <tr key={payment.date}>
                                    <td className="py-2">{payment.date}</td>
                                    <td className="py-2 font-semibold text-cdf">
                                      {money(payment.interest)}
                                    </td>
                                    <td className="py-2">{money(payment.principal)}</td>
                                    <td className="py-2">{money(payment.balance)}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="max-container section-padding text-sm leading-relaxed text-body/60">
          <p>
            Synthetic servicing example only. Real investor portals should be
            available only after login and should show only the authenticated
                            investor&apos;s own trust deed interests. Capital Direct Funding, Inc.
            DRE #{SITE_CONFIG.dreLicense}; NMLS #{SITE_CONFIG.nmls}.
          </p>
        </div>
      </section>
    </div>
  );
}
