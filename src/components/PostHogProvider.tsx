"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

/**
 * Initializes PostHog analytics for the whole site.
 *
 * - Only runs when NEXT_PUBLIC_POSTHOG_KEY is set, so dev/preview builds
 *   without the key ship zero analytics code paths.
 * - Events go through the /ingest reverse proxy (see next.config.mjs) so
 *   ad-blockers don't drop lead-attribution data.
 * - `defaults: "2025-05-24"` enables automatic pageview capture on App
 *   Router client-side navigations (history changes) — no manual
 *   usePathname wiring needed.
 */
export default function PostHogProvider() {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key || posthog.__loaded) return;

    posthog.init(key, {
      api_host: "/ingest",
      ui_host: "https://us.posthog.com",
      defaults: "2025-05-24",
      capture_pageleave: true,
      // Lead forms carry names/emails/phones — never record raw input text.
      session_recording: {
        maskAllInputs: true,
      },
    });
  }, []);

  return null;
}
