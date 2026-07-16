# Claude Code Handoff: CDF-Only Campaign System

Date: 2026-07-15

## Locked scope

The current marketing and intake phase is for Capital Direct Funding only.

- Do not create WCA landing pages, WCA routes, brokerage handoffs, sale-advisory offers, or shared CDF/WCA funnels.
- The only lead outcomes are `cdf_priority_review`, `cdf_standard_review`, and `resource_only`.
- CDF programs must be described as business-purpose real estate financing.
- Owner-occupied or otherwise consumer-purpose scenarios must not be presented as eligible CDF opportunities. Give neutral servicer/HUD/professional resources instead.
- Human review is required. The quiz is triage, not underwriting, a loan application, approval, legal advice, foreclosure consulting, or a promise to stop a sale.

## Current implementation

The Property Strategy Review is at `/property-strategy-review`.

Its quiz now routes as follows:

1. `property_use` of `primary` or `second_home` -> `resource_only`, shown immediately without collecting contact information.
2. `property_use` of `investment` or `business` plus NOD, NOS, delinquency, payoff, or time pressure -> `cdf_priority_review`.
3. Other investment/business-use submissions -> `cdf_standard_review`.

The selected route is included in the form as `recommended_route` and in the `quiz_completed` PostHog event. No PII should be sent to PostHog.

## Product direction

Visual thesis: premium, calm, direct-lender authority with enough urgency to prompt action without exploiting distress.

Content plan:

1. Full-bleed CDF hero: business-purpose financing promise and one CTA.
2. Short triage: property, use, notice/timeline, leverage estimate, financing goal.
3. Route-specific result: priority review, standard review, or neutral resources.
4. Final CTA: speak with CDF or explore CDF loan programs.

Interaction thesis:

- Keep the restrained hero entrance already implemented.
- Preserve one-question-at-a-time quiz transitions and mobile-first tap targets.
- Make priority routing visibly urgent but not alarming; do not add countdown timers or coercive motion.

## Next implementation sequence

### 1. Complete CDF intake routing

- Replace the Web3Forms-only endpoint with, or duplicate it into, the approved CDF GoHighLevel intake workflow.
- Store `recommended_route`, all quiz answers, landing page, UTM fields, referrer, consent timestamp, and consent text version.
- Assign `cdf_priority_review` to a staffed rapid-response queue.
- Assign `cdf_standard_review` to the normal borrower intake queue.
- `resource_only` visitors do not submit contact information and must not enter lending or marketing automation.

### 2. Make urgency operational

- Ask for the scheduled trustee-sale date when `timeline=nos`.
- Add an explicit priority-review SLA and internal alert.
- Never promise that CDF can postpone or stop a foreclosure.
- Display servicer and HUD counselor resources alongside any urgent result.

### 3. Finish PostHog safely

- Browser events use the `/ingest` proxy.
- `NEXT_PUBLIC_POSTHOG_HOST` is the upstream PostHog instance, not `/ingest`.
- The self-hosted `/ingest/array/:path*` proxy rewrite is implemented; preserve it.
- `routing_decision_made` is implemented. Add `quiz_step_viewed`, `contact_submitted`, `appointment_booked`, `case_qualified`, and `deal_closed` as the corresponding systems come online.
- Use a pseudonymous case ID to join PostHog and GHL outcomes. Never send name, email, phone, address, free-form notes, or loan documents to PostHog.
- Session replay is disabled globally until approved privacy language and comprehensive masking are in place; preserve that boundary.

### 4. Build the first three CDF campaigns

1. Property Strategy Review: SEO, direct-mail QR, referral traffic.
2. Bridge and time-sensitive payoff: high-intent Google Search and professional referrals.
3. Maturing loan: direct mail, existing relationships, mortgage broker and CPA referrals.

Each campaign needs a dedicated landing-page message, stable campaign ID, source/UTM capture, CDF qualification route, and outcome reporting.

### 5. Expand only after the operating loop works

- Fix and flip
- Construction, renovation, and ADU
- Cash-out for business purposes
- Probate/estate investment property
- Self-employed real estate investors
- Geographic pages for Los Angeles, Orange, San Diego, Riverside, and San Bernardino counties

## Compliance and data boundaries

- Do not edit `src/app/privacy/page.tsx` without Francisco's approval; it is legally fenced.
- Do not enable production PostHog or session replay until the approved privacy policy discloses the actual processors and practices.
- Do not use public-record distress lists for automated calls or texts without confirmed legal basis and consent controls.
- Do not use guarantees, `stop foreclosure`, `save your home`, guaranteed approval, or loan-modification language.
- Do not advise a visitor to stop communicating with a lender, attorney, servicer, or housing counselor.
- All externally published campaign copy requires human CDF review before launch.

## Acceptance criteria

- No `wca` or `both` route remains in the active Property Strategy Review code.
- Every route has tested result copy and a defined operational destination.
- Primary and second-home answers never receive CDF eligibility language.
- NOS/NOD/delinquent eligible scenarios receive the priority route.
- All form and analytics events contain the new CDF-only route names.
- TypeScript and production build pass.
- Mobile quiz works at 390x844 without skipped questions or hidden CTAs.
- No real lead is submitted during automated testing.

## Working-tree warning

This branch contains uncommitted shared Fable/Codex changes. Review `git status` and the exact diff before editing; preserve unrelated work and do not reset the tree.
