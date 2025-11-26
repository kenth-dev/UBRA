"use client"

import { useState } from "react"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function MuseumFooter() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setTimeout(() => {
        setEmail("")
        setSubscribed(false)
      }, 3000)
    }
  }

  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Newsletter section */}
      <div className="border-b border-border/20">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-serif text-3xl font-medium mb-3">Stay Connected to Heritage</h3>
              <p className="text-secondary-foreground/70">
                Subscribe to receive updates on new exhibits, artisan stories, and exclusive virtual events.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-background/10 border-border/20 text-secondary-foreground placeholder:text-secondary-foreground/50"
                required
              />
              <Button
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={subscribed}
              >
                {subscribed ? (
                  "Subscribed!"
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Subscribe
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <h4 className="font-serif text-xl font-medium mb-2">UBRA</h4>
            <p className="text-secondary-foreground/70 text-sm mb-4">MUSEUM</p>
            <p className="text-secondary-foreground/70 text-sm leading-relaxed mb-4">
              Preserving and celebrating Filipino artisan heritage through digital innovation.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-medium mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-secondary-foreground/70 hover:text-primary transition-colors">
                  Exhibits
                </a>
              </li>
              <li>
                <a href="#gallery" className="text-secondary-foreground/70 hover:text-primary transition-colors">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#artisans" className="text-secondary-foreground/70 hover:text-primary transition-colors">
                  Artisans
                </a>
              </li>
              <li>
                <a href="#tour" className="text-secondary-foreground/70 hover:text-primary transition-colors">
                  Virtual Tour
                </a>
              </li>
            </ul>
          </div>

          {/* UBRA Platform */}
          <div>
            <h4 className="font-medium mb-4">UBRA Platform</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/shop" className="text-secondary-foreground/70 hover:text-primary transition-colors">
                  Shop
                </a>
              </li>
              <li>
                <a href="/auction" className="text-secondary-foreground/70 hover:text-primary transition-colors">
                  Auctions
                </a>
              </li>
              <li>
                <a href="/community" className="text-secondary-foreground/70 hover:text-primary transition-colors">
                  Community Feed
                </a>
              </li>
              <li>
                <a href="/donation" className="text-secondary-foreground/70 hover:text-primary transition-colors">
                  Donate
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-medium mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-secondary-foreground/70 hover:text-primary transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-foreground/70 hover:text-primary transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-foreground/70 hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-foreground/70 hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-secondary-foreground/70">
            <p>© 2025 UBRA Museum. All rights reserved.</p>
            <p>Made with hands, priced with heart.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
