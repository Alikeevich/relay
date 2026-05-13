import type { Metadata } from "next";
import { LegalShell, Section } from "../components/LegalShell";

export const metadata: Metadata = {
  title: "Privacy Policy — Relay",
  description:
    "How Relay collects, stores and uses the data you share when using our reliable LLM API delivery layer.",
};

const toc = [
  { id: "who", label: "Who we are" },
  { id: "data", label: "Data we collect" },
  { id: "use", label: "How we use data" },
  { id: "byok", label: "Your API keys (BYOK)" },
  { id: "sharing", label: "Sharing & sub-processors" },
  { id: "security", label: "Security" },
  { id: "retention", label: "Retention" },
  { id: "rights", label: "Your rights" },
  { id: "transfers", label: "International transfers" },
  { id: "cookies", label: "Cookies" },
  { id: "children", label: "Children" },
  { id: "changes", label: "Changes to this policy" },
  { id: "contact", label: "Contact" },
];

export default function PrivacyPage() {
  return (
    <LegalShell
      eyebrow="Legal"
      title="Privacy Policy"
      lead="We collect the minimum we need to run Relay reliably for you, and we tell you exactly what that is."
      updated="May 14, 2026"
      toc={toc}
    >
      <Section id="who" num={1} title="Who we are">
        <p>
          Relay is a developer infrastructure product built by an independent
          team based in Pavlodar, Kazakhstan. In this policy <strong>&ldquo;Relay&rdquo;</strong>,{" "}
          <strong>&ldquo;we&rdquo;</strong>, <strong>&ldquo;our&rdquo;</strong> and{" "}
          <strong>&ldquo;us&rdquo;</strong> refer to that team and the legal entity
          operating the service. <strong>&ldquo;You&rdquo;</strong> refers to the
          individual or organisation using the service or the public website.
        </p>
        <p>
          For any privacy question, write to{" "}
          <a href="mailto:privacy@relay.dev">privacy@relay.dev</a>. We respond
          to verified requests within 30 days.
        </p>
      </Section>

      <Section id="data" num={2} title="Data we collect">
        <p>The data we hold falls into four buckets:</p>
        <ul>
          <li>
            <strong>Account data.</strong> Email, optional display name, hashed
            password (or OAuth identifier), creation date.
          </li>
          <li>
            <strong>Waitlist data.</strong> Email and the page that referred
            you. We use this only to invite you to the product. You can ask us
            to delete it at any time.
          </li>
          <li>
            <strong>Request metadata.</strong> For every API call routed
            through Relay we record the timestamp, model, provider, HTTP status,
            latency, token counts, cache hit/miss, retry count and IP. We
            <strong> do not</strong> store the bodies of your prompts or model
            responses unless you explicitly enable the debug log on a per-key
            basis.
          </li>
          <li>
            <strong>Billing data.</strong> Plan, billing cycle, invoice
            history. Card numbers are handled by our payment processor
            (Paddle); we never see or store them.
          </li>
        </ul>
      </Section>

      <Section id="use" num={3} title="How we use data">
        <ul>
          <li>To provide the service: route, retry, cache, fail over.</li>
          <li>
            To show you a dashboard of your own traffic and bill you accurately.
          </li>
          <li>
            To debug incidents and detect abuse (e.g. rate-limit floods).
          </li>
          <li>
            To send transactional emails (account confirmation, invoices,
            outage notifications) and waitlist updates you opted in to.
          </li>
          <li>
            To improve the product, only in aggregate. We do not train any
            model on your data.
          </li>
        </ul>
        <p>
          We <strong>never</strong> sell your data, and we do not use it for
          advertising.
        </p>
      </Section>

      <Section id="byok" num={4} title="Your API keys (BYOK)">
        <p>
          Relay is bring-your-own-key. You give us the keys to your Anthropic,
          OpenAI or other LLM provider and we proxy your traffic through to
          them. Specifically:
        </p>
        <ul>
          <li>
            Keys are encrypted with <strong>AES-256-GCM</strong> at rest, using
            an envelope key held in Cloudflare Workers Secrets that is
            inaccessible to operations staff at runtime.
          </li>
          <li>
            Keys are decrypted only inside the edge worker at the moment we
            need to forward a request. They are never written to logs.
          </li>
          <li>
            You can rotate or delete a key from the dashboard. Deletion is
            immediate and irreversible.
          </li>
          <li>
            We are not your contracting party with the upstream provider —
            their charges land on your bill, on their card.
          </li>
        </ul>
      </Section>

      <Section id="sharing" num={5} title="Sharing & sub-processors">
        <p>
          We share the minimum data required with the following sub-processors,
          each under a written data-processing agreement:
        </p>
        <ul>
          <li>
            <strong>Cloudflare</strong> — edge compute, KV storage and DDoS
            protection.
          </li>
          <li>
            <strong>Supabase</strong> — Postgres database for account and
            request-metadata storage.
          </li>
          <li>
            <strong>Paddle</strong> — payments and tax-compliant invoicing.
          </li>
          <li>
            <strong>Resend</strong> — transactional and waitlist email
            delivery.
          </li>
          <li>
            <strong>Your chosen LLM provider</strong> (Anthropic, OpenAI, etc.)
            — your prompts pass through us to them so they can return a
            response. Their privacy policy then applies to that hop.
          </li>
        </ul>
        <p>
          We may disclose data when legally compelled (a valid court order or
          equivalent), and we will tell you when we&apos;re allowed to.
        </p>
      </Section>

      <Section id="security" num={6} title="Security">
        <ul>
          <li>TLS 1.3 for all data in transit.</li>
          <li>AES-256-GCM encryption at rest for provider keys.</li>
          <li>
            Strict separation of logs (Supabase Postgres) from secrets
            (Cloudflare Workers Secrets / KV).
          </li>
          <li>Hardware-key MFA mandatory for all team members with admin access.</li>
          <li>
            Audit logging of every access to your account, keys or request
            history.
          </li>
        </ul>
        <p>
          No system is unbreakable. If we discover a breach affecting your
          data, we will notify you and the relevant regulator within 72 hours
          of confirming it.
        </p>
      </Section>

      <Section id="retention" num={7} title="Retention">
        <ul>
          <li>
            <strong>Account data</strong> — kept while your account is active,
            deleted within 30 days of closure.
          </li>
          <li>
            <strong>Request metadata</strong> — kept for 90 days for billing,
            debugging and abuse-detection, then anonymised and aggregated.
          </li>
          <li>
            <strong>Waitlist email</strong> — kept until you ask us to remove
            it or until 12 months after the product launches, whichever comes
            first.
          </li>
          <li>
            <strong>Backups</strong> — encrypted, kept for 30 days on a
            rolling window.
          </li>
        </ul>
      </Section>

      <Section id="rights" num={8} title="Your rights">
        <p>
          Wherever you live, we honour the rights granted to EU/UK residents
          under GDPR and to California residents under CCPA. That means you
          can:
        </p>
        <ul>
          <li>Access a copy of the data we hold about you.</li>
          <li>Correct anything that&apos;s wrong.</li>
          <li>Have your data erased (subject to legal retention duties).</li>
          <li>Export your data in a portable format.</li>
          <li>Restrict or object to specific processing.</li>
          <li>
            Lodge a complaint with your local data-protection authority.
          </li>
        </ul>
        <p>
          Request anything from this list at{" "}
          <a href="mailto:privacy@relay.dev">privacy@relay.dev</a>. We&apos;ll verify
          you are the account holder and act within 30 days.
        </p>
      </Section>

      <Section id="transfers" num={9} title="International transfers">
        <p>
          Relay runs on Cloudflare&apos;s global edge — your data is processed in
          the region geographically closest to you. Storage is centralised in
          the EU. Where we transfer personal data outside the EEA or UK, we
          rely on Standard Contractual Clauses approved by the European
          Commission.
        </p>
      </Section>

      <Section id="cookies" num={10} title="Cookies">
        <p>
          The marketing site sets <strong>only</strong> first-party cookies
          that are strictly necessary (e.g. session, CSRF). We use
          privacy-respecting product analytics that do not place cross-site
          tracking cookies. No advertising cookies, ever.
        </p>
      </Section>

      <Section id="children" num={11} title="Children">
        <p>
          Relay is not directed at children. We do not knowingly collect data
          from anyone under 16. If you believe a minor has signed up, write to{" "}
          <a href="mailto:privacy@relay.dev">privacy@relay.dev</a> and we will
          delete the account.
        </p>
      </Section>

      <Section id="changes" num={12} title="Changes to this policy">
        <p>
          We may update this policy as the product evolves. Material changes
          are announced by email to account holders and via a banner on the
          dashboard at least 14 days before they take effect. The &ldquo;last
          updated&rdquo; date at the top reflects the current version.
        </p>
      </Section>

      <Section id="contact" num={13} title="Contact">
        <p>
          Questions, complaints, requests:{" "}
          <a href="mailto:privacy@relay.dev">privacy@relay.dev</a>.
        </p>
      </Section>
    </LegalShell>
  );
}
