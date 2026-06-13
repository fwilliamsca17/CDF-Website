# Self-hosted Supabase — CDF Investor Portal

This is the runbook for **Chunk 1** of the Phase 0 plan. Run it on the
existing CDF docker host (the same box that runs n8n / Twenty CRM /
nginx proxy manager). Investor data never lands on it until **Phase 1**
gate passes.

## Prereqs

- Docker + docker-compose already running (you have these)
- Nginx Proxy Manager (NPM) admin access
- A subdomain A record pointing at the host:
  `db.capitaldf.com` → host
- A Resend sending subdomain:
  `listings.capitaldf.com` with SPF/DKIM/DMARC
- Resend account + API key (used for both auth emails and listing
  alerts); dedicated subdomain with SPF/DKIM/DMARC set in DNS

## 1. Pull the bundle

```bash
mkdir -p /srv/supabase-cdf && cd /srv/supabase-cdf
git clone --depth 1 https://github.com/supabase/supabase
cp -r supabase/docker/* .
rm -rf supabase
cp .env.example .env
```

## 2. Rotate every secret

`.env` defaults are publicly known. Generate fresh values for ALL of:

```bash
openssl rand -base64 48                       # JWT_SECRET (>= 32 chars)
openssl rand -hex 32                          # POSTGRES_PASSWORD
openssl rand -hex 32                          # DASHBOARD_PASSWORD
openssl rand -hex 32                          # SECRET_KEY_BASE / VAULT_ENC_KEY
```

Then generate matching `ANON_KEY` and `SERVICE_ROLE_KEY` JWTs against
your fresh `JWT_SECRET` using `supabase/cli` or the JWT generator
referenced in the official self-host docs.

`.env` is gitignored. Keep an encrypted copy somewhere safe (1Password
/ Bitwarden). NEVER commit it.

## 3. SMTP — point auth emails at Resend

In `.env`:

```
SMTP_HOST=smtp.resend.com
SMTP_PORT=465
SMTP_USER=resend
SMTP_PASS=<Resend API key>
SMTP_SENDER_NAME=CDF Investor Group
SMTP_ADMIN_EMAIL=alerts@listings.capitaldf.com
```

Self-host Supabase ships no mailer; without this, magic links and
recovery emails will silently fail.

## 4. NPM proxy entries

Add two proxy hosts:

- `db.capitaldf.com` → `localhost:8000` (Kong gateway)
  - SSL: Let's Encrypt
  - Force SSL: on
  - HTTP/2 + HSTS: on
  - Custom locations: none

That's the ONLY public entry. Specifically do NOT expose:

- `localhost:5432` (Postgres)
- `localhost:8000/studio` — block at NPM (location `/studio` → return 444)
  or remove Studio from compose entirely and rely on `psql` over SSH.

## 5. Start

```bash
docker compose pull
docker compose up -d
docker compose ps
```

Healthcheck:

```bash
curl -s https://db.capitaldf.com/auth/v1/settings | jq .
```

Should return `200` with auth settings JSON.

## 6. Backups

Add to the existing wca-data-archive routine (or `cron`):

```bash
# /etc/cron.d/cdf-supabase-backup
0 13 * * * root /usr/local/bin/cdf-supabase-backup.sh
```

`/usr/local/bin/cdf-supabase-backup.sh`:

```bash
#!/usr/bin/env bash
set -euo pipefail
TS=$(date -u +%Y%m%dT%H%M%SZ)
OUT=/srv/wca-data-archive/cdf-supabase
mkdir -p "$OUT"
docker exec supabase-db pg_dump -U postgres -Fc -d postgres \
  > "$OUT/cdf-supabase-$TS.dump"
# storage volume:
tar czf "$OUT/cdf-storage-$TS.tgz" -C /srv/supabase-cdf volumes/storage
# keep 30 days
find "$OUT" -type f -mtime +30 -delete
```

**Restore test (required before Phase 1 sign-off):**

```bash
# In a scratch container:
docker run --rm -v /srv/wca-data-archive/cdf-supabase:/dumps \
  --network supabase_default \
  postgres:15 \
  pg_restore -h supabase-db -U postgres -d postgres_restore_test \
    /dumps/cdf-supabase-LATEST.dump
```

Record the timestamp of the restore test in this file when you pass it.
That is part of the Phase 1 gate.

## 7. Upgrade procedure

- Pin image SHAs in `docker-compose.yml` (NOT `:latest`).
- Read release notes before bumping.
- Test the bump on a separate compose stack first; only then update prod
  and run a smoke test (auth, a query, a storage upload).

## 8. Apply schema

```bash
cd /srv/supabase-cdf
docker exec -i supabase-db psql -U postgres -d postgres \
  < /path/to/cdf-website/supabase/migrations/0001_init_schema.sql
```

Verify:

```bash
docker exec -i supabase-db psql -U postgres -d postgres -c \
  "select relname from pg_class where relrowsecurity = true and relnamespace = 'public'::regnamespace order by relname;"
```

Every table in the schema should appear (`FORCE` RLS is on for all of
them).

## 9. Seed (synthetic only)

From the `cdf-website` checkout:

```bash
SUPABASE_URL=https://db.capitaldf.com \
SUPABASE_SERVICE_ROLE_KEY=<service-role JWT> \
pnpm seed
```

Then run the seed SQL:

```bash
docker exec -i supabase-db psql -U postgres -d postgres \
  < supabase/seed/synthetic.sql
```

## Phase 1 gate checklist (run BEFORE any real data)

- [ ] All defaults rotated; `.env` not in git; secrets in vault.
- [ ] NPM only exposes `db.capitaldf.com:443`; Studio unreachable from
      internet (`curl https://db.capitaldf.com/studio -I` returns
      444/4xx).
- [ ] Auth emails arrive (test signup with a magic link).
- [ ] Nightly backup file lands in `/srv/wca-data-archive/cdf-supabase`.
- [ ] Restore test completed on a scratch DB; timestamp recorded.
- [ ] `supabase/tests/rls.test.sql` passes against the live host.
- [ ] No `SERVICE_ROLE_KEY` string appears anywhere in `.next/`
      production build output.
- [ ] `/security-review` run; findings resolved.
- [ ] Counsel sign-off on public copy, registration text, alert
      templates.

Only after all checked: import the first real (redacted, friendly)
TMO export.
