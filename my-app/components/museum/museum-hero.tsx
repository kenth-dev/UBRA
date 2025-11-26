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
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
        <div className="absolute inset-0 gradient-amane-dark opacity-70" />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-1/4 left-10 w-20 h-20 opacity-20 animate-float">
        <div className="w-full h-full border-2 border-primary rounded-full" />
      </div>
      <div className="absolute bottom-1/3 right-16 w-32 h-32 opacity-15 animate-float" style={{ animationDelay: "2s" }}>
        <div className="w-full h-full border border-secondary rotate-45" />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Subtitle */}
          <p className="text-sm md:text-base uppercase tracking-[0.3em] text-primary mb-6">
            Discover Filipino Heritage
          </p>

          {/* Main Title */}
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium text-secondary leading-tight mb-8">
            <span className="block">Where Culture</span>
            <span className="block text-primary italic">Comes Alive</span>
          </h1>

          {/* Description */}
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-secondary/80 leading-relaxed mb-12">
            Step into an immersive journey through centuries of Filipino craftsmanship. Experience the stories,
            techniques, and cultural heritage behind each masterpiece.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#exhibits"
              className="px-8 py-4 bg-secondary text-secondary-foreground font-medium rounded-full hover:bg-secondary/90 transition-all hover:scale-105"
            >
              Begin Your Journey
            </a>
            <a
              href="#tour"
              className="px-8 py-4 border-2 border-secondary text-secondary font-medium rounded-full hover:bg-secondary/10 transition-all"
            >
              Take Virtual Tour
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-8 w-8 text-secondary/60" />
      </div>

      {/* Stats bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-t border-border">
        <div className="max-w-6xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "500+", label: "Artifacts" },
            { value: "50+", label: "Artisans Featured" },
            { value: "17", label: "Regions Represented" },
            { value: "100+", label: "Cultural Stories" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-serif text-3xl md:text-4xl font-semibold text-secondary">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
