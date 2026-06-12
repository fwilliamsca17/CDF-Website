import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { PageSeo } from "@/components/JsonLd";

const DESCRIPTION =
  "Capital Direct Funding's privacy policy — how we collect, use, and protect your personal information, including SMS opt-in data. DRE# 01885595 | NMLS# 1159831.";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: DESCRIPTION,
  alternates: { canonical: "https://capitaldf.com/privacy" },
};

/*
 * Policy text ported VERBATIM from the prior capitaldf.com/privacy-policy
 * (Squarespace) on 2026-06-11 — including the SMS opt-in / TCPA language,
 * which is load-bearing for outbound texting compliance. Do not reword
 * without Francisco's sign-off; this is published legal text.
 */
const POLICY_PARAGRAPHS = [
  "Your privacy is important to us. It is Capital Direct Funding to respect your privacy regarding any information we may collect from you across our website, https://capitaldf.com, and other sites we own and operate.",
  "No mobile information will be obtained from and/or shared with third parties or affiliates for marketing or promotional purposes. All the above categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties. You can always decline or stop receiving messages by responding “STOP” at any time. For more information, reply ‘HELP’. Message and data rates may apply. Message frequency varies.",
  "We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.",
  "We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.",
  "We don’t share or sell any personally identifying information publicly or with third-parties, except when required to by law.",
  "Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.",
  "You are free to refuse our request for your personal information by sending us an email with subject REMOVE, with the understanding that we may be unable to provide you with some of your desired services.",
  "Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to contact us.",
  "This policy is effective as of 1 January 2024.",
];

export default function PrivacyPage() {
  return (
    <>
      <PageSeo
        title="Privacy Policy | Capital Direct Funding"
        description={DESCRIPTION}
        path="/privacy"
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy" },
        ]}
      />

      <section className="hero-atmosphere relative overflow-hidden pb-14 pt-32">
        <div className="hero-grain pointer-events-none absolute inset-0 opacity-[0.06]" />
        <div className="hairline-champagne absolute inset-x-0 bottom-0 h-px" />
        <div className="relative z-10 max-container section-padding">
          <nav aria-label="Breadcrumb" className="mb-5 text-sm text-ivory/50">
            <Link href="/" className="transition-colors hover:text-champagne-300">
              Home
            </Link>
            <span className="mx-2 text-ivory/30">/</span>
            <span className="text-ivory/80">Privacy Policy</span>
          </nav>
          <h1 className="font-heading text-display font-bold leading-[1.05] text-ivory">
            Privacy Policy
          </h1>
        </div>
      </section>

      <section className="bg-light section-padding-y">
        <div className="max-container section-padding">
          <div className="mx-auto max-w-3xl space-y-6">
            {POLICY_PARAGRAPHS.map((p, i) => (
              <p key={i} className="leading-relaxed text-body">
                {p}
              </p>
            ))}

            <div className="mt-10 rounded-xl border border-cdf/10 bg-white p-6 text-sm leading-relaxed text-body">
              <p className="font-heading font-bold text-cdf">
                {SITE_CONFIG.legalName}
              </p>
              <p>
                {SITE_CONFIG.address.full} ·{" "}
                <a href="tel:+16267961680" className="text-cdf underline">
                  {SITE_CONFIG.phone}
                </a>{" "}
                ·{" "}
                <a href={`mailto:${SITE_CONFIG.email}`} className="text-cdf underline">
                  {SITE_CONFIG.email}
                </a>
              </p>
              <p className="mt-1 text-body/70">
                DRE# {SITE_CONFIG.dreLicense} | NMLS# {SITE_CONFIG.nmls}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
