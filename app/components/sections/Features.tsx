"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Reveal } from "../ui/Reveal";

interface Feature {
  tag: string;
  title: string;
  body: string;
  evidence: string;
}

const features: Feature[] = [
  {
    tag: "Failover",
    title: "Automatic provider failover, no model mapping required.",
    body: "When Anthropic returns 5xx, Relay routes the next attempt to OpenAI — or any chain you configure per request. Model ids are translated on the way out, so you keep writing claude-sonnet-4-6 either way.",
    evidence: "claude-sonnet-4-6  →  gpt-4o   on 529",
  },
  {
    tag: "Retry",
    title: "Exponential backoff with decorrelated jitter.",
    body: "Decorrelated jitter (the algorithm AWS uses internally) prevents retry storms when a whole region 429s at once. Configurable per request, surfaced on every response.",
    evidence: "attempt 1  →  250ms  →  612ms  →  1.4s",
  },
  {
    tag: "Cache",
    title: "Smart caching for repeat prompts.",
    body: "Exact-match on day one. Semantic caching with embeddings on Hobby and up. Stop paying twice for prompts that arrive twice — most agent loops hit the same system message four times a session.",
    evidence: "cache hit · 4ms · $0",
  },
  {
    tag: "Telemetry",
    title: "Every request lands in your dashboard.",
    body: "Latency, cost, cache hit rate, retries, failover events — searchable, filterable, streaming as it happens. The data layer is open: read it through Supabase if you'd rather build your own.",
    evidence: "msg_8adac369   200   p95=487ms",
  },
  {
    tag: "BYOK",
    title: "Bring your own keys, encrypted at rest.",
    body: "You keep paying Anthropic and OpenAI directly — Relay never sees the invoice. Your provider keys live encrypted in Cloudflare KV and only decrypt inside the edge worker at request time. They are never written to logs.",
    evidence: "keys encrypted · never logged",
  },
  {
    tag: "Edge",
    title: "Global edge proxy, under thirty milliseconds.",
    body: "Runs on Cloudflare Workers across 300+ cities. The proxy executes in the region geographically closest to your user, so we add ~28ms p95 — less than most Postgres connections.",
    evidence: "~28ms p95 · 300+ cities · workers",
  },
];

export function Features() {
  return (
    <section id="features" className="relative border-b border-border py-32">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
            — What you get
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="heading-tight mt-5 max-w-[920px] text-balance text-[clamp(2rem,4.8vw,3.75rem)] font-medium text-fg">
            Six features.{" "}
            <em className="font-display italic text-fg-dim">One install.</em>
          </h2>
        </Reveal>

        <ul className="mt-20 divide-y divide-border border-y border-border">
          {features.map((f, i) => (
            <FeatureRow key={f.tag} feature={f} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function FeatureRow({ feature, index }: { feature: Feature; index: number }) {
  const ref = useRef<HTMLLIElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="grid grid-cols-1 gap-x-12 gap-y-6 py-12 lg:grid-cols-[180px_1fr_280px] lg:items-baseline"
    >
      <div className="font-mono text-[12px] uppercase tracking-[0.22em] text-muted">
        <span className="text-fg">0{index + 1}</span>
        <span className="mx-2 text-border-strong">/</span>
        <span>{feature.tag}</span>
      </div>

      <div>
        <h3 className="heading-tight text-balance text-[clamp(1.5rem,2.8vw,2.1rem)] font-medium text-fg">
          {feature.title}
        </h3>
        <p className="mt-4 max-w-[640px] text-pretty text-[16.5px] leading-relaxed text-fg-dim">
          {feature.body}
        </p>
      </div>

      <div className="font-mono text-[12.5px] leading-snug text-muted lg:text-right">
        <span className="select-all">{feature.evidence}</span>
      </div>
    </motion.li>
  );
}
