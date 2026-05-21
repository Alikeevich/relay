"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Live log stream for the hero — replaces decorative "Anthropic down" /
 * "Failover → OpenAI" chips with an honest demo of what the product
 * actually does. Lines append on an interval, top lines scroll out of
 * view through a mask, then the script loops.
 *
 * No animation libraries — keeping this small and dependency-free so the
 * hero stays fast.
 */

type LineColor = "ok" | "warn" | "err" | "info" | "dim";

interface LogLine {
  /** Seconds past the cycle start when this line should appear. */
  at: number;
  /** Provider tag rendered before the message. */
  provider: "anthropic" | "openai" | "gemini" | "relay";
  status: LineColor;
  /** The line content. */
  text: string;
}

// One full cycle ≈ 14 seconds. Designed to read like real request flow.
const SCRIPT: LogLine[] = [
  { at: 0.0, provider: "relay", status: "info", text: "POST /v1/messages   model=claude-sonnet-4-6" },
  { at: 0.5, provider: "anthropic", status: "ok", text: "200 OK   delta=487ms   tokens=1024" },
  { at: 1.4, provider: "relay", status: "info", text: "POST /v1/messages   model=claude-sonnet-4-6" },
  { at: 2.0, provider: "anthropic", status: "err", text: "529 overloaded" },
  { at: 2.3, provider: "relay", status: "warn", text: "retry attempt=2   backoff=312ms" },
  { at: 2.8, provider: "anthropic", status: "err", text: "529 overloaded" },
  { at: 3.1, provider: "relay", status: "warn", text: "retry attempt=3   backoff=842ms" },
  { at: 4.1, provider: "relay", status: "warn", text: "failover → openai   model=gpt-4o" },
  { at: 4.5, provider: "openai", status: "ok", text: "200 OK   delta=611ms   tokens=987" },
  { at: 5.6, provider: "relay", status: "dim", text: "request_id=msg_8adac369   uptime preserved" },
  { at: 7.0, provider: "relay", status: "info", text: "POST /v1/messages   model=gemini-2.5-flash" },
  { at: 7.4, provider: "gemini", status: "ok", text: "200 OK   delta=312ms   cache_miss" },
  { at: 8.3, provider: "relay", status: "info", text: "POST /v1/messages   model=gemini-2.5-flash" },
  { at: 8.6, provider: "relay", status: "ok", text: "cache hit   delta=4ms   $0 tokens" },
  { at: 9.5, provider: "relay", status: "info", text: "POST /v1/messages   model=claude-sonnet-4-6" },
  { at: 10.1, provider: "anthropic", status: "ok", text: "200 OK   delta=512ms   tokens=2048" },
  { at: 11.2, provider: "relay", status: "info", text: "POST /v1/messages   model=claude-opus-4" },
  { at: 11.6, provider: "anthropic", status: "err", text: "529 overloaded" },
  { at: 11.9, provider: "relay", status: "warn", text: "retry attempt=2   backoff=287ms" },
  { at: 12.5, provider: "anthropic", status: "ok", text: "200 OK   delta=2104ms   tokens=4096" },
];

const CYCLE_SECONDS = 14;
const VISIBLE_LINES = 9;

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

export function LiveLog() {
  const [tick, setTick] = useState(0);
  const startRef = useRef<number>(Date.now());

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      setTick(((Date.now() - startRef.current) / 1000) % CYCLE_SECONDS);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const visible = useMemo(() => {
    const shown = SCRIPT.filter((l) => l.at <= tick);
    return shown.slice(-VISIBLE_LINES);
  }, [tick]);

  return (
    <div className="relative overflow-hidden rounded-lg border border-border bg-[#0c0b10]">
      {/* Window chrome */}
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          relay.dev/logs
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[11px] text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-[#7ee7b0]" />
          live
        </span>
      </div>

      <div className="relative px-4 py-3">
        <div className="space-y-[3px] font-mono text-[12.5px] leading-[1.5]">
          {visible.map((l, i) => (
            <LogRow key={`${l.at}-${i}`} line={l} freshest={i === visible.length - 1} />
          ))}
        </div>
        {/* Soft fade at the top so older lines feel like they're sliding off */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[#0c0b10] to-transparent"
        />
      </div>
    </div>
  );
}

function LogRow({ line, freshest }: { line: LogLine; freshest: boolean }) {
  const stamp = formatStamp(line.at);
  return (
    <div className="grid grid-cols-[80px_82px_1fr] gap-3 whitespace-pre font-mono">
      <span className="text-muted">{stamp}</span>
      <span className="text-fg-dim">{PROVIDER_LABEL[line.provider]}</span>
      <span className={`${COLOR_CLASS[line.status]} ${freshest ? "caret" : ""}`}>
        {line.text}
      </span>
    </div>
  );
}

function formatStamp(at: number): string {
  // Treat the cycle as a real clock window: a synthetic 14:03:21 + delta.
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
