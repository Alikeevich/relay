"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Reveal } from "../ui/Reveal";

interface Problem {
  tag: string;
  stat: string;
  statLabel: string;
  title: string;
  body: string;
}

const problems: Problem[] = [
  {
    tag: "Outage",
    stat: "99.5%",
    statLabel: "Anthropic real uptime vs 99.9% SLA, 2026 YTD",
    title: "Provider goes down — your product goes with it.",
    body: "Anthropic drops thirty minutes. Your agent stops mid-task. Your user closes the tab. Your churn ticks up. Repeat next month when OpenAI has its own bad day.",
  },
  {
    tag: "Rate limit",
    stat: "529",
    statLabel: "the status code you see during every demo",
    title: "Overloaded, right when traffic spikes.",
    body: "Peak hours are exactly when you can't afford retries you don't have. Every 529 you don't catch is a request that quietly dies and a user who quietly leaves.",
  },
  {
    tag: "Boilerplate",
    stat: "4×",
    statLabel: "times the average AI dev rewrites their retry loop",
    title: "You wrote exponential backoff again. And again.",
    body: "Every project ships its own retry loop. Half of them get the jitter wrong. None of them failover to a backup provider — the model id wouldn't even match.",
  },
  {
    tag: "Cost",
    stat: "38%",
    statLabel: "of prompts repeated within the same hour, observed",
    title: "You paid twice for the same answer.",
    body: "Same system prompt, same user input — different request id. Without caching, every duplicate burns tokens you'll never see again on a bill that grows linearly.",
  },
];

// Counter-scroll parallax band of glitching words. Reads as "the noise"
// that the product silences — outage codes, error names, the boilerplate
// you're sick of rewriting. Loops in the OPPOSITE direction of the panels
// so the depth of the pinned stage doubles.
const NOISE_WORDS = [
  "OUTAGE",
  "529",
  "RETRY",
  "5XX",
  "TIMEOUT",
  "OVERLOADED",
  "CHURN",
  "RATE-LIMIT",
  "JITTER",
  "BACKOFF",
  "FAILOVER",
  "INCIDENT",
  "STALE",
  "DROPPED",
  "529",
  "OUTAGE",
  "RETRY",
];

/**
 * GSAP-style horizontal pinned scroll. The whole section is N viewports
 * tall; as the user scrolls, the page "pins" and the panels slide right-
 * to-left underneath. A parallax word-band drifts the opposite direction
 * across the top half of the stage at higher velocity for depth.
 */
export function Problems() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Panels slide left.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
  // Word band drifts right (slower) for parallax-depth feel.
  const wordsX = useTransform(scrollYProgress, [0, 1], ["-25%", "5%"]);
  // Progress bar fills.
  const progressBar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  // Subtle exposure shift on the mascot bg darkens as you scroll deeper.
  const bgOpacity = useTransform(scrollYProgress, [0, 1], [0.08, 0.18]);
  // Active panel index for the live counter readout (0..3).
  const panelIndex = useTransform(scrollYProgress, (v) =>
    Math.min(problems.length - 1, Math.max(0, Math.floor(v * problems.length))),
  );

  return (
    <section
      id="problem"
      ref={sectionRef}
      className="relative border-b border-border"
      style={{ height: `${problems.length * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        {/* Background mood — subtle gradient that darkens as the user moves through */}
        <motion.div
          aria-hidden
          style={{ opacity: bgOpacity }}
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/30 via-transparent to-accent-2/20"
        />
        <div aria-hidden className="grain absolute inset-0" />

        {/* ── Parallax word-band — the creative GSAP layer ─────── */}
        <motion.div
          aria-hidden
          style={{ x: wordsX }}
          className="pointer-events-none absolute left-0 top-[26%] flex w-[180vw] gap-12 whitespace-nowrap font-display text-[clamp(7rem,18vw,18rem)] leading-none tracking-[-0.04em] text-fg/[0.06]"
        >
          {NOISE_WORDS.map((w, i) => (
            <span
              key={i}
              className={i % 3 === 0 ? "italic text-fg/[0.08]" : "text-fg/[0.04]"}
            >
              {w}
            </span>
          ))}
        </motion.div>

        <div className="relative mx-auto w-full max-w-[1280px] flex-shrink-0 px-6 pt-28 lg:px-10">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
              — The reality
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="heading-tight mt-5 max-w-[920px] text-balance text-[clamp(2rem,4.8vw,3.75rem)] font-medium text-fg">
              Every AI builder ships the same{" "}
              <em className="font-display italic text-accent-em">
                reliability problems
              </em>{" "}
              from scratch.
            </h2>
          </Reveal>
        </div>

        {/* Horizontal track */}
        <div className="relative mt-12 flex-1 overflow-hidden">
          <motion.ol style={{ x }} className="flex h-full w-[400vw]">
            {problems.map((p, i) => (
              <Panel
                key={p.tag}
                problem={p}
                index={i}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </motion.ol>
        </div>

        {/* Progress bar + live counter */}
        <div className="relative mx-auto w-full max-w-[1280px] flex-shrink-0 px-6 pb-10 lg:px-10">
          <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
            <span>scroll →</span>
            <PanelCounter index={panelIndex} total={problems.length} />
          </div>
          <div className="relative mt-3 h-px w-full bg-border">
            <motion.div
              style={{ width: progressBar }}
              className="absolute inset-y-0 left-0 bg-fg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function PanelCounter({
  index,
  total,
}: {
  index: ReturnType<typeof useTransform<number, number>>;
  total: number;
}) {
  // Read the motion value into JSX with motion's <motion.span>-style hook.
  // Use useTransform to convert number → "0X" string.
  const label = useTransform(index, (v) =>
    `0${Math.min(total, v + 1)} / 0${total}`,
  );
  return (
    <motion.span className="font-mono">{label}</motion.span>
  );
}

function Panel({
  problem,
  index,
  scrollYProgress,
}: {
  problem: Problem;
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  // Each panel "scales in" when it's in the centre window of the scroll.
  // The centre for panel i is at (i + 0.5) / N. Map [c-0.2, c, c+0.2] to
  // [0.92, 1, 0.92] for a subtle in-out emphasis.
  const c = (index + 0.5) / problems.length;
  const scale = useTransform(
    scrollYProgress,
    [Math.max(0, c - 0.25), c, Math.min(1, c + 0.25)],
    [0.92, 1, 0.92],
  );
  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, c - 0.3), c, Math.min(1, c + 0.3)],
    [0.55, 1, 0.55],
  );

  return (
    <li className="flex h-full w-screen items-center justify-center px-6 lg:px-10">
      <motion.article
        style={{ scale, opacity }}
        className="mx-auto grid w-full max-w-[1180px] grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-[1fr_1.4fr]"
      >
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
            0{index + 1}&nbsp;&nbsp;·&nbsp;&nbsp;{problem.tag}
          </p>
          <div className="mt-10 font-display text-[clamp(4.5rem,12vw,9rem)] font-medium leading-none text-fg">
            {problem.stat}
          </div>
          <p className="mt-5 max-w-[280px] text-[13px] leading-relaxed text-muted">
            {problem.statLabel}
          </p>
        </div>

        <div className="lg:pt-16">
          <h3 className="heading-tight text-balance text-[clamp(1.75rem,3.4vw,2.6rem)] font-medium text-fg">
            {problem.title}
          </h3>
          <p className="mt-6 max-w-[560px] text-pretty text-[17px] leading-relaxed text-fg-dim">
            {problem.body}
          </p>
        </div>
      </motion.article>
    </li>
  );
}
