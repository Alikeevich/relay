import type { Metadata } from "next";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { SignupForm } from "./SignupForm";

export const metadata: Metadata = {
  title: "Get a Relay API key",
  description:
    "Paste a provider key. Get a Relay key back. BYOK, encrypted at rest, open-source SDK.",
};

export default function SignupPage() {
  return (
    <>
      <Nav />
      <main className="relative min-h-screen border-b border-border pt-32 pb-24">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-x-16 gap-y-14 px-6 lg:grid-cols-[1fr_1.05fr] lg:px-10">
          {/* Left — editorial pitch */}
          <div className="lg:pt-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
              — Get started
            </p>
            <h1 className="heading-tight mt-5 text-balance text-[clamp(2.25rem,5vw,3.5rem)] font-medium text-fg">
              Your <em className="font-display italic text-fg-dim">Relay key</em>{" "}
              in ten seconds.
            </h1>
            <p className="mt-6 max-w-[440px] text-pretty text-[16.5px] leading-relaxed text-fg-dim">
              Paste a provider key on the right. Get a Relay key back. From
              that moment your LLM calls flow through retry, failover and
              caching — one import, your same code.
            </p>

            <ul className="mt-12 space-y-7">
              <Reason title="BYOK — your keys, your bill.">
                We never touch your upstream provider invoices. Anthropic,
                OpenAI and Gemini charges land on the card you registered
                with them.
              </Reason>
              <Reason title="Encrypted at rest.">
                Your provider key is stored in Cloudflare KV with platform
                encryption. Only the edge worker reads it at request time;
                it is never written to logs.
              </Reason>
              <Reason title="Open-source SDK — audit before you import.">
                Every line of code your app runs lives at{" "}
                <a
                  href="https://github.com/relay-llm/sdk"
                  className="text-fg underline underline-offset-4 hover:text-accent"
                >
                  github.com/relay-llm/sdk
                </a>
                . MIT-licensed. Verify it never sends your provider key
                anywhere except our endpoint.
              </Reason>
              <Reason title="Revoke any time.">
                The dashboard ships one-click revoke. Until then, email me —
                I delete the keyHash from KV in seconds, your provider keeps
                working.
              </Reason>
            </ul>
          </div>

          {/* Right — form */}
          <div className="relative">
            <SignupForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Reason({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="border-l border-border pl-5">
      <h3 className="text-[15px] font-medium text-fg">{title}</h3>
      <p className="mt-2 max-w-[420px] text-[14.5px] leading-relaxed text-fg-dim">
        {children}
      </p>
    </li>
  );
}
