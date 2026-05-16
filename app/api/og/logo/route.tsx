import { ImageResponse } from "next/og";
import {
  Aurora,
  GridDots,
  RMark,
  BG,
  FG,
  SYSTEM_SANS,
  SYSTEM_MONO,
} from "../_shared";

export const runtime = "edge";

const WIDTH = 1200;
const HEIGHT = 630;

/**
 * 1200x630 wordmark / OG card.
 *
 * Doubles as:
 *  - The default Open Graph image for the landing (set in app/layout.tsx)
 *  - A hero / press image when you need a portrait-ish brand asset
 */
export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: BG,
          color: FG,
          fontFamily: SYSTEM_SANS,
          position: "relative",
        }}
      >
        <Aurora intensity={0.9} />
        <GridDots />

        {/* Mark + Wordmark row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 36,
            position: "relative",
          }}
        >
          <RMark size={170} />
          <div
            style={{
              fontSize: 156,
              fontWeight: 500,
              letterSpacing: -5,
              lineHeight: 1,
            }}
          >
            Relay
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            marginTop: 36,
            fontSize: 36,
            color: "rgba(255,255,255,0.7)",
            position: "relative",
            display: "flex",
            textAlign: "center",
            maxWidth: 900,
          }}
        >
          Reliable delivery layer for LLM APIs.
        </div>

        {/* Subtag with mono accents */}
        <div
          style={{
            marginTop: 20,
            fontSize: 24,
            fontFamily: SYSTEM_MONO,
            color: "rgba(255,255,255,0.45)",
            position: "relative",
            display: "flex",
            gap: 16,
          }}
        >
          <span>retry</span>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
          <span>failover</span>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
          <span>caching</span>
        </div>

        {/* Bottom credit */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 18,
            color: "rgba(255,255,255,0.35)",
            fontFamily: SYSTEM_MONO,
          }}
        >
          <span>npm install @relay-api/sdk</span>
        </div>
      </div>
    ),
    {
      width: WIDTH,
      height: HEIGHT,
    },
  );
}
