"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Reveal } from "../ui/Reveal";

const steps = [
  {
    n: "01",
    title: "Drop-in the SDK",
    body: "Swap @anthropic-ai/sdk for @relay/sdk. Same method signatures, same streaming. Your existing code keeps working.",
    sample: "npm i @relay/sdk",
  },
  {
    n: "02",
    title: "Plug in your providers",
    body: "Paste your Anthropic and OpenAI keys into the dashboard. We encrypt them with AES-256-GCM and never log plaintext.",
    sample: "Anthropic ✓   OpenAI ✓   Mistral ✓",
  },
  {
    n: "03",
    title: "Ship through the edge",
    body: "Every call hits a Cloudflare Worker in 300+ cities. Cache lookup, retry policy and failover happen before bytes leave the region.",
    sample: "POST /v1/messages   →   ~28ms",
  },
  {
    n: "04",
    title: "Watch it stay up",
    body: "Open the dashboard. Filter requests by status, model, latency or cost. The next outage shows up as a green failover chip.",
    sample: "uptime 99.99% · failovers handled 137",
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
    <section id="how" className="relative bg-bg py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.2em] text-muted">
            How it works
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-4 max-w-3xl text-balance text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.02em] text-fg">
            From <span className="font-mono text-fg">npm i</span> to{" "}
            <span className="font-display italic text-gradient-accent">
              first reliable call
            </span>{" "}
            in four steps.
          </h2>
        </Reveal>
      </div>

      <div
        ref={sectionRef}
        className="relative mx-auto mt-16 max-w-5xl px-6"
      >
        <div className="absolute left-[calc(1.5rem+40px)] top-0 hidden h-full w-px -translate-x-1/2 bg-border md:block lg:left-[calc(1.5rem+50px)]" />
        <motion.div
          style={{ height: lineHeight }}
          className="absolute left-[calc(1.5rem+40px)] top-0 hidden w-px -translate-x-1/2 bg-gradient-to-b from-accent via-accent-2 to-transparent md:block lg:left-[calc(1.5rem+50px)]"
        />

        <div className="space-y-24">
          {steps.map((s, i) => (
            <Step key={i} step={s} index={i} />
          ))}
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
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 30%"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const glow = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <div ref={ref} className="grid grid-cols-1 gap-6 md:grid-cols-[80px_1fr] md:gap-10 lg:grid-cols-[100px_1fr]">
      <div className="flex justify-start md:justify-center">
        <motion.div
          style={{ scale }}
          className="relative flex h-[68px] w-[68px] items-center justify-center rounded-2xl border border-border bg-bg-soft font-display text-2xl text-fg"
        >
          <motion.div
            style={{ opacity: glow }}
            aria-hidden
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/40 to-accent-2/40 blur-xl"
          />
          <span className="relative">{step.n}</span>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay: index * 0.05 }}
        className="pt-3"
      >
        <h3 className="text-2xl font-medium tracking-tight text-fg md:text-3xl">
          {step.title}
        </h3>
        <p className="mt-3 max-w-xl text-pretty text-muted md:text-lg">
          {step.body}
        </p>
        <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.03] px-4 py-2 font-mono text-xs text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-2" />
          {step.sample}
        </div>
      </motion.div>
    </div>
  );
}
