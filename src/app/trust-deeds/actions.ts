"use server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const SUCCESS_MSG =
  "We received your request. A principal will reach out shortly. If we don't connect within one business day, please call us directly.";

export async function submitAccessRequest(formData: FormData) {
  const full_name = String(formData.get("full_name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim() || null;
  const how_they_invest = String(formData.get("how_they_invest") ?? "").trim() || null;
  const message = String(formData.get("message") ?? "").trim() || null;

  if (!full_name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, msg: "Please enter your name and a valid email." };
  }
  if (full_name.length > 200 || (message?.length ?? 0) > 2000) {
    return { ok: false, msg: "Please shorten your entries and try again." };
  }

  const supabase = await createSupabaseServerClient();
  // anon role is permitted to INSERT only.
  const { error } = await supabase.from("access_requests").insert({
    full_name,
    email,
    phone,
    how_they_invest,
    message,
    source: "public-trust-deeds",
  });
  if (error) {
    return {
      ok: false,
      msg: "Something went wrong on our end. Please call us at (818) 646-9948 — we'll take it down personally.",
    };
  }
  return { ok: true, msg: SUCCESS_MSG };
}
