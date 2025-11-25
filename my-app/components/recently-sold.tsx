"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ArrowRight } from "lucide-react"
import Image from "next/image"
import { toAuctionPath } from "@/components/auction-image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const recentlySold = [
  {
    id: "s1",
    title: "Handwoven Sinamay Bag",
    artisan: "Carmen Reyes",
    image: "/handwoven-sinamay-bag-natural-fiber-philippine.jpg",
    soldPrice: 4200,
    soldDate: "2 hours ago",
    buyer: "M***a",
  },
  {
    id: "s2",
    title: "Palawan Pearl Necklace",
    artisan: "Grace Mendoza",
    image: "/south-sea-pearl-necklace-elegant-philippine.jpg",
    soldPrice: 28500,
    soldDate: "5 hours ago",
    buyer: "J***n",
  },
  {
    id: "s3",
    title: "T'boli Brass Belt",
    artisan: "Datu Bong",
    image: "/placeholder.svg?height=300&width=300",
    soldPrice: 12000,
    soldDate: "1 day ago",
    buyer: "S***r",
  },
  {
    id: "s4",
    title: "Vigan Pottery Jar",
    artisan: "Ramon Crisologo",
    image: "/placeholder.svg?height=300&width=300",
    soldPrice: 6800,
    soldDate: "1 day ago",
    buyer: "A***e",
  },
]

export function RecentlySold() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm font-semibold text-green-600 uppercase tracking-wide">Sold</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Recently Sold</h2>
          </div>
          <Link
            href="/auction/history"
            className="hidden md:flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition"
          >
            View History
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {recentlySold.map((item) => (
            <Card key={item.id} className="overflow-hidden bg-card border-border group">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={toAuctionPath(item.image || "/placeholder.svg")}
                  alt={item.title}
                  fill
                  className="object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 to-transparent" />
                <Badge className="absolute top-3 right-3 bg-green-600 text-white">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Sold
                </Badge>
              </div>

              <div className="p-3">
                <h3 className="font-semibold text-foreground mb-1 text-sm line-clamp-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground mb-2">by {item.artisan}</p>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Final</p>
                    <p className="text-sm font-bold text-primary">₱{item.soldPrice.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{item.soldDate}</p>
                    <p className="text-xs text-foreground">{item.buyer}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 bg-transparent">
            View Auction History
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
