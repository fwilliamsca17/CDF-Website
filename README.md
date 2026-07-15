# Capital Direct Funding website

Next.js 15 marketing site for Capital Direct Funding, including loan-program,
county, professional-partner, investor, and editorial landing pages.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Local PostHog workflow

1. Copy `.env.example` to `.env.local`.
2. Leave `NEXT_PUBLIC_POSTHOG_CAPTURE_LOCALHOST=false` while developing. With
   `NEXT_PUBLIC_POSTHOG_DEBUG=true`, conversion events appear in the browser
   console without polluting PostHog.
3. To verify delivery end to end, add the PostHog project token and temporarily
   set `NEXT_PUBLIC_POSTHOG_CAPTURE_LOCALHOST=true`. Confirm `/ingest/*`
   requests return `200`, then switch the flag back to `false`.

The tracked conversion events are `cta_click`, `lead_form_submit_started`,
`lead_form_submitted`, `lead_form_error`, and the Property Strategy Review
funnel events `quiz_started`, `quiz_step_completed`, and `quiz_completed`.
The quiz events carry only enumerated multiple-choice answer values
(property type/use, timeline, equity band, goal, recommended route) — no
user-entered text, names, email addresses, phone numbers, or city are ever
sent to PostHog. Production uses the first-party `/ingest` reverse proxy
configured in `next.config.mjs`; see `docs/POSTHOG-SELF-HOST.md` to point it
at a self-hosted PostHog instance.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
