"use client";

import { useEffect, useMemo, useState } from "react";
import { MessageSquareText, Phone, Copy, CheckCircle2 } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

/**
 * Internal click-to-text page for the CDF team. Opened from the
 * `team_text_link` in each lead notification email; the lead's phone, first
 * name, and quiz route arrive in the URL FRAGMENT so they never appear in
 * server logs. Not linked from anywhere public and noindexed via layout.
 */

type TemplateKey =
  | "cdf_priority_review"
  | "cdf_standard_review"
  | "resource_only"
  | "generic";

const TEMPLATE_LABELS: Record<TemplateKey, string> = {
  cdf_priority_review: "Priority review (time-sensitive)",
  cdf_standard_review: "Standard review",
  resource_only: "Resources only (no financing pitch)",
  generic: "General inquiry",
};

function buildTemplate(key: TemplateKey, lead: string, agent: string): string {
  const hi = lead ? `Hi ${lead}, ` : "Hi, ";
  const from = agent ? `this is ${agent} with Capital Direct Funding` : "this is Capital Direct Funding";
  const phone = SITE_CONFIG.phone;
  switch (key) {
    case "cdf_priority_review":
      return `${hi}${from}. I received your Property Strategy Review — your timeline may be time-sensitive, so I wanted to reach out personally. Reply here or call ${phone} and we can walk through your options today. Reply STOP to opt out.`;
    case "cdf_standard_review":
      return `${hi}${from}. Thanks for completing your Property Strategy Review. I'd like to confirm a few details so an advisor can share which programs may fit. Reply here or call ${phone}. Reply STOP to opt out.`;
    case "resource_only":
      return `${hi}${from}. Thank you for your Property Strategy Review. Based on your answers, our business-purpose programs may not be the right fit, but I'm happy to point you to helpful resources, including your mortgage servicer and HUD-approved housing counselors. Reply here or call ${phone} if that would be useful. Reply STOP to opt out.`;
    default:
      return `${hi}${from}. I received your inquiry through capitaldf.com — happy to help. Reply here or call ${phone}. Reply STOP to opt out.`;
  }
}

/** "(626) 555-0100" / "626.555.0100" -> "+16265550100"; leaves +E.164 alone. */
function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (raw.trim().startsWith("+")) return `+${digits}`;
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return digits ? `+${digits}` : "";
}

export default function TextLeadPage() {
  const [leadPhone, setLeadPhone] = useState("");
  const [leadName, setLeadName] = useState("");
  const [template, setTemplate] = useState<TemplateKey>("generic");
  const [agent, setAgent] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  // Lead details live in the fragment; agent name persists per device.
  useEffect(() => {
    const frag = new URLSearchParams(window.location.hash.slice(1));
    setLeadPhone(frag.get("p") ?? "");
    setLeadName(frag.get("fn") ?? "");
    const r = frag.get("r");
    if (r && r in TEMPLATE_LABELS) setTemplate(r as TemplateKey);
    setAgent(localStorage.getItem("cdf_agent_first_name") ?? "");
    setIsIOS(/iPhone|iPad|iPod/i.test(navigator.userAgent));
  }, []);

  useEffect(() => {
    setMessage(buildTemplate(template, leadName, agent));
  }, [template, leadName, agent]);

  const tel = normalizePhone(leadPhone);
  // iOS wants `sms:num&body=`, everything else `sms:num?body=`.
  const smsHref = useMemo(() => {
    const body = encodeURIComponent(message);
    return isIOS ? `sms:${tel}&body=${body}` : `sms:${tel}?body=${body}`;
  }, [tel, message, isIOS]);

  function saveAgent(value: string) {
    setAgent(value);
    localStorage.setItem("cdf_agent_first_name", value);
  }

  async function copyMessage() {
    await navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section className="section-padding-y bg-light min-h-screen pt-32">
      <div className="max-container section-padding">
        <div className="max-w-xl mx-auto">
          <p className="eyebrow mb-2">CDF Internal</p>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-cdf mb-6">
            Text This Lead
          </h1>

          <div className="bg-white rounded-2xl border border-cdf/5 p-6 sm:p-8 space-y-5">
            {tel ? (
              <div className="flex items-baseline justify-between gap-3">
                <div>
                  <div className="font-heading text-xl font-bold text-cdf">
                    {leadName || "Lead"}
                  </div>
                  <div className="text-body text-sm">{tel}</div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-champagne-600 bg-champagne-500/10 px-2.5 py-1 rounded-full">
                  {TEMPLATE_LABELS[template]}
                </span>
              </div>
            ) : (
              <p className="text-body text-sm" role="alert">
                No lead details found in this link. Open this page from the
                &ldquo;team_text_link&rdquo; in a lead notification email.
              </p>
            )}

            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-champagne-600 mb-1.5">
                Your first name
              </label>
              <input
                type="text"
                value={agent}
                onChange={(e) => saveAgent(e.target.value)}
                placeholder="e.g. Karla"
                className="w-full bg-light border border-cdf/10 rounded-lg px-4 py-2.5 text-cdf placeholder:text-body/50 focus:outline-none focus:border-champagne-500/60 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-champagne-600 mb-1.5">
                Template
              </label>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(TEMPLATE_LABELS) as TemplateKey[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setTemplate(key)}
                    className={`text-xs font-semibold rounded-full px-3 py-1.5 border transition-colors ${
                      template === key
                        ? "border-champagne-500 bg-champagne-500/10 text-cdf"
                        : "border-cdf/10 bg-white text-body hover:border-champagne-500/40"
                    }`}
                  >
                    {TEMPLATE_LABELS[key]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-champagne-600 mb-1.5">
                Message (edit before sending)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                className="w-full bg-light border border-cdf/10 rounded-lg px-4 py-3 text-cdf text-sm leading-relaxed focus:outline-none focus:border-champagne-500/60 transition-colors"
              />
              <p className="text-body/60 text-xs mt-1">
                {message.length} characters
                {message.length > 160 ? " — will send as multiple segments" : ""}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={smsHref}
                className={`btn-champagne flex-1 justify-center ${tel ? "" : "pointer-events-none opacity-50"}`}
              >
                <MessageSquareText className="w-5 h-5" />
                Open in Messages
              </a>
              <a
                href={tel ? `tel:${tel}` : "#"}
                className={`btn-ghost-dark flex-1 justify-center inline-flex items-center gap-2 rounded-lg border border-cdf/20 px-5 py-3 font-semibold text-cdf hover:border-champagne-500/50 transition-colors ${tel ? "" : "pointer-events-none opacity-50"}`}
              >
                <Phone className="w-5 h-5" />
                Call Lead
              </a>
              <button
                type="button"
                onClick={copyMessage}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-cdf/20 px-5 py-3 font-semibold text-cdf hover:border-champagne-500/50 transition-colors"
              >
                {copied ? (
                  <CheckCircle2 className="w-5 h-5 text-champagne-600" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>

            <p className="text-body/60 text-xs leading-relaxed border-t border-cdf/5 pt-4">
              One-to-one, human-sent messages only — this page never sends
              anything itself. Leads consented to contact when they submitted
              the form; honor STOP replies immediately and log them in the
              CRM.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
