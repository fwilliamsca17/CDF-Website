-- CDF Investor Portal — Phase 0 schema
-- Spec: docs/superpowers/specs/2026-06-11-investor-portal-design.md
--
-- Conventions:
--   * Every gated table gets FORCE ROW LEVEL SECURITY.
--   * `anon` role gets ZERO grants on base tables. Only the
--     `listings_teaser` view (security_invoker = on) is exposed to anon
--     in Phase 0, and even that is intentionally empty in Phase 0 (the
--     private-membership posture means no public listings at all). The
--     view exists structurally so the codebase stays the same when/if
--     a counsel-approved public surface is later added.
--   * Admin checks use `auth.uid() IN admin_users`, never email.
--   * No financial figures, no real names, no production data — Phase 0
--     is synthetic-only. Real data crosses the wire only after Phase 1
--     gate passes.

set search_path = public;

-- ============================================================
-- Enums
-- ============================================================
create type profile_role         as enum ('investor', 'borrower', 'both');
create type approval_status      as enum ('pending', 'approved', 'rejected');
create type account_type         as enum ('individual', 'joint', 'trust', 'entity', 'sdira', 'solo_401k');
create type custodian            as enum ('forge_trust', 'provident_trust_group', 'entrust_group', 'other_self_directed', 'none');
create type listing_status       as enum ('available', 'partially_placed', 'pending', 'funded');
create type doc_visibility       as enum ('borrower', 'investor', 'both');
create type import_batch_status  as enum ('validated', 'committed', 'rolled_back');
create type transaction_type     as enum ('interest', 'principal', 'late_charge', 'fee', 'other');

-- ============================================================
-- Admin allowlist (uid-keyed, never email)
-- Populated via service-role SQL, never through the app.
-- ============================================================
create table admin_users (
  user_id   uuid primary key references auth.users(id) on delete cascade,
  added_at  timestamptz not null default now(),
  notes     text
);
alter table admin_users enable row level security;
alter table admin_users force row level security;
-- No grants to anon/authenticated. Service role only.

create or replace function is_admin() returns boolean
language sql stable security invoker
set search_path = public, pg_temp
as $$
  select exists (select 1 from admin_users where user_id = auth.uid())
$$;

-- ============================================================
-- Profiles
-- ============================================================
create table profiles (
  user_id           uuid primary key references auth.users(id) on delete cascade,
  role              profile_role not null default 'investor',
  full_name         text,
  phone             text,
  email             text,
  suitability       jsonb,                -- RE 870–aligned answers; investors only
  ca_resident       boolean not null default false,
  accredited        boolean not null default false,
  approval_status   approval_status not null default 'pending',
  admin_notes       text,
  email_alerts      boolean not null default true,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);
alter table profiles enable row level security;
alter table profiles force row level security;

-- Auto-create profile row when auth.users gets a new row.
create or replace function handle_new_user()
returns trigger language plpgsql security definer
set search_path = public, pg_temp
as $$
begin
  insert into public.profiles (user_id, email)
  values (new.id, new.email)
  on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- Investors may read their own profile. Admins read all.
create policy "profile self read"
  on profiles for select to authenticated
  using (user_id = auth.uid() or is_admin());

-- Investors may update ONLY name/phone/email_alerts on their own row.
-- approval_status / accredited / role / suitability are admin-only.
revoke update on profiles from authenticated;
grant update (full_name, phone, email_alerts) on profiles to authenticated;
create policy "profile self update"
  on profiles for update to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "profile admin all"
  on profiles for all to authenticated
  using (is_admin())
  with check (is_admin());

-- ============================================================
-- Investor accounts (multi-vesting per profile — Forge / Provident /
-- Entrust SDIRA / Solo 401k / personal)
-- ============================================================
create table investor_accounts (
  id                   uuid primary key default gen_random_uuid(),
  profile_id           uuid not null references profiles(user_id) on delete cascade,
  account_type         account_type not null,
  custodian            custodian not null default 'none',
  custodian_account_no text,
  vesting_string       text not null,                 -- exact recorded vesting
  tmo_investor_ref     text,                          -- admin-set linking key
  created_at           timestamptz not null default now()
);
create index on investor_accounts (profile_id);
create unique index investor_accounts_tmo_ref_idx
  on investor_accounts (tmo_investor_ref) where tmo_investor_ref is not null;

alter table investor_accounts enable row level security;
alter table investor_accounts force row level security;

create policy "accounts self read"
  on investor_accounts for select to authenticated
  using (profile_id = auth.uid() or is_admin());

-- Investors cannot directly write their accounts — admin only.
create policy "accounts admin write"
  on investor_accounts for all to authenticated
  using (is_admin())
  with check (is_admin());

-- ============================================================
-- Borrower-side linking on profiles (kept simple in Phase 0: one
-- tmo_borrower_ref per profile, since borrowers are 1:1 with TMO
-- borrower account in this dataset).
-- ============================================================
alter table profiles add column tmo_borrower_ref text;
create unique index profiles_tmo_borrower_ref_idx
  on profiles (tmo_borrower_ref) where tmo_borrower_ref is not null;

-- ============================================================
-- Listings — teaser-safe columns
-- ============================================================
create table listings (
  id                    uuid primary key default gen_random_uuid(),
  amount                numeric(14,2) not null,
  remaining_amount      numeric(14,2),
  yield_pct             numeric(5,2) not null,
  lien_position         int not null check (lien_position between 1 and 3),
  property_type         text not null,
  city                  text not null,
  state                 char(2) not null,
  ltv_pct               numeric(5,2),
  cltv_pct              numeric(5,2),
  term_months           int,
  amortization          text,                   -- "I/O", "40/3", etc.
  prepay_months         int,
  occupancy             text,
  status                listing_status not null default 'available',
  rate_increase         boolean not null default false,
  compliance_approved   boolean not null default false,
  published_at          timestamptz,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);
alter table listings enable row level security;
alter table listings force row level security;

-- Approved investors read all listings. Admins read+write everything.
create policy "listings approved read"
  on listings for select to authenticated
  using (
    is_admin() or
    exists (
      select 1 from profiles p
      where p.user_id = auth.uid()
        and p.approval_status = 'approved'
        and p.role in ('investor', 'both')
    )
  );
create policy "listings admin write"
  on listings for all to authenticated
  using (is_admin())
  with check (is_admin());

-- ============================================================
-- Listing private — physically separate so the public surface
-- CANNOT project gated columns (defense beyond view-level filtering).
-- ============================================================
create table listing_private (
  listing_id        uuid primary key references listings(id) on delete cascade,
  address           text not null,
  appraised_value   numeric(14,2),
  purpose           text,
  borrower_notes    text,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);
alter table listing_private enable row level security;
alter table listing_private force row level security;

create policy "listing_private approved read"
  on listing_private for select to authenticated
  using (
    is_admin() or
    exists (
      select 1 from profiles p
      where p.user_id = auth.uid()
        and p.approval_status = 'approved'
        and p.role in ('investor', 'both')
    )
  );
create policy "listing_private admin write"
  on listing_private for all to authenticated
  using (is_admin())
  with check (is_admin());

-- ============================================================
-- Public teaser view — intentionally returns NOTHING in Phase 0
-- (private-membership posture). Kept as a structural placeholder.
-- security_invoker = on ensures RLS of the QUERYING role applies.
-- ============================================================
create view listings_teaser
  with (security_invoker = on)
as
  select id, yield_pct, lien_position, property_type, city, state,
         ltv_pct, cltv_pct, status, published_at
  from listings
  where false;        -- Phase 0: hard-empty. Counsel decides v1 contents.

grant select on listings_teaser to anon;

-- ============================================================
-- Import batches (TMO export ingestion)
-- ============================================================
create table import_batches (
  id              uuid primary key default gen_random_uuid(),
  file_name       text not null,
  uploaded_by     uuid references profiles(user_id),
  uploaded_at     timestamptz not null default now(),
  row_counts      jsonb,
  validation      jsonb,
  status          import_batch_status not null default 'validated'
);
alter table import_batches enable row level security;
alter table import_batches force row level security;
create policy "imports admin only"
  on import_batches for all to authenticated
  using (is_admin()) with check (is_admin());

-- ============================================================
-- Investor positions + transactions (TMO mirror, read-only to app)
-- ============================================================
create table investor_positions (
  id                  uuid primary key default gen_random_uuid(),
  account_id          uuid not null references investor_accounts(id) on delete cascade,
  loan_ref            text not null,                  -- TMO loan reference
  ownership_pct       numeric(7,4),
  invested_principal  numeric(14,2) not null,
  current_balance     numeric(14,2) not null,
  rate_pct            numeric(5,2) not null,
  status              text,
  import_batch_id     uuid references import_batches(id),
  as_of              timestamptz not null default now()
);
create index on investor_positions (account_id);
create index on investor_positions (loan_ref);
alter table investor_positions enable row level security;
alter table investor_positions force row level security;

create policy "positions self read"
  on investor_positions for select to authenticated
  using (
    is_admin() or
    exists (
      select 1 from investor_accounts a
      where a.id = investor_positions.account_id
        and a.profile_id = auth.uid()
    )
  );
create policy "positions admin write"
  on investor_positions for all to authenticated
  using (is_admin()) with check (is_admin());

create table investor_transactions (
  id                uuid primary key default gen_random_uuid(),
  account_id        uuid not null references investor_accounts(id) on delete cascade,
  loan_ref          text not null,
  tx_date           date not null,
  tx_type           transaction_type not null,
  amount            numeric(14,2) not null,
  running_balance   numeric(14,2),
  import_batch_id   uuid references import_batches(id),
  created_at        timestamptz not null default now()
);
create index on investor_transactions (account_id, tx_date);
create index on investor_transactions (loan_ref, tx_date);
alter table investor_transactions enable row level security;
alter table investor_transactions force row level security;

create policy "investor_tx self read"
  on investor_transactions for select to authenticated
  using (
    is_admin() or
    exists (
      select 1 from investor_accounts a
      where a.id = investor_transactions.account_id
        and a.profile_id = auth.uid()
    )
  );
create policy "investor_tx admin write"
  on investor_transactions for all to authenticated
  using (is_admin()) with check (is_admin());

-- ============================================================
-- Borrower loans + transactions
-- ============================================================
create table borrower_loans (
  id                  uuid primary key default gen_random_uuid(),
  borrower_id         uuid not null references profiles(user_id) on delete cascade,
  loan_ref            text not null,
  property_address    text not null,
  original_amount     numeric(14,2) not null,
  current_principal   numeric(14,2) not null,
  rate_pct            numeric(5,2) not null,
  payment_amount      numeric(14,2),
  next_due_date       date,
  maturity_date       date,
  status              text,
  import_batch_id     uuid references import_batches(id),
  as_of               timestamptz not null default now()
);
create index on borrower_loans (borrower_id);
create unique index borrower_loans_loan_ref_idx on borrower_loans (loan_ref);
alter table borrower_loans enable row level security;
alter table borrower_loans force row level security;

create policy "borrower_loans self read"
  on borrower_loans for select to authenticated
  using (borrower_id = auth.uid() or is_admin());
create policy "borrower_loans admin write"
  on borrower_loans for all to authenticated
  using (is_admin()) with check (is_admin());

create table borrower_transactions (
  id                uuid primary key default gen_random_uuid(),
  loan_id           uuid not null references borrower_loans(id) on delete cascade,
  tx_date           date not null,
  tx_type           transaction_type not null,
  amount            numeric(14,2) not null,
  applied_interest  numeric(14,2),
  applied_principal numeric(14,2),
  applied_fees      numeric(14,2),
  running_balance   numeric(14,2),
  import_batch_id   uuid references import_batches(id),
  created_at        timestamptz not null default now()
);
create index on borrower_transactions (loan_id, tx_date);
alter table borrower_transactions enable row level security;
alter table borrower_transactions force row level security;

create policy "borrower_tx self read"
  on borrower_transactions for select to authenticated
  using (
    is_admin() or
    exists (
      select 1 from borrower_loans l
      where l.id = borrower_transactions.loan_id
        and l.borrower_id = auth.uid()
    )
  );
create policy "borrower_tx admin write"
  on borrower_transactions for all to authenticated
  using (is_admin()) with check (is_admin());

-- ============================================================
-- Loan documents — per-loan vault with role-scoped visibility.
-- A document may be visible to the borrower only, investors only, or
-- both (`both`). Cross-visibility rule (spec): borrower never sees
-- investor identities; investor never sees borrower-private docs.
-- ============================================================
create table loan_documents (
  id              uuid primary key default gen_random_uuid(),
  loan_ref        text not null,            -- shared key across roles
  title           text not null,
  description     text,
  storage_path    text not null,            -- UUID object key in private bucket
  visibility      doc_visibility not null,
  uploaded_by     uuid references profiles(user_id),
  uploaded_at     timestamptz not null default now()
);
create index on loan_documents (loan_ref);
alter table loan_documents enable row level security;
alter table loan_documents force row level security;

create policy "loan_documents borrower read"
  on loan_documents for select to authenticated
  using (
    is_admin() or
    (
      visibility in ('borrower', 'both')
      and exists (
        select 1 from borrower_loans l
        where l.loan_ref = loan_documents.loan_ref
          and l.borrower_id = auth.uid()
      )
    )
    or
    (
      visibility in ('investor', 'both')
      and exists (
        select 1 from investor_positions p
        join investor_accounts a on a.id = p.account_id
        where p.loan_ref = loan_documents.loan_ref
          and a.profile_id = auth.uid()
      )
    )
  );
create policy "loan_documents admin write"
  on loan_documents for all to authenticated
  using (is_admin()) with check (is_admin());

-- ============================================================
-- Access requests (public "Request access" form — not an auth account)
-- ============================================================
create table access_requests (
  id              uuid primary key default gen_random_uuid(),
  full_name       text not null,
  email           text not null,
  phone           text,
  how_they_invest text,            -- personal / IRA / Solo 401k / multiple
  source          text,
  message         text,
  created_at      timestamptz not null default now(),
  handled_at      timestamptz,
  handled_by      uuid references profiles(user_id)
);
alter table access_requests enable row level security;
alter table access_requests force row level security;

-- Anyone (anon) may INSERT a request; nobody but admin may read.
grant insert on access_requests to anon;
create policy "access_requests anon insert"
  on access_requests for insert to anon
  with check (true);
create policy "access_requests admin read"
  on access_requests for all to authenticated
  using (is_admin()) with check (is_admin());

-- ============================================================
-- Sent alerts (immutable record per spec compliance retention)
-- ============================================================
create table sent_alerts (
  id              uuid primary key default gen_random_uuid(),
  listing_id      uuid references listings(id) on delete set null,
  recipient_id    uuid references profiles(user_id) on delete set null,
  recipient_email text not null,
  subject         text not null,
  body_html       text not null,
  sent_at         timestamptz not null default now(),
  delivery_status text                       -- 'sent' | 'bounced' | 'failed'
);
create index on sent_alerts (listing_id, sent_at);
alter table sent_alerts enable row level security;
alter table sent_alerts force row level security;
create policy "sent_alerts admin only"
  on sent_alerts for all to authenticated
  using (is_admin()) with check (is_admin());

-- ============================================================
-- Investor criteria (schema only — matching engine deferred per audit)
-- ============================================================
create table investor_criteria (
  id                 uuid primary key default gen_random_uuid(),
  profile_id         uuid not null references profiles(user_id) on delete cascade,
  match_all_new      boolean not null default true,    -- default: tell me everything
  min_yield_pct      numeric(5,2),
  lien_positions     int[],
  max_cltv_pct       numeric(5,2),
  amount_min         numeric(14,2),
  amount_max         numeric(14,2),
  states             text[],
  property_types     text[],
  updated_at         timestamptz not null default now()
);
create unique index on investor_criteria (profile_id);
alter table investor_criteria enable row level security;
alter table investor_criteria force row level security;

create policy "criteria self all"
  on investor_criteria for all to authenticated
  using (profile_id = auth.uid())
  with check (profile_id = auth.uid());
create policy "criteria admin read"
  on investor_criteria for select to authenticated
  using (is_admin());

-- ============================================================
-- updated_at trigger helper
-- ============================================================
create or replace function touch_updated_at() returns trigger
language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_touch         before update on profiles
  for each row execute function touch_updated_at();
create trigger listings_touch         before update on listings
  for each row execute function touch_updated_at();
create trigger listing_private_touch  before update on listing_private
  for each row execute function touch_updated_at();
create trigger criteria_touch         before update on investor_criteria
  for each row execute function touch_updated_at();
