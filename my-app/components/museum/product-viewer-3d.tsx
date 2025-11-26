"use client"

import { useState } from "react"
import { RotateCw, ZoomIn, ZoomOut, Move, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"

const artifacts = [
  {
    id: 1,
    name: "Antique Burnay Jar",
    category: "Pottery",
    period: "19th Century",
    region: "Ilocos",
    description:
      "A traditional earthenware jar used for storing rice wine, vinegar, and other liquids. Handcrafted using ancient pottery techniques passed down through generations.",
    dimensions: "45cm × 35cm × 35cm",
    material: "Clay, Natural Glaze",
    image: "/images/museum/burnay-pottery-traditional-ilocos-clay-jars-terrac.jpg",
    views: 2834,
    featured: true,
  },
  {
    id: 2,
    name: "Ifugao Rice God Statue",
    category: "Wood Carving",
    period: "Early 20th Century",
    region: "Cordillera",
    description:
      "A Bulul statue representing the rice deity Ifugao people. These sacred figures guard granaries and are believed to bring bountiful harvests.",
    dimensions: "62cm × 18cm × 15cm",
    material: "Narra Wood",
    image: "/images/museum/ifugao-bulul-wooden-rice-god-statue-traditional-ca.jpg",
    views: 3421,
    featured: false,
  },
  {
    id: 3,
    name: "Tinalak Textile Panel",
    category: "Weaving",
    period: "Contemporary",
    region: "Mindanao",
    description:
      "Sacred cloth woven from abaca fibers by T'boli dreamweavers. The intricate patterns are received in dreams and reflect ancestral knowledge.",
    dimensions: "180cm × 90cm",
    material: "Abaca Fiber, Natural Dyes",
    image: "/images/museum/tboli-tnalak-cloth-traditional-filipino-weaving-ge.jpg",
    views: 4102,
    featured: true,
  },
]

export function ProductViewer3D() {
  const [activeArtifact, setActiveArtifact] = useState(0)
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [viewMode, setViewMode] = useState<"3d" | "detail">("3d")

  const artifact = artifacts[activeArtifact]

  const handleRotate = () => {
    setRotation((prev) => (prev + 45) % 360)
  }

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.2, 2))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.2, 0.6))
  }

  const handleReset = () => {
    setRotation(0)
    setZoom(1)
  }

  return (
    <section id="artifacts" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <p className="text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] text-primary mb-2 sm:mb-3 md:mb-4">Interactive Experience</p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-3 sm:mb-4">3D Artifact Viewer</h2>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-2xl mx-auto px-4">
            Examine our prized artifacts in stunning detail. Rotate, zoom, and explore every angle of these cultural
            treasures.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {/* 3D Viewer */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 shadow-xl">
              <div className="aspect-square relative bg-background/50 rounded-lg sm:rounded-xl overflow-hidden backdrop-blur-sm mb-3 sm:mb-4 md:mb-6">
                <div
                  className="absolute inset-0 flex items-center justify-center p-6 sm:p-8 md:p-12 transition-all duration-500"
                  style={{
                    transform: `rotate(${rotation}deg) scale(${zoom})`,
                  }}
                >
                  <img
                    src={artifact.image || "/placeholder.svg"}
                    alt={artifact.name}
                    className="max-w-full max-h-full object-contain drop-shadow-2xl"
                  />
                </div>

                {/* View mode indicator */}
                <div className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 px-2 sm:px-3 py-1 sm:py-1.5 bg-secondary/90 text-secondary-foreground rounded-full text-xs font-medium uppercase tracking-wider">
                  {viewMode === "3d" ? "Interactive" : "Detail"}
                </div>

                {/* Rotation indicator */}
                <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-2 sm:left-3 md:left-4 flex items-center gap-1 sm:gap-2 text-xs text-muted-foreground bg-background/80 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
                  <RotateCw className="h-2 w-2 sm:h-3 sm:w-3" />
                  {rotation}°
                </div>

                {/* Zoom indicator */}
                <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 right-2 sm:right-3 md:right-4 flex items-center gap-1 sm:gap-2 text-xs text-muted-foreground bg-background/80 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
                  <ZoomIn className="h-2 w-2 sm:h-3 sm:w-3" />
                  {Math.round(zoom * 100)}%
                </div>
              </div>

              {/* Controls */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-3">
                <div className="flex gap-1.5 sm:gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleRotate}
                    className="bg-background hover:bg-accent text-xs sm:text-sm flex-1 sm:flex-none"
                  >
                    <RotateCw className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
                    <span className="hidden sm:inline">Rotate</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleZoomIn}
                    className="bg-background hover:bg-accent text-xs sm:text-sm"
                  >
                    <ZoomIn className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleZoomOut}
                    className="bg-background hover:bg-accent text-xs sm:text-sm"
                  >
                    <ZoomOut className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleReset}
                    className="bg-background hover:bg-accent text-xs sm:text-sm"
                  >
                    <Move className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
                    <span className="hidden sm:inline">Reset</span>
                  </Button>
                </div>
                <div className="flex gap-1.5 sm:gap-2">
                  <Button
                    size="sm"
                    variant={viewMode === "3d" ? "default" : "outline"}
                    onClick={() => setViewMode("3d")}
                    className={`${viewMode === "3d" ? "bg-secondary text-secondary-foreground" : "bg-background"} text-xs sm:text-sm flex-1 sm:flex-none`}
                  >
                    3D View
                  </Button>
                  <Button
                    size="sm"
                    variant={viewMode === "detail" ? "default" : "outline"}
                    onClick={() => setViewMode("detail")}
                    className={`${viewMode === "detail" ? "bg-secondary text-secondary-foreground" : "bg-background"} text-xs sm:text-sm flex-1 sm:flex-none`}
                  >
                    Detail View
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Artifact info & selection */}
          <div className="space-y-3 sm:space-y-4 md:space-y-6">
            {/* Current artifact details */}
            <div className="bg-card rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border border-border">
              <div className="flex items-start justify-between mb-2 sm:mb-3 md:mb-4">
                <h3 className="font-serif text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-foreground">{artifact.name}</h3>
                <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
                  <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                  {artifact.views.toLocaleString()}
                </div>
              </div>

              <div className="space-y-1.5 sm:space-y-2 md:space-y-3 mb-2 sm:mb-3 md:mb-4">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-muted-foreground">Category</span>
                  <span className="text-foreground font-medium">{artifact.category}</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-muted-foreground">Period</span>
                  <span className="text-foreground font-medium">{artifact.period}</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-muted-foreground">Region</span>
                  <span className="text-foreground font-medium">{artifact.region}</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-muted-foreground">Dimensions</span>
                  <span className="text-foreground font-medium">{artifact.dimensions}</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-muted-foreground">Material</span>
                  <span className="text-foreground font-medium">{artifact.material}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border pt-2 sm:pt-3 md:pt-4">
                {artifact.description}
              </p>
            </div>

            {/* Artifact selector */}
            <div>
              <h4 className="text-sm sm:text-base font-medium text-foreground mb-2 sm:mb-3 md:mb-4">More Artifacts</h4>
              <div className="space-y-2 sm:space-y-3">
                {artifacts.map((art, index) => (
                  <button
                    key={art.id}
                    onClick={() => {
                      setActiveArtifact(index)
                      handleReset()
                    }}
                    className={`w-full text-left p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl transition-all ${
                      index === activeArtifact
                        ? "bg-secondary text-secondary-foreground shadow-md"
                        : "bg-card border border-border hover:border-primary"
                    }`}
                  >
                    <div className="flex gap-2 sm:gap-3 md:gap-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex-shrink-0 rounded-md sm:rounded-lg overflow-hidden bg-muted">
                        <img
                          src={art.image || "/placeholder.svg"}
                          alt={art.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs sm:text-sm font-medium mb-0.5 sm:mb-1 truncate">{art.name}</h5>
                        <p className="text-xs text-muted-foreground">{art.category}</p>
                      </div>
                      {art.featured && (
                        <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-primary/10 text-primary rounded text-xs self-start">
                          Featured
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
