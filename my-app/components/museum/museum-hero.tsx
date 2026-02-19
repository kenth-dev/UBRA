"use client"

import { useEffect, useState, useRef } from "react"
import { ChevronDown } from "lucide-react"

// Small count-up component that animates only the numeric portion of a
// value like "500+". Uses requestAnimationFrame + an easeOut timing
// function and expects a `start` boolean to trigger the animation.
function CountUp({ value, start, duration = 2000 }: { value: string; start: boolean; duration?: number }) {
  const m = String(value).match(/^(\d+)(.*)$/)
  const target = m ? parseInt(m[1], 10) : 0
  const suffix = m ? m[2] || "" : ""
  const [display, setDisplay] = useState(() => `0${suffix}`)
  const startedRef = useRef(false)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!start || startedRef.current) return
    startedRef.current = true

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
    let startTime: number | null = null

    const step = (ts: number) => {
      if (!startTime) startTime = ts
      const elapsed = Math.min(ts - startTime, duration)
      const progress = easeOut(elapsed / duration)
      const current = Math.floor(target * progress)
      setDisplay(`${current.toLocaleString()}${suffix}`)
      if (elapsed < duration) {
        rafRef.current = requestAnimationFrame(step)
      } else {
        setDisplay(`${target.toLocaleString()}${suffix}`)
        if (rafRef.current) cancelAnimationFrame(rafRef.current)
      }
    }

    rafRef.current = requestAnimationFrame(step)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [start, duration, suffix, target])

  return <div className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-primary">{display}</div>
}

export function MuseumHero() {
  const [isVisible, setIsVisible] = useState(false)
  const statsRef = useRef<HTMLDivElement | null>(null)
  const [statsInView, setStatsInView] = useState(false)

  // Observe the stats bar and trigger the count-up once when it enters view
  useEffect(() => {
    if (!statsRef.current) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStatsInView(true)
            obs.disconnect()
          }
        })
      },
      { threshold: 0.25 }
    )
    obs.observe(statsRef.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <>
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/museum/filipino-traditional-weaving-patterns-artistic-bac.jpg')`,
          }}
        />
        {/* bottom gradient now fades into `bg-muted/30` so the stats bar connects
          seamlessly with the hero (no visible top border/line). */}
        <div className="absolute inset-0 bg-gradient-to-b from-brown/60 via-black/30 to-muted/30" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-1/4 left-10 w-20 h-20 opacity-20 animate-float">
        <div className="w-full h-full border-2 border-primary rounded-full" />
      </div>
      <div className="absolute bottom-1/3 right-16 w-32 h-32 opacity-15 animate-float" style={{ animationDelay: "2s" }}>
        <div className="w-full h-full border border-secondary rotate-45" />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Subtitle */}
          <p className="text-xs sm:text-sm md:text-base uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white mb-3 sm:mb-4 md:mb-6 drop-shadow-lg">
            Discover Filipino Heritage
          </p>

          {/* Main Title */}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-medium leading-tight mb-4 sm:mb-6 md:mb-8">
            <span className="block text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">Where Culture</span>
            <span className="block text-primary italic drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">Comes Alive</span>
          </h1>

          {/* Description */}
          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl text-white leading-relaxed mb-6 sm:mb-8 md:mb-12 px-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] font-medium">
            Step into an immersive journey through centuries of Filipino craftsmanship. Experience the stories,
            techniques, and cultural heritage behind each masterpiece.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a
              href="#exhibits"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all hover:scale-105 shadow-xl text-sm sm:text-base w-full sm:w-auto"
            >
              Begin Your Journey
            </a>
            <a
              href="#tour"
              className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full hover:bg-white hover:text-secondary transition-all text-sm sm:text-base w-full sm:w-auto shadow-xl"
            >
              Take Virtual Tour
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-8 w-8 text-white/80 drop-shadow-lg" />
      </div>

      </section>

      {/* Stats bar — use the same background as FeaturedExhibit and add spacing */}
      <div ref={statsRef} className="w-full bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {[
            { value: "500+", label: "Artifacts" },
            { value: "50+", label: "Artisans Featured" },
            { value: "18", label: "Regions Represented" },
            { value: "100+", label: "Cultural Stories" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <CountUp value={stat.value} start={statsInView} duration={2000} />
              <div className="text-sm sm:text-base md:text-lg text-secondary font-medium mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
