"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Gavel, ArrowRight, Radio } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { AuctionItem } from "@/app/auction/page"
import { toAuctionPath } from "@/components/auction-image"

interface Props {
  onPlaceBid: (item: AuctionItem) => void
}

import { liveAuctions } from "@/components/auction-data"

function AuctionCard({ item, onPlaceBid }: { item: AuctionItem; onPlaceBid: (item: AuctionItem) => void }) {
  const [timeLeft, setTimeLeft] = useState(item.timeLeft)

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
  const formatTime = () => {
    if (timeLeft.days > 0) return `${timeLeft.days}d ${timeLeft.hours}h`
    return `${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`
  }

  return (
    <Card className="group overflow-hidden bg-card border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative aspect-[4/5] sm:aspect-square overflow-hidden">
        <Image
          src={toAuctionPath(item.image || "/placeholder.svg")}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {item.isLimited && <Badge className="bg-primary/90 text-primary-foreground text-xs">{item.edition}</Badge>}
          {isEndingSoon && (
            <Badge variant="destructive" className="animate-pulse text-xs">
              Ending Soon!
            </Badge>
          )}
        </div>

        <div className="absolute top-3 right-3">
          <div className="flex items-center gap-1.5 bg-card/90 backdrop-blur-sm rounded-full px-2.5 py-1">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-medium text-foreground">Live</span>
          </div>
        </div>

        <div className="absolute bottom-3 left-3 right-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
          <Button
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => onPlaceBid(item)}
          >
            <Gavel className="h-4 w-4 mr-2" />
            Place Bid
          </Button>
        </div>
      </div>

      <div className="p-3">
        <div className="flex items-center gap-2 mb-2">
          <Image
            src={toAuctionPath(item.artisanImage || "/placeholder.svg")}
            alt={item.artisan}
            width={24}
            height={24}
            className="rounded-full"
          />
          <span className="text-xs text-muted-foreground">{item.artisan}</span>
        </div>

        <h3 className="font-semibold text-foreground mb-2 text-sm line-clamp-1 group-hover:text-primary transition-colors">
          {item.title}
        </h3>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Current</p>
            <p className="text-sm font-bold text-primary">₱{item.currentBid.toLocaleString()}</p>
          </div>
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${isEndingSoon ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"}`}
          >
            <Clock className="h-3.5 w-3.5" />
            <span className="text-xs font-medium">{formatTime()}</span>
          </div>
        </div>

        <div className="mt-2 pt-2 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
          <span>{item.bids} bids</span>
          <span>₱{item.startingBid.toLocaleString()}</span>
        </div>
      </div>
    </Card>
  )
}

export function LiveAuctions({ onPlaceBid }: Props) {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-destructive/10 rounded-full">
              <Radio className="h-3 w-4 text-destructive animate-pulse" />
              <span className="text-sm font-semibold text-destructive">Live</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Live Auctions</h2>
          </div>
          <Link
            href="/auction/all"
            className="hidden md:flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition"
          >
            See All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {liveAuctions.map((item) => (
            <AuctionCard key={item.id} item={item} onPlaceBid={onPlaceBid} />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 bg-transparent">
            View All Live Auctions
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
