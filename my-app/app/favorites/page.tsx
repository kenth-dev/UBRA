"use client"

import { useState, useEffect } from "react"
import { useApp } from "@/lib/context"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Product {
  id: number
  artisanId: number
  name: string
  price: number
  image: string
  description: string
  category: string
  rating?: number
}

export default function FavoritesPage() {
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { favorites, toggleFavorite, addToCart } = useApp()

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => {
        const fav = data.products.filter((p: Product) => favorites.includes(p.id))
        setFavoriteProducts(fav)
        setLoading(false)
      })
  }, [favorites])

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Favorites ({favorites.length})</h1>

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : favoriteProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">You haven't added any favorites yet</p>
            <Link href="/shop">
              <Button className="bg-[#8B6F47] hover:bg-[#6B4F27] text-white">Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
                <div className="flex items-center gap-4 p-4 sm:flex-col sm:items-stretch">
                  <Link href={`/product/${product.id}`} className="flex-shrink-0">
                    <div className="relative overflow-hidden bg-gray-100 w-20 h-20 sm:w-full sm:h-48 rounded">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </Link>

                  <div className="flex-1 min-w-0">
                    <Link href={`/product/${product.id}`}>
                      <h3 className="font-semibold text-lg mb-1 truncate hover:text-[#8B6F47] transition">{product.name}</h3>
                    </Link>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2 hidden sm:block">{product.description}</p>

                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-bold text-[#8B6F47]">₱{product.price}</span>
                      {product.rating && <span className="text-yellow-400 text-sm">★ {product.rating}</span>}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => addToCart(product)}
                        className="flex-1 bg-[#8B6F47] hover:bg-[#6B4F27] text-white py-2"
                      >
                        <ShoppingCart size={16} className="mr-1" />
                        Add
                      </Button>
                      <Button
                        onClick={() => toggleFavorite(product.id)}
                        className="w-10 h-10 p-0 border border-[#8B6F47] text-[#8B6F47] hover:bg-red-50 flex items-center justify-center"
                      >
                        <Heart size={16} className="fill-red-500 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
