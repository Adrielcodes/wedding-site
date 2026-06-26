"use client"

import { useEffect, useRef, useState } from "react"
import { SectionOrnament, CornerAccents } from "./section-ornament"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function RevealBlock({
  children,
  delay = 0,
}: {
  children: React.ReactNode
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove("from-above")
          el.classList.add("in-view")
        } else {
          el.classList.remove("in-view")
          if (entry.boundingClientRect.top < 0) el.classList.add("from-above")
          else el.classList.remove("from-above")
        }
      },
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="scroll-reveal"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

function TimeUnit({ value, label, delay }: { value: string; label: string; delay: number }) {
  return (
    <RevealBlock delay={delay}>
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "clamp(90px, 18vw, 150px)",
            height: "clamp(90px, 18vw, 150px)",
            border: "1px solid rgba(201,168,76,0.3)",
            background: "rgba(201,168,76,0.04)",
          }}
        >
          {/* Corner dots */}
          {[[-1,-1],[1,-1],[1,1],[-1,1]].map(([x, y], i) => (
            <span
              key={i}
              style={{
                position: "absolute",
                width: 4, height: 4,
                borderRadius: "50%",
                background: "rgba(201,168,76,0.45)",
                top: y === -1 ? -2 : undefined,
                bottom: y === 1 ? -2 : undefined,
                left: x === -1 ? -2 : undefined,
                right: x === 1 ? -2 : undefined,
              }}
            />
          ))}
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.2rem, 6vw, 3.8rem)",
              fontWeight: 300,
              color: "#f5ede0",
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            {value}
          </span>
        </div>
        <p
          style={{
            marginTop: "1rem",
            fontFamily: "var(--font-sans)",
            fontSize: "0.58rem",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "rgba(201,168,76,0.65)",
          }}
        >
          {label}
        </p>
      </div>
    </RevealBlock>
  )
}

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const weddingDate = new Date("2027-05-01T16:00:00")

    const tick = () => {
      const diff = weddingDate.getTime() - Date.now()
      if (diff > 0) {
        setTimeLeft({
          days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        })
      }
    }

    tick()
    const timer = setInterval(tick, 1000)
    return () => clearInterval(timer)
  }, [])

  const units = [
    { label: "Days",    value: timeLeft.days },
    { label: "Hours",   value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ]

  const fmt = (n: number) => (mounted ? n.toString().padStart(2, "0") : "--")

  return (
    <section
      id="countdown"
      style={{
        background: "var(--secondary)",
        padding: "8rem 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <CornerAccents size={64} />

      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "0 1.5rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Top ornament */}
        <RevealBlock>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "3.5rem" }}>
            <SectionOrnament />
          </div>
        </RevealBlock>

        {/* Header */}
        <RevealBlock delay={80}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.6rem",
                letterSpacing: "0.6em",
                textTransform: "uppercase",
                color: "rgba(201,168,76,0.7)",
                marginBottom: "1rem",
              }}
            >
              Counting Down To
            </p>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2.8rem, 6vw, 5rem)",
                color: "#f5ede0",
                fontWeight: 300,
                lineHeight: 1,
              }}
            >
              Our Big Day
            </h2>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "1.5rem",
                marginTop: "1.5rem",
              }}
            >
              <span style={{ display: "inline-block", width: 60, height: 1, background: "var(--accent)" }} />
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.62rem",
                  letterSpacing: "0.45em",
                  textTransform: "uppercase",
                  color: "rgba(245,237,224,0.35)",
                }}
              >
                May 1, 2027 · Miami, FL
              </p>
              <span style={{ display: "inline-block", width: 60, height: 1, background: "var(--accent)" }} />
            </div>
          </div>
        </RevealBlock>

        {/* Timer units */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "clamp(1rem, 4vw, 3rem)",
            flexWrap: "wrap",
          }}
        >
          {units.map((u, i) => (
            <TimeUnit key={u.label} value={fmt(u.value)} label={u.label} delay={160 + i * 80} />
          ))}
        </div>

        {/* Bottom ornament */}
        <RevealBlock delay={400}>
          <div style={{ display: "flex", justifyContent: "center", marginTop: "3.5rem" }}>
            <SectionOrnament flip />
          </div>
        </RevealBlock>
      </div>
    </section>
  )
}
