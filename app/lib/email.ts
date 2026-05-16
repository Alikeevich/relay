/**
 * Transactional email — waitlist welcome.
 *
 * Sends through Resend. If RESEND_API_KEY is not set we no-op and log to
 * the server console, so the landing keeps working in any preview env.
 *
 * The `from` address defaults to Resend's shared sandbox sender
 * `onboarding@resend.dev` because we don't own a verified domain yet.
 * Once a real domain ships, set RESEND_FROM_EMAIL to e.g. `hello@relay.dev`
 * (after adding it as a verified sender in the Resend dashboard).
 */

import { Resend } from "resend";

interface SendWelcomeArgs {
  to: string;
  position: number;
  siteUrl: string;
}

const FROM_DEFAULT = "Relay <onboarding@resend.dev>";
// Looks like a real email — used to decide if a reply-to value is safe to send.
// `example.com` and friends will get rejected by Resend, so we drop them.
const PLACEHOLDER_DOMAINS = /@(example\.com|example\.org|example\.net|test\.com)$/i;

export async function sendWelcomeEmail({
  to,
  position,
  siteUrl,
}: SendWelcomeArgs): Promise<{ ok: boolean; id?: string; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log(
      `[email] RESEND_API_KEY not set — would have welcomed ${to} (position #${position}).`,
    );
    return { ok: true };
  }

  const from = process.env.RESEND_FROM_EMAIL ?? FROM_DEFAULT;
  const replyToRaw = process.env.RESEND_REPLY_TO?.trim();
  const replyTo =
    replyToRaw && !PLACEHOLDER_DOMAINS.test(replyToRaw) ? replyToRaw : undefined;

  console.log(
    `[email] sending welcome → to=${to} from=${from} replyTo=${replyTo ?? "(none)"} pos=#${position}`,
  );

  const resend = new Resend(apiKey);
  const html = renderHtml({ position, siteUrl });
  const text = renderText({ position, siteUrl });

  try {
    const { data, error } = await resend.emails.send({
      from,
      to,
      ...(replyTo ? { replyTo } : {}),
      subject: "You're on the Relay waitlist",
      html,
      text,
      headers: {
        "X-Entity-Ref-ID": `waitlist-${Date.now()}`,
      },
      tags: [
        { name: "category", value: "waitlist" },
        { name: "event", value: "welcome" },
      ],
    });

    if (error) {
      console.error("[email] resend.emails.send returned error:", JSON.stringify(error));
      return { ok: false, error: error.message };
    }
    console.log(`[email] sent ok id=${data?.id}`);
    return { ok: true, id: data?.id };
  } catch (err) {
    console.error("[email] threw:", err);
    return { ok: false, error: (err as Error).message };
  }
}

interface RenderArgs {
  position: number;
  siteUrl: string;
}

function renderText({ position, siteUrl }: RenderArgs): string {
  return [
    `Hey,`,
    ``,
    `You're on the Relay waitlist — builder #${position} in line.`,
    `When we open the doors, you'll be among the first invited.`,
    ``,
    `What you signed up for:`,
    `  • Drop-in SDK that replaces @anthropic-ai/sdk in one line`,
    `  • Automatic retry, failover and caching across LLM providers`,
    `  • A dashboard that shows you every request, latency, cost and retry`,
    `  • BYOK — your provider keys, encrypted, your bill`,
    ``,
    `What happens next:`,
    `  → I'll send a short update when the SDK lands on npm (~2 weeks).`,
    `  → A second one when the dashboard opens for beta.`,
    `  → No spam, ever.`,
    ``,
    `If you'd help me sharpen the product — just reply to this email with`,
    `two things:`,
    `  1. What AI agent / product are you building?`,
    `  2. What reliability pain hits you most today?`,
    ``,
    `Every reply gets six months of Pro free at launch.`,
    ``,
    `— Alikhan, founder`,
    `   Building Relay from Astana 🇰🇿`,
    `   ${siteUrl}`,
    ``,
    `─────`,
    `You're receiving this because you signed up at ${siteUrl}.`,
    `To stop receiving emails about Relay, reply with the word STOP.`,
  ].join("\n");
}

function renderHtml({ position, siteUrl }: RenderArgs): string {
  // Inline-styled HTML — emails strip <style> and external CSS aggressively.
  // Width 600px, max-readable line-length, dark accent on white card.
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width">
<meta name="color-scheme" content="light only">
<title>You're on the Relay waitlist</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0f0f10;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="background:#f5f5f5;padding:32px 16px;">
    <tr>
      <td align="center">

        <!-- Header / logo -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width:600px;width:100%;">
          <tr>
            <td align="left" style="padding:0 0 24px 4px;">
              <a href="${siteUrl}" style="text-decoration:none;color:#0f0f10;font-weight:600;font-size:18px;letter-spacing:-0.2px;display:inline-flex;align-items:center;gap:8px;">
                <img src="${siteUrl}/icon.svg" width="22" height="22" alt="" style="vertical-align:middle;border:0;">
                <span style="vertical-align:middle;">Relay</span>
              </a>
            </td>
          </tr>
        </table>

        <!-- Card -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width:600px;width:100%;background:#ffffff;border-radius:14px;border:1px solid rgba(15,15,16,0.08);">
          <tr>
            <td style="padding:36px 36px 8px 36px;">
              <div style="font-size:13px;letter-spacing:0.18em;text-transform:uppercase;color:#71717a;margin-bottom:14px;">You're in</div>
              <h1 style="margin:0 0 14px 0;font-size:28px;line-height:1.2;letter-spacing:-0.5px;font-weight:600;color:#0f0f10;">
                Builder #${position}, welcome to the queue.
              </h1>
              <p style="margin:0 0 22px 0;font-size:16px;line-height:1.6;color:#3f3f46;">
                When we open the doors, you'll be among the first invited. While
                we get there, here's what you signed up for — and how you can
                help me ship something that actually solves your problem.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:0 36px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="border:1px solid rgba(15,15,16,0.08);border-radius:10px;">
                <tr>
                  <td style="padding:18px 20px;font-size:13px;letter-spacing:0.16em;text-transform:uppercase;color:#71717a;border-bottom:1px solid rgba(15,15,16,0.06);">
                    What Relay does
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 20px 18px 20px;font-size:15px;color:#3f3f46;line-height:1.6;">
                    <div style="margin-bottom:8px;">→ Drop-in SDK replaces <code style="background:#f4f4f5;padding:2px 6px;border-radius:4px;font-size:13px;">@anthropic-ai/sdk</code> in one line</div>
                    <div style="margin-bottom:8px;">→ Automatic retry, failover, and caching across LLM providers</div>
                    <div style="margin-bottom:8px;">→ Live dashboard for every request — latency, cost, retries, cache hits</div>
                    <div>→ BYOK — your provider keys, encrypted at rest, your bill</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:24px 36px 0 36px;">
              <h2 style="margin:0 0 10px 0;font-size:18px;font-weight:600;letter-spacing:-0.2px;color:#0f0f10;">What happens next</h2>
              <ul style="margin:0;padding:0 0 0 20px;font-size:15px;color:#3f3f46;line-height:1.7;">
                <li>I'll email a short update when the SDK lands on npm (~2 weeks).</li>
                <li>A second one when the dashboard opens for closed beta.</li>
                <li>No drip campaigns, no spam, no &ldquo;don't miss out&rdquo;.</li>
              </ul>
            </td>
          </tr>

          <tr>
            <td style="padding:28px 36px;">
              <div style="background:#fafafa;border:1px solid rgba(15,15,16,0.06);border-radius:10px;padding:20px 22px;">
                <div style="font-size:13px;letter-spacing:0.16em;text-transform:uppercase;color:#71717a;margin-bottom:10px;">Help me sharpen the product</div>
                <p style="margin:0 0 12px 0;font-size:15px;color:#0f0f10;line-height:1.6;">
                  Reply to this email with two things:
                </p>
                <div style="font-size:15px;color:#3f3f46;line-height:1.7;">
                  1. What AI agent or product are you building?<br>
                  2. What reliability pain hits you most today?
                </div>
                <p style="margin:14px 0 0 0;font-size:14px;color:#52525b;">
                  Every reply gets <strong style="color:#0f0f10;">six months of Pro free</strong> at launch.
                </p>
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:0 36px 32px 36px;">
              <p style="margin:0;font-size:15px;color:#3f3f46;line-height:1.6;">
                Talk soon,<br>
                <strong style="color:#0f0f10;">Alikhan</strong> · building Relay from Astana 🇰🇿<br>
                <a href="https://x.com/AlikhanKenzh" style="color:#525252;text-decoration:underline;">@AlikhanKenzh</a>
              </p>
            </td>
          </tr>
        </table>

        <!-- Footer -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width:600px;width:100%;">
          <tr>
            <td align="center" style="padding:20px 12px 0 12px;font-size:12px;color:#a1a1aa;line-height:1.6;">
              You're getting this email because you signed up at
              <a href="${siteUrl}" style="color:#71717a;text-decoration:underline;">${siteUrl.replace(/^https?:\/\//, "")}</a>.<br>
              Don't want these? Reply with <strong>STOP</strong> and I'll remove you immediately.
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
</body>
</html>`;
}
