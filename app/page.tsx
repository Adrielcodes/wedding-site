import { Navigation } from "@/components/wedding/navigation"
import { HeroSection } from "@/components/wedding/hero-section"
import { CountdownTimer } from "@/components/wedding/countdown-timer"
import { OurStory } from "@/components/wedding/our-story"
import { EventDetails } from "@/components/wedding/event-details"
import { PhotoGallery } from "@/components/wedding/photo-gallery"
import { RSVPForm } from "@/components/wedding/rsvp-form"
import { Footer } from "@/components/wedding/footer"

export default function WeddingPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <CountdownTimer />
      <OurStory />
      <EventDetails />
      <PhotoGallery />
      <RSVPForm />
      <Footer />
    </main>
  )
}
