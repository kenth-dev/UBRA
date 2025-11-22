"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Zap, Clock, TrendingUp } from "lucide-react"

export default function AuctionPage() {
  const auctionInfo = [
    {
      icon: TrendingUp,
      title: "Limited Edition Pieces",
      description: "Bid on exclusive, one-of-a-kind artisan creations",
    },
    {
      icon: Clock,
      title: "Real-Time Bidding",
      description: "Live auctions with transparent bidding processes",
    },
    {
      icon: Zap,
      title: "Community Impact",
      description: "20% of final price goes directly to artisan support",
    },
  ]

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link href="/" className="text-primary hover:underline mb-6 inline-block">
          ← Back to Home
        </Link>

        <div className="mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Auction Feature</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Bid on exclusive and limited-edition artisan pieces. Every purchase supports our artisan community.
          </p>
        </div>

        {/* Auction Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {auctionInfo.map((item, idx) => {
            const Icon = item.icon
            return (
              <Card key={idx} className="p-6 hover:shadow-lg transition">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon size={24} className="text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </Card>
            )
          })}
        </div>

        {/* How It Works */}
        <div className="mb-16 bg-card border border-muted rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-8">How Auctions Work</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <span className="font-bold text-lg text-primary">1</span>
              </div>
              <h3 className="font-semibold mb-2">Browse Pieces</h3>
              <p className="text-sm text-muted-foreground">View exclusive limited-edition artisan works</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <span className="font-bold text-lg text-primary">2</span>
              </div>
              <h3 className="font-semibold mb-2">Place Bid</h3>
              <p className="text-sm text-muted-foreground">Enter your bid amount before the auction ends</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <span className="font-bold text-lg text-primary">3</span>
              </div>
              <h3 className="font-semibold mb-2">Win & Pay</h3>
              <p className="text-sm text-muted-foreground">Complete your purchase if you have the highest bid</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <span className="font-bold text-lg text-primary">4</span>
              </div>
              <h3 className="font-semibold mb-2">Support Artisans</h3>
              <p className="text-sm text-muted-foreground">20% of proceeds support the artisan community</p>
            </div>
          </div>
        </div>

        {/* Revenue Model */}
        <div className="mb-16 bg-gradient-to-r from-secondary/10 to-primary/10 rounded-lg p-8 border border-muted">
          <h2 className="text-2xl font-bold mb-4">Auction Revenue Model</h2>
          <p className="text-muted-foreground mb-6">Every auction sale is distributed as follows:</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="p-4 bg-background">
              <p className="text-2xl font-bold text-primary mb-2">70%</p>
              <p className="text-sm font-semibold mb-1">To Artisan</p>
              <p className="text-xs text-muted-foreground">Direct payment to the seller</p>
            </Card>
            <Card className="p-4 bg-background">
              <p className="text-2xl font-bold text-secondary mb-2">20%</p>
              <p className="text-sm font-semibold mb-1">Community Fund</p>
              <p className="text-xs text-muted-foreground">Support artisan programs</p>
            </Card>
            <Card className="p-4 bg-background">
              <p className="text-2xl font-bold text-accent mb-2">10%</p>
              <p className="text-sm font-semibold mb-1">Platform</p>
              <p className="text-xs text-muted-foreground">App sustainability</p>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center py-16 bg-muted/30 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Auctions Coming Soon</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            We're preparing exclusive auctions with limited-edition pieces from our featured artisans. Be the first to
            know when auctions launch!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop">
              <Button className="bg-primary hover:bg-secondary">Browse Shop in the Meantime</Button>
            </Link>
            <Link href="/feed">
              <Button variant="outline" className="bg-transparent">
                Follow Artisans on Feed
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
