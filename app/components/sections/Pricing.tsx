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
    ],
    cta: "Talk to us",
  },
];

export function Pricing() {
  const [annual, setAnnual] = useState(false);
  return (
    <section id="pricing" className="relative border-b border-border py-32">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="grid grid-cols-1 items-end gap-x-16 gap-y-10 lg:grid-cols-[1fr_auto]">
          <div>
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                — Pricing
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="heading-tight mt-5 max-w-3xl text-balance text-[clamp(2rem,4.5vw,3.5rem)] font-medium text-fg">
                Free until you ship.{" "}
                <em className="font-display italic text-fg-dim">Then small.</em>
              </h2>
            </Reveal>
          </div>

          {/* Billing toggle */}
          <div className="flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.16em]">
            <button
              type="button"
              onClick={() => setAnnual(false)}
              className={cn(
                "border-b pb-1 transition-colors",
                !annual ? "border-fg text-fg" : "border-transparent text-muted hover:text-fg",
              )}
            >
              monthly
            </button>
            <button
              type="button"
              onClick={() => setAnnual(true)}
              className={cn(
                "border-b pb-1 transition-colors",
                annual ? "border-fg text-fg" : "border-transparent text-muted hover:text-fg",
              )}
            >
              annual&nbsp;<span className="text-[#7ee7b0]">−20%</span>
            </button>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 divide-y divide-border border-y border-border md:grid-cols-2 md:divide-x md:divide-y-0 xl:grid-cols-4">
          {plans.map((p, i) => (
            <PlanColumn key={p.name} plan={p} annual={annual} delay={i * 0.05} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PlanColumn({
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
      className="relative flex flex-col p-8"
    >
      {plan.highlight && (
        <span className="absolute right-8 top-8 font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
          most chosen
        </span>
      )}
      <div className="text-[15px] font-medium text-fg">{plan.name}</div>
      <p className="mt-2 text-[13px] leading-relaxed text-muted">{plan.tagline}</p>

      <div className="mt-8 flex items-baseline gap-2">
        <span className="font-display text-[44px] font-medium leading-none text-fg">
          ${price}
        </span>
        <span className="text-[13px] text-muted">/ month</span>
      </div>

      <ul className="mt-7 space-y-3 text-[14px] text-fg-dim">
        {plan.features.map((f) => (
          <li key={f} className="flex items-baseline gap-3">
            <span className="select-none font-mono text-[11px] text-muted">·</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <a
        href="/signup"
        className={cn(
          "mt-10 inline-flex items-baseline gap-2 border-b pb-1 text-[14px] font-medium underline-offset-4",
          plan.highlight
            ? "border-fg text-fg hover:border-accent hover:text-accent"
            : "border-border text-muted hover:border-fg hover:text-fg",
        )}
      >
        {plan.cta}
        <span aria-hidden>→</span>
      </a>
    </motion.div>
  );
}
