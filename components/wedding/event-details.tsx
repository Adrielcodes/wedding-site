import { MapPin, Clock, Calendar, Utensils } from "lucide-react"

const events = [
  {
    title: "Ceremony",
    icon: Calendar,
    time: "4:00 PM",
    location: "The Grand Estate Gardens",
    address: "1234 Vineyard Lane, Napa Valley, CA 94558",
    description: "Join us as we exchange vows in the beautiful garden setting surrounded by rolling vineyards."
  },
  {
    title: "Reception",
    icon: Utensils,
    time: "6:00 PM",
    location: "The Grand Estate Ballroom",
    address: "1234 Vineyard Lane, Napa Valley, CA 94558",
    description: "Dinner, dancing, and celebration will follow the ceremony in the stunning ballroom."
  }
]

export function EventDetails() {
  return (
    <section id="details" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-accent font-sans tracking-[0.2em] uppercase text-sm mb-4">
            When & Where
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground">
            Wedding Details
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {events.map((event) => (
            <div 
              key={event.title}
              className="bg-card rounded-lg p-8 shadow-sm border border-border text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                <event.icon className="w-8 h-8 text-primary" />
              </div>
              
              <h3 className="font-serif text-2xl text-foreground mb-4">
                {event.title}
              </h3>
              
              <div className="space-y-3 text-muted-foreground font-sans">
                <div className="flex items-center justify-center gap-2">
                  <Clock className="w-4 h-4 text-accent" />
                  <span>{event.time}</span>
                </div>
                
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span>{event.location}</span>
                </div>
                
                <p className="text-sm">{event.address}</p>
              </div>
              
              <p className="mt-6 text-muted-foreground font-sans leading-relaxed">
                {event.description}
              </p>
            </div>
          ))}
        </div>

        {/* Map */}
        <div className="max-w-5xl mx-auto">
          <div className="rounded-lg overflow-hidden shadow-sm border border-border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3116.8499477821044!2d-122.32851618465846!3d38.29842067966692!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085067af5dc7e71%3A0x4d29c25e01d8e!2sNapa%20Valley%2C%20CA!5e0!3m2!1sen!2sus!4v1647889234567!5m2!1sen!2sus"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Wedding Venue Location"
              className="grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            />
          </div>
          <p className="text-center mt-4 text-muted-foreground font-sans text-sm">
            Click on the map for directions
          </p>
        </div>
      </div>
    </section>
  )
}
