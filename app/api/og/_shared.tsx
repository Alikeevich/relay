/**
 * Shared visual primitives for OG / branding images.
 *
 * The Aurora background, RMark and palette are reused across:
 *  - /api/og/banner   (X header, 1500x500)
 *  - /api/og/avatar   (square logo, 1024x1024)
 *  - /api/og/logo     (wordmark, 1200x630)
 */

import type { ReactElement } from "react";

export const BG = "#050505";
export const FG = "#f5f5f7";
export const ACCENT = "#a78bfa";
export const ACCENT_2 = "#22d3ee";
export const ACCENT_3 = "#f472b6";

/**
 * Aurora glow that fills its parent. Pass `intensity` 0..1 to fade overall.
 */
export function Aurora({ intensity = 1 }: { intensity?: number }): ReactElement {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        background: `
          radial-gradient(60% 60% at 18% 38%, rgba(167, 139, 250, ${0.55 * intensity}) 0%, transparent 60%),
          radial-gradient(55% 55% at 82% 20%, rgba(34, 211, 238, ${0.5 * intensity}) 0%, transparent 60%),
          radial-gradient(55% 55% at 65% 88%, rgba(244, 114, 182, ${0.4 * intensity}) 0%, transparent 65%)
        `,
      }}
    />
  );
}

/**
 * Dotted grid overlay. Subtle, gives the dark canvas texture.
 */
export function GridDots(): ReactElement {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        backgroundImage:
          "radial-gradient(rgba(255,255,255,0.07) 1.4px, transparent 1.4px)",
        backgroundSize: "32px 32px",
      }}
    />
  );
}

/**
 * The R-monogram on a rounded dark card. `size` is the OUTER edge of the
 * card; the mark inside scales proportionally.
 */
export function RMark({
  size,
  radius,
  showCard = true,
}: {
  size: number;
  radius?: number;
  showCard?: boolean;
}): ReactElement {
  const markSize = Math.round(size * 0.62);
  const card = showCard ? (
    <div
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: radius ?? Math.round(size * 0.22),
        background: "#0a0a0c",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 30px 80px -30px rgba(167,139,250,0.45)",
      }}
    />
  ) : null;

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {card}
      <svg
        width={markSize}
        height={markSize}
        viewBox="0 0 32 32"
        style={{ position: "relative" }}
      >
        <defs>
          <linearGradient
            id="rmg"
            x1="0"
            y1="0"
            x2="32"
            y2="32"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={ACCENT} />
            <stop offset="1" stopColor={ACCENT_2} />
          </linearGradient>
        </defs>
        <path
          d="M6 9c0-1.66 1.34-3 3-3h11a6 6 0 0 1 0 12h-3l5 8h-5l-5-8H10v8H6V9Zm4 5h9a2 2 0 0 0 0-4h-9v4Z"
          fill="url(#rmg)"
        />
      </svg>
    </div>
  );
}

export const SYSTEM_SANS =
  '"Geist", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif';
export const SYSTEM_MONO =
  '"Geist Mono", "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace';
