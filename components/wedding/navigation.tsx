"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

const navLinks = [
  { name: "Our Story", href: "#our-story" },
  { name: "Details",   href: "#details"   },
  { name: "Gallery",   href: "#gallery"   },
  { name: "Location",  href: "#location"  },
  { name: "RSVP",      href: "#rsvp"      },
]

export function Navigation() {
  const [isScrolled,       setIsScrolled]       = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navBg = isScrolled
    ? "bg-black/95 backdrop-blur-sm"
    : "bg-transparent"

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}>
      <div className="container mx-auto px-6 md:px-10">
        <nav className="flex items-center justify-between h-16 md:h-20">

          {/* Monogram logo */}
          <Link
            href="#hero"
            className="font-serif text-xl md:text-2xl text-white tracking-widest"
            style={{ color: isScrolled ? "var(--accent)" : "white" }}
          >
            Z &amp; A
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="link-underline font-sans text-white/70 hover:text-white transition-colors duration-300"
                  style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase" }}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* RSVP button */}
          <Link
            href="#rsvp"
            className="hidden md:inline-flex items-center font-sans transition-colors duration-300"
            style={{
              fontSize: "0.68rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              padding: "0.55rem 1.5rem",
              border: "1px solid var(--accent)",
              color: "var(--accent)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.background = "var(--accent)"
              el.style.color = "#000"
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.background = "transparent"
              el.style.color = "var(--accent)"
            }}
          >
            RSVP
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </div>

      {/* Mobile drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black border-t" style={{ borderColor: "var(--accent)" }}>
          <div className="container mx-auto px-6 py-8">
            <ul className="space-y-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block font-sans text-white/70 hover:text-white transition-colors py-1"
                    style={{ fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase" }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li className="pt-4">
                <Link
                  href="#rsvp"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex items-center font-sans"
                  style={{
                    fontSize: "0.7rem",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    padding: "0.6rem 2rem",
                    border: "1px solid var(--accent)",
                    color: "var(--accent)",
                  }}
                >
                  RSVP Now
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  )
}


