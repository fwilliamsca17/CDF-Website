# NOS Lander — Paste Artifacts

**Target page:** `https://sc.capitaldf.com/nos`
**Platform:** GoHighLevel (HighLevel funnel, scripts from `stcdn.leadconnectorhq.com`)
**Scope:** Visual + SEO/AEO/AI-EO only — forms / automations untouched.
**Decided 2026-06-09:**
- Self-canonical (this lander stays the authoritative page for NOS / foreclosure-bail-out search intent).
- New visible H1: **You Have Equity. Banks Can't Unlock It. We Can.**
  (replaces the prior placeholder; reflects Francisco's elevator pitch:
  "we help owners of real estate gain access to their equity during special
  circumstances that usually banks can't finance.")
- Three-tier CTA strategy: **Phone (primary) → Booked Call (secondary) → Free Guide (tertiary)**.
  Page currently has no phone CTA — adding `tel:+16267961680` in hero + mobile sticky bar.
- Full copy/CTA rewrite in `03-copy-rewrite.md`.

---

## What's in this folder

| File | Where it goes in GHL | Why |
|---|---|---|
| `01-header-tracking-code.html` | Funnel → `/nos` → Settings → **Header Tracking Code** | Adds the missing `<title>`, meta description, viewport, canonical, OG, Twitter, plus connected JSON-LD (`@graph`) entity linking this lander to `capitaldf.com/#organization` + FAQPage + LoanOrCredit + WebPage + BreadcrumbList |
| `02-custom-css.css` | Funnel → `/nos` → Settings → **Custom CSS** | Nocturne palette + Montserrat + champagne CTAs via GHL CSS-variable override (`--color-m9jsndry`, `--headlinefont`) + `.btn-vp .btn-hp` button restyle |

> Paste both into the **per-page** settings (not site-wide). Other landers stay untouched.

---

## Baseline before (audit 2026-06-09)

| Item | State |
|---|---|
| `<title>` | EMPTY |
| meta description | missing |
| `<link rel="canonical">` | missing |
| `<meta name="viewport">` | **missing — mobile-first index will penalize** |
| OG / Twitter | all missing |
| JSON-LD blocks | 0 |
| `<h1>` count | **16** (correct: 1) |
| Body font / heading font | Inder / Playfair Display |
| Primary color | `#215CB6` royal blue |
| Form provider | GoHighLevel (`hlForm: true`) |

The two paste blocks fix every item in this table **except** the H1 count — that one requires editing in the GHL builder UI (next section).

---

## Heading-hierarchy fix (manual, GHL editor)

CSS can re-*style* H1s as smaller headings but cannot re-*tag* them. Google + Lighthouse read the tag, not the visual size. Fix once in the builder:

1. Open the page in the GHL funnel builder.
2. For **each** text block currently marked as an `H1` **other than the hero "California Notice of Sale: Free Foreclosure Survival Guide"**: change its element tag to `H2` (or `H3` for sub-points within a section).
3. The hero heading is the **only** H1.

Specifically the 15 other H1s that need retagging (verbatim from the audit):

- "You're Not Alone — Help Is Here" → **H2**
- "What You'll Gain from Your Free Guide" → **H2**
- "Decode the Notice of Sale" → **H3** (sub-card)
- "Vetting Checklist" → **H3**
- "Protect Against Scams" → **H3**
- "Understand Private Money Loans" → **H3**
- "Discover Proven Solutions" → **H3**
- "We Understand Your Stress — You Have Options" → **H2**
- "Real Homeowners, Real Results" → **H2**
- (each testimonial heading) → **H3**
- "About Capital Direct Funding" → **H2**
- "Frequently Asked Questions" → **H2**
- Each FAQ question → **H3**
- "Act Now—Every Day Counts" → **H2**

Also worth retagging: the comparison-table cell headings (Option / What It Means / How It Helps / Reinstatement / Loan Mod / etc.) are also H1 today — they should be `<th>` inside a real `<table>`, but in GHL's builder convert them to `H4` minimum.

---

## H1 swap — change the hero text

The current visible hero says "STOP FORECLOSURE SCAMS: GET YOUR FREE SURVIVAL GUIDE". The H1 in the markup is the subtitle "Your free guide to real solutions."

In the GHL editor, change the **hero block's main heading text** to:

> **California Notice of Sale: Free Foreclosure Survival Guide**

(Match the value in `01-header-tracking-code.html`'s `<title>` and JSON-LD `WebPage.name` — keeping them in sync is what makes Google trust the page.)

---

## Verification checklist (after paste)

Run these against `https://sc.capitaldf.com/nos` once both blocks are pasted + page is republished:

- [ ] **Browser tab title** shows the new title (not the URL)
- [ ] View source: `<title>` populated; `<meta name="description">`, `<link rel="canonical">`, `<meta name="viewport">` present
- [ ] Google's Rich Results Test: `https://search.google.com/test/rich-results?url=https%3A%2F%2Fsc.capitaldf.com%2Fnos`
  - should detect: Organization, WebPage, BreadcrumbList, FinancialProduct, FAQPage
- [ ] Schema.org Validator: `https://validator.schema.org/?url=https%3A%2F%2Fsc.capitaldf.com%2Fnos` — no errors
- [ ] Open Graph Debugger (Facebook): `https://developers.facebook.com/tools/debug/?q=https%3A%2F%2Fsc.capitaldf.com%2Fnos`
- [ ] Mobile-Friendly Test: `https://search.google.com/test/mobile-friendly?url=https%3A%2F%2Fsc.capitaldf.com%2Fnos` — should pass now that viewport meta is present
- [ ] Visual: hero is nocturne (deep navy + champagne CTAs), not royal blue
- [ ] Lead-capture form still submits successfully (TCPA-safe SMS templates intact; not modified)
- [ ] Google Calendar link (`Make an Appointment`) still routes to `calendar.app.google/Q3PH64UGLBYBCG8c8`

---

## Out of scope (intentional)

- Form provider / lead-routing / SMS automation wiring — untouched by design.
- Site-wide GHL theme — only this one funnel page is restyled (per-page scope).
- New /faq /location pages on capitaldf.com — already shipped separately as part of the SEO/AEO/AI-EO commit on the main site.
