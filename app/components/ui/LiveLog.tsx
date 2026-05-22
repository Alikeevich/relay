"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Live log stream — the hero's beating heart.
 *
 * Newest event animates IN at the TOP. Older events visually push down
 * and fade out through a mask at the bottom of the container — the box
 * looks like it's growing downward in real time.
 *
 * 14-second loop runs a realistic relay request flow with retries and
 * a provider failover, so anyone reading it sees the product working.
 */

type LineColor = "ok" | "warn" | "err" | "info" | "dim";

interface LogLine {
  /** Seconds past the cycle start when this line should appear. */
  at: number;
  provider: "anthropic" | "openai" | "gemini" | "relay";
  status: LineColor;
  text: string;
}

const SCRIPT: LogLine[] = [
  { at: 0.0, provider: "relay", status: "info", text: "POST /v1/messages   model=claude-sonnet-4-6" },
  { at: 0.6, provider: "anthropic", status: "ok", text: "200 OK   delta=487ms   tokens=1024" },
  { at: 1.5, provider: "relay", status: "info", text: "POST /v1/messages   model=claude-sonnet-4-6" },
  { at: 2.1, provider: "anthropic", status: "err", text: "529 overloaded" },
  { at: 2.4, provider: "relay", status: "warn", text: "retry attempt=2   backoff=312ms" },
  { at: 2.9, provider: "anthropic", status: "err", text: "529 overloaded" },
  { at: 3.2, provider: "relay", status: "warn", text: "retry attempt=3   backoff=842ms" },
  { at: 4.2, provider: "relay", status: "warn", text: "failover  →  openai   model=gpt-4o" },
  { at: 4.6, provider: "openai", status: "ok", text: "200 OK   delta=611ms   tokens=987" },
  { at: 5.5, provider: "relay", status: "dim", text: "request_id=msg_8adac369   uptime preserved" },
  { at: 6.9, provider: "relay", status: "info", text: "POST /v1/messages   model=gemini-2.5-flash" },
  { at: 7.3, provider: "gemini", status: "ok", text: "200 OK   delta=312ms   cache_miss" },
  { at: 8.2, provider: "relay", status: "info", text: "POST /v1/messages   model=gemini-2.5-flash" },
  { at: 8.5, provider: "relay", status: "ok", text: "cache hit   delta=4ms   $0 tokens" },
  { at: 9.4, provider: "relay", status: "info", text: "POST /v1/messages   model=claude-sonnet-4-6" },
  { at: 10.0, provider: "anthropic", status: "ok", text: "200 OK   delta=512ms   tokens=2048" },
  { at: 11.0, provider: "relay", status: "info", text: "POST /v1/messages   model=claude-opus-4" },
  { at: 11.4, provider: "anthropic", status: "err", text: "529 overloaded" },
  { at: 11.7, provider: "relay", status: "warn", text: "retry attempt=2   backoff=287ms" },
  { at: 12.4, provider: "anthropic", status: "ok", text: "200 OK   delta=2104ms   tokens=4096" },
];

const CYCLE_SECONDS = 14;
const VISIBLE_LINES = 14;

const PROVIDER_LABEL: Record<LogLine["provider"], string> = {
  anthropic: "anthropic",
  openai: "openai   ",
  gemini: "gemini   ",
  relay: "relay    ",
};

const COLOR_CLASS: Record<LineColor, string> = {
  ok: "text-[#7ee7b0]",
  warn: "text-[#ffb37a]",
  err: "text-[#ff8593]",
  info: "text-fg/85",
  dim: "text-muted",
};

interface RenderedLine extends LogLine {
  /** Unique key so motion can keep identities across cycles. */
  key: string;
}

export function LiveLog() {
  const [tick, setTick] = useState(0);
  const [cycle, setCycle] = useState(0);
  // Note: Date.now() is impure and must NOT be called at render time —
  // initialise to null and stamp inside the effect.
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    startRef.current = Date.now();
    let raf = 0;
    const loop = () => {
      const start = startRef.current ?? Date.now();
      const elapsed = (Date.now() - start) / 1000;
      const newCycle = Math.floor(elapsed / CYCLE_SECONDS);
      setCycle((c) => (c !== newCycle ? newCycle : c));
      setTick(elapsed % CYCLE_SECONDS);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const visible: RenderedLine[] = useMemo(() => {
    const shown = SCRIPT.filter((l) => l.at <= tick).map<RenderedLine>(
      (l, idx) => ({ ...l, key: `${cycle}-${idx}` }),
    );
    // Newest at top → reverse and clip.
    return shown.slice(-VISIBLE_LINES).reverse();
  }, [tick, cycle]);

  return (
    <div className="relative overflow-hidden border border-border bg-[#0c0b10]">
      {/* Chrome */}
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          relay.dev&nbsp;/&nbsp;logs
        </span>
        <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          <span className="relative inline-flex h-1.5 w-1.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-[#7ee7b0]" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#7ee7b0]" />
          </span>
          live
        </span>
      </div>

      <div className="relative h-[480px] px-5 py-4">
        <div className="flex flex-col gap-[3px] font-mono text-[12.5px] leading-[1.55]">
          <AnimatePresence initial={false}>
            {visible.map((line, i) => (
              <motion.div
                key={line.key}
                layout
                initial={{ opacity: 0, y: -14, filter: "blur(2px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, height: 0, marginTop: 0, marginBottom: 0 }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                  layout: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                }}
                style={{ opacity: 1 - i * 0.06 }}
              >
                <LogRow line={line} freshest={i === 0} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {/* Bottom fade so older lines dissolve into background */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0c0b10] via-[#0c0b10]/85 to-transparent"
        />
      </div>
    </div>
  );
}

function LogRow({ line, freshest }: { line: LogLine; freshest: boolean }) {
  const stamp = formatStamp(line.at);
  return (
    <div className="grid grid-cols-[82px_82px_1fr] gap-3 whitespace-pre font-mono">
      <span className="text-muted">{stamp}</span>
      <span className="text-fg-dim">{PROVIDER_LABEL[line.provider]}</span>
      <span className={`${COLOR_CLASS[line.status]} ${freshest ? "caret" : ""}`}>
        {line.text}
      </span>
    </div>
  );
}

function formatStamp(at: number): string {
  const baseSeconds = 14 * 3600 + 3 * 60 + 21;
  const t = Math.floor(baseSeconds + at);
  const h = Math.floor(t / 3600) % 24;
  const m = Math.floor(t / 60) % 60;
  const s = t % 60;
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}
