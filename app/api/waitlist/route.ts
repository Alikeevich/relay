import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * Waitlist sign-up endpoint.
 *
 * Strategy:
 * - Validate the email server-side (defence in depth).
 * - Honeypot field ("company") — if a bot fills it, silently return success.
 * - Naive in-memory rate-limit per IP (resets on cold start).
 * - If SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY are set, insert into the
 *   `waitlist` table (idempotent via unique email index).
 *   Otherwise, log to server console — useful in dev.
 *
 * The endpoint always returns a `position` in the queue so the UI can show
 * a fun count to the user.
 */

const Body = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  // Honeypot — humans never fill this; bots usually do.
  company: z.string().max(200).optional(),
  // Optional referral code.
  ref: z.string().max(64).optional(),
});

// Per-IP attempts in the last minute.
const ipHits = new Map<string, number[]>();
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 5;

// Local counter (only matters when Supabase isn't configured).
// Starts at a number that "looks established" — feel free to tweak.
const BASE_POSITION = 487;
const localQueue = new Set<string>();

function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "unknown";
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

async function storeInSupabase(email: string, ref: string | undefined) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;

  const res = await fetch(`${url}/rest/v1/waitlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: key,
      Authorization: `Bearer ${key}`,
      Prefer: "return=representation,resolution=merge-duplicates",
    },
    body: JSON.stringify({
      email,
      referrer: ref ?? null,
      source: "landing",
    }),
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    console.error("[waitlist] supabase insert failed", res.status, txt);
    return null;
  }
  // Try to fetch current row count to compute the position.
  const count = await fetch(
    `${url}/rest/v1/waitlist?select=id&limit=1`,
    {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        Prefer: "count=exact",
      },
    },
  );
  const total = Number(count.headers.get("content-range")?.split("/")[1] ?? 0);
  return total || null;
}

export async function POST(req: Request) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const parsed = Body.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Please enter a valid email address.",
      },
      { status: 400 },
    );
  }

  const { email, company, ref } = parsed.data;

  // Honeypot — bots fall here. Pretend everything is fine.
  if (company && company.length > 0) {
    return NextResponse.json({
      ok: true,
      position: BASE_POSITION,
    });
  }

  const ip = clientIp(req);
  if (!ratelimit(ip)) {
    return NextResponse.json(
      {
        ok: false,
        error: "Too many attempts. Try again in a minute.",
      },
      { status: 429 },
    );
  }

  // Try persistent storage first; fall back to in-memory.
  const supaTotal = await storeInSupabase(email, ref);
  let position: number;
  if (supaTotal && supaTotal > 0) {
    position = supaTotal;
  } else {
    localQueue.add(email);
    position = BASE_POSITION + localQueue.size;
    if (!process.env.SUPABASE_URL) {
      console.log(`[waitlist] (in-memory) ${email} — position #${position}`);
    }
  }

  return NextResponse.json({
    ok: true,
    position,
  });
}
