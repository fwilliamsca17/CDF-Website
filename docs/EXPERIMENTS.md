# A/B Experiments (PostHog)

How capitaldf.com runs split tests. The code side lives in
`src/lib/experiments.ts` (`useExperiment(flagKey)`); the experiment
definitions live in PostHog (Experiments → New experiment).

## Live experiments

| Flag key | Where | Control | Variants | Primary metric (with REQUIRED filters) |
|---|---|---|---|---|
| `psr-hero-headline` | /property-strategy-review hero H1 | "What Is the Best Path for Your Property?" | `see-options`: "See Your Property's Options in 2 Minutes" | `quiz_started` |
| `program-cta-label` | All 7 loan-program page hero CTAs — **includes /foreclosure-bankruptcy-loans, so Francisco signs off before launch** | "Get Preliminary Terms" | `deal-qualify`: "See If My Deal Qualifies" | Funnel: `cta_click` where `cta=contact` AND `placement=hero` AND `program` is set → `lead_form_submitted` where `page=/contact` |

**Why the filters matter:** `cta_click` also fires from the footer CTA
(whose label the experiment does NOT change), the home hero, and county
pages — and `lead_form_submitted` fires from every form on the site.
Without the placement/page filters, both arms fill with unaffected events
and the measured lift washes out. PostHog also auto-attaches
`$feature/program-cta-label` to events from exposed users, usable as an
alternative breakdown.

## Creating an experiment in PostHog (one-time, ~2 min each)

1. PostHog → **Experiments** → **New experiment**.
2. Feature flag key: exactly the key from the table (e.g. `psr-hero-headline`).
3. Variants: `control` plus the variant key(s) from the table — **the key
   strings must match the code exactly**, they are looked up verbatim.
4. Participants: 100% of users, 50/50 split.
5. Goal metric: the primary metric from the table (funnel from exposure).
6. Launch.

## Rules that keep results valid

- **Never branch on a variant without `useExperiment()`** — reading the
  flag is what records exposure; a manual check skews the denominator.
- **Don't rename flag keys mid-flight** — a renamed key silently reverts
  everyone to control and orphans the experiment.
- **Users with analytics disabled always see control** — expected; they're
  simply not in the experiment.
- **Regulated copy needs human review before launch.** Any variant that
  touches foreclosure, financing terms, guarantees, or urgency framing goes
  past Francisco before the flag ships (CC 2945 / MARS posture).
- **Ship winners by deleting the experiment code**, not by leaving the flag
  at 100% forever: hard-code the winning copy, remove the `useExperiment`
  call, archive the flag in PostHog — and update the page's `<title>`/OG
  metadata in the same commit if the winning H1 diverged from it.
- One experiment per surface at a time — overlapping tests on the same
  element contaminate each other.

## Candidate backlog (next up)

1. PSR hero trust line: "2 minutes · 5 questions · Confidential" vs
   adding "No credit pull".
2. Quiz question order: timeline-first vs property-type-first.
3. Contact-step subhead: advisor-framing vs speed-framing ("reviews within
   one business day" vs "same-day review when time-sensitive").
4. Program page: parameters table above vs below scenarios.
5. County pages: CTA label test (mirror of `program-cta-label`).

## Reading results

PostHog → Experiments → open the experiment. Ship when the credible
interval is decisive and there are enough exposures per variant (~100+
conversions per arm as a floor at our volumes, expect 2–4 weeks per test).
Traffic reality check: at current volumes only one or two experiments can
reach significance at a time — resist running five at once.
