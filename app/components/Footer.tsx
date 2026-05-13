import {
  IconBrandGithub,
  IconBrandX,
  IconBrandDiscord,
} from "@tabler/icons-react";

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-bg">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2">
            <Logo />
            <span className="font-medium tracking-tight text-fg">Relay</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted">
            Reliable delivery layer for LLM APIs. Built at the edge so your AI
            agents stay up no matter who&apos;s down.
          </p>
          <div className="mt-6 flex items-center gap-2">
            <Social icon={IconBrandGithub} href="#" />
            <Social icon={IconBrandX} href="#" />
            <Social icon={IconBrandDiscord} href="#" />
          </div>
        </div>
        <FooterColumn
          title="Product"
          links={[
            ["Features", "/#features"],
            ["Pricing", "/#pricing"],
            ["How it works", "/#how"],
            ["FAQ", "/#faq"],
            ["Join waitlist", "/#waitlist"],
          ]}
        />
        <FooterColumn
          title="Resources"
          links={[
            ["Docs", "#"],
            ["Changelog", "#"],
            ["Status", "#"],
            ["GitHub", "#"],
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
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-6 py-6 text-xs text-muted sm:flex-row sm:items-center">
          <div>© {new Date().getFullYear()} Relay. Built from Astana.</div>
          <div>Made on Cloudflare · Next.js · Supabase</div>
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
      <div className="text-xs uppercase tracking-[0.2em] text-muted">
        {title}
      </div>
      <ul className="mt-4 space-y-2.5 text-sm">
        {links.map(([label, href]) => (
          <li key={label}>
            <a
              href={href}
              className="text-fg/80 transition-colors hover:text-fg"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Social({
  icon: Icon,
  href,
}: {
  icon: typeof IconBrandGithub;
  href: string;
}) {
  return (
    <a
      href={href}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white/[0.02] text-muted transition-all hover:border-border-strong hover:bg-white/[0.05] hover:text-fg"
    >
      <Icon size={16} />
    </a>
  );
}

function Logo() {
  return (
    <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
      <defs>
        <linearGradient id="fg1" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a78bfa" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <path
        d="M6 9c0-1.66 1.34-3 3-3h11a6 6 0 0 1 0 12h-3l5 8h-5l-5-8H10v8H6V9Zm4 5h9a2 2 0 0 0 0-4h-9v4Z"
        fill="url(#fg1)"
      />
    </svg>
  );
}
