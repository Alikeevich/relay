"use client";

import { FormEvent, useState } from "react";
import { motion } from "motion/react";
import { IconArrowRight, IconCircleCheckFilled } from "@tabler/icons-react";
import { Aurora } from "../ui/Aurora";
import { Reveal } from "../ui/Reveal";

export function Waitlist() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setState("loading");
    setTimeout(() => setState("done"), 700);
  }

  return (
    <section id="waitlist" className="relative isolate overflow-hidden py-32">
      <Aurora />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <h2 className="text-balance text-[clamp(2.25rem,6vw,4rem)] font-medium leading-[1.02] tracking-[-0.03em] text-fg">
            Be the first to ship on a{" "}
            <span className="font-display italic text-gradient-accent">
              reliable
            </span>{" "}
            LLM stack.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted">
            Join the private beta. Early signups get six months of Pro on the
            house when we open the gates.
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <form
            onSubmit={onSubmit}
            className="group mx-auto mt-10 flex max-w-xl flex-col gap-2 sm:flex-row"
          >
            <div className="relative flex-1">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@startup.dev"
                disabled={state !== "idle"}
                className="w-full rounded-full border border-border bg-white/[0.03] px-5 py-4 text-fg backdrop-blur placeholder:text-muted/60 focus:border-border-strong focus:outline-none focus:ring-2 focus:ring-accent/30"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-accent/20 via-accent-2/20 to-accent-3/20 opacity-0 blur-xl transition-opacity group-focus-within:opacity-100"
              />
            </div>
            <button
              type="submit"
              disabled={state !== "idle"}
              className="relative inline-flex items-center justify-center gap-2 rounded-full bg-fg px-6 py-4 text-sm font-medium text-bg transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-80"
            >
              {state === "done" ? (
                <>
                  <IconCircleCheckFilled size={16} className="text-success" />
                  You&apos;re in
                </>
              ) : (
                <>
                  {state === "loading" ? "Joining…" : "Join waitlist"}
                  <IconArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        </Reveal>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 flex items-center justify-center gap-6 text-xs text-muted"
        >
          <Stat n="487" l="builders waiting" />
          <span className="h-3 w-px bg-border" />
          <Stat n="$0" l="setup cost" />
          <span className="h-3 w-px bg-border" />
          <Stat n="<5 min" l="to first call" />
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="font-display text-base text-fg">{n}</span>
      <span className="text-muted">{l}</span>
    </span>
  );
}
