"use client";

import { useState } from "react";

const COMMAND = "npm install @relay-api/sdk";

/**
 * Inline copy-to-clipboard pill that shows the SDK install command.
 *
 * Plain text affordances ("copy" / "copied") instead of icons — keeps the
 * hero deliberately icon-free to read as a hand-crafted dev site rather
 * than an AI template.
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
      className="group inline-flex items-center gap-3 border border-border bg-transparent px-4 py-2.5 font-mono text-[13px] text-fg/85 transition-colors hover:border-border-strong"
    >
      <span aria-hidden className="select-none text-muted">$</span>
      <span className="select-all">{COMMAND}</span>
      <span
        className={`min-w-[58px] text-right font-mono text-[11px] uppercase tracking-[0.16em] transition-colors ${
          copied ? "text-[#7ee7b0]" : "text-muted group-hover:text-fg"
        }`}
      >
        {copied ? "copied" : "copy"}
      </span>
    </button>
  );
}
