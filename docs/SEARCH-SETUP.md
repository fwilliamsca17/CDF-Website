# Search & AI Visibility Setup — Manual Steps

Status as of 2026-08-03. The website's technical layer is done (canonicals,
sitemap, schema, llms.txt, IndexNow key). Everything below requires account
access only Francisco/Cindy have, and together explains why competitors and
even trustdsi.com appear in Google/AI answers for "hard money lender West
Covina" while capitaldf.com does not yet.

## 1. Google Search Console — ~15 min, highest priority

1. Go to https://search.google.com/search-console → Add property →
   **Domain** property for `capitaldf.com` (covers www + apex).
   Domain verification is via DNS TXT record at the registrar.
   *Alternative:* URL-prefix property for `https://www.capitaldf.com` with the
   HTML-tag method — copy the `content="..."` value into the Vercel env var
   `GOOGLE_SITE_VERIFICATION` (Settings → Environment Variables), redeploy,
   then click Verify.
2. Submit the sitemap: `https://www.capitaldf.com/sitemap.xml`.
3. URL Inspection → paste `https://www.capitaldf.com/hard-money-lender-west-covina`
   → **Request Indexing**. Repeat for `/rates-and-terms` and the six city pages.
   This is the single fastest way to get the new pages into Google.

## 2. Bing Webmaster Tools — ~5 min (feeds ChatGPT & Copilot)

1. https://www.bing.com/webmasters → Add site → **Import from Google Search
   Console** (one click once GSC is verified) — or verify via meta tag into
   the `BING_SITE_VERIFICATION` Vercel env var.
2. Submit the same sitemap.
3. IndexNow is already wired: key file at
   `https://www.capitaldf.com/31fc02c378f0f380093772e2bd907e54.txt`.
   Claude Code pings the IndexNow API on deploys; no action needed here.

## 3. Vercel primary domain — ~2 min

Vercel → Project → Settings → Domains → set `www.capitaldf.com` as primary.
The apex currently 307s (temporary); primary-domain issues a 308 (permanent),
which is the signal Google consolidates ranking equity on.

## 4. Google Business Profile — the local pack & AI answers

The AI answers naming Pacific Loanworks / Prime Equity / PML Inc. are reading
Google's local pack. CDF has no claimed profile, so it cannot appear.

1. https://business.google.com → claim/create for **Capital Direct Funding,
   Inc.**, 100 N Citrus St Suite 530, West Covina CA 91791, (626) 796-1680 —
   NAP must match the website exactly.
2. Primary category **Mortgage lender**; add services matching the eight
   programs; link `https://www.capitaldf.com`.
3. Verification is usually postcard/video for this category.
4. Reviews: steady cadence beats bursts. Prime Equity sits at 28 reviews —
   ask closed borrowers and payoff clients (Karla/Rochelle touchpoints).

## 5. Directory profiles (AI answers quote these verbatim)

| Directory | Status | Action |
|---|---|---|
| HardMoneyHome | Listed but stale — says "mainly fix-and-flip" | Update to all 8 programs with the /rates-and-terms numbers |
| LendersA | Listed, thin | Same terms refresh |
| Private Lender Link | **Absent** — and it's the #1 organic result for the money query | Apply for a vetted listing |
| Yelp | Good (44 photos) | Keep review cadence |

Use `https://www.capitaldf.com/rates-and-terms` as the copy source so every
directory carries identical numbers (rates from 9.50%, $50K–$5M, ≤75% ARV,
7-day closings).

## 6. trustdsi.com cross-link

DSI ranks for West Covina private-money queries; CDF should be reachable from
it. Add a plain-language line to trustdsi.com ("DSI services loans originated
by Capital Direct Funding" linking to www.capitaldf.com) and matching
`sameAs`/`parentOrganization` schema if that site's code is accessible.
One honest link between affiliated companies — not a link scheme.
