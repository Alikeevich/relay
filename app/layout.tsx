import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "./components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://relay-sdk.vercel.app");

export const metadata: Metadata = {
  title: "Relay — Reliable LLM API Delivery",
  description:
    "One line of code. Auto retry, failover and caching across LLM providers. Your AI agents stay online even when Anthropic and OpenAI don't.",
  metadataBase: new URL(BASE_URL),
  openGraph: {
    title: "Relay — Reliable LLM API Delivery",
    description:
      "Resend for AI agents. Drop-in SDK that keeps your LLM calls flowing across providers.",
    type: "website",
    images: [
      {
        url: "/api/og/logo",
        width: 1200,
        height: 630,
        alt: "Relay — Reliable LLM API Delivery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Relay — Reliable LLM API Delivery",
    description:
      "Drop-in SDK with auto retry, failover and caching. Your AI agents stay up even when providers don't.",
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
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
