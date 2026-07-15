"use client";

import { useState } from "react";
import { track, identifyLead } from "@/lib/analytics";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = "09f80e34-62a3-4fc0-9773-ff3f8f0683e2";

/**
 * Shared submit logic for every lead-capture form on the site.
 *
 * Leads are revenue: a failed POST must never strand the visitor on a
 * silent, unchanged form. Callers render an error fallback (call / email)
 * whenever `error` is true, and disable the submit button while
 * `submitting` is true so double-clicks don't double-send.
 */
export function useLeadForm(extraFields?: Record<string, string>) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("access_key", WEB3FORMS_ACCESS_KEY);
    for (const [k, v] of Object.entries(extraFields ?? {})) {
      data.append(k, v);
    }

    setSubmitting(true);
    setError(false);
    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        body: data,
      });
      if (!res.ok) throw new Error(`Web3Forms responded ${res.status}`);
      const email = data.get("email");
      if (typeof email === "string" && email) identifyLead(email);
      track("lead_form_submitted", {
        page: window.location.pathname,
        subject: extraFields?.subject,
      });
      setSubmitted(true);
      form.reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      track("lead_form_error", { page: window.location.pathname });
      setError(true);
    } finally {
      setSubmitting(false);
    }
  }

  return { submitted, submitting, error, handleSubmit };
}
