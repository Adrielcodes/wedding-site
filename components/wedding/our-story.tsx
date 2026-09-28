"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { SectionOrnament, CornerAccents } from "./section-ornament"

const milestones = [
  {
    date: "Dec 2024",
    title: "First Meeting",
    description: "We met at a friend's Christmas gathering. My first impression was confusion — he drew me in a game. Not love at first sight, but definitely laughter.",
  },
  {
    date: "Mar 2025",
    title: "First Date",
    description: "Rooftop cinema, Ratatouille, and an Italian dinner straight from the film. The perfect beginning.",
  },
  {
    date: "May 2025",
    title: "Officially Us",
    description: "A picnic in the park. He asked me to be his girlfriend, and we celebrated the only logical way — sushi.",
  },
  {
    date: "Mar 2026",
    title: "The Proposal",
    description: "Puerto Rico. Surrounded by family, at the beach. The view, the moment, and the answer — all perfect.",
  },
  {
    date: "Jul 2027",
    title: "Forever Begins",
    description: "We can't wait to celebrate our love with all of our favorite people. This is just the beginning.",
  },
]

function useScrollReveal() {
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
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

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

export function OurStory() {
  const sectionRef = useScrollReveal()

  return (
    <section id="our-story" className="relative py-28 md:py-36 bg-background overflow-hidden">
      {/* Corner accents */}
      <CornerAccents size={64} />

      <div className="container mx-auto px-6 md:px-10 max-w-7xl relative z-10">

        {/* Top ornament */}
        <RevealBlock className="mb-14">
          <SectionOrnament />
        </RevealBlock>

        {/* Section label */}
        <RevealBlock className="text-center mb-20">
          <p className="luxury-label mb-4">How It All Began</p>
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground leading-none">
            Our Story
          </h2>
          <div className="flex items-center justify-center gap-4 mt-6">
            <span className="gold-divider" />
          </div>
        </RevealBlock>

        {/* Two-column: photo left, intro text right */}
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center mb-28">

          {/* Photo */}
          <RevealBlock delay={100}>
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="/handhold.png"
                alt="Zamirah and Adriel"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Gold corner accent */}
              <div
                className="absolute bottom-0 right-0 w-20 h-20 pointer-events-none"
                style={{ borderBottom: "2px solid var(--accent)", borderRight: "2px solid var(--accent)" }}
              />
              <div
                className="absolute top-0 left-0 w-20 h-20 pointer-events-none"
                style={{ borderTop: "2px solid var(--accent)", borderLeft: "2px solid var(--accent)" }}
              />
            </div>
          </RevealBlock>

          {/* Intro text */}
          <RevealBlock delay={200}>
            <p className="luxury-label mb-6">Zamirah &amp; Adriel</p>
            <h3 className="font-serif text-3xl md:text-4xl text-foreground leading-snug mb-6">
              A love story written<br />
              <em>in laughter and adventure.</em>
            </h3>
            <p className="font-sans text-muted-foreground leading-relaxed mb-5" style={{ fontSize: "0.95rem" }}>
              What started as a chaotic Christmas game turned into a rooftop cinema date, spontaneous sushi nights, and a beachside proposal in Puerto Rico — proof that the best love stories begin unexpectedly.
            </p>
            <p className="font-sans text-muted-foreground leading-relaxed" style={{ fontSize: "0.95rem" }}>
              On July 2, 2027, in Miami, FL, we invite you to witness the next chapter of our forever.
            </p>
            <div className="flex items-center gap-4 mt-8">
              <span className="gold-divider" />
              <span className="font-serif italic text-muted-foreground text-lg">Zamirah &amp; Adriel</span>
            </div>
          </RevealBlock>
        </div>

        {/* Timeline */}
        <div ref={sectionRef} className="scroll-reveal max-w-3xl mx-auto">
          <div className="space-y-0">
            {milestones.map((event, i) => (
              <RevealBlock key={i} delay={i * 120} className="flex gap-8 group">
                {/* Left — date */}
                <div className="w-24 flex-shrink-0 text-right pt-1">
                  <span
                    className="font-sans text-muted-foreground"
                    style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase" }}
                  >
                    {event.date}
                  </span>
                </div>

                {/* Center — line + dot */}
                <div className="flex flex-col items-center">
                  <div
                    className="w-2 h-2 rounded-full mt-2 flex-shrink-0 transition-colors duration-300 group-hover:scale-150"
                    style={{ background: "var(--accent)", transition: "background 0.3s, transform 0.3s" }}
                  />
                  {i < milestones.length - 1 && (
                    <div className="w-px flex-1 mt-2 mb-0" style={{ background: "var(--border)", minHeight: "3rem" }} />
                  )}
                </div>

                {/* Right — content */}
                <div className="pb-10">
                  <h4 className="font-serif text-xl text-foreground mb-2">{event.title}</h4>
                  <p className="font-sans text-muted-foreground leading-relaxed" style={{ fontSize: "0.9rem" }}>
                    {event.description}
                  </p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>

        {/* Bottom ornament */}
        <RevealBlock className="mt-16">
          <SectionOrnament flip />
        </RevealBlock>
      </div>
    </section>
  )
}
