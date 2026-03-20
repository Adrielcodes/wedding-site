import { Heart, Instagram, Facebook, Mail } from "lucide-react"
import Link from "next/link"

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com", label: "Follow us on Instagram" },
  { icon: Facebook, href: "https://facebook.com", label: "Follow us on Facebook" },
  { icon: Mail, href: "mailto:zamiadrielwedding@gmail.com", label: "Email us" }
]

const navLinks = [
  { name: "Our Story", href: "#our-story" },
  { name: "Details", href: "#details" },
  { name: "Gallery", href: "#gallery" },
  { name: "RSVP", href: "#rsvp" }
]

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl mb-2">
            Zami & Adriel
          </h2>
          <p className="text-background/60 font-sans">
            July 2027 • Napa Valley, CA
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-wrap justify-center gap-6 mb-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-background/70 hover:text-background font-sans text-sm tracking-wide transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mb-12">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-background/10 hover:bg-background/20 text-background transition-colors"
              aria-label={social.label}
            >
              <social.icon className="w-5 h-5" />
            </a>
          ))}
        </div>

        {/* Hashtag */}
        <div className="text-center mb-10">
          <p className="text-background/60 font-sans text-sm mb-2">
            Share your photos with us
          </p>
          <p className="font-serif text-xl text-accent">
            #ZamiAndAdriel2027
          </p>
        </div>

        {/* Copyright */}
        <div className="border-t border-background/10 pt-8 text-center">
          <p className="text-background/50 font-sans text-sm flex items-center justify-center gap-1">
            Made with <Heart className="w-4 h-4 text-primary fill-current" /> by Zami & Adriel
          </p>
          <p className="text-background/30 font-sans text-xs mt-2">
            © 2027 All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  )
}
