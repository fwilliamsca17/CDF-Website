"use client";
import { useState } from "react";
import { submitAccessRequest } from "./actions";

export default function AccessRequestForm() {
  const [state, setState] = useState<{ ok: boolean; msg: string } | null>(null);
  const [busy, setBusy] = useState(false);

  async function action(formData: FormData) {
    setBusy(true);
    const result = await submitAccessRequest(formData);
    setBusy(false);
    setState(result);
  }

  if (state?.ok) {
    return (
      <div
        role="status"
        className="bg-ink-900 border border-champagne-700/30 rounded-lg p-8 text-lg text-ivory"
      >
        <h2 className="text-heading font-heading mb-3">Thank you.</h2>
        <p>{state.msg}</p>
      </div>
    );
  }

  return (
    <form
      action={action}
      className="bg-ink-900 border border-champagne-700/30 rounded-lg p-8 space-y-4 text-ivory"
      noValidate
    >
      <h2 className="text-heading font-heading">Request access</h2>
      <p className="text-base text-ivory/80">
        Tell us a bit about yourself. This is a request to talk —
        not an investment commitment.
      </p>
      {state && !state.ok && (
        <p role="alert" className="text-red-300">{state.msg}</p>
      )}
      <label className="block">
        <span className="block text-base mb-1">Full name</span>
        <input
          name="full_name"
          required
          autoComplete="name"
          className="w-full text-lg bg-ink-950 border border-champagne-700/40 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-champagne-400"
        />
      </label>
      <label className="block">
        <span className="block text-base mb-1">Email</span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          className="w-full text-lg bg-ink-950 border border-champagne-700/40 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-champagne-400"
        />
      </label>
      <label className="block">
        <span className="block text-base mb-1">Phone (optional)</span>
        <input
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          className="w-full text-lg bg-ink-950 border border-champagne-700/40 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-champagne-400"
        />
      </label>
      <fieldset className="block">
        <legend className="block text-base mb-2">How do you plan to invest?</legend>
        <div className="space-y-2 text-base">
          {[
            ["personal", "Personally / jointly"],
            ["ira", "Self-directed IRA"],
            ["solo_401k", "Solo 401(k)"],
            ["multiple", "More than one of the above"],
            ["unsure", "Not sure yet"],
          ].map(([v, l]) => (
            <label key={v} className="flex items-center gap-2">
              <input
                type="radio"
                name="how_they_invest"
                value={v}
                className="w-4 h-4 text-champagne-500"
              />
              {l}
            </label>
          ))}
        </div>
      </fieldset>
      <label className="block">
        <span className="block text-base mb-1">Anything we should know? (optional)</span>
        <textarea
          name="message"
          rows={3}
          className="w-full text-lg bg-ink-950 border border-champagne-700/40 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-champagne-400"
        />
      </label>
      <button
        type="submit"
        disabled={busy}
        className="w-full text-lg bg-champagne-500 hover:bg-champagne-400 text-ink-900 font-semibold rounded px-4 py-3 disabled:opacity-50"
      >
        {busy ? "Sending…" : "Request access"}
      </button>
    </form>
  );
}
