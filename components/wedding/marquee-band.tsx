/**
 * MarqueeBand — a bright ivory interlude that scrolls an elegant repeating
 * phrase in forest-green serif with gold diamonds. Brings the ivory of the
 * palette forward and breaks up the dark sections.
 */
export function MarqueeBand() {
  const phrase = "Zami & Adriel"
  const sub = "July 2027 · Napa Valley"

  const Item = () => (
    <span
      className="inline-flex items-center"
      style={{ paddingInline: "2.5rem" }}
    >
      <span
        className="font-serif italic"
        style={{ fontSize: "clamp(1.6rem, 4vw, 2.6rem)", color: "var(--forest)" }}
      >
        {phrase}
      </span>
      <span
        className="font-sans uppercase"
        style={{
          fontSize: "0.6rem",
          letterSpacing: "0.4em",
          color: "rgba(60,45,20,0.55)",
          margin: "0 1.6rem 0 2.2rem",
        }}
      >
        {sub}
      </span>
      {/* gold diamond separator */}
      <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
        <polygon points="6,0 12,6 6,12 0,6" fill="var(--gold)" />
      </svg>
    </span>
  )

  return (
    <section
      aria-hidden="true"
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, var(--ivory) 0%, var(--ivory-dim) 100%)",
        paddingBlock: "1.6rem",
        borderTop: "1px solid rgba(160,130,80,0.35)",
        borderBottom: "1px solid rgba(160,130,80,0.35)",
      }}
    >
      {/* edge fades */}
      <div
        className="absolute inset-y-0 left-0 z-10 pointer-events-none"
        style={{ width: "12%", background: "linear-gradient(90deg, var(--ivory), transparent)" }}
      />
      <div
        className="absolute inset-y-0 right-0 z-10 pointer-events-none"
        style={{ width: "12%", background: "linear-gradient(270deg, var(--ivory-dim), transparent)" }}
      />

      <div className="marquee-track">
        {Array.from({ length: 8 }).map((_, i) => (
          <Item key={i} />
        ))}
      </div>
    </section>
  )
}
