import type { Metadata } from "next";
import { LegalShell, Section } from "../components/LegalShell";

export const metadata: Metadata = {
  title: "Terms of Service — Relay",
  description:
    "The agreement between you and Relay covering use of the service, payments, BYOK responsibilities and liability.",
};

const toc = [
  { id: "acceptance", label: "Acceptance" },
  { id: "service", label: "The service" },
  { id: "eligibility", label: "Eligibility" },
  { id: "account", label: "Your account" },
  { id: "byok", label: "BYOK & provider terms" },
  { id: "acceptable", label: "Acceptable use" },
  { id: "payments", label: "Plans, payments & refunds" },
  { id: "sla", label: "Service availability" },
  { id: "ip", label: "Intellectual property" },
  { id: "warranty", label: "Warranties & disclaimers" },
  { id: "liability", label: "Limitation of liability" },
  { id: "indemnify", label: "Indemnification" },
  { id: "termination", label: "Termination" },
  { id: "law", label: "Governing law" },
  { id: "changes", label: "Changes" },
  { id: "contact", label: "Contact" },
];

export default function TermsPage() {
  return (
    <LegalShell
      eyebrow="Legal"
      title="Terms of Service"
      lead="The agreement between you and Relay. Plain English where the law allows it; precise language where it doesn't."
      updated="May 14, 2026"
      toc={toc}
    >
      <Section id="acceptance" num={1} title="Acceptance">
        <p>
          By signing up for Relay, joining the waitlist, or using any part of
          the service you agree to these Terms of Service together with the
          accompanying <a href="/privacy">Privacy Policy</a>. If you don&apos;t
          agree, do not use the service.
        </p>
        <p>
          If you are using Relay on behalf of a company, you confirm you have
          authority to bind that company and &ldquo;you&rdquo; in these terms
          refers to it.
        </p>
      </Section>

      <Section id="service" num={2} title="The service">
        <p>
          Relay is a reliable delivery layer for Large Language Model APIs. It
          sits between your application and upstream providers (Anthropic,
          OpenAI and others) and adds automatic retry, provider failover,
          response caching, request logging and a usage dashboard.
        </p>
        <p>
          Relay does not host or train models of its own. We do not generate
          model output — we forward your request to a model you choose, and
          forward its response back to you.
        </p>
      </Section>

      <Section id="eligibility" num={3} title="Eligibility">
        <p>You must be at least 16 years old and legally capable of entering this contract. If we discover you don&apos;t meet these requirements we may suspend or close your account.</p>
      </Section>

      <Section id="account" num={4} title="Your account">
        <ul>
          <li>
            You are responsible for keeping your credentials and API keys
            secret. Tell us right away if you suspect a compromise.
          </li>
          <li>
            One human, one account. Sharing logins across people is not
            allowed; invite teammates as separate users when team workspaces
            ship.
          </li>
          <li>
            Anything that happens under your account is your responsibility.
          </li>
        </ul>
      </Section>

      <Section id="byok" num={5} title="BYOK & provider terms">
        <p>
          Relay is bring-your-own-key. You provide the keys to the upstream
          providers you want to use, and the upstream provider bills you
          directly. By using Relay you also agree to comply with the terms of
          each provider whose key you connect — for example Anthropic&apos;s and
          OpenAI&apos;s usage policies. We do not waive, alter or accept liability
          for those terms.
        </p>
        <p>
          You agree not to use Relay to circumvent rate limits, abuse trial
          credits, run the same key across many accounts to mask volume, or
          otherwise violate the upstream provider&apos;s acceptable-use rules.
        </p>
      </Section>

      <Section id="acceptable" num={6} title="Acceptable use">
        <p>You agree <strong>not</strong> to use Relay to:</p>
        <ul>
          <li>Send unlawful, infringing, defamatory or harassing content.</li>
          <li>
            Generate or distribute material that exploits or endangers
            children, promotes terrorism, or facilitates real-world violence.
          </li>
          <li>
            Build a competing managed reliability service that resells Relay
            itself.
          </li>
          <li>
            Reverse-engineer, scrape, or probe the service for vulnerabilities
            outside a responsible-disclosure programme.
          </li>
          <li>
            Bypass any usage limit, security feature or technical restriction
            we apply.
          </li>
        </ul>
        <p>
          We may suspend or terminate accounts that breach these rules, and
          where there is risk of imminent harm we may act first and notify
          afterwards.
        </p>
      </Section>

      <Section id="payments" num={7} title="Plans, payments & refunds">
        <ul>
          <li>
            Paid plans are billed in advance via <strong>Paddle</strong>, our
            merchant of record. Prices on the pricing page are exclusive of
            VAT/sales tax where Paddle is required to charge it.
          </li>
          <li>
            You can cancel at any time from the dashboard. Cancellation stops
            the next renewal — we don&apos;t pro-rate refunds for the unused
            portion of the current period, except where local consumer law
            requires it (e.g. the EU 14-day cooling-off period for first-time
            purchases).
          </li>
          <li>
            If we change pricing, the new price applies to your next renewal,
            with at least 30 days&apos; notice.
          </li>
          <li>
            Failure to pay (e.g. an expired card) gives us the right to
            suspend access until payment is restored.
          </li>
          <li>
            Provider charges (Anthropic, OpenAI, etc.) are not paid through
            Relay; they remain between you and the provider.
          </li>
        </ul>
      </Section>

      <Section id="sla" num={8} title="Service availability">
        <p>
          We work hard to keep Relay up and we publish real-time status. That
          said:
        </p>
        <ul>
          <li>
            The <strong>Free</strong> plan is provided without any uptime
            commitment.
          </li>
          <li>
            <strong>Hobby</strong> and <strong>Pro</strong> plans are
            best-effort: we aim for 99.9% monthly availability of the Relay
            proxy.
          </li>
          <li>
            <strong>Scale</strong> customers receive a written SLA with
            service credits as the exclusive remedy for breach.
          </li>
        </ul>
        <p>
          We are not responsible for downtime caused by upstream providers,
          your own network, your code, force majeure events, or actions you
          asked us to take.
        </p>
      </Section>

      <Section id="ip" num={9} title="Intellectual property">
        <ul>
          <li>
            We own Relay, its codebase, brand and documentation. Open-source
            SDKs we publish are licensed under their stated open-source
            licence.
          </li>
          <li>
            You own the content you send through Relay and the responses you
            receive. You grant us a narrow, royalty-free licence to process
            that content solely for the purpose of operating the service for
            you.
          </li>
          <li>
            Feedback you give us about the product may be used to improve it
            without obligation, but we will never identify you as the source
            without your permission.
          </li>
        </ul>
      </Section>

      <Section id="warranty" num={10} title="Warranties & disclaimers">
        <p>
          To the maximum extent permitted by law, Relay is provided{" "}
          <strong>&ldquo;as is&rdquo;</strong> and <strong>&ldquo;as available&rdquo;</strong>.
          We disclaim all implied warranties, including merchantability,
          fitness for a particular purpose and non-infringement.
        </p>
        <p>
          We do not warrant that the service will be uninterrupted, error-free,
          or that any specific upstream provider will be available at any
          given time.
        </p>
      </Section>

      <Section id="liability" num={11} title="Limitation of liability">
        <p>
          To the maximum extent permitted by law, neither party will be liable
          for indirect, incidental, special, consequential or punitive damages,
          or for lost profits, revenue, or data, even if advised of the
          possibility.
        </p>
        <p>
          Our aggregate liability arising out of or relating to these Terms is
          limited to the greater of: (a) the fees you paid us for the service
          in the 12 months before the event giving rise to the claim, or (b)
          USD 100.
        </p>
        <p>
          Nothing in these Terms excludes liability that cannot be excluded by
          applicable law (for example fraud, death or personal injury caused
          by negligence).
        </p>
      </Section>

      <Section id="indemnify" num={12} title="Indemnification">
        <p>
          You agree to defend and indemnify us against any third-party claim
          arising from (i) your use of Relay in breach of these Terms, (ii)
          the content you submit through the service, or (iii) your violation
          of any law or third-party right. We&apos;ll tell you promptly about any
          such claim and reasonably cooperate with your defence.
        </p>
      </Section>

      <Section id="termination" num={13} title="Termination">
        <p>
          You can close your account at any time. We can suspend or terminate
          your access if you breach these Terms or if we&apos;re required to by
          law. On termination, your right to use the service ends; sections
          that by their nature should survive (IP, liability, governing law,
          confidentiality) will continue to apply.
        </p>
      </Section>

      <Section id="law" num={14} title="Governing law & disputes">
        <p>
          These Terms are governed by the laws of the Republic of Kazakhstan,
          without regard to its conflict-of-laws rules. Disputes that cannot
          be resolved informally will be submitted to the courts of Astana,
          unless mandatory consumer-protection law in your country of
          residence gives you the right to sue locally.
        </p>
      </Section>

      <Section id="changes" num={15} title="Changes">
        <p>
          We may update these Terms when the product changes or the law
          changes. We&apos;ll announce material changes by email and via the
          dashboard at least 14 days before they take effect. Continued use of
          Relay after that date means you accept the new terms; if you don&apos;t,
          stop using the service and close your account.
        </p>
      </Section>

      <Section id="contact" num={16} title="Contact">
        <p>
          Questions about these Terms:{" "}
          <a href="mailto:legal@relay.dev">legal@relay.dev</a>.
        </p>
        <p className="text-xs text-muted">
          Nothing in these Terms is legal advice. Relay is a developer tool,
          not a law firm.
        </p>
      </Section>
    </LegalShell>
  );
}
