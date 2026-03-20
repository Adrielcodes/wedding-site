"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Check, Heart } from "lucide-react"

export function RSVPForm() {
  const [submitted, setSubmitted] = useState(false)
  const [attendance, setAttendance] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setSubmitted(true)
    setIsSubmitting(false)
  }

  if (submitted) {
    return (
      <section id="rsvp" className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-full mb-6">
              <Check className="w-10 h-10 text-primary-foreground" />
            </div>
            <h2 className="font-serif text-4xl text-foreground mb-4">
              Thank You!
            </h2>
            <p className="text-muted-foreground font-sans leading-relaxed">
              We have received your RSVP. We can&apos;t wait to celebrate with you!
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="rsvp" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-accent font-sans tracking-[0.2em] uppercase text-sm mb-4">
            Join Our Celebration
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
            RSVP
          </h2>
          <p className="text-muted-foreground font-sans max-w-lg mx-auto">
            Please let us know if you&apos;ll be joining us by June 15, 2027
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
          <div className="bg-card rounded-lg p-8 shadow-sm border border-border space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="font-sans text-foreground">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  required
                  placeholder="Zami"
                  className="bg-background border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="font-sans text-foreground">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  required
                  placeholder="Smith"
                  className="bg-background border-border"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="font-sans text-foreground">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Zami@example.com"
                className="bg-background border-border"
              />
            </div>

            {/* Attendance */}
            <div className="space-y-3">
              <Label className="font-sans text-foreground">
                Will you be attending?
              </Label>
              <RadioGroup
                value={attendance}
                onValueChange={setAttendance}
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="attending-yes" />
                  <Label htmlFor="attending-yes" className="font-sans font-normal cursor-pointer">
                    Joyfully Accept
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="attending-no" />
                  <Label htmlFor="attending-no" className="font-sans font-normal cursor-pointer">
                    Regretfully Decline
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Number of Guests */}
            {attendance === "yes" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="guests" className="font-sans text-foreground">
                    Number of Guests
                  </Label>
                  <Select name="guests" required>
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue placeholder="Select number of guests" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Guest</SelectItem>
                      <SelectItem value="2">2 Guests</SelectItem>
                      <SelectItem value="3">3 Guests</SelectItem>
                      <SelectItem value="4">4 Guests</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Meal Preference */}
                <div className="space-y-2">
                  <Label htmlFor="meal" className="font-sans text-foreground">
                    Meal Preference
                  </Label>
                  <Select name="meal" required>
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue placeholder="Select your meal preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beef">Filet Mignon</SelectItem>
                      <SelectItem value="chicken">Herb Roasted Chicken</SelectItem>
                      <SelectItem value="fish">Pan-Seared Salmon</SelectItem>
                      <SelectItem value="vegetarian">Vegetarian Option</SelectItem>
                      <SelectItem value="vegan">Vegan Option</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Dietary Restrictions */}
                <div className="space-y-2">
                  <Label htmlFor="dietary" className="font-sans text-foreground">
                    Dietary Restrictions or Allergies
                  </Label>
                  <Textarea
                    id="dietary"
                    name="dietary"
                    placeholder="Please let us know of any dietary restrictions..."
                    className="bg-background border-border resize-none"
                    rows={3}
                  />
                </div>
              </>
            )}

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message" className="font-sans text-foreground">
                Message for the Couple (Optional)
              </Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Share your well wishes..."
                className="bg-background border-border resize-none"
                rows={3}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting || !attendance}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-sans tracking-wide"
            >
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  <Heart className="w-4 h-4 mr-2" />
                  Send RSVP
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}
