"use client";

import posthog from "posthog-js";

/**
 * Small analytics boundary for conversion events.
 *
 * The browser SDK is initialized in instrumentation-client.ts. Local debug
 * mode logs the exact payload without sending it unless localhost capture is
 * explicitly enabled.
 */

function enabled(): boolean {
  return typeof window !== "undefined" && !!posthog.__loaded;
}

function debug(event: string, properties?: Record<string, unknown>) {
  if (process.env.NEXT_PUBLIC_POSTHOG_DEBUG === "true") {
    console.info(`[analytics] ${event}`, properties ?? {});
  }
}

export function track(event: string, properties?: Record<string, unknown>) {
  debug(event, properties);
  if (!enabled()) return;
  posthog.capture(event, properties);
}
