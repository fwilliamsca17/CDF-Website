# Investor Portal Go-Live Execution Plan

Date: 2026-06-12
Branch: `investor-portal-plan`
Domain decision: use `capitaldf.com` only for investor-facing and auth
surfaces. Do not use `capital-df.com` for investor login, auth links, or
investor email.

## Target Topology

| Surface | Hostname | Owner | Notes |
|---|---|---|---|
| Public site | `www.capitaldf.com` | Vercel | Already live. |
| Supabase Auth/API | `db.capitaldf.com` | UniFi + NPM + Supabase | Public API gateway only; no Studio/Postgres. |
| Listing/auth email sender | `alerts@listings.capitaldf.com` | Resend + DNS | Dedicated investor email subdomain. |
| Supabase local upstream | `supabase-kong:8000` | Docker/NPM | NPM forwards to this container name on `proxythis`. |

## Current Known State

- `https://www.capitaldf.com/login` is live.
- Supabase is running locally.
- NPM can reach Supabase Kong locally.
- Public WAN `66.27.48.82:443` currently serves UniFi OS. This must be
  corrected before production auth can be exposed.
- `db.capitaldf.com` still needs DNS and NPM SSL.
- Production SMTP/Resend is not configured.

## Execution Sequence

### 1. Router Security + Port Forward

Owner: Francisco or whoever has UniFi admin access.

Actions:

1. Log in to UniFi.
2. Stop exposing UniFi OS on public `:443`.
3. Forward public TCP `80` to the Docker host `192.168.10.182:80`.
4. Forward public TCP `443` to the Docker host `192.168.10.182:443`.

Acceptance:

```bash
curl -kI https://66.27.48.82 -H 'Host: db.capitaldf.com'
```

Expected after DNS/NPM SSL is complete: NPM/Supabase response, not UniFi OS.

Rollback:

- Remove only the new 80/443 port-forward rules.
- Do not re-expose UniFi OS publicly.

### 2. DNS

Owner: Liquid Web DNS admin.

Actions:

1. Add `db.capitaldf.com`.

| Type | Name | Value |
|---|---|---|
| A | `db` | `66.27.48.82` |

2. Add Resend DNS records for `listings.capitaldf.com` exactly as Resend
   provides them. Do not invent SPF/DKIM values.

Acceptance:

```bash
curl -s 'https://dns.google/resolve?name=db.capitaldf.com&type=A'
```

Expected: `Status: 0` and answer `66.27.48.82`.

Rollback:

- Delete the `db` A record if the service must be taken private.

### 3. Nginx Proxy Manager

Owner: NPM admin.

Actions:

1. Remove or disable any old `db.capital-df.com` proxy host.
2. Create or update proxy host:

| Field | Value |
|---|---|
| Domain | `db.capitaldf.com` |
| Scheme | `http` |
| Forward host | `supabase-kong` |
| Forward port | `8000` |
| Websockets | enabled |
| Block common exploits | enabled |
| SSL | Let's Encrypt |
| Force SSL | enabled after cert issues |
| HTTP/2 | enabled after cert issues |

3. Block Studio from the public hostname by adding a custom location or
   equivalent NPM rule for `/studio` returning a 4xx/444.

Acceptance:

```bash
curl -I https://db.capitaldf.com/auth/v1/settings
curl -I https://db.capitaldf.com/studio
```

Expected:

- `/auth/v1/settings` returns Supabase/Kong response. A `401` without an API
  key is acceptable.
- `/studio` is blocked.

Rollback:

- Disable only the `db.capitaldf.com` proxy host.

### 4. Supabase Runtime

Owner: Codex/operator on Docker host.

Update `/home/francisco-williams/supabase-cdf/.env`:

```bash
SUPABASE_PUBLIC_URL=https://db.capitaldf.com
API_EXTERNAL_URL=https://db.capitaldf.com
SITE_URL=https://www.capitaldf.com
ADDITIONAL_REDIRECT_URLS=https://www.capitaldf.com/auth/callback,https://cdf-website-git-investor-portal-plan-fwilliamsca17s-projects.vercel.app/auth/callback,http://localhost:3000/auth/callback,http://localhost:3010/auth/callback

SMTP_HOST=smtp.resend.com
SMTP_PORT=465
SMTP_USER=resend
SMTP_PASS=<Resend API key>
SMTP_SENDER_NAME=CDF Investor Group
SMTP_ADMIN_EMAIL=alerts@listings.capitaldf.com
```

Restart:

```bash
cd /home/francisco-williams/supabase-cdf
docker compose -f docker-compose.yml -f docker-compose.cdf-mail.yml up -d
```

Acceptance:

```bash
curl -I https://db.capitaldf.com/auth/v1/settings
```

Expected: Supabase/Kong response.

Rollback:

- Restore prior `.env` values from the local backup copy.
- Restart the same compose stack.

### 5. Vercel Runtime

Owner: Codex/operator with Vercel access.

Update Production and Preview env:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://db.capitaldf.com
RESEND_FROM_EMAIL=CDF Investor Group <alerts@listings.capitaldf.com>
RESEND_API_KEY=<Resend API key>
```

Keep existing:

```bash
NEXT_PUBLIC_PHASE_0=1
NEXT_PUBLIC_SUPABASE_ANON_KEY=<current anon key>
SUPABASE_SERVICE_ROLE_KEY=<current service key>
```

Deploy production after env changes.

Acceptance:

```bash
curl -I https://www.capitaldf.com/login
```

Expected: `HTTP 200` and `/login` route.

Rollback:

- Revert only the latest Vercel deployment if login breaks.

### 6. End-to-End Auth Proof

Owner: Codex/operator.

Use synthetic users only.

Checks:

1. Submit magic link for `investor-c@example.invalid`.
2. Confirm email arrives through Resend or a controlled production test inbox.
3. Complete sign-in.
4. Confirm `/listings` and `/portfolio` load.
5. Confirm `/admin` is denied to the investor.
6. Sign in as admin synthetic user.
7. Confirm `/admin/sale-readiness` loads and saves.

Acceptance:

- Synthetic investor login works from `www.capitaldf.com`.
- Supabase session cookie is set on the site.
- No real investor or loan data is present.

### 7. Phase 1 Gate Before Real Data

Do not import real TMO, investor, borrower, loan, ownership, or document data
until all are true:

- RLS leak tests pass against live Supabase.
- Storage signed URL expiry tests pass.
- Service-role key is absent from `.next/`.
- Nightly backup runs and restore test is documented.
- Public copy, alert templates, and investor onboarding have counsel sign-off.
- DRE/license language is verified.
- SMTP domain authentication passes in Resend.

## Final Go/No-Go

Go-live for real investor use requires:

1. `https://www.capitaldf.com/login` loads.
2. `https://db.capitaldf.com/auth/v1/settings` reaches Supabase.
3. Magic-link email arrives from `alerts@listings.capitaldf.com`.
4. Synthetic investor can log in and view only synthetic approved data.
5. UniFi OS is not reachable from the public internet.

Until all five pass, the system is internal-demo only.
