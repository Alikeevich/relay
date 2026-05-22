"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "../lib/cn";

const links = [
  { href: "/#problem", label: "Problem" },
  { href: "/#features", label: "Features" },
  { href: "/#how", label: "How it works" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
];

/**
 * Editorial nav — a single horizontal bar with hairline rule. Replaces the
 * floating glass pill (a recognizable v0-template signature) with a flush
 * header that reads like the masthead of a tech publication.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-border bg-bg/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav className="mx-auto flex max-w-[1280px] items-center gap-8 px-6 py-4 lg:px-10">
        <Link
          href="/"
          className="flex items-baseline gap-2 text-fg transition-opacity hover:opacity-80"
        >
          <Mark />
          <span className="text-[17px] font-medium tracking-[-0.01em]">Relay</span>
        </Link>

        <ul className="hidden flex-1 items-center gap-7 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-[14px] text-muted underline-offset-4 transition-colors hover:text-fg hover:underline"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-6 md:ml-0">
          <a
            href="https://github.com/relay-llm/sdk"
            className="hidden text-[14px] text-muted underline-offset-4 transition-colors hover:text-fg hover:underline sm:inline-flex"
          >
            Docs
          </a>
          <a
            href="/signup"
            className="inline-flex items-baseline gap-2 border-b border-fg pb-0.5 text-[14px] font-medium text-fg transition-colors hover:border-accent hover:text-accent"
          >
            Get an API key
            <span aria-hidden>→</span>
          </a>
        </div>
      </nav>
    </header>
  );
}

function Mark() {
  // Smaller, single-colour stroke version of the R monogram. No gradient.
  return (
    <svg width="18" height="18" viewBox="0 0 32 32" fill="currentColor" aria-hidden>
      <path d="M6 9c0-1.66 1.34-3 3-3h11a6 6 0 0 1 0 12h-3l5 8h-5l-5-8H10v8H6V9Zm4 5h9a2 2 0 0 0 0-4h-9v4Z" />
    </svg>
  );
}
