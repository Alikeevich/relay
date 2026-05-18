import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * Self-serve signup endpoint.
 *
 * The flow:
 *  1. Client POSTs { email, providerKeys } via TLS to this Vercel function.
 *  2. We validate, rate-limit, then forward to the Worker's /admin/users
 *     endpoint using RELAY_MASTER_TOKEN (held server-side, never sent to
 *     the client).
 *  3. Worker provisions a tenant, returns a fresh rly_ key.
 *  4. We mirror {email -> keyHash, providers, createdAt} into Supabase so
 *     we can support "I lost my key" recovery later, and so the founder
 *     has visibility into who signed up.
 *  5. We return the plaintext rly_ key to the client exactly once.
 *
 * The founder never sees provider-key plaintext. Vercel logs are
 * configured to drop request bodies — only the email is referenced in
 * server logs.
 */

const ProviderKey = z
  .string()
  .trim()
  .min(8, "API key looks too short.")
  .max(512, "API key looks too long.");

const Body = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  company: z.string().max(200).optional(), // honeypot
  providerKeys: z
    .object({
      gemini: ProviderKey.optional(),
      anthropic: ProviderKey.optional(),
      openai: ProviderKey.optional(),
    })
    .refine(
      (k) => Boolean(k.gemini || k.anthropic || k.openai),
      "Provide at least one provider API key.",
    ),
});

// Naive per-IP rate-limit (in-memory, resets on cold start).
const ipHits = new Map<string, number[]>();
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 3;

function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  return req.headers.get("x-real-ip")?.trim() ?? "unknown";
}

function ratelimit(ip: string): boolean {
  const now = Date.now();
  const hits = (ipHits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (hits.length >= RATE_MAX) {
    ipHits.set(ip, hits);
    return false;
  }
  hits.push(now);
  ipHits.set(ip, hits);
  return true;
}

async function recordSignup(email: string, keyHash: string, providers: string[]) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return;
  try {
    await fetch(`${url}/rest/v1/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: key,
        Authorization: `Bearer ${key}`,
        Prefer: "return=minimal,resolution=merge-duplicates",
      },
      body: JSON.stringify({
        email,
        key_hash: keyHash,
        providers,
        plan: "free",
      }),
    });
  } catch (err) {
    console.warn("[signup] supabase users insert failed", err);
  }
}

export async function POST(req: Request) {
  const workerUrl = process.env.RELAY_WORKER_URL;
  const masterToken = process.env.RELAY_MASTER_TOKEN;
  if (!workerUrl || !masterToken) {
    return NextResponse.json(
      {
        ok: false,
        error: "Signup is not configured on this deployment.",
      },
      { status: 503 },
    );
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Body must be JSON." },
      { status: 400 },
    );
  }

  const parsed = Body.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: parsed.error.issues[0]?.message ?? "Invalid input.",
      },
      { status: 400 },
    );
  }
  const { email, company, providerKeys } = parsed.data;

  // Honeypot — silently succeed on bots.
  if (company && company.length > 0) {
    return NextResponse.json({ ok: true, apiKey: "rly_demo_filtered" });
  }

  const ip = clientIp(req);
  if (!ratelimit(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many signups from this IP. Try again in a minute." },
      { status: 429 },
    );
  }

  // Use a sanitized id from the email; the email itself isn't passed to the
  // Worker so the worker doesn't end up holding it.
  const id = `usr_${emailToId(email)}`;

  const adminRes = await fetch(`${workerUrl}/admin/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${masterToken}`,
    },
    body: JSON.stringify({ id, plan: "free", providerKeys }),
  });

  if (!adminRes.ok) {
    const text = await adminRes.text().catch(() => "");
    console.error("[signup] worker admin call failed", adminRes.status, text);
    return NextResponse.json(
      { ok: false, error: "Could not provision your account. Try again." },
      { status: 502 },
    );
  }

  const adminPayload = (await adminRes.json()) as {
    ok: boolean;
    user: { id: string; plan: string; providers: string[] };
    apiKey: string;
    keyHash: string;
  };

  // Fire-and-forget — failure doesn't block the user from getting their key.
  void recordSignup(email, adminPayload.keyHash, adminPayload.user.providers);

  return NextResponse.json({
    ok: true,
    user: adminPayload.user,
    apiKey: adminPayload.apiKey,
  });
}

function emailToId(email: string): string {
  // Keep alphanumerics + dot/dash, swap @ for `_at_`. Result is a stable,
  // privacy-leaky-but-not-credential identifier for KV. We don't use the
  // raw email so KV-level dumps aren't immediately a contact-list.
  return email
    .replace("@", "_at_")
    .replace(/[^a-z0-9_.-]/gi, "")
    .slice(0, 60);
}
