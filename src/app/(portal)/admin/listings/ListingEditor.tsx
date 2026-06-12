"use client";

import { useMemo, useState } from "react";
import { saveListing } from "./actions";

type ListingEditorValues = {
  listing_id?: string;
  amount?: string | number | null;
  remaining_amount?: string | number | null;
  yield_pct?: string | number | null;
  net_investor_rate_pct?: string | number | null;
  servicing_spread_pct?: string | number | null;
  borrower_note_rate_pct?: string | number | null;
  funding_structure?: string | null;
  fund_retained_amount?: string | number | null;
  min_investment?: string | number | null;
  assignment_status?: string | null;
  funds_status?: string | null;
  assignment_process_notes?: string | null;
  public_visibility?: string | null;
  public_disclaimer?: string | null;
  lien_position?: string | number | null;
  property_type?: string | null;
  city?: string | null;
  state?: string | null;
  ltv_pct?: string | number | null;
  cltv_pct?: string | number | null;
  term_months?: string | number | null;
  amortization?: string | null;
  prepay_months?: string | number | null;
  occupancy?: string | null;
  status?: string | null;
  rate_increase?: boolean | null;
  compliance_approved?: boolean | null;
  address?: string | null;
  appraised_value?: string | number | null;
  purpose?: string | null;
  borrower_notes?: string | null;
};

type ParsedListingFields = Partial<
  Record<
    Exclude<
      keyof ListingEditorValues,
      "listing_id" | "rate_increase" | "compliance_approved"
    >,
    string
  >
>;

function value(v: unknown) {
  if (v === null || v === undefined) return "";
  return String(v);
}

function parseBlurb(text: string): ParsedListingFields {
  const out: ParsedListingFields = {};
  const moneyMatches = [...text.matchAll(/\$?\s*([\d,]{5,})(?:\.\d{2})?/g)];
  if (moneyMatches[0]) out.amount = moneyMatches[0][1].replace(/,/g, "");
  if (moneyMatches[1]) out.appraised_value = moneyMatches[1][1].replace(/,/g, "");

  const yieldMatch = text.match(/(\d{1,2}(?:\.\d{1,2})?)\s*%/);
  if (yieldMatch) {
    out.yield_pct = yieldMatch[1];
    out.net_investor_rate_pct = yieldMatch[1];
  }

  const servicingSpread = text.match(/(\d{1,2}(?:\.\d{1,2})?)\s*%\s*(?:servicing|spread)/i);
  if (servicingSpread) out.servicing_spread_pct = servicingSpread[1];

  const lienMatch = text.match(/\b(1st|first|2nd|second|3rd|third)\b/i);
  if (lienMatch) {
    const token = lienMatch[1].toLowerCase();
    out.lien_position = token.startsWith("1") || token === "first" ? "1" : token.startsWith("2") || token === "second" ? "2" : "3";
  }

  const ltvMatch = text.match(/\bLTV\s*:?\s*(\d{1,3}(?:\.\d{1,2})?)\s*%/i);
  if (ltvMatch) out.ltv_pct = ltvMatch[1];
  const cltvMatch = text.match(/\bCLTV\s*:?\s*(\d{1,3}(?:\.\d{1,2})?)\s*%/i);
  if (cltvMatch) out.cltv_pct = cltvMatch[1];
  const termMatch = text.match(/(\d{1,3})\s*(?:month|mo)\b/i);
  if (termMatch) out.term_months = termMatch[1];

  const location = text.match(/\b([A-Z][A-Za-z .'-]+),\s*([A-Z]{2})\b/);
  if (location) {
    out.city = location[1].trim();
    out.state = location[2].trim();
  }

  const types = ["SFR", "Multifamily", "Condo", "Mixed-Use", "Industrial", "Retail", "Office", "Land"];
  const foundType = types.find((t) => text.toLowerCase().includes(t.toLowerCase()));
  if (foundType) out.property_type = foundType;

  if (/interest.only|I\/O/i.test(text)) out.amortization = "I/O";
  if (/\bNOO\b|non.owner/i.test(text)) out.occupancy = "NOO";
  if (/\bOO\b|owner.occupied/i.test(text)) out.occupancy = "OO";
  if (/fund retained|retained interest/i.test(text)) out.funding_structure = "fund_retained_interest";
  if (/direct.funded|direct funded/i.test(text)) out.funding_structure = "direct_funded";
  if (/assignment|assigned/i.test(text)) out.funding_structure = "originated_assignment";
  const prepay = text.match(/(\d{1,2})\s*(?:month|mo)\s*prepay/i);
  if (prepay) out.prepay_months = prepay[1];
  return out;
}

export default function ListingEditor({ initial }: { initial?: ListingEditorValues }) {
  const [fields, setFields] = useState<ListingEditorValues>(initial ?? {});
  const [blurb, setBlurb] = useState("");
  const parsedCount = useMemo(() => Object.keys(parseBlurb(blurb)).length, [blurb]);

  function set<K extends keyof ListingEditorValues>(
    name: K,
    next: ListingEditorValues[K],
  ) {
    setFields((prev) => ({ ...prev, [name]: next }));
  }

  function applyParse() {
    setFields((prev) => ({ ...prev, ...parseBlurb(blurb) }));
  }

  const inputClass =
    "w-full min-h-12 rounded border border-champagne-700/40 bg-ink-950 px-3 py-2 text-base text-ivory focus:outline-none focus:ring-2 focus:ring-champagne-400";

  return (
    <div className="space-y-8">
      <section className="bg-ink-900 border border-champagne-700/30 rounded-lg p-6 space-y-4">
        <h2 className="text-heading font-heading">Paste deal blurb</h2>
        <textarea
          value={blurb}
          onChange={(e) => setBlurb(e.target.value)}
          rows={5}
          className={inputClass}
          placeholder="Paste a synthetic Phase 0 deal blurb here."
        />
        <button
          type="button"
          onClick={applyParse}
          disabled={!parsedCount}
          className="rounded bg-champagne-500 px-4 py-3 text-base font-semibold text-ink-900 disabled:opacity-50"
        >
          Parse into fields
        </button>
      </section>

      <form action={saveListing} className="bg-ink-900 border border-champagne-700/30 rounded-lg p-6 space-y-6">
        {fields.listing_id && <input type="hidden" name="listing_id" value={fields.listing_id} />}

        <div className="grid md:grid-cols-3 gap-4">
          <label>
            <span className="block text-base mb-2">Loan amount</span>
            <input name="amount" required value={value(fields.amount)} onChange={(e) => set("amount", e.target.value)} className={inputClass} />
          </label>
          <label>
            <span className="block text-base mb-2">Remaining amount</span>
            <input name="remaining_amount" value={value(fields.remaining_amount)} onChange={(e) => set("remaining_amount", e.target.value)} className={inputClass} />
          </label>
          <label>
            <span className="block text-base mb-2">Legacy yield %</span>
            <input name="yield_pct" required value={value(fields.yield_pct)} onChange={(e) => set("yield_pct", e.target.value)} className={inputClass} />
          </label>
          <label>
            <span className="block text-base mb-2">Net investor rate %</span>
            <input name="net_investor_rate_pct" required value={value(fields.net_investor_rate_pct ?? fields.yield_pct)} onChange={(e) => set("net_investor_rate_pct", e.target.value)} className={inputClass} />
          </label>
          <label>
            <span className="block text-base mb-2">Servicing spread %</span>
            <input name="servicing_spread_pct" value={value(fields.servicing_spread_pct ?? 1)} onChange={(e) => set("servicing_spread_pct", e.target.value)} className={inputClass} />
          </label>
          <label>
            <span className="block text-base mb-2">Borrower note rate %</span>
            <input name="borrower_note_rate_pct" value={value(fields.borrower_note_rate_pct)} onChange={(e) => set("borrower_note_rate_pct", e.target.value)} className={inputClass} />
          </label>
          <label>
            <span className="block text-base mb-2">Lien position</span>
            <select name="lien_position" required value={value(fields.lien_position)} onChange={(e) => set("lien_position", e.target.value)} className={inputClass}>
              <option value="">Select</option>
              <option value="1">1st</option>
              <option value="2">2nd</option>
              <option value="3">3rd</option>
            </select>
          </label>
          <label>
            <span className="block text-base mb-2">Property type</span>
            <input name="property_type" required value={value(fields.property_type)} onChange={(e) => set("property_type", e.target.value)} className={inputClass} />
          </label>
          <label>
            <span className="block text-base mb-2">Status</span>
            <select name="status" value={value(fields.status ?? "available")} onChange={(e) => set("status", e.target.value)} className={inputClass}>
              <option value="available">Available</option>
              <option value="partially_placed">Partially placed</option>
              <option value="pending">Pending</option>
              <option value="funded">Funded</option>
            </select>
          </label>
          <label>
            <span className="block text-base mb-2">Funding structure</span>
            <select name="funding_structure" value={value(fields.funding_structure ?? "originated_assignment")} onChange={(e) => set("funding_structure", e.target.value)} className={inputClass}>
              <option value="originated_assignment">Originated / assignment</option>
              <option value="direct_funded">Direct-funded</option>
              <option value="fund_retained_interest">Fund retained interest</option>
            </select>
          </label>
          <label>
            <span className="block text-base mb-2">City</span>
            <input name="city" required value={value(fields.city)} onChange={(e) => set("city", e.target.value)} className={inputClass} />
          </label>
          <label>
            <span className="block text-base mb-2">State</span>
            <input name="state" required maxLength={2} value={value(fields.state)} onChange={(e) => set("state", e.target.value.toUpperCase())} className={inputClass} />
          </label>
          <label>
            <span className="block text-base mb-2">Address</span>
            <input name="address" required value={value(fields.address)} onChange={(e) => set("address", e.target.value)} className={inputClass} />
          </label>
          <label>
            <span className="block text-base mb-2">Appraised value</span>
            <input name="appraised_value" value={value(fields.appraised_value)} onChange={(e) => set("appraised_value", e.target.value)} className={inputClass} />
          </label>
          <label>
            <span className="block text-base mb-2">LTV %</span>
            <input name="ltv_pct" value={value(fields.ltv_pct)} onChange={(e) => set("ltv_pct", e.target.value)} className={inputClass} />
          </label>
          <label>
            <span className="block text-base mb-2">CLTV %</span>
            <input name="cltv_pct" value={value(fields.cltv_pct)} onChange={(e) => set("cltv_pct", e.target.value)} className={inputClass} />
          </label>
          <label>
            <span className="block text-base mb-2">Term months</span>
            <input name="term_months" value={value(fields.term_months)} onChange={(e) => set("term_months", e.target.value)} className={inputClass} />
          </label>
          <label>
            <span className="block text-base mb-2">Amortization</span>
            <input name="amortization" value={value(fields.amortization)} onChange={(e) => set("amortization", e.target.value)} className={inputClass} />
          </label>
          <label>
            <span className="block text-base mb-2">Prepay months</span>
            <input name="prepay_months" value={value(fields.prepay_months)} onChange={(e) => set("prepay_months", e.target.value)} className={inputClass} />
          </label>
          <label>
            <span className="block text-base mb-2">Occupancy</span>
            <input name="occupancy" value={value(fields.occupancy)} onChange={(e) => set("occupancy", e.target.value)} className={inputClass} />
          </label>
          <label>
            <span className="block text-base mb-2">Minimum investment</span>
            <input name="min_investment" value={value(fields.min_investment)} onChange={(e) => set("min_investment", e.target.value)} className={inputClass} />
          </label>
          <label>
            <span className="block text-base mb-2">Fund retained amount</span>
            <input name="fund_retained_amount" value={value(fields.fund_retained_amount)} onChange={(e) => set("fund_retained_amount", e.target.value)} className={inputClass} />
          </label>
          <label>
            <span className="block text-base mb-2">Assignment status</span>
            <select name="assignment_status" value={value(fields.assignment_status ?? "not_started")} onChange={(e) => set("assignment_status", e.target.value)} className={inputClass}>
              <option value="not_started">Not started</option>
              <option value="drafting">Drafting</option>
              <option value="sent">Sent</option>
              <option value="signed">Signed</option>
              <option value="recorded">Recorded</option>
              <option value="boarded">Boarded</option>
            </select>
          </label>
          <label>
            <span className="block text-base mb-2">Funds status</span>
            <select name="funds_status" value={value(fields.funds_status ?? "not_requested")} onChange={(e) => set("funds_status", e.target.value)} className={inputClass}>
              <option value="not_requested">Not requested</option>
              <option value="instructions_sent">Instructions sent</option>
              <option value="partial_received">Partial received</option>
              <option value="received">Received</option>
              <option value="returned">Returned</option>
            </select>
          </label>
          <label>
            <span className="block text-base mb-2">Public visibility</span>
            <select name="public_visibility" value={value(fields.public_visibility ?? "hidden")} onChange={(e) => set("public_visibility", e.target.value)} className={inputClass}>
              <option value="hidden">Hidden</option>
              <option value="sample">Sample only</option>
              <option value="public_teaser">Public teaser</option>
              <option value="gated_live">Gated live</option>
            </select>
          </label>
        </div>

        <label className="block">
          <span className="block text-base mb-2">Purpose</span>
          <textarea name="purpose" rows={3} value={value(fields.purpose)} onChange={(e) => set("purpose", e.target.value)} className={inputClass} />
        </label>
        <label className="block">
          <span className="block text-base mb-2">Borrower notes</span>
          <textarea name="borrower_notes" rows={3} value={value(fields.borrower_notes)} onChange={(e) => set("borrower_notes", e.target.value)} className={inputClass} />
        </label>
        <label className="block">
          <span className="block text-base mb-2">Assignment process notes</span>
          <textarea name="assignment_process_notes" rows={3} value={value(fields.assignment_process_notes)} onChange={(e) => set("assignment_process_notes", e.target.value)} className={inputClass} />
        </label>
        <label className="block">
          <span className="block text-base mb-2">Public disclaimer / counsel note</span>
          <textarea name="public_disclaimer" rows={3} value={value(fields.public_disclaimer)} onChange={(e) => set("public_disclaimer", e.target.value)} className={inputClass} />
        </label>

        <div className="flex flex-wrap gap-6">
          <label className="flex min-h-12 items-center gap-3 text-base">
            <input type="checkbox" name="compliance_approved" checked={!!fields.compliance_approved} onChange={(e) => set("compliance_approved", e.target.checked)} className="h-5 w-5" />
            Compliance sign-off complete
          </label>
          <label className="flex min-h-12 items-center gap-3 text-base">
            <input type="checkbox" name="rate_increase" checked={!!fields.rate_increase} onChange={(e) => set("rate_increase", e.target.checked)} className="h-5 w-5" />
            Rate increase flag
          </label>
        </div>

        <button type="submit" className="rounded bg-champagne-500 px-5 py-3 text-base font-semibold text-ink-900">
          Save listing
        </button>
      </form>
    </div>
  );
}
