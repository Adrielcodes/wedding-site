"use client"

import { ChevronDown } from "lucide-react"

export function HeroSection() {
  const scrollToNext = () => {
    const countdown = document.getElementById('countdown')
    countdown?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(255,250,245,0.3), rgba(255,250,245,0.6)), url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop')`
        }}
      />
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 border border-accent/30 rounded-full opacity-50" />
      <div className="absolute bottom-20 right-20 w-48 h-48 border border-primary/20 rounded-full opacity-40" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <p className="text-accent font-sans tracking-[0.3em] uppercase text-sm mb-6 animate-fade-in">
          We are getting married
        </p>
        
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-foreground mb-6 leading-tight">
          <span className="block">Zami</span>
          <span className="text-accent text-3xl md:text-4xl lg:text-5xl italic font-light">&</span>
          <span className="block">Adriel</span>
        </h1>
        
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-16 bg-accent/50" />
          <p className="font-serif text-xl md:text-2xl text-muted-foreground italic">
            July 2027
          </p>
          <div className="h-px w-16 bg-accent/50" />
        </div>
        
        <p className="font-sans text-muted-foreground tracking-wide text-lg">
          The Grand Estate, Napa Valley
        </p>
      </div>
      
      {/* Scroll indicator */}
      <button 
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-accent hover:text-primary transition-colors animate-bounce cursor-pointer"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  )
}
