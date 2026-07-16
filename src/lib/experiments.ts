"use client";

import { useEffect, useState } from "react";
import posthog from "posthog-js";

/**
 * A/B experiment variants via PostHog feature flags.
 *
 * Reading the flag with getFeatureFlag() is what records the exposure
 * event ($feature_flag_called) — PostHog experiment results are computed
 * against exposed users only, so never branch on a variant without going
 * through this hook.
 *
 * Returns "control" until flags load, and forever when analytics is
 * disabled (no token, localhost, opt-out) — the page must render a
 * complete control experience with zero PostHog dependency.
 */
export function useExperiment(flagKey: string): string {
  const [variant, setVariant] = useState("control");

  useEffect(() => {
    if (!posthog.__loaded) return;
    const unsubscribe = posthog.onFeatureFlags(() => {
      const value = posthog.getFeatureFlag(flagKey);
      if (typeof value === "string") setVariant(value);
    });
    return unsubscribe;
  }, [flagKey]);

  return variant;
}
