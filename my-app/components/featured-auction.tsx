"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Flame, ArrowRight } from "lucide-react"
import Image from "next/image"
import type { AuctionItem } from "@/app/auction/page"
import { toAuctionPath } from "@/components/auction-image"

interface Props {
  onPlaceBid: (item: AuctionItem) => void
}

import { featuredItem } from "@/components/auction-data"

export function FeaturedAuction({ onPlaceBid }: Props) {
  const [timeLeft, setTimeLeft] = useState(featuredItem.timeLeft)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev
        seconds--
        if (seconds < 0) {
          seconds = 59
          minutes--
        }
        if (minutes < 0) {
          minutes = 59
          hours--
        }
        if (hours < 0) {
          hours = 23
          days--
        }
        if (days < 0) {
          return { days: 0, hours: 0, minutes: 0, seconds: 0 }
        }
        return { days, hours, minutes, seconds }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const isEndingSoon = timeLeft.days === 0 && timeLeft.hours < 6

  return (
    <section className="py-12 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Flame className="h-5 w-5 text-destructive" />
              <span className="text-sm font-semibold text-destructive uppercase tracking-wide">Hot Auction</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Featured Masterpiece</h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="relative group">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl">
              <div className="block sm:hidden h-56 relative">
                <Image
                  src={toAuctionPath(featuredItem.image || "/placeholder.svg")}
                  alt={featuredItem.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="hidden sm:block relative aspect-[4/3]">
                <Image
                  src={toAuctionPath(featuredItem.image || "/placeholder.svg")}
                  alt={featuredItem.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <Image
                src={toAuctionPath(featuredItem.image || "/placeholder.svg")}
                alt={featuredItem.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge className="bg-secondary text-secondary-foreground">{featuredItem.edition}</Badge>
                {isEndingSoon && (
                  <Badge variant="destructive" className="animate-pulse">
                    Ending Soon!
                  </Badge>
                )}
              </div>
            </div>

            <div className="mt-3 sm:mt-4 flex items-center gap-3 bg-card rounded-full pl-1 pr-4 py-1 shadow-lg border border-border overflow-hidden">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-white relative flex-shrink-0">
                <Image src={toAuctionPath(featuredItem.artisanImage || "/placeholder.svg")} alt={featuredItem.artisan} fill className="object-cover" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Artisan</p>
                <p className="text-sm font-semibold text-foreground">{featuredItem.artisan}</p>
              </div>
            </div>
          </div>

          <div className="lg:pl-8 pt-8 lg:pt-0">
            <Badge variant="outline" className="mb-4 text-primary border-primary">
              {featuredItem.category}
            </Badge>

            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">{featuredItem.title}</h3>

            <p className="text-muted-foreground mb-6 leading-relaxed">{featuredItem.description}</p>

            <div className={`mb-4 ${isEndingSoon ? "animate-countdown" : ""}`}>
              {/* Mobile: horizontal scroll countdown */}
              <div className="flex gap-3 overflow-x-auto pb-2 sm:hidden">
                {[
                  { label: "Days", value: timeLeft.days },
                  { label: "Hours", value: timeLeft.hours },
                  { label: "Minutes", value: timeLeft.minutes },
                  { label: "Seconds", value: timeLeft.seconds },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`min-w-[84px] flex-shrink-0 text-center p-3 rounded-xl ${
                      isEndingSoon ? "bg-destructive/10 border border-destructive/30" : "bg-muted"
                    }`}
                  >
                    <div className={`text-xl font-bold ${isEndingSoon ? "text-destructive" : "text-foreground"}`}>
                      {String(item.value).padStart(2, "0")}
                    </div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wide">{item.label}</div>
                  </div>
                ))}
              </div>

              {/* Desktop: grid countdown */}
              <div className="hidden sm:grid grid-cols-4 gap-3">
                {[
                  { label: "Days", value: timeLeft.days },
                  { label: "Hours", value: timeLeft.hours },
                  { label: "Minutes", value: timeLeft.minutes },
                  { label: "Seconds", value: timeLeft.seconds },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`text-center p-4 rounded-xl ${
                      isEndingSoon ? "bg-destructive/10 border border-destructive/30" : "bg-muted"
                    }`}
                  >
                    <div className={`text-2xl md:text-3xl font-bold ${isEndingSoon ? "text-destructive" : "text-foreground"}`}>
                      {String(item.value).padStart(2, "0")}
                    </div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wide">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-card rounded-xl border border-border mb-6">
              <div>
                <p className="text-sm text-muted-foreground">Current Bid</p>
                <p className="text-3xl font-bold text-primary">₱{featuredItem.currentBid.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span className="text-sm">{featuredItem.bids} bids</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Started at ₱{featuredItem.startingBid.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                className="w-full sm:flex-1 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg animate-pulse-glow"
                onClick={() => onPlaceBid(featuredItem)}
              >
                Place Your Bid
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-primary text-primary hover:bg-primary/10 bg-transparent"
              >
                Watch Item
              </Button>
            </div>
            {/* spacer for mobile bottom CTA overlap */}
            <div className="md:hidden h-20" />
          </div>
        </div>
      </div>
      {/* Mobile fixed CTA removed to avoid duplicate Place Bid on auction page */}
    </section>
  )
}
