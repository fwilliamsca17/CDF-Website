"use client";
import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/browser";

export default function LoginForm({ next }: { next?: string }) {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [phase, setPhase] = useState<"request" | "code">("request");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function sendCode(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    const { error } = await supabaseBrowser().auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback${
          next ? `?next=${encodeURIComponent(next)}` : ""
        }`,
        shouldCreateUser: false,
      },
    });
    setBusy(false);
    if (error) {
      // Generic — never confirm account existence.
      setMsg(
        "If that email is on file, a sign-in link and code are on their way."
      );
      setPhase("code");
      return;
    }
    setMsg(
      "Check your email. Click the link OR type the 6-digit code below."
    );
    setPhase("code");
  }

  async function verifyCode(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    const { error } = await supabaseBrowser().auth.verifyOtp({
      email: email.trim(),
      token: otp.trim(),
      type: "email",
    });
    setBusy(false);
    if (error) {
      setErr("That code didn't work. Try the link in your email or request a new code.");
      return;
    }
    window.location.assign(next || "/dashboard");
  }

  if (phase === "request") {
    return (
      <form onSubmit={sendCode} className="space-y-4" noValidate>
        <label className="block">
          <span className="block text-base mb-2">Email</span>
          <input
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full text-lg bg-ink-950 border border-champagne-700/40 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-champagne-400"
          />
        </label>
        <button
          type="submit"
          disabled={busy || !email}
          className="w-full text-lg bg-champagne-500 hover:bg-champagne-400 text-ink-900 font-semibold rounded px-4 py-3 disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-champagne-200"
        >
          {busy ? "Sending…" : "Email me a sign-in link"}
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={verifyCode} className="space-y-4" noValidate>
      {msg && <p className="text-base text-ivory/90">{msg}</p>}
      <label className="block">
        <span className="block text-base mb-2">6-digit code</span>
        <input
          type="text"
          required
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete="one-time-code"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
          className="w-full text-2xl tracking-[0.5em] text-center bg-ink-950 border border-champagne-700/40 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-champagne-400"
          style={{ fontFeatureSettings: '"tnum"' }}
        />
      </label>
      {err && <p role="alert" className="text-red-300">{err}</p>}
      <button
        type="submit"
        disabled={busy || otp.length !== 6}
        className="w-full text-lg bg-champagne-500 hover:bg-champagne-400 text-ink-900 font-semibold rounded px-4 py-3 disabled:opacity-50"
      >
        {busy ? "Verifying…" : "Sign in"}
      </button>
      <button
        type="button"
        onClick={() => {
          setPhase("request");
          setOtp("");
          setMsg(null);
        }}
        className="w-full text-sm text-ivory/70 underline"
      >
        Use a different email
      </button>
    </form>
  );
}
