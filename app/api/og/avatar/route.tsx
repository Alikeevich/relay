import { ImageResponse } from "next/og";
import { ACCENT, ACCENT_2 } from "../_shared";

export const runtime = "edge";

const SIZE = 1024;

/**
 * Square avatar — just the R monogram on a dark canvas.
 *
 * Designed to read well as both a SQUARE (GitHub, npm) and a CIRCLE
 * (X auto-crops): the mark is dead-center, and the only visual flair is a
 * subtle radial fade behind it that survives circular cropping.
 *
 * No outer border, no conic ring, no rainbow glow.
 */
export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#050505",
          position: "relative",
        }}
      >
        {/* Soft centre glow — only visible if you look. */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "radial-gradient(45% 45% at 50% 50%, rgba(167,139,250,0.16) 0%, rgba(34,211,238,0.05) 45%, transparent 75%)",
          }}
        />

        {/* R mark — large, centred. */}
        <svg
          width={620}
          height={620}
          viewBox="0 0 32 32"
          style={{ position: "relative" }}
        >
          <defs>
            <linearGradient
              id="rmg-avatar"
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
            fill="url(#rmg-avatar)"
          />
        </svg>
      </div>
    ),
    {
      width: SIZE,
      height: SIZE,
    },
  );
}
