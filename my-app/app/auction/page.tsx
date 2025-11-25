"use client"

import { useState } from "react"
import { AuctionHero } from "../../components/auction-hero"
import { LiveAuctions } from "../../components/live-auctions"
import { FeaturedAuction } from "../../components/featured-auction"
import { RecentlySold } from "../../components/recently-sold"
import { AuctionHistory } from "../../components/auction-history"
import { NewsletterSection } from "../../components/newsletter-section"
import { BidModal } from "../../components/bid-modal"

export interface AuctionItem {
  id: string
  title: string
  artisan: string
  artisanImage: string
  image: string
  currentBid: number
  startingBid: number
  bids: number
  timeLeft: { days: number; hours: number; minutes: number; seconds: number }
  isLimited: boolean
  edition?: string
  description: string
  category: string
}

export default function AuctionPage() {
  const [selectedItem, setSelectedItem] = useState<AuctionItem | null>(null)
  const [bidModalOpen, setBidModalOpen] = useState(false)

  const handlePlaceBid = (item: AuctionItem) => {
    setSelectedItem(item)
    setBidModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <main>
        <AuctionHero />
        <FeaturedAuction onPlaceBid={handlePlaceBid} />
        <LiveAuctions onPlaceBid={handlePlaceBid} />
        <RecentlySold />
        <AuctionHistory />
        <NewsletterSection />
      </main>
      <BidModal item={selectedItem} isOpen={bidModalOpen} onClose={() => setBidModalOpen(false)} />
    </div>
  )
}
