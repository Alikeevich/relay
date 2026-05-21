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
    body: "Every call hits a Cloudflare Worker in 300+ cities. Cache lookup, retry policy and failover all happen before bytes leave the region nearest the user.",
    sample: "POST /v1/messages   →   ~28ms",
  },
  {
    n: "04",
    title: "Watch it stay up.",
    body: "Open the dashboard. Filter requests by status, model, latency or cost. The next outage shows up as a green failover row, not a red incident.",
    sample: "uptime 99.99%   failovers handled 137",
  },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

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
      </div>

      <div ref={sectionRef} className="relative mx-auto mt-20 max-w-[1280px] px-6 lg:px-10">
        {/* Vertical timeline rail at left rail */}
        <div
          aria-hidden
          className="absolute left-[calc(1.5rem+8px)] top-0 hidden h-full w-px bg-border md:block lg:left-[calc(2.5rem+8px)]"
        />
        <motion.div
          aria-hidden
          style={{ height: lineHeight }}
          className="absolute left-[calc(1.5rem+8px)] top-0 hidden w-px bg-fg md:block lg:left-[calc(2.5rem+8px)]"
        />

        <ol className="space-y-24 lg:pl-24">
          {steps.map((s, i) => (
            <Step key={i} step={s} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function Step({
  step,
  index,
}: {
  step: (typeof steps)[number];
  index: number;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.05 }}
      className="grid grid-cols-1 gap-x-12 gap-y-4 md:grid-cols-[80px_1fr]"
    >
      <div className="font-mono text-[12px] uppercase tracking-[0.22em] text-muted">
        Step {step.n}
      </div>
      <div>
        <h3 className="heading-tight text-balance text-[clamp(1.6rem,3vw,2.25rem)] font-medium text-fg">
          {step.title}
        </h3>
        <p className="mt-4 max-w-[600px] text-pretty text-[16.5px] leading-relaxed text-fg-dim">
          {step.body}
        </p>
        <p className="mt-6 font-mono text-[12.5px] text-muted">
          <span className="select-none text-border-strong">$&nbsp;</span>
          <span className="select-all">{step.sample}</span>
        </p>
      </div>
    </motion.li>
  );
}
