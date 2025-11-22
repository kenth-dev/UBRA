"use client"

import { useState, useEffect } from "react"
import { useApp } from "@/lib/context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
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

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const { addToCart } = useApp()

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
  }, [])

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Handmade Shop</h1>
          <p className="text-lg text-muted-foreground">Browse and support authentic Filipino artisans</p>
        </div>

        {/* Product Grid */}
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
                  <span className="text-xs bg-muted px-2 py-1 rounded">{product.category}</span>
                </div>

                <div className="flex gap-2">
                  <Link href={`/product/${product.id}`} className="flex-1">
                    <Button variant="outline" className="w-full bg-transparent">
                      View
                    </Button>
                  </Link>
                  <Button className="flex-1 bg-primary hover:bg-secondary" onClick={() => addToCart(product)}>
                    Add to Cart
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
