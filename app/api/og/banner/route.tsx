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

const WIDTH = 1500;
const HEIGHT = 500;

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: BG,
          color: FG,
          fontFamily: SYSTEM_SANS,
          position: "relative",
        }}
      >
        <Aurora intensity={0.9} />
        <GridDots />

        {/* Top edge fade for depth */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "linear-gradient(180deg, rgba(5,5,5,0.0) 0%, rgba(5,5,5,0.0) 65%, rgba(5,5,5,0.7) 100%)",
          }}
        />

        {/* Status pill — top-right */}
        <div
          style={{
            position: "absolute",
            top: 36,
            right: 56,
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 18px",
            borderRadius: 999,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            fontSize: 18,
            color: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#34d399",
              boxShadow: "0 0 12px rgba(52,211,153,0.8)",
            }}
          />
          Building in public · 2026
        </div>

        {/* Main content row */}
        <div
          style={{
            position: "relative",
            display: "flex",
            width: "100%",
            padding: "0 90px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Left — brand text */}
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 800 }}>
            <div
              style={{
                fontSize: 22,
                fontWeight: 500,
                color: "rgba(255,255,255,0.55)",
                letterSpacing: 6,
                textTransform: "uppercase",
                marginBottom: 18,
              }}
            >
              Relay
            </div>
            <div
              style={{
                fontSize: 96,
                fontWeight: 500,
                color: FG,
                letterSpacing: -3,
                lineHeight: 1.02,
              }}
            >
              Your AI agents
            </div>
            <div
              style={{
                fontSize: 96,
                fontWeight: 500,
                lineHeight: 1.02,
                letterSpacing: -3,
                display: "flex",
              }}
            >
              <span style={{ color: FG }}>never go&nbsp;</span>
              <span
                style={{
                  fontStyle: "italic",
                  backgroundImage: "linear-gradient(135deg, #a78bfa, #22d3ee)",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                down.
              </span>
            </div>
            <div
              style={{
                marginTop: 26,
                fontSize: 26,
                color: "rgba(255,255,255,0.55)",
                fontFamily: SYSTEM_MONO,
              }}
            >
              auto retry · failover · caching · one line of code
            </div>
          </div>

          {/* Right — R monogram */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 18,
            }}
          >
            <RMark size={260} />
          </div>
        </div>

        {/* Bottom-left — handle */}
        <div
          style={{
            position: "absolute",
            bottom: 30,
            left: 90,
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 20,
            color: "rgba(255,255,255,0.4)",
          }}
        >
          @AlikhanKenzh
        </div>
      </div>
    ),
    {
      width: WIDTH,
      height: HEIGHT,
    },
  );
}
