"use client"

import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"

export function MuseumHero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/museum/filipino-traditional-weaving-patterns-artistic-bac.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brown/60 via-black/30 to-background" />
        <div className="absolute inset-0 bg-black/30" />
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

      {/* Stats bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-border shadow-2xl">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-6 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-8">
          {[
            { value: "500+", label: "Artifacts" },
            { value: "50+", label: "Artisans Featured" },
            { value: "18", label: "Regions Represented" },
            { value: "100+", label: "Cultural Stories" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-primary">{stat.value}</div>
              <div className="text-xs sm:text-sm text-secondary font-medium mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
