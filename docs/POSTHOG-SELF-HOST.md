# Self-hosting PostHog for capitaldf.com

Operator guide for running your own PostHog instance instead of PostHog
Cloud. Written for Windows 11; no development experience assumed.

## Current CDF installation (2026-07-15)

- Stack: `C:\Users\franciscow1\posthog-stack\docker-compose.yml`
- Local console: `https://localhost` (Caddy uses a local certificate)
- Docker Desktop: starts with Windows, 8 GB memory target, Resource Saver off
- Host ports: bound to `127.0.0.1`; PostHog databases and queues are not
  intentionally exposed to the LAN
- Production preflight: 10 of 10 checks pass
- Public access: a temporary Cloudflare Quick Tunnel is available for setup
  and testing only. Do not put its changing `trycloudflare.com` hostname into
  Vercel.

The remaining production setup requires human account actions: create the
first PostHog admin/project, authenticate Cloudflare, choose the DNS approach
for `analytics.capitaldf.com`, and authenticate/link the Vercel project. No
NGINX account is needed; Caddy is the local reverse proxy and Cloudflare Tunnel
is the intended public edge.

## Should you self-host?

| | Self-hosted | PostHog Cloud (US) |
|---|---|---|
| Cost | Hardware/VPS + your time | Free to 1M events/month |
| Data location | Your machine — first-party | PostHog's US cloud |
| Maintenance | You (upgrades, backups, uptime) | None |
| Uptime risk | Events dropped while the box is down | Managed |
| Feature set | Open-source core | Full (some features are cloud-only) |

Cloud remains the zero-effort fallback: leave `NEXT_PUBLIC_POSTHOG_HOST`
unset and the site sends events to PostHog US Cloud through the same
`/ingest` proxy. Everything below is only needed for self-hosting.

## Requirements

- Docker Desktop for Windows with the WSL2 backend enabled
- 4+ CPU cores and 8GB+ RAM available to Docker
- Roughly 30GB of free disk

## Install (hobby deployment)

PostHog's supported single-machine setup is the "hobby" deployment. Run it
inside WSL2 (Ubuntu):

1. Open the Ubuntu terminal (WSL2).
2. `git clone https://github.com/PostHog/posthog.git && cd posthog`
3. Follow the current steps at <https://posthog.com/docs/self-host> —
   either the `bin/deploy-hobby` script or
   `docker compose -f docker-compose.hobby.yml up -d`.
4. When it finishes, open the printed URL, create the admin account, and
   note the **Project API key** (Settings → Project).

The exact commands drift between PostHog releases — treat the official
guide as authoritative.

## The critical constraint: the instance must be publicly reachable

The live site runs on Vercel. Every visitor's browser sends events to
`capitaldf.com/ingest/...`, and Vercel's rewrite proxies those requests to
the PostHog instance. **`http://localhost:8000` is only visible on the
machine itself** — a purely local instance receives zero production
traffic. You need one of:

| Option | Cost | Notes |
|---|---|---|
| Cloudflare Tunnel | Free | Maps e.g. `analytics.capitaldf.com` to the local box. No port-forwarding. Set the tunnel hostname as `NEXT_PUBLIC_POSTHOG_HOST`. |
| Small VPS (e.g. Hetzner, DigitalOcean) | ~$10–20/mo | **Recommended for uptime.** Run the same hobby deployment on the VPS. |
| Stay on PostHog Cloud | Free tier | Leave `NEXT_PUBLIC_POSTHOG_HOST` unset. |

**Uptime warning:** if the machine hosting PostHog is asleep, off, or
rebooting, events from the live site are dropped permanently — browsers do
not retry later. An office PC that sleeps at night silently loses every
after-hours visitor. That is why a VPS is recommended once real ad spend
flows through the funnel.

## Wiring the site to your instance

Set in Vercel → Project → Settings → Environment Variables (and in
`.env.local` for local testing):

```
NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN=<project API key from your instance>
NEXT_PUBLIC_POSTHOG_HOST=<https URL of your instance, no trailing slash>
```

Then redeploy. Leave `NEXT_PUBLIC_POSTHOG_HOST` unset to fall back to US
Cloud. Do **not** set it to `/ingest` — the browser always uses the
`/ingest` proxy automatically, and this variable is the instance *behind*
the proxy (see `next.config.mjs`).

## Verifying events arrive

1. Open your PostHog instance → Activity (live events view).
2. Load capitaldf.com in a normal browser tab and click around.
3. `$pageview` events should appear within seconds.
4. In the browser DevTools Network tab, `/ingest/...` requests should
   return `200`.
5. Local dev is console-only by default — see the "Local PostHog workflow"
   section of the README.

## Maintenance

- **Start/check:** `docker compose -f C:\Users\franciscow1\posthog-stack\docker-compose.yml up -d`
- **Health:** `curl.exe -k https://localhost/_health`
- **Status:** `docker compose -f C:\Users\franciscow1\posthog-stack\docker-compose.yml ps`
- **Logs:** `docker compose -f C:\Users\franciscow1\posthog-stack\docker-compose.yml logs --tail 200 web worker plugins proxy`
- **Upgrades:** back up first, then run `docker compose pull` followed by
  `docker compose up -d` from `C:\Users\franciscow1\posthog-stack`.
- **Back up first:** snapshot the Postgres and ClickHouse volumes before
  every upgrade.
- **Scale ceiling:** the hobby deployment is sized for roughly 100k
  events/month. Beyond that, move to a bigger server or back to cloud.

## Event schema for this site

| Event | Properties | Fired |
|---|---|---|
| `$pageview` | URL, referrer, UTMs (automatic) | Every page/navigation |
| `cta_click` | `cta`, `placement`, `page`, `program` or `county` | Program + county landing page CTAs |
| `lead_form_submit_started` | `page`, `form` | Any lead form submit attempt |
| `lead_form_submitted` | `page`, `form` | Successful lead submit |
| `lead_form_error` | `page` | Failed lead submit (reliability metric) |
| `quiz_started` | `page` | First answer selected on `/property-strategy-review` |
| `quiz_step_completed` | `step`, `field`, `value` | Each quiz question answered |
| `routing_decision_made` | `route`, quiz enum values | Final CDF-only route computed, before contact collection |
| `quiz_completed` | `route`, `property_type`, `property_use`, `timeline`, `equity`, `goal` | Contact form submitted (all routes, including resource_only) |

Convention: only enumerated multiple-choice values ever appear in event
properties — never user-entered text, names, emails, phones, or city.
