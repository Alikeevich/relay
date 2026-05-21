import type { Metadata } from "next";
import { Bricolage_Grotesque, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "./components/SmoothScroll";

// Body sans — variable, slightly editorial, deliberately NOT Geist/Inter
// (which read as v0/Vercel template fonts in 2026).
const bricolage = Bricolage_Grotesque({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

// Editorial accent — Fraunces italic on a handful of words. Replaces the
// Instrument Serif trick that every v0-generated landing now uses.
// Variable axes (opsz / SOFT) require omitting the weight array.
const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
  display: "swap",
});

// Mono — JetBrains Mono is widely associated with serious developer tools
// (JetBrains IDEs, GitHub Codespaces) rather than AI templates.
const jbMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://relay-sdk.vercel.app");

export const metadata: Metadata = {
  title: "Relay — Reliable LLM API delivery",
  description:
    "Auto retry, provider failover and smart caching for LLM API calls. One import keeps your agents up when Anthropic and OpenAI don't.",
  metadataBase: new URL(BASE_URL),
  openGraph: {
    title: "Relay — Reliable LLM API delivery",
    description:
      "Stop rewriting retry-and-failover. Import this instead — your AI calls survive provider outages.",
    type: "website",
    images: [
      {
        url: "/api/og/logo",
        width: 1200,
        height: 630,
        alt: "Relay — Reliable LLM API delivery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Relay — Reliable LLM API delivery",
    description:
      "Stop rewriting retry-and-failover. Import this instead — your AI calls survive provider outages.",
    images: ["/api/og/logo"],
    creator: "@AlikhanKenzh",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${fraunces.variable} ${jbMono.variable}`}
    >
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
