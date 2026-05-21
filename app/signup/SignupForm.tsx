"use client";

import { FormEvent, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type Provider = "gemini" | "anthropic" | "openai";

const PROVIDERS: { id: Provider; label: string; placeholder: string; hint: string }[] = [
  {
    id: "gemini",
    label: "Google Gemini",
    placeholder: "AIzaSy...",
    hint: "from aistudio.google.com/app/apikey",
  },
  {
    id: "anthropic",
    label: "Anthropic Claude",
    placeholder: "sk-ant-...",
    hint: "from console.anthropic.com",
  },
  {
    id: "openai",
    label: "OpenAI",
    placeholder: "sk-...",
    hint: "from platform.openai.com/api-keys",
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
    <div className="relative border border-border bg-bg-soft p-8 lg:p-10">
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
            className="flex flex-col gap-7"
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
                className="w-full border-b border-border-strong bg-transparent px-1 py-2.5 text-[17px] text-fg placeholder:text-muted/55 focus:border-fg focus:outline-none disabled:opacity-70"
              />
            </Field>

            <Field label="Provider">
              <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[12px] uppercase tracking-[0.18em]">
                {PROVIDERS.map((p) => (
                  <button
                    type="button"
                    key={p.id}
                    onClick={() => setProvider(p.id)}
                    disabled={state.kind === "loading"}
                    className={`border-b pb-1 transition-colors ${
                      provider === p.id
                        ? "border-fg text-fg"
                        : "border-transparent text-muted hover:text-fg"
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
                  className="w-full border-b border-border-strong bg-transparent px-1 py-2.5 pr-14 font-mono text-[15px] text-fg placeholder:text-muted/55 focus:border-fg focus:outline-none disabled:opacity-70"
                />
                <button
                  type="button"
                  onClick={() => setShow((v) => !v)}
                  className="absolute right-1 top-1/2 -translate-y-1/2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-fg"
                  aria-label={show ? "Hide key" : "Show key"}
                >
                  {show ? "hide" : "show"}
                </button>
              </div>
            </Field>

            <p className="max-w-[460px] text-[13px] leading-relaxed text-muted">
              Submitting sends your provider key over TLS straight into the
              encrypted KV namespace on Cloudflare. The founder never sees it —
              verify it yourself in the{" "}
              <a
                href="https://github.com/relay-llm/sdk"
                className="text-fg underline underline-offset-4 hover:text-accent"
              >
                open-source SDK
              </a>
              .
            </p>

            <div className="flex items-center justify-between gap-4 border-t border-border pt-6">
              <AnimatePresence>
                {state.kind === "error" ? (
                  <motion.span
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="font-mono text-[12px] text-[#ff8593]"
                  >
                    ! {state.message}
                  </motion.span>
                ) : (
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                    no card · BYOK · revoke any time
                  </span>
                )}
              </AnimatePresence>
              <button
                type="submit"
                disabled={state.kind === "loading"}
                className="inline-flex items-baseline gap-2 border-b border-fg pb-1 font-mono text-[12px] uppercase tracking-[0.18em] text-fg transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-70"
              >
                {state.kind === "loading" ? "provisioning…" : "get my relay key"}
                {state.kind !== "loading" && <span aria-hidden>→</span>}
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-7"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#7ee7b0]">
              — wired up
            </p>
            <div>
              <h2 className="heading-tight text-[28px] font-medium text-fg">
                Save this key now.
              </h2>
              <p className="mt-3 max-w-[460px] text-[14.5px] leading-relaxed text-fg-dim">
                It is shown once. We store only the hash, so we can&apos;t
                recover it later. If you lose it, generate a new one.
              </p>
            </div>

            <div className="border border-border-strong bg-bg p-1">
              <div className="flex items-center gap-3 bg-bg-soft px-4 py-3 font-mono text-[14px]">
                <span className="flex-1 select-all truncate text-fg">
                  {state.apiKey}
                </span>
                <button
                  onClick={copyKey}
                  className={`border-b pb-0.5 text-[11px] uppercase tracking-[0.18em] transition-colors ${
                    copied
                      ? "border-[#7ee7b0] text-[#7ee7b0]"
                      : "border-fg text-fg hover:border-accent hover:text-accent"
                  }`}
                >
                  {copied ? "copied" : "copy"}
                </button>
              </div>
            </div>

            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                — quickstart
              </p>
              <pre className="mt-3 overflow-x-auto border border-border bg-bg p-4 font-mono text-[12.5px] leading-6 text-fg/85">
                <code>{quickstart(state.providers)}</code>
              </pre>
            </div>

            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-border pt-6 font-mono text-[12px] uppercase tracking-[0.18em]">
              <a
                href="https://github.com/relay-llm/sdk"
                className="text-fg underline-offset-4 hover:text-accent hover:underline"
              >
                read the docs →
              </a>
              <a
                href="https://www.npmjs.com/package/@relay-api/sdk"
                className="text-muted underline-offset-4 hover:text-fg hover:underline"
              >
                npm →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
    <label className="flex flex-col gap-2.5">
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
        {label}
      </span>
      {children}
      {hint && (
        <span className="font-mono text-[11px] text-muted">{hint}</span>
      )}
    </label>
  );
}

function quickstart(providers: string[]): string {
  const model = providers.includes("anthropic")
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
