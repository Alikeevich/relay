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
  kw: "text-[#c084fc]",
  str: "text-[#a3e635]",
  fn: "text-[#22d3ee]",
  var: "text-[#f9a8d4]",
  cmt: "text-zinc-500 italic",
  punct: "text-zinc-400",
  num: "text-[#fcd34d]",
  txt: "text-zinc-300",
};

export type Line = Token[];

export function CodeBlock({
  title,
  badge,
  lines,
  className,
  glow = false,
}: {
  title?: string;
  badge?: ReactNode;
  lines: Line[];
  className?: string;
  glow?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border bg-[#0a0a0c]/90 backdrop-blur",
        glow && "shadow-[0_30px_120px_-30px_rgba(167,139,250,0.4)]",
        className
      )}
    >
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
        {title && (
          <span className="ml-3 font-mono text-xs text-muted">{title}</span>
        )}
        {badge && <span className="ml-auto">{badge}</span>}
      </div>
      <pre className="overflow-x-auto px-5 py-5 font-mono text-[13px] leading-7">
        <code>
          {lines.map((line, i) => (
            <div key={i} className="flex gap-4">
              <span className="select-none text-zinc-700">
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
