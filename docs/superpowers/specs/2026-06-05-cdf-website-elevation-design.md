# CDF Website Elevation — Design Spec

- **Date:** 2026-06-05
- **Repo:** `cdf-website` (capitaldf.com)
- **Status:** Approved direction; pending spec review → implementation plan
- **Register:** Engineering design doc (precise, risk-aware)

## 1. Objective

Elevate capitaldf.com to be **measurably faster and more premium/institutional**, on the
existing Next.js 15 stack, sequenced performance-first. Target feel: **Locomotive-grade motion
+ Fantasy-grade institutional polish**. Scope is CDF only, built clean — disciplined tokens and
components so the work is cheap to extract later, but **no speculative abstraction now (YAGNI)**.

## 2. Locked decisions

| Decision | Choice | Rationale |
|---|---|---|
| Primary goal | Both — full elevation, perf-first | Fast foundation, then build the "wow" on top |
| Stack | Stay on Next.js 15 / React 19 | RSC already delivers islands; re-platforming to Astro rewrites 40 files for marginal gain |
| Scope | CDF only, built clean (YAGNI) | Fastest path to a shipped, world-class CDF |
| Approach | Phased hybrid | Phase 1 perf + motion spine ships fast; Phase 2 adds distinction, measured vs baseline |
| Palette | Measured elevation | CDF blue stays the anchor; deepen base, refine gold → champagne |
| Hero | Static cinematic + motion (no video) | Lightest/fastest, most institutional, removes the YouTube-iframe liability entirely |

## 3. Current state (baseline)

- **Stack:** Next.js 15.5 (App Router), React 19, Tailwind 3.4.1, Framer Motion 12, lucide-react, TypeScript.
- **Pages (8):** home, about, team, borrowers, investors, loan-process, adu-loans, contact.
- **Structure:** `src/app` (routes), `src/components/{ui,layout,sections}`, `src/lib`.
- **Already strong:** design-system seed (CDF blue / gold / charcoal, Montserrat + Source Sans),
  Framer Motion animations, comprehensive SEO/AEO (JSON-LD, sitemap, OG images, `llms.txt`).
- **Known liabilities:**
  - Hero loads a full **YouTube `<iframe>`** as a background video — primary Core Web Vitals
    drag (third-party player JS, blocks LCP, poor on mobile). `src/components/sections/Hero.tsx`.
  - **3.2 MB of raw PNGs** in `/public` — 1.1 MB `hero-bg.png` + twelve ~150–200 KB team photos;
    not served through `next/image`.

## 4. Aesthetic direction

**Take (fits a lender):**
- **Fantasy** — sleek, institutional, trustworthy dark product UI; liquid-smooth transitions.
- **Locomotive** — editorial typography, buttery smooth-scroll, scroll-triggered reveals, refined hover states.

**Reject (wrong signal / perf cost for a lender):**
- **Active Theory / Watson** — heavy WebGL, cinematic 3D, film-promo energy. Reads as agency
  showreel, not institutional lender, and taxes performance. We get ~90% of the "wow" from
  motion + typography + restrained accents without it.

**Lean-stack principles adopted (from reference research):** ship less JS (RSC), View Transitions
API, Lucide SVGs over raster, custom HSL token palette. **Rejected from that research:** Astro
re-platform (greenfield advice, not worth it here).

## 5. Phase 1 — Performance foundation + design-system spine

Goal: ship a measurably faster, cleaner site with minimal visual change.

1. **Baseline capture (task 0).** Record Lighthouse (mobile + desktop) and Core Web Vitals on the
   current production site before any change. All later gains measured against this.
2. **Hero video → removed.** The YouTube iframe comes out entirely (the final hero has no video);
   an optimized AVIF poster becomes the LCP element and paints instantly. The full cinematic hero
   treatment is built in Phase 2 on top of this poster.
3. **Images → `next/image` + AVIF/WebP.** Convert all `/public` PNGs to responsive modern formats
   with correct `sizes`/`priority`. Expect ~70–85% byte reduction.
4. **Fonts.** Already `next/font`; audit weights/subsets, preload hero weight, confirm zero CLS.
5. **Tailwind v4 upgrade** (3.4.1 → 4). CSS-first config; move color/space/type tokens to **HSL
   CSS variables** so the Phase 2 palette elevation is a values-only change.
6. **Motion-system spine.** Install a smooth-scroll provider (Lenis), a reusable
   `<Reveal>` / `<Stagger>` scroll primitive (replaces ad-hoc `FadeIn`), and wire the
   **View Transitions API** for page navigations. All `prefers-reduced-motion`-aware.

**Design-system spine deliverables:** HSL token variables; a fluid `clamp()` type scale on
Montserrat/Source Sans for editorial weight; the small set of reduced-motion-safe motion primitives.

## 6. Phase 2 — The "wow" layer

Built on the fast foundation; measured against the Phase 1 baseline.

**Palette (measured elevation — exact hexes tuned during design):**
- Anchor: keep CDF blue `#1F699E`.
- Base: deepen charcoal `#100F0F` → near-black with a navy undertone; layered deep-navy surfaces
  from CDF-950 `#0B2E47`.
- Accent: refine gold `#D4A017` → champagne (lighter, slightly desaturated).
- Treatment: layered near-black→navy gradients, subtle grain, hairline champagne dividers, soft glows.

**Hero (static cinematic + motion):** editorial display type (fluid `clamp()`), layered gradient
mesh + subtle grain, parallax / scroll-driven accents, the rotating loan-type concept kept but
elevated, a scroll cue, choreographed entrance. No video element.

**Signature scroll moments (lock final 2–3 in design to avoid over-animating):**
- StatsBar → dramatized count-up + editorial layout ($200M / 500+ / 7-day).
- LoanPrograms → pinned or horizontally-scrolling program cards with depth on hover/scroll.
- ProcessTimeline → scroll-bound progress timeline.

**Page transitions:** choreographed View Transitions (shared-element on logo/hero), building on
the Phase 1 spine.

**Component polish:** buttons, cards, header/nav, footer refined to the new token system.

## 7. Guardrails & non-functional requirements

- **SEO/AEO preserved** — metadata, JSON-LD, sitemap, heading hierarchy, `llms.txt` intact and re-verified after each phase.
- **Conversion preserved** — audit contact/`GetInTouch` lead capture *before* touching it; verify forms work after.
- **Perf budget** — Phase 2 motion lazy-loads and must not regress Phase 1 LCP/CWV gains.
- **Accessibility** — WCAG 2.2 AA: contrast on the darker palette, visible focus states, reduced-motion paths.
- **Single-writer** — only one Claude session editing this repo at a time; verify with
  `lsof +D . | grep claude` before Phase 1 edits.
- **No Co-Authored-By** trailers on commits.

## 8. Verification & measurement

- **Baseline:** captured in Phase 1 task 0 (current production).
- **Targets:** Lighthouse Performance 95+ (mobile + desktop); LCP < 2.0 s mobile / < 1.5 s desktop;
  CLS < 0.05; INP < 200 ms. Homepage transferred bytes materially reduced (exact % vs measured baseline).
- **Method:** Lighthouse + Core Web Vitals before/after each phase; visual QA / design review;
  manual a11y + reduced-motion pass.

## 9. Out of scope (YAGNI)

- Astro (or any) re-platform.
- Multi-property / portable design system (WCA et al.) — extract later if needed.
- Heavy WebGL / 3D / generative canvas hero.
- Self-hosted or YouTube background video.
- Full rebrand or logo change.
- IA / sitemap / copy rewrites (unless a specific section demands it during redesign).

## 10. Open items / dependencies

- **Contact form backend** — confirm where leads POST during the Phase 1 conversion audit before any change near it.
- **Tailwind v4 migration** — validate plugin/config compatibility; no visual regressions.
- **Final signature-moment set** — pick 2–3 in the design step of Phase 2.

## 11. Risks

- **Tailwind v4 migration churn** — contained, but touches global config; mitigate by doing it as
  an isolated, verified step with no visual diff.
- **Darker palette contrast** — must re-check WCAG AA on every text/surface pairing.
- **Motion vs. perf tension** — every Phase 2 effect is lazy/`prefers-reduced-motion`-gated and
  re-benchmarked so it cannot erode Phase 1 gains.
- **Regression to SEO/conversion** — the two revenue-critical surfaces; explicitly fenced by guardrails and re-verified.
