"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toAuctionPath } from "@/components/auction-image"
import { TrendingUp, Award, Users, Package } from "lucide-react"

const artisanStats = [
  {
    id: "a1",
    name: "Maestro Lilia Domingo",
    image: "/elderly-filipino-woman-weaver-portrait.jpg",
    specialty: "Inabel Weaving",
    location: "Ilocos Norte",
    totalAuctions: 45,
    totalSold: 42,
    highestBid: 85000,
    avgBid: 25000,
  },
  {
    id: "a2",
    name: "Pedro Maclang",
    image: "/pedro-maclang.jpg",
    specialty: "Wood Carving",
    location: "Ifugao",
    totalAuctions: 32,
    totalSold: 30,
    highestBid: 120000,
    avgBid: 35000,
  },
  {
    id: "a3",
    name: "Rosa Villanueva",
    image: "/rosa-villanueva.jpg",
    specialty: "Binakol Weaving",
    location: "Ilocos Sur",
    totalAuctions: 28,
    totalSold: 26,
    highestBid: 45000,
    avgBid: 18000,
  },
]

export function AuctionHistory() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full mb-4">
            <Award className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Top Artisans</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Artisan Auction History</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the talented artisans behind our most sought-after pieces and their auction achievements.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {artisanStats.map((artisan, index) => (
            <Card
              key={artisan.id}
              className="p-6 bg-card border-border hover:shadow-lg transition-shadow relative overflow-hidden"
            >
              {index === 0 && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-xs font-semibold">
                  Top Seller
                </div>
              )}

              <div className="flex items-center gap-4 mb-6">
                <Avatar className="h-16 w-16 border-2 border-primary">
                  <AvatarImage src={toAuctionPath(artisan.image || "/placeholder.svg")} alt={artisan.name} />
                  <AvatarFallback>{artisan.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-foreground">{artisan.name}</h3>
                  <p className="text-sm text-muted-foreground">{artisan.specialty}</p>
                  <Badge variant="outline" className="text-xs mt-1">
                    {artisan.location}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Total Auctions</span>
                  </div>
                  <p className="text-xl font-bold text-foreground">{artisan.totalAuctions}</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Sold Items</span>
                  </div>
                  <p className="text-xl font-bold text-foreground">{artisan.totalSold}</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Highest Bid</span>
                  </div>
                  <p className="text-xl font-bold text-primary">₱{artisan.highestBid.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Avg. Price</span>
                  </div>
                  <p className="text-xl font-bold text-foreground">₱{artisan.avgBid.toLocaleString()}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Success Rate</span>
                  <span className="font-semibold text-green-600">
                    {Math.round((artisan.totalSold / artisan.totalAuctions) * 100)}%
                  </span>
                </div>
                <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${(artisan.totalSold / artisan.totalAuctions) * 100}%` }}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
