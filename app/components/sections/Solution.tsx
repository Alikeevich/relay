"use client";

import { IconArrowRight, IconX } from "@tabler/icons-react";
import { CodeBlock, Line } from "../ui/CodeBlock";
import { Reveal } from "../ui/Reveal";

const before: Line[] = [
  [{ t: "cmt", v: "// 47 lines of retry boilerplate, written badly." }],
  [
    { t: "kw", v: "async function" },
    { t: "txt", v: " " },
    { t: "fn", v: "callLLM" },
    { t: "punct", v: "(" },
    { t: "var", v: "body" },
    { t: "punct", v: ") {" },
  ],
  [
    { t: "txt", v: "  " },
    { t: "kw", v: "let" },
    { t: "txt", v: " " },
    { t: "var", v: "attempt" },
    { t: "punct", v: " = " },
    { t: "num", v: "0" },
    { t: "punct", v: ";" },
  ],
  [
    { t: "txt", v: "  " },
    { t: "kw", v: "while" },
    { t: "punct", v: " (" },
    { t: "var", v: "attempt" },
    { t: "punct", v: " < " },
    { t: "num", v: "3" },
    { t: "punct", v: ") {" },
  ],
  [
    { t: "txt", v: "    " },
    { t: "kw", v: "try" },
    { t: "punct", v: " {" },
  ],
  [
    { t: "txt", v: "      " },
    { t: "kw", v: "return" },
    { t: "txt", v: " " },
    { t: "kw", v: "await" },
    { t: "txt", v: " " },
    { t: "var", v: "anthropic" },
    { t: "punct", v: "." },
    { t: "var", v: "messages" },
    { t: "punct", v: "." },
    { t: "fn", v: "create" },
    { t: "punct", v: "(" },
    { t: "var", v: "body" },
    { t: "punct", v: ");" },
  ],
  [
    { t: "txt", v: "    " },
    { t: "punct", v: "} " },
    { t: "kw", v: "catch" },
    { t: "punct", v: " (" },
    { t: "var", v: "e" },
    { t: "punct", v: ") {" },
  ],
  [
    { t: "txt", v: "      " },
    { t: "var", v: "attempt" },
    { t: "punct", v: "++;" },
  ],
  [
    { t: "txt", v: "      " },
    { t: "kw", v: "await" },
    { t: "txt", v: " " },
    { t: "fn", v: "sleep" },
    { t: "punct", v: "(" },
    { t: "num", v: "2" },
    { t: "punct", v: " ** " },
    { t: "var", v: "attempt" },
    { t: "punct", v: " * " },
    { t: "num", v: "1000" },
    { t: "punct", v: ");" },
  ],
  [{ t: "txt", v: "    " }, { t: "punct", v: "}" }],
  [{ t: "txt", v: "  " }, { t: "punct", v: "}" }],
  [
    { t: "txt", v: "  " },
    { t: "kw", v: "throw new" },
    { t: "txt", v: " " },
    { t: "fn", v: "Error" },
    { t: "punct", v: "(" },
    { t: "str", v: "'Gave up'" },
    { t: "punct", v: ");" },
  ],
  [{ t: "punct", v: "}" }],
  [{ t: "cmt", v: "// Still no failover. No cache. No metrics." }],
];

const after: Line[] = [
  [{ t: "cmt", v: "// One line. Reliability handled." }],
  [
    { t: "kw", v: "const" },
    { t: "txt", v: " " },
    { t: "var", v: "reply" },
    { t: "txt", v: " = " },
    { t: "kw", v: "await" },
    { t: "txt", v: " " },
    { t: "var", v: "llm" },
    { t: "punct", v: "." },
    { t: "var", v: "messages" },
    { t: "punct", v: "." },
    { t: "fn", v: "create" },
    { t: "punct", v: "(" },
    { t: "var", v: "body" },
    { t: "punct", v: ");" },
  ],
  [{ t: "txt", v: "" }],
  [{ t: "cmt", v: "// What Relay just did for you:" }],
  [{ t: "cmt", v: "//   ✓ exponential backoff with jitter" }],
  [{ t: "cmt", v: "//   ✓ failover Anthropic → OpenAI on 5xx" }],
  [{ t: "cmt", v: "//   ✓ exact + semantic cache lookup" }],
  [{ t: "cmt", v: "//   ✓ streaming preserved end-to-end" }],
  [{ t: "cmt", v: "//   ✓ live metrics in your dashboard" }],
];

export function Solution() {
  return (
    <section className="relative bg-bg py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.2em] text-muted">
            The fix
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-4 max-w-3xl text-balance text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.02em] text-fg">
            Delete the retry file.{" "}
            <span className="font-display italic text-gradient-accent">
              Keep shipping.
            </span>
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            Replace <span className="font-mono text-fg">@anthropic-ai/sdk</span>{" "}
            with <span className="font-mono text-fg">@relay/sdk</span>. Same API,
            different superpowers.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-8">
          <Reveal y={32}>
            <div className="relative">
              <Label tone="bad">Before</Label>
              <CodeBlock title="without-relay.ts" lines={before} />
            </div>
          </Reveal>

          <div className="hidden lg:flex lg:items-center lg:justify-center">
            <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-border bg-bg-soft">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent/40 to-accent-2/40 blur-xl" />
              <IconArrowRight size={20} className="relative text-fg" />
            </div>
          </div>

          <Reveal y={32} delay={0.15}>
            <div className="relative">
              <Label tone="good">After</Label>
              <CodeBlock title="with-relay.ts" lines={after} glow />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Label({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: "good" | "bad";
}) {
  const styles =
    tone === "good"
      ? "border-success/30 bg-success/10 text-success"
      : "border-danger/30 bg-danger/10 text-danger";
  return (
    <span
      className={`absolute -top-3 left-4 z-10 inline-flex items-center gap-1.5 rounded-full border bg-bg-soft px-3 py-1 text-[11px] font-medium uppercase tracking-wider ${styles}`}
    >
      {tone === "bad" && <IconX size={12} />}
      {children}
    </span>
  );
}
