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

/**
 * GSAP-style horizontal pinned scroll. The whole section is N viewports
 * tall; as the user scrolls, the page "pins" and the panels slide right-
 * to-left underneath. Achieved with motion's useScroll/useTransform —
 * translateX of an inner track tied to scrollYProgress.
 *
 * This is the showcase scroll moment that fastlane.ai, Linear and
 * Stripe.press use to make a 30-second product story unforgettable.
 */
export function Problems() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Translate the track from 0 → -75% so all four panels reveal. We
  // reserve 25% of the track for empty "lead-out" so the last panel
  // rests centered before scroll unpins.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
  const progressBar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="problem"
      ref={sectionRef}
      className="relative border-b border-border"
      // Total height = (panels - 1) * 100vh + 100vh stays.
      // 4 panels → 4× viewport height so the slide reads as 3 full pans.
      style={{ height: `${problems.length * 100}vh` }}
    >
      {/* Sticky stage — fills the viewport while we scroll the section */}
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <div className="mx-auto w-full max-w-[1280px] flex-shrink-0 px-6 pt-28 lg:px-10">
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
          <motion.ol
            style={{ x }}
            className="flex h-full w-[400vw]"
          >
            {problems.map((p, i) => (
              <Panel key={p.tag} problem={p} index={i} />
            ))}
          </motion.ol>
        </div>

        {/* Progress bar fixed to bottom of pinned stage */}
        <div className="mx-auto w-full max-w-[1280px] flex-shrink-0 px-6 pb-10 lg:px-10">
          <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
            <span>scroll →</span>
            <span>
              0{problems.length} / 0{problems.length}
            </span>
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

function Panel({ problem, index }: { problem: Problem; index: number }) {
  return (
    <li className="flex h-full w-screen items-center justify-center px-6 lg:px-10">
      <article className="mx-auto grid w-full max-w-[1180px] grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-[1fr_1.4fr]">
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
      </article>
    </li>
  );
}
