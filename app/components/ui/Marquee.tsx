/**
 * Seamless infinite marquee. The trick: render the items THREE times and
 * animate translateX 0 → -33.333%. That guarantees no visible gap at any
 * loop boundary, regardless of item width or container width.
 */
export function Marquee({ items }: { items: string[] }) {
  const tripled = [...items, ...items, ...items];
  return (
    <div className="relative overflow-hidden border-b border-border py-8">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-bg to-transparent" />
      <div className="flex w-max items-center animate-marquee">
        {tripled.map((item, i) => (
          <span
            key={i}
            className="mx-8 whitespace-nowrap font-mono text-[12px] uppercase tracking-[0.22em] text-muted"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
