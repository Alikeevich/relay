import { ImageResponse } from "next/og";
import { Aurora, BG, ACCENT, ACCENT_2 } from "../_shared";

export const runtime = "edge";

const SIZE = 1024;

/**
 * Square avatar — pure R monogram on a dark rounded canvas with subtle
 * aurora glow. Use as profile picture on X / GitHub / npm / IndieHackers.
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

        {/* Outer card */}
        <div
          style={{
            position: "relative",
            width: 820,
            height: 820,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 200,
            background: "#0a0a0c",
            border: "2px solid rgba(255,255,255,0.08)",
            boxShadow: "0 60px 160px -40px rgba(167,139,250,0.55)",
          }}
        >
          {/* Glowing ring */}
          <div
            style={{
              position: "absolute",
              inset: -2,
              borderRadius: 200,
              display: "flex",
              background:
                "conic-gradient(from 180deg at 50% 50%, rgba(167,139,250,0.0), rgba(167,139,250,0.7), rgba(34,211,238,0.7), rgba(167,139,250,0.0))",
              opacity: 0.6,
              filter: "blur(8px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 200,
              background: "#0a0a0c",
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
    ),
    {
      width: SIZE,
      height: SIZE,
    },
  );
}
