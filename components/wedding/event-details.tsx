"use client"

import { useEffect, useRef } from "react"
import { Clock, MapPin, Calendar, Shirt } from "lucide-react"
import { SectionOrnament, CornerAccents } from "./section-ornament"

function RevealBlock({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
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
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      className={`scroll-reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export function EventDetails() {
  return (
    <section
      id="details"
      className="relative py-28 md:py-36 overflow-hidden bg-background"
    >
      {/* Corner accents */}
      <CornerAccents size={64} />

      <div className="container mx-auto px-6 md:px-10 max-w-7xl relative z-10">

        {/* Top ornament */}
        <RevealBlock className="mb-14">
          <SectionOrnament />
        </RevealBlock>

        {/* Header */}
        <RevealBlock className="text-center mb-20">
          <p
            className="font-sans mb-4"
            style={{
              fontSize: "0.68rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "var(--accent)",
            }}
          >
            When &amp; Where
          </p>
          <h2 className="font-serif text-white leading-none" style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}>
            Wedding Details
          </h2>
          <div className="flex items-center justify-center gap-4 mt-6">
            <span className="gold-divider" />
          </div>
        </RevealBlock>

        {/* Single combined Ceremony & Reception card */}
        <RevealBlock delay={150} className="mb-20">
          <div
            className="p-10 md:p-16 lift gold-sweep"
            style={{ border: "1px solid rgba(201,168,76,0.2)" }}
          >
            {/* Icon */}
            <div
              className="inline-flex items-center justify-center w-10 h-10 mb-8"
              style={{ border: "1px solid var(--accent)" }}
            >
              <Calendar className="w-4 h-4" style={{ color: "var(--accent)" }} />
            </div>

            <h3 className="font-serif text-white mb-8" style={{ fontSize: "2.4rem" }}>
              Ceremony &amp; Reception
            </h3>

            {/* Venue */}
            <div className="flex items-start gap-3 mb-6">
              <MapPin className="w-3.5 h-3.5 mt-1 flex-shrink-0" style={{ color: "var(--accent)" }} />
              <div>
                <p className="font-sans text-white/80 mb-0.5" style={{ fontSize: "0.9rem" }}>
                  The Grand Estate — Napa Valley
                </p>
                <p className="font-sans text-white/40 pl-0" style={{ fontSize: "0.78rem" }}>
                  1234 Vineyard Lane, Napa Valley, CA 94558
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px w-full mb-8" style={{ background: "rgba(201,168,76,0.15)" }} />

            {/* Two time columns */}
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "var(--accent)" }} />
                  <span className="font-sans text-white/70" style={{ fontSize: "0.85rem" }}>
                    4:00 PM — Ceremony
                  </span>
                </div>
                <p className="font-sans text-white/55 leading-relaxed pl-6" style={{ fontSize: "0.88rem" }}>
                  Exchange of vows in the candlelit garden setting, surrounded by rolling vineyards and old-growth trees.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "var(--accent)" }} />
                  <span className="font-sans text-white/70" style={{ fontSize: "0.85rem" }}>
                    6:00 PM — Reception
                  </span>
                </div>
                <p className="font-sans text-white/55 leading-relaxed pl-6" style={{ fontSize: "0.88rem" }}>
                  An evening of fine dining, dancing, and celebration in the stunning barrel-vaulted ballroom.
                </p>
              </div>
            </div>
          </div>
        </RevealBlock>

        {/* Dress Code */}
        <RevealBlock delay={300}>
          <div
            className="text-center py-14 px-8 lift gold-sweep"
            style={{ border: "1px solid rgba(201,168,76,0.2)" }}
          >
            <div
              className="inline-flex items-center justify-center w-10 h-10 mb-6"
              style={{ border: "1px solid var(--accent)" }}
            >
              <Shirt className="w-4 h-4" style={{ color: "var(--accent)" }} />
            </div>
            <p
              className="font-sans mb-3"
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "var(--accent)",
              }}
            >
              Dress Code
            </p>
            <h3 className="font-serif text-white text-3xl md:text-4xl mb-4">
              Black Tie
            </h3>
            <p className="font-sans text-white/60 max-w-xl mx-auto leading-relaxed" style={{ fontSize: "0.88rem" }}>
              We invite you to dress elegantly for our celebration. Suggested palette: BLACK! That&apos;s it! Please avoid any color.
            </p>
          </div>
        </RevealBlock>

        {/* Bottom ornament */}
        <RevealBlock className="mt-16">
          <SectionOrnament flip />
        </RevealBlock>
      </div>
    </section>
  )
}
