const MASCOT_URL =
  "https://images.unsplash.com/photo-1672079743723-ac70610b6978?auto=format&fit=crop&w=1600&q=80";

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-border bg-bg">
      {/* Subtle owl haunting the bottom-right corner. Heavily grained,
          low opacity — present but never competes with copy. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={MASCOT_URL}
          alt=""
          aria-hidden
          loading="lazy"
          style={{ transform: "scaleX(-1)" }}
          className="absolute -bottom-16 -right-10 h-[125%] w-[60%] object-cover object-[30%_30%] opacity-[0.14] saturate-0 contrast-110 mix-blend-screen"
        />
        {/* A soft brand-coloured veil on top so it tints accent */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(50% 65% at 78% 70%, rgba(167,139,250,0.18) 0%, transparent 70%)",
          }}
        />
        {/* Heavy grain over the whole footer */}
        <div className="grain grain-heavy absolute inset-0" />
        {/* Fade to bg at top edge so it transitions cleanly from the section above */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-bg to-transparent" />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-6 py-20 lg:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <span className="font-display text-[32px] leading-none tracking-tight text-fg">
              Relay
            </span>
            <p className="mt-5 max-w-xs text-pretty text-sm leading-relaxed text-muted">
              Reliable delivery layer for LLM APIs. Built at the edge so AI
              agents stay up when providers don&apos;t.
            </p>
            <ul className="mt-7 space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com/relay-llm/sdk"
                  className="text-fg/80 underline-offset-4 transition-colors hover:text-fg hover:underline"
                >
                  GitHub →
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/AlikhanKenzh"
                  className="text-fg/80 underline-offset-4 transition-colors hover:text-fg hover:underline"
                >
                  X / Twitter →
                </a>
              </li>
              <li>
                <a
                  href="https://www.npmjs.com/package/@relay-api/sdk"
                  className="text-fg/80 underline-offset-4 transition-colors hover:text-fg hover:underline"
                >
                  npm →
                </a>
              </li>
            </ul>
          </div>

          <FooterColumn
            title="Product"
            links={[
              ["Features", "/#features"],
              ["Pricing", "/#pricing"],
              ["How it works", "/#how"],
              ["FAQ", "/#faq"],
              ["Get an API key", "/signup"],
            ]}
          />
          <FooterColumn
            title="Resources"
            links={[
              ["Docs", "https://github.com/relay-llm/sdk#readme"],
              ["Changelog", "https://github.com/relay-llm/sdk/releases"],
              ["GitHub", "https://github.com/relay-llm"],
              ["npm", "https://www.npmjs.com/package/@relay-api/sdk"],
            ]}
          />
          <FooterColumn
            title="Legal"
            links={[
              ["Privacy", "/privacy"],
              ["Terms", "/terms"],
              ["Contact", "mailto:hello@relay.dev"],
            ]}
          />
        </div>
      </div>

      <div className="relative border-t border-border">
        <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-3 px-6 py-6 font-mono text-[12px] text-muted sm:flex-row sm:items-center lg:px-10">
          <span>
            © {new Date().getFullYear()}  ·  Relay  ·  Built in Kazakhstan
          </span>
          <span>
            cloudflare workers · next.js · supabase · paddle
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: [string, string][];
}) {
  return (
    <div>
      <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
        {title}
      </div>
      <ul className="mt-4 space-y-2.5 text-sm">
        {links.map(([label, href]) => (
          <li key={label}>
            <a
              href={href}
              className="text-fg/80 underline-offset-4 transition-colors hover:text-fg hover:underline"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
