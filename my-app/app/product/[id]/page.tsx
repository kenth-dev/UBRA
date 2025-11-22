"use client"

import { useState, useEffect } from "react"
import { useApp } from "@/lib/context"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

interface Product {
  id: number
  artisanId: number
  name: string
  price: number
  image: string
  description: string
  category: string
}

interface Artisan {
  id: number
  name: string
  image: string
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [artisan, setArtisan] = useState<Artisan | null>(null)
  const { addToCart } = useApp()

  useEffect(() => {
    Promise.all([
      fetch("/data/products.json").then((res) => res.json()),
      fetch("/data/artisans.json").then((res) => res.json()),
    ]).then(([productsData, artisansData]) => {
      const prod = productsData.products.find((p: Product) => p.id === Number.parseInt(params.id))
      if (prod) {
        setProduct(prod)
        const art = artisansData.artisans.find((a: Artisan) => a.id === prod.artisanId)
        setArtisan(art)
      }
    })
  }, [params.id])

  if (!product) return <div className="pt-20">Loading...</div>

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/shop" className="text-primary hover:underline mb-6 block">
          ← Back to Shop
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="aspect-square relative bg-muted rounded-lg overflow-hidden">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-3xl font-bold text-primary mb-4">₱{product.price}</p>
            <p className="text-muted-foreground mb-6">{product.description}</p>

            <div className="bg-muted p-4 rounded-lg mb-6">
              <p className="text-sm text-muted-foreground mb-2">Category</p>
              <p className="font-semibold">{product.category}</p>
            </div>

            {artisan && (
              <div className="border border-muted rounded-lg p-4 mb-6">
                <p className="text-sm text-muted-foreground mb-3">By</p>
                <Link href={`/artisan/${artisan.id}`} className="flex items-center gap-3 hover:text-primary transition">
                  <Image
                    src={artisan.image || "/placeholder.svg"}
                    alt={artisan.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{artisan.name}</p>
                    <p className="text-sm text-muted-foreground">View Artisan Profile</p>
                  </div>
                </Link>
              </div>
            )}

            <Button
              size="lg"
              className="w-full bg-primary hover:bg-secondary text-primary-foreground h-12"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
