"use client"

import { useEffect, useRef } from "react"

/* Floating particle data */
const PARTICLES = [
  { size: 2,   left: "12%",  top: "72%",  dur: "11s", delay: "0s",   dx: "18px"  },
  { size: 1.5, left: "28%",  top: "60%",  dur: "14s", delay: "2s",   dx: "-14px" },
  { size: 2.5, left: "45%",  top: "80%",  dur: "9s",  delay: "0.8s", dx: "22px"  },
  { size: 1.2, left: "62%",  top: "65%",  dur: "13s", delay: "3.5s", dx: "-10px" },
  { size: 2,   left: "78%",  top: "75%",  dur: "10s", delay: "1.2s", dx: "16px"  },
  { size: 1.8, left: "88%",  top: "55%",  dur: "12s", delay: "5s",   dx: "-20px" },
  { size: 1.4, left: "6%",   top: "45%",  dur: "15s", delay: "4s",   dx: "12px"  },
  { size: 2.2, left: "35%",  top: "88%",  dur: "8s",  delay: "2.5s", dx: "-16px" },
  { size: 1,   left: "55%",  top: "42%",  dur: "16s", delay: "7s",   dx: "8px"   },
  { size: 1.6, left: "70%",  top: "85%",  dur: "11s", delay: "0.4s", dx: "-12px" },
  { size: 3,   left: "20%",  top: "30%",  dur: "13s", delay: "6s",   dx: "24px"  },
  { size: 1.2, left: "92%",  top: "40%",  dur: "9s",  delay: "3s",   dx: "-8px"  },
]

export function HeroSection() {
  const parallaxRef = useRef<HTMLDivElement>(null)

  // Subtle mouse parallax on the name block (fine pointers only)
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return
    const el = parallaxRef.current
    if (!el) return
    let raf = 0
    let tx = 0, ty = 0, cx = 0, cy = 0
    const render = () => {
      cx += (tx - cx) * 0.08
      cy += (ty - cy) * 0.08
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`
      raf = requestAnimationFrame(render)
    }
    const onMove = (e: MouseEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 24
      ty = (e.clientY / window.innerHeight - 0.5) * 16
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    raf = requestAnimationFrame(render)
    return () => {
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "#0a1410" }}
    >
      {/* Animated aurora backdrop */}
      <div className="aurora" />

      {/* Floating gold particles */}
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className="particle"
          style={{
            width:  p.size,
            height: p.size,
            left:   p.left,
            top:    p.top,
            background: "rgba(201,168,76,0.65)",
            "--dur":   p.dur,
            "--delay": p.delay,
            "--dx":    p.dx,
          } as React.CSSProperties}
        />
      ))}

      {/* Subtle grain texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
          backgroundSize: "256px 256px",
        }}
      />

      {/* Radial glow — deep forest green */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 55%, rgba(30,65,40,0.55) 0%, transparent 70%)",
        }}
      />

      {/* Slowly rotating gold ring behind the names */}
      <div
        className="absolute pointer-events-none spin-slow"
        style={{
          width: "min(78vh, 92vw)",
          height: "min(78vh, 92vw)",
          opacity: 0.5,
        }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 400 400" fill="none" width="100%" height="100%">
          <circle cx="200" cy="200" r="198" stroke="rgba(201,168,76,0.18)" strokeWidth="0.5" />
          <circle cx="200" cy="200" r="170" stroke="rgba(201,168,76,0.10)" strokeWidth="0.5" strokeDasharray="2 8" />
          {[0, 90, 180, 270].map((deg) => (
            <polygon
              key={deg}
              points="200,0 204,6 200,12 196,6"
              fill="rgba(201,168,76,0.5)"
              transform={`rotate(${deg} 200 200)`}
            />
          ))}
        </svg>
      </div>

      {/* Content */}
      <div ref={parallaxRef} className="relative z-10 text-center px-6 select-none">
        <p
          className="hero-sub font-sans text-white/35 tracking-[0.7em] uppercase mb-12"
          style={{ fontSize: "0.58rem" }}
        >
          You Are Invited
        </p>

        <h1 className="font-serif text-white leading-none">
          <span
            className="hero-name hero-name-1 block tracking-tight"
            style={{ fontSize: "clamp(5rem, 14vw, 11rem)", fontWeight: 300 }}
          >
            Zami
          </span>
          <span
            className="hero-name hero-name-2 gold-shimmer block italic font-light"
            style={{
              fontSize: "clamp(1.6rem, 4vw, 3.2rem)",
              margin: "0.3em 0",
              letterSpacing: "0.1em",
            }}
          >
            &amp;
          </span>
          <span
            className="hero-name hero-name-3 block tracking-tight"
            style={{ fontSize: "clamp(5rem, 14vw, 11rem)", fontWeight: 300 }}
          >
            Adriel
          </span>
        </h1>

        <div className="hero-date flex items-center justify-center gap-6 mt-12">
          <span className="hidden sm:inline-block" style={{ width: 40, height: 1, background: "rgba(201,168,76,0.4)" }} />
          <p
            className="font-sans text-white/40 tracking-[0.55em] uppercase"
            style={{ fontSize: "0.6rem" }}
          >
            July 2027 &nbsp;·&nbsp; Napa Valley
          </p>
          <span className="hidden sm:inline-block" style={{ width: 40, height: 1, background: "rgba(201,168,76,0.4)" }} />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none">
        <p
          className="font-sans text-white/25 tracking-[0.55em] uppercase"
          style={{ fontSize: "0.55rem" }}
        >
          Scroll
        </p>
        <div
          className="w-px h-12 overflow-hidden"
          style={{ background: "rgba(255,255,255,0.07)" }}
        >
          <div
            style={{
              width: "100%",
              height: "50%",
              background: "rgba(201,168,76,0.5)",
              animation: "scrollPulse 2s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes scrollPulse {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(250%); }
        }
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-name {
          animation: heroFadeUp 1.4s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .hero-name-1 { animation-delay: 0.5s; }
        .hero-name-2 { animation-delay: 0.7s; }
        .hero-name-3 { animation-delay: 0.9s; }
        .hero-sub    { animation: heroFadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 1.1s both; }
        .hero-date   { animation: heroFadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 1.3s both; }
      `}</style>
    </section>
  )
}
