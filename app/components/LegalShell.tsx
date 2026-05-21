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
        {/* Header — editorial, no aurora */}
        <section className="relative border-b border-border pb-16 pt-40">
          <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
              — {eyebrow}
            </p>
            <h1 className="heading-tight mt-5 text-balance text-[clamp(2.25rem,5vw,3.75rem)] font-medium text-fg">
              {title}
            </h1>
            <p className="mt-6 max-w-[640px] text-pretty text-[17px] leading-relaxed text-fg-dim">
              {lead}
            </p>
            <p className="mt-7 font-mono text-[12px] text-muted">
              Last updated {updated}
            </p>
          </div>
        </section>

        {/* Body */}
        <section className="mx-auto max-w-[1280px] px-6 py-20 lg:px-10">
          <div className="grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-[260px_1fr]">
            <aside className="hidden lg:block">
              <div className="sticky top-32">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                  — Contents
                </p>
                <ol className="mt-5 space-y-2.5 text-[13px]">
                  {toc.map((t, i) => (
                    <li key={t.id}>
                      <a
                        href={`#${t.id}`}
                        className="group flex items-baseline gap-3 text-muted transition-colors hover:text-fg"
                      >
                        <span className="font-mono text-[11px] text-muted/70 group-hover:text-fg">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="underline-offset-4 group-hover:underline">
                          {t.label}
                        </span>
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>

            <article className="relative max-w-[640px] text-pretty text-[15.5px] leading-relaxed text-fg-dim">
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
    <section
      id={id}
      className="scroll-mt-32 border-t border-border py-12 first:border-t-0 first:pt-0"
    >
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-[12px] text-muted">
          {String(num).padStart(2, "0")}
        </span>
        <h2 className="heading-tight text-[26px] font-medium text-fg">{title}</h2>
      </div>
      <div className="mt-6 space-y-4 [&_a]:text-fg [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-accent [&_strong]:text-fg [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_p]:text-fg-dim [&_li]:text-fg-dim">
        {children}
      </div>
    </section>
  );
}
