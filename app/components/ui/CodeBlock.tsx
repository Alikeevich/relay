"use client";

import { ReactNode } from "react";
import { cn } from "../../lib/cn";

type Token =
  | { t: "kw"; v: string }
  | { t: "str"; v: string }
  | { t: "fn"; v: string }
  | { t: "var"; v: string }
  | { t: "cmt"; v: string }
  | { t: "punct"; v: string }
  | { t: "num"; v: string }
  | { t: "txt"; v: string };

const colors: Record<Token["t"], string> = {
  kw: "text-[#c9a8ff]",
  str: "text-[#a3e635]",
  fn: "text-[#6df0ff]",
  var: "text-[#f9a8d4]",
  cmt: "text-muted italic",
  punct: "text-fg-dim",
  num: "text-[#fcd34d]",
  txt: "text-fg-dim",
};

export type Line = Token[];

/**
 * Solid editorial code block. No glass / blur / traffic-light dots — those
 * read as a v0-template chrome. Filename sits in a mono header, code body
 * underneath with subtle line numbers.
 */
export function CodeBlock({
  title,
  badge,
  lines,
  className,
}: {
  title?: string;
  badge?: ReactNode;
  lines: Line[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden border border-border bg-[#0c0b10]",
        className,
      )}
    >
      {(title || badge) && (
        <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
          {title && (
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              {title}
            </span>
          )}
          {badge && <span className="ml-auto">{badge}</span>}
        </div>
      )}
      <pre className="overflow-x-auto px-5 py-5 font-mono text-[12.5px] leading-7">
        <code>
          {lines.map((line, i) => (
            <div key={i} className="flex gap-4">
              <span className="select-none text-border-strong">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>
                {line.map((tok, j) => (
                  <span key={j} className={colors[tok.t]}>
                    {tok.v}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}
