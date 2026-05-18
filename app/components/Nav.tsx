"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/cn";

const links = [
  { href: "/#problem", label: "Problem" },
  { href: "/#features", label: "Features" },
  { href: "/#how", label: "How it works" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <AnimatePresence mode="wait">
        <motion.nav
          key={scrolled ? "scrolled" : "top"}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "flex items-center gap-1 rounded-full border px-2 py-2 transition-all",
            scrolled
              ? "border-border bg-bg/70 backdrop-blur-xl shadow-[0_8px_32px_-12px_rgba(0,0,0,0.6)]"
              : "border-transparent bg-transparent"
          )}
        >
          <a
            href="/"
            className="flex items-center gap-2 rounded-full px-3 py-1.5 text-fg"
          >
            <Logo />
            <span className="font-medium tracking-tight">Relay</span>
          </a>
          <div className="mx-2 hidden h-5 w-px bg-border md:block" />
          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:bg-white/5 hover:text-fg"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="ml-2 flex items-center gap-2">
            <a
              href="/#pricing"
              className="hidden rounded-full px-4 py-1.5 text-sm text-muted transition-colors hover:text-fg sm:inline-flex"
            >
              Pricing
            </a>
            <a
              href="/signup"
              className="group relative inline-flex items-center gap-1 rounded-full bg-fg px-4 py-1.5 text-sm font-medium text-bg transition-all hover:bg-fg/90"
            >
              Get API key
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className="transition-transform group-hover:translate-x-0.5"
              >
                <path
                  d="M5 3l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </motion.nav>
      </AnimatePresence>
    </header>
  );
}

function Logo() {
  return (
    <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a78bfa" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <path
        d="M6 9c0-1.66 1.34-3 3-3h11a6 6 0 0 1 0 12h-3l5 8h-5l-5-8H10v8H6V9Zm4 5h9a2 2 0 0 0 0-4h-9v4Z"
        fill="url(#g1)"
      />
    </svg>
  );
}
