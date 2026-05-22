"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Reveal } from "../ui/Reveal";

type State =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "error"; message: string }
  | { kind: "success"; position: number; referral: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Waitlist — pitched as a personal note from the founder.
 *
 * Big block of warm copy on the left, focused form panel on the right.
 * No aurora, no glass — but the form has weight: solid card, prominent
 * CTA, real expectation of what the user gets back. Confetti stays.
 */
export function Waitlist() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>({ kind: "idle" });
  const [copied, setCopied] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  // Inline derivation — no useEffect needed.
  const emailValid = useMemo<boolean | null>(() => {
    if (email.length === 0) return null;
    return EMAIL_RE.test(email);
  }, [email]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state.kind === "loading") return;
    if (!EMAIL_RE.test(email)) {
      setState({ kind: "error", message: "That email doesn't look right." });
      return;
    }
    const fd = new FormData(formRef.current!);
    const company = (fd.get("company") as string) ?? "";

    setState({ kind: "loading" });
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, company }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        setState({
          kind: "error",
          message: data?.error ?? "Something broke. Try again in a moment.",
        });
        return;
      }
      const referral = `https://relay-sdk.vercel.app/?ref=${encodeURIComponent(
        email.split("@")[0]!.slice(0, 8),
      )}`;
      setState({ kind: "success", position: data.position ?? 487, referral });
      fireConfetti();
    } catch {
      setState({
        kind: "error",
        message: "Network hiccup. Check your connection and try again.",
      });
    }
  }

  function copyReferral() {
    if (state.kind !== "success") return;
    navigator.clipboard.writeText(state.referral).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }

  function shareOnX() {
    if (state.kind !== "success") return;
    const text = encodeURIComponent(
      "I just joined the waitlist for Relay — the reliable delivery layer for LLM APIs. Auto retry, failover, caching. One line of code.",
    );
    const url = encodeURIComponent(state.referral);
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <section
      id="waitlist"
      className="relative isolate overflow-hidden border-b border-border py-32"
    >
      {/* Subtle grain + accent glare on this section so it reads as a
          "warm" moment rather than a sterile form. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="glare opacity-50" />
        <div className="grain absolute inset-0" />
      </div>

      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-[1.1fr_1fr]">
          {/* ── Left: founder note ──────────────────────────── */}
          <div>
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                — Waitlist
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="heading-tight mt-5 max-w-[560px] text-balance text-[clamp(2rem,4.8vw,3.5rem)] font-medium text-fg">
                Be the first to ship on a{" "}
                <em className="font-display italic text-accent-em">
                  reliable
                </em>{" "}
                LLM stack.
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-7 max-w-[500px] space-y-5 text-[16.5px] leading-[1.6] text-fg-dim">
                <p>
                  I&apos;m Alikhan. I&apos;m hand-onboarding the first hundred
                  builders myself — pairing on the integration, listening to
                  the bugs that ate your evening, shipping fixes the same day.
                </p>
                <p>
                  Drop your email. You&apos;ll hear from me when access opens
                  — usually within a week — with{" "}
                  <span className="text-fg">six months of Pro on the house</span>{" "}
                  and a short ask: what reliability pain do you wish would
                  vanish first?
                </p>
                <p className="font-display italic text-fg">— Alikhan</p>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-9 inline-block">
                <a
                  href="/signup"
                  className="inline-flex items-baseline gap-2 border-b border-border pb-1 font-mono text-[12px] uppercase tracking-[0.22em] text-muted transition-colors hover:border-fg hover:text-fg"
                >
                  already have a provider key? skip the queue →
                </a>
              </div>
            </Reveal>
          </div>

          {/* ── Right: form ─────────────────────────────────── */}
          <div>
            <AnimatePresence mode="wait">
              {state.kind !== "success" ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="border border-border bg-bg-soft p-8"
                >
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                    — Join the waitlist
                  </p>
                  <h3 className="heading-tight mt-3 text-[22px] font-medium text-fg">
                    Get an early-access invite.
                  </h3>

                  <form
                    ref={formRef}
                    onSubmit={onSubmit}
                    noValidate
                    className="mt-7 flex flex-col gap-4"
                  >
                    <input
                      type="text"
                      name="company"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden
                      className="absolute -left-[9999px] h-0 w-0 opacity-0"
                    />

                    <label className="flex flex-col gap-2">
                      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                        your email
                      </span>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@startup.dev"
                        disabled={state.kind === "loading"}
                        className={`w-full border-b bg-transparent px-1 py-2.5 text-[17px] text-fg placeholder:text-muted/55 focus:outline-none ${
                          state.kind === "error"
                            ? "border-[#ff8593]"
                            : emailValid === true
                              ? "border-[#7ee7b0]"
                              : "border-border-strong focus:border-fg"
                        } disabled:opacity-70`}
                      />
                    </label>

                    <button
                      type="submit"
                      disabled={state.kind === "loading"}
                      className="mt-4 inline-flex w-full items-center justify-between gap-3 bg-fg px-4 py-3.5 text-[14px] font-medium text-bg transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <span>
                        {state.kind === "loading"
                          ? "joining…"
                          : "Send me an invite"}
                      </span>
                      <span aria-hidden>→</span>
                    </button>

                    <AnimatePresence>
                      {state.kind === "error" && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="font-mono text-[12px] text-[#ff8593]"
                        >
                          ! {state.message}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </form>

                  <div className="mt-7 grid grid-cols-3 gap-4 border-t border-border pt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                    <Stat n="487" l="builders waiting" />
                    <Stat n="$0" l="setup cost" />
                    <Stat n="<5 min" l="to first call" />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="border border-fg bg-bg-soft p-8"
                >
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#7ee7b0]">
                    — you&apos;re on the list
                  </p>
                  <h3 className="heading-tight mt-3 text-[28px] font-medium leading-tight text-fg">
                    Builder{" "}
                    <CountUp value={state.position} className="font-display" />{" "}
                    in the queue.
                  </h3>
                  <p className="mt-4 max-w-[460px] text-[15.5px] leading-relaxed text-fg-dim">
                    Invite lands at <span className="text-fg">{email}</span>{" "}
                    when access opens — usually within a week.
                  </p>

                  <div className="mt-8 border-t border-border pt-6">
                    <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                      — skip the line
                    </p>
                    <p className="mt-3 max-w-[460px] text-[14px] leading-relaxed text-fg-dim">
                      Every builder who joins through your link moves you up.
                    </p>
                    <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                      <button
                        onClick={copyReferral}
                        className="group flex flex-1 items-center justify-between gap-3 border border-border bg-bg px-4 py-3 text-left font-mono text-[12.5px] text-muted transition-colors hover:border-fg hover:text-fg"
                      >
                        <span className="truncate">
                          {state.referral.replace(/^https?:\/\//, "")}
                        </span>
                        <span
                          className={`shrink-0 uppercase tracking-[0.18em] ${
                            copied ? "text-[#7ee7b0]" : "text-fg"
                          }`}
                        >
                          {copied ? "copied" : "copy"}
                        </span>
                      </button>
                      <button
                        onClick={shareOnX}
                        className="inline-flex items-center justify-center gap-2 bg-fg px-5 py-3 font-mono text-[12px] uppercase tracking-[0.18em] text-bg transition-colors hover:bg-accent"
                      >
                        share on x <span aria-hidden>→</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div className="flex flex-col">
      <span className="font-display text-[22px] normal-case text-fg">{n}</span>
      <span className="mt-1">{l}</span>
    </div>
  );
}

function CountUp({ value, className }: { value: number; className?: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const duration = 900;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <span className={className}>#{n.toLocaleString()}</span>;
}

async function fireConfetti() {
  const { default: confetti } = await import("canvas-confetti");
  const defaults = {
    spread: 65,
    ticks: 80,
    gravity: 0.9,
    decay: 0.93,
    startVelocity: 36,
    scalar: 1.05,
    colors: ["#a78bfa", "#22d3ee", "#7ee7b0", "#ffffff"],
  };
  confetti({ ...defaults, particleCount: 80, origin: { x: 0.5, y: 0.55 } });
  setTimeout(
    () => confetti({ ...defaults, particleCount: 50, angle: 60, origin: { x: 0, y: 0.7 } }),
    180,
  );
  setTimeout(
    () => confetti({ ...defaults, particleCount: 50, angle: 120, origin: { x: 1, y: 0.7 } }),
    260,
  );
}
