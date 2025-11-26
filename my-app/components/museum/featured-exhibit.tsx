"use client"

import { useState } from "react"
import { ArrowRight, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"

const exhibits = [
  {
    id: 1,
    title: "The Art of Abaca Weaving",
    region: "Cagayan Valley",
    period: "Pre-Colonial to Present",
    description:
      "Discover the intricate process of transforming abaca fibers into stunning textiles that have adorned Filipino homes for centuries.",
    image: "/images/museum/traditional-filipino-abaca-weaving-loom-artisan-ha.jpg",
    artifacts: 45,
    featured: true,
  },
  {
    id: 2,
    title: "Pottery of the Ancestors",
    region: "Various Regions",
    period: "3000 BCE - Present",
    description:
      "From ancient burial jars to contemporary ceramics, explore the evolution of Filipino pottery traditions.",
    image: "/images/museum/traditional-filipino-pottery-ceramic-vases-warm-ea.jpg",
    artifacts: 32,
    featured: false,
  },
  {
    id: 3,
    title: "Wood Carving Masters",
    region: "Paete, Laguna",
    period: "Spanish Colonial Era",
    description:
      "Journey through the woodcarving traditions of Paete, known as the carving capital of the Philippines.",
    image: "/images/museum/filipino-wood-carving-intricate-details-santos-rel.jpg",
    artifacts: 38,
    featured: false,
  },
]

export function FeaturedExhibit() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  const activeExhibit = exhibits[activeIndex]

  return (
    <section id="exhibits" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <p className="text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] text-primary mb-2 sm:mb-3 md:mb-4">Current Exhibitions</p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-foreground">Featured Exhibits</h2>
        </div>

        {/* Main Exhibit Display */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={activeExhibit.image || "/placeholder.svg"}
                alt={activeExhibit.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              {/* Spotlight overlay */}
              <div className="absolute inset-0 museum-spotlight pointer-events-none" />
            </div>
            {/* Badge */}
            <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 bg-secondary text-secondary-foreground px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-full shadow-lg">
              <span className="text-lg sm:text-xl md:text-2xl font-serif font-semibold">{activeExhibit.artifacts}</span>
              <span className="text-xs sm:text-sm ml-1">Artifacts</span>
            </div>
          </div>

          {/* Content Side */}
          <div className="space-y-3 sm:space-y-4 md:space-y-6">
            <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
              <span className="px-2 sm:px-3 py-1 bg-primary/10 rounded-full text-primary">{activeExhibit.region}</span>
              <span>{activeExhibit.period}</span>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-foreground">{activeExhibit.title}</h3>

            <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">{activeExhibit.description}</p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2 sm:pt-4">
              <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 group text-sm sm:text-base">
                Explore Exhibit
                <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                className="border-secondary text-secondary hover:bg-secondary/10 bg-transparent text-sm sm:text-base"
              >
                View in 3D
              </Button>
            </div>
          </div>
        </div>

        {/* Exhibit Selector */}
        <div className="mt-8 sm:mt-12 md:mt-16 flex items-center justify-center gap-4 sm:gap-6 md:gap-8">
          {/* Playback control */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 sm:p-2 rounded-full border border-border hover:border-primary transition-colors"
          >
            {isPlaying ? (
              <Pause className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            ) : (
              <Play className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            )}
          </button>

          {/* Exhibit thumbnails */}
          <div className="flex gap-2 sm:gap-3 md:gap-4">
            {exhibits.map((exhibit, index) => (
              <button
                key={exhibit.id}
                onClick={() => setActiveIndex(index)}
                className={`relative overflow-hidden rounded-md sm:rounded-lg transition-all duration-300 ${
                  index === activeIndex ? "w-20 h-12 sm:w-24 sm:h-16 md:w-32 md:h-20 ring-2 ring-primary" : "w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={exhibit.image || "/placeholder.svg"}
                  alt={exhibit.title}
                  className="w-full h-full object-cover"
                />
                {index === activeIndex && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-primary">
                    <div
                      className={`h-full bg-secondary ${isPlaying ? "animate-[progress_5s_linear_infinite]" : ""}`}
                      style={{ width: isPlaying ? "100%" : "0%" }}
                    />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
