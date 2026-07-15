# Fable landing-page handoff

## Direction

**Visual thesis:** institutional private credit — dark, editorial, decisive,
with champagne restraint and California real estate doing the visual work.

**Content plan:** full-bleed promise and CTA; concrete program terms; borrower
or market scenarios; process/proof; final conversion CTA.

**Interaction thesis:** one choreographed hero entrance, restrained scroll
reveals, and clear hover/press feedback on actions. Motion must respect reduced
motion and cannot delay the LCP element.

## Shared implementation

- Program content: `src/lib/loan-pages.ts`
- County content: `src/lib/location-pages.ts`
- Program renderer: `src/components/templates/LoanProgramPage.tsx`
- County renderer: `src/components/templates/LocationPage.tsx`
- Shared hero image layer: `src/components/landing/LandingHeroBackdrop.tsx`
- Conversion event boundary: `src/lib/analytics.ts`
- PostHog initialization: `src/instrumentation-client.ts`

Add new pages through the content registries and shared templates. Do not fork
the page layout unless the audience or conversion path materially changes.

## Landing-page rules

1. Keep the hero edge-to-edge; constrain only the copy column.
2. Use one real property image with a calm, dark text area. No hero card.
3. The first mobile viewport must contain the brand, promise, primary CTA, and
   a visible secondary action at 390 x 844.
4. Put decision terms near the top: amount, leverage, rate, term, and speed.
5. Use scenarios to answer “is this for my deal?” before explaining process.
6. Keep one dominant action name per intent: call or get preliminary terms.
7. Never place user-entered form values, names, email addresses, or phone
   numbers in analytics properties. Enumerated multiple-choice answers
   (e.g. quiz selections) are allowed.

## Measurement

Primary funnel:

1. `$pageview`
2. `cta_click`
3. `lead_form_submit_started`
4. `lead_form_submitted`

Break down `cta_click` by `page`, `placement`, `cta`, and either `program` or
`county`. Monitor `lead_form_error` separately as a reliability metric.

The Property Strategy Review funnel (`/property-strategy-review`) adds
`quiz_started`, `quiz_step_completed` (`step`, `field`, `value`), and
`quiz_completed` (`route` plus the five enumerated answers). Build the
funnel as `$pageview` → `quiz_started` → `quiz_completed` →
`lead_form_submitted`, and break `quiz_completed` down by `route`,
`timeline`, and `property_use`.

Local development is console-only by default. To test delivery, copy
`.env.example` to `.env.local`, add the project token, and temporarily enable
`NEXT_PUBLIC_POSTHOG_CAPTURE_LOCALHOST=true`.

## Acceptance checklist

- Desktop review at 1440 x 1000 and mobile review at 390 x 844
- Both hero CTAs visible in the initial mobile viewport
- No console errors or warnings
- CTA click logs the expected event and reaches the correct contact URL
- Keyboard focus, contrast, and reduced-motion behavior checked
- `npm run build` passes
- New route returns HTTP 200 and has unique metadata/canonical URL
