This is the Capital Direct Funding website. The `investor-portal-plan`
branch contains the Phase 0 investor portal sandbox, backed by self-hosted
Supabase and populated only with synthetic data.

## Getting Started

First, install dependencies and run the development server:

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Copy `.env.example` to `.env.local` and keep `NEXT_PUBLIC_PHASE_0=1` for any
investor portal preview.

## Investor Portal Phase 0

Phase 0 is a sandbox only. It must not contain real investor, borrower, loan,
or TMO data.

### Local seed

```bash
npm run seed
```

The seed creates obvious synthetic users such as `investor-c@example.invalid`
and `hybrid-1@example.invalid`. See
`docs/superpowers/plans/2026-06-11-phase0-demo-walkthrough.md` for the full
click-through.

### Preview deployment

1. Deploy the `investor-portal-plan` branch to Vercel.
2. Enable Vercel Deployment Protection for Preview deployments using a
   password or Vercel Authentication.
3. Configure preview-only env vars:
   `NEXT_PUBLIC_PHASE_0=1`, `NEXT_PUBLIC_SUPABASE_URL`,
   `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`,
   `RESEND_API_KEY`, and `RESEND_FROM_EMAIL`.
4. Confirm the in-app banner reads `SANDBOX - synthetic data only`.

### Accessibility gate

```bash
npm run build
npm run lighthouse:a11y
```

`lighthouserc.cjs` enforces accessibility score `>= 0.95` on `/`,
`/trust-deeds`, `/trust-deeds/how-it-works`, `/login`, and
`/dashboard/pending`.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
