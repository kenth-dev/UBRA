"use client"

import { useState, useEffect } from "react"
import { useApp } from "@/lib/context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Toast } from "@/components/ui/toast"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Grid3x3, List, X } from "lucide-react"

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
  location: string
  specialty: string
}

const CATEGORIES = ["Textiles", "Pottery", "Wood Carving", "Jewelry", "Art"]
const PRICE_RANGES = [
  { label: "Under ₱1,000", min: 0, max: 1000 },
  { label: "₱1,000 - ₱3,000", min: 1000, max: 3000 },
  { label: "₱3,000 - ₱5,000", min: 3000, max: 5000 },
  { label: "Above ₱5,000", min: 5000, max: 999999 },
]
const RATINGS = [5, 4, 3, 2, 1]

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [artisans, setArtisans] = useState<Artisan[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedPriceRange, setSelectedPriceRange] = useState<{ min: number; max: number } | null>(null)
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState("grid")
  const [showToast, setShowToast] = useState(false)
  const [addedProductName, setAddedProductName] = useState("")
  const { addToCart, favorites, toggleFavorite } = useApp()

  useEffect(() => {
    Promise.all([
      fetch("/data/products.json").then((res) => res.json()),
      fetch("/data/artisans.json").then((res) => res.json()),
    ]).then(([productsData, artisansData]) => {
      const productsWithRatings = productsData.products.map((p: Product, index: number) => ({
        ...p,
        rating: Math.floor(Math.random() * 2) + 4,
        reviews: Math.floor(Math.random() * 200) + 50,
        discount: Math.random() > 0.7 ? Math.floor(Math.random() * 30) + 10 : 0,
        isFeatured: index % 3 === 0, // Only some products are featured
      }))
      setProducts(productsWithRatings)
      setFilteredProducts(productsWithRatings)
      setArtisans(artisansData.artisans)
    })
  }, [])

  useEffect(() => {
    let result = products

    if (searchQuery) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category))
    }

    if (selectedPriceRange) {
      result = result.filter((p) => p.price >= selectedPriceRange.min && p.price <= selectedPriceRange.max)
    }

    if (selectedRating) {
      result = result.filter((p) => (p.rating || 0) >= selectedRating)
    }

    if (sortBy === "price-low") {
      result = result.sort((a, b) => a.price - b.price)
    } else if (sortBy === "price-high") {
      result = result.sort((a, b) => b.price - a.price)
    } else if (sortBy === "newest") {
      result = result.reverse()
    }

    setFilteredProducts(result)
  }, [searchQuery, selectedCategories, selectedPriceRange, selectedRating, sortBy, products])

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const getArtisanName = (artisanId: number) => {
    return artisans.find((a) => a.id === artisanId)?.name || "Unknown Artisan"
  }

  const getArtisanLocation = (artisanId: number) => {
    return artisans.find((a) => a.id === artisanId)?.location || "Philippines"
  }
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#8B6F47] to-[#A0826D] text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-balance">Discover Authentic Handicrafts</h1>
          <p className="text-lg mb-8 text-white/90">
            Explore thousands of handcrafted treasures from Philippine master artisans
          </p>

          {/* Search Bar */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search for products, artisans, or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-3 rounded-full text-gray-800 placeholder-gray-500 focus:outline-none bg-white"
            />
            <svg
              className="absolute right-4 top-3.5 w-5 h-5 text-white/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={`px-4 py-2 rounded-full font-medium transition ${
                  selectedCategories.includes(cat)
                    ? "bg-white text-[#8B6F47]"
                    : "bg-white/30 text-white hover:bg-white/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex gap-6">
          {/* Sidebar Filters (hidden on small screens) */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="space-y-6">
              {/* Price Range Filter */}
              <div>
                <h3 className="font-bold text-lg mb-4">Price Range</h3>
                <div className="space-y-3">
                  {PRICE_RANGES.map((range) => (
                    <label key={range.label} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="price"
                        checked={selectedPriceRange?.min === range.min && selectedPriceRange?.max === range.max}
                        onChange={() => setSelectedPriceRange(range)}
                        className="w-4 h-4"
                      />
                      <span className="ml-3 text-sm text-gray-700">{range.label}</span>
                    </label>
                  ))}
                  {selectedPriceRange && (
                    <button
                      onClick={() => setSelectedPriceRange(null)}
                      className="text-sm text-[#8B6F47] hover:underline mt-2"
                    >
                      Clear Price Filter
                    </button>
                  )}
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <h3 className="font-bold text-lg mb-4">Customer Rating</h3>
                <div className="space-y-3">
                  {RATINGS.map((rating) => (
                    <label key={rating} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="rating"
                        checked={selectedRating === rating}
                        onChange={() => setSelectedRating(selectedRating === rating ? null : rating)}
                        className="w-4 h-4"
                      />
                      <span className="ml-3 flex items-center">
                        <span className="text-yellow-400 mr-1">{"★".repeat(rating)}</span>
                        <span className="text-xs text-gray-600">{rating}+ Stars</span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Category Sidebar */}
              <div>
                <h3 className="font-bold text-lg mb-4">Categories</h3>
                <div className="space-y-2">
                  {CATEGORIES.map((cat) => (
                    <label key={cat} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => toggleCategory(cat)}
                        className="w-4 h-4"
                      />
                      <span className="ml-2 text-sm text-gray-700">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile filter slide-over */}
          {showFilters && (
            <div className="fixed inset-0 z-50 flex">
              <div className="absolute inset-0 bg-black/40" onClick={() => setShowFilters(false)} />
              <div className="relative bg-white w-4/5 max-w-xs p-4 overflow-auto">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">Filters</h3>
                  <button onClick={() => setShowFilters(false)} className="p-2">
                    <X />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-lg mb-4">Price Range</h3>
                    <div className="space-y-3">
                      {PRICE_RANGES.map((range) => (
                        <label key={range.label} className="flex items-center cursor-pointer">
                          <input
                            type="radio"
                            name="price-mobile"
                            checked={selectedPriceRange?.min === range.min && selectedPriceRange?.max === range.max}
                            onChange={() => setSelectedPriceRange(range)}
                            className="w-4 h-4"
                          />
                          <span className="ml-3 text-sm text-gray-700">{range.label}</span>
                        </label>
                      ))}
                      {selectedPriceRange && (
                        <button onClick={() => setSelectedPriceRange(null)} className="text-sm text-[#8B6F47] hover:underline mt-2">
                          Clear Price Filter
                        </button>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg mb-4">Customer Rating</h3>
                    <div className="space-y-3">
                      {RATINGS.map((rating) => (
                        <label key={rating} className="flex items-center cursor-pointer">
                          <input
                            type="radio"
                            name="rating-mobile"
                            checked={selectedRating === rating}
                            onChange={() => setSelectedRating(selectedRating === rating ? null : rating)}
                            className="w-4 h-4"
                          />
                          <span className="ml-3 flex items-center">
                            <span className="text-yellow-400 mr-1">{"★".repeat(rating)}</span>
                            <span className="text-xs text-gray-600">{rating}+ Stars</span>
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg mb-4">Categories</h3>
                    <div className="space-y-2">
                      {CATEGORIES.map((cat) => (
                        <label key={cat} className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(cat)}
                            onChange={() => toggleCategory(cat)}
                            className="w-4 h-4"
                          />
                          <span className="ml-2 text-sm text-gray-700">{cat}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b">
              <div className="flex items-center gap-2">
                <button
                  className="md:hidden px-2 py-1 border rounded bg-white text-sm"
                  onClick={() => setShowFilters(true)}
                >
                  Filters
                </button>
                <p className="text-sm text-gray-700">{filteredProducts.length} Products</p>
              </div>

              <div className="flex items-center gap-2">
                {/* Sort Dropdown (compact) */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-2 py-1 border rounded bg-white text-sm focus:outline-none"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low</option>
                  <option value="price-high">Price: High</option>
                  <option value="newest">Newest</option>
                </select>

                {/* View Toggle - smaller */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1 rounded ${viewMode === "grid" ? "bg-[#8B6F47] text-white" : "bg-gray-200 text-gray-700"}`}
                    aria-label="Grid view"
                  >
                    <Grid3x3 size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1 rounded ${viewMode === "list" ? "bg-[#8B6F47] text-white" : "bg-gray-200 text-gray-700"}`}
                    aria-label="List view"
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Product Grid/List */}
            <div
              className={`grid gap-4 ${
                viewMode === "grid" ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3" : "grid-cols-1"
              }`}
            >
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <Link key={product.id} href={`/product/${product.id}`}>
                    <Card className="overflow-hidden hover:shadow-md transition group cursor-pointer h-full">
                      {/* Product Image (compact on phones) */}
                      <div className="relative overflow-hidden bg-muted h-28 sm:aspect-square sm:h-auto">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill={true}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-200"
                        />
                        {/* Badges */}
                        <div className="absolute top-2 left-2 flex gap-2">
                          {product.discount && product.discount > 0 && (
                            <div className="bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-semibold">
                              {product.discount}% OFF
                            </div>
                          )}
                          {(product as any).isFeatured && (
                            <div className="bg-blue-500 text-white px-2 py-0.5 rounded-full text-xs font-semibold">
                              Featured
                            </div>
                          )}
                        </div>
                        {/* Heart Button - smaller on mobile */}
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            toggleFavorite(product.id)
                          }}
                          className="absolute top-2 right-2 bg-white rounded-full p-1 hover:bg-gray-100 transition"
                        >
                          <Heart
                            size={16}
                            className={favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-400"}
                          />
                        </button>
                      </div>

                      {/* Product Info (compact on phones) */}
                      <div className="p-2 sm:p-3">
                        <h3 className="font-semibold text-sm sm:text-base mb-1 hover:text-[#8B6F47] transition truncate">
                          {product.name}
                        </h3>

                        {/* Rating */}
                        <div className="flex items-center gap-1 mb-1 text-xs">
                          <span className="text-yellow-400">{"★".repeat(product.rating || 4)}</span>
                          <span className="text-xs text-gray-600">{product.rating}.0</span>
                          <span className="text-xs text-gray-500">({product.reviews})</span>
                        </div>

                        {/* Description - hide on very small screens */}
                        <p className="text-xs text-gray-600 mb-2 line-clamp-2 hidden sm:block">{product.description}</p>

                        {/* Artisan Info - hide on phones */}
                        <div className="text-xs text-gray-700 mb-2 hidden sm:block">
                          <p className="font-semibold">{getArtisanName(product.artisanId)}</p>
                          <p className="text-gray-500">{getArtisanLocation(product.artisanId)}</p>
                        </div>

                        {/* Price */}
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <span className="text-lg sm:text-xl font-bold text-[#8B6F47]">₱{product.price}</span>
                            {product.discount && product.discount > 0 && (
                              <span className="text-xs sm:text-sm text-gray-500 line-through ml-2">
                                ₱{Math.round(product.price / (1 - product.discount / 100))}
                              </span>
                            )}
                          </div>
                          <div className="hidden sm:block">
                            <p className="text-xs text-green-600 font-semibold">✓ Free Shipping</p>
                          </div>
                        </div>

                        {/* Add to Cart Button - compact */}
                        <Button
                          onClick={(e) => {
                            e.preventDefault()
                            addToCart(product)
                            setAddedProductName(product.name)
                            setShowToast(true)
                          }}
                          className="w-full bg-[#8B6F47] hover:bg-[#6B4F27] text-white py-1 text-sm rounded-md transition"
                        >
                          <ShoppingCart size={16} className="mr-2" />
                          Add
                        </Button>
                      </div>
                    </Card>
                  </Link>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 text-lg">No products found. Try adjusting your filters.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <Toast
          message={`${addedProductName} added to cart!`}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  )
}
