"use client";

import { motion } from "motion/react";
import {
  IconArrowRight,
  IconBrandGithub,
  IconCircleCheckFilled,
} from "@tabler/icons-react";
import { Aurora } from "../ui/Aurora";
import { Spotlight } from "../ui/Spotlight";
import { Badge } from "../ui/Badge";
import { RevealWords } from "../ui/Reveal";
import { GradientButton } from "../ui/GradientButton";
import { CodeBlock } from "../ui/CodeBlock";

const heroLines = [
  [
    { t: "kw" as const, v: "import" },
    { t: "txt" as const, v: " { " },
    { t: "var" as const, v: "Relay" },
    { t: "txt" as const, v: " } " },
    { t: "kw" as const, v: "from" },
    { t: "str" as const, v: " '@relay/sdk'" },
    { t: "punct" as const, v: ";" },
  ],
  [{ t: "txt" as const, v: "" }],
  [
    { t: "kw" as const, v: "const" },
    { t: "txt" as const, v: " " },
    { t: "var" as const, v: "llm" },
    { t: "txt" as const, v: " = " },
    { t: "kw" as const, v: "new" },
    { t: "txt" as const, v: " " },
    { t: "fn" as const, v: "Relay" },
    { t: "punct" as const, v: "({ " },
    { t: "var" as const, v: "apiKey" },
    { t: "punct" as const, v: ": " },
    { t: "var" as const, v: "process" },
    { t: "punct" as const, v: "." },
    { t: "var" as const, v: "env" },
    { t: "punct" as const, v: "." },
    { t: "var" as const, v: "RELAY_KEY" },
    { t: "punct" as const, v: " });" },
  ],
  [{ t: "txt" as const, v: "" }],
  [
    { t: "cmt" as const, v: "// Auto retry, failover, cache — handled." },
  ],
  [
    { t: "kw" as const, v: "const" },
    { t: "txt" as const, v: " " },
    { t: "var" as const, v: "reply" },
    { t: "txt" as const, v: " = " },
    { t: "kw" as const, v: "await" },
    { t: "txt" as const, v: " " },
    { t: "var" as const, v: "llm" },
    { t: "punct" as const, v: "." },
    { t: "var" as const, v: "messages" },
    { t: "punct" as const, v: "." },
    { t: "fn" as const, v: "create" },
    { t: "punct" as const, v: "({" },
  ],
  [
    { t: "txt" as const, v: "  " },
    { t: "var" as const, v: "model" },
    { t: "punct" as const, v: ": " },
    { t: "str" as const, v: "'claude-sonnet-4-6'" },
    { t: "punct" as const, v: "," },
  ],
  [
    { t: "txt" as const, v: "  " },
    { t: "var" as const, v: "messages" },
    { t: "punct" as const, v: ": [{ " },
    { t: "var" as const, v: "role" },
    { t: "punct" as const, v: ": " },
    { t: "str" as const, v: "'user'" },
    { t: "punct" as const, v: ", " },
    { t: "var" as const, v: "content" },
    { t: "punct" as const, v: ": " },
    { t: "str" as const, v: "'ping'" },
    { t: "punct" as const, v: " }]," },
  ],
  [
    { t: "txt" as const, v: "  " },
    { t: "var" as const, v: "relay" },
    { t: "punct" as const, v: ": { " },
    { t: "var" as const, v: "fallback" },
    { t: "punct" as const, v: ": " },
    { t: "str" as const, v: "'gpt-4o'" },
    { t: "punct" as const, v: ", " },
    { t: "var" as const, v: "cache" },
    { t: "punct" as const, v: ": " },
    { t: "str" as const, v: "'semantic'" },
    { t: "punct" as const, v: " }," },
  ],
  [{ t: "punct" as const, v: "});" }],
];

export function Hero() {
  return (
    <section className="relative isolate min-h-screen overflow-hidden pt-24">
      <Aurora />
      <Spotlight />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 pt-16 pb-32 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pt-24">
        <div className="flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Badge>
              <span className="text-fg">Private beta</span>
              <span className="text-muted">·</span>
              <span>Built on Cloudflare Workers</span>
            </Badge>
          </motion.div>

          <h1 className="mt-7 max-w-2xl text-balance text-[clamp(2.5rem,6vw,4.75rem)] font-medium leading-[1.02] tracking-[-0.03em] text-fg">
            <RevealWords text="Your AI agents" />
            <br />
            <RevealWords text="never go" delay={0.1} />{" "}
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-display italic text-gradient-accent"
            >
              down.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-6 max-w-xl text-pretty text-lg text-muted"
          >
            Relay is the reliable delivery layer for LLM APIs. One line of code
            adds automatic retry, provider failover, smart caching and a live
            dashboard — so your product stays up even when Anthropic and OpenAI
            don&apos;t.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <GradientButton href="#waitlist">
              Join waitlist
              <IconArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </GradientButton>
            <GradientButton href="#how" variant="ghost">
              <IconBrandGithub size={16} />
              View on GitHub
            </GradientButton>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted"
          >
            <Bullet>Drop-in Anthropic SDK replacement</Bullet>
            <Bullet>Edge proxy &lt; 30ms overhead</Bullet>
            <Bullet>BYOK — your keys, encrypted</Bullet>
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: -8 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center"
          style={{ perspective: 1200 }}
        >
          <div className="relative w-full">
            <div
              aria-hidden
              className="absolute -inset-6 -z-10 rounded-[28px] bg-gradient-to-tr from-accent/30 via-accent-2/20 to-accent-3/20 blur-3xl"
            />
            <CodeBlock
              title="agent.ts"
              badge={<LiveBadge />}
              lines={heroLines}
              glow
            />
            <FloatingChip
              className="absolute -left-6 top-12"
              label="Anthropic down"
              status="degraded"
              delay={1.1}
            />
            <FloatingChip
              className="absolute -right-4 top-1/2"
              label="Failover → OpenAI"
              status="ok"
              delay={1.3}
            />
            <FloatingChip
              className="absolute -bottom-6 left-1/3"
              label="Cache hit · 38ms"
              status="cache"
              delay={1.5}
            />
          </div>
        </motion.div>
      </div>

      <StatsStrip />
    </section>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="inline-flex items-center gap-2">
      <IconCircleCheckFilled size={14} className="text-success" />
      {children}
    </li>
  );
}

function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-success">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inset-0 animate-ping rounded-full bg-success" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
      </span>
      Live
    </span>
  );
}

function FloatingChip({
  className,
  label,
  status,
  delay,
}: {
  className?: string;
  label: string;
  status: "ok" | "degraded" | "cache";
  delay: number;
}) {
  const palette = {
    ok: "border-success/30 bg-success/10 text-success",
    degraded: "border-danger/30 bg-danger/10 text-danger",
    cache: "border-accent/30 bg-accent/10 text-accent",
  }[status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`pointer-events-none absolute z-20 inline-flex items-center gap-2 rounded-full border bg-bg-soft/80 px-3 py-1.5 text-xs font-medium backdrop-blur-md shadow-[0_8px_24px_-8px_rgba(0,0,0,0.6)] ${palette} ${className ?? ""}`}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inset-0 animate-pulse-dot rounded-full bg-current" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
      </span>
      {label}
    </motion.div>
  );
}

function StatsStrip() {
  const stats = [
    { v: "99.99%", l: "Effective uptime" },
    { v: "< 30ms", l: "Edge overhead" },
    { v: "47%", l: "Failed calls saved" },
    { v: "5+", l: "Providers covered" },
  ];
  return (
    <div className="relative mx-auto max-w-6xl px-6">
      <div className="grid grid-cols-2 gap-4 rounded-2xl border border-border bg-white/[0.02] p-2 backdrop-blur sm:grid-cols-4 sm:gap-0 sm:p-0">
        {stats.map((s, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center px-4 py-6 sm:border-r sm:border-border last:sm:border-r-0"
          >
            <div className="font-display text-3xl text-fg sm:text-4xl">
              {s.v}
            </div>
            <div className="mt-1 text-xs uppercase tracking-wider text-muted">
              {s.l}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
