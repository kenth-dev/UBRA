"use client"

import { useState } from "react"
import { Play, MapPin, Award, Heart, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const artisans = [
  {
    id: 1,
    name: "Maria Santos",
    craft: "Master Weaver",
    region: "Vigan, Ilocos Sur",
    experience: "40+ years",
    story:
      "Maria learned the art of Inabel weaving from her grandmother at age 8. Today, she teaches young women in her community, ensuring this tradition lives on for future generations.",
    specialties: ["Binakol patterns", "Natural dyes", "Traditional backstrap loom"],
    awards: ["National Living Treasure Nominee", "Gawad sa Manlilikha ng Bayan"],
    image: "/images/museum/elderly-filipino-woman-weaver-traditional-loom-ina.jpg",
    video: true,
    products: 45,
    followers: 1234,
  },
  {
    id: 2,
    name: "Jose Mendoza",
    craft: "Wood Carving Master",
    region: "Paete, Laguna",
    experience: "35 years",
    story:
      "A third-generation carver, Jose specializes in religious santos figures. His work has been displayed in churches across the Philippines and collected internationally.",
    specialties: ["Santos figures", "Furniture carving", "Relief work"],
    awards: ["Paete Master Carver Award", "Cultural Heritage Award"],
    image: "/images/museum/filipino-master-woodcarver-elderly-man-carving-san.jpg",
    video: true,
    products: 32,
    followers: 892,
  },
  {
    id: 3,
    name: "Elena Datu",
    craft: "T'nalak Weaver",
    region: "Lake Sebu, South Cotabato",
    experience: "50+ years",
    story:
      "Elena is one of the few remaining master weavers who receives T'nalak patterns through dreams. Her work preserves the sacred textile traditions of the T'boli people.",
    specialties: ["Dream-woven patterns", "Traditional tie-dye", "Abaca processing"],
    awards: ["National Living Treasure (Gawad sa Manlilikha ng Bayan)"],
    image: "/images/museum/tboli-woman-weaver-traditional-dress-tnalak-cloth-.jpg",
    video: true,
    products: 28,
    followers: 2156,
  },
]

export function ArtisanShowcase() {
  const [activeArtisan, setActiveArtisan] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const artisan = artisans[activeArtisan]

  return (
    <section id="artisans" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <p className="text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] text-primary mb-2 sm:mb-3 md:mb-4">Meet the Masters</p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-3 sm:mb-4">Featured Artisans</h2>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-2xl mx-auto px-4">
            Discover the stories of the hands behind the masterpieces. Interactive profiles showcase their techniques,
            heritage, and artistic journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-start">
          {/* Artisan Image/Video */}
          <div className="relative">
            <div className="aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={artisan.image || "/placeholder.svg"}
                alt={artisan.name}
                className="w-full h-full object-cover"
              />

              {/* Video play overlay */}
              {artisan.video && !isVideoPlaying && (
                <button
                  onClick={() => setIsVideoPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center bg-secondary/30 hover:bg-secondary/40 transition-colors"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-background rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                    <Play className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-secondary ml-1" />
                  </div>
                </button>
              )}

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 via-transparent to-transparent pointer-events-none" />

              {/* Quick info */}
              <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-3 sm:left-4 md:left-6 right-3 sm:right-4 md:right-6">
                <div className="flex items-center gap-1.5 sm:gap-2 text-white/80 text-xs sm:text-sm mb-1 sm:mb-2">
                  <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                  {artisan.region}
                </div>
                <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-white font-medium">{artisan.name}</h3>
                <p className="text-sm sm:text-base text-white/80">{artisan.craft}</p>
              </div>
            </div>

            {/* Artisan selector */}
            <div className="flex justify-center gap-2 sm:gap-3 md:gap-4 mt-3 sm:mt-4 md:mt-6">
              {artisans.map((a, index) => (
                <button
                  key={a.id}
                  onClick={() => {
                    setActiveArtisan(index)
                    setIsVideoPlaying(false)
                  }}
                  className={`relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full overflow-hidden transition-all ${
                    index === activeArtisan ? "ring-2 sm:ring-3 ring-primary scale-110" : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={a.image || "/placeholder.svg"} alt={a.name} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Artisan Details */}
          <div className="space-y-4 sm:space-y-6 md:space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
              <div className="text-center p-2 sm:p-3 md:p-4 bg-muted/50 rounded-lg sm:rounded-xl">
                <div className="font-serif text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-secondary">{artisan.experience}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Experience</div>
              </div>
              <div className="text-center p-2 sm:p-3 md:p-4 bg-muted/50 rounded-lg sm:rounded-xl">
                <div className="font-serif text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-secondary">{artisan.products}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Products</div>
              </div>
              <div className="text-center p-2 sm:p-3 md:p-4 bg-muted/50 rounded-lg sm:rounded-xl">
                <div className="font-serif text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-secondary">
                  {artisan.followers.toLocaleString()}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">Followers</div>
              </div>
            </div>

            {/* Story */}
            <div>
              <h4 className="text-sm sm:text-base font-medium text-foreground mb-2 sm:mb-3">Their Story</h4>
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">{artisan.story}</p>
            </div>

            {/* Specialties */}
            <div>
              <h4 className="text-sm sm:text-base font-medium text-foreground mb-2 sm:mb-3">Specialties</h4>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {artisan.specialties.map((specialty) => (
                  <span key={specialty} className="px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-primary/10 text-primary rounded-full text-xs sm:text-sm">
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            {/* Awards */}
            <div>
              <h4 className="text-sm sm:text-base font-medium text-foreground mb-2 sm:mb-3">Recognition</h4>
              <div className="space-y-1.5 sm:space-y-2">
                {artisan.awards.map((award) => (
                  <div key={award} className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground">
                    <Award className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-primary flex-shrink-0" />
                    <span>{award}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 pt-2 sm:pt-3 md:pt-4">
              <Button className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90 text-sm sm:text-base">
                View Full Profile
                <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 bg-transparent text-sm sm:text-base">
                <Heart className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                Follow
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
