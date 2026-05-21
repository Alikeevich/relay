"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Reveal } from "../ui/Reveal";

type State =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "error"; message: string }
  | { kind: "success"; position: number; referral: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Editorial waitlist section — left column tells you what you're signing
 * up for, right column is the form. No aurora glow, no glass card, no
 * conic gradient border on success state. Confetti stays — it's a real
 * delight moment after a click, not chrome decoration.
 */
export function Waitlist() {
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState<boolean | null>(null);
  const [state, setState] = useState<State>({ kind: "idle" });
  const [copied, setCopied] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (email.length === 0) {
      setEmailValid(null);
      return;
    }
    setEmailValid(EMAIL_RE.test(email));
  }, [email]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state.kind === "loading") return;
    if (!EMAIL_RE.test(email)) {
      setState({
        kind: "error",
        message: "Hmm — that email doesn't look right.",
      });
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
    <section id="waitlist" className="relative border-b border-border py-32">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-[1fr_1.05fr]">
          {/* Left — editorial pitch */}
          <div>
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                — Waitlist
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="heading-tight mt-5 max-w-[480px] text-balance text-[clamp(2rem,4.5vw,3.5rem)] font-medium text-fg">
                Be the first to ship on a{" "}
                <em className="font-display italic text-fg-dim">reliable</em>{" "}
                LLM stack.
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-[420px] text-[16.5px] leading-relaxed text-fg-dim">
                Already have a provider key? Skip the queue —{" "}
                <a
                  href="/signup"
                  className="text-fg underline underline-offset-4 transition-colors hover:text-accent"
                >
                  generate a Relay key now
                </a>
                . Otherwise drop your email — I&apos;ll write to you the moment
                access opens, with six months of Pro on the house.
              </p>
            </Reveal>
          </div>

          {/* Right — form / success */}
          <div>
            <AnimatePresence mode="wait">
              {state.kind !== "success" ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <form
                    ref={formRef}
                    onSubmit={onSubmit}
                    noValidate
                    className="flex flex-col gap-3"
                  >
                    <input
                      type="text"
                      name="company"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden
                      className="absolute -left-[9999px] h-0 w-0 opacity-0"
                    />
                    <label className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                      your email
                    </label>
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@startup.dev"
                        disabled={state.kind === "loading"}
                        className={`w-full flex-1 border-b bg-transparent px-1 py-3 text-[18px] text-fg placeholder:text-muted/55 focus:outline-none ${
                          state.kind === "error"
                            ? "border-[#ff8593]"
                            : emailValid === true
                              ? "border-[#7ee7b0]"
                              : "border-border-strong focus:border-fg"
                        } disabled:opacity-70`}
                      />
                      <button
                        type="submit"
                        disabled={state.kind === "loading"}
                        className="inline-flex items-baseline justify-center gap-2 border-b border-fg pb-3 text-[14px] font-medium uppercase tracking-[0.18em] text-fg transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-70 sm:w-[180px]"
                      >
                        {state.kind === "loading" ? (
                          "joining…"
                        ) : (
                          <>
                            join waitlist <span aria-hidden>→</span>
                          </>
                        )}
                      </button>
                    </div>

                    <AnimatePresence>
                      {state.kind === "error" && (
                        <motion.div
                          key="err"
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

                  <Reveal delay={0.3}>
                    <div className="mt-10 grid grid-cols-3 border-t border-border pt-6 font-mono text-[12px] text-muted">
                      <Stat n="487" l="builders waiting" />
                      <Stat n="$0" l="setup cost" />
                      <Stat n="<5 min" l="to first call" />
                    </div>
                  </Reveal>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="border-t border-fg pt-6"
                >
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#7ee7b0]">
                    — you&apos;re on the list
                  </p>
                  <h3 className="mt-4 text-balance text-[28px] font-medium leading-tight text-fg">
                    Builder{" "}
                    <CountUp value={state.position} className="font-display" />{" "}
                    in the queue.
                  </h3>
                  <p className="mt-4 max-w-[460px] text-[15.5px] leading-relaxed text-fg-dim">
                    We&apos;ll email <span className="text-fg">{email}</span>{" "}
                    the moment access opens.
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
                        className="group flex flex-1 items-center justify-between gap-3 border border-border bg-transparent px-4 py-3 text-left font-mono text-[12.5px] text-muted transition-colors hover:border-border-strong hover:text-fg"
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
                        className="inline-flex items-baseline justify-center gap-2 border-b border-fg pb-2 font-mono text-[12px] uppercase tracking-[0.18em] text-fg transition-colors hover:border-accent hover:text-accent"
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
      <span className="font-display text-[22px] text-fg">{n}</span>
      <span className="mt-1 text-[11px] uppercase tracking-[0.16em]">{l}</span>
    </div>
  );
}

function CountUp({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
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
