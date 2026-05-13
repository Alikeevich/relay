"use client";

import { motion, useInView, type Variants } from "motion/react";
import { useRef } from "react";
import {
  IconBolt,
  IconArrowsShuffle,
  IconDatabase,
  IconChartHistogram,
  IconLock,
  IconWorld,
} from "@tabler/icons-react";
import { Reveal } from "../ui/Reveal";

export function Features() {
  return (
    <section id="features" className="relative bg-bg py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.2em] text-muted">
            What you get
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-4 max-w-3xl text-balance text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.02em] text-fg">
            Six features.{" "}
            <span className="font-display italic text-gradient-accent">
              One install.
            </span>
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-[320px_300px_240px] lg:grid-rows-[340px_320px_260px]">
          <BentoCard className="md:col-span-2 md:row-span-1">
            <div className="flex h-full flex-col justify-between gap-6">
              <div>
                <IconHeader icon={IconArrowsShuffle} />
                <h3 className="mt-4 text-2xl font-medium tracking-tight text-fg">
                  Automatic provider failover
                </h3>
                <p className="mt-2 max-w-md text-muted">
                  When Anthropic returns 5xx, Relay routes the next attempt to
                  OpenAI — with model mapping you can override per request.
                </p>
              </div>
              <FailoverViz />
            </div>
          </BentoCard>

          <BentoCard>
            <IconHeader icon={IconBolt} />
            <h3 className="mt-4 text-xl font-medium tracking-tight text-fg">
              Exponential backoff, done right
            </h3>
            <p className="mt-2 text-sm text-muted">
              Decorrelated jitter, configurable ceilings, surfaced in the
              dashboard so you see what was retried and why.
            </p>
          </BentoCard>

          <BentoCard>
            <IconHeader icon={IconDatabase} />
            <h3 className="mt-4 text-xl font-medium tracking-tight text-fg">
              Smart caching
            </h3>
            <p className="mt-2 text-sm text-muted">
              Exact-match on day one, semantic with embeddings on Hobby and up.
              Stop paying twice for the same answer.
            </p>
          </BentoCard>

          <BentoCard className="md:col-span-2">
            <div className="flex h-full flex-col justify-between gap-6">
              <div>
                <IconHeader icon={IconChartHistogram} />
                <h3 className="mt-4 text-xl font-medium tracking-tight text-fg">
                  Live dashboard for every request
                </h3>
                <p className="mt-2 max-w-md text-sm text-muted">
                  Latency, cost, cache hit rate, retries, failover events —
                  searchable, filterable, and streaming as it happens.
                </p>
              </div>
              <DashboardViz />
            </div>
          </BentoCard>

          <BentoCard>
            <IconHeader icon={IconLock} />
            <h3 className="mt-4 text-xl font-medium tracking-tight text-fg">
              BYOK, encrypted at rest
            </h3>
            <p className="mt-2 text-sm text-muted">
              You keep paying Anthropic directly. We never see plaintext keys —
              AES-256-GCM, audited access.
            </p>
          </BentoCard>

          <BentoCard>
            <IconHeader icon={IconWorld} />
            <h3 className="mt-4 text-xl font-medium tracking-tight text-fg">
              Edge-native, globally
            </h3>
            <p className="mt-2 text-sm text-muted">
              Runs on Cloudflare Workers across 300+ cities. Under 30ms of
              proxy overhead from anywhere in the world.
            </p>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}

function BentoCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-3xl border border-border bg-bg-soft p-7 transition-colors hover:border-border-strong ${className ?? ""}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-20 transition-opacity duration-500 group-hover:opacity-40"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/2 left-1/2 -z-10 h-[140%] w-[140%] -translate-x-1/2 bg-gradient-to-br from-accent/[0.06] via-transparent to-accent-2/[0.06] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      {children}
    </motion.div>
  );
}

function IconHeader({ icon: Icon }: { icon: typeof IconBolt }) {
  return (
    <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white/[0.03]">
      <Icon size={18} className="text-fg" />
    </div>
  );
}

function FailoverViz() {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-border bg-bg/60 px-6 py-6">
      {/* Row 1 — icons. The connecting line spans the FULL width across all
          three icons (Anthropic → Relay → OpenAI), and the animated packet
          travels along it; icons sit on top of the line with opaque
          backgrounds so the line is "hidden" inside each icon. */}
      <div className="relative grid grid-cols-[40px_1fr_40px_1fr_40px] items-center gap-x-4">
        {/* Continuous line + travelling packet — anchored between the first
            and last icon centers (left:20px, right:20px = half icon width) */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-[20px] right-[20px] top-1/2 h-px -translate-y-1/2"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-danger/70 via-accent/80 to-success/70" />
          <motion.div
            initial={{ left: 0 }}
            animate={{ left: "100%" }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              repeatDelay: 0.4,
              ease: [0.65, 0, 0.35, 1],
            }}
            className="absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_16px_2px_rgba(167,139,250,0.9)]"
          />
        </div>
        {/* Icons — z-10 so they cover the line behind them */}
        <NodeIcon status="down" />
        <span />
        <NodeIcon status="ok" middle />
        <span />
        <NodeIcon status="ok" />
      </div>

      {/* Row 2 — labels in the same column template so they sit under icons */}
      <div className="mt-3 grid grid-cols-[40px_1fr_40px_1fr_40px] gap-x-4">
        <NodeLabel>Anthropic</NodeLabel>
        <span />
        <NodeLabel middle>Relay</NodeLabel>
        <span />
        <NodeLabel>OpenAI</NodeLabel>
      </div>
    </div>
  );
}

function NodeIcon({
  status,
  middle,
}: {
  status: "ok" | "down";
  middle?: boolean;
}) {
  const dot =
    status === "ok"
      ? "bg-success shadow-[0_0_10px_rgba(52,211,153,0.8)]"
      : "bg-danger shadow-[0_0_10px_rgba(251,113,133,0.8)]";
  return (
    <div className="relative z-10 flex justify-center">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl border ${
          middle
            ? "border-accent/60 bg-bg-soft shadow-[0_0_24px_-4px_rgba(167,139,250,0.7)]"
            : "border-border-strong bg-bg-soft"
        }`}
      >
        <span className={`h-2 w-2 rounded-full ${dot}`} />
      </div>
    </div>
  );
}

function NodeLabel({
  children,
  middle,
}: {
  children: React.ReactNode;
  middle?: boolean;
}) {
  return (
    <span
      className={`block whitespace-nowrap text-center text-[10px] uppercase tracking-[0.18em] ${middle ? "text-fg" : "text-muted"}`}
    >
      {children}
    </span>
  );
}

const dashboardContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};
const dashboardBar: Variants = {
  hidden: { scaleY: 0, opacity: 0.4 },
  visible: {
    scaleY: 1,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

function DashboardViz() {
  const bars = [40, 65, 30, 78, 52, 88, 45, 70, 58, 92, 68, 80];
  return (
    <div className="relative h-32 w-full overflow-hidden rounded-2xl border border-border bg-bg/60 p-4">
      <motion.div
        variants={dashboardContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="flex h-full items-end gap-1.5"
      >
        {bars.map((h, i) => (
          <motion.div
            key={i}
            variants={dashboardBar}
            style={{ height: `${h}%`, transformOrigin: "bottom" }}
            className="flex-1 rounded-t-sm bg-gradient-to-t from-accent/70 to-accent-2/70"
          />
        ))}
      </motion.div>
      <div className="absolute right-4 top-3 rounded-full border border-border bg-bg/80 px-2 py-0.5 font-mono text-[10px] text-muted backdrop-blur">
        p95 · 412ms
      </div>
    </div>
  );
}
