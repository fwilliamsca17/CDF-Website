/**
 * Display helpers. Money/percent always shown with tabular numerals
 * (font-feature-settings: 'tnum'). Never compute derived figures;
 * format only what the database returned.
 */
export function money(n: number | string | null | undefined, opts?: { cents?: boolean }) {
  if (n === null || n === undefined) return "—";
  const v = typeof n === "string" ? Number(n) : n;
  if (!isFinite(v)) return "—";
  return v.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: opts?.cents ? 2 : 0,
    maximumFractionDigits: opts?.cents ? 2 : 0,
  });
}

export function pct(n: number | string | null | undefined, digits = 2) {
  if (n === null || n === undefined) return "—";
  const v = typeof n === "string" ? Number(n) : n;
  if (!isFinite(v)) return "—";
  return v.toFixed(digits) + "%";
}

export function shortDate(d: string | Date | null | undefined) {
  if (!d) return "—";
  const dt = typeof d === "string" ? new Date(d) : d;
  return dt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function lienPositionLabel(n: number | null | undefined) {
  if (n === 1) return "1st";
  if (n === 2) return "2nd";
  if (n === 3) return "3rd";
  return "—";
}

export function listingStatusLabel(s: string | null | undefined) {
  switch (s) {
    case "available":
      return "Available";
    case "partially_placed":
      return "Partially placed";
    case "pending":
      return "Pending";
    case "funded":
      return "Funded";
    default:
      return "—";
  }
}

export function custodianLabel(c: string | null | undefined) {
  switch (c) {
    case "forge_trust":
      return "Forge Trust";
    case "provident_trust_group":
      return "Provident Trust Group";
    case "entrust_group":
      return "The Entrust Group";
    case "other_self_directed":
      return "Self-directed (other)";
    default:
      return "Personal";
  }
}

export function accountTypeLabel(t: string | null | undefined) {
  switch (t) {
    case "individual":
      return "Personal";
    case "joint":
      return "Joint";
    case "trust":
      return "Trust";
    case "entity":
      return "Entity";
    case "sdira":
      return "Self-directed IRA";
    case "solo_401k":
      return "Solo 401(k)";
    default:
      return t ?? "—";
  }
}
