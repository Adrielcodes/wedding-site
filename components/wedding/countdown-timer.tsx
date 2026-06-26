"use client"

import { useEffect, useState } from "react"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const weddingDate = new Date('2027-05-01T16:00:00')

    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = weddingDate.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  if (!mounted) {
    return (
      <section id="countdown" className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-accent font-sans tracking-[0.2em] uppercase text-sm mb-4">
              Counting down to
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground">
              Our Big Day
            </h2>
          </div>
          <div className="flex justify-center items-center gap-4 md:gap-8 flex-wrap">
            {['Days', 'Hours', 'Minutes', 'Seconds'].map((label) => (
              <div key={label} className="text-center">
                <div className="bg-card rounded-lg shadow-sm p-6 md:p-8 min-w-[100px] md:min-w-[140px] border border-border">
                  <span className="font-serif text-4xl md:text-6xl text-primary">--</span>
                </div>
                <p className="mt-3 text-muted-foreground font-sans tracking-wider uppercase text-sm">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ]

  return (
    <section id="countdown" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-accent font-sans tracking-[0.2em] uppercase text-sm mb-4">
            Counting down to
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground">
            Our Big Day
          </h2>
        </div>

        <div className="flex justify-center items-center gap-4 md:gap-8 flex-wrap">
          {timeUnits.map((unit) => (
            <div key={unit.label} className="text-center">
              <div className="bg-card rounded-lg shadow-sm p-6 md:p-8 min-w-[100px] md:min-w-[140px] border border-border">
                <span className="font-serif text-4xl md:text-6xl text-primary">
                  {unit.value.toString().padStart(2, '0')}
                </span>
              </div>
              <p className="mt-3 text-muted-foreground font-sans tracking-wider uppercase text-sm">
                {unit.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
