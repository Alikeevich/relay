# Relay — Landing

The marketing site for **Relay**, the reliable delivery layer for LLM APIs.

Drop-in replacement for `@anthropic-ai/sdk` that adds automatic retry, provider
failover, smart caching and a live dashboard — so AI agents stay online even
when Anthropic and OpenAI don't.

## Stack

- Next.js 16 (App Router, Turbopack)
- React 19
- Tailwind CSS v4
- [motion](https://motion.dev) — scroll-triggered animations
- [Lenis](https://lenis.darkroom.engineering) — smooth scroll
- GSAP — heavier scroll choreography (loaded on demand)
- [@tabler/icons-react](https://tabler.io/icons) — icon set

## Highlights

- Sticky-stacking pain-point cards driven by `useScroll` + `useTransform`
- Aurora mesh-gradient hero with cursor spotlight + word-stagger reveal
- Before / after code comparison block
- Bento feature grid with mini visualisations (failover packet, latency bars)
- Pinned scroll timeline for "how it works"
- Pricing tiers with monthly / annual toggle, conic-gradient border on Pro
- FAQ accordion with smooth height transitions
- Waitlist CTA with idle / loading / done states

## Develop

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

## Build

```bash
npm run build
npm start
```

---

Built from Astana.
