export function Footer() {
  return (
    <footer className="relative border-t border-border bg-bg">
      <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-baseline gap-3">
              <span className="font-display text-[28px] leading-none tracking-tight text-fg">
                Relay
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                v0.0.1
              </span>
            </div>
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
              ["Docs", "#"],
              ["Changelog", "#"],
              ["Status", "#"],
              ["GitHub", "https://github.com/relay-llm/sdk"],
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

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-3 px-6 py-6 font-mono text-[12px] text-muted sm:flex-row sm:items-center lg:px-10">
          <span>© {new Date().getFullYear()}  ·  Relay  ·  Built in Kazakhstan</span>
          <span>cloudflare workers · next.js · supabase · paddle</span>
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
