# CDF Investor Portal — Gated Trust Deed Listings + Portfolio — Design Spec

**Date:** 2026-06-11
**Project:** cdf-website (Next.js 15, App Router, Tailwind, Vercel)
**Status:** Post-adversarial-audit revision (4 independent reviews: compliance, stack, security, ops/UX)

## Goal

CDF originates trust-deed loans (similar inventory to equitywavelending.com)
and wants to place them with investors through its website, and give existing
investors a branded view of their portfolio, payment history, and returns.
The Mortgage Office (TMO) is CDF's internal servicing system of record; no
TMO portal/API add-ons will be purchased — data flows via TMO's built-in
exports.

## Compliance gate (precedes everything)

The adversarial compliance review found the original "public teaser cards"
model is general solicitation, which destroys the likely securities
exemptions (CA B&P 10238 multi-lender rule; Corp. Code 25102(f)). Before
listings go live:

1. **Counsel picks the exemption** (10238 vs alternatives) — the exemption
   dictates who can see what, when. `[HUMAN — counsel engagement]`
2. **DRE broker entity settled**: which broker license CDF's trust-deed sales
   operate under; broker name + DRE license # rendered on every page and
   alert email of this section. `[HUMAN verify]`
3. **Sequencing**: relationship before offer. Public page is generic
   (program explainer, no live deals, no deal-specific yields). Listings are
   visible only to registered, suitability-screened, admin-approved
   investors.
4. **RE 870 investor questionnaire** built into onboarding; RE 851A/B
   disclosure delivery + acknowledgment per transaction (document step, can
   be off-platform in v1 but tracked in admin).
5. Every alert email is an advertisement: counsel-approved templates, CCR
   2848 yield rules, optional DRE pre-approval (B&P 10232.1). Immutable
   copies of every sent alert retained ≥4 years.
6. Listing publish requires an explicit compliance sign-off state; no number
   renders without a verified source (hard rule: no fabricated financials).

## Stack

- **Supabase, self-hosted** (docker-compose bundle) on CDF's existing docker
  stack, behind nginx proxy manager at a dedicated subdomain (e.g.
  `db.capitaldf.com`): auth (magic link only), Postgres + RLS, storage.
  Accepted trade-off: Francisco owns uptime/patching; at <300
  investors/loans, downtime is tolerable and fixable in-house.
  **Self-host hardening (required, part of the Phase 1 gate):**
  - TLS via NPM/Let's Encrypt; only ports 80/443 exposed; Supabase Studio
    and Postgres port NOT internet-reachable (LAN/VPN only).
  - All default secrets rotated (JWT secret, anon/service keys, dashboard
    password, SMTP creds); `.env` never committed.
  - Nightly `pg_dump` to the existing wca-data-archive backup routine +
    periodic restore test; storage volume included in backups.
  - Auth emails via Resend SMTP (self-hosted Supabase ships no mailer).
  - Documented upgrade procedure; pin image versions, upgrade deliberately.
  - Basic intrusion hygiene: fail2ban/rate limits at NPM, auth logs
    retained.
- **Resend** on a dedicated subdomain (e.g. `listings.capitaldf.com`) with
  SPF/DKIM/DMARC from day one; individual sends, never shared To/CC.
- Next.js stays on Vercel. New deps: `@supabase/supabase-js`,
  `@supabase/ssr`, `resend`, `sharp` (EXIF stripping), parser lib for TMO
  exports (chosen when format is known).
- **Cut from v1 (audit verdicts):** web push (iOS A2HS friction, <5% opt-in
  for this demographic), saved-criteria matching (suppresses deals at 2–7
  listing volume — email everyone everything), passwords (magic link + typed
  6-digit code fallback only, 90-day sessions), investor preference
  dashboards.
- GHL remains an alternative for the notification leg if Resend
  deliverability to AOL/Yahoo proves poor; decision deferred, not built.

## Routes

| Route | Access | Purpose |
|---|---|---|
| `/trust-deeds` | Public | Generic program explainer + register CTA. **No live deals, no deal-specific yields.** |
| `/register` | Public | Name, phone, email, RE 870-aligned suitability questions, CA-residency + accreditation attestations, alert opt-in. |
| `/login` | Public | Magic link with typed-code fallback; auth emails include Frank/Francisco's phone (the real support channel). |
| `/listings` | Approved investors | Current inventory cards + detail pages (full terms, address, appraisal, photos, remaining amount). Print-friendly. |
| `/portfolio` | Approved + TMO-linked investors | Positions, payment history, returns. Print-friendly. |
| `/loans` | Approved + TMO-linked borrowers | Borrower's loans: balance, payment history, next due, documents. Print-friendly. |
| `/trust-deeds/how-it-works` | Public | Educational visual walkthroughs: origination, deed of trust & lien positions, assignment, fractionalization, life of loan/default. Glossary, FAQ, specimen documents, printable guide. |
| `/admin` | Admins (uid-keyed) | Approve investors (one-tap from email too), listing CRUD (paste-blurb → parse → confirm), publish w/ compliance sign-off, TMO import, investor↔TMO linking. |

## Data model

**`listings`** (teaser-safe columns): amount, yield_pct, lien_position,
property_type, city, state, ltv_pct, cltv_pct, term_months, amortization,
prepay_months, occupancy, status (`available`|`partially_placed`|`pending`|
`funded`), remaining_amount, rate_increase, compliance_approved (bool),
published_at.

**`listing_private`** (1:1, structurally separate so public surfaces
physically cannot project it): address, appraised_value, purpose, photo
paths, borrower notes.

**`profiles`** (1:1 auth.users): name, phone, email, **role
(`investor`|`borrower`|`both`)**, suitability answers (investor roles only),
ca_resident, accredited, approval_status, admin_notes, tmo_investor_ref,
tmo_borrower_ref (both admin-set), email_alerts. Borrowers skip RE 870;
`both` requires the investor approval path for listings/portfolio access.

**`admin_users`**: keyed on `auth.uid()`, written only via service
role/manual SQL. Admin checks compare uid, never email.

**`import_batches`**: file name, uploaded_by, uploaded_at, row counts,
status (validated|committed|rolled_back), validation flags.

**`investor_positions`** / **`investor_transactions`**: read-only mirrors of
TMO export rows (loan ref, ownership %, principal balance, rate, status;
transaction date/type/amount/running balance), each row tied to an
import_batch.

**`investor_accounts`** (1:N per profile — a person may invest personally,
via SDIRA, and via Solo 401(k) under one login): account_type
(`individual`|`joint`|`trust`|`entity`|`sdira`|`solo_401k`), custodian
(Forge Trust, Provident Trust Group, The Entrust Group, other
self-directed), custodian account #, vesting string exactly as carried on
recorded documents and in TMO (e.g. "Forge Trust Co. CFBO John Smith IRA
#12345") — admin-entered, the per-account TMO linking key.
`investor_positions` reference an account, not the profile; portfolio view
groups by account with combined totals.

**`borrower_loans`** / **`borrower_transactions`**: read-only TMO mirrors of
the borrower side (loan ref, property address, original amount, current
principal, rate, payment amount, next due, maturity, status; payments with
interest/principal/late-charge application and running balance), tied to
import batches like the investor mirrors.

**`loan_documents`**: per-loan document vault (note, deed of trust,
settlement statement, payoff letters, year-end statements). Admin-uploaded.
Each document carries a visibility flag: `borrower` | `investor` | `both`.
Private bucket, per-loan UUID paths, short-TTL signed URLs.

**Cross-visibility rule (security-critical):** borrowers and investors view
the same loans from opposite sides. RLS partitions by relationship —
borrower sees their debt and borrower-visible docs; investor sees their
position and investor-visible docs; neither ever sees the other's identity
or economics. Enforced by separate mirror tables per role + document flags,
never by display logic.

**`sent_alerts`**: immutable copy of every alert email (recipient, listing,
rendered body, timestamp) — compliance retention + "I never got it" audits.

## Security architecture (audit-mandated)

- **Middleware is UX only.** Authorization happens at the data layer: RLS on
  every table (`FORCE ROW LEVEL SECURITY`, default-deny, explicit per-verb
  policies) plus `supabase.auth.getUser()` (never `getSession()`) + approval
  check in every server component/route handler touching gated data.
  Next.js pinned past CVE-2025-29927.
- Any views use `security_invoker = on`; anon role has zero grants on base
  gated tables.
- Profiles: column-level grants — investors can edit name/phone only;
  approval_status/accreditation/tmo_investor_ref writable only by admin RPC.
- Service role key: server-only modules, never `NEXT_PUBLIC_`, verified
  absent from client bundle.
- Storage: private bucket, UUID object keys, short-TTL signed URLs issued
  server-side post-approval-check; `sharp` strips EXIF/GPS on upload.
- Notify/import route handlers: POST-only, admin uid re-verified
  server-side, Origin checked, idempotent (publish fires once), rate-limited.
- Auth: Supabase rate limits tuned; generic responses (no account
  enumeration); redirect URLs strictly allowlisted; PKCE.
- Gated routes: `force-dynamic`, `Cache-Control: private, no-store`.
- No PII or signed URLs in logs.

## Flows

**Registration → approval**: register (suitability captured; asks "how do
you plan to invest?" — personal / IRA / Solo 401(k) / multiple, so the
approval email can include custodian next-steps) → pending →
email with applicant summary + one-tap signed approve link to BOTH Francisco
and Frank → reminder at 4h, escalate to other partner at 24h → approval email
→ access. Pending users see a redacted "what you'll get" screen, not a wall.

**Listing publish**: paste Frank's deal blurb → LLM-assisted parse into
fields → admin confirms every number (no defaults that look like data) →
compliance sign-off toggle → publish → email **all** approved investors with
full terms in the body (email must close the deal even if the click fails) +
link to detail page. Rate-increase toggle re-sends ("now 11.5%"). Clone
button for repeating loans. Staleness nag at 21 days open.

**TMO import (weekly, after payment batches)**: admin exports from TMO →
drag-drop into `/admin/import` → parser validates (unknown investor refs,
negative balances, duplicate transactions flagged; nothing silently loaded)
→ commit or roll back as a batch. Parser is built against a real redacted
TMO export, not a guessed format.

**Investor↔TMO linking**: manual admin match (never auto by email — a wrong
match shows someone else's money). Unlinked investors see listings only.

**Portfolio display**: positions, per-position and combined transaction
ledger (filter by year, printable), totals: lifetime/YTD interest received,
current annualized yield on invested principal — all computed strictly as
sums over imported rows. Every screen stamped "as of <last import> per CDF
servicing records; your monthly statement is the official record." No
projections, no IRR, nothing resembling investment advice. Freshness banner
>10 days since import + admin nag email.

## Rollout: sandbox before sensitive data

**Phase 0 — build on synthetic data only.** Self-hosted Supabase stood up on
the docker stack first (or local docker during development); the synthetic
sandbox doubles as the shakedown of the self-host install itself. Seed script creates obviously
fake investors/loans/transactions ("Sample Investor A", $123,456). Full
click-through locally and on a password-protected Vercel preview. No real
names, addresses, or financials exist anywhere in the system.

**Phase 1 — security verification gate** (must pass before any real data):
- RLS proven by automated tests: anon and wrong-investor clients return zero
  gated rows on listings_private, positions, transactions, profiles.
- `grep` of client bundle confirms no service key / no gated data inlined.
- Storage: unauthenticated fetch of a known object URL fails; signed URL
  expires.
- Auth rate limits verified; enumeration responses generic.
- `/security-review` run on the codebase; findings resolved.
- Counsel sign-off on public page copy, registration flow, alert templates.

**Phase 2 — real data, staged.** First real TMO import reviewed row-by-row
in admin before linking any investor; first 2–3 investors are friendly
accounts (Frank, a trusted investor) before general approval opens.

**Phase 3 — listings go live** once the exemption decision dictates final
visibility rules.

**Borrower display**: balances and payment history (not "returns"):
current balance, paid-to-date, next payment due, ledger per loan, documents.
Payoff figures explicitly marked "not an official payoff quote — contact us
for a payoff demand." Same "as of <last import>" stamping and freshness
banner. Linking is the same manual admin match via tmo_borrower_ref.

## Investor resources section (public, educational)

`/trust-deeds/how-it-works`: visual step-by-step walkthroughs rendered as
static SVG/React diagrams in the Nocturne design language (no heavy chart
libs):

1. New loan origination (application → underwriting → appraisal →
   escrow/title → recording → funding)
2. How the investment is secured (deed of trust, lien positions as a capital
   stack, recording, title insurance)
3. Loan assignment (note + DOT assigned and recorded, documents received)
4. Fractionalization (recorded percentage interests, payment splits;
   generic multi-lender description — CA specifics in counsel copy)
5. Life of the loan, including an honest default/foreclosure walkthrough
6. Investing through self-directed retirement accounts — SDIRA / Solo
   401(k) process (open & fund custodial account → direction-of-investment
   form → custodian funds escrow → note vested in custodian's name FBO
   investor → payments return to the account). Lists custodians CDF works
   with (Forge Trust, Provident Trust Group, The Entrust Group; any
   self-directed custodian accepted). No tax advice — "consult your CPA",
   counsel-reviewed.

Plus: glossary, FAQ, watermarked SPECIMEN document gallery (redacted deed of
trust, note, assignment), printable/PDF version of the full guide.

Compliance: educational and generic only — no live yields, no deal
references, no "safe/guaranteed" language; counsel-reviewed; broker/DRE
license identification on every page. Gated listing details may deep-link
into these explainers (e.g., fractional listings → fractionalization page).

## Error handling

- Unauthed → `/login?next=…`; pending → review screen; rejected/expired →
  clear message with phone contact (never silent "pending forever").
- Import: any validation failure blocks the batch; partial imports
  impossible.
- Alert fanout: per-recipient try/catch, send log in `sent_alerts`, admin
  sees "notified N (M failures)"; hard bounces auto-suppress to protect
  sender reputation.
- Sessions: soft re-auth (redacted view + "tap for a fresh link"), not a
  hard logout wall.

## Access posture: private membership

This is a private investor group platform, not public marketing.

- **Public surface stays minimal**: program explainer, the educational
  `/trust-deeds/how-it-works` walkthroughs (no live deals, no yields, no
  deal-specific anything), and a "Request access" form that starts a
  conversation, not an account.
- **Everything else is behind login**: listings, yields, addresses,
  portfolio, payment history, loan documents, borrower views.
- **Access is invite-confirmed**, not open registration. Approval is the
  gate; the request form is a lead, not a signup.
- **Outbound** to the group is member-only, sent individually; alert
  previews never leak terms to non-members.
- **Indexing**: `noindex` on every gated route; gated subtree excluded
  from `sitemap.xml` and robots — defense-in-depth alongside RLS.

## UX & design system (audience: older, wealthy, non-technical investors)

Goal: institutional sophistication (extends Nocturne — ink/champagne
palette, editorial typography) with senior-first usability. Sophistication
comes from typography, spacing, and restraint — never from interaction
complexity.

**Accessibility baseline (WCAG 2.2 AA minimum, AAA contrast for financial
data):**
- 18px+ base body, 20px+ financial figures, tabular numerals for money
  columns; nothing below 16px.
- Contrast ≥ 7:1 for data, ≥ 4.5:1 everywhere.
- Tap targets ≥ 44px; no hover-only affordances; no gestures or drag
  interactions on investor/borrower surfaces (admin drag-drop import ok).
- Full keyboard nav + visible focus; semantic HTML, ARIA-correct tables;
  `prefers-reduced-motion` honored.
- Layout survives 200% browser zoom.

**Simplicity rules:**
- Max 4 top-level destinations per role (investor: Listings · My Portfolio
  · How It Works · Contact). Persistent labeled nav on desktop.
- One primary verb-labeled action per screen; no icon-only buttons.
- Plain language (~8th-grade); jargon paired with inline explanation or
  glossary link.
- No infinite scroll, vanishing toasts, essential modals, or hard
  session-timeout walls (soft re-auth).
- Every screen and empty state answers "what is this and what do I do
  next."
- "Call us" is first-class: Frank/Francisco's phone in the header of every
  authenticated page, every email, every error state.
- Print styles first-class on listings, portfolio, and loan ledgers.

**Verification:** Phase 0 sandbox gets a usability pass with a
representative elderly user before Phase 2; Lighthouse a11y ≥ 95 per page
in CI (axe).

## Reporting (admin)

Per listing: who viewed / who clicked from email, reverse-chron (that's the
call list). Weekly digest: pending signups, listings open >14 days, top
viewers, last import age. Nothing more in v1.

## Out of scope (v1)

Web push, SMS (TCPA — revisit via GHL later), saved-criteria matching,
fractional allocation workflow in-app, e-signatures/VDR, TMO API
integration, GHL sync, IRR/projection analytics, multi-admin roles beyond
the two-partner allowlist.

## Testing

- RLS test suite as in Phase 1 gate (runs in CI thereafter).
- Import parser unit tests: malformed files, duplicates, unknown refs,
  rollback.
- Returns math tested against hand-computed sums on the synthetic dataset.
- Manual E2E on synthetic data: register → approve → listing publish → email
  received → portfolio renders → print views.
