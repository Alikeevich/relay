"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";

/**
 * Outage recap — a pinned scroll-driven story panel.
 *
 * Tells the realistic story of a 29-minute Anthropic outage where 4,718
 * Relay calls flowed uninterrupted. Every visual element is bound to
 * scrollYProgress via useTransform, then *committed to React state* via
 * useMotionValueEvent so it renders reliably across hydration / SSR
 * boundaries (motion.span-with-motion-children is finicky in some
 * builds).
 */

const HEADLINE = [
  "On",
  "April 12,",
  "Anthropic",
  "went",
  "dark",
  "for",
  "twenty-nine",
  "minutes.",
  "Four",
  "thousand",
  "seven",
  "hundred",
  "and",
  "eighteen",
  "Relay",
  "calls",
  "flowed",
  "uninterrupted.",
];

export function Anecdote() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // ── Motion values driven by scrollYProgress ───────────────────────
  const minutesMV = useTransform(scrollYProgress, [0.1, 0.7], [0, 29]);
  const requestsMV = useTransform(scrollYProgress, [0.2, 0.8], [0, 4718]);
  const clockMinutesMV = useTransform(scrollYProgress, [0.05, 0.75], [3, 32]);
  const bgOpacity = useTransform(
    scrollYProgress,
    [0, 0.4, 1],
    [0.04, 0.16, 0.06],
  );

  // ── Commit motion values to React state for safe rendering ────────
  const [minutes, setMinutes] = useState("00");
  const [requests, setRequests] = useState("0");
  const [clock, setClock] = useState("14:03");
  const [anthropic, setAnthropic] = useState<{
    label: "OK" | "DOWN" | "RECOVERING";
    color: string;
  }>({ label: "OK", color: "#7ee7b0" });

  useMotionValueEvent(minutesMV, "change", (v) => {
    setMinutes(Math.round(v).toString().padStart(2, "0"));
  });
  useMotionValueEvent(requestsMV, "change", (v) => {
    setRequests(Math.round(v).toLocaleString("en-US"));
  });
  useMotionValueEvent(clockMinutesMV, "change", (v) => {
    const m = Math.floor(v);
    const carry = Math.floor(m / 60);
    const mm = (m % 60).toString().padStart(2, "0");
    const hh = (14 + carry).toString().padStart(2, "0");
    setClock(`${hh}:${mm}`);
  });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v < 0.08) setAnthropic({ label: "OK", color: "#7ee7b0" });
    else if (v < 0.78) setAnthropic({ label: "DOWN", color: "#ff8593" });
    else setAnthropic({ label: "RECOVERING", color: "#ffb37a" });
  });

  return (
    <section
      id="anecdote"
      ref={sectionRef}
      className="relative border-b border-border"
      style={{ height: "250vh" }}
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        {/* Mood */}
        <motion.div
          aria-hidden
          style={{ opacity: bgOpacity }}
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#ff8593]/30 via-transparent to-accent-2/20"
        />
        <div aria-hidden className="grain grain-heavy absolute inset-0" />

        <div className="relative mx-auto flex h-full w-full max-w-[1280px] flex-col px-6 pt-28 pb-12 lg:px-10">
          {/* Top — date + status pills */}
          <div className="flex flex-col gap-y-4 border-b border-border pb-6 font-mono text-[12px] uppercase tracking-[0.22em] text-muted sm:flex-row sm:items-baseline sm:justify-between">
            <span>April 12, 2026  ·  14:03 UTC</span>
            <div className="flex gap-x-8">
              <span className="inline-flex items-center gap-2">
                <span className="text-muted">anthropic</span>
                <span
                  className="h-1.5 w-1.5 rounded-full transition-colors duration-300"
                  style={{ backgroundColor: anthropic.color }}
                />
                <span
                  style={{ color: anthropic.color }}
                  className="transition-colors duration-300"
                >
                  {anthropic.label}
                </span>
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="text-muted">relay</span>
                <span className="relative inline-flex h-1.5 w-1.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-[#7ee7b0]" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#7ee7b0]" />
                </span>
                <span className="text-[#7ee7b0]">OK</span>
              </span>
            </div>
          </div>

          {/* Middle — narrative + clock */}
          <div className="mt-auto grid grid-cols-1 gap-x-16 gap-y-10 pb-6 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <h2 className="heading-tight text-balance text-[clamp(2rem,5vw,4rem)] font-medium leading-[1.05] text-fg">
              {HEADLINE.map((word, i) => (
                <WordReveal
                  key={i}
                  word={word}
                  index={i}
                  total={HEADLINE.length}
                  progress={scrollYProgress}
                />
              ))}
            </h2>

            <div className="flex flex-col items-start gap-3 lg:items-end">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                — elapsed
              </span>
              <span className="font-display text-[clamp(5rem,12vw,9rem)] font-medium leading-none text-fg tabular-nums">
                {clock}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                start 14:03  ·  recover 14:32
              </span>
            </div>
          </div>

          {/* Bottom — counters */}
          <div className="grid grid-cols-1 gap-y-10 border-t border-border pt-10 sm:grid-cols-2 sm:gap-x-16">
            <Counter
              value={minutes}
              label="minutes Anthropic returned 5xx"
              suffix="min"
              tone="bad"
            />
            <Counter
              value={requests}
              label="Relay calls succeeded via failover to OpenAI"
              suffix="reqs"
              tone="ok"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function WordReveal({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  // Words finish revealing in the middle ~55% of the scroll, so the
  // headline is fully visible well before the counters peak.
  const start = 0.08 + (index / total) * 0.5;
  const end = start + 0.06;
  const opacity = useTransform(progress, [start, end], [0.18, 1]);
  const y = useTransform(progress, [start, end], [10, 0]);

  return (
    <motion.span style={{ opacity, y }} className="mr-[0.25em] inline-block">
      {word}
    </motion.span>
  );
}

function Counter({
  value,
  label,
  suffix,
  tone,
}: {
  value: string;
  label: string;
  suffix: string;
  tone: "ok" | "bad";
}) {
  const toneColor = tone === "ok" ? "text-[#7ee7b0]" : "text-[#ff8593]";
  return (
    <div>
      <div className="flex items-baseline gap-3">
        <span className="font-display text-[clamp(3rem,7vw,5.5rem)] font-medium leading-none text-fg tabular-nums">
          {value}
        </span>
        <span
          className={`font-mono text-[12px] uppercase tracking-[0.22em] ${toneColor}`}
        >
          {suffix}
        </span>
      </div>
      <p className="mt-3 max-w-[360px] text-[13.5px] leading-relaxed text-muted">
        {label}
      </p>
    </div>
  );
}
