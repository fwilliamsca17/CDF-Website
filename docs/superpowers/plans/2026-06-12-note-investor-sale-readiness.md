# Note Investor Sale Readiness Workflow

Date: 2026-06-12
Branch: `investor-portal-plan`
Data posture: no real borrower, investor, or loan data in repo fixtures.

## Goal

Prepare each fund-owned or partially fund-owned loan so it can be offered to a
private note investor with clear economics, clean documents, TMO servicing
setup, and an assignment path that can move from investor interest to funded
and boarded.

The investor-facing rate is the net rate only. Internally, the readiness record
stores the note rate, the net investor rate, and the servicing spread. For the
standard current model:

```text
Net investor rate = Borrower note rate - 1.00%
TMO rate modifier = -1.00%
Servicing spread = 1.00%
```

## Per-Loan Readiness Fields

Every loan needs an admin-only readiness record before it is treated as
sale-ready:

- TMO loan reference.
- Whole-loan principal.
- Fund-owned principal and ownership percent.
- Target sale principal.
- Fund-retained principal, if CDF/WCG keeps a co-invested slice.
- Borrower note rate.
- Net investor rate.
- Servicing spread.
- TMO rate modifier.
- Next action and blocker notes.

The investor listing uses only the approved sale amount and net investor terms.
The admin readiness record keeps the operating details that should not be on a
public or investor-facing page.

## TMO Funding Lender Setup

In The Mortgage Office, the sale is represented by adding the investor as a
Funding Lender on the loan Funding tab.

Required TMO confirmations:

- Investor lender account exists and the vesting is correct.
- Principal-to-Lender amount matches the target sale principal.
- Lender Rate equals Note Rate minus the disclosed servicing spread.
- Rate Modifier reflects the spread, typically `-1.000%`.
- Rounding Adjustment owner is intentionally selected.
- Disbursement instructions are verified after the lender record is saved.
- Funding lender record is boarded only after funds and assignment documents
are complete.

## Sale Sequence

1. Lock economics.
2. Build investor packet.
3. Create or verify the investor lender account in TMO.
4. Add Funding Lender and verify lender rate / principal / rounding.
5. Send assignment and funding instructions.
6. Confirm funds received.
7. Confirm assignment signed and recorded.
8. Board the investor in servicing records.
9. Verify the investor portal reflects the position, documents, and payment
history.

## Readiness Gates

A loan should not be marked `ready_to_offer` unless:

- Source file was reviewed.
- Pricing was approved.
- Investor packet is ready.
- Documents are scrubbed for investor visibility.
- Counsel/compliance reviewed the offer copy and documents.
- TMO lender account setup path is known.
- No blocker notes remain.

A loan should not be marked `boarded` unless:

- Funding Lender was added.
- Lender rate was verified.
- Principal-to-Lender was verified.
- Rounding adjustment was confirmed.
- Disbursement was verified.
- Funds were received.
- Assignment was signed, recorded, and boarded.

## Phase 1 Import Implication

The real TMO import should not auto-publish listings. It should create or update
admin-only sale-readiness records first, then require a human to mark each loan
ready before it can be published to investors.
