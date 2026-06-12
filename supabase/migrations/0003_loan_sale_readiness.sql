-- CDF Investor Portal — loan sale readiness workflow
--
-- Admin-only preparation layer for selling a fund/WCG-owned loan position
-- to a private note investor at a disclosed net investor rate. This table
-- intentionally keeps TMO setup status, assignment package status, and
-- blocker notes out of investor-facing listing rows.

set search_path = public;

create type sale_readiness_status as enum (
  'not_started',
  'needs_review',
  'ready_to_offer',
  'blocked',
  'boarded'
);

create table loan_sale_readiness (
  listing_id                    uuid primary key references listings(id) on delete cascade,
  tmo_loan_ref                  text,
  whole_loan_principal          numeric(14,2),
  fund_owned_principal          numeric(14,2),
  fund_owned_pct                numeric(7,4),
  target_sale_principal         numeric(14,2),
  fund_retained_principal       numeric(14,2),
  note_rate_pct                 numeric(5,2),
  net_investor_rate_pct         numeric(5,2),
  servicing_spread_pct          numeric(5,2) not null default 1.00,
  tmo_rate_modifier_pct         numeric(5,2) not null default -1.00,
  status                        sale_readiness_status not null default 'not_started',
  next_action                   text,
  blocker_notes                 text,

  -- TMO / assignment readiness checklist.
  source_file_reviewed          boolean not null default false,
  pricing_approved              boolean not null default false,
  investor_packet_ready         boolean not null default false,
  documents_scrubbed            boolean not null default false,
  counsel_reviewed              boolean not null default false,
  lender_account_ready          boolean not null default false,
  tmo_funding_lender_added      boolean not null default false,
  tmo_lender_rate_verified      boolean not null default false,
  principal_to_lender_verified  boolean not null default false,
  rounding_adjustment_confirmed boolean not null default false,
  disbursement_verified         boolean not null default false,
  funds_received                boolean not null default false,
  assignment_sent               boolean not null default false,
  assignment_signed             boolean not null default false,
  assignment_recorded           boolean not null default false,
  assignment_boarded            boolean not null default false,

  created_at                    timestamptz not null default now(),
  updated_at                    timestamptz not null default now(),

  constraint loan_sale_readiness_whole_nonnegative
    check (whole_loan_principal is null or whole_loan_principal >= 0),
  constraint loan_sale_readiness_fund_owned_nonnegative
    check (fund_owned_principal is null or fund_owned_principal >= 0),
  constraint loan_sale_readiness_target_nonnegative
    check (target_sale_principal is null or target_sale_principal >= 0),
  constraint loan_sale_readiness_retained_nonnegative
    check (fund_retained_principal is null or fund_retained_principal >= 0),
  constraint loan_sale_readiness_rates_positive
    check (
      (note_rate_pct is null or note_rate_pct > 0)
      and (net_investor_rate_pct is null or net_investor_rate_pct > 0)
      and servicing_spread_pct >= 0
    ),
  constraint loan_sale_readiness_fund_owned_pct_range
    check (fund_owned_pct is null or (fund_owned_pct >= 0 and fund_owned_pct <= 100))
);

create index loan_sale_readiness_status_idx on loan_sale_readiness (status, updated_at);
create unique index loan_sale_readiness_tmo_ref_idx
  on loan_sale_readiness (tmo_loan_ref)
  where tmo_loan_ref is not null;

alter table loan_sale_readiness enable row level security;
alter table loan_sale_readiness force row level security;

create policy "loan_sale_readiness admin only"
  on loan_sale_readiness for all to authenticated
  using (is_admin())
  with check (is_admin());

create trigger loan_sale_readiness_touch
  before update on loan_sale_readiness
  for each row execute function touch_updated_at();
