import { Navigation } from "@/components/wedding/navigation"
import { HeroSection } from "@/components/wedding/hero-section"
import { OurStory } from "@/components/wedding/our-story"
import { PhotoGallery } from "@/components/wedding/photo-gallery"
import { EventDetails } from "@/components/wedding/event-details"
import { Location } from "@/components/wedding/location"
import { RSVPForm } from "@/components/wedding/rsvp-form"
import { Footer } from "@/components/wedding/footer"
import { IntroAnimation } from "@/components/wedding/intro-animation"
import { SiteChrome } from "@/components/wedding/site-chrome"
import { MarqueeBand } from "@/components/wedding/marquee-band"

export default function WeddingPage() {
  return (
    <main className="min-h-screen">
      <IntroAnimation />
      <SiteChrome />
      <Navigation />
      <HeroSection />
      <OurStory />
      <MarqueeBand />
      <PhotoGallery />
      <EventDetails />
      <Location />
      <RSVPForm />
      <Footer />
    </main>
  )
}
