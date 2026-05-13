export function Aurora({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
    >
      <div className="aurora absolute inset-[-20%]" />
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-60" />
      <div className="absolute inset-x-0 top-0 h-[60vh] bg-gradient-to-b from-bg/0 via-bg/0 to-bg" />
      <div className="absolute inset-x-0 bottom-0 h-[40vh] bg-gradient-to-t from-bg to-transparent" />
    </div>
  );
}
