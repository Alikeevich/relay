import type { Metadata } from "next";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { SignupForm } from "./SignupForm";
import { Aurora } from "../components/ui/Aurora";

export const metadata: Metadata = {
  title: "Get your Relay API key",
  description:
    "Self-serve signup for Relay. Paste your provider key, get a Relay key in 10 seconds. BYOK, encrypted at rest, open-source SDK.",
};

export default function SignupPage() {
  return (
    <>
      <Nav />
      <main className="relative isolate min-h-screen overflow-hidden pt-32 pb-24">
        <Aurora />

        <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          {/* Left — trust pitch */}
          <div className="lg:pt-10">
            <div className="text-xs uppercase tracking-[0.2em] text-muted">
              Get started
            </div>
            <h1 className="mt-4 text-balance text-[clamp(2.25rem,5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.02em] text-fg">
              Your{" "}
              <span className="font-display italic text-gradient-accent">
                Relay key
              </span>{" "}
              in 10 seconds.
            </h1>
            <p className="mt-6 max-w-md text-pretty text-lg text-muted">
              Paste a provider key, get a Relay key back. From that moment on
              all your LLM calls flow through retry, failover and caching —
              with one line of code.
            </p>

            <ul className="mt-10 space-y-5 text-sm text-muted">
              <li className="flex gap-3">
                <Dot />
                <div>
                  <div className="font-medium text-fg">
                    BYOK — your keys, your bill.
                  </div>
                  We never touch your upstream provider invoices. Anthropic /
                  OpenAI / Gemini charges land on the card you registered with
                  them.
                </div>
              </li>
              <li className="flex gap-3">
                <Dot />
                <div>
                  <div className="font-medium text-fg">Encrypted at rest.</div>
                  Your provider key is stored in Cloudflare KV with platform
                  encryption. Only the edge worker reads it at request time;
                  it is never written to logs.
                </div>
              </li>
              <li className="flex gap-3">
                <Dot />
                <div>
                  <div className="font-medium text-fg">
                    Open-source SDK — audit before you import.
                  </div>
                  Every line of code your app runs lives at{" "}
                  <a
                    href="https://github.com/relay-llm/sdk"
                    className="text-accent underline-offset-4 hover:underline"
                  >
                    github.com/relay-llm/sdk
                  </a>
                  . MIT licensed. Verify it never sends your provider key
                  anywhere except our endpoint.
                </div>
              </li>
              <li className="flex gap-3">
                <Dot />
                <div>
                  <div className="font-medium text-fg">
                    Revoke any time, no questions.
                  </div>
                  We'll wire up a one-click revoke in the dashboard. Until
                  then, email us — we delete the keyHash from KV in seconds.
                </div>
              </li>
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

function Dot() {
  return (
    <span
      aria-hidden
      className="mt-2 inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-accent to-accent-2"
    />
  );
}
