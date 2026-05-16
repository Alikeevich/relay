import { ImageResponse } from "next/og";
import { Aurora, BG, ACCENT, ACCENT_2 } from "../_shared";

export const runtime = "edge";

const SIZE = 1024;

/**
 * Square avatar — pure R monogram on a dark rounded canvas with subtle
 * aurora glow. Use as profile picture on X / GitHub / npm / IndieHackers.
 *
 * NOTE: satori (next/og engine) does NOT support `conic-gradient` or
 * `filter: blur` reliably. We fake the glowing border with a stacked
 * linear-gradient "outer" + dark "inner" card, and add ambient depth via
 * `boxShadow` which is fully supported.
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
          background: BG,
          position: "relative",
        }}
      >
        <Aurora intensity={0.7} />

        {/* Gradient border ring — outer */}
        <div
          style={{
            width: 840,
            height: 840,
            borderRadius: 220,
            background:
              "linear-gradient(135deg, #a78bfa 0%, #22d3ee 50%, #f472b6 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 6,
            boxShadow: "0 60px 160px -40px rgba(167,139,250,0.6)",
            position: "relative",
          }}
        >
          {/* Inner dark card */}
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 216,
              background: "#0a0a0c",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Subtle inner glow */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                background:
                  "radial-gradient(60% 60% at 50% 40%, rgba(167,139,250,0.18) 0%, transparent 65%)",
              }}
            />

            {/* R mark — large */}
            <svg
              width={520}
              height={520}
              viewBox="0 0 32 32"
              style={{ position: "relative" }}
            >
              <defs>
                <linearGradient
                  id="rmg-big"
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
                fill="url(#rmg-big)"
              />
            </svg>
          </div>
        </div>
      </div>
    ),
    {
      width: SIZE,
      height: SIZE,
    },
  );
}
