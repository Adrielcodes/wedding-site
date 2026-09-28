"use client"

import { useEffect, useState } from "react"

/**
 * Cinematic luxury entrance.
 *
 * Timeline (≈ 4s):
 *  0.0s  — Deep forest-black field, gold motes drifting
 *  0.2s  — Ornamental ring + diamonds draw themselves around the monogram
 *  1.2s  — "Z & A" monogram fades/scales in
 *  1.6s  — Names rise with a gold shimmer sweep, date letterspacing expands
 *  2.9s  — Two panels split apart along a glowing gold seam, revealing the site
 *  3.9s  — Component unmounts
 */
export function IntroAnimation() {
  const [phase, setPhase] = useState<"play" | "out" | "done">("play")

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("out"), 2900)
    const t2 = setTimeout(() => setPhase("done"), 3950)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  // Prevent scroll while the curtain is up
  useEffect(() => {
    if (phase === "done") return
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [phase])

  if (phase === "done") return null

  const motes = [
    { left: "18%", top: "30%", s: 2, d: "0s" },
    { left: "72%", top: "22%", s: 1.5, d: "0.6s" },
    { left: "40%", top: "78%", s: 2.5, d: "0.3s" },
    { left: "84%", top: "64%", s: 1.6, d: "1s" },
    { left: "10%", top: "70%", s: 1.8, d: "0.9s" },
    { left: "60%", top: "84%", s: 1.3, d: "1.4s" },
    { left: "30%", top: "14%", s: 2, d: "0.5s" },
    { left: "90%", top: "40%", s: 1.4, d: "0.2s" },
  ]

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        pointerEvents: phase === "out" ? "none" : "all",
      }}
    >
      {/* ── Left panel ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          width: "50.2%",
          background:
            "radial-gradient(120% 90% at 100% 50%, #0c1812 0%, #070d09 70%)",
          transform: phase === "out" ? "translateX(-101%)" : "translateX(0)",
          transition:
            phase === "out"
              ? "transform 1s cubic-bezier(0.76, 0, 0.24, 1)"
              : "none",
        }}
      />
      {/* ── Right panel ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: "50.2%",
          background:
            "radial-gradient(120% 90% at 0% 50%, #0c1812 0%, #070d09 70%)",
          transform: phase === "out" ? "translateX(101%)" : "translateX(0)",
          transition:
            phase === "out"
              ? "transform 1s cubic-bezier(0.76, 0, 0.24, 1)"
              : "none",
        }}
      />


      {/* ── Grain ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: phase === "out" ? 0 : 1,
          transition: "opacity 0.5s ease",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
          backgroundSize: "256px 256px",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* ── Drifting gold motes ── */}
      {motes.map((m, i) => (
        <span
          key={i}
          style={
            {
              position: "absolute",
              left: m.left,
              top: m.top,
              width: m.s,
              height: m.s,
              borderRadius: "50%",
              background: "rgba(201,168,76,0.7)",
              opacity: phase === "out" ? 0 : undefined,
              animation: `introMote 6s ease-in-out ${m.d} infinite`,
              zIndex: 2,
            } as React.CSSProperties
          }
        />
      ))}

      {/* ── Centre content ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.6rem",
          zIndex: 4,
          opacity: phase === "out" ? 0 : 1,
          transform: phase === "out" ? "scale(1.06)" : "scale(1)",
          transition:
            phase === "out"
              ? "opacity 0.5s ease, transform 0.9s cubic-bezier(0.76,0,0.24,1)"
              : "none",
        }}
      >
        {/* Self-drawing ornamental ring + monogram */}
        <div style={{ position: "relative", width: 200, height: 200 }}>
          <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            fill="none"
            style={{ position: "absolute", inset: 0 }}
          >
            {/* Outer ring */}
            <circle
              cx="100"
              cy="100"
              r="92"
              stroke="rgba(201,168,76,0.55)"
              strokeWidth="1"
              style={{
                strokeDasharray: 578,
                strokeDashoffset: 578,
                animation: "drawStroke 1.5s cubic-bezier(0.16,1,0.3,1) 0.2s forwards",
              }}
            />
            {/* Inner ring */}
            <circle
              cx="100"
              cy="100"
              r="78"
              stroke="rgba(201,168,76,0.28)"
              strokeWidth="0.6"
              style={{
                strokeDasharray: 490,
                strokeDashoffset: 490,
                animation: "drawStroke 1.5s cubic-bezier(0.16,1,0.3,1) 0.45s forwards",
              }}
            />
            {/* Cardinal diamonds */}
            {[0, 90, 180, 270].map((deg, i) => (
              <polygon
                key={deg}
                points="100,2 105,9 100,16 95,9"
                fill="rgba(201,168,76,0.7)"
                transform={`rotate(${deg} 100 100)`}
                style={{
                  opacity: 0,
                  animation: `introFade 0.6s ease ${1.1 + i * 0.1}s forwards`,
                }}
              />
            ))}
          </svg>

          {/* Monogram */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: 0,
              animation: "introMono 1.1s cubic-bezier(0.16,1,0.3,1) 1.1s forwards",
            }}
          >
            <span
              className="text-gold-gradient"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "3rem",
                fontWeight: 400,
                letterSpacing: "0.04em",
              }}
            >
              Z<span style={{ fontStyle: "italic", fontSize: "2rem", margin: "0 0.1em" }}>&amp;</span>A
            </span>
          </div>
        </div>

        {/* Names with shimmer sweep */}
        <h1
          style={{
            margin: 0,
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.4rem, 4vw, 2.2rem)",
            fontWeight: 300,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            opacity: 0,
            background:
              "linear-gradient(90deg, rgba(201,168,76,0.5) 0%, rgba(255,235,165,1) 50%, rgba(201,168,76,0.5) 100%)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
            animation:
              "introNames 1s cubic-bezier(0.16,1,0.3,1) 1.5s forwards, shimmerSweep 3s linear 1.6s infinite",
          }}
        >
          Zamirah &amp; Adriel
        </h1>

        {/* Date */}
        <p
          style={{
            margin: 0,
            fontFamily: "var(--font-sans)",
            fontSize: "0.58rem",
            textTransform: "uppercase",
            color: "rgba(245,237,224,0.4)",
            opacity: 0,
            animation: "introDate 1.4s cubic-bezier(0.16,1,0.3,1) 1.8s forwards",
          }}
        >
          July 2, 2027 · Miami, FL
        </p>

        {/* Growing line */}
        <span
          style={{
            height: 1,
            background: "var(--gold)",
            width: 0,
            animation: "introLine 0.9s cubic-bezier(0.16,1,0.3,1) 2s forwards",
          }}
        />
      </div>

      <style>{`
        @keyframes introMote {
          0%, 100% { transform: translateY(0); opacity: 0.2; }
          50%      { transform: translateY(-16px); opacity: 0.8; }
        }
        @keyframes introFade { to { opacity: 1; } }
        @keyframes introMono {
          from { opacity: 0; transform: scale(0.8); filter: blur(6px); }
          to   { opacity: 1; transform: scale(1);   filter: blur(0); }
        }
        @keyframes introNames {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes introDate {
          from { opacity: 0; letter-spacing: 0.2em; }
          to   { opacity: 1; letter-spacing: 0.55em; }
        }
        @keyframes introLine { to { width: 90px; } }
      `}</style>
    </div>
  )
}
