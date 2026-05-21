"use client";

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
    <section className="relative border-b border-border py-32">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
            — The fix
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="heading-tight mt-5 max-w-3xl text-balance text-[clamp(2rem,4.5vw,3.5rem)] font-medium text-fg">
            Delete the retry file.{" "}
            <em className="font-display italic text-fg-dim">Keep shipping.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-fg-dim">
            Replace <span className="font-mono text-fg">@anthropic-ai/sdk</span>{" "}
            with <span className="font-mono text-fg">@relay-api/sdk</span>. Same
            method signatures, same streaming. Retry, failover and caching
            become someone else&apos;s problem.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Reveal y={32}>
            <div className="relative">
              <Label tone="bad">Before</Label>
              <CodeBlock title="without-relay.ts" lines={before} />
            </div>
          </Reveal>

          <Reveal y={32} delay={0.15}>
            <div className="relative">
              <Label tone="good">After</Label>
              <CodeBlock title="with-relay.ts" lines={after} />
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
  const color = tone === "good" ? "text-[#7ee7b0]" : "text-[#ff8593]";
  return (
    <span
      className={`mb-3 inline-block font-mono text-[11px] uppercase tracking-[0.22em] ${color}`}
    >
      — {children}
    </span>
  );
}
