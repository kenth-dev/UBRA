"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Users, TrendingUp, AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import Image from "next/image"
import { toAuctionPath } from "@/components/auction-image"
import type { AuctionItem } from "@/app/auction/page"

interface Props {
  item: AuctionItem | null
  isOpen: boolean
  onClose: () => void
}

const recentBids = [
  { user: "Maria***", amount: 46000, time: "2 min ago" },
  { user: "Juan***", amount: 45500, time: "5 min ago" },
  { user: "Ana***", amount: 45000, time: "8 min ago" },
]

export function BidModal({ item, isOpen, onClose }: Props) {
  const [bidAmount, setBidAmount] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bidSuccess, setBidSuccess] = useState(false)
  const [error, setError] = useState("")

  const minBid = item ? item.currentBid + 500 : 0

  useEffect(() => {
    if (item) {
      setBidAmount(String(minBid))
    }
    setBidSuccess(false)
    setError("")
  }, [item, minBid])

  const handleSubmit = async () => {
    if (!item) return

    const amount = Number.parseInt(bidAmount)
    if (amount < minBid) {
      setError(`Minimum bid is ₱${minBid.toLocaleString()}`)
      return
    }

    setIsSubmitting(true)
    setError("")

    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setBidSuccess(true)

    setTimeout(() => {
      onClose()
      setBidSuccess(false)
    }, 2000)
  }

  const quickBids = [minBid, minBid + 500, minBid + 1000, minBid + 2000]

  if (!item) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">Place Your Bid</DialogTitle>
        </DialogHeader>

        {bidSuccess ? (
          <div className="py-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Bid Placed Successfully!</h3>
            <p className="text-muted-foreground">
              Your bid of ₱{Number.parseInt(bidAmount).toLocaleString()} has been placed.
            </p>
          </div>
        ) : (
          <>
            <div className="flex gap-4 p-4 bg-muted rounded-lg">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <Image src={toAuctionPath(item.image || "/placeholder.svg")} alt={item.title} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-foreground line-clamp-1">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.artisan}</p>
                <div className="flex items-center gap-3 mt-2">
                  <Badge variant="outline" className="text-xs">
                    {item.edition}
                  </Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {item.bids} bids
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Current Bid</p>
                <p className="text-2xl font-bold text-primary">₱{item.currentBid.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Minimum Bid</p>
                <p className="text-2xl font-bold text-foreground">₱{minBid.toLocaleString()}</p>
              </div>
            </div>

            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">Recent Bids</span>
                <span className="ml-auto flex items-center gap-1 text-xs text-green-600">
                  <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  Live
                </span>
              </div>
              <div className="space-y-2">
                {recentBids.map((bid, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{bid.user}</span>
                    <span className="font-medium text-foreground">₱{bid.amount.toLocaleString()}</span>
                    <span className="text-xs text-muted-foreground">{bid.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Your Bid Amount</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₱</span>
                <Input
                  type="number"
                  value={bidAmount}
                  onChange={(e) => {
                    setBidAmount(e.target.value)
                    setError("")
                  }}
                  className="pl-8 text-lg font-semibold h-12"
                  min={minBid}
                  step={100}
                />
              </div>
              {error && (
                <p className="text-sm text-destructive mt-2 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {quickBids.map((amount) => (
                <Button
                  key={amount}
                  variant="outline"
                  size="sm"
                  className={`flex-1 min-w-[80px] ${
                    Number.parseInt(bidAmount) === amount ? "border-primary bg-primary/10 text-primary" : ""
                  }`}
                  onClick={() => setBidAmount(String(amount))}
                >
                  ₱{amount.toLocaleString()}
                </Button>
              ))}
            </div>

            <Button
              className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 text-lg font-semibold"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Placing Bid...
                </>
              ) : (
                `Confirm Bid - ₱${Number.parseInt(bidAmount || "0").toLocaleString()}`
              )}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              By placing a bid, you agree to our auction terms and conditions. All bids are final and binding.
            </p>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
