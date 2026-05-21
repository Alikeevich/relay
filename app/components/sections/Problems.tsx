"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
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

export function Problems() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="problem" className="relative border-b border-border">
      <div className="relative mx-auto max-w-[1280px] px-6 pt-32 pb-12 lg:px-10">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
            — The reality
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="heading-tight mt-5 max-w-[920px] text-balance text-[clamp(2rem,4.8vw,3.75rem)] font-medium text-fg">
            Every AI builder ships the same{" "}
            <em className="font-display italic text-fg-dim">
              reliability problems
            </em>{" "}
            from scratch.
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-6 max-w-[600px] text-[16.5px] leading-relaxed text-fg-dim">
            Four bugs you have hit this quarter — and will keep hitting until
            something else handles them for you.
          </p>
        </Reveal>
      </div>

      <div ref={containerRef} className="relative">
        {problems.map((p, i) => {
          const targetScale = 1 - (problems.length - i) * 0.035;
          const range: [number, number] = [i / problems.length, 1];
          return (
            <StickyCard
              key={i}
              i={i}
              problem={p}
              progress={scrollYProgress}
              range={range}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
}

function StickyCard({
  i,
  problem,
  progress,
  range,
  targetScale,
}: {
  i: number;
  problem: Problem;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}) {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      className="sticky flex items-center justify-center px-6 lg:px-10"
      style={{ top: `calc(8vh + ${i * 18}px)`, height: "100vh" }}
    >
      <motion.article
        style={{ scale }}
        className="relative w-full max-w-[1180px] origin-top overflow-hidden border border-border bg-bg-soft p-10 md:p-14"
      >
        <div className="grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-[1fr_1.4fr]">
          {/* Left rail: tag + stat */}
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
              0{i + 1}&nbsp;&nbsp;·&nbsp;&nbsp;{problem.tag}
            </p>
            <div className="mt-12 font-display text-[clamp(4rem,10vw,7rem)] font-medium leading-none text-fg">
              {problem.stat}
            </div>
            <p className="mt-4 max-w-[280px] text-[13px] leading-relaxed text-muted">
              {problem.statLabel}
            </p>
          </div>

          {/* Right rail: title + body */}
          <div className="lg:pt-12">
            <h3 className="heading-tight text-balance text-[clamp(1.75rem,3.4vw,2.6rem)] font-medium text-fg">
              {problem.title}
            </h3>
            <p className="mt-6 max-w-[560px] text-pretty text-[17px] leading-relaxed text-fg-dim">
              {problem.body}
            </p>
          </div>
        </div>
      </motion.article>
    </div>
  );
}
