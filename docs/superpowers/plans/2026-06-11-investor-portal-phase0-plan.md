# Phase 0 — Investor Portal Sandbox · Implementation Plan

**Date:** 2026-06-11
**Spec:** `docs/superpowers/specs/2026-06-11-investor-portal-design.md`
**Branch:** `investor-portal-plan` (worktree at `/tmp/cdf-investor-portal`)
**Goal of Phase 0:** all three role views (investor / borrower / public)
clickable end-to-end on a password-protected Vercel preview, backed by
self-hosted Supabase, populated **only** with obviously synthetic data.
No real names, addresses, or financials anywhere in the system.

## Definition of done

- [ ] You can register as a synthetic investor, get approved by admin,
      log in via magic link or 6-digit code, see a listing, save a
      criterion, receive a (synthetic) alert email, and view a portfolio
      grouped by accounts (one personal + one Forge Trust IRA, say).
- [ ] You can log in as a synthetic borrower and see your loan, payment
      history, and documents — with the cross-visibility rule confirmed
      (borrower never sees investor identities; investor never sees
      borrower-private docs).
- [ ] Public `/trust-deeds` + `/trust-deeds/how-it-works` render with
      educational walkthroughs in Nocturne style, no live deals, no
      yields.
- [ ] Admin can paste a deal blurb → parse → confirm fields → publish;
      drag-drop a synthetic TMO CSV → validate → commit/rollback as
      versioned batch; manually link investor↔TMO account; approve a
      pending applicant from a one-tap signed email link.
- [ ] Lighthouse a11y ≥ 95 on every public + gated page.
- [ ] Phase 1 security gate is a checklist file (will be run, not now).

Phase 1 (RLS leak tests, secrets audit, counsel sign-off) is **not** in
scope here. We build for it; we don't execute it until Phase 0 demo
passes.

## Sequence

Each chunk is independently shippable and merges to its own commit. Stop
after any chunk and the system is still in a coherent state.

### Chunk 1 — Self-hosted Supabase, hardened

1. Pull the official `supabase/supabase` docker-compose bundle into the
   existing docker stack (alongside n8n, Twenty, NPM).
2. Generate fresh JWT secret, anon key, service-role key, dashboard
   password, Postgres password — store in `.env` (gitignored), document
   in `ops/supabase-secrets.md` (not committed beyond a template).
3. NPM proxy entry: `db.capitaldf.com` → Supabase API gateway, TLS via
   Let's Encrypt. **Do not** expose Postgres port or Supabase Studio to
   the internet — LAN/VPN only.
4. SMTP wired to Resend (Supabase self-host ships no mailer); subdomain
   `listings.capitaldf.com` with SPF/DKIM/DMARC.
5. Nightly `pg_dump` to wca-data-archive; storage volume included in
   backup; **restore test documented and executed once** before any
   investor onboarding.
6. Document upgrade procedure; pin image SHAs in compose.

Acceptance: `curl https://db.capitaldf.com/auth/v1/settings` returns
healthy JSON; Studio reachable only from LAN; backup file appears in
wca-data-archive after the first nightly run.

### Chunk 2 — Schema, RLS, security-invoker views

Migrations in `supabase/migrations/`:

1. `profiles` (uid, role, name, phone, email, suitability JSON,
   ca_resident, accredited, approval_status, admin_notes, email_alerts,
   created_at). Trigger creates row on auth.users insert.
2. `investor_accounts` (1:N per profile; account_type, custodian,
   custodian_account_no, vesting_string, tmo_investor_ref).
3. `admin_users` (uid only). Populated by service-role SQL, never via
   the app.
4. `listings` (teaser-safe columns only).
5. `listing_private` (1:1, gated columns: address, appraised_value,
   purpose, borrower_notes, photo paths).
6. `borrower_loans`, `borrower_transactions`,
   `investor_positions`, `investor_transactions` (all read-only mirror
   tables, tied to import_batches).
7. `loan_documents` (visibility flag: `borrower` | `investor` | `both`).
8. `import_batches` (file, uploader, row counts, status).
9. `sent_alerts` (immutable record of every alert).
10. `investor_criteria` — schema only, matching engine deferred.

Enable `FORCE ROW LEVEL SECURITY` on every table. Default-deny per verb;
explicit policies:

- `anon` role: zero grants on base tables. Grants only on the public
  `listings_teaser` view (created `WITH (security_invoker = on)`),
  scoped to teaser-safe columns and `published_at IS NOT NULL` only.
- `authenticated` role: read own `profiles` row, read/insert/delete own
  `investor_criteria`, read own `investor_accounts` /
  `investor_positions` / `investor_transactions` /
  `borrower_loans` / `borrower_transactions`, read `loan_documents`
  scoped by visibility flag + relationship.
- Column-level grants: `authenticated` may UPDATE only
  `profiles.name`, `profiles.phone`, `profiles.email_alerts`. All
  other columns (approval_status, accredited, role,
  tmo_investor_ref) are admin-only.
- Admin policies: `auth.uid() IN (SELECT user_id FROM admin_users)`.

Acceptance: a SQL-level RLS smoke test (in `supabase/tests/rls.test.sql`,
not yet the full Phase 1 leak suite) confirms anon cannot select any
gated column and authenticated cannot read another user's rows.

### Chunk 3 — Synthetic seed

`supabase/seed/synthetic.sql` and `scripts/seed-synthetic.ts`:

- 8 investors with obviously fake names (Sample Investor A–H), phones
  (555-01xx), emails (`investor-a@example.invalid`).
- 1 of them with TWO `investor_accounts` (one personal, one Forge Trust
  IRA with vesting string "Forge Trust Co. CFBO Sample Investor C IRA
  #99001").
- 3 borrowers (Sample Borrower 1–3) with one loan each at fake
  addresses ("123 Sample St, Anywhere CA 90000").
- 1 borrower who's also an investor (`role = both`).
- 12 listings: mix of available / partially_placed / pending / funded,
  mix of 1st/2nd/3rd lien, yields 9–13%, varied LTV and amounts;
  amounts and dollar figures are obviously round-numbers ($123,456,
  $234,567) so no chart could ever look real.
- 6 months of synthetic payment transactions per loan.
- A specimen `loan_documents` row per loan (PDF placeholder), one
  borrower-visible, one investor-visible, one `both`.

Acceptance: `pnpm seed` reproducibly clears + repopulates the sandbox.
The "About this data" banner the UI will render must be unmissable.

### Chunk 4 — Next.js auth + middleware skeleton

1. Install `@supabase/supabase-js`, `@supabase/ssr`. Pin Next.js to a
   release patched for CVE-2025-29927.
2. Server-only Supabase client (`import 'server-only'`) wrapping
   service-role; cookie-bound client for user sessions.
3. Magic link + typed 6-digit code fallback (no passwords). Allowlist
   `redirectTo` to known domains only. PKCE.
4. Middleware: UX-only redirect for unauth visitors on gated routes
   (`/listings`, `/portfolio`, `/loans`, `/admin`, `/dashboard`).
   Authorization happens per-request in server components and route
   handlers — call `supabase.auth.getUser()` (re-validates JWT) and
   the admin/approval check; never trust `getSession()`.
5. `force-dynamic` + `Cache-Control: private, no-store` on every
   gated route. `noindex` meta + robots on every gated subtree;
   `sitemap.ts` excludes them.
6. "Soft re-auth" on session expiry mid-browse — redacted view + "tap
   for a fresh link", not a hard logout.

Acceptance: clicking around `/listings` while logged out routes to
`/login?next=…`; the same routes return 404-shape (not "permission
denied — exists") when accessed via direct fetch with a stale cookie.

### Chunk 5 — Nocturne portal shell + a11y baseline

1. Authenticated layout: persistent labeled nav, max 4 destinations per
   role, Frank/Francisco's phone in the header.
2. Public surface in Nocturne: `/trust-deeds` program explainer + the
   "Request access" form (writes to a `access_requests` table, no
   auth account created).
3. Typography pass: 18px base, 20px+ tabular numerals for any money.
4. CI: `pnpm lighthouse:a11y` (script + GitHub Action) enforces ≥ 95
   on listed routes; build fails below threshold.
5. Print stylesheets for `/listings`, `/portfolio`, `/loans`,
   `/trust-deeds/how-it-works`.

Acceptance: Lighthouse a11y ≥ 95 on every page; visible focus across
keyboard nav; 200% browser zoom doesn't break any screen.

### Chunk 6 — Public educational section

`/trust-deeds/how-it-works` with six static SVG/React diagrams:

1. New loan origination
2. Deed of trust + lien stack
3. Loan assignment
4. Fractionalization
5. Life of the loan + default walkthrough
6. SDIRA / Solo 401(k) — Forge Trust, Provident Trust Group, The
   Entrust Group named as custodians CDF works with

Plus glossary, FAQ, watermarked SPECIMEN documents, print/PDF view.

Acceptance: this page renders, prints cleanly, and contains zero
deal-specific data.

### Chunk 7 — Investor surfaces (listings + portfolio)

1. `/listings` — server-side filtered to `compliance_approved = true`
   and `status IN ('available', 'partially_placed')`, full terms
   visible (this is the gated audience). Detail page joins
   `listing_private`. Print view. Deep links into the right
   how-it-works section.
2. `/portfolio` — grouped by `investor_accounts`; per-account totals
   (principal outstanding, lifetime interest, YTD interest, current
   annualized yield = sum interest received / time-weighted average
   principal — no IRR, no projections). Combined ledger filterable by
   year, printable. Every screen carries the "as of <last import>"
   stamp and "your monthly statement is the official record"
   language. Freshness banner if last import > 10 days.
3. `criteria` UI is deferred — alert fan-out is "everyone" in Phase 0.

Acceptance: logged-in synthetic Sample Investor C sees both her
personal and Forge Trust positions, can print the ledger, sees the
freshness banner, and the source for every number traces to a seed row.

### Chunk 8 — Borrower surface

`/loans` — borrower's loans with balance, paid-to-date, next payment
due, payment ledger, document list (filtered by visibility flag). Payoff
figures explicitly marked "not an official payoff quote — contact us."
Same "as of <last import>" stamp. Print view.

Cross-visibility test: a synthetic user who is `both` sees both
`/portfolio` (investor lens) and `/loans` (borrower lens), and the two
views never leak each other's relationships.

### Chunk 9 — Admin

`/admin` (gated to `admin_users` uid lookup, double-checked at every
route handler — never email-based):

1. **Approvals**: pending applicants list. One-tap signed approve link
   from the email alert (signed token; no /admin login required to
   approve a single applicant from a phone).
2. **Listings CRUD**:
   - Paste-blurb input → LLM-assisted parse → field-by-field confirm
     (no defaults that resemble data). LLM is local/optional — manual
     entry path always works.
   - Compliance sign-off toggle (must be true to publish).
   - Clone-last-listing.
   - Rate-increase toggle (re-alerts on flip).
3. **Document upload**: drag-drop per-loan; visibility flag required;
   `sharp` strips EXIF/GPS server-side; UUID object keys; storage in a
   private bucket; signed URLs are short-TTL (5 min) and issued only
   after a server-side relationship check.
4. **TMO import (synthetic in Phase 0)**: drag-drop CSV →
   parser validates → preview diff → commit batch → batch is
   rollback-able. Parser is built against a generated synthetic
   "TMO-shape" CSV in Phase 0; the real export shape gets a parser
   variant in Phase 2 (once you share a redacted export).
5. **Investor↔TMO linking**: manual match (admin picks profile +
   account, types/pastes `tmo_investor_ref`). Never auto-by-email.
6. **Sent alerts log**: every alert email rendered HTML + recipient
   stored in `sent_alerts`, viewable per listing.

Acceptance: publishing a listing from `/admin` fires a synthetic alert
fan-out to every approved synthetic investor; `sent_alerts` shows the
record; an unrelated approved user gets the email; an unapproved
applicant doesn't.

### Chunk 10 — Password-protected Vercel preview

1. Vercel preview deployment for the `investor-portal-plan` branch
   with **Deployment Protection** enabled (Vercel password or SSO).
2. Env vars (Supabase URL = `db.capitaldf.com`, anon key, etc.)
   wired to preview only.
3. README section: "How to demo Phase 0" — synthetic credentials,
   reset/seed instructions, the unmissable "About this data" banner
   in-app.

Acceptance: a URL you can hand to Frank that requires the Vercel
password, lets him click through all three roles, and shows synthetic
banners on every page.

## Out of scope (deferred to Phase 1+)

- Full RLS leak test suite + automated CI gate
- `/security-review` codebase pass
- Counsel sign-off on copy, registration flow, alert templates
- Real TMO export parser
- Real investor onboarding
- Criteria-matching engine
- Web push, SMS

## Branching + merge

Work happens on `investor-portal-plan` worktree branch. Each chunk =
one or more commits; merge to `main` only after Frank signs off on
the Phase 0 demo. Until then, `main` stays public-marketing-only.
