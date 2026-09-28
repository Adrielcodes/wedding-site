"use client"

import { useEffect, useRef } from "react"
import { MapPin, Car, Plane, Hotel } from "lucide-react"
import { SectionOrnament, CornerAccents } from "./section-ornament"

function RevealBlock({
  children,
  delay = 0,
  className = "",
  style,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  style?: React.CSSProperties
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
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      className={`scroll-reveal ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  )
}

const travelTips = [
  {
    icon: Plane,
    title: "By Air",
    description: "The nearest airports are Miami International (MIA) and Fort Lauderdale-Hollywood International (FLL), both approximately 30–40 miles from the venue.",
  },
  {
    icon: Car,
    title: "By Car",
    description: "Located at 18850 SW 232nd St, Homestead. Take FL-821 S to SW 232nd St. Complimentary parking will be provided at the venue.",
  },
  {
    icon: Hotel,
    title: "Accommodation",
    description: "Several hotels are available nearby in the Homestead and South Miami area. We recommend booking early, and plan for July heat: expect a hot, humid South Florida evening.",
  },
]

export function Location() {
  return (
    <section id="location" className="relative py-28 md:py-36 bg-background overflow-hidden">
      {/* Corner accents */}
      <CornerAccents size={64} />

      <div className="container mx-auto px-6 md:px-10 max-w-7xl relative z-10">

        {/* Top ornament */}
        <RevealBlock className="mb-14">
          <SectionOrnament />
        </RevealBlock>

        {/* Header */}
        <RevealBlock className="text-center mb-20">
          <p className="luxury-label mb-4">Getting Here</p>
          <h2 className="font-serif text-foreground leading-none" style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}>
            The Venue
          </h2>
          <div className="flex items-center justify-center gap-4 mt-6">
            <span className="gold-divider" />
          </div>
        </RevealBlock>

        {/* Two-col: venue info + map */}
        <div className="grid lg:grid-cols-2 gap-16 md:gap-20 mb-20 items-start">

          {/* Venue details */}
          <RevealBlock delay={100}>
            <div className="mb-8">
              <h3 className="font-serif text-foreground text-3xl md:text-4xl mb-3">
                Cinco Farm Gardens
              </h3>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "var(--accent)" }} />
                <div>
                  <p className="font-sans text-foreground" style={{ fontSize: "0.9rem" }}>
                    18850 SW 232nd St
                  </p>
                  <p className="font-sans text-muted-foreground" style={{ fontSize: "0.9rem" }}>
                    Miami, FL 33170
                  </p>
                </div>
              </div>
            </div>

            <div
              className="h-px w-full mb-8"
              style={{ background: "var(--border)" }}
            />

            <p className="font-sans text-muted-foreground leading-relaxed mb-2" style={{ fontSize: "0.92rem" }}>
              Cinco Farm Gardens is a stunning tropical venue nestled in South Miami, offering lush garden settings
              and open-air spaces — the perfect backdrop for our outdoor celebration.
            </p>
          </RevealBlock>

          {/* Map */}
          <RevealBlock delay={200}>
            <div className="relative overflow-hidden" style={{ border: "1px solid var(--border)" }}>
              {/* Gold corner accents */}
              <div
                className="absolute top-0 left-0 w-8 h-8 z-10 pointer-events-none"
                style={{ borderTop: "2px solid var(--accent)", borderLeft: "2px solid var(--accent)" }}
              />
              <div
                className="absolute bottom-0 right-0 w-8 h-8 z-10 pointer-events-none"
                style={{ borderBottom: "2px solid var(--accent)", borderRight: "2px solid var(--accent)" }}
              />
              <iframe
                src="https://maps.google.com/maps?q=18850+SW+232nd+St,+Miami,+FL+33170&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="380"
                style={{ border: 0, display: "block", filter: "grayscale(40%) contrast(1.1)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Wedding Venue Location"
              />
            </div>
            <p className="font-sans text-muted-foreground mt-3" style={{ fontSize: "0.75rem", textAlign: "right" }}>
              Click map for directions &rarr;
            </p>
          </RevealBlock>
        </div>

        {/* Travel tips */}
        <div className="grid md:grid-cols-3 gap-px" style={{ border: "1px solid var(--border)" }}>
          {travelTips.map((tip, i) => (
            <RevealBlock
              key={tip.title}
              delay={i * 120}
              className="p-10 bg-background group hover:bg-secondary transition-colors duration-300"
              style={i < 2 ? { borderRight: "1px solid var(--border)" } : {}}
            >
              <div
                className="inline-flex items-center justify-center w-10 h-10 mb-6"
                style={{ border: "1px solid var(--accent)" }}
              >
                <tip.icon className="w-4 h-4" style={{ color: "var(--accent)" }} />
              </div>
              <h4 className="font-serif text-foreground text-xl mb-3">{tip.title}</h4>
              <p className="font-sans text-muted-foreground leading-relaxed" style={{ fontSize: "0.88rem" }}>
                {tip.description}
              </p>
            </RevealBlock>
          ))}
        </div>

        {/* Bottom ornament */}
        <RevealBlock className="mt-8">
          <SectionOrnament flip />
        </RevealBlock>
      </div>
    </section>
  )
}
