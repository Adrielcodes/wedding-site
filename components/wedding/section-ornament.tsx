/**
 * SectionOrnament — decorative calligraphy scroll SVG divider.
 * Place at the top and/or bottom of each section.
 * flip=true mirrors it vertically for bottom placement.
 */
export function SectionOrnament({
  flip = false,
  opacity = 1,
}: {
  flip?: boolean
  opacity?: number
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
        transform: flip ? "scaleY(-1)" : undefined,
        opacity,
      }}
    >
      <svg
        width="560"
        height="48"
        viewBox="0 0 560 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ maxWidth: "100%", overflow: "visible" }}
      >
        {/* ── Left spiral curl ── */}
        <path
          d="M28,24 C28,14 38,14 38,24 C38,31 31,33 28,24"
          stroke="rgba(201,168,76,0.5)"
          strokeWidth="0.85"
          strokeLinecap="round"
        />
        {/* ── Left flowing wave ── */}
        <path
          d="M38,24 C52,15 68,33 82,24 C96,15 112,33 128,24 C142,16 156,20 168,24"
          stroke="rgba(201,168,76,0.45)"
          strokeWidth="0.85"
          fill="none"
          strokeLinecap="round"
        />
        {/* ── Left accent dots ── */}
        <circle cx="42" cy="18" r="1.2" fill="rgba(201,168,76,0.35)" />
        <circle cx="82" cy="30" r="1.2" fill="rgba(201,168,76,0.35)" />
        <circle cx="122" cy="18" r="1.2" fill="rgba(201,168,76,0.35)" />

        {/* ── Left horizontal line to diamond ── */}
        <line
          x1="168"
          y1="24"
          x2="248"
          y2="24"
          stroke="rgba(201,168,76,0.35)"
          strokeWidth="0.7"
        />

        {/* ── Center diamond ── */}
        <polygon
          points="280,10 293,24 280,38 267,24"
          stroke="rgba(201,168,76,0.6)"
          strokeWidth="0.9"
          fill="rgba(201,168,76,0.06)"
        />
        {/* Center inner dot */}
        <circle cx="280" cy="24" r="1.8" fill="rgba(201,168,76,0.5)" />

        {/* ── Small flanking diamonds ── */}
        <polygon
          points="248,24 254,18 260,24 254,30"
          stroke="rgba(201,168,76,0.4)"
          strokeWidth="0.7"
          fill="none"
        />
        <polygon
          points="300,24 306,18 312,24 306,30"
          stroke="rgba(201,168,76,0.4)"
          strokeWidth="0.7"
          fill="none"
        />

        {/* ── Right horizontal line from diamond ── */}
        <line
          x1="312"
          y1="24"
          x2="392"
          y2="24"
          stroke="rgba(201,168,76,0.35)"
          strokeWidth="0.7"
        />

        {/* ── Right flowing wave (mirror) ── */}
        <path
          d="M392,24 C404,20 418,16 432,24 C446,33 462,15 476,24 C490,33 506,15 522,24"
          stroke="rgba(201,168,76,0.45)"
          strokeWidth="0.85"
          fill="none"
          strokeLinecap="round"
        />
        {/* ── Right accent dots ── */}
        <circle cx="438" cy="30" r="1.2" fill="rgba(201,168,76,0.35)" />
        <circle cx="478" cy="18" r="1.2" fill="rgba(201,168,76,0.35)" />
        <circle cx="518" cy="30" r="1.2" fill="rgba(201,168,76,0.35)" />

        {/* ── Right spiral curl ── */}
        <path
          d="M522,24 C522,14 532,14 532,24 C532,31 525,33 522,24"
          stroke="rgba(201,168,76,0.5)"
          strokeWidth="0.85"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

/**
 * CornerAccents — four calligraphy-style corner flourishes
 * for use inside a position:relative container.
 */
export function CornerAccents({ size = 48 }: { size?: number }) {
  const corners = [
    { top: 0, left: 0, rotate: 0 },
    { top: 0, right: 0, rotate: 90 },
    { bottom: 0, right: 0, rotate: 180 },
    { bottom: 0, left: 0, rotate: 270 },
  ] as const

  return (
    <>
      {corners.map((pos, i) => (
        <svg
          key={i}
          aria-hidden="true"
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: "absolute",
            pointerEvents: "none",
            zIndex: 0,
            transform: `rotate(${pos.rotate}deg)`,
            ...Object.fromEntries(
              Object.entries(pos)
                .filter(([k]) => k !== "rotate")
                .map(([k, v]) => [k, v])
            ),
          }}
        >
          {/* L-shaped corner line */}
          <path
            d="M4,44 L4,8 C4,6 6,4 8,4 L44,4"
            stroke="rgba(201,168,76,0.35)"
            strokeWidth="0.9"
            fill="none"
            strokeLinecap="round"
          />
          {/* Inner curl at corner */}
          <path
            d="M4,30 C4,24 10,20 16,22"
            stroke="rgba(201,168,76,0.25)"
            strokeWidth="0.8"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M18,4 C24,4 28,10 26,16"
            stroke="rgba(201,168,76,0.25)"
            strokeWidth="0.8"
            fill="none"
            strokeLinecap="round"
          />
          {/* Tiny dot accent */}
          <circle cx="4" cy="4" r="2" fill="rgba(201,168,76,0.4)" />
        </svg>
      ))}
    </>
  )
}
