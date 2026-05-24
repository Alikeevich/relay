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
  const railRef = useRef<HTMLDivElement | null>(null);
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

        <div ref={railRef} className="relative mt-20">
          {/* ── Single continuous rail running through every step badge.
               Lives outside the <ol> so it's one element, not four
               segments. The badges (h-10 = 40px) are positioned in the
               first column with center at x=20px, so rail sits at
               left=20px. The visible track starts at the centre of the
               FIRST badge and ends at the centre of the LAST badge,
               clipped via the wrapper's top-5 / bottom-5 inset. */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-5 top-5 bottom-5 w-px overflow-hidden"
          >
            <div className="absolute inset-0 bg-border" />
            <motion.div
              style={{ height: filled }}
              className="absolute inset-x-0 top-0 bg-fg"
            />
          </div>

          <ol className="relative space-y-20">
            {steps.map((s, i) => (
              <Step key={s.n} step={s} index={i} />
            ))}
          </ol>
        </div>
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
      transition={{ duration: 0.7, delay: index * 0.04 }}
      className="flex gap-6 md:gap-12"
    >
      {/* Badge — solid bg-bg so it visually breaks the rail behind it */}
      <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center border border-border bg-bg font-mono text-[12px] uppercase tracking-[0.18em] text-fg">
        {step.n}
      </div>
      <div className="flex-1 pt-1">
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
