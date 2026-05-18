"use client";

import { FormEvent, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  IconAlertCircle,
  IconArrowRight,
  IconCheck,
  IconCopy,
  IconEye,
  IconEyeOff,
} from "@tabler/icons-react";

type Provider = "gemini" | "anthropic" | "openai";

const PROVIDERS: { id: Provider; label: string; placeholder: string; hint: string }[] = [
  {
    id: "gemini",
    label: "Google Gemini",
    placeholder: "AIzaSy...",
    hint: "Get one from aistudio.google.com/app/apikey",
  },
  {
    id: "anthropic",
    label: "Anthropic Claude",
    placeholder: "sk-ant-...",
    hint: "Get one from console.anthropic.com",
  },
  {
    id: "openai",
    label: "OpenAI",
    placeholder: "sk-...",
    hint: "Get one from platform.openai.com/api-keys",
  },
];

type State =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "error"; message: string }
  | { kind: "success"; apiKey: string; providers: string[] };

export function SignupForm() {
  const [email, setEmail] = useState("");
  const [provider, setProvider] = useState<Provider>("gemini");
  const [providerKey, setProviderKey] = useState("");
  const [show, setShow] = useState(false);
  const [state, setState] = useState<State>({ kind: "idle" });
  const [copied, setCopied] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state.kind === "loading") return;
    const fd = new FormData(e.currentTarget);
    const company = (fd.get("company") as string) ?? "";

    setState({ kind: "loading" });
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email,
          company,
          providerKeys: { [provider]: providerKey },
        }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) {
        setState({
          kind: "error",
          message: data?.error ?? "Something broke. Try again in a moment.",
        });
        return;
      }
      setState({ kind: "success", apiKey: data.apiKey, providers: data.user.providers });
    } catch {
      setState({
        kind: "error",
        message: "Network hiccup. Check your connection and try again.",
      });
    }
  }

  function copyKey() {
    if (state.kind !== "success") return;
    navigator.clipboard.writeText(state.apiKey).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }

  const selected = PROVIDERS.find((p) => p.id === provider)!;

  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-br from-accent/40 via-accent-2/30 to-accent-3/40 opacity-60"
        style={{
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: 1,
        }}
      />
      <div className="relative rounded-3xl border border-border bg-bg-soft/80 p-8 backdrop-blur">
        <AnimatePresence mode="wait">
          {state.kind !== "success" ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onSubmit={onSubmit}
              noValidate
              className="flex flex-col gap-5"
            >
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
              />

              <Field label="Your email">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@startup.dev"
                  disabled={state.kind === "loading"}
                  className="w-full rounded-xl border border-border bg-white/[0.03] px-4 py-3 text-fg backdrop-blur placeholder:text-muted/60 focus:border-border-strong focus:outline-none focus:ring-2 focus:ring-accent/30 disabled:opacity-70"
                />
              </Field>

              <Field label="Provider">
                <div className="grid grid-cols-3 gap-2">
                  {PROVIDERS.map((p) => (
                    <button
                      type="button"
                      key={p.id}
                      onClick={() => setProvider(p.id)}
                      disabled={state.kind === "loading"}
                      className={`rounded-xl border px-3 py-2.5 text-sm transition-all ${
                        provider === p.id
                          ? "border-accent/50 bg-accent/10 text-fg"
                          : "border-border bg-white/[0.02] text-muted hover:border-border-strong hover:text-fg"
                      } disabled:opacity-50`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </Field>

              <Field label={`${selected.label} API key`} hint={selected.hint}>
                <div className="relative">
                  <input
                    type={show ? "text" : "password"}
                    required
                    value={providerKey}
                    onChange={(e) => setProviderKey(e.target.value)}
                    placeholder={selected.placeholder}
                    autoComplete="off"
                    spellCheck={false}
                    disabled={state.kind === "loading"}
                    className="w-full rounded-xl border border-border bg-white/[0.03] px-4 py-3 pr-12 font-mono text-sm text-fg backdrop-blur placeholder:text-muted/60 focus:border-border-strong focus:outline-none focus:ring-2 focus:ring-accent/30 disabled:opacity-70"
                  />
                  <button
                    type="button"
                    onClick={() => setShow((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-7 w-7 items-center justify-center rounded-md text-muted transition-colors hover:bg-white/[0.05] hover:text-fg"
                    aria-label={show ? "Hide key" : "Show key"}
                  >
                    {show ? <IconEyeOff size={14} /> : <IconEye size={14} />}
                  </button>
                </div>
              </Field>

              <p className="text-xs leading-relaxed text-muted">
                Submitting this form sends your provider key over TLS straight
                to the encrypted KV namespace on Cloudflare. The founder never
                sees it — verify it yourself in the{" "}
                <a
                  href="https://github.com/relay-llm/sdk"
                  className="text-accent underline-offset-4 hover:underline"
                >
                  open-source SDK source
                </a>
                .
              </p>

              <button
                type="submit"
                disabled={state.kind === "loading"}
                className="relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-fg px-6 py-3.5 text-sm font-medium text-bg transition-all hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-80"
              >
                {state.kind === "loading" ? (
                  <>
                    <Spinner /> Provisioning…
                  </>
                ) : (
                  <>
                    Get my Relay key
                    <IconArrowRight size={16} />
                  </>
                )}
              </button>

              <AnimatePresence>
                {state.kind === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="inline-flex items-center gap-2 rounded-full border border-danger/30 bg-danger/10 px-4 py-2 text-sm text-danger"
                  >
                    <IconAlertCircle size={14} />
                    {state.message}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-5"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center self-start rounded-full border border-success/40 bg-success/10 text-success">
                <IconCheck size={20} stroke={3} />
              </div>
              <div>
                <h2 className="text-2xl font-medium text-fg">You&apos;re wired up.</h2>
                <p className="mt-2 text-sm text-muted">
                  This key is shown once. Save it now — we cannot recover it.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-bg/50 p-1">
                <div className="flex items-center gap-2 rounded-xl bg-bg-soft/80 px-4 py-3 font-mono text-sm">
                  <span className="flex-1 select-all truncate text-fg">
                    {state.apiKey}
                  </span>
                  <button
                    onClick={copyKey}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white/[0.04] px-3 py-1.5 text-xs text-fg transition-colors hover:border-border-strong hover:bg-white/[0.08]"
                  >
                    {copied ? (
                      <>
                        <IconCheck size={12} stroke={3} className="text-success" />
                        Copied
                      </>
                    ) : (
                      <>
                        <IconCopy size={12} />
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-white/[0.02] p-5">
                <div className="text-xs uppercase tracking-[0.2em] text-muted">
                  Quickstart
                </div>
                <pre className="mt-3 overflow-x-auto rounded-xl bg-bg/80 p-4 font-mono text-[12.5px] leading-6 text-fg/85">
                  <code>{quickstart(state.providers)}</code>
                </pre>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-sm">
                <a
                  href="https://github.com/relay-llm/sdk"
                  className="rounded-full border border-border bg-white/[0.02] px-4 py-2 text-muted transition-colors hover:border-border-strong hover:text-fg"
                >
                  Read the docs →
                </a>
                <a
                  href="https://www.npmjs.com/package/@relay-api/sdk"
                  className="rounded-full border border-border bg-white/[0.02] px-4 py-2 text-muted transition-colors hover:border-border-strong hover:text-fg"
                >
                  npm page →
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs uppercase tracking-[0.15em] text-muted">
        {label}
      </span>
      {children}
      {hint && <span className="text-xs text-muted">{hint}</span>}
    </label>
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

function quickstart(providers: string[]): string {
  const model =
    providers.includes("anthropic")
      ? "claude-sonnet-4-6"
      : providers.includes("openai")
        ? "gpt-4o"
        : "gemini-2.5-flash";
  return `import { Relay } from "@relay-api/sdk";

const llm = new Relay({
  apiKey: process.env.RELAY_API_KEY,
  baseUrl: "https://relay-worker.alikkenzheb.workers.dev",
});

const reply = await llm.messages.create({
  model: "${model}",
  max_tokens: 1024,
  messages: [{ role: "user", content: "Hi from Relay!" }],
});

console.log(reply.content[0].text);
console.log(reply._relay); // { provider, retries, failover, latency_ms }`;
}
