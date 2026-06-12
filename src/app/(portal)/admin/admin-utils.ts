import "server-only";

import { headers } from "next/headers";
import { requireAdmin } from "@/lib/supabase/server";

export async function requireAdminAction() {
  const guard = await requireAdmin();
  if ("redirectTo" in guard) {
    throw new Error("Forbidden");
  }

  const headerStore = await headers();
  const origin = headerStore.get("origin");
  const host = headerStore.get("host");

  if (origin && host) {
    const originHost = new URL(origin).host;
    if (originHost !== host) {
      throw new Error("Invalid request origin");
    }
  }

  return guard;
}

export function asString(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

export function asNullableString(value: FormDataEntryValue | null) {
  const text = asString(value);
  return text ? text : null;
}

export function asNumber(value: FormDataEntryValue | null, field: string) {
  const text = asString(value);
  if (!text) throw new Error(`${field} is required`);
  const n = Number(text.replace(/[$,%]/g, ""));
  if (!Number.isFinite(n)) throw new Error(`${field} must be a number`);
  return n;
}

export function asNullableNumber(value: FormDataEntryValue | null, field: string) {
  const text = asString(value);
  if (!text) return null;
  const n = Number(text.replace(/[$,%]/g, ""));
  if (!Number.isFinite(n)) throw new Error(`${field} must be a number`);
  return n;
}

export function checked(value: FormDataEntryValue | null) {
  return value === "on" || value === "true" || value === "1";
}
