"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { LiveLog } from "../ui/LiveLog";
import { NpmCopy } from "../ui/NpmCopy";

/**
 * Editorial hero — asymmetric, no glass, no glow, no status pill.
 *
 * Headline is left-aligned and carries its own emphasis through type
 * weight + a single italic accent. The visual anchor on the right is a
 * live log of real Relay events (retry + failover + cache) rather than
 * decorative status chips.
 *
 * This composition replaces the previous v0-style hero (centered text,
 * aurora glow, "Private beta · Built on Cloudflare Workers" pill, glass
 * code card with conic ring, floating "Anthropic down" chips).
 */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-border">
      {/* Subtle background — single radial vignette + film grain, no aurora */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 50% at 75% 35%, rgba(167,139,250,0.07) 0%, transparent 70%)",
          }}
        />
        <div className="noise absolute inset-0" />
      </div>

      <div className="mx-auto max-w-[1280px] px-6 pt-36 pb-28 lg:px-10 lg:pt-44 lg:pb-32">
        <div className="grid grid-cols-1 gap-x-12 gap-y-16 lg:grid-cols-[1.35fr_1fr] lg:items-end">
          {/* ── Left: type-first heading ────────────────────────────── */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted"
            >
              Relay&nbsp;&nbsp;//&nbsp;&nbsp;reliable LLM API delivery
            </motion.p>

            <h1 className="heading-tight mt-7 max-w-[820px] text-balance text-[clamp(2.85rem,7vw,5.6rem)] font-medium text-fg">
              <Reveal delay={0.05}>
                <span className="block">Your AI calls keep</span>
              </Reveal>
              <Reveal delay={0.12}>
                <span className="block">
                  working&nbsp;
                  <em className="font-display italic text-fg-dim">
                    when providers don&apos;t.
                  </em>
                </span>
              </Reveal>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="mt-10 max-w-[540px] text-pretty text-lg leading-[1.55] text-fg-dim lg:text-[19px]"
            >
              I rewrote retry-and-failover for LLM APIs in four projects, each
              time with a new bug. Relay is the version you import instead —
              same SDK shape you already use, plus auto-retry, provider
              failover, and a cache that stops you paying twice.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center"
            >
              <Link
                href="/signup"
                className="group inline-flex items-baseline gap-3 rounded-none border-b border-fg pb-1 text-fg transition-colors hover:border-accent hover:text-accent"
              >
                <span className="text-base font-medium">Get an API key</span>
                <span className="text-base transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
              <Link
                href="https://www.npmjs.com/package/@relay-api/sdk"
                className="text-base text-muted underline-offset-4 transition-colors hover:text-fg hover:underline"
              >
                Read the SDK on npm
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.85 }}
              className="mt-12"
            >
              <NpmCopy />
            </motion.div>
          </div>

          {/* ── Right: live log demo ────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <LiveLog />
            <p className="mt-3 max-w-[420px] font-mono text-[11px] leading-relaxed text-muted">
              Live stream from an example relay account — retries, failover,
              and cache hits flow through your own dashboard exactly like this.
            </p>
          </motion.div>
        </div>

        {/* Bottom rule with one factual line. Not a badge, not a pill. */}
        <div className="mt-24 flex flex-col items-baseline justify-between gap-3 border-t border-border pt-6 text-[13px] text-muted sm:flex-row">
          <span className="font-mono">
            edge proxy · ~30ms overhead · BYOK
          </span>
          <span className="font-mono">
            anthropic / openai / gemini · failover chain
          </span>
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
