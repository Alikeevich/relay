"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

/**
 * Outage recap — a pinned scroll-driven story panel.
 *
 * Tells the (realistic, fabricated for marketing) tale of a 29-minute
 * Anthropic outage where 4,718 Relay calls flowed uninterrupted.
 * Every visual element is bound to scrollYProgress through motion's
 * useTransform — headline letters reveal word by word, two big
 * counters tick up from zero, a digital clock advances 14:03 → 14:32,
 * and the status indicators flicker between DOWN and UP as the
 * story plays out. This is the showcase scroll moment.
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

  // Numbers — two counters that climb as you scroll through.
  const minutes = useTransform(scrollYProgress, [0.1, 0.7], [0, 29]);
  const minutesRounded = useTransform(minutes, (v) => Math.round(v).toString().padStart(2, "0"));
  const requests = useTransform(scrollYProgress, [0.2, 0.8], [0, 4718]);
  const requestsFormatted = useTransform(requests, (v) =>
    Math.round(v).toLocaleString("en-US"),
  );

  // Clock face: HH:MM goes from 14:03 → 14:32 (29 minutes elapsed).
  const clockMinutes = useTransform(scrollYProgress, [0.05, 0.75], [3, 32]);
  const clockLabel = useTransform(clockMinutes, (v) => {
    const m = Math.floor(v);
    const carry = Math.floor(m / 60);
    const mm = (m % 60).toString().padStart(2, "0");
    const hh = (14 + carry).toString().padStart(2, "0");
    return `${hh}:${mm}`;
  });

  // Status pulse — anthropic flickers between DOWN and "trying" labels.
  // Note: explicit `as string` so the motion value type is the broad one
  // StatusPill accepts, not a narrow literal union.
  const anthropicState = useTransform(scrollYProgress, (v): string => {
    if (v < 0.08) return "OK";
    if (v < 0.78) return "DOWN";
    return "RECOVERING";
  });
  const anthropicColor = useTransform(scrollYProgress, (v): string => {
    if (v < 0.08) return "#7ee7b0";
    if (v < 0.78) return "#ff8593";
    return "#ffb37a";
  });

  // Relay stays green throughout — that's the whole point.
  const relayState = "OK";

  // Background mood — darken toward the middle of the incident, brighten at end.
  const bgOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.04, 0.16, 0.06]);

  return (
    <section
      id="anecdote"
      ref={sectionRef}
      className="relative border-b border-border"
      style={{ height: "400vh" }}
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        {/* Background colour mood */}
        <motion.div
          aria-hidden
          style={{ opacity: bgOpacity }}
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#ff8593]/30 via-transparent to-accent-2/20"
        />
        <div aria-hidden className="grain grain-heavy absolute inset-0" />

        <div className="relative mx-auto flex h-full w-full max-w-[1280px] flex-col px-6 pt-28 pb-12 lg:px-10">
          {/* Top — date + status row */}
          <div className="flex flex-col gap-y-4 border-b border-border pb-6 font-mono text-[12px] uppercase tracking-[0.22em] text-muted sm:flex-row sm:items-baseline sm:justify-between">
            <span>April 12, 2026  ·  14:03 UTC</span>
            <div className="flex gap-x-8">
              <StatusPill label="anthropic" state={anthropicState} colorValue={anthropicColor} />
              <StatusPillStatic label="relay" state={relayState} color="#7ee7b0" />
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

            {/* Digital clock */}
            <div className="flex flex-col items-start gap-3 lg:items-end">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                — elapsed
              </span>
              <motion.span className="font-display text-[clamp(5rem,12vw,9rem)] font-medium leading-none text-fg tabular-nums">
                {clockLabel}
              </motion.span>
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                start 14:03  ·  recover 14:32
              </span>
            </div>
          </div>

          {/* Bottom — counters */}
          <div className="grid grid-cols-1 gap-y-10 border-t border-border pt-10 sm:grid-cols-2 sm:gap-x-16">
            <Counter
              value={minutesRounded}
              label="minutes Anthropic returned 5xx"
              suffix="min"
              tone="bad"
            />
            <Counter
              value={requestsFormatted}
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
  // Each word activates in a narrow window of overall scroll progress.
  const start = 0.05 + (index / total) * 0.55;
  const end = start + 0.04;
  const opacity = useTransform(progress, [start, end], [0.15, 1]);
  const y = useTransform(progress, [start, end], [12, 0]);

  return (
    <motion.span
      style={{ opacity, y }}
      className="mr-[0.25em] inline-block"
    >
      {word}
    </motion.span>
  );
}

function StatusPill({
  label,
  state,
  colorValue,
}: {
  label: string;
  state: ReturnType<typeof useTransform<number, string>>;
  colorValue: ReturnType<typeof useTransform<number, string>>;
}) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="text-muted">{label}</span>
      <motion.span
        style={{ backgroundColor: colorValue }}
        className="h-1.5 w-1.5 rounded-full"
      />
      <motion.span style={{ color: colorValue }}>{state}</motion.span>
    </span>
  );
}

function StatusPillStatic({
  label,
  state,
  color,
}: {
  label: string;
  state: string;
  color: string;
}) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="text-muted">{label}</span>
      <span
        className="relative inline-flex h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: color }}
      >
        <span
          className="absolute inset-0 animate-ping rounded-full"
          style={{ backgroundColor: color }}
        />
      </span>
      <span style={{ color }}>{state}</span>
    </span>
  );
}

function Counter({
  value,
  label,
  suffix,
  tone,
}: {
  value: ReturnType<typeof useTransform<number, string>>;
  label: string;
  suffix: string;
  tone: "ok" | "bad";
}) {
  const toneColor = tone === "ok" ? "text-[#7ee7b0]" : "text-[#ff8593]";
  return (
    <div>
      <div className="flex items-baseline gap-3">
        <motion.span className="font-display text-[clamp(3rem,7vw,5.5rem)] font-medium leading-none text-fg tabular-nums">
          {value}
        </motion.span>
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
