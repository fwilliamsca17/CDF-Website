"use server";

import { revalidatePath } from "next/cache";
import { requireAdminAction } from "../admin-utils";
import {
  SyntheticTmoValidation,
  validateSyntheticTmoCsv,
} from "@/lib/portal/synthetic-tmo";

function transactionKey(parts: Array<string | number | null | undefined>) {
  return parts.map((p) => (p === null || p === undefined ? "" : String(p))).join(":");
}

async function knownRefs(supabase: Awaited<ReturnType<typeof requireAdminAction>>["supabase"]) {
  const [
    { data: accounts },
    { data: borrowers },
    { data: loans },
    { data: investorTxs },
    { data: borrowerTxs },
  ] = await Promise.all([
    supabase.from("investor_accounts").select("id, tmo_investor_ref"),
    supabase.from("profiles").select("user_id, tmo_borrower_ref"),
    supabase.from("borrower_loans").select("id, loan_ref"),
    supabase.from("investor_transactions").select("account_id, loan_ref, tx_date, tx_type, amount"),
    supabase
      .from("borrower_transactions")
      .select("loan_id, tx_date, tx_type, amount, borrower_loans(loan_ref)"),
  ]);

  const investorRefs = new Map<string, string>();
  const accountToRef = new Map<string, string>();
  for (const a of accounts ?? []) {
    if (a.tmo_investor_ref) {
      investorRefs.set(a.tmo_investor_ref, a.id);
      accountToRef.set(a.id, a.tmo_investor_ref);
    }
  }

  const borrowerRefs = new Map<string, string>();
  for (const b of borrowers ?? []) {
    if (b.tmo_borrower_ref) borrowerRefs.set(b.tmo_borrower_ref, b.user_id);
  }

  const borrowerLoanRefs = new Set<string>();
  const loanIdToRef = new Map<string, string>();
  for (const l of loans ?? []) {
    borrowerLoanRefs.add(l.loan_ref);
    loanIdToRef.set(l.id, l.loan_ref);
  }

  const existingInvestorTxKeys = new Set<string>();
  for (const tx of investorTxs ?? []) {
    const ref = accountToRef.get(tx.account_id);
    if (ref) {
      existingInvestorTxKeys.add(
        transactionKey(["investor_tx", ref, tx.loan_ref, tx.tx_date, tx.tx_type, Number(tx.amount)]),
      );
    }
  }

  const existingBorrowerTxKeys = new Set<string>();
  for (const tx of borrowerTxs ?? []) {
    const joined = tx.borrower_loans as { loan_ref?: string } | null;
    const loanRef = joined?.loan_ref ?? loanIdToRef.get(tx.loan_id);
    if (loanRef) {
      existingBorrowerTxKeys.add(
        transactionKey(["borrower_tx", loanRef, tx.tx_date, tx.tx_type, Number(tx.amount)]),
      );
    }
  }

  return {
    investorRefs,
    borrowerRefs,
    borrowerLoanRefs,
    existingInvestorTxKeys,
    existingBorrowerTxKeys,
  };
}

function rowCounts(validation: SyntheticTmoValidation) {
  return validation.rows.reduce<Record<string, number>>((acc, row) => {
    acc[row.record_type] = (acc[row.record_type] ?? 0) + 1;
    return acc;
  }, {});
}

export async function validateSyntheticImport(formData: FormData) {
  const { user, supabase } = await requireAdminAction();
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    throw new Error("Upload a CSV file");
  }
  if (file.size > 1024 * 1024) {
    throw new Error("Synthetic CSV must be under 1 MB");
  }

  const validation = validateSyntheticTmoCsv(await file.text(), await knownRefs(supabase));
  const { error } = await supabase.from("import_batches").insert({
    file_name: file.name,
    uploaded_by: user.id,
    row_counts: rowCounts(validation),
    validation,
    status: "validated",
  });
  if (error) throw new Error(error.message);

  revalidatePath("/admin/import");
  revalidatePath("/admin");
}

export async function commitSyntheticImport(formData: FormData) {
  const { supabase } = await requireAdminAction();
  const batchId = String(formData.get("batch_id") ?? "");
  if (!batchId) throw new Error("batch_id required");

  const { data: batch } = await supabase
    .from("import_batches")
    .select("id, status, validation")
    .eq("id", batchId)
    .single();
  if (!batch) throw new Error("Batch not found");
  if (batch.status !== "validated") throw new Error("Only validated batches can be committed");

  const validation = batch.validation as SyntheticTmoValidation;
  if (validation.errors.length) throw new Error("Cannot commit a batch with validation errors");

  const investorPositions = validation.rows.filter((r) => r.record_type === "investor_position");
  for (const row of investorPositions) {
    if (!row.account_id) continue;
    await supabase
      .from("investor_positions")
      .delete()
      .eq("account_id", row.account_id)
      .eq("loan_ref", row.loan_ref);
    const { error } = await supabase.from("investor_positions").insert({
      account_id: row.account_id,
      loan_ref: row.loan_ref,
      ownership_pct: row.ownership_pct,
      invested_principal: row.invested_principal,
      current_balance: row.current_balance,
      rate_pct: row.rate_pct,
      status: row.status,
      import_batch_id: batchId,
      as_of: new Date().toISOString(),
    });
    if (error) throw new Error(error.message);
  }

  const borrowerLoans = validation.rows.filter((r) => r.record_type === "borrower_loan");
  for (const row of borrowerLoans) {
    if (!row.borrower_id) continue;
    const { error } = await supabase.from("borrower_loans").upsert(
      {
        borrower_id: row.borrower_id,
        loan_ref: row.loan_ref,
        property_address: row.property_address,
        original_amount: row.original_amount,
        current_principal: row.current_principal,
        rate_pct: row.rate_pct,
        payment_amount: row.payment_amount,
        next_due_date: row.next_due_date,
        maturity_date: row.maturity_date,
        status: row.status,
        import_batch_id: batchId,
        as_of: new Date().toISOString(),
      },
      { onConflict: "loan_ref" },
    );
    if (error) throw new Error(error.message);
  }

  const borrowerLoanRefs = Array.from(
    new Set(validation.rows.filter((r) => "loan_ref" in r).map((r) => r.loan_ref)),
  );
  const { data: loanRows } = await supabase
    .from("borrower_loans")
    .select("id, loan_ref")
    .in("loan_ref", borrowerLoanRefs);
  const loanIdByRef = new Map((loanRows ?? []).map((l) => [l.loan_ref, l.id]));

  const investorTxs = validation.rows.filter((r) => r.record_type === "investor_transaction");
  if (investorTxs.length) {
    const { error } = await supabase.from("investor_transactions").insert(
      investorTxs
        .filter((row) => row.account_id)
        .map((row) => ({
          account_id: row.account_id,
          loan_ref: row.loan_ref,
          tx_date: row.tx_date,
          tx_type: row.tx_type,
          amount: row.amount,
          running_balance: row.running_balance,
          import_batch_id: batchId,
        })),
    );
    if (error) throw new Error(error.message);
  }

  const borrowerTxs = validation.rows.filter((r) => r.record_type === "borrower_transaction");
  if (borrowerTxs.length) {
    const { error } = await supabase.from("borrower_transactions").insert(
      borrowerTxs
        .filter((row) => loanIdByRef.has(row.loan_ref))
        .map((row) => ({
          loan_id: loanIdByRef.get(row.loan_ref),
          tx_date: row.tx_date,
          tx_type: row.tx_type,
          amount: row.amount,
          applied_interest: row.applied_interest,
          applied_principal: row.applied_principal,
          applied_fees: row.applied_fees,
          running_balance: row.running_balance,
          import_batch_id: batchId,
        })),
    );
    if (error) throw new Error(error.message);
  }

  await supabase.from("import_batches").update({ status: "committed" }).eq("id", batchId);
  revalidatePath("/admin/import");
  revalidatePath("/portfolio");
  revalidatePath("/loans");
  revalidatePath("/admin");
}

export async function rollbackSyntheticImport(formData: FormData) {
  const { supabase } = await requireAdminAction();
  const batchId = String(formData.get("batch_id") ?? "");
  if (!batchId) throw new Error("batch_id required");

  await supabase.from("investor_transactions").delete().eq("import_batch_id", batchId);
  await supabase.from("investor_positions").delete().eq("import_batch_id", batchId);
  await supabase.from("borrower_transactions").delete().eq("import_batch_id", batchId);
  await supabase.from("borrower_loans").delete().eq("import_batch_id", batchId);
  await supabase.from("import_batches").update({ status: "rolled_back" }).eq("id", batchId);

  revalidatePath("/admin/import");
  revalidatePath("/portfolio");
  revalidatePath("/loans");
  revalidatePath("/admin");
}
