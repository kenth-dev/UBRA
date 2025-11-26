"use client"

import { MuseumHero } from "../../components/museum/museum-hero"
import { FeaturedExhibit } from "../../components/museum/featured-exhibit"
import { CulturalGallery } from "../../components/museum/cultural-gallery"
import { ArtisanShowcase } from "../../components/museum/artisan-showcase"
import { VirtualTour } from "../../components/museum/virtual-tour"
import { ProductViewer3D } from "../../components/museum/product-viewer-3d"
import { MuseumFooter } from "../../components/museum/museum-footer"

export default function MuseumPage() {
  return (
    <div className="min-h-screen bg-background">
      <MuseumHero />
      <FeaturedExhibit />
      <ProductViewer3D />
      <CulturalGallery />
      <ArtisanShowcase />
      <VirtualTour />
      <MuseumFooter />
    </div>
  )
}
