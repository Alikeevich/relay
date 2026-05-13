"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import {
  IconAlertTriangle,
  IconClockHour9,
  IconReload,
  IconCoin,
} from "@tabler/icons-react";
import { Reveal } from "../ui/Reveal";

const problems = [
  {
    icon: IconAlertTriangle,
    tag: "Outage",
    title: "Provider goes down — your product goes with it.",
    body: "Anthropic API drops 30 minutes. Your agent stops mid-task. Your user closes the tab. Your churn goes up.",
    accent: "from-rose-500/30 via-rose-500/10 to-transparent",
  },
  {
    icon: IconClockHour9,
    tag: "Rate limit",
    title: "529 overloaded, right when traffic spikes.",
    body: "Peak hours are exactly when you can't afford 429s. Every retry you don't write yourself is a request that quietly dies.",
    accent: "from-amber-500/30 via-amber-500/10 to-transparent",
  },
  {
    icon: IconReload,
    tag: "Boilerplate",
    title: "You wrote exponential backoff again. And again.",
    body: "Every project ships its own retry loop. Half of them get the jitter wrong. None of them failover to a backup provider.",
    accent: "from-violet-500/30 via-violet-500/10 to-transparent",
  },
  {
    icon: IconCoin,
    tag: "Cost",
    title: "You paid twice for the same answer.",
    body: "Same system prompt, same user input — different request id. Without caching, every duplicate burns tokens you'll never see again.",
    accent: "from-cyan-500/30 via-cyan-500/10 to-transparent",
  },
];

export function Problems() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="problem" className="relative bg-bg">
      <div className="relative mx-auto max-w-6xl px-6 pt-32 pb-12">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.2em] text-muted">
            The reality
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-4 max-w-3xl text-balance text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.02em] text-fg">
            Every AI builder ships the same{" "}
            <span className="font-display italic text-gradient-accent">
              reliability problems
            </span>{" "}
            from scratch.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            Four bugs you have hit this quarter — and will keep hitting until
            something else handles them for you.
          </p>
        </Reveal>
      </div>

      <div ref={containerRef} className="relative">
        {problems.map((p, i) => {
          const targetScale = 1 - (problems.length - i) * 0.04;
          const range: [number, number] = [i / problems.length, 1];
          return (
            <StickyCard
              key={i}
              i={i}
              {...p}
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
  icon: Icon,
  tag,
  title,
  body,
  accent,
  progress,
  range,
  targetScale,
}: {
  i: number;
  icon: typeof IconAlertTriangle;
  tag: string;
  title: string;
  body: string;
  accent: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={ref}
      className="sticky flex items-center justify-center px-6"
      style={{ top: `calc(8vh + ${i * 18}px)`, height: "100vh" }}
    >
      <motion.article
        style={{ scale }}
        className="relative w-full max-w-4xl origin-top overflow-hidden rounded-3xl border border-border bg-bg-soft/95 p-8 backdrop-blur-xl shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)] md:p-12"
      >
        <div
          aria-hidden
          className={`absolute inset-0 -z-10 bg-gradient-to-br ${accent}`}
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-grid opacity-30"
        />
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
          <div className="flex shrink-0 flex-col items-start gap-4">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-white/[0.04]">
              <Icon size={26} className="text-fg" />
            </div>
            <span className="rounded-full border border-border bg-white/[0.04] px-3 py-1 text-xs uppercase tracking-[0.15em] text-muted">
              0{i + 1} · {tag}
            </span>
          </div>
          <div className="flex-1">
            <h3 className="text-balance text-2xl font-medium leading-tight tracking-tight text-fg md:text-3xl lg:text-4xl">
              {title}
            </h3>
            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted md:text-lg">
              {body}
            </p>
          </div>
        </div>
      </motion.article>
    </div>
  );
}
