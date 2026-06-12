-- CDF Investor Portal — Phase 0.5 funnel layer
--
-- Adds the operating primitives that Phase 0 deliberately deferred:
-- net investor economics, servicing spread disclosure, assignment/funding
-- status, explicit public visibility posture, and investor allocation
-- requests. Real public deal visibility remains counsel-gated.

set search_path = public;

-- ============================================================
-- Enums
-- ============================================================
create type public_listing_visibility as enum (
  'hidden',
  'sample',
  'public_teaser',
  'gated_live'
);

create type funding_structure as enum (
  'direct_funded',
  'originated_assignment',
  'fund_retained_interest'
);

create type assignment_status as enum (
  'not_started',
  'drafting',
  'sent',
  'signed',
  'recorded',
  'boarded'
);

create type funds_status as enum (
  'not_requested',
  'instructions_sent',
  'partial_received',
  'received',
  'returned'
);

create type allocation_request_status as enum (
  'new',
  'called',
  'qualified',
  'docs_sent',
  'committed',
  'funds_received',
  'assigned',
  'boarded',
  'declined',
  'lost'
);

-- ============================================================
-- Listing economics + lifecycle
-- ============================================================
alter table listings
  add column net_investor_rate_pct numeric(5,2),
  add column servicing_spread_pct numeric(5,2) not null default 1.00,
  add column borrower_note_rate_pct numeric(5,2),
  add column funding_structure funding_structure not null default 'originated_assignment',
  add column fund_retained_amount numeric(14,2),
  add column min_investment numeric(14,2),
  add column assignment_status assignment_status not null default 'not_started',
  add column funds_status funds_status not null default 'not_requested',
  add column assignment_process_notes text,
  add column public_visibility public_listing_visibility not null default 'hidden',
  add column public_disclaimer text,
  add column public_published_at timestamptz,
  add column counsel_reviewed_at timestamptz,
  add column counsel_reviewed_by uuid references profiles(user_id);

update listings
set net_investor_rate_pct = yield_pct
where net_investor_rate_pct is null;

alter table listings
  add constraint listings_servicing_spread_nonnegative
  check (servicing_spread_pct >= 0),
  add constraint listings_net_rate_positive
  check (net_investor_rate_pct is null or net_investor_rate_pct > 0),
  add constraint listings_borrower_rate_positive
  check (borrower_note_rate_pct is null or borrower_note_rate_pct > 0),
  add constraint listings_min_investment_nonnegative
  check (min_investment is null or min_investment >= 0),
  add constraint listings_fund_retained_nonnegative
  check (fund_retained_amount is null or fund_retained_amount >= 0);

create index listings_investor_visible_idx
  on listings (published_at, status)
  where compliance_approved = true;

-- ============================================================
-- Allocation requests — investor interest through funding funnel
-- ============================================================
create table allocation_requests (
  id                uuid primary key default gen_random_uuid(),
  listing_id        uuid not null references listings(id) on delete cascade,
  profile_id        uuid not null references profiles(user_id) on delete cascade,
  account_id        uuid references investor_accounts(id) on delete set null,
  requested_amount  numeric(14,2) not null,
  approved_amount   numeric(14,2),
  status            allocation_request_status not null default 'new',
  source            text not null default 'listing_detail',
  next_action       text,
  owner             uuid references profiles(user_id),
  due_at            date,
  investor_notes    text,
  admin_notes       text,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),

  constraint allocation_requests_requested_positive
    check (requested_amount > 0),
  constraint allocation_requests_approved_nonnegative
    check (approved_amount is null or approved_amount >= 0)
);

create index allocation_requests_listing_idx on allocation_requests (listing_id);
create index allocation_requests_profile_idx on allocation_requests (profile_id);
create index allocation_requests_status_idx on allocation_requests (status, created_at);

create unique index allocation_requests_open_unique_idx
  on allocation_requests (
    listing_id,
    profile_id,
    coalesce(account_id, '00000000-0000-0000-0000-000000000000'::uuid)
  )
  where status in ('new', 'called', 'qualified', 'docs_sent', 'committed', 'funds_received', 'assigned');

alter table allocation_requests enable row level security;
alter table allocation_requests force row level security;

create policy "allocation_requests self read"
  on allocation_requests for select to authenticated
  using (
    is_admin() or
    profile_id = auth.uid()
  );

create policy "allocation_requests investor insert"
  on allocation_requests for insert to authenticated
  with check (
    profile_id = auth.uid()
    and exists (
      select 1 from profiles p
      where p.user_id = auth.uid()
        and p.approval_status = 'approved'
        and p.role in ('investor', 'both')
    )
    and exists (
      select 1 from listings l
      where l.id = allocation_requests.listing_id
        and l.compliance_approved = true
        and l.published_at is not null
        and l.status in ('available', 'partially_placed')
    )
    and (
      account_id is null
      or exists (
        select 1 from investor_accounts a
        where a.id = allocation_requests.account_id
          and a.profile_id = auth.uid()
      )
    )
  );

create policy "allocation_requests admin all"
  on allocation_requests for all to authenticated
  using (is_admin())
  with check (is_admin());

create trigger allocation_requests_touch
  before update on allocation_requests
  for each row execute function touch_updated_at();
