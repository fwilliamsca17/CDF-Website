"use client";

import posthog from "posthog-js";

/**
 * Thin wrappers around posthog-js so call sites never have to check whether
 * analytics is running. PostHog only initializes when
 * NEXT_PUBLIC_POSTHOG_KEY is set (see PostHogProvider) — local dev and
 * preview builds without the key silently no-op instead of logging
 * "PostHog not initialized" warnings on every event.
 */

function enabled(): boolean {
  return typeof window !== "undefined" && !!posthog.__loaded;
}

export function track(event: string, properties?: Record<string, unknown>) {
  if (!enabled()) return;
  posthog.capture(event, properties);
}

/** Ties the visitor's anonymous browsing history to their lead identity. */
export function identifyLead(
  email: string,
  properties?: Record<string, unknown>
) {
  if (!enabled()) return;
  posthog.identify(email.trim().toLowerCase(), properties);
}
