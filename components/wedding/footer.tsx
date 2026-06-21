"use client"

import Link from "next/link"
import { Instagram, Facebook, Mail } from "lucide-react"

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com",                    label: "Instagram" },
  { icon: Facebook,  href: "https://facebook.com",                     label: "Facebook"  },
  { icon: Mail,      href: "mailto:zamiadrielwedding@gmail.com",        label: "Email"     },
]

const navLinks = [
  { name: "Our Story", href: "#our-story" },
  { name: "Details",   href: "#details"   },
  { name: "Gallery",   href: "#gallery"   },
  { name: "Location",  href: "#location"  },
  { name: "RSVP",      href: "#rsvp"      },
]

export function Footer() {
  return (
    <footer
      className="py-20"
      style={{ background: "#070d09", borderTop: "1px solid rgba(201,168,76,0.2)" }}
    >
      <div className="container mx-auto px-6 md:px-10 max-w-7xl">

        {/* Monogram */}
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center justify-center w-20 h-20 mb-6 font-serif text-3xl"
            style={{
              border: "1px solid var(--accent)",
              color: "var(--accent)",
            }}
          >
            Z·A
          </div>
          <h2 className="font-serif text-white text-3xl md:text-4xl mb-2">
            Zami &amp; Adriel
          </h2>
          <p className="font-sans text-white/40" style={{ fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase" }}>
            July 2027 &nbsp;·&nbsp; Napa Valley, California
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-6 mb-10">
          <div className="h-px flex-1 max-w-xs" style={{ background: "rgba(201,168,76,0.15)" }} />
          <span className="gold-divider" style={{ width: "30px" }} />
          <div className="h-px flex-1 max-w-xs" style={{ background: "rgba(201,168,76,0.15)" }} />
        </div>

        {/* Nav links */}
        <nav className="flex flex-wrap justify-center gap-8 mb-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="font-sans text-white/40 hover:text-white transition-colors duration-300"
              style={{ fontSize: "0.68rem", letterSpacing: "0.25em", textTransform: "uppercase" }}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Social links */}
        <div className="flex justify-center gap-5 mb-12">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="inline-flex items-center justify-center w-10 h-10 text-white/40 hover:text-white transition-all duration-300"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
            >
              <social.icon className="w-4 h-4" />
            </a>
          ))}
        </div>

        {/* Hashtag */}
        <div className="text-center mb-10">
          <p className="font-serif italic text-white/30 text-lg">#ZamiAndAdriel2027</p>
        </div>

        {/* Copyright */}
        <div
          className="text-center pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="font-sans text-white/20" style={{ fontSize: "0.72rem", letterSpacing: "0.1em" }}>
            &copy; 2027 Zami &amp; Adriel. Made with love.
          </p>
        </div>
      </div>
    </footer>
  )
}


