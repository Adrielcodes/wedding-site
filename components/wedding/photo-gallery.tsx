"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { SectionOrnament, CornerAccents } from "./section-ornament"

const photos = [
  {
    src: "/handhold2.jpg",
    alt: "Zamirah and Adriel holding hands",
    col: "col-span-2",
    row: "row-span-2",
  },
  {
    src: "/BZ7A8181.jpg",
    alt: "Captured moment",
    col: "col-span-1",
    row: "row-span-1",
  },
  {
    src: "/BZ7A8183.jpg",
    alt: "Captured moment",
    col: "col-span-1",
    row: "row-span-1",
  },
  {
    src: "/BZ7A8202.jpg",
    alt: "Captured moment",
    col: "col-span-1",
    row: "row-span-2",
  },
  {
    src: "/IMG_2965.jpg",
    alt: "Captured moment",
    col: "col-span-1",
    row: "row-span-1",
  },
  {
    src: "/walking.jpg",
    alt: "Zamirah and Adriel walking together",
    col: "col-span-2",
    row: "row-span-1",
  },
  {
    src: "/C93679DD-D674-46D5-91D9-8DD5FF930594.png",
    alt: "Captured moment",
    col: "col-span-1",
    row: "row-span-1",
  },
  {
    src: "/engagement/stairsbothsmiling.jpg",
    alt: "Zamirah and Adriel smiling on the stairs",
    col: "col-span-2",
    row: "row-span-2",
  },
  {
    src: "/engagement/adrielturnzamismile.jpg",
    alt: "Adriel and Zamirah sharing a smile",
    col: "col-span-1",
    row: "row-span-1",
  },
  {
    src: "/engagement/nightzamikissing.jpg",
    alt: "Romantic evening together",
    col: "col-span-1",
    row: "row-span-1",
  },
  {
    src: "/engagement/lookingateachotherorg.jpg",
    alt: "Zamirah and Adriel gazing at each other",
    col: "col-span-1",
    row: "row-span-2",
  },
  {
    src: "/engagement/blackwhitepickup.jpg",
    alt: "Classic black and white moment",
    col: "col-span-1",
    row: "row-span-1",
  },
  {
    src: "/engagement/silly1.jpg",
    alt: "Laughing and being silly together",
    col: "col-span-1",
    row: "row-span-1",
  },
  {
    src: "/engagement/running.jpg",
    alt: "Running together",
    col: "col-span-2",
    row: "row-span-1",
  },
  {
    src: "/engagement/zamikissingdown.jpg",
    alt: "Sweet kiss",
    col: "col-span-1",
    row: "row-span-2",
  },
  {
    src: "/engagement/blackwhitewalking.jpg",
    alt: "Walking together in black and white",
    col: "col-span-1",
    row: "row-span-1",
  },
  {
    src: "/engagement/distancelookingateachother.jpg",
    alt: "Looking at each other",
    col: "col-span-1",
    row: "row-span-1",
  },
  {
    src: "/engagement/silly2.jpg",
    alt: "Fun moment together",
    col: "col-span-2",
    row: "row-span-1",
  },
  {
    src: "/engagement/stairsbothsmilingzoom.jpg",
    alt: "Up close smiles on the stairs",
    col: "col-span-1",
    row: "row-span-1",
  },
  {
    src: "/engagement/blackandwhiteturnsmile.jpg",
    alt: "Turning to smile in black and white",
    col: "col-span-1",
    row: "row-span-1",
  },
]

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
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} className={`scroll-reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

export function PhotoGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const prev = () => setLightboxIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length))
  const next = () => setLightboxIndex((i) => (i === null ? null : (i + 1) % photos.length))

  useEffect(() => {
    if (lightboxIndex === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null)
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxIndex])

  return (
    <section id="gallery" className="relative py-28 md:py-36 bg-secondary overflow-hidden">
      {/* Corner accents */}
      <CornerAccents size={64} />

      <div className="container mx-auto px-6 md:px-10 max-w-7xl relative z-10">

        {/* Top ornament */}
        <RevealBlock className="mb-14">
          <SectionOrnament />
        </RevealBlock>

        {/* Header */}
        <RevealBlock className="text-center mb-20">
          <p className="luxury-label mb-4">Captured Moments</p>
          <h2 className="font-serif text-foreground leading-none" style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}>
            Our Gallery
          </h2>
          <div className="flex items-center justify-center gap-4 mt-6">
            <span className="gold-divider" />
          </div>
        </RevealBlock>

        {/* Editorial masonry grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
          style={{ gridAutoRows: "200px", gridAutoFlow: "dense" } as React.CSSProperties}
        >
          {photos.map((photo, index) => (
            <RevealBlock
              key={index}
              delay={index * 80}
              className={`${photo.col} ${photo.row} relative overflow-hidden group cursor-pointer gold-sweep`}
            >
              <button
                onClick={() => setLightboxIndex(index)}
                className="absolute inset-0 w-full h-full"
                aria-label={`View: ${photo.alt}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "rgba(201,168,76,0.15)" }}
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ boxShadow: "inset 0 0 0 2px rgba(201,168,76,0.5)" }}
                />
              </button>
            </RevealBlock>
          ))}
        </div>

        {/* Bottom ornament */}
        <RevealBlock className="mt-16">
          <SectionOrnament flip />
        </RevealBlock>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.95)" }}
          onClick={() => setLightboxIndex(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors p-2"
            onClick={() => setLightboxIndex(null)}
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
          <button
            className="absolute left-4 md:left-8 text-white/50 hover:text-white transition-colors p-2"
            onClick={(e) => { e.stopPropagation(); prev() }}
            aria-label="Previous"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>
          <div
            className="relative"
            style={{ width: "min(90vw, 1100px)", height: "min(80vh, 700px)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[lightboxIndex].src}
              alt={photos[lightboxIndex].alt}
              fill
              className="object-contain"
              sizes="90vw"
            />
            <div
              className="absolute top-0 left-0 w-8 h-8 pointer-events-none"
              style={{ borderTop: "1px solid var(--accent)", borderLeft: "1px solid var(--accent)" }}
            />
            <div
              className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none"
              style={{ borderBottom: "1px solid var(--accent)", borderRight: "1px solid var(--accent)" }}
            />
          </div>
          <button
            className="absolute right-4 md:right-8 text-white/50 hover:text-white transition-colors p-2"
            onClick={(e) => { e.stopPropagation(); next() }}
            aria-label="Next"
          >
            <ChevronRight className="w-7 h-7" />
          </button>
          <p
            className="absolute bottom-6 left-1/2 -translate-x-1/2 font-sans text-white/40"
            style={{ fontSize: "0.7rem", letterSpacing: "0.3em" }}
          >
            {lightboxIndex + 1} / {photos.length}
          </p>
        </div>
      )}
    </section>
  )
}
