export type SyntheticTmoRow =
  | {
      record_type: "investor_position";
      tmo_investor_ref: string;
      account_id?: string;
      loan_ref: string;
      ownership_pct: number | null;
      invested_principal: number;
      current_balance: number;
      rate_pct: number;
      status: string | null;
    }
  | {
      record_type: "investor_transaction";
      tmo_investor_ref: string;
      account_id?: string;
      loan_ref: string;
      tx_date: string;
      tx_type: string;
      amount: number;
      running_balance: number | null;
    }
  | {
      record_type: "borrower_loan";
      tmo_borrower_ref: string;
      borrower_id?: string;
      loan_ref: string;
      property_address: string;
      original_amount: number;
      current_principal: number;
      rate_pct: number;
      payment_amount: number | null;
      next_due_date: string | null;
      maturity_date: string | null;
      status: string | null;
    }
  | {
      record_type: "borrower_transaction";
      loan_ref: string;
      tx_date: string;
      tx_type: string;
      amount: number;
      applied_interest: number | null;
      applied_principal: number | null;
      applied_fees: number | null;
      running_balance: number | null;
    };

export type SyntheticTmoValidation = {
  format: "cdf-phase0-synthetic-tmo-v1";
  rowCount: number;
  rows: SyntheticTmoRow[];
  errors: string[];
  warnings: string[];
  duplicateKeys: string[];
};

export const SYNTHETIC_TMO_COLUMNS = [
  "record_type",
  "tmo_investor_ref",
  "tmo_borrower_ref",
  "loan_ref",
  "tx_date",
  "tx_type",
  "ownership_pct",
  "invested_principal",
  "current_balance",
  "rate_pct",
  "status",
  "property_address",
  "original_amount",
  "current_principal",
  "payment_amount",
  "next_due_date",
  "maturity_date",
  "amount",
  "applied_interest",
  "applied_principal",
  "applied_fees",
  "running_balance",
] as const;

type KnownRefs = {
  investorRefs: Map<string, string>;
  borrowerRefs: Map<string, string>;
  borrowerLoanRefs: Set<string>;
  existingInvestorTxKeys: Set<string>;
  existingBorrowerTxKeys: Set<string>;
};

type SyntheticTmoTemplateValue = string | number | null | undefined;
type SyntheticTmoTemplateRow = Partial<
  Record<(typeof SYNTHETIC_TMO_COLUMNS)[number], SyntheticTmoTemplateValue>
>;

function parseCsv(text: string) {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    const next = text[i + 1];
    if (ch === '"' && inQuotes && next === '"') {
      cell += '"';
      i += 1;
    } else if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === "," && !inQuotes) {
      row.push(cell.trim());
      cell = "";
    } else if ((ch === "\n" || ch === "\r") && !inQuotes) {
      if (ch === "\r" && next === "\n") i += 1;
      row.push(cell.trim());
      if (row.some(Boolean)) rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += ch;
    }
  }

  row.push(cell.trim());
  if (row.some(Boolean)) rows.push(row);
  return rows;
}

function num(
  raw: string | undefined,
  field: string,
  line: number,
  errors: string[],
  opts?: { required?: boolean; allowNegative?: boolean },
) {
  const text = (raw ?? "").replace(/[$,%]/g, "").trim();
  if (!text) {
    if (opts?.required) errors.push(`Line ${line}: ${field} is required`);
    return null;
  }
  const n = Number(text);
  if (!Number.isFinite(n)) {
    errors.push(`Line ${line}: ${field} must be numeric`);
    return null;
  }
  if (!opts?.allowNegative && n < 0) {
    errors.push(`Line ${line}: ${field} cannot be negative`);
  }
  return n;
}

function date(raw: string | undefined, field: string, line: number, errors: string[], required = false) {
  const text = (raw ?? "").trim();
  if (!text) {
    if (required) errors.push(`Line ${line}: ${field} is required`);
    return null;
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(text) || Number.isNaN(Date.parse(text))) {
    errors.push(`Line ${line}: ${field} must be YYYY-MM-DD`);
  }
  return text;
}

function txType(raw: string | undefined, line: number, errors: string[]) {
  const text = (raw ?? "").trim();
  if (!["interest", "principal", "late_charge", "fee", "other"].includes(text)) {
    errors.push(`Line ${line}: tx_type must be interest, principal, late_charge, fee, or other`);
  }
  return text || "other";
}

export function validateSyntheticTmoCsv(text: string, refs: KnownRefs): SyntheticTmoValidation {
  const parsed = parseCsv(text);
  const errors: string[] = [];
  const warnings: string[] = [];
  const duplicateKeys: string[] = [];
  const rows: SyntheticTmoRow[] = [];
  const seen = new Set<string>();

  if (parsed.length < 2) {
    return {
      format: "cdf-phase0-synthetic-tmo-v1",
      rowCount: 0,
      rows: [],
      errors: ["CSV must include a header row and at least one data row"],
      warnings: [],
      duplicateKeys: [],
    };
  }

  const headers = parsed[0].map((h) => h.trim());
  const index = new Map(headers.map((h, i) => [h, i]));
  for (const col of ["record_type", "loan_ref"]) {
    if (!index.has(col)) errors.push(`Header is missing ${col}`);
  }

  const get = (data: string[], field: string) => data[index.get(field) ?? -1] ?? "";
  const uploadLoanRefs = new Set<string>();

  parsed.slice(1).forEach((data, idx) => {
    const line = idx + 2;
    const type = get(data, "record_type") as SyntheticTmoRow["record_type"];
    const loan_ref = get(data, "loan_ref");

    if (!loan_ref) errors.push(`Line ${line}: loan_ref is required`);

    if (type === "investor_position") {
      const ref = get(data, "tmo_investor_ref");
      const account_id = refs.investorRefs.get(ref);
      if (!account_id) errors.push(`Line ${line}: unknown tmo_investor_ref ${ref || "(blank)"}`);
      const key = `position:${ref}:${loan_ref}`;
      if (seen.has(key)) duplicateKeys.push(key);
      seen.add(key);
      rows.push({
        record_type: type,
        tmo_investor_ref: ref,
        account_id,
        loan_ref,
        ownership_pct: num(get(data, "ownership_pct"), "ownership_pct", line, errors),
        invested_principal: num(get(data, "invested_principal"), "invested_principal", line, errors, { required: true }) ?? 0,
        current_balance: num(get(data, "current_balance"), "current_balance", line, errors, { required: true }) ?? 0,
        rate_pct: num(get(data, "rate_pct"), "rate_pct", line, errors, { required: true }) ?? 0,
        status: get(data, "status") || null,
      });
      return;
    }

    if (type === "investor_transaction") {
      const ref = get(data, "tmo_investor_ref");
      const account_id = refs.investorRefs.get(ref);
      if (!account_id) errors.push(`Line ${line}: unknown tmo_investor_ref ${ref || "(blank)"}`);
      const amount = num(get(data, "amount"), "amount", line, errors, { required: true }) ?? 0;
      const key = `investor_tx:${ref}:${loan_ref}:${get(data, "tx_date")}:${get(data, "tx_type")}:${amount}`;
      if (seen.has(key) || refs.existingInvestorTxKeys.has(key)) duplicateKeys.push(key);
      seen.add(key);
      rows.push({
        record_type: type,
        tmo_investor_ref: ref,
        account_id,
        loan_ref,
        tx_date: date(get(data, "tx_date"), "tx_date", line, errors, true) ?? "",
        tx_type: txType(get(data, "tx_type"), line, errors),
        amount,
        running_balance: num(get(data, "running_balance"), "running_balance", line, errors),
      });
      return;
    }

    if (type === "borrower_loan") {
      const ref = get(data, "tmo_borrower_ref");
      const borrower_id = refs.borrowerRefs.get(ref);
      if (!borrower_id) errors.push(`Line ${line}: unknown tmo_borrower_ref ${ref || "(blank)"}`);
      if (uploadLoanRefs.has(loan_ref)) duplicateKeys.push(`borrower_loan:${loan_ref}`);
      uploadLoanRefs.add(loan_ref);
      rows.push({
        record_type: type,
        tmo_borrower_ref: ref,
        borrower_id,
        loan_ref,
        property_address: get(data, "property_address"),
        original_amount: num(get(data, "original_amount"), "original_amount", line, errors, { required: true }) ?? 0,
        current_principal: num(get(data, "current_principal"), "current_principal", line, errors, { required: true }) ?? 0,
        rate_pct: num(get(data, "rate_pct"), "rate_pct", line, errors, { required: true }) ?? 0,
        payment_amount: num(get(data, "payment_amount"), "payment_amount", line, errors),
        next_due_date: date(get(data, "next_due_date"), "next_due_date", line, errors),
        maturity_date: date(get(data, "maturity_date"), "maturity_date", line, errors),
        status: get(data, "status") || null,
      });
      if (!get(data, "property_address")) errors.push(`Line ${line}: property_address is required`);
      return;
    }

    if (type === "borrower_transaction") {
      if (!refs.borrowerLoanRefs.has(loan_ref) && !uploadLoanRefs.has(loan_ref)) {
        errors.push(`Line ${line}: borrower transaction loan_ref ${loan_ref || "(blank)"} is not present in TMO-linked loans`);
      }
      const amount = num(get(data, "amount"), "amount", line, errors, { required: true }) ?? 0;
      const key = `borrower_tx:${loan_ref}:${get(data, "tx_date")}:${get(data, "tx_type")}:${amount}`;
      if (seen.has(key) || refs.existingBorrowerTxKeys.has(key)) duplicateKeys.push(key);
      seen.add(key);
      rows.push({
        record_type: type,
        loan_ref,
        tx_date: date(get(data, "tx_date"), "tx_date", line, errors, true) ?? "",
        tx_type: txType(get(data, "tx_type"), line, errors),
        amount,
        applied_interest: num(get(data, "applied_interest"), "applied_interest", line, errors),
        applied_principal: num(get(data, "applied_principal"), "applied_principal", line, errors),
        applied_fees: num(get(data, "applied_fees"), "applied_fees", line, errors),
        running_balance: num(get(data, "running_balance"), "running_balance", line, errors),
      });
      return;
    }

    errors.push(`Line ${line}: unknown record_type ${type || "(blank)"}`);
  });

  if (duplicateKeys.length) {
    errors.push(`Duplicate transaction/position keys found: ${Array.from(new Set(duplicateKeys)).join("; ")}`);
  }

  if (headers.some((h) => !SYNTHETIC_TMO_COLUMNS.includes(h as (typeof SYNTHETIC_TMO_COLUMNS)[number]))) {
    warnings.push("CSV contains columns outside the Phase 0 synthetic format; they were ignored.");
  }

  return {
    format: "cdf-phase0-synthetic-tmo-v1",
    rowCount: rows.length,
    rows,
    errors,
    warnings,
    duplicateKeys: Array.from(new Set(duplicateKeys)),
  };
}

function csvEscape(value: SyntheticTmoTemplateValue) {
  const text = value === null || value === undefined ? "" : String(value);
  if (/[",\n\r]/.test(text)) return `"${text.replaceAll('"', '""')}"`;
  return text;
}

export function syntheticTmoTemplateCsv() {
  const rows: SyntheticTmoTemplateRow[] = [
    {
      record_type: "investor_position",
      tmo_investor_ref: "SYN-INV-C",
      loan_ref: "SYN-LN-1",
      ownership_pct: 50,
      invested_principal: 150000,
      current_balance: 147500,
      rate_pct: 11,
      status: "current",
    },
    {
      record_type: "investor_transaction",
      tmo_investor_ref: "SYN-INV-C",
      loan_ref: "SYN-LN-1",
      tx_date: "2026-05-31",
      tx_type: "interest",
      amount: 1375,
      running_balance: 147500,
    },
    {
      record_type: "borrower_loan",
      tmo_borrower_ref: "SYN-BOR-1",
      loan_ref: "SYN-LN-1",
      rate_pct: 11,
      status: "current",
      property_address: "456 Sample Ave, Sample City, SAMPLE-DATA 90000",
      original_amount: 300000,
      current_principal: 295000,
      payment_amount: 2750,
      next_due_date: "2026-07-01",
      maturity_date: "2027-12-01",
    },
    {
      record_type: "borrower_transaction",
      loan_ref: "SYN-LN-1",
      tx_date: "2026-05-31",
      tx_type: "interest",
      amount: 2750,
      applied_interest: 2750,
      applied_principal: 0,
      applied_fees: 0,
      running_balance: 295000,
    },
  ];

  return [
    SYNTHETIC_TMO_COLUMNS.join(","),
    ...rows.map((row) => SYNTHETIC_TMO_COLUMNS.map((column) => csvEscape(row[column])).join(",")),
  ].join("\n").concat("\n");
}
