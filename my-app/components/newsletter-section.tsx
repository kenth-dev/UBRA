"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Bell, CheckCircle } from "lucide-react"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setTimeout(() => setSubscribed(false), 3000)
      setEmail("")
    }
  }

  return (
    <section className="py-20 bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-6">
            <Bell className="h-8 w-8 text-primary" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">Never Miss an Auction</h2>
          <p className="text-secondary-foreground/80 mb-8">
            Subscribe to get notified about new limited edition pieces, upcoming auctions, and exclusive artisan
            collections straight to your inbox.
          </p>

          {subscribed ? (
            <div className="flex items-center justify-center gap-2 text-green-400">
              <CheckCircle className="h-5 w-5" />
              <span>Thank you for subscribing!</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-card text-card-foreground border-border h-12"
                  required
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8"
              >
                Subscribe
              </Button>
            </form>
          )}

          <p className="text-xs text-secondary-foreground/60 mt-4">
            By subscribing, you agree to receive our newsletter. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  )
}
