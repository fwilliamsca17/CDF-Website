# CDF Investor Portal Phase 0 Demo Walkthrough

Date: 2026-06-12
Branch: `investor-portal-plan`
Data posture: `SANDBOX - synthetic data only`

## Preview gate

1. Deploy the `investor-portal-plan` branch to Vercel.
2. Enable Vercel Deployment Protection for Preview deployments.
3. Set the preview password or Vercel Authentication in the Vercel dashboard.
4. Confirm `NEXT_PUBLIC_PHASE_0=1` so the in-app sandbox banner is visible on every portal page.

## Required preview env vars

```bash
NEXT_PUBLIC_PHASE_0=1
NEXT_PUBLIC_SUPABASE_URL=https://db.capitaldf.com
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
RESEND_API_KEY=...
RESEND_FROM_EMAIL="CDF Investor Group <alerts@listings.capitaldf.com>"
```

Use preview-only Supabase keys and a preview-only Resend key. Do not use production investor data.

## Synthetic accounts

The seed script creates auth users and profile rows for:

| Role | Email | What to verify |
|---|---|---|
| Admin | `admin-francisco@example.invalid` | Admin dashboard, applicants, listing CRUD, import, linking, documents, alert log |
| Admin | `admin-frank@example.invalid` | Same admin path from Frank's account |
| Investor | `investor-c@example.invalid` | Two-account portfolio grouping: personal plus Forge Trust IRA |
| Hybrid | `hybrid-1@example.invalid` | Both `/portfolio` and `/loans` work without cross-visibility leakage |
| Pending | `pending-applicant@example.invalid` | Pending dashboard only |

Sign-in uses Supabase magic link / 6-digit code. In local self-host development, inspect the configured SMTP sink or Resend test inbox for links.

## Click-through script

### Public

1. Open `/trust-deeds`.
2. Confirm there are no public yields, no public listings, and the request-access form writes only an access request.
3. Open `/trust-deeds/how-it-works`.
4. Confirm the six educational diagrams render and print cleanly.

### Investor C

1. Sign in as `investor-c@example.invalid`.
2. Confirm the `SANDBOX - synthetic data only` banner is visible.
3. Open `/listings`.
4. Open one listing detail page and confirm full terms are gated.
5. Open `/portfolio`.
6. Confirm the portfolio is grouped into the personal account and "Forge Trust Co. CFBO Sample Investor C IRA #99001".
7. Print the ledger view.

### Hybrid borrower/investor

1. Sign in as `hybrid-1@example.invalid`.
2. Open `/portfolio`.
3. Open `/loans`.
4. Confirm borrower screens show loan balances/payment history/documents, but never investor identities or investor economics.
5. Confirm investor screens show positions/payment history, but never borrower-private documents.

### Admin

1. Sign in as `admin-francisco@example.invalid`.
2. Open `/admin/applicants`; invite or dismiss a synthetic applicant.
3. Open `/admin/listings/new`; paste a synthetic deal blurb, parse, manually confirm, save.
4. Toggle compliance sign-off, publish, then open `/admin/alerts` and confirm one row per approved investor.
5. Open `/admin/import`; upload the synthetic CSV template, confirm validation blocks duplicate/unknown/negative rows, commit a clean batch, then rollback.
6. Open `/admin/linking`; update an investor TMO ref and borrower TMO ref manually.
7. Open `/admin/documents`; upload a PDF or image, then confirm `/api/documents/[id]` returns a short-lived signed URL.

## Verification notes

- `pnpm` is not used in this repo; current lockfile is `package-lock.json`, so use `npm ci` for preview and CI.
- Lighthouse a11y threshold is configured at 0.95 in `lighthouserc.cjs`.
- Phase 1 security gate remains separate: no real data until RLS leak tests, storage expiry tests, bundle secret scan, counsel copy review, and restore tests pass.
