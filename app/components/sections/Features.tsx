"use client";

import { motion, useInView } from "motion/react";
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

        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-[260px_220px_220px] lg:grid-rows-[280px_240px]">
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
    <div className="relative h-32 w-full overflow-hidden rounded-2xl border border-border bg-bg/60 p-4">
      <div className="flex h-full items-center justify-between gap-4">
        <Node label="Anthropic" status="down" />
        <div className="relative h-px flex-1">
          <div className="absolute inset-0 bg-gradient-to-r from-danger/60 via-accent/60 to-success/60" />
          <motion.div
            initial={{ x: "0%" }}
            animate={{ x: "calc(100% - 8px)" }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_12px_rgba(167,139,250,0.8)]"
          />
        </div>
        <Node label="Relay" status="ok" middle />
        <div className="relative h-px flex-1">
          <div className="absolute inset-0 bg-gradient-to-r from-success/60 to-success" />
        </div>
        <Node label="OpenAI" status="ok" />
      </div>
    </div>
  );
}

function Node({
  label,
  status,
  middle,
}: {
  label: string;
  status: "ok" | "down";
  middle?: boolean;
}) {
  const dot =
    status === "ok"
      ? "bg-success shadow-[0_0_10px_rgba(52,211,153,0.7)]"
      : "bg-danger shadow-[0_0_10px_rgba(251,113,133,0.7)]";
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl border ${middle ? "border-accent/40 bg-accent/10" : "border-border bg-white/[0.04]"}`}
      >
        <span className={`h-2 w-2 rounded-full ${dot}`} />
      </div>
      <span className="text-[10px] uppercase tracking-wider text-muted">
        {label}
      </span>
    </div>
  );
}

function DashboardViz() {
  const bars = [40, 65, 30, 78, 52, 88, 45, 70, 58, 92, 68, 80];
  return (
    <div className="relative h-32 w-full overflow-hidden rounded-2xl border border-border bg-bg/60 p-4">
      <div className="flex h-full items-end gap-1.5">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            whileInView={{ height: `${h}%` }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.7,
              delay: i * 0.04,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex-1 rounded-t-sm bg-gradient-to-t from-accent/60 to-accent-2/60"
          />
        ))}
      </div>
      <div className="absolute right-4 top-3 rounded-full border border-border bg-bg/80 px-2 py-0.5 font-mono text-[10px] text-muted backdrop-blur">
        p95 · 412ms
      </div>
    </div>
  );
}
