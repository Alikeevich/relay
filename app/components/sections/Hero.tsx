"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { LiveLog } from "../ui/LiveLog";
import { NpmCopy } from "../ui/NpmCopy";

// Eagle owl mascot — serious, sharp, head-on portrait by Jevgeni Fil on
// Unsplash. Chosen for the watchful-but-unflinching feel that matches
// "your agents never go down". Hot-linked via remotePatterns in
// next.config.ts. To swap: drop your own jpg into public/brand/mascot.jpg
// and replace this URL.
const MASCOT_URL =
  "https://images.unsplash.com/photo-1672079743723-ac70610b6978?auto=format&fit=crop&w=1800&q=85";

/**
 * Editorial hero — full-bleed photographic mascot behind dual-column
 * type + a live log stream. The photo is treated to black-and-white,
 * lowered exposure, with brand chroma bloom on top so it feels like a
 * darkroom print under a stage light, not an AI-generated splash.
 */
export function Hero() {
  return (
    <section className="relative isolate min-h-[100dvh] overflow-hidden border-b border-border">
      {/* ── Background mascot layer ─────────────────────────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {/* Plain <img> rather than next/image — the photo is purely
            decorative, Vercel's image-optimisation pipeline would only
            add weight, and remotePatterns config is finicky on
            Next 16. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={MASCOT_URL}
          alt=""
          aria-hidden
          loading="eager"
          fetchPriority="high"
          className="mascot-img absolute inset-0 h-full w-full object-cover object-[70%_30%]"
        />
        {/* Brand chroma bloom — single warm-violet to cool-cyan glow */}
        <div className="glare" />
        {/* Heavy film grain over everything */}
        <div className="grain grain-heavy absolute inset-0" />
        {/* Vignette so type wins centre */}
        <div className="vignette absolute inset-0" />
        {/* Final colour wash darkening the right side under the log */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(11,10,13,0.55) 0%, rgba(11,10,13,0.85) 100%)",
          }}
        />
      </div>

      <div className="relative mx-auto flex min-h-[100dvh] max-w-[1280px] flex-col px-6 pt-32 pb-16 lg:px-10 lg:pt-36">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted"
        >
          Relay&nbsp;&nbsp;//&nbsp;&nbsp;reliable LLM API delivery
        </motion.p>

        <div className="mt-auto grid grid-cols-1 gap-x-14 gap-y-12 pt-12 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          {/* ── Left: type-first heading ──────────────────────── */}
          <div>
            <h1 className="heading-tight text-balance text-[clamp(2.6rem,6.8vw,5.4rem)] font-medium text-fg">
              <Reveal delay={0.05}>
                <span className="block">Your AI calls keep</span>
              </Reveal>
              <Reveal delay={0.13}>
                <span className="block">
                  working&nbsp;
                  <em className="font-display italic text-accent-em">
                    when providers don&apos;t.
                  </em>
                </span>
              </Reveal>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="mt-8 max-w-[520px] text-pretty text-[17px] leading-[1.55] text-fg-dim"
            >
              I rewrote retry-and-failover for LLM APIs in four projects, each
              time with a new bug. Relay is the version you import instead —
              same SDK shape, plus auto-retry, provider failover, and a cache
              that stops you paying twice.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7"
            >
              <Link
                href="/signup"
                className="group inline-flex items-baseline gap-3 border-b border-fg pb-1 text-fg transition-colors hover:border-accent hover:text-accent"
              >
                <span className="text-[15px] font-medium">Get an API key</span>
                <span className="text-[15px] transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
              <Link
                href="https://www.npmjs.com/package/@relay-api/sdk"
                className="text-[15px] text-fg-dim underline-offset-4 transition-colors hover:text-fg hover:underline"
              >
                npm  /  @relay-api/sdk
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.85 }}
              className="mt-10"
            >
              <NpmCopy />
            </motion.div>
          </div>

          {/* ── Right: live log demo ──────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <LiveLog />
            <p className="mt-4 max-w-[460px] font-mono text-[11px] leading-relaxed text-muted">
              Live stream from a relay account — same shape you see in your
              dashboard. Newest event types in at the top, older ones fade out
              of the bottom of the window.
            </p>
          </motion.div>
        </div>

        {/* Bottom rule */}
        <div className="mt-16 flex flex-col items-baseline justify-between gap-3 border-t border-border pt-5 font-mono text-[12px] text-muted sm:flex-row">
          <span>edge proxy · ~30ms overhead · BYOK</span>
          <span>anthropic · openai · gemini · failover chain</span>
        </div>
      </div>
    </section>
  );
}

function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <span className="inline-block overflow-hidden align-bottom">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
}
