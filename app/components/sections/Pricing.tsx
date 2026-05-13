"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { IconCheck, IconSparkles } from "@tabler/icons-react";
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
    <section id="pricing" className="relative bg-bg py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.2em] text-muted">
            Pricing
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-4 max-w-3xl text-balance text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.02em] text-fg">
            Free until you ship.{" "}
            <span className="font-display italic text-gradient-accent">
              Then small.
            </span>
          </h2>
        </Reveal>

        <div className="mt-10 flex items-center gap-3">
          <span className={cn("text-sm", !annual ? "text-fg" : "text-muted")}>
            Monthly
          </span>
          <button
            type="button"
            aria-label="Toggle annual billing"
            onClick={() => setAnnual((v) => !v)}
            className="relative h-6 w-11 rounded-full border border-border bg-white/[0.04] transition-colors"
          >
            <motion.span
              layout
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={cn(
                "absolute top-[2px] h-[18px] w-[18px] rounded-full bg-gradient-to-br from-accent to-accent-2 shadow-[0_0_12px_rgba(167,139,250,0.5)]",
                annual ? "right-[2px]" : "left-[2px]"
              )}
            />
          </button>
          <span className={cn("text-sm", annual ? "text-fg" : "text-muted")}>
            Annual
            <span className="ml-2 inline-flex rounded-full border border-success/30 bg-success/10 px-2 py-0.5 text-[10px] font-medium text-success">
              -20%
            </span>
          </span>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {plans.map((p, i) => (
            <PlanCard key={p.name} plan={p} annual={annual} delay={i * 0.05} />
          ))}
        </div>
      </div>
    </section>
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
        "relative flex flex-col overflow-hidden rounded-3xl border p-7 transition-colors",
        plan.highlight
          ? "border-transparent bg-bg-soft"
          : "border-border bg-bg-soft hover:border-border-strong"
      )}
    >
      {plan.highlight && (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-br from-accent via-accent-3 to-accent-2 opacity-60"
            style={{
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              padding: 1,
            }}
          />
          <span className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-fg px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-bg">
            <IconSparkles size={11} />
            Popular
          </span>
        </>
      )}
      <div>
        <div className="text-sm font-medium uppercase tracking-wider text-muted">
          {plan.name}
        </div>
        <p className="mt-2 text-sm text-muted">{plan.tagline}</p>
      </div>
      <div className="mt-7 flex items-baseline gap-1.5">
        <span className="font-display text-5xl text-fg">${price}</span>
        <span className="text-sm text-muted">/ month</span>
      </div>

      <ul className="mt-7 space-y-3 text-sm">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-fg/90">
            <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-success/15 text-success">
              <IconCheck size={11} stroke={3} />
            </span>
            {f}
          </li>
        ))}
      </ul>

      <a
        href="#waitlist"
        className={cn(
          "mt-8 inline-flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-medium transition-all",
          plan.highlight
            ? "bg-fg text-bg hover:bg-fg/90"
            : "border border-border bg-white/[0.02] text-fg hover:border-border-strong hover:bg-white/[0.05]"
        )}
      >
        {plan.cta}
      </a>
    </motion.div>
  );
}
