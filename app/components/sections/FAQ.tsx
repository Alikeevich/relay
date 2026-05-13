"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IconPlus } from "@tabler/icons-react";
import { Reveal } from "../ui/Reveal";
import { cn } from "../../lib/cn";

const faqs = [
  {
    q: "Do I have to give Relay my OpenAI / Anthropic keys?",
    a: "Yes — we run BYOK. You stay in control of your provider bills and rate limits, and we encrypt your keys at rest with AES-256-GCM. They never leave the Cloudflare environment in plaintext.",
  },
  {
    q: "How is this different from OpenRouter or Helicone?",
    a: "OpenRouter is about model selection — picking the cheapest provider for a call. Helicone is observability — telling you what already happened. Relay is delivery: keeping requests succeeding when providers fail, retrying with the right jitter, and caching identical calls.",
  },
  {
    q: "What's the latency overhead?",
    a: "We measure ~28ms p95 from Cloudflare Workers, plus your normal call to the provider. The proxy is colocated with users — no transatlantic detour.",
  },
  {
    q: "Does streaming still work?",
    a: "Yes. SSE passes through Relay unmodified. You get tokens at the same speed you would directly from Anthropic or OpenAI.",
  },
  {
    q: "What happens when you go down?",
    a: "We don't host your model — providers do. If Relay's edge somehow fails, the SDK has a passthrough mode that falls back to direct provider calls so your product keeps responding.",
  },
  {
    q: "Can I use it from Python?",
    a: "TypeScript SDK ships first. A Python SDK lands the week after launch — both wrap the same HTTP API, so you can also call /v1/messages directly today.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="relative bg-bg py-32">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.2em] text-muted">
            FAQ
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-4 max-w-3xl text-balance text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.02em] text-fg">
            The honest answers,{" "}
            <span className="font-display italic text-gradient-accent">
              upfront.
            </span>
          </h2>
        </Reveal>

        <div className="mt-12 divide-y divide-border rounded-3xl border border-border bg-bg-soft">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <button
                key={i}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="group block w-full px-6 py-6 text-left transition-colors hover:bg-white/[0.02]"
              >
                <div className="flex items-start justify-between gap-6">
                  <span className="text-lg font-medium text-fg">{f.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 22,
                    }}
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-white/[0.03] transition-colors",
                      isOpen && "border-border-strong bg-white/[0.06]"
                    )}
                  >
                    <IconPlus size={14} className="text-fg" />
                  </motion.span>
                </div>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.35,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 text-pretty text-muted">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
