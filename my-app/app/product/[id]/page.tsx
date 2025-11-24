"use client"

import React, { useState, useEffect } from "react"
import { useApp } from "@/lib/context"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Heart, Share2, Truck, Shield, RotateCw, ShoppingCart } from "lucide-react"

interface Product {
  id: number
  artisanId: number
  name: string
  price: number
  image: string
  description: string
  category: string
  rating?: number
  reviews?: number
  discount?: number
}

interface Artisan {
  id: number
  name: string
  image: string
  location: string
  specialty: string
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [artisan, setArtisan] = useState<Artisan | null>(null)
  const [selectedSize, setSelectedSize] = useState("Medium")
  const [quantity, setQuantity] = useState(1)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { addToCart, favorites, toggleFavorite } = useApp()

  // Next.js may provide a promised `params` value that needs to be unwrapped
  // in client components using the experimental `React.use` sync API.
  // Cast React to `any` to call the unwrap helper without TypeScript errors.
  const resolvedParams = (React as any).use ? (React as any).use(params) : params

  useEffect(() => {
    Promise.all([
      fetch("/data/products.json").then((res) => res.json()),
      fetch("/data/artisans.json").then((res) => res.json()),
    ]).then(([productsData, artisansData]) => {
      const prod = productsData.products.find((p: Product) => p.id === Number.parseInt(resolvedParams.id))
      if (prod) {
        setProduct({
          ...prod,
          rating: 4.8,
          reviews: 156,
          discount: 22,
        })
        const art = artisansData.artisans.find((a: Artisan) => a.id === prod.artisanId)
        setArtisan(art)
      }
    })
  }, [resolvedParams.id])

  if (!product) return <div className="pt-20 text-center py-12">Loading...</div>

  const originalPrice = Math.round(product.price / (1 - (product.discount || 0) / 100))
  const productImages = [product.image, product.image, product.image, product.image]
  const isFavorite = favorites.includes(product.id)

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-[#8B6F47]">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#8B6F47]">
            Marketplace
          </Link>
          <span>/</span>
          <span className="text-[#8B6F47] font-semibold">{product.category}</span>
          <span>/</span>
          <span className="text-gray-800 font-semibold">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
              <Image
                src={productImages[currentImageIndex] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="w-full h-full object-cover"
              />

              {/* Image Navigation */}
              <button
                onClick={() => setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition"
              >
                <ChevronLeft size={24} className="text-gray-800" />
              </button>
              <button
                onClick={() => setCurrentImageIndex((prev) => (prev + 1) % productImages.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition"
              >
                <ChevronRight size={24} className="text-gray-800" />
              </button>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                {product.discount && product.discount > 0 && (
                  <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {product.discount}% OFF
                  </div>
                )}
                <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">Handmade</div>
              </div>

              {/* Wishlist & Share */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="bg-white rounded-full p-2 hover:bg-gray-100 transition"
                >
                  <Heart size={20} className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"} />
                </button>
                <button className="bg-white rounded-full p-2 hover:bg-gray-100 transition">
                  <Share2 size={20} className="text-gray-600" />
                </button>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-3">
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                    currentImageIndex === idx ? "border-[#8B6F47]" : "border-gray-200"
                  }`}
                >
                  <Image
                    src={img || "/placeholder.svg"}
                    alt={`View ${idx + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold mb-3">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                <span className="text-yellow-400">{"★".repeat(Math.floor(product.rating || 4))}</span>
                <span className="text-gray-800 font-semibold">{product.rating}</span>
              </div>
              <span className="text-gray-600">({product.reviews} reviews)</span>
              <span className="text-green-600 font-semibold">• In Stock</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl font-bold text-[#8B6F47]">₱{product.price}</span>
              <span className="text-lg text-gray-500 line-through">₱{originalPrice}</span>
              <span className="text-red-600 font-semibold">Save ₱{originalPrice - product.price}</span>
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>

            {artisan && (
              <div className="flex items-center gap-4 mb-6 pb-6 border-b">
                <Image
                  src={artisan.image || "/placeholder.svg"}
                  alt={artisan.name}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <Link href={`/artisan/${artisan.id}`} className="hover:text-[#8B6F47] transition">
                    <p className="font-semibold text-[#8B6F47]">{artisan.name}</p>
                  </Link>
                  <p className="text-sm text-gray-600">📍 {artisan.location}</p>
                </div>
                <Link href={`/artisan/${artisan.id}`}>
                  <Button className="bg-[#8B6F47] hover:bg-[#6B4F27] text-white">Contact</Button>
                </Link>
              </div>
            )}

            {/* Size Options */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-3">Size: Select</label>
              <div className="flex gap-3">
                {["Small", "Medium", "Large"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border-2 transition font-medium ${
                      selectedSize === size
                        ? "border-[#8B6F47] bg-[#8B6F47] text-white"
                        : "border-gray-300 text-gray-700 hover:border-[#8B6F47]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-3">Quantity:</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                >
                  −
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                  className="w-16 text-center border border-gray-300 rounded-lg py-2"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-6">
              <Button
                onClick={() => {
                  addToCart(product)
                }}
                className="flex-1 bg-gradient-to-r from-[#E8A76F] to-[#D88B5A] hover:from-[#D88B5A] hover:to-[#C87A49] text-white py-3 rounded-lg font-semibold text-lg h-auto transition"
              >
                <ShoppingCart size={20} className="mr-2" />
                Add to Cart
              </Button>
              <Button className="flex-1 border-2 border-[#8B6F47] bg-white text-[#8B6F47] hover:bg-gray-50 py-3 rounded-lg font-semibold text-lg h-auto transition">
                🔥 Buy Now
              </Button>
            </div>

            {/* Delivery Information */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-lg mb-4">Delivery Information</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Truck size={20} className="text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-green-600">Free delivery in 5 days</p>
                    <p className="text-sm text-gray-600">Arrives within 5 business days</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield size={20} className="text-[#8B6F47] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Secure payment & authenticity guaranteed</p>
                    <p className="text-sm text-gray-600">100% authentic handmade products</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <RotateCw size={20} className="text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">30-day easy returns</p>
                    <p className="text-sm text-gray-600">Hassle-free returns within 30 days</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Specifications */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-lg mb-4">Specifications</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Material:</p>
                  <p className="font-semibold">Pure Silk</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Length:</p>
                  <p className="font-semibold">12 inches</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Width:</p>
                  <p className="font-semibold">3 inches</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Weight:</p>
                  <p className="font-semibold">25 grams</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Care:</p>
                  <p className="font-semibold">Dry clean only</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Origin:</p>
                  <p className="font-semibold">Cagayan, Philippines</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
