"use client"

import { useEffect, useRef, useState } from "react"
import { Gift, ExternalLink } from "lucide-react"
import { SectionOrnament, CornerAccents } from "./section-ornament"
import type { RegistryItem } from "@/app/api/registry/route"

function RevealBlock({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode
  delay?: number
  className?: string
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
      className={`scroll-reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

const REGISTRY_URL = "https://www.amazon.com/wedding/share/zamiandadrielregistry"

function ItemCard({ item }: { item: RegistryItem }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="registry-card"
      style={{
        display: "block",
        height: "100%",
        border: "1px solid rgba(201,168,76,0.18)",
        background: "rgba(201,168,76,0.03)",
        overflow: "hidden",
        textDecoration: "none",
        transition: "border-color 0.3s ease, transform 0.3s ease",
        position: "relative",
      }}
    >
      {item.purchased && (
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 2,
            background: "rgba(0,0,0,0.7)",
            border: "1px solid rgba(201,168,76,0.4)",
            padding: "0.2rem 0.5rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.5rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(201,168,76,0.7)",
            }}
          >
            Purchased
          </span>
        </div>
      )}

      {item.image ? (
        <div
          style={{
            aspectRatio: "1 / 1",
            background: "#fff",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.image}
            alt={item.name}
            style={{ width: "100%", height: "100%", objectFit: "contain", padding: "1rem" }}
          />
        </div>
      ) : (
        <div
          style={{
            aspectRatio: "1 / 1",
            background: "rgba(201,168,76,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Gift style={{ width: 36, height: 36, color: "rgba(201,168,76,0.3)" }} />
        </div>
      )}

      <div style={{ padding: "1rem 1.1rem 1.25rem" }}>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.82rem",
            color: "rgba(245,237,224,0.8)",
            lineHeight: 1.45,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            marginBottom: "0.5rem",
          }}
        >
          {item.name}
        </p>
        {item.price && (
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.8rem",
              color: "var(--accent)",
              letterSpacing: "0.04em",
            }}
          >
            {item.price}
          </p>
        )}
      </div>
    </a>
  )
}

function SkeletonCard() {
  return (
    <div style={{ border: "1px solid rgba(201,168,76,0.12)", overflow: "hidden" }}>
      <div
        style={{
          aspectRatio: "1 / 1",
          background: "rgba(201,168,76,0.05)",
          animation: "registryPulse 1.6s ease-in-out infinite",
        }}
      />
      <div style={{ padding: "1rem 1.1rem 1.25rem" }}>
        <div
          style={{
            height: 12,
            background: "rgba(201,168,76,0.07)",
            marginBottom: 8,
            animation: "registryPulse 1.6s ease-in-out 0.2s infinite",
          }}
        />
        <div
          style={{
            height: 10,
            width: "60%",
            background: "rgba(201,168,76,0.07)",
            animation: "registryPulse 1.6s ease-in-out 0.4s infinite",
          }}
        />
      </div>
    </div>
  )
}

export function RegistrySection() {
  const [items,   setItems]   = useState<RegistryItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/registry")
      .then(r => r.json())
      .then((data: { items: RegistryItem[] }) => setItems(data.items ?? []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }, [])

  const visible = items.slice(0, 12)
  const purchased = items.filter(i => i.purchased).length
  const hasItems = !loading && visible.length > 0

  return (
    <section
      id="registry"
      className="relative py-28 md:py-36 bg-secondary overflow-hidden"
    >
      <CornerAccents size={64} />

      <style>{`
        @keyframes registryPulse {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 0.8; }
        }
        .registry-card:hover {
          border-color: rgba(201,168,76,0.5) !important;
          transform: translateY(-3px) !important;
        }
        .registry-cta:hover {
          background: var(--accent) !important;
          color: #0e1309 !important;
        }
      `}</style>

      <div className="container mx-auto px-6 md:px-10 max-w-7xl relative z-10">

        {/* Top ornament */}
        <RevealBlock className="mb-14">
          <SectionOrnament />
        </RevealBlock>

        {/* Header */}
        <RevealBlock className="text-center mb-16">
          <p
            className="font-sans mb-4"
            style={{
              fontSize: "0.68rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "var(--accent)",
            }}
          >
            Gift Registry
          </p>
          <h2
            className="font-serif text-foreground leading-none"
            style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}
          >
            Our Registry
          </h2>
          <div className="flex items-center justify-center gap-4 mt-6">
            <span className="gold-divider" />
          </div>
          <p
            className="font-sans text-muted-foreground max-w-lg mx-auto mt-6 leading-relaxed"
            style={{ fontSize: "0.92rem" }}
          >
            Your presence at our wedding is the greatest gift of all. If you&apos;d like to celebrate with a gift,
            we&apos;ve curated a wish list on Amazon.
          </p>
        </RevealBlock>

        {/* Content: loading skeletons → items → fallback */}
        {loading ? (
          <RevealBlock delay={150}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-14">
              {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          </RevealBlock>
        ) : hasItems ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
              {visible.map((item, index) => (
                <RevealBlock key={item.id} delay={index * 70}>
                  <ItemCard item={item} />
                </RevealBlock>
              ))}
            </div>
            {purchased > 0 && (
              <RevealBlock className="text-center mb-10">
                <p
                  className="font-sans text-muted-foreground"
                  style={{ fontSize: "0.72rem", letterSpacing: "0.25em" }}
                >
                  {purchased} of {items.length} gifts already purchased — thank you!
                </p>
              </RevealBlock>
            )}
          </>
        ) : (
          <RevealBlock delay={150} className="text-center mb-14">
            <div
              className="inline-flex items-center justify-center w-24 h-24 mb-8"
              style={{ border: "1px solid rgba(201,168,76,0.3)" }}
            >
              <Gift
                style={{ width: 40, height: 40, color: "var(--accent)", opacity: 0.65 }}
              />
            </div>
            <p
              className="font-sans text-muted-foreground mb-1"
              style={{ fontSize: "0.7rem", letterSpacing: "0.35em", textTransform: "uppercase" }}
            >
              Registered at
            </p>
            <p
              className="font-serif text-foreground mb-2"
              style={{ fontSize: "2rem", fontWeight: 300 }}
            >
              Amazon Wedding Registry
            </p>
            <p
              className="font-sans text-muted-foreground"
              style={{ fontSize: "0.85rem" }}
            >
              Click below to browse our full wish list on Amazon.
            </p>
          </RevealBlock>
        )}

        {/* Amazon CTA — always shown */}
        <RevealBlock delay={200} className="flex flex-col items-center gap-3">
          <a
            href={REGISTRY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="registry-cta inline-flex items-center gap-2 font-sans uppercase"
            style={{
              fontSize: "0.68rem",
              letterSpacing: "0.35em",
              padding: "1rem 3.5rem",
              border: "1px solid var(--accent)",
              color: "var(--accent)",
              background: "transparent",
              textDecoration: "none",
              transition: "background 0.3s, color 0.3s",
            }}
          >
            {hasItems ? "View Full Registry on Amazon" : "Browse Our Amazon Registry"}
            <ExternalLink style={{ width: 12, height: 12 }} />
          </a>
        </RevealBlock>

        {/* Bottom ornament */}
        <RevealBlock className="mt-16">
          <SectionOrnament flip />
        </RevealBlock>
      </div>
    </section>
  )
}
