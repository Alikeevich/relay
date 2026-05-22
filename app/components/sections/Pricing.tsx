"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Reveal } from "../ui/Reveal";
import { cn } from "../../lib/cn";

type Plan = {
  name: string;
  tagline: string;
  priceMonthly: number;
  priceAnnual: number;
  highlight?: boolean;
  features: string[];
  notIncluded?: string[];
  cta: string;
};

const plans: Plan[] = [
  {
    name: "Free",
    tagline: "Hack on a side project.",
    priceMonthly: 0,
    priceAnnual: 0,
    features: [
      "1,000 requests / month",
      "Exact-match cache",
      "Anthropic + OpenAI failover",
      "Community support",
    ],
    cta: "Start free",
  },
  {
    name: "Hobby",
    tagline: "Indie devs shipping to real users.",
    priceMonthly: 19,
    priceAnnual: 15,
    features: [
      "50,000 requests / month",
      "Exact + semantic cache",
      "Streaming & SSE proxy",
      "Email support · 48h",
    ],
    cta: "Choose Hobby",
  },
  {
    name: "Pro",
    tagline: "Small teams in production.",
    priceMonthly: 49,
    priceAnnual: 39,
    highlight: true,
    features: [
      "250,000 requests / month",
      "Custom retry policies",
      "Multi-key routing",
      "Email support · 24h",
      "All Hobby features",
    ],
    cta: "Choose Pro",
  },
  {
    name: "Scale",
    tagline: "When downtime costs real money.",
    priceMonthly: 199,
    priceAnnual: 159,
    features: [
      "1,000,000 requests / month",
      "Custom cache rules",
      "Bring-your-own providers",
      "Priority support · 4h",
      "Dedicated Slack channel",
    ],
    cta: "Talk to us",
  },
];

export function Pricing() {
  const [annual, setAnnual] = useState(false);
  return (
    <section id="pricing" className="relative border-b border-border py-32">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-y-10 lg:flex-row lg:items-end">
          <div className="max-w-[640px]">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                — Pricing
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="heading-tight mt-5 text-balance text-[clamp(2rem,4.8vw,3.5rem)] font-medium text-fg">
                Free until you ship.{" "}
                <em className="font-display italic text-fg-dim">Then small.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 max-w-[480px] text-[16px] leading-relaxed text-fg-dim">
                You only pay for the proxy. Provider charges (Anthropic, OpenAI,
                Gemini) stay on your own card under BYOK.
              </p>
            </Reveal>
          </div>

          {/* Real toggle */}
          <BillingToggle annual={annual} onToggle={() => setAnnual((v) => !v)} />
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {plans.map((p, i) => (
            <PlanCard key={p.name} plan={p} annual={annual} delay={i * 0.05} />
          ))}
        </div>

        <p className="mt-12 max-w-[640px] text-[14px] leading-relaxed text-muted">
          Need more than 1M requests, on-prem, audit logs, SOC 2 questions?{" "}
          <a
            href="mailto:hello@relay.dev"
            className="text-fg underline underline-offset-4 hover:text-accent"
          >
            Email me directly
          </a>{" "}
          — I&apos;ll write a quote inside 24h.
        </p>
      </div>
    </section>
  );
}

function BillingToggle({
  annual,
  onToggle,
}: {
  annual: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="inline-flex items-center gap-3 border border-border bg-bg-soft p-1.5 font-mono text-[12px] uppercase tracking-[0.18em]">
      <button
        type="button"
        onClick={() => !annual || onToggle()}
        className={cn(
          "px-4 py-2 transition-colors",
          !annual ? "bg-fg text-bg" : "text-muted hover:text-fg",
        )}
      >
        monthly
      </button>
      <button
        type="button"
        onClick={() => annual || onToggle()}
        className={cn(
          "px-4 py-2 transition-colors",
          annual ? "bg-fg text-bg" : "text-muted hover:text-fg",
        )}
      >
        annual
        <span
          className={cn(
            "ml-2 inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] tracking-[0.12em]",
            annual
              ? "bg-bg text-[#7ee7b0]"
              : "bg-[#7ee7b0]/15 text-[#7ee7b0]",
          )}
        >
          −20%
        </span>
      </button>
    </div>
  );
}

function PlanCard({
  plan,
  annual,
  delay,
}: {
  plan: Plan;
  annual: boolean;
  delay: number;
}) {
  const price = annual ? plan.priceAnnual : plan.priceMonthly;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "relative flex flex-col p-7",
        plan.highlight
          ? "border-2 border-fg bg-bg-soft"
          : "border border-border bg-bg-soft/60 hover:border-border-strong",
      )}
    >
      {plan.highlight && (
        <span className="absolute -top-3 left-7 inline-flex items-center bg-fg px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-bg">
          most chosen
        </span>
      )}
      <div className="flex items-baseline justify-between">
        <span className="text-[17px] font-medium text-fg">{plan.name}</span>
        {plan.highlight && (
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#7ee7b0]">
            recommended
          </span>
        )}
      </div>
      <p className="mt-2 text-[13px] leading-relaxed text-muted">
        {plan.tagline}
      </p>

      <div className="mt-7 flex items-baseline gap-2">
        <span className="font-display text-[52px] font-medium leading-none text-fg">
          ${price}
        </span>
        <span className="text-[13px] text-muted">/ month</span>
      </div>
      {annual && plan.priceMonthly > 0 && (
        <p className="mt-1 font-mono text-[11px] text-muted">
          ${plan.priceMonthly} monthly · billed yearly
        </p>
      )}

      <ul className="mt-7 flex-1 space-y-3 text-[14px] text-fg-dim">
        {plan.features.map((f) => (
          <li key={f} className="flex items-baseline gap-3">
            <span className="select-none font-mono text-[12px] text-[#7ee7b0]">
              ✓
            </span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <a
        href="/signup"
        className={cn(
          "mt-10 inline-flex w-full items-center justify-between gap-2 px-4 py-3 text-[14px] font-medium transition-colors",
          plan.highlight
            ? "bg-fg text-bg hover:bg-accent hover:text-bg"
            : "border border-border bg-transparent text-fg hover:border-fg",
        )}
      >
        <span>{plan.cta}</span>
        <span aria-hidden>→</span>
      </a>
    </motion.div>
  );
}
