import { Heart } from "lucide-react"

const timeline = [
  {
    date: "December 2024",
    title: "First Meeting",
    description: "We met at a friend's Christmas get-together, and yes, my first impression was him drawing me in a game. Did I immediately fall in love? Absolutely not. I was weirded out... but also laughing way too hard."
  },
  {
    date: "March 2025",
    title: "First Date",
    description: "Our first date was rooftop cinema night watching Ratatouille, followed by an Italian restaurant that felt straight out of the movie."
  },
  {
    date: "May 2025",
    title: "Officially Us",
    description: "We had a cute picnic at the park, and that is where I asked her to be my girlfriend. Then we celebrated the only logical way: with sushi."
  },
  {
    date: "March 2026",
    title: "The Proposal",
    description: "In Puerto Rico, surrounded by her family, I proposed at the beach. The view, the moment, and the answer were all perfect."
  },
  {
    date: "July 2027",
    title: "The Wedding",
    description: "We can't wait to celebrate our love with all of our favorite people. This is just the beginning of forever."
  }
]

export function OurStory() {
  return (
    <section id="our-story" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-accent font-sans tracking-[0.2em] uppercase text-sm mb-4">
            How it all began
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground">
            Our Story
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

            {timeline.map((event, index) => (
              <div key={index} className="relative mb-12 last:mb-0">
                <div className={`flex flex-col md:flex-row items-start gap-6 md:gap-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}>
                  {/* Content */}
                  <div className={`flex-1 ml-12 md:ml-0 ${
                    index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                  }`}>
                    <span className="text-accent font-sans text-sm tracking-wider uppercase">
                      {event.date}
                    </span>
                    <h3 className="font-serif text-2xl text-foreground mt-1 mb-2">
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground font-sans leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-8 h-8 bg-primary rounded-full border-4 border-background">
                    <Heart className="w-3 h-3 text-primary-foreground fill-current" />
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
