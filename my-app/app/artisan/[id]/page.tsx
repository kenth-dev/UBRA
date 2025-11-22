"use client"

import { useState, useEffect } from "react"
import { useApp } from "@/lib/context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

interface Artisan {
  id: number
  name: string
  role: string
  bio: string
  image: string
  location: string
  specialty: string
  productCount: number
}

interface Product {
  id: number
  artisanId: number
  name: string
  price: number
  image: string
  description: string
  category: string
}

export default function ArtisanPage({ params }: { params: { id: string } }) {
  const [artisan, setArtisan] = useState<Artisan | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const { addToCart } = useApp()

  useEffect(() => {
    Promise.all([
      fetch("/data/artisans.json").then((res) => res.json()),
      fetch("/data/products.json").then((res) => res.json()),
    ]).then(([artisansData, productsData]) => {
      const art = artisansData.artisans.find((a: Artisan) => a.id === Number.parseInt(params.id))
      if (art) {
        setArtisan(art)
        const prods = productsData.products.filter((p: Product) => p.artisanId === art.id)
        setProducts(prods)
      }
    })
  }, [params.id])

  if (!artisan) return <div className="pt-20">Loading...</div>

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link href="/shop" className="text-primary hover:underline mb-6 block">
          ← Back to Shop
        </Link>

        {/* Artisan Header */}
        <div className="mb-12 bg-card rounded-lg p-8 border border-muted">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <Image
              src={artisan.image || "/placeholder.svg"}
              alt={artisan.name}
              width={200}
              height={200}
              className="w-40 h-40 rounded-full object-cover"
            />

            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{artisan.name}</h1>
              <p className="text-xl text-primary mb-4">{artisan.role}</p>
              <p className="text-muted-foreground mb-6 leading-relaxed">{artisan.bio}</p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-semibold">{artisan.location}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Specialty</p>
                  <p className="font-semibold">{artisan.specialty}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Products</p>
                  <p className="font-semibold">{artisan.productCount}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Artisan's Products */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Featured Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition">
                <div className="aspect-square relative overflow-hidden bg-muted">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="w-full h-full object-cover hover:scale-105 transition"
                  />
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{product.description}</p>

                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-primary">₱{product.price}</span>
                  </div>

                  <Button className="w-full bg-primary hover:bg-secondary" onClick={() => addToCart(product)}>
                    Add to Cart
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
