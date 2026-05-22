"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Reveal } from "../ui/Reveal";

const steps = [
  {
    n: "01",
    title: "Drop in the SDK.",
    body: "Swap @anthropic-ai/sdk for @relay-api/sdk. Same method signatures, same streaming. Your existing code keeps working — only the import line moves.",
    sample: "npm i @relay-api/sdk",
  },
  {
    n: "02",
    title: "Plug in your providers.",
    body: "Paste your Anthropic, OpenAI or Gemini keys at /signup. We encrypt them in Cloudflare KV at rest and never log plaintext. You can revoke any time.",
    sample: "anthropic ✓   openai ✓   gemini ✓",
  },
  {
    n: "03",
    title: "Ship through the edge.",
    body: "Every call hits a Cloudflare Worker in 300+ cities. Cache lookup, retry policy and failover happen before bytes leave the region nearest the user.",
    sample: "POST /v1/messages   →   ~28ms",
  },
  {
    n: "04",
    title: "Watch it stay up.",
    body: "Open the dashboard. Filter requests by status, model, latency or cost. The next outage shows as a green failover row, not a red incident.",
    sample: "uptime 99.99%   failovers handled 137",
  },
];

export function HowItWorks() {
  const railRef = useRef<HTMLOListElement | null>(null);
  // Scroll progress through the steps container — drives the filled rail.
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 80%", "end 30%"],
  });
  const filled = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="how" className="relative border-b border-border py-32">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
            — How it works
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="heading-tight mt-5 max-w-3xl text-balance text-[clamp(2rem,4.8vw,3.5rem)] font-medium text-fg">
            From <span className="font-mono text-fg">npm i</span> to{" "}
            <em className="font-display italic text-fg-dim">
              first reliable call
            </em>{" "}
            in four steps.
          </h2>
        </Reveal>

        {/* Steps with a real rail. Number sits in a flex item next to the
            rail, so the rail is naturally aligned with the digits. */}
        <ol ref={railRef} className="mt-20 flex flex-col gap-20">
          {steps.map((s, i) => (
            <Step
              key={s.n}
              step={s}
              index={i}
              last={i === steps.length - 1}
              filled={filled}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}

function Step({
  step,
  index,
  last,
  filled,
}: {
  step: (typeof steps)[number];
  index: number;
  last: boolean;
  filled: ReturnType<typeof useTransform<string, string>>;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.04 }}
      className="grid grid-cols-[28px_1fr] gap-x-8 md:grid-cols-[80px_1fr] md:gap-x-12"
    >
      {/* Number column owns the rail. The rail is a 1px line behind the
          number with a filled overlay clipped by the scroll progress. */}
      <div className="relative flex flex-col items-center">
        {/* Step number badge */}
        <div className="relative z-10 flex h-10 w-10 items-center justify-center border border-border bg-bg font-mono text-[12px] uppercase tracking-[0.18em] text-fg">
          {step.n}
        </div>
        {!last && (
          <div className="relative mt-1 w-px flex-1 overflow-hidden">
            <div className="absolute inset-0 bg-border" />
            <motion.div
              style={{ height: filled }}
              className="absolute inset-x-0 top-0 bg-fg"
            />
          </div>
        )}
      </div>

      <div className="pt-1">
        <h3 className="heading-tight text-balance text-[clamp(1.6rem,3vw,2.25rem)] font-medium text-fg">
          {step.title}
        </h3>
        <p className="mt-4 max-w-[600px] text-pretty text-[16.5px] leading-relaxed text-fg-dim">
          {step.body}
        </p>
        <p className="mt-6 inline-block border border-border bg-bg-soft px-3 py-1.5 font-mono text-[12.5px] text-fg-dim">
          <span className="select-none text-muted">$&nbsp;</span>
          <span className="select-all">{step.sample}</span>
        </p>
      </div>
    </motion.li>
  );
}
