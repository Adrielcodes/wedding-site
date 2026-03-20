"use client"

import { useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"

const photos = [
  {
    src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=2070&auto=format&fit=crop",
    alt: "Zami and Adriel engagement photo - couple walking in a field",
    span: "col-span-2 row-span-2"
  },
  {
    src: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?q=80&w=2069&auto=format&fit=crop",
    alt: "Romantic sunset photo",
    span: "col-span-1 row-span-1"
  },
  {
    src: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=80&w=2070&auto=format&fit=crop",
    alt: "Couple holding hands",
    span: "col-span-1 row-span-1"
  },
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
    alt: "Wedding rings and flowers",
    span: "col-span-1 row-span-2"
  },
  {
    src: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=2071&auto=format&fit=crop",
    alt: "Couple laughing together",
    span: "col-span-1 row-span-1"
  },
  {
    src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=2787&auto=format&fit=crop",
    alt: "Beach engagement photo",
    span: "col-span-2 row-span-1"
  }
]

export function PhotoGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <section id="gallery" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-accent font-sans tracking-[0.2em] uppercase text-sm mb-4">
            Captured Moments
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground">
            Our Gallery
          </h2>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[250px] gap-4 max-w-6xl mx-auto">
          {photos.map((photo, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(photo.src)}
              className={`${photo.span} relative overflow-hidden rounded-lg group cursor-pointer`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300" />
            </button>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-background hover:text-primary transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="relative w-full max-w-4xl max-h-[90vh] aspect-[4/3]">
              <Image
                src={selectedImage}
                alt="Selected photo"
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
