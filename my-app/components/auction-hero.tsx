"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import Image from "next/image"
import { toAuctionPath } from "@/components/auction-image"

const heroSlides = [
  {
    image: "/handwoven-filipino-textile-colorful-traditional-we.jpg",
    title: "Handwoven Textile Collection",
    artisan: "Maria Santos",
  },
  {
    image: "/carved-wooden-sculpture-filipino-traditional-art.jpg",
    title: "Carved Wooden Masterpieces",
    artisan: "Jose Reyes",
  },
  {
    image: "/handcrafted-ceramic-pottery-filipino-traditional.jpg",
    title: "Artisan Ceramic Collection",
    artisan: "Ana Cruz",
  },
]

export function AuctionHero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  // carousel controls intentionally removed for a cleaner header on mobile

  return (
    <section className="relative min-h-[60vh] md:min-h-[85vh] pt-16 md:pt-20 overflow-hidden">
      {/* Background Carousel */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={toAuctionPath(slide.image || "/placeholder.svg")}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/70 to-transparent" />
          </div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20 min-h-[60vh] md:min-h-[85vh] flex items-center">
        <div className="max-w-xl md:max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-primary font-medium text-sm">Limited Edition Artisan Pieces</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            <span className="text-primary-foreground">Bid.</span>{" "}
            <span className="text-primary font-serif italic">Win.</span>{" "}
            <span className="text-primary-foreground">Collect.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-primary-foreground/80 mb-3 sm:mb-4 leading-relaxed">
            Join live and upcoming auctions for exclusive handcrafted items.
          </p>

          <p className="text-primary-foreground/60 mb-6 max-w-md md:max-w-lg">
            At UBRA Auctions, we bring the thrill of the auction floor to your fingertips. Whether you're a seasoned
            collector or a first-time bidder, our platform offers transparency, trust, and excitement in every bid.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all px-8"
            >
              Join Live Auctions Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
            >
              Browse Upcoming
            </Button>
          </div>

          <div className="flex gap-2 mt-12">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === currentSlide ? "w-8 bg-primary" : "w-4 bg-primary-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* navigation arrows removed */}
    </section>
  )
}
