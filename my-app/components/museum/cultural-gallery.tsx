"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, MapPin, Users } from "lucide-react"

const regions = [
  {
    id: "luzon",
    name: "Luzon",
    crafts: ["Inabel Weaving", "Wood Carving", "Burnay Pottery"],
    artisans: 28,
    artifacts: 156,
    story:
      "From the mountain provinces to the plains, Luzon showcases diverse crafting traditions influenced by indigenous cultures and colonial history.",
    image: "/images/museum/northern-luzon-cordillera-rice-terraces-filipino-c.jpg",
  },
  {
    id: "visayas",
    name: "Visayas",
    crafts: ["Hablon Weaving", "Tabo-an Basketry", "Shell Craft"],
    artisans: 22,
    artifacts: 134,
    story:
      "The islands of the Visayas are rich in maritime crafts and textiles, reflecting a vibrant seafaring heritage.",
    image: "/images/museum/visayas-philippines-islands-beautiful-beaches-trad.jpg",
  },
  {
    id: "mindanao",
    name: "Mindanao",
    crafts: ["T'nalak Weaving", "Brass Casting", "Mat Weaving"],
    artisans: 35,
    artifacts: 198,
    story:
      "Mindanao's indigenous peoples have preserved ancestral crafts that date back thousands of years, each piece imbued with spiritual significance.",
    image: "/images/museum/mindanao-philippines-tboli-tribe-colorful-traditio.jpg",
  },
]

const categories = [
  { id: "all", name: "All Crafts" },
  { id: "weaving", name: "Weaving" },
  { id: "pottery", name: "Pottery" },
  { id: "carving", name: "Wood Carving" },
  { id: "metalwork", name: "Metalwork" },
  { id: "basketry", name: "Basketry" },
]

const galleryItems = [
  {
    id: 1,
    name: "Binakol Blanket",
    category: "weaving",
    region: "Ilocos",
    image: "/images/museum/binakol-woven-blanket-geometric-pattern-traditiona.jpg",
    featured: true,
  },
  {
    id: 2,
    name: "Burnay Pottery",
    category: "pottery",
    region: "Ilocos",
    image: "/images/museum/burnay-pottery-traditional-ilocos-clay-jars-terrac.jpg",
    featured: false,
  },
  {
    id: 3,
    name: "Bulul Figure",
    category: "carving",
    region: "Ifugao",
    image: "/images/museum/ifugao-bulul-wooden-rice-god-statue-traditional-ca.jpg",
    featured: true,
  },
  {
    id: 4,
    name: "Kulintang Set",
    category: "metalwork",
    region: "Mindanao",
    image: "/images/museum/kulintang-brass-gong-set-mindanao-traditional-musi.jpg",
    featured: false,
  },
  {
    id: 5,
    name: "Inabel Textile",
    category: "weaving",
    region: "Ilocos",
    image: "/images/museum/beautiful-intricate-inabel-textile-weaving-traditi.jpg",
    featured: false,
  },
  {
    id: 6,
    name: "Piña Cloth",
    category: "weaving",
    region: "Aklan",
    image: "/images/museum/delicate-pina-cloth-pineapple-fiber-filipino-texti.jpg",
    featured: true,
  },
  {
    id: 7,
    name: "Santos Carving",
    category: "carving",
    region: "Paete",
    image: "/images/museum/carved-wooden-santos-religious-figure-filipino-col.jpg",
    featured: false,
  },
  {
    id: 8,
    name: "T'nalak Weaving",
    category: "weaving",
    region: "Mindanao",
    image: "/images/museum/close-up-intricate-filipino-tinalak-weaving-patter.jpg",
    featured: false,
  },
  {
    id: 9,
    name: "Banig Mat",
    category: "basketry",
    region: "Samar",
    image: "/images/museum/colorful-filipino-banig-woven-mat-traditional-patt.jpg",
    featured: false,
  },
  {
    id: 10,
    name: "Capiz Shell Chime",
    category: "metalwork",
    region: "Capiz",
    image: "/images/museum/beautiful-capiz-shell-wind-chime-handcrafted-iride.jpg",
    featured: false,
  },
  {
    id: 11,
    name: "Wood Sculpture",
    category: "carving",
    region: "Various",
    image: "/images/museum/carved-wooden-sculpture-filipino-traditional-art.jpg",
    featured: false,
  },
  {
    id: 12,
    name: "Ceramic Pottery",
    category: "pottery",
    region: "Various",
    image: "/images/museum/handcrafted-ceramic-pottery-filipino-traditional.jpg",
    featured: false,
  },
]

export function CulturalGallery() {
  const [activeRegion, setActiveRegion] = useState(0)
  const [activeCategory, setActiveCategory] = useState("all")

  const currentRegion = regions[activeRegion]
  const filteredItems =
    activeCategory === "all" ? galleryItems : galleryItems.filter((item) => item.category === activeCategory)

  const nextRegion = () => setActiveRegion((prev) => (prev + 1) % regions.length)
  const prevRegion = () => setActiveRegion((prev) => (prev - 1 + regions.length) % regions.length)

  return (
    <section id="gallery" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <p className="text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] text-primary mb-2 sm:mb-3 md:mb-4">Cultural Heritage</p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-3 sm:mb-4">Regional Gallery</h2>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-2xl mx-auto px-4">
            Explore the diverse crafting traditions from the three major island groups of the Philippines.
          </p>
        </div>

        {/* Regional Showcase */}
        <div className="relative mb-10 sm:mb-14 md:mb-20">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <div className="aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden">
                <img
                  src={currentRegion.image || "/placeholder.svg"}
                  alt={currentRegion.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent" />
              </div>

              {/* Navigation arrows */}
              <button
                onClick={prevRegion}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-background/90 rounded-full shadow-lg hover:bg-background transition-colors"
              >
                <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
              <button
                onClick={nextRegion}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-background/90 rounded-full shadow-lg hover:bg-background transition-colors"
              >
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>

              {/* Region indicator */}
              <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-3 sm:left-4 md:left-6 text-white">
                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium">{currentRegion.name}</h3>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              <div className="flex gap-3 sm:gap-4 md:gap-6">
                <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground">
                  <Users className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-primary" />
                  <span>{currentRegion.artisans} Artisans</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-primary" />
                  <span>{currentRegion.artifacts} Artifacts</span>
                </div>
              </div>

              <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">{currentRegion.story}</p>

              <div>
                <h4 className="text-sm sm:text-base font-medium text-foreground mb-2 sm:mb-3">Featured Crafts</h4>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {currentRegion.crafts.map((craft) => (
                    <span key={craft} className="px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-primary/10 text-primary rounded-full text-xs sm:text-sm">
                      {craft}
                    </span>
                  ))}
                </div>
              </div>

              {/* Region dots */}
              <div className="flex gap-1.5 sm:gap-2 pt-2 sm:pt-3 md:pt-4">
                {regions.map((region, index) => (
                  <button
                    key={region.id}
                    onClick={() => setActiveRegion(index)}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                      index === activeRegion ? "bg-primary w-4 sm:w-6 md:w-8" : "bg-border hover:bg-primary/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 md:mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 rounded-full text-xs sm:text-sm font-medium transition-all ${
                activeCategory === category.id
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-card border border-border text-foreground hover:border-primary"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className={`group relative rounded-lg sm:rounded-xl overflow-hidden cursor-pointer ${
                item.featured ? "col-span-2 row-span-2" : ""
              }`}
            >
              <div className={`${item.featured ? "aspect-square" : "aspect-[3/4]"}`}>
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4">
                  <h4 className="text-xs sm:text-sm md:text-base font-medium text-white line-clamp-1">{item.name}</h4>
                  <p className="text-xs text-white/70">{item.region}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
