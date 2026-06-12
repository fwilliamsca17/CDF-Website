-- Phase 0 synthetic seed.
-- NOTHING in this file represents a real investor, borrower, loan, or
-- property. Names are "Sample Investor A–H" / "Sample Borrower 1–3".
-- Dollars are obviously round and patterned. The portal renders an
-- "About this data" banner driven off the presence of any of these
-- rows, so a viewer can't confuse it for production data.
--
-- Run order:
--   1. Applied migrations (0001_init_schema.sql)
--   2. This seed populates profiles directly (auth.users seeding is
--      done in scripts/seed-synthetic.ts via Supabase Admin API,
--      because we can't bypass auth in SQL alone). This file populates
--      everything that references profiles AFTER the TS step creates
--      the auth users and profile rows.
--
-- Idempotent: deletes Phase-0 rows before inserting.

begin;

-- Tag synthetic rows by a sentinel: every listing/loan/document
-- created here carries 'SYNTHETIC-PHASE-0' somewhere in a labeled
-- field. The UI banner queries for this sentinel.

-- Wipe prior synthetic data (cascade through fk).
delete from sent_alerts        where subject like 'SYNTHETIC%';
delete from loan_documents     where title like 'SYNTHETIC%';
delete from allocation_requests
  where listing_id in (select id from listings where city like 'Sample%')
     or profile_id in (select user_id from profiles where full_name like 'Sample %');
delete from borrower_transactions
  where loan_id in (select id from borrower_loans where loan_ref like 'SYN-%');
delete from borrower_loans     where loan_ref like 'SYN-%';
delete from investor_transactions  where loan_ref like 'SYN-%';
delete from investor_positions     where loan_ref like 'SYN-%';
delete from listing_private    where listing_id in (select id from listings where city like 'Sample%');
delete from listings           where city like 'Sample%';
delete from investor_accounts  where vesting_string like '%Sample%';
delete from investor_criteria  where profile_id in (select user_id from profiles where full_name like 'Sample %');
delete from access_requests    where email like '%@example.invalid';

-- ============================================================
-- Investor accounts (depends on profiles inserted in TS step)
-- Sample Investor C has BOTH a personal account AND a Forge Trust IRA.
-- ============================================================
insert into investor_accounts (profile_id, account_type, custodian, custodian_account_no, vesting_string, tmo_investor_ref)
select user_id, 'individual', 'none', null,
       'Sample Investor ' || substring(full_name from 'Sample Investor (.)') || ', a single person',
       'SYN-INV-' || substring(full_name from 'Sample Investor (.)')
from profiles where full_name in (
  'Sample Investor A','Sample Investor B','Sample Investor C',
  'Sample Investor D','Sample Investor E','Sample Investor F',
  'Sample Investor G','Sample Investor H');

insert into investor_accounts (profile_id, account_type, custodian, custodian_account_no, vesting_string, tmo_investor_ref)
select user_id, 'sdira', 'forge_trust', 'SAMPLE-FT-99001',
       'Forge Trust Co. CFBO Sample Investor C IRA #99001',
       'SYN-INV-C-IRA'
from profiles where full_name = 'Sample Investor C';

-- ============================================================
-- Listings (12) — varied lien / yield / status — all in fake cities
-- ============================================================
with new_listings as (
  insert into listings (amount, remaining_amount, yield_pct, lien_position,
                        property_type, city, state, ltv_pct, cltv_pct,
                        term_months, amortization, prepay_months, occupancy,
                        status, rate_increase, compliance_approved, published_at,
                        net_investor_rate_pct, servicing_spread_pct,
                        borrower_note_rate_pct, funding_structure,
                        fund_retained_amount, min_investment,
                        assignment_status, funds_status,
                        assignment_process_notes, public_visibility)
  values
    (300000, 300000, 10.50, 1, 'SFR',          'Sample City',  'CA', 55.0, 55.0, 24, 'I/O',  6, 'NOO', 'available',        false, true, now() - interval '2 days',  10.50, 1.00, 11.50, 'originated_assignment', null,  50000, 'drafting',    'instructions_sent', 'SYNTHETIC assignment package in preparation.', 'hidden'),
    (450000, 450000, 11.25, 1, 'Multifamily',  'Sample Town',  'CA', 60.0, 60.0, 36, 'I/O',  6, 'NOO', 'available',        false, true, now() - interval '5 days',  11.25, 1.00, 12.25, 'direct_funded',          null, 100000, 'not_started', 'not_requested',     'SYNTHETIC direct-funded loan available for assignment review.', 'hidden'),
    (200000,  75000, 12.00, 2, 'SFR',          'Sample Beach', 'CA', 45.0, 65.0, 18, 'I/O',  4, 'OO',  'partially_placed', false, true, now() - interval '7 days',  12.00, 1.00, 13.00, 'originated_assignment', null,  25000, 'sent',        'partial_received',  'SYNTHETIC partially placed assignment package sent.', 'hidden'),
    (125000, 125000,  9.50, 1, 'Condo',        'Sample Hills', 'CA', 50.0, 50.0, 24, 'I/O',  6, 'NOO', 'available',        false, true, now() - interval '1 day',   9.50, 1.00, 10.50, 'originated_assignment', null,  25000, 'not_started', 'not_requested',     'SYNTHETIC new assignment candidate.', 'hidden'),
    (550000, 550000, 11.00, 1, 'Mixed-Use',    'Sample Bay',   'CA', 58.0, 58.0, 36, '40/3', 6, 'NOO', 'available',        true,  true, now() - interval '10 days', 11.00, 1.00, 12.00, 'fund_retained_interest', 75000, 50000, 'drafting',    'instructions_sent', 'SYNTHETIC fund retains an interest alongside assignments.', 'hidden'),
    (250000, 250000, 12.50, 2, 'SFR',          'Sample Valley','CA', 40.0, 65.0, 18, 'I/O',  4, 'NOO', 'pending',          false, true, now() - interval '14 days', 12.50, 1.00, 13.50, 'originated_assignment', null,  50000, 'not_started', 'not_requested',     'SYNTHETIC pending deal held out of investor list by status.', 'hidden'),
    (180000, 180000, 10.00, 1, 'SFR',          'Sample Coast', 'FL', 55.0, 55.0, 24, 'I/O',  6, 'NOO', 'available',        false, true, now() - interval '3 days',  10.00, 1.00, 11.00, 'direct_funded',          null,  25000, 'not_started', 'not_requested',     'SYNTHETIC direct-funded assignment candidate.', 'hidden'),
    (340000, 340000, 11.75, 2, 'Multifamily',  'Sample Lake',  'CA', 48.0, 70.0, 24, 'I/O',  6, 'NOO', 'available',        false, true, now() - interval '4 days',  11.75, 1.00, 12.75, 'originated_assignment', null,  50000, 'not_started', 'not_requested',     'SYNTHETIC second-position investor review.', 'hidden'),
    (220000,      0, 11.00, 1, 'SFR',          'Sample Mesa',  'AZ', 60.0, 60.0, 24, 'I/O',  6, 'NOO', 'funded',           false, true, now() - interval '60 days', 11.00, 1.00, 12.00, 'originated_assignment', null,  50000, 'boarded',     'received',          'SYNTHETIC funded and boarded example.', 'hidden'),
    (400000, 400000, 12.00, 1, 'Industrial',   'Sample Port',  'CA', 50.0, 50.0, 36, 'I/O',  6, 'NOO', 'available',        false, true, now() - interval '6 days',  12.00, 1.00, 13.00, 'direct_funded',          null, 100000, 'not_started', 'not_requested',     'SYNTHETIC industrial bridge candidate.', 'hidden'),
    (160000, 160000, 13.00, 3, 'SFR',          'Sample Heights','CA',32.0, 72.0, 12, 'I/O',  4, 'NOO', 'available',        false, true, now() - interval '8 days',  13.00, 1.00, 14.00, 'originated_assignment', null,  25000, 'not_started', 'not_requested',     'SYNTHETIC third-position risk review example.', 'hidden'),
    (275000, 275000, 10.75, 1, 'SFR',          'Sample Ridge', 'CA', 56.0, 56.0, 24, 'I/O',  6, 'NOO', 'available',        false, true, now() - interval '9 days',  10.75, 1.00, 11.75, 'originated_assignment', null,  50000, 'not_started', 'not_requested',     'SYNTHETIC first deed assignment candidate.', 'hidden')
  returning id, city
)
insert into listing_private (listing_id, address, appraised_value, purpose, borrower_notes)
select id,
       '123 Sample St, ' || city || ', SAMPLE-DATA 90000',
       (random()*1000000)::numeric(14,2) + 500000,
       'SYNTHETIC — business-purpose bridge / cash-out (Phase 0 only)',
       'SYNTHETIC borrower notes for Phase 0 demo'
from new_listings;

insert into loan_sale_readiness (
  listing_id, tmo_loan_ref, whole_loan_principal, fund_owned_principal,
  fund_owned_pct, target_sale_principal, fund_retained_principal,
  note_rate_pct, net_investor_rate_pct, servicing_spread_pct,
  tmo_rate_modifier_pct, status, next_action, blocker_notes,
  source_file_reviewed, pricing_approved, investor_packet_ready,
  documents_scrubbed, counsel_reviewed, lender_account_ready,
  tmo_funding_lender_added, tmo_lender_rate_verified,
  principal_to_lender_verified, rounding_adjustment_confirmed,
  disbursement_verified, funds_received, assignment_sent,
  assignment_signed, assignment_recorded, assignment_boarded
)
select
  l.id,
  'SYN-TMO-' || row_number() over (order by l.created_at, l.city),
  case
    when l.funding_structure = 'fund_retained_interest' then l.amount + coalesce(l.fund_retained_amount, 0)
    else l.amount
  end,
  l.amount,
  case
    when l.funding_structure = 'fund_retained_interest' then
      round((l.amount / nullif(l.amount + coalesce(l.fund_retained_amount, 0), 0)) * 100, 4)
    else 100.0000
  end,
  coalesce(l.remaining_amount, l.amount),
  coalesce(l.fund_retained_amount, 0),
  l.borrower_note_rate_pct,
  l.net_investor_rate_pct,
  l.servicing_spread_pct,
  -1.00,
  case
    when l.status = 'funded' then 'boarded'::sale_readiness_status
    when l.assignment_status in ('sent', 'signed') then 'ready_to_offer'::sale_readiness_status
    when l.status = 'pending' then 'needs_review'::sale_readiness_status
    else 'needs_review'::sale_readiness_status
  end,
  case
    when l.status = 'funded' then 'SYNTHETIC - confirm boarded investor payment setup.'
    when l.assignment_status = 'sent' then 'SYNTHETIC - follow up for signed assignment package.'
    else 'SYNTHETIC - complete sale packet and TMO Funding Lender setup.'
  end,
  case
    when l.status = 'pending' then 'SYNTHETIC - held pending admin review.'
    else null
  end,
  true,
  l.compliance_approved,
  l.status <> 'pending',
  true,
  l.compliance_approved,
  l.assignment_status <> 'not_started',
  l.assignment_status in ('signed', 'recorded', 'boarded'),
  l.assignment_status in ('signed', 'recorded', 'boarded'),
  l.assignment_status in ('signed', 'recorded', 'boarded'),
  l.assignment_status in ('signed', 'recorded', 'boarded'),
  l.funds_status in ('partial_received', 'received'),
  l.funds_status = 'received',
  l.assignment_status in ('sent', 'signed', 'recorded', 'boarded'),
  l.assignment_status in ('signed', 'recorded', 'boarded'),
  l.assignment_status in ('recorded', 'boarded'),
  l.assignment_status = 'boarded'
from listings l
where l.city like 'Sample%';

insert into allocation_requests (
  listing_id, profile_id, account_id, requested_amount, approved_amount,
  status, source, next_action, due_at, investor_notes, admin_notes
)
select l.id, p.user_id, a.id, 150000, 150000,
       'docs_sent'::allocation_request_status,
       'listing_detail',
       'Send synthetic assignment and funding instruction package.',
       (current_date + interval '2 days')::date,
       'SYNTHETIC — wants personal account allocation.',
       'SYNTHETIC pipeline example for admin review.'
from listings l
join profiles p on p.full_name = 'Sample Investor C'
join investor_accounts a on a.profile_id = p.user_id and a.custodian = 'none'
where l.city = 'Sample City';

insert into allocation_requests (
  listing_id, profile_id, account_id, requested_amount,
  status, source, next_action, due_at, investor_notes, admin_notes
)
select l.id, p.user_id, a.id, 100000,
       'new'::allocation_request_status,
       'listing_detail',
       'Call investor for synthetic suitability review.',
       (current_date + interval '1 day')::date,
       'SYNTHETIC — asks about IRA vs personal funding.',
       'SYNTHETIC new allocation request.'
from listings l
join profiles p on p.full_name = 'Sample Investor A'
join investor_accounts a on a.profile_id = p.user_id and a.custodian = 'none'
where l.city = 'Sample Town';

-- ============================================================
-- Borrower loans (3) + 6 months of payments each
-- ============================================================
insert into borrower_loans
  (borrower_id, loan_ref, property_address, original_amount, current_principal,
   rate_pct, payment_amount, next_due_date, maturity_date, status, as_of)
select user_id,
       case
         when full_name = 'Sample Hybrid 1' then 'SYN-LN-HY1'
         else 'SYN-LN-' || substring(full_name from 'Sample Borrower (\d)')
       end,
       '456 Sample Ave, Sample City, SAMPLE-DATA 90000',
       300000, 295000, 11.00, 2750.00,
       (current_date + interval '15 days')::date,
       (current_date + interval '18 months')::date,
       'current',
       now()
from profiles
where full_name in ('Sample Borrower 1','Sample Borrower 2','Sample Borrower 3','Sample Hybrid 1');

-- Six months of synthetic interest-only payments per loan.
insert into borrower_transactions
  (loan_id, tx_date, tx_type, amount, applied_interest, applied_principal, running_balance)
select bl.id,
       (current_date - (i * interval '1 month'))::date,
       'interest'::transaction_type,
       2750.00, 2750.00, 0.00,
       bl.current_principal
from borrower_loans bl
cross join generate_series(1, 6) as i
where bl.loan_ref like 'SYN-%';

-- ============================================================
-- Mirror those loans to investor_positions for Sample Investor C.
-- C's personal account holds SYN-LN-1 (50%) and Forge IRA holds
-- SYN-LN-2 (100%). That gives the portfolio view two-account grouping.
-- ============================================================
insert into investor_positions
  (account_id, loan_ref, ownership_pct, invested_principal, current_balance, rate_pct, status)
select a.id, 'SYN-LN-1', 50.00, 150000, 147500, 11.00, 'current'
from investor_accounts a
join profiles p on p.user_id = a.profile_id
where p.full_name = 'Sample Investor C' and a.custodian = 'none';

insert into investor_positions
  (account_id, loan_ref, ownership_pct, invested_principal, current_balance, rate_pct, status)
select a.id, 'SYN-LN-2', 100.00, 300000, 295000, 11.00, 'current'
from investor_accounts a
join profiles p on p.user_id = a.profile_id
where p.full_name = 'Sample Investor C' and a.custodian = 'forge_trust';

-- Mirror investor-side transactions for those positions (six months).
insert into investor_transactions
  (account_id, loan_ref, tx_date, tx_type, amount, running_balance)
select ip.account_id, ip.loan_ref,
       (current_date - (i * interval '1 month'))::date,
       'interest'::transaction_type,
       (ip.invested_principal * 0.11 / 12)::numeric(14,2),
       ip.current_balance
from investor_positions ip
cross join generate_series(1, 6) as i
where ip.loan_ref like 'SYN-%';

-- ============================================================
-- Loan documents — one per loan per visibility.
-- ============================================================
insert into loan_documents (loan_ref, title, description, storage_path, visibility)
select lr, 'SYNTHETIC ' || vis || ' doc — ' || lr,
       'Phase-0 placeholder document',
       'phase0/' || lr || '/' || vis || '.pdf',
       vis::doc_visibility
from (values ('SYN-LN-1'),('SYN-LN-2'),('SYN-LN-3'),('SYN-LN-HY1')) as l(lr)
cross join (values ('borrower'),('investor'),('both')) as v(vis);

-- ============================================================
-- A couple of access_requests for the admin queue.
-- ============================================================
insert into access_requests (full_name, email, phone, how_they_invest, source, message)
values
  ('Sample Applicant 1', 'applicant-1@example.invalid', '555-0199', 'IRA',
   'referral', 'SYNTHETIC — wants to learn more about your program.'),
  ('Sample Applicant 2', 'applicant-2@example.invalid', '555-0188', 'personal',
   'how-it-works page', 'SYNTHETIC — referred by Sample Investor A.');

commit;
