import { ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

export function LegalShell({
  eyebrow,
  title,
  lead,
  updated,
  toc,
  children,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  updated: string;
  toc: { id: string; label: string }[];
  children: ReactNode;
}) {
  return (
    <>
      <Nav />
      <main className="relative">
        {/* Header */}
        <section className="relative isolate overflow-hidden border-b border-border pb-16 pt-40">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <div className="aurora absolute inset-[-20%] opacity-60" />
            <div className="absolute inset-0 bg-grid bg-grid-fade opacity-40" />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-bg" />
          </div>
          <div className="mx-auto max-w-3xl px-6">
            <div className="text-xs uppercase tracking-[0.2em] text-muted">
              {eyebrow}
            </div>
            <h1 className="mt-4 text-balance text-[clamp(2.25rem,5vw,3.75rem)] font-medium leading-[1.05] tracking-[-0.02em] text-fg">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted">{lead}</p>
            <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.03] px-3 py-1 text-xs text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-2" />
              Last updated {updated}
            </div>
          </div>
        </section>

        {/* Body */}
        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[220px_1fr]">
            {/* Sticky TOC */}
            <aside className="hidden lg:block">
              <div className="sticky top-32">
                <div className="text-xs uppercase tracking-[0.2em] text-muted">
                  Contents
                </div>
                <ol className="mt-4 space-y-2 text-sm">
                  {toc.map((t, i) => (
                    <li key={t.id}>
                      <a
                        href={`#${t.id}`}
                        className="group flex items-start gap-3 text-muted transition-colors hover:text-fg"
                      >
                        <span className="font-mono text-[10px] text-muted/60 group-hover:text-accent">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {t.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>

            <article className="relative max-w-2xl text-pretty text-[15px] leading-relaxed text-fg/85">
              {children}
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export function Section({
  id,
  num,
  title,
  children,
}: {
  id: string;
  num: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-32 border-t border-border py-10 first:border-t-0 first:pt-0">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-xs text-muted">
          {String(num).padStart(2, "0")}
        </span>
        <h2 className="text-2xl font-medium tracking-tight text-fg">{title}</h2>
      </div>
      <div className="mt-5 space-y-4 [&_a]:text-accent [&_a]:underline-offset-4 [&_a:hover]:underline [&_strong]:text-fg [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_p]:text-fg/80 [&_li]:text-fg/80">
        {children}
      </div>
    </section>
  );
}
