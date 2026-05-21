"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Reveal } from "../ui/Reveal";

const faqs = [
  {
    q: "Do I have to give Relay my OpenAI / Anthropic keys?",
    a: "Yes — we run BYOK. You stay in control of your provider bills and rate limits, and we encrypt your keys at rest. They never leave the Cloudflare environment in plaintext.",
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
  const [open, setOpen] = useState<number>(0);
  return (
    <section id="faq" className="relative border-b border-border py-32">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-[260px_1fr]">
          <div>
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                — FAQ
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="heading-tight mt-5 text-balance text-[clamp(2rem,4.5vw,3.25rem)] font-medium text-fg">
                Honest{" "}
                <em className="font-display italic text-fg-dim">answers</em>,
                upfront.
              </h2>
            </Reveal>
          </div>

          <div className="border-t border-border">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <button
                  key={i}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="group block w-full border-b border-border py-7 text-left transition-colors hover:bg-white/[0.015]"
                >
                  <div className="flex items-start justify-between gap-6">
                    <span className="text-[18px] font-medium leading-snug text-fg">
                      {f.q}
                    </span>
                    <span
                      className={`mt-1 font-mono text-[18px] leading-none text-muted transition-colors ${isOpen ? "text-fg" : ""}`}
                      aria-hidden
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </div>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[640px] pt-4 text-[15.5px] leading-relaxed text-fg-dim">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
