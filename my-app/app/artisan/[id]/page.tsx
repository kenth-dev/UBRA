"use client"

import React, { useState, useEffect } from "react"
import { useApp } from "@/lib/context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Mail, MessageSquare, Users } from "lucide-react"

interface Artisan {
  id: number
  name: string
  role: string
  bio: string
  image: string
  location: string
  specialty: string
  productCount: number
  yearsExperience?: number
  rating?: number
  sales?: number
  specialties?: string[]
  achievements?: string[]
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
  const [activeTab, setActiveTab] = useState("story")
  const { addToCart } = useApp()

  // Unwrap potential promised `params` in client components using React.use
  const resolvedParams = (React as any).use ? (React as any).use(params) : params

  useEffect(() => {
    Promise.all([
      fetch("/data/artisans.json").then((res) => res.json()),
      fetch("/data/products.json").then((res) => res.json()),
    ]).then(([artisansData, productsData]) => {
      const art = artisansData.artisans.find((a: Artisan) => a.id === Number.parseInt(resolvedParams.id))
      if (art) {
        setArtisan({
          ...art,
          yearsExperience: 28,
          rating: 4.8,
          sales: 1423,
          specialties: ["Handmade Textiles", "Traditional Weaving", "Cultural Preservation"],
          achievements: ["Best Artisan 2023", "Cultural Heritage Award", "Master Craftsperson"],
        })
        const prods = productsData.products.filter((p: Product) => p.artisanId === art.id)
        setProducts(prods)
      }
    })
  }, [resolvedParams.id])

  if (!artisan) return <div className="pt-20">Loading...</div>

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="relative h-56 sm:h-72 md:h-96 bg-gradient-to-br from-[#8B6F47] via-[#A8896F] to-[#D4C5B9] overflow-visible">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url('/placeholder.svg')" }}></div>
        <div className="absolute inset-0 bg-black/20 mix-blend-multiply"></div>

        {/* Artisan Profile Card */}
        <div className="max-w-5xl mx-auto px-4 relative bottom-0 md:-bottom-20 z-20">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <Image
              src={artisan.image || "/placeholder.svg"}
              alt={artisan.name}
              width={160}
              height={160}
              className="w-24 h-24 sm:w-32 md:w-40 sm:h-32 md:h-40 rounded-full object-cover border-4 border-white shadow-lg flex-shrink-0"
            />

            <div className="flex-1 pb-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="min-w-0">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 truncate text-center sm:text-left drop-shadow-md">{artisan.name}</h1>
                  <p className="text-sm sm:text-lg text-white/90 mb-2 truncate text-center sm:text-left">{artisan.role}</p>
                  <div className="flex flex-wrap items-center gap-3 text-white/80 mb-2 text-xs sm:text-sm justify-center sm:justify-start">
                    <span className="flex items-center gap-1">📍 {artisan.location}</span>
                    <span className="flex items-center gap-1">⭐ {artisan.rating} rating</span>
                    <span className="flex items-center gap-1">{artisan.yearsExperience} years experience</span>
                  </div>
                </div>

                <div className="hidden md:flex gap-3 items-center">
                  <Button className="bg-white text-[#8B6F47] hover:bg-gray-100 font-semibold">
                    <Users size={18} className="mr-2" />
                    Follow
                  </Button>
                  <Button className="bg-[#E8A76F] hover:bg-[#D88B5A] text-white font-semibold">
                    <Mail size={18} className="mr-2" />
                    Message
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6 pt-6 md:pt-12">
        {/* Tabs (pulled closer to header) */}
        <div className="flex gap-8 border-b mb-4 overflow-x-auto bg-background relative z-10 py-2 -mt-4 md:-mt-6">
          {[
            { id: "story", label: "Story" },
            { id: "portfolio", label: "Portfolio" },
            { id: "products", label: "Products" },
            { id: "workshops", label: "Workshops" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 font-semibold transition whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-[#8B6F47] border-b-2 border-[#8B6F47]"
                  : "text-gray-600 hover:text-[#8B6F47]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Mobile action buttons (stacked) */}
        <div className="md:hidden my-4 flex flex-col gap-3 px-1">
          <Button className="w-full bg-white text-[#8B6F47] hover:bg-gray-100 font-semibold">
            <Users size={16} className="mr-2" /> Follow
          </Button>
          <Button className="w-full bg-[#E8A76F] hover:bg-[#D88B5A] text-white font-semibold">
            <Mail size={16} className="mr-2" /> Message
          </Button>
        </div>

        {/* Story Tab */}
        {activeTab === "story" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Artisan's Journey</h2>
              <p className="text-gray-700 leading-relaxed mb-6">{artisan.bio}</p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="font-bold text-lg mb-3">Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {artisan.specialties?.map((spec) => (
                      <span
                        key={spec}
                        className="bg-[#F5E6D3] text-[#8B6F47] px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-3">Achievements</h3>
                  <div className="flex flex-wrap gap-2">
                    {artisan.achievements?.map((achievement) => (
                      <span
                        key={achievement}
                        className="bg-[#FFF4E6] text-[#E8A76F] px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-4 sticky top-24">
                <h3 className="font-bold text-lg mb-6">Artisan Stats</h3>
                <div className="space-y-6">
                  <div className="text-center">
                    <p className="text-2xl md:text-3xl font-bold text-[#8B6F47]">{artisan.yearsExperience}</p>
                    <p className="text-gray-600">Years Experience</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl md:text-3xl font-bold text-[#8B6F47]">{artisan.productCount}</p>
                    <p className="text-gray-600">Products</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl md:text-3xl font-bold text-[#8B6F47]">{artisan.sales?.toLocaleString()}</p>
                    <p className="text-gray-600">Sales</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl md:text-3xl font-bold text-primary">{artisan.rating}</p>
                    <p className="text-gray-600">Rating</p>
                  </div>
                </div>

                {/* Connect Card */}
                <div className="mt-8 bg-gradient-to-br from-[#E8A76F] to-[#D88B5A] text-white p-6 rounded-lg">
                  <h4 className="font-bold text-lg mb-3">Connect with {artisan.name}</h4>
                  <p className="text-sm mb-4">
                    Have questions about custom orders or want to learn more about the craft?
                  </p>
                  <Button className="w-full bg-white text-[#8B6F47] hover:bg-gray-100 font-semibold mb-2">
                    <MessageSquare size={16} className="mr-2" />
                    Send Message
                  </Button>
                  <Button className="w-full border border-white text-white hover:bg-white/10 font-semibold">
                    Schedule Video Call
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === "products" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Featured Works</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <Link key={product.id} href={`/product/${product.id}`}>
                  <Card className="overflow-hidden hover:shadow-md transition group cursor-pointer h-full">
                    <div className="relative overflow-hidden bg-muted h-28 sm:aspect-square sm:h-auto">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill={true}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-200"
                      />
                    </div>

                    <div className="p-2 sm:p-3">
                      <h3 className="font-semibold text-sm sm:text-base mb-1 hover:text-[#8B6F47] transition truncate">{product.name}</h3>
                      <p className="text-xs text-gray-600 mb-2 line-clamp-2 hidden sm:block">{product.description}</p>

                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="text-lg sm:text-xl font-bold text-[#8B6F47]">₱{product.price}</span>
                        </div>
                      </div>

                      <Button
                        onClick={(e) => {
                          e.preventDefault()
                          addToCart(product)
                        }}
                        className="w-full bg-[#8B6F47] hover:bg-[#6B4F27] text-white py-1 text-sm rounded-md transition"
                      >
                        Add
                      </Button>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Portfolio & Workshops Tabs (Placeholder) */}
        {(activeTab === "portfolio" || activeTab === "workshops") && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Coming soon</p>
          </div>
        )}
      </div>
    </div>
  )
}
