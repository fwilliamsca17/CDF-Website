# Investor Portal Phase 0.5 Funnel Build

Date: 2026-06-11
Branch: investor-portal-plan

## What This Chunk Adds

This chunk converts the Phase 0 investor portal from a listing/servicing demo into a tracked funding funnel.

Built:

- Listing economics fields for net investor rate, 1 percent servicing spread, borrower note rate, funding structure, retained fund interest, minimum investment, assignment status, and funds status.
- Explicit public visibility posture for each listing: hidden, sample, public teaser, or gated live.
- `allocation_requests` table with RLS, so approved investors can request an allocation on a published available listing.
- Investor listing filters that require compliance approval, `published_at`, and status of available or partially placed.
- Investor listing detail CTA: request allocation by account/vesting and requested amount.
- Admin allocation pipeline at `/admin/allocations`.
- Admin dashboard metric and navigation for active allocations.
- Listing editor fields for economics, funding structure, assignment/funds status, and public visibility.
- Listing alerts updated to say net investor rate and servicing spread instead of generic yield.
- Portfolio document links per investor account/position, using the existing signed URL download path.
- Synthetic seed examples for allocation requests and varied funding structures.

## Current Investor Funnel

1. Public visitor reviews synthetic trust deed examples.
2. Visitor submits request access.
3. Admin reviews applicant, invites, and approves.
4. Approved investor signs in.
5. Investor sees only published, compliance-approved, available listings.
6. Investor opens a listing and submits an allocation request.
7. Admin tracks request through called, qualified, docs sent, committed, funds received, assigned, and boarded.
8. Admin imports servicing data from TMO or the synthetic import path.
9. Investor sees account-grouped positions, payment history, and allowed documents in `/portfolio`.

## Still Required Before Production

- Apply `0002_investor_funnel.sql` to the target Supabase database.
- Configure Supabase and Resend env vars on Vercel for the production project.
- Decide with counsel whether any real public teaser fields can appear outside login.
- Replace synthetic TMO parser with a real redacted TMO export parser.
- Add formal suitability/accreditation review fields before real investor approvals.
- Add funding instruction/document delivery workflow if CDF wants that inside the portal instead of off-platform.
