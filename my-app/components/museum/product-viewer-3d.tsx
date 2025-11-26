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
    <section id="artifacts" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-primary mb-4">Interactive Experience</p>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-4">3D Artifact Viewer</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Examine our prized artifacts in stunning detail. Rotate, zoom, and explore every angle of these cultural
            treasures.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* 3D Viewer */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-2xl p-8 shadow-xl">
              <div className="aspect-square relative bg-background/50 rounded-xl overflow-hidden backdrop-blur-sm mb-6">
                <div
                  className="absolute inset-0 flex items-center justify-center p-12 transition-all duration-500"
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
                <div className="absolute top-4 right-4 px-3 py-1.5 bg-secondary/90 text-secondary-foreground rounded-full text-xs font-medium uppercase tracking-wider">
                  {viewMode === "3d" ? "Interactive View" : "Detail View"}
                </div>

                {/* Rotation indicator */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs text-muted-foreground bg-background/80 px-3 py-1.5 rounded-full">
                  <RotateCw className="h-3 w-3" />
                  {rotation}°
                </div>

                {/* Zoom indicator */}
                <div className="absolute bottom-4 right-4 flex items-center gap-2 text-xs text-muted-foreground bg-background/80 px-3 py-1.5 rounded-full">
                  <ZoomIn className="h-3 w-3" />
                  {Math.round(zoom * 100)}%
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleRotate}
                    className="bg-background hover:bg-accent"
                  >
                    <RotateCw className="h-4 w-4 mr-2" />
                    Rotate
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleZoomIn}
                    className="bg-background hover:bg-accent"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleZoomOut}
                    className="bg-background hover:bg-accent"
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleReset}
                    className="bg-background hover:bg-accent"
                  >
                    <Move className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={viewMode === "3d" ? "default" : "outline"}
                    onClick={() => setViewMode("3d")}
                    className={viewMode === "3d" ? "bg-secondary text-secondary-foreground" : "bg-background"}
                  >
                    3D View
                  </Button>
                  <Button
                    size="sm"
                    variant={viewMode === "detail" ? "default" : "outline"}
                    onClick={() => setViewMode("detail")}
                    className={viewMode === "detail" ? "bg-secondary text-secondary-foreground" : "bg-background"}
                  >
                    Detail View
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Artifact info & selection */}
          <div className="space-y-6">
            {/* Current artifact details */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-serif text-2xl font-medium text-foreground">{artifact.name}</h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Eye className="h-4 w-4" />
                  {artifact.views.toLocaleString()}
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Category</span>
                  <span className="text-foreground font-medium">{artifact.category}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Period</span>
                  <span className="text-foreground font-medium">{artifact.period}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Region</span>
                  <span className="text-foreground font-medium">{artifact.region}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Dimensions</span>
                  <span className="text-foreground font-medium">{artifact.dimensions}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Material</span>
                  <span className="text-foreground font-medium">{artifact.material}</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
                {artifact.description}
              </p>
            </div>

            {/* Artifact selector */}
            <div>
              <h4 className="font-medium text-foreground mb-4">More Artifacts</h4>
              <div className="space-y-3">
                {artifacts.map((art, index) => (
                  <button
                    key={art.id}
                    onClick={() => {
                      setActiveArtifact(index)
                      handleReset()
                    }}
                    className={`w-full text-left p-4 rounded-xl transition-all ${
                      index === activeArtifact
                        ? "bg-secondary text-secondary-foreground shadow-md"
                        : "bg-card border border-border hover:border-primary"
                    }`}
                  >
                    <div className="flex gap-4">
                      <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                        <img
                          src={art.image || "/placeholder.svg"}
                          alt={art.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-medium mb-1 truncate">{art.name}</h5>
                        <p className="text-sm text-muted-foreground">{art.category}</p>
                      </div>
                      {art.featured && (
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs self-start">
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
