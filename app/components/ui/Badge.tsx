import { ReactNode } from "react";

export function Badge({
  children,
  dot = true,
}: {
  children: ReactNode;
  dot?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.03] px-3 py-1 text-xs text-muted backdrop-blur">
      {dot && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inset-0 animate-pulse-dot rounded-full bg-accent-2" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-2" />
        </span>
      )}
      {children}
    </span>
  );
}
