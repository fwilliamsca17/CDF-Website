import posthog from "posthog-js";

// NEXT_PUBLIC_* values are inlined into this module at build time — if env
// vars change in Vercel, this file must recompile (cache-busted) to pick
// them up.
const projectToken =
  process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN ??
  process.env.NEXT_PUBLIC_POSTHOG_KEY;
const debug = process.env.NEXT_PUBLIC_POSTHOG_DEBUG === "true";
const captureLocalhost =
  process.env.NEXT_PUBLIC_POSTHOG_CAPTURE_LOCALHOST === "true";
const isLocalhost =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

// Local development is console-only unless explicitly enabled. This keeps
// test sessions out of production funnels while still making event wiring
// visible to developers and browser automation.
if (projectToken && (!isLocalhost || captureLocalhost)) {
  posthog.init(projectToken, {
    // Browser traffic always goes through the first-party /ingest proxy;
    // NEXT_PUBLIC_POSTHOG_HOST is the instance behind it (see next.config.mjs).
    api_host: "/ingest",
    ui_host:
      process.env.NEXT_PUBLIC_POSTHOG_HOST?.replace(/\/+$/, "") ||
      "https://us.posthog.com",
    defaults: "2026-05-30",
    capture_pageleave: true,
    person_profiles: "identified_only",
    // Keep replay off until the approved privacy policy discloses it and the
    // distress funnel has comprehensive text masking. Event analytics remain
    // enabled and must never contain PII.
    disable_session_recording: true,
    loaded: (client) => {
      client.register({
        environment:
          process.env.NEXT_PUBLIC_POSTHOG_ENVIRONMENT ??
          (isLocalhost ? "local" : "production"),
      });
      if (debug) client.debug();
    },
  });
} else if (debug) {
  console.info(
    "[analytics] PostHog network capture disabled; events will log locally."
  );
}
