"use client";

import { useEffect, useState } from "react";

const YT_VIDEO_ID = "4xHQQiQBnJk";

/**
 * Deferred background video for the hero.
 *
 * Why this exists: the YouTube iframe pulls ~3 MB of player JS + video streams
 * on first paint, which previously dragged mobile Lighthouse from 94 → 73 and
 * blew out LCP. This component keeps the moving-video aesthetic of the
 * original site WITHOUT putting it on the critical path:
 *
 *   1. Server-rendered hero ships zero video bytes — the AVIF/CSS atmosphere
 *      remains the LCP element and paints instantly.
 *   2. On mount, after the page is interactive, we requestIdleCallback() the
 *      iframe injection (~1.5 s typical). The user sees the static nocturne
 *      first, then the video life fades in underneath the existing overlays.
 *   3. Respects prefers-reduced-motion and the Save-Data / 2G connection
 *      hints — those users keep the static composition.
 *
 * The video sits BELOW hero-glow / hero-grain / hero-vignette in the DOM
 * order, so all three overlays continue to tint and grain the video,
 * preserving the champagne / navy nocturne palette over any frame.
 */
export default function HeroVideo() {
  const [show, setShow] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // A11y: leave the still composition alone for reduced-motion users.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Respect Save-Data / very slow connections (mobile-friendly default).
    interface NetworkInformation {
      saveData?: boolean;
      effectiveType?: string;
    }
    const conn = (
      navigator as Navigator & { connection?: NetworkInformation }
    ).connection;
    if (conn?.saveData) return;
    if (conn?.effectiveType && /^(slow-2g|2g)$/.test(conn.effectiveType)) return;

    // Defer the iframe injection so it never competes for the main thread
    // during initial render. Fallback to setTimeout where rIC isn't available
    // (older Safari). Runtime feature-check, not type-asserted, so older
    // engines don't crash.
    const hasRIC =
      typeof (window as { requestIdleCallback?: unknown }).requestIdleCallback ===
      "function";

    let timeoutHandle: number | undefined;
    let idleHandle: number | undefined;

    if (hasRIC) {
      idleHandle = window.requestIdleCallback(() => setShow(true), {
        timeout: 2500,
      });
    } else {
      timeoutHandle = window.setTimeout(() => setShow(true), 1500);
    }

    return () => {
      if (idleHandle !== undefined) window.cancelIdleCallback(idleHandle);
      if (timeoutHandle !== undefined) window.clearTimeout(timeoutHandle);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${YT_VIDEO_ID}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1&playlist=${YT_VIDEO_ID}&playsinline=1&disablekb=1`}
        title=""
        loading="lazy"
        allow="autoplay; encrypted-media; picture-in-picture"
        onLoad={() => setLoaded(true)}
        className={`absolute left-1/2 h-[220%] w-[220%] min-h-[140%] min-w-[140%] -translate-x-1/2 border-0 transition-opacity duration-[1200ms] ease-out ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        // Anchor the visible window further DOWN inside the iframe so the
        // upper-third of the video frame (where subjects' heads sit) is
        // preserved, and the dead-air at the bottom is what gets cropped.
        // Combined with the 220% scale, any YouTube chrome lives off-screen.
        style={{ aspectRatio: "16/9", top: "-30%" }}
        tabIndex={-1}
      />
      {/* Top fade — masks any YouTube title-bar / chrome flash and blends the
          top edge of the video into the nocturne navy. */}
      <div className="absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,rgb(8,11,26)_0%,rgba(8,11,26,0)_100%)]" />
      {/* Tint scrim — keeps the champagne nocturne tone dominant over any
          single video frame, and matches the existing hero-atmosphere depth. */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,11,26,0.55)_0%,rgba(8,11,26,0.35)_45%,rgba(8,11,26,0.78)_100%)]" />
    </div>
  );
}
