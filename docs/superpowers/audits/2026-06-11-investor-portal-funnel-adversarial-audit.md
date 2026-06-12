# CDF Investor Portal Funnel Adversarial Audit

Date: 2026-06-11  
Branch: investor-portal-plan  
Scope: Phase 0 portal, public trust deed examples, gated investor listings, portfolio servicing view, borrower view, admin operations, Supabase schema/RLS, synthetic import path.

## Executive Verdict

The current system is a strong Phase 0 demonstration and a reasonable security foundation for a private investor portal. It can explain the trust deed product, collect access requests, approve investors, show gated listings, publish listing alerts, import synthetic servicing data, and show investors their portfolio/payment history.

It is not yet an end-to-end funded transaction system.

The largest gap is between "investor sees a loan" and "CDF has a tracked, documented, funded, assigned interest." Today that middle is handled off-platform by phone/email/manual operations. The app has no allocation request, commitment ledger, funding status, escrow checklist, assignment checklist, fund-retained-interest model, or conversion analytics.

There is also a direct posture conflict to resolve before real data: the original Phase 0 compliance spec intentionally prohibits public live listings/yields, while the revised product vision wants public pages that look like loan listings. The code now supports public synthetic examples, which is acceptable for review, but real public deal visibility needs a counsel-approved field set and status gate.

## Current System Sequence

### 1. Public Discovery

Entry points:

- `/trust-deeds`
- `/trust-deeds/[slug]`
- `/trust-deeds/how-it-works`
- `/trust-deeds/servicing-example`

Current behavior:

1. Visitor sees synthetic sample trust deed opportunities.
2. Pages explain net investor rate, 1 percent servicing spread, assignment process, lien position, LTV, term, gated documents, and servicing.
3. Visitor submits "Request access".
4. `submitAccessRequest` inserts into `access_requests` as anon.

What works:

- Good product explanation.
- Clear sample listing format.
- Good separation between public education and gated documents.
- Access request is lightweight and low-friction.

Adversarial finding:

- The original schema and spec intentionally made `listings_teaser` return nothing. Public listing-like pages are now static examples, not live deal data. If the business wants live public teasers, this must become an explicit compliance decision, not an accidental side effect.

### 2. Applicant Review

Entry points:

- `/admin/applicants`
- `handleApplicant`

Current behavior:

1. Admin reads pending `access_requests`.
2. Admin may dismiss, invite, approve, or reject.
3. Invite creates a Supabase auth user with confirmed email.
4. Profile is created or updated as pending investor.
5. Approval changes `profiles.approval_status` to `approved`.

What works:

- Public access request does not create an auth account automatically.
- Admin approval is required before gated investor access.
- Login does not disclose whether an account exists.

Adversarial findings:

- No onboarding email is sent after admin invite beyond the Supabase auth account creation.
- Suitability/accreditation fields exist in schema, but the public request form does not collect enough data for a real investor approval workflow.
- There is no review checklist for California investor rules, RE 870-style questions, risk acknowledgement, entity/vesting review, or SDIRA/Solo 401(k) custody instructions.

### 3. Sign-In And Role Routing

Entry points:

- `/login`
- `/auth/callback`
- `/dashboard`
- `src/middleware.ts`

Current behavior:

1. User requests magic link or OTP code.
2. Supabase auth validates link/code.
3. `/dashboard` checks profile approval and role.
4. Admins route to `/admin`.
5. Investors route to `/listings`.
6. Borrowers route to `/loans`.
7. Pending/rejected users route to status screens.

What works:

- Auth uses `getUser()` server-side rather than trusting cookies alone.
- Middleware is only a UX redirect layer; server components re-check access.
- Gated routes set no-store/noindex.

Adversarial finding:

- Production `capitaldf.com` is not ready for sign-in until Vercel env vars and Supabase infrastructure are configured. The current preview is structurally ready, but not live-auth ready on production.

### 4. Approved Investor Listing Review

Entry points:

- `/listings`
- `/listings/[id]`

Current behavior:

1. Approved investor sees compliance-approved listings.
2. Listing cards show rate, amount, remaining amount, lien, property type, location, LTV/CLTV, status.
3. Listing detail shows private address, appraisal value, purpose, and borrower notes.
4. CTA is currently "Call us" rather than an in-app allocation request.

What works:

- Approved-investor gate is enforced server-side.
- Public users cannot hit this route.
- Gated detail can show richer data than public examples.

Adversarial findings:

- `/listings` filters `compliance_approved = true`, but does not require `published_at IS NOT NULL` or `status IN ('available', 'partially_placed')`.
- `/listings/[id]` only checks `compliance_approved`, so an approved investor who knows an ID can view a compliance-approved but unpublished listing.
- Display copy still uses generic "Yield" in the gated listing system instead of "Net investor rate" plus explicit 1 percent servicing spread disclosure.
- There is no "request allocation", "express interest", "reserve amount", or "choose account/vesting" workflow.

### 5. Listing Admin Operations

Entry points:

- `/admin/listings`
- `/admin/listings/new`
- `/admin/listings/[id]/edit`
- `saveListing`
- `publishListing`
- `toggleRateIncrease`
- `markFunded`
- `cloneListing`

Current behavior:

1. Admin creates or edits a listing manually or from pasted text.
2. Admin can mark compliance approved.
3. Admin can publish a listing.
4. First publish sends individual email alerts to approved investors.
5. Admin can toggle rate increase alert.
6. Admin can mark listing funded.

What works:

- Admin server actions re-check admin access.
- Listing alerts are logged per recipient.
- Emails are sent individually when Resend is configured.
- Mark-funded is intentionally simple and cannot leak investor data.

Adversarial findings:

- `markFunded` only sets `status = 'funded'` and `remaining_amount = 0`. It does not create investor positions, allocations, escrow records, assignments, documents, servicing records, or TMO boarding tasks.
- The listing schema has one `yield_pct`, not separate borrower note rate, net investor rate, servicing spread, retained fund interest, or assignment status.
- The parser can help with data entry, but there is no source-of-truth attachment or compliance signoff record beyond a boolean.
- Alerts do not disclose the 1 percent servicing spread in the same language as the new public examples.

### 6. Funding Funnel

Current operational reality:

1. Visitor views public education/examples.
2. Visitor requests access.
3. CDF principal contacts investor.
4. Admin invites investor.
5. Admin approves investor.
6. Investor signs in.
7. Investor views gated listings or receives email alert.
8. Investor calls CDF to discuss a deal.
9. CDF handles commitment, funding, and assignment off-platform.
10. Admin marks listing funded.
11. TMO or synthetic import later creates portfolio positions.
12. Investor sees positions and payments in `/portfolio`.

Missing system-of-record sequence:

1. Investor requests an allocation.
2. CDF qualifies the request.
3. Investor selects vesting/account.
4. Admin sends document package.
5. Investor commits amount.
6. Funds are received.
7. Assignment is prepared.
8. Assignment is signed/recorded.
9. Position is boarded to servicing/TMO.
10. Investor receives documents and payment ledger.

This is the central gap. Without these states, the portal cannot answer:

- Which investors wanted which deal?
- How much was requested?
- How much was committed?
- Which account/vesting funded it?
- Which assignments are pending?
- Which funds are received?
- Which investors were lost and why?
- Which public/listing channels actually produced funded transactions?

### 7. Servicing And Portfolio View

Entry points:

- `/portfolio`
- `/admin/import`
- `/admin/linking`
- `/admin/documents`
- `/api/documents/[id]`

Current behavior:

1. Admin manually links investor profiles/accounts to TMO refs.
2. Admin imports synthetic TMO CSV.
3. Import creates or updates investor positions and transactions.
4. Portfolio groups positions by account/vesting.
5. Payment history shows transactions by year.
6. Documents are private and signed URLs are generated only after RLS-visible row lookup.

What works:

- Multi-account investor view is structurally correct.
- RLS prevents investors from seeing other investors' positions.
- Document download pattern is strong: RLS row visibility first, service-role signed URL second.
- Borrower and investor document visibility is separated by `doc_visibility`.

Adversarial findings:

- Investor portfolio does not currently display loan documents, even though documents and signed URL route exist.
- TMO parser is synthetic-only. Real TMO export mapping remains Phase 2.
- There is no freshness SLA workflow beyond stale banners.
- Import transaction idempotency depends on validation keys and batch status; real production imports will need stronger natural keys.
- Portfolio rate uses `rate_pct`, but the system does not make clear whether this is net investor rate after servicing spread.

### 8. Borrower View

Entry point:

- `/loans`

Current behavior:

1. Approved borrower sees linked loans.
2. Borrower sees current balance, next payment due, rate/status, payment history, and borrower-visible documents.

What works:

- Borrower data is role-gated.
- Borrower docs are filtered by visibility.
- Borrower does not see investor identities or investor economics.

Adversarial finding:

- Hybrid users can see both investor and borrower areas, which is intentional for testing, but production hybrid roles should remain rare and explicitly reviewed.

## Recommended Next Build Order

### Chunk A: Decide Public Visibility Rules

Purpose: resolve the compliance/product conflict before real data.

Add an explicit visibility model rather than using one listing surface for every audience.

Recommended fields or structure:

- `public_visibility`: `hidden`, `sample`, `public_teaser`, `gated_live`
- `public_disclaimer`
- `public_published_at`
- `gated_published_at`
- `counsel_reviewed_at`
- `counsel_reviewed_by`

Rules:

- Public sample examples may remain static and synthetic.
- Public real teasers should show only counsel-approved fields.
- Full terms, exact address, borrower package, title, appraisal, note, deed of trust, and assignment documents stay gated.

### Chunk B: Add Allocation Requests

Purpose: bridge the gap from listing interest to funded transaction.

Add `investment_requests` or `allocation_requests`:

- `id`
- `listing_id`
- `profile_id`
- `account_id`
- `requested_amount`
- `approved_amount`
- `status`: `new`, `called`, `qualified`, `docs_sent`, `committed`, `funds_received`, `assigned`, `boarded`, `declined`, `lost`
- `source`: `public_request`, `listing_detail`, `email_alert`, `manual_admin`
- `next_action`
- `owner`
- `due_at`
- `admin_notes`
- `created_at`
- `updated_at`

Investor UI:

- Add "Request allocation" on gated listing detail.
- Let investor pick vesting/account or request a new account setup.
- Confirm this is not a binding investment commitment.

Admin UI:

- Add a funnel board/table for allocation requests.
- Track requested dollars, approved dollars, next action, and owner.

### Chunk C: Model Net Rate, Spread, Fund Interest, And Assignment

Purpose: match Francisco's deal structure.

Add listing economics:

- `net_investor_rate_pct`
- `servicing_spread_pct` default 1.00
- `borrower_note_rate_pct` admin-only
- `funding_structure`: `direct_funded`, `originated_assignment`, `fund_retained_interest`
- `fund_retained_amount`
- `min_investment`
- `assignment_process_notes`

Add assignment/funding states:

- `assignment_status`: `not_started`, `drafting`, `sent`, `signed`, `recorded`, `boarded`
- `funds_status`: `not_requested`, `instructions_sent`, `partial_received`, `received`, `returned`

Keep investor-facing copy focused on net investor rate, with clear disclosure that CDF retains a 1 percent servicing spread from interest collected on the loan.

### Chunk D: Build The Funded Transaction Pipeline

Purpose: make the portal operational, not just informational.

Admin sequence:

1. Listing published.
2. Investor requests allocation.
3. Admin qualifies investor/request.
4. Admin approves amount.
5. Admin sends docs/funding instructions off-platform or through a future document workflow.
6. Admin marks committed.
7. Admin marks funds received.
8. Admin marks assignment signed/recorded.
9. Admin marks boarded to servicing.
10. Position appears in portfolio through TMO import or a controlled internal boarding action.

Required reports:

- Open requested dollars by listing.
- Committed dollars by listing.
- Funds received by listing.
- Assignment outstanding by investor/account.
- Lost requests with reasons.
- Time from access request to funded transaction.

### Chunk E: Complete Portfolio Servicing UX

Purpose: make servicing useful after funding.

Add to `/portfolio`:

- Per-position document links.
- Net investor rate label.
- Servicing spread disclosure footnote.
- Assignment/recording package status.
- Exportable yearly payment history.
- Clear "official record" language tied to TMO/import freshness.

### Chunk F: Production Readiness Gate

Purpose: make sign-in work on capitaldf.com.

Required before production:

- Supabase URL and anon key set in Vercel.
- Service role key set only as server secret.
- Resend key/from email configured.
- `NEXT_PUBLIC_PHASE_0=1` stays on for synthetic preview and off only when real-data gate passes.
- Production domain routes deployed and verified.
- First admin user inserted by service-role SQL.
- Seed users not present in production real-data environment.
- RLS smoke tests for investor, borrower, admin, and anonymous users.

## Funnel Metrics To Instrument

Track events or derived counts for:

- Public trust deed page views.
- Access request submitted.
- Applicant invited.
- Applicant approved.
- First login.
- Listing alert sent.
- Listing detail viewed.
- Allocation requested.
- Allocation qualified.
- Docs sent.
- Commitment received.
- Funds received.
- Assignment recorded.
- Servicing boarded.
- First payment posted.

The operating question is not just "did someone sign up?" It is:

Which source produced an approved investor who requested an allocation, funded a position, received an assignment, and stayed current through servicing?

## Highest-Risk Failure Modes

1. Real public listings go live before counsel-approved visibility rules exist.
2. Investors interpret gross yield as net yield because schema/copy use one `yield_pct`.
3. A listing is marked funded without any reliable allocation or assignment record.
4. Approved investors can deep-link unpublished compliance-approved listings.
5. Admin approval happens with insufficient suitability/accreditation documentation.
6. TMO import becomes the only proof of funded positions, leaving no portal-side funding pipeline.
7. Production domain is deployed without Supabase env/config and sign-in appears broken.
8. Investor servicing pages omit document packages after funding, weakening the value of the portal.

## Bottom Line

The current build is strong enough to show Francisco and Frank the shape of the investor portal and trust deed listing experience.

To support funded transactions, the next work should not be more visual polish. It should be the allocation and assignment operating layer: request allocation, approve amount, track commitment, track funds, track assignment, board to servicing, and then show the investor the net-rate portfolio with documents and payment history.
