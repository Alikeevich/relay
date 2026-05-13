import { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

type Variant = "primary" | "ghost";

export function GradientButton({
  children,
  variant = "primary",
  className,
  ...rest
}: { children: ReactNode; variant?: Variant } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (variant === "ghost") {
    return (
      <a
        {...rest}
        className={cn(
          "group inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white/[0.02] px-5 py-3 text-sm font-medium text-fg backdrop-blur transition-all hover:border-border-strong hover:bg-white/[0.05]",
          className
        )}
      >
        {children}
      </a>
    );
  }
  return (
    <a
      {...rest}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-fg px-5 py-3 text-sm font-medium text-bg transition-transform hover:scale-[1.02]",
        className
      )}
    >
      <span
        aria-hidden
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full"
      />
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </a>
  );
}
