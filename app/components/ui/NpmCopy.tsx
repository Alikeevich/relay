"use client";

import { useState } from "react";
import { IconCheck, IconCopy } from "@tabler/icons-react";

const COMMAND = "npm install @relay-api/sdk";

/**
 * Inline copy-to-clipboard pill that shows the SDK install command.
 *
 * Sits below the hero headline so anyone landing immediately sees how to
 * adopt Relay — one line, copy with a click. The visual style is meant to
 * read as a terminal prompt without feeling decorative.
 */
export function NpmCopy() {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(COMMAND).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label="Copy install command"
      className="group inline-flex items-center gap-3 rounded-full border border-border bg-white/[0.03] px-4 py-2 font-mono text-sm text-fg/85 backdrop-blur transition-all hover:border-border-strong hover:bg-white/[0.05]"
    >
      <span className="select-none text-muted">$</span>
      <span className="select-all">{COMMAND}</span>
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full transition-colors ${
          copied
            ? "bg-success/15 text-success"
            : "bg-white/[0.04] text-muted group-hover:bg-white/[0.08] group-hover:text-fg"
        }`}
      >
        {copied ? <IconCheck size={13} stroke={3} /> : <IconCopy size={13} />}
      </span>
    </button>
  );
}
