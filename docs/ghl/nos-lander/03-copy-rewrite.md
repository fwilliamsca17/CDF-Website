# NOS Lander — Copy Rewrite + CTA Strategy

**Source positioning (Francisco's own elevator pitch, 2026-06-09):**
> "We help owners of real estate gain access to their equity during special
> circumstances that usually banks can't finance."

Applied to NOS audience: a California homeowner with a recorded Notice of
Sale has a 21-day minimum window before the trustee sale. Their problem
isn't ignorance about scams — it's that they think they have no options.
The job-to-be-done is to reframe their situation as **"you have equity,
banks just can't unlock it fast enough, we can."**

---

## Marketing methodology applied

| Principle | How the page implements it |
|---|---|
| **Reframe from fear-defensive → equity-offensive** | Lead with "You have equity" not "Stop scams". Fear (scams) becomes a secondary panel, not the headline. Loss-aversion still triggers via the 21-day countdown. |
| **One Reader rule** | Every line is written to one person: a California homeowner who received an NOS in the last 14 days, has equity, and is panicked. No generic "homeowners". |
| **Three-tier CTA hierarchy** | High-urgency (phone) → medium (booked call) → low (free guide). Page currently only does the low + medium tier; we add **phone as the primary** for this audience. |
| **Specificity beats superlatives** | "7-day funding" + dollar specifics + DRE/NMLS license numbers > "fast" + "trusted". Builds Direct Response credibility. |
| **Risk reversal** | "Free consultation. No obligation. No tax returns required." Removes friction from the high-friction action. |
| **Time scarcity is real, not manufactured** | California's NOS-to-sale minimum is 21 days. We reference the actual statute, not a fake countdown. |
| **Social proof at the right moment** | Testimonials appear AFTER the value-prop, not before. Reader has to want it first. |
| **AIDA on the macro page** | Hero (Attention) → Your Situation / Equity (Interest) → Why Banks Can't / How We Can (Desire) → Phone + Book + Guide (Action). |

---

## The CTA hierarchy

For an audience holding a 21-day countdown, **phone is the highest-conversion
channel** — they'll call today, not download a PDF. But the page today shows
no phone number above the fold. Critical miss.

### Tier 1 — Phone (HIGHEST urgency, add this)
```
📞 (626) 796-1680
Talk to a Licensed CA Lender Today
```
Appears: hero, sticky floating bar (mobile especially), final CTA section.
Wire: `tel:+16267961680` (auto-dial on mobile tap).

### Tier 2 — Book a Call (medium urgency)
```
Schedule a Free 15-Min Consultation →
```
Wire: existing Google Calendar link `https://calendar.app.google/Q3PH64UGLBYBCG8c8`
(unchanged — no form changes per scope).

### Tier 3 — Lead Magnet (low friction, top-of-funnel)
```
Get the Free Survival Guide →
```
Wire: existing GHL form (unchanged — no form changes per scope).

---

## The new copy (paste into GHL builder)

### Hero section

**Eyebrow (small caps, champagne):**
```
CALIFORNIA NOTICE OF SALE · FORECLOSURE BAIL-OUT LOANS
```

**H1 (the only H1 on the page — change in builder):**
```
You Have Equity. Banks Can't Unlock It. We Can.
```

**Subhead (1–2 sentences):**
```
A California Notice of Sale doesn't have to end in foreclosure. We help homeowners tap the equity in their home — often funded in 7 days — to stop the sale, settle the default, and keep their house. When banks can't finance, we do.
```

**Trust-line (single line under subhead):**
```
Licensed CA Lender · DRE# 01885595 · NMLS# 1159831 · $200M+ Deployed · 500+ Loans Funded
```

**Primary CTA button (phone — NEW, add to hero):**
```
📞 Talk to a Licensed Lender — (626) 796-1680
```

**Secondary CTA button (existing Google Calendar):**
```
Schedule a Free 15-Min Consultation
```

**Tertiary CTA (smaller text link under buttons):**
```
or get the free Foreclosure Survival Guide →
```

---

### Section 2 — Your situation (replaces "You're Not Alone — Help Is Here")

**H2:**
```
You Got the Notice. California Gives You 21 Days. Use Them.
```

**Body:**
```
A recorded Notice of Sale starts a clock — California Civil Code §2924f sets a minimum 21-day window between the NOS and the trustee sale. That window is short, but it's enough. Most homeowners in your situation have one thing in common: equity. Your home is worth more than what you owe. The problem isn't value — it's speed and access. Traditional banks can't move fast enough, and when you're in default, they often can't move at all. That's where we come in.
```

CTA inline at end:
```
📞 Call us before the clock runs out — (626) 796-1680
```

---

### Section 3 — The equity reframe (NEW — promote this above "What You'll Gain")

**H2:**
```
You Have Equity. We Make It Accessible.
```

**Body (3-column or 3-row layout):**

**Column 1 — Reinstate**
> Catch up missed payments, stop the sale, keep your home. We fund the loan; you stay where you are.

**Column 2 — Bridge**
> Buy time to sell on your terms — not at a foreclosure auction. Avoid the fire-sale discount and preserve your equity.

**Column 3 — Cash-Out**
> Tap equity to settle the default, pay legal fees, restructure debt, or stabilize. Asset-based — your home's value is what we underwrite, not your credit score.

---

### Section 4 — Why banks say no (replaces "Why Choose Capital Direct Funding")

**H2:**
```
Banks See a Default. We See an Asset.
```

**Body:**
```
A traditional lender looks at your past — missed payments, credit dings, a recorded default — and stops there. We're an asset-based private lender, licensed in California (DRE# 01885595, NMLS# 1159831). We look at your home's value, the equity available, and the structure that gets you out of the bind. If the deal works, we fund — often in as few as 7 days. No tax returns required. No committee approvals. No bureaucratic delays. You work directly with the people deciding.
```

---

### Section 5 — The guide (replaces "What You'll Gain from Your Free Guide")

Keep the existing 5 promise cards (Decode the NOS, Vetting Checklist,
Protect Against Scams, Understand Private Money, Discover Solutions).

**Improved H2:**
```
Not Ready to Call? Start With the Free Guide.
```

**Improved subhead:**
```
The Homeowner's Foreclosure Survival Guide — written for California homeowners who just got served. 100% free, no obligation. Decode the NOS, vet who's offering "help," spot scams, and learn every real option (not just ours).
```

CTA:
```
Send Me the Free Guide →
```

---

### Section 6 — Comparison table

Keep your existing table (Reinstatement / Loan Mod / Short Sale / Private
Money Loan / HUD Counseling). It's strong because it shows you'll explain
options that ISN'T just your loan — that's trust-building.

**Improved table H2:**
```
Every Option on the Table — Not Just Ours
```

---

### Section 7 — Testimonials

Keep "Jane D" and "Maria B" (assuming they're real and approved — if not,
remove until verified, per the no-fabrication rule).

**Improved H2:**
```
Real California Homeowners. Real Outcomes.
```

---

### Section 8 — About CDF

Keep, but tighten:

**H2:**
```
Family-Run. Licensed. Since 2009.
```

**Body:**
```
Capital Direct Funding is a direct private lender, founded by Frank Williams in 2009. Over $200 million deployed across 500+ California transactions. Licensed under DRE# 01885595 and NMLS# 1159831. When you call, you reach decision-makers — not a call center.
```

---

### Final CTA section (replaces "Act Now — Every Day Counts")

**H2:**
```
The 21-Day Clock Is Already Running.
```

**Subhead:**
```
Every day you wait shortens your options. Talk to us today — there's no cost to find out what's possible.
```

**Three CTAs side-by-side (or stacked on mobile):**

Primary:
```
📞 Call (626) 796-1680
```

Secondary:
```
Schedule a Free 15-Min Consultation
```

Tertiary:
```
Get the Free Survival Guide
```

---

## Headline alternatives (A/B test candidates)

If you want to swap the H1 later, these are all defensible against the
methodology above. Listed in order of testing priority:

1. **Recommended (above):** "You Have Equity. Banks Can't Unlock It. We Can."
2. "California Notice of Sale? You Have More Options Than You Think."
3. "Got a Notice of Sale? You Still Have Equity — and Time."
4. "Banks Say No. Your Equity Says Yes. We Make It Possible."
5. "Stop the Sale. Tap Your Equity. Keep Your Home."

All keep the equity reframe and Francisco's positioning intact.

---

## Subject lines for the lead-magnet email

When someone downloads the guide, the first email matters. Suggested:

- Subject: **"Your Foreclosure Survival Guide (and one thing the guide doesn't say)"**
- Hook line: "The guide covers your options. This email covers the one that's hardest to talk about: tapping your home's equity when you're already behind."

(Email sequence is out of scope for this paste — flagged for separate work.)

---

## Mobile sticky CTA bar (RECOMMENDED ADD)

For mobile visitors (likely 70%+ of NOS traffic — they're searching from
phones in distress), a sticky bottom bar with the phone CTA dramatically
lifts call volume. Spec for GHL custom code:

```html
<div id="cdf-sticky-call" style="position:fixed;bottom:0;left:0;right:0;
     background:linear-gradient(180deg,#0b1226,#080b1a);
     border-top:1px solid rgba(212,183,139,0.35);
     padding:0.75rem 1rem;display:none;z-index:9999;
     box-shadow:0 -8px 24px rgba(0,0,0,0.5);">
  <a href="tel:+16267961680" style="display:flex;align-items:center;
     justify-content:center;gap:0.6em;color:#080b1a;
     background:linear-gradient(180deg,#d4b78b,#c9a87a);
     border:1px solid #e6d3a8;border-radius:10px;
     padding:0.85em 1.4em;font-family:Montserrat,sans-serif;
     font-weight:700;text-decoration:none;font-size:1rem;">
    📞 Call (626) 796-1680 — Free Consultation
  </a>
</div>
<style>@media (max-width:768px){#cdf-sticky-call{display:block!important;}
       body{padding-bottom:5rem;}}</style>
```

Paste into the page's **Footer Tracking Code** (NOT header — needs to load
after the DOM exists). Mobile-only via the media query.

---

## Out of scope (don't do now)

- Email nurture sequence after the lead-magnet download (separate work, GHL
  Automations side)
- Form fields / GHL automation wiring (per scope: visual + SEO + copy only)
- A/B test infrastructure (GHL has basic split tests; flag for later)
- Additional GHL landers (let this one prove the pattern first)

---

## TCPA / compliance notes

- Phone CTA `tel:+16267961680` is the user-initiated direction (caller is
  the homeowner). No TCPA exposure on inbound.
- The Google Calendar link is consent-based booking.
- The guide-download lead form should already be wired to TCPA-safe SMS
  templates with NO + STOP — confirm in GHL automations (not this scope).
