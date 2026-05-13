"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  IconArrowRight,
  IconCheck,
  IconCopy,
  IconBrandX,
  IconAlertCircle,
} from "@tabler/icons-react";
import { Aurora } from "../ui/Aurora";
import { Reveal } from "../ui/Reveal";

type State =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "error"; message: string }
  | { kind: "success"; position: number; referral: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function Waitlist() {
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState<boolean | null>(null);
  const [state, setState] = useState<State>({ kind: "idle" });
  const [copied, setCopied] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  // Inline email validity feedback (only after the user starts typing).
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
    const company = (fd.get("company") as string) ?? ""; // honeypot

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

      const referral = `https://relay.dev/?ref=${encodeURIComponent(
        email.split("@")[0]!.slice(0, 8),
      )}`;

      setState({
        kind: "success",
        position: data.position ?? 487,
        referral,
      });
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
      `I just joined the waitlist for Relay — the reliable delivery layer for LLM APIs. Auto retry, failover, caching. One line of code.`,
    );
    const url = encodeURIComponent(state.referral);
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      "_blank",
      "noopener,noreferrer",
    );
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

        <AnimatePresence mode="wait">
          {state.kind !== "success" ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <Reveal delay={0.18}>
                <form
                  ref={formRef}
                  onSubmit={onSubmit}
                  noValidate
                  className="group mx-auto mt-10 flex max-w-xl flex-col gap-2 sm:flex-row"
                >
                  {/* Honeypot for bots — invisible to humans, accessible to none */}
                  <input
                    type="text"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden
                    className="absolute -left-[9999px] h-0 w-0 opacity-0"
                  />
                  <div className="relative flex-1">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@startup.dev"
                      disabled={state.kind === "loading"}
                      className={`w-full rounded-full border bg-white/[0.03] px-5 py-4 pr-12 text-fg backdrop-blur placeholder:text-muted/60 focus:outline-none focus:ring-2 ${
                        state.kind === "error"
                          ? "border-danger/60 focus:ring-danger/30"
                          : emailValid === true
                            ? "border-success/50 focus:ring-success/30"
                            : "border-border focus:border-border-strong focus:ring-accent/30"
                      } disabled:cursor-not-allowed disabled:opacity-70`}
                    />
                    <AnimatePresence>
                      {emailValid === true && state.kind !== "error" && (
                        <motion.span
                          key="ok"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-success"
                        >
                          <IconCheck size={18} stroke={3} />
                        </motion.span>
                      )}
                    </AnimatePresence>
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-accent/20 via-accent-2/20 to-accent-3/20 opacity-0 blur-xl transition-opacity group-focus-within:opacity-100"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={state.kind === "loading"}
                    className="relative inline-flex min-w-[160px] items-center justify-center gap-2 overflow-hidden rounded-full bg-fg px-6 py-4 text-sm font-medium text-bg transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-80"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                    />
                    {state.kind === "loading" ? (
                      <>
                        <Spinner />
                        Joining…
                      </>
                    ) : (
                      <>
                        Join waitlist
                        <IconArrowRight size={16} />
                      </>
                    )}
                  </button>
                </form>
              </Reveal>

              <AnimatePresence>
                {state.kind === "error" && (
                  <motion.div
                    key="err"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="mt-3 inline-flex items-center gap-2 rounded-full border border-danger/30 bg-danger/10 px-4 py-1.5 text-sm text-danger"
                  >
                    <IconAlertCircle size={14} />
                    {state.message}
                  </motion.div>
                )}
              </AnimatePresence>

              <Reveal delay={0.3}>
                <div className="mt-8 flex items-center justify-center gap-6 text-xs text-muted">
                  <Stat n="487" l="builders waiting" />
                  <span className="h-3 w-px bg-border" />
                  <Stat n="$0" l="setup cost" />
                  <span className="h-3 w-px bg-border" />
                  <Stat n="<5 min" l="to first call" />
                </div>
              </Reveal>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto mt-12 max-w-xl rounded-3xl border border-border bg-bg-soft/80 p-8 backdrop-blur"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-br from-accent/40 via-accent-2/40 to-accent-3/40 opacity-60"
                style={{
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                  padding: 1,
                }}
              />
              <div className="relative">
                <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full border border-success/40 bg-success/10 text-success">
                  <IconCheck size={22} stroke={3} />
                </div>
                <h3 className="mt-5 text-balance text-2xl font-medium text-fg">
                  You&apos;re on the list.
                </h3>
                <p className="mt-3 text-muted">
                  You&apos;re builder{" "}
                  <CountUp value={state.position} className="font-display text-fg" />{" "}
                  in the queue. We&apos;ll email{" "}
                  <span className="text-fg">{email}</span> the moment access
                  opens.
                </p>

                <div className="mt-7">
                  <div className="mb-3 text-xs uppercase tracking-[0.2em] text-muted">
                    Skip the line
                  </div>
                  <p className="mb-4 text-sm text-muted">
                    Every builder who joins through your link bumps you up.
                  </p>

                  <div className="flex flex-col gap-2 sm:flex-row">
                    <button
                      onClick={copyReferral}
                      className="group inline-flex flex-1 items-center justify-between gap-2 rounded-full border border-border bg-bg/40 px-4 py-3 text-left text-sm transition-colors hover:border-border-strong hover:bg-white/[0.04]"
                    >
                      <span className="truncate font-mono text-xs text-muted">
                        {state.referral.replace(/^https?:\/\//, "")}
                      </span>
                      <span className="shrink-0 text-fg">
                        {copied ? (
                          <span className="inline-flex items-center gap-1 text-success">
                            <IconCheck size={14} stroke={3} /> Copied
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1">
                            <IconCopy size={14} /> Copy
                          </span>
                        )}
                      </span>
                    </button>
                    <button
                      onClick={shareOnX}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-fg px-5 py-3 text-sm font-medium text-bg transition-transform hover:scale-[1.02]"
                    >
                      <IconBrandX size={15} />
                      Share on X
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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

function Spinner() {
  return (
    <span
      aria-hidden
      className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-bg/40 border-t-bg"
    />
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
    const from = 0;
    const to = value;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(from + (to - from) * eased));
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
    colors: ["#a78bfa", "#22d3ee", "#f472b6", "#fcd34d", "#ffffff"],
  };

  confetti({
    ...defaults,
    particleCount: 80,
    origin: { x: 0.5, y: 0.55 },
  });
  setTimeout(
    () =>
      confetti({
        ...defaults,
        particleCount: 50,
        angle: 60,
        origin: { x: 0, y: 0.7 },
      }),
    180,
  );
  setTimeout(
    () =>
      confetti({
        ...defaults,
        particleCount: 50,
        angle: 120,
        origin: { x: 1, y: 0.7 },
      }),
    260,
  );
}
