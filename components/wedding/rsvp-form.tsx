"use client"

import { useState } from "react"
import { SectionOrnament, CornerAccents } from "./section-ornament"

// ── Birds — large, aimed at screen corners ─────────────────
const BIRDS = [
  // upper-right corner
  { dx:  950, dy: -520, delay:   0, dur: 5000, size: 48, wb: 200 },
  { dx:  800, dy: -460, delay: 150, dur: 4700, size: 38, wb: 225 },
  { dx:  680, dy: -580, delay: 310, dur: 5300, size: 28, wb: 260 },
  // upper-left corner
  { dx: -910, dy: -500, delay:  90, dur: 4900, size: 44, wb: 210 },
  { dx: -760, dy: -440, delay: 230, dur: 4500, size: 34, wb: 240 },
  { dx: -640, dy: -560, delay: 390, dur: 5100, size: 26, wb: 280 },
  // wide-angle stragglers
  { dx:  1050, dy: -280, delay: 130, dur: 4300, size: 40, wb: 220 },
  { dx: -1000, dy: -260, delay: 210, dur: 4600, size: 32, wb: 250 },
]

// pre-build per-bird keyframe CSS (avoids CSS-var-in-keyframe issues)
const BIRD_CSS = BIRDS.map((b, i) => `
  @keyframes bf${i} {
    0%   { transform: translate(0px,0px) scale(1); opacity: 0; }
    6%   { opacity: 1; }
    80%  { opacity: 0.9; }
    100% { transform: translate(${b.dx}px,${b.dy}px) scale(0); opacity: 0; }
  }
`).join("")

function BirdSVG({ size }: { size: number }) {
  return (
    <svg
      width={size * 2.4}
      height={size * 1.2}
      viewBox="-15 -13 30 14"
      style={{ overflow: "visible", display: "block" }}
      aria-hidden="true"
    >
      <path d="M0,0 Q-5,-12,-14,-4" stroke="white" strokeWidth="2.6" strokeLinecap="round" fill="none" />
      <path d="M0,0 Q5,-12,14,-4"  stroke="white" strokeWidth="2.6" strokeLinecap="round" fill="none" />
      <circle cx="0" cy="0" r="2" fill="white" />
    </svg>
  )
}

// ── Fireworks — burst on left & right of the letter ────────
const FW_COLORS = ["#c9a84c", "#ffffff", "#f5ede0", "#e8d5a8"]
const FW_N = 14  // particles per burst

interface FWBurst {
  left: string; top: string; delay: number; dur: number
  particles: { dx: number; dy: number; size: number; color: string }[]
}

function makeBurst(left: string, top: string, delay: number, dur: number, r: number): FWBurst {
  return {
    left, top, delay, dur,
    particles: Array.from({ length: FW_N }, (_, i) => {
      const angle = (360 / FW_N) * i
      const dist  = r * (0.6 + (i % 3) * 0.2)
      const rad   = (angle * Math.PI) / 180
      return {
        dx:    Math.cos(rad) * dist,
        dy:    Math.sin(rad) * dist,
        size:  i % 3 === 0 ? 7 : i % 3 === 1 ? 5 : 4,
        color: FW_COLORS[i % FW_COLORS.length],
      }
    }),
  }
}

const FIREWORKS: FWBurst[] = [
  // left side — staggered so each pop is distinct
  makeBurst("11%", "30%",    0, 3200, 105),
  makeBurst("16%", "50%",  500, 3000,  90),
  makeBurst(" 8%", "65%", 1000, 3100,  95),
  makeBurst("14%", "20%", 1500, 2900,  80),
  // right side — offset so left fires first, right echoes
  makeBurst("89%", "30%",  260, 3200, 105),
  makeBurst("84%", "50%",  760, 3000,  90),
  makeBurst("92%", "65%", 1260, 3100,  95),
  makeBurst("86%", "20%", 1760, 2900,  80),
]

// pre-build per-particle keyframe CSS
// 0% starts at opacity:0 so particles are invisible during their delay (no flash)
const FW_CSS = FIREWORKS.flatMap((fw, fi) =>
  fw.particles.map((p, pi) => `
    @keyframes fw_${fi}_${pi} {
      0%   { transform: translate(0px,0px) scale(0.1); opacity: 0; }
      8%   { opacity: 1; }
      65%  { opacity: 0.8; }
      100% { transform: translate(${p.dx.toFixed(1)}px,${p.dy.toFixed(1)}px) scale(0); opacity: 0; }
    }
  `)
).join("")


// ── Field sub-components (cream theme) ────────────────────
function Field({
  id, name, type = "text", placeholder, required, label,
}: {
  id: string; name: string; type?: string
  placeholder: string; required?: boolean; label: string
}) {
  return (
    <div>
      <label
        htmlFor={id}
        style={{ display: "block", fontSize: "0.62rem", letterSpacing: "0.28em",
          textTransform: "uppercase", color: "rgba(30,20,10,0.45)", marginBottom: "0.5rem",
          fontFamily: "var(--font-sans)" }}
      >
        {label}
      </label>
      <input
        id={id} name={name} type={type} placeholder={placeholder} required={required}
        style={{
          width: "100%", background: "transparent", fontFamily: "var(--font-sans)",
          fontSize: "0.95rem", color: "rgba(20,14,6,0.85)", outline: "none",
          paddingBottom: "0.6rem", borderBottom: "1px solid rgba(160,130,80,0.3)",
          transition: "border-color 0.2s",
        }}
        onFocus={e => (e.currentTarget.style.borderBottomColor = "var(--accent)")}
        onBlur={e  => (e.currentTarget.style.borderBottomColor = "rgba(160,130,80,0.3)")}
      />
    </div>
  )
}

function FieldTextarea({
  id, name, placeholder, label, rows = 3,
}: { id: string; name: string; placeholder: string; label: string; rows?: number }) {
  return (
    <div>
      <label
        htmlFor={id}
        style={{ display: "block", fontSize: "0.62rem", letterSpacing: "0.28em",
          textTransform: "uppercase", color: "rgba(30,20,10,0.45)", marginBottom: "0.5rem",
          fontFamily: "var(--font-sans)" }}
      >
        {label}
      </label>
      <textarea
        id={id} name={name} placeholder={placeholder} rows={rows}
        style={{
          width: "100%", background: "transparent", fontFamily: "var(--font-sans)",
          fontSize: "0.95rem", color: "rgba(20,14,6,0.85)", outline: "none", resize: "none",
          paddingBottom: "0.6rem", borderBottom: "1px solid rgba(160,130,80,0.3)",
          transition: "border-color 0.2s",
        }}
        onFocus={e => (e.currentTarget.style.borderBottomColor = "var(--accent)")}
        onBlur={e  => (e.currentTarget.style.borderBottomColor = "rgba(160,130,80,0.3)")}
      />
    </div>
  )
}

// ── Wax seal SVG ──────────────────────────────────────────
function WaxSeal({ size = 72 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M36 4 C42 2 50 6 55 12 C61 16 68 22 68 30 C70 38 66 48 60 54 C54 62 44 70 36 68 C28 70 18 62 12 54 C6 48 2 38 4 30 C4 22 10 14 16 9 C22 4 30 6 36 4Z"
        fill="var(--accent)" opacity="0.9"
      />
      <circle cx="36" cy="36" r="22" stroke="rgba(255,255,255,0.25)" strokeWidth="1" fill="none" />
      <text x="36" y="41" textAnchor="middle"
        fontFamily="Georgia, serif" fontSize="14" fontWeight="400"
        fill="rgba(255,255,255,0.9)" letterSpacing="2">
        Z·A
      </text>
    </svg>
  )
}

// ── RSVP Form ─────────────────────────────────────────────
export function RSVPForm() {
  const [opened,       setOpened]       = useState(false)
  const [submitted,    setSubmitted]    = useState(false)
  const [birdsPhase,   setBirdsPhase]   = useState<"off"|"on"|"fading">("off")
  const [attendance,   setAttendance]   = useState<string>("")
  const [guests,       setGuests]       = useState<string>("")
  const [meal,         setMeal]         = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage(null)
    setIsSubmitting(true)
    try {
      const formData = new FormData(e.currentTarget)
      const payload = {
        firstName:   String(formData.get("firstName")   ?? "").trim(),
        lastName:    String(formData.get("lastName")    ?? "").trim(),
        email:       String(formData.get("email")       ?? "").trim(),
        attendance,
        guests:      attendance === "yes" ? guests : null,
        meal:        attendance === "yes" ? meal   : null,
        dietary:     attendance === "yes" ? String(formData.get("dietary") ?? "").trim() : "",
        songRequest: String(formData.get("songRequest") ?? "").trim(),
        message:     String(formData.get("message")     ?? "").trim(),
      }
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { error?: string } | null
        throw new Error(body?.error || "Could not submit RSVP right now. Please try again.")
      }
      setSubmitted(true)
      setBirdsPhase("on")
      setTimeout(() => setBirdsPhase("fading"), 7500)  // start fade-out
      setTimeout(() => setBirdsPhase("off"),    9000)  // remove from DOM
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Could not submit RSVP right now.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
    {/* ── Bird flock overlay ── */}
    {birdsPhase !== "off" && (
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 9999,
          opacity: birdsPhase === "fading" ? 0 : 1,
          transition: birdsPhase === "fading" ? "opacity 1.2s ease" : "none",
        }}
      >
        <style>{`
          @keyframes wingBeat {
            0%, 100% { transform: scaleY(1); }
            50%       { transform: scaleY(0.22); }
          }
          ${BIRD_CSS}
          ${FW_CSS}
        `}</style>

        {/* Birds — burst from screen centre */}
        <div style={{ position: "absolute", top: "50%", left: "50%" }}>
          {BIRDS.map((b, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                animation: `bf${i} ${b.dur}ms cubic-bezier(0.15,0,0.55,1) ${b.delay}ms both`,
              }}
            >
              <div style={{ animation: `wingBeat ${b.wb}ms ease-in-out infinite` }}>
                <BirdSVG size={b.size} />
              </div>
            </div>
          ))}
        </div>

        {/* Fireworks — left & right of letter */}
        {FIREWORKS.map((fw, fi) => (
          <div
            key={fi}
            style={{ position: "absolute", left: fw.left, top: fw.top }}
          >
            {fw.particles.map((p, pi) => (
              <div
                key={pi}
                style={{
                  position: "absolute",
                  top: -p.size / 2,
                  left: -p.size / 2,
                  width: p.size,
                  height: p.size,
                  borderRadius: "50%",
                  background: p.color,
                  animation: `fw_${fi}_${pi} ${fw.dur}ms ease-out ${fw.delay}ms both`,
                }}
              />
            ))}
          </div>
        ))}
      </div>
    )}

    <section id="rsvp" style={{ background: "var(--secondary)", padding: "8rem 0", position: "relative", overflow: "hidden" }}>
      {/* Corner accents */}
      <CornerAccents size={64} />

      <style>{`
        .env-flap {
          transform-origin: top center;
          transform: perspective(1200px) rotateX(0deg);
          transition: transform 0.9s cubic-bezier(0.4, 0, 0.2, 1);
          backface-visibility: hidden;
        }
        .env-flap.open { transform: perspective(1200px) rotateX(-175deg); }
        .env-body { max-height: 0; overflow: hidden; transition: max-height 1.1s cubic-bezier(0.4, 0, 0.2, 1); overflow-anchor: none; }
        .env-body.open { max-height: 3000px; }
        .env-card:hover .env-hint { opacity: 1 !important; }
        #rsvp { overflow-anchor: none; }
      `}</style>

      {/* Section header */}
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
          <SectionOrnament />
        </div>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.6rem", letterSpacing: "0.6em",
          textTransform: "uppercase", color: "rgba(201,168,76,0.7)", marginBottom: "1rem" }}>
          Join Our Celebration
        </p>
        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.8rem, 6vw, 5rem)",
          color: "#f5ede0", fontWeight: 300, lineHeight: 1 }}>
          Kindly Respond
        </h2>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.5rem", marginTop: "1.5rem" }}>
          <span style={{ display: "inline-block", width: 60, height: 1, background: "var(--accent)" }} />
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.62rem", letterSpacing: "0.45em",
            textTransform: "uppercase", color: "rgba(245,237,224,0.35)" }}>
            Reply by June 15, 2027
          </p>
          <span style={{ display: "inline-block", width: 60, height: 1, background: "var(--accent)" }} />
        </div>
      </div>

      {/* Envelope */}
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 1.5rem" }}>
        <div
          className="env-card"
          style={{ perspective: "1200px", cursor: opened ? "default" : "pointer" }}
          onClick={() => { if (!opened) setOpened(true) }}
          role={opened ? undefined : "button"}
          aria-label={opened ? undefined : "Open envelope to RSVP"}
        >
          {/* Envelope shell */}
          <div style={{
            position: "relative",
            background: "linear-gradient(160deg, #f5ede0 0%, #ede0c8 100%)",
            border: "1px solid rgba(160,130,80,0.35)",
            boxShadow: opened
              ? "0 24px 80px rgba(0,0,0,0.55), 0 4px 16px rgba(0,0,0,0.35)"
              : "0 12px 48px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.25)",
            transition: "box-shadow 0.6s ease",
          }}>
            {/* Fold lines */}
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "45%",
                background: "linear-gradient(135deg, transparent 49.8%, rgba(160,130,80,0.12) 50%)" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "45%",
                background: "linear-gradient(225deg, transparent 49.8%, rgba(160,130,80,0.12) 50%)" }} />
              <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "50%",
                background: "linear-gradient(to bottom right, transparent 49.8%, rgba(160,130,80,0.07) 50%)" }} />
              <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: "50%",
                background: "linear-gradient(to bottom left, transparent 49.8%, rgba(160,130,80,0.07) 50%)" }} />
            </div>

            {/* Flap area: spacer holds height = SVG natural height; SVG flap overlays; seal pins to fold point */}
            <div style={{ position: "relative" }}>
              {/* Spacer — padding-top animates from flap height → 0 when opened */}
              <div style={{
                paddingTop: opened ? "0%" : "34.375%",
                transition: "padding-top 0.9s cubic-bezier(0.4, 0, 0.2, 1)",
                pointerEvents: "none",
              }} />

              {/* SVG Flap — absolute, always 100% wide, triangle scales correctly */}
              <div
                className={`env-flap${opened ? " open" : ""}`}
                style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 2, lineHeight: 0 }}
              >
                <svg
                  width="100%"
                  viewBox="0 0 640 220"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ display: "block" }}
                >
                  <polygon points="0,0 640,0 320,220" fill="#f0e4cc" />
                  <line x1="0" y1="0.5" x2="640" y2="0.5" stroke="rgba(160,130,80,0.3)" strokeWidth="1.5" />
                  <line x1="0" y1="0" x2="320" y2="220" stroke="rgba(160,130,80,0.18)" strokeWidth="1" />
                  <line x1="640" y1="0" x2="320" y2="220" stroke="rgba(160,130,80,0.18)" strokeWidth="1" />
                </svg>
              </div>

              {/* Wax seal — bottom: 0, left: 50% pins center exactly on the fold point */}
              <div style={{
                position: "absolute", bottom: 0, left: "50%",
                transform: opened
                  ? "translate(-50%, 50%) scale(0.65)"
                  : "translate(-50%, 50%) scale(1)",
                opacity: opened ? 0 : 1,
                transition: "opacity 0.3s ease, transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                zIndex: 4, filter: "drop-shadow(0 4px 14px rgba(0,0,0,0.32))",
                pointerEvents: "none",
              }}>
                <WaxSeal size={72} />
              </div>
            </div>

            {/* Envelope face */}
            <div style={{ position: "relative", zIndex: 1, padding: "2.25rem 3rem 2.75rem" }}>
              {/* Address area (only when closed) */}
              {!opened && (
                <div style={{ marginBottom: "2rem" }}>
                  <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem", alignItems: "center" }}>
                    <span style={{ display: "inline-block", width: 48, height: 1, background: "rgba(160,130,80,0.3)" }} />
                    <p style={{ fontFamily: "var(--font-serif)", fontSize: "0.9rem", fontStyle: "italic",
                      color: "rgba(80,55,30,0.5)", letterSpacing: "0.05em" }}>
                      Together with their families
                    </p>
                  </div>
                  <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", fontWeight: 600,
                    color: "rgba(40,28,10,0.75)", letterSpacing: "0.02em", marginLeft: "3.5rem" }}>
                    Zamirah &amp; Adriel
                  </p>
                  <p style={{ fontFamily: "var(--font-serif)", fontSize: "0.85rem", fontStyle: "italic",
                    color: "rgba(80,55,30,0.45)", marginLeft: "3.5rem", marginTop: "0.3rem" }}>
                    request the honour of your presence
                  </p>
                </div>
              )}

              {/* Click hint */}
              {!opened && (
                <p className="env-hint" style={{
                  textAlign: "center", fontFamily: "var(--font-sans)", fontSize: "0.58rem",
                  letterSpacing: "0.5em", textTransform: "uppercase",
                  color: "rgba(160,130,80,0.55)", opacity: 0,
                  transition: "opacity 0.3s ease", marginTop: "0.5rem",
                }}>
                  Click to open
                </p>
              )}

              {/* RSVP form */}
              <div className={`env-body${opened ? " open" : ""}`}>
                <div style={{ paddingTop: "2rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2.5rem" }}>
                    <span style={{ flex: 1, height: 1, background: "rgba(160,130,80,0.25)" }} />
                    <p style={{ fontFamily: "var(--font-serif)", fontSize: "0.75rem", fontStyle: "italic",
                      color: "rgba(80,55,30,0.5)", letterSpacing: "0.1em" }}>Your Response</p>
                    <span style={{ flex: 1, height: 1, background: "rgba(160,130,80,0.25)" }} />
                  </div>

                  {submitted ? (
                    <div style={{ textAlign: "center", padding: "3rem 0", minHeight: "520px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center",
                        width: 52, height: 52, border: "1px solid var(--accent)", marginBottom: "1.5rem" }}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M4 10l5 5 7-7" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.6rem", letterSpacing: "0.5em",
                        textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.75rem" }}>Received</p>
                      <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", fontWeight: 300,
                        color: "rgba(20,14,6,0.85)", lineHeight: 1 }}>Thank You</h3>
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "rgba(40,28,10,0.5)",
                        marginTop: "1rem", lineHeight: 1.7 }}>
                        We&apos;ve received your response and can&apos;t wait to celebrate with you.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                        <Field id="firstName" name="firstName" placeholder="Zamirah"  label="First Name" required />
                        <Field id="lastName"  name="lastName"  placeholder="Smith" label="Last Name"  required />
                      </div>

                      <Field id="email" name="email" type="email" placeholder="you@example.com" label="Email Address" required />

                      <div>
                        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.62rem", letterSpacing: "0.28em",
                          textTransform: "uppercase", color: "rgba(30,20,10,0.45)", marginBottom: "1rem" }}>
                          Will You Attend?
                        </p>
                        <div style={{ display: "flex", gap: "1.5rem" }}>
                          {[
                            { value: "yes", label: "Joyfully Accept" },
                            { value: "no",  label: "Regretfully Decline" },
                          ].map(({ value, label }) => (
                            <button key={value} type="button"
                              onClick={() => { setAttendance(value); if (value !== "yes") { setGuests(""); setMeal("") } }}
                              style={{
                                fontFamily: "var(--font-sans)", fontSize: "0.82rem",
                                color: attendance === value ? "var(--accent)" : "rgba(30,20,10,0.38)",
                                borderBottom: attendance === value ? "1px solid var(--accent)" : "1px solid transparent",
                                paddingBottom: "0.25rem", background: "none", cursor: "pointer",
                                transition: "color 0.2s, border-color 0.2s",
                              }}>
                              {label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {attendance === "yes" && (
                        <>
                          <div>
                            <label htmlFor="guests" style={{ display: "block", fontFamily: "var(--font-sans)",
                              fontSize: "0.62rem", letterSpacing: "0.28em", textTransform: "uppercase",
                              color: "rgba(30,20,10,0.45)", marginBottom: "0.5rem" }}>Number of Guests</label>
                            <select id="guests" value={guests} onChange={e => setGuests(e.target.value)} required
                              style={{ width: "100%", background: "transparent", fontFamily: "var(--font-sans)",
                                fontSize: "0.95rem", color: guests ? "rgba(20,14,6,0.85)" : "rgba(30,20,10,0.3)",
                                outline: "none", paddingBottom: "0.6rem", cursor: "pointer",
                                borderBottom: "1px solid rgba(160,130,80,0.3)" }}>
                              <option value="" disabled>Select guests</option>
                              {["1","2","3","4"].map(n => (
                                <option key={n} value={n}>{n} Guest{parseInt(n) > 1 ? "s" : ""}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label htmlFor="meal" style={{ display: "block", fontFamily: "var(--font-sans)",
                              fontSize: "0.62rem", letterSpacing: "0.28em", textTransform: "uppercase",
                              color: "rgba(30,20,10,0.45)", marginBottom: "0.5rem" }}>Meal Preference</label>
                            <select id="meal" value={meal} onChange={e => setMeal(e.target.value)} required
                              style={{ width: "100%", background: "transparent", fontFamily: "var(--font-sans)",
                                fontSize: "0.95rem", color: meal ? "rgba(20,14,6,0.85)" : "rgba(30,20,10,0.3)",
                                outline: "none", paddingBottom: "0.6rem", cursor: "pointer",
                                borderBottom: "1px solid rgba(160,130,80,0.3)" }}>
                              <option value="" disabled>Select your preference</option>
                              <option value="beef">Filet Mignon</option>
                              <option value="chicken">Herb Roasted Chicken</option>
                              <option value="fish">Pan-Seared Salmon</option>
                              <option value="vegetarian">Vegetarian</option>
                              <option value="vegan">Vegan</option>
                            </select>
                          </div>

                          <FieldTextarea id="dietary" name="dietary" rows={2}
                            label="Dietary Restrictions or Allergies"
                            placeholder="Please let us know..." />
                        </>
                      )}

                      <Field id="songRequest" name="songRequest"
                        placeholder="Artist — Song title" label="Song Request (Optional)" />

                      <FieldTextarea id="message" name="message"
                        label="Message for the Couple (Optional)"
                        placeholder="Share your well wishes..." rows={3} />

                      {errorMessage && (
                        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", color: "#c0392b" }} role="alert">
                          {errorMessage}
                        </p>
                      )}

                      <div style={{ paddingTop: "0.5rem" }}>
                        <button type="submit"
                          disabled={isSubmitting || !attendance || (attendance === "yes" && (!guests || !meal))}
                          style={{ fontFamily: "var(--font-sans)", fontSize: "0.65rem", letterSpacing: "0.35em",
                            textTransform: "uppercase", padding: "0.9rem 3rem",
                            border: "1px solid var(--accent)", color: "var(--accent)",
                            background: "transparent", cursor: "pointer",
                            transition: "background 0.3s, color 0.3s" }}
                          onMouseEnter={e => {
                            if (!(e.currentTarget as HTMLButtonElement).disabled) {
                              e.currentTarget.style.background = "var(--accent)"
                              e.currentTarget.style.color = "#0e1309"
                            }
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.background = "transparent"
                            e.currentTarget.style.color = "var(--accent)"
                          }}>
                          {isSubmitting ? "Sending…" : "Send Response"}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

