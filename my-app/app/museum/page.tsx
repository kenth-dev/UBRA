"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function MuseumPage() {
  const exhibits = [
    {
      title: "Abaca Weaving Heritage",
      description: "Explore the centuries-old tradition of abaca weaving from Cagayan",
      artisans: 12,
      pieces: 45,
    },
    {
      title: "Filipino Pottery Traditions",
      description: "Discover the artistry and techniques of traditional Filipino ceramics",
      artisans: 8,
      pieces: 32,
    },
    {
      title: "Wood Carving Mastery",
      description: "Journey through the intricate patterns of Filipino wood carving",
      artisans: 10,
      pieces: 38,
    },
  ]

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link href="/" className="text-primary hover:underline mb-6 inline-block">
          ← Back to Home
        </Link>

        <div className="mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Artisan Museum</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Step into the rich cultural heritage of Filipino artisans. Discover the stories, techniques, and traditions
            behind each handcrafted masterpiece.
          </p>
        </div>

        {/* Featured Section */}
        <div className="mb-16 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8 border border-primary/20">
          <h2 className="text-2xl font-bold mb-4">Cultural Heritage Exhibits</h2>
          <p className="text-muted-foreground mb-8">
            Each exhibit showcases the unique traditions and stories of Filipino artisans from different regions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {exhibits.map((exhibit, idx) => (
              <Card key={idx} className="p-6 hover:shadow-lg transition">
                <h3 className="font-semibold text-lg mb-3">{exhibit.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{exhibit.description}</p>
                <div className="flex gap-6 text-sm mb-4">
                  <div>
                    <p className="text-muted-foreground">Artisans</p>
                    <p className="font-semibold text-lg">{exhibit.artisans}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Pieces</p>
                    <p className="font-semibold text-lg">{exhibit.pieces}</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  Explore Exhibit <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Collections Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Featured Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 border-l-4 border-l-primary hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-3">Story of the Weaver</h3>
              <p className="text-muted-foreground mb-4">
                Learn about Mercy Racaldo, a master abaca weaver from Cagayan with over 20 years of experience. Her work
                preserves the cultural heritage of Filipino textile arts.
              </p>
              <Button variant="link" className="p-0 text-primary">
                Read Full Story →
              </Button>
            </Card>

            <Card className="p-8 border-l-4 border-l-secondary hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-3">Techniques & Traditions</h3>
              <p className="text-muted-foreground mb-4">
                Discover the traditional techniques passed down through generations. From hand-spinning to intricate
                weaving patterns, explore the methods that make each piece unique.
              </p>
              <Button variant="link" className="p-0 text-primary">
                Explore Techniques →
              </Button>
            </Card>
          </div>
        </div>

        {/* Upcoming Section */}
        <div className="text-center py-16 bg-muted/30 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            We're curating exclusive virtual tours, artist interviews, and behind-the-scenes content to bring you closer
            to the artisans.
          </p>
          <Link href="/shop">
            <Button className="bg-primary hover:bg-secondary">Support Artisans in the Shop</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
