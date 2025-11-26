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
    <section id="artisans" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-primary mb-4">Meet the Masters</p>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-4">Featured Artisans</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the stories of the hands behind the masterpieces. Interactive profiles showcase their techniques,
            heritage, and artistic journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Artisan Image/Video */}
          <div className="relative">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
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
                  <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                    <Play className="h-8 w-8 text-secondary ml-1" />
                  </div>
                </button>
              )}

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 via-transparent to-transparent pointer-events-none" />

              {/* Quick info */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
                  <MapPin className="h-4 w-4" />
                  {artisan.region}
                </div>
                <h3 className="font-serif text-3xl text-white font-medium">{artisan.name}</h3>
                <p className="text-white/80">{artisan.craft}</p>
              </div>
            </div>

            {/* Artisan selector */}
            <div className="flex justify-center gap-4 mt-6">
              {artisans.map((a, index) => (
                <button
                  key={a.id}
                  onClick={() => {
                    setActiveArtisan(index)
                    setIsVideoPlaying(false)
                  }}
                  className={`relative w-16 h-16 rounded-full overflow-hidden transition-all ${
                    index === activeArtisan ? "ring-3 ring-primary scale-110" : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={a.image || "/placeholder.svg"} alt={a.name} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Artisan Details */}
          <div className="space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted/50 rounded-xl">
                <div className="font-serif text-2xl font-semibold text-secondary">{artisan.experience}</div>
                <div className="text-sm text-muted-foreground">Experience</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-xl">
                <div className="font-serif text-2xl font-semibold text-secondary">{artisan.products}</div>
                <div className="text-sm text-muted-foreground">Products</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-xl">
                <div className="font-serif text-2xl font-semibold text-secondary">
                  {artisan.followers.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Followers</div>
              </div>
            </div>

            {/* Story */}
            <div>
              <h4 className="font-medium text-foreground mb-3">Their Story</h4>
              <p className="text-muted-foreground leading-relaxed">{artisan.story}</p>
            </div>

            {/* Specialties */}
            <div>
              <h4 className="font-medium text-foreground mb-3">Specialties</h4>
              <div className="flex flex-wrap gap-2">
                {artisan.specialties.map((specialty) => (
                  <span key={specialty} className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm">
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            {/* Awards */}
            <div>
              <h4 className="font-medium text-foreground mb-3">Recognition</h4>
              <div className="space-y-2">
                {artisan.awards.map((award) => (
                  <div key={award} className="flex items-center gap-3 text-muted-foreground">
                    <Award className="h-5 w-5 text-primary" />
                    <span>{award}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <Button className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90">
                View Full Profile
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 bg-transparent">
                <Heart className="h-4 w-4 mr-2" />
                Follow
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
