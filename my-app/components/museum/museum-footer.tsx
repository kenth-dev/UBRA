"use client"

import { useState } from "react"
import Image from "next/image"
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
    <footer className="bg-[color:var(--chart-4)] text-secondary-foreground border-t border-border/20">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8 md:mb-12">
          {/* About */}
          <div className="text-left">
            <h4 className="text-left mb-1 sm:mb-2">
              <Image src="/logo-ubra.png" alt="UBRA" width={100} height={30} className="h-6 sm:h-8 md:h-10 object-contain" />
            </h4>
            <p className="text-secondary-foreground/70 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
              Preserving Filipino artisan heritage through digital innovation.
            </p>
            <div className="flex gap-2 sm:gap-3">
              <a
                href="#"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Facebook className="h-3 w-3 sm:h-4 sm:w-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Instagram className="h-3 w-3 sm:h-4 sm:w-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Twitter className="h-3 w-3 sm:h-4 sm:w-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Youtube className="h-3 w-3 sm:h-4 sm:w-4" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-sm sm:text-base font-medium mb-2 sm:mb-3 md:mb-4">Explore</h4>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
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
            <h4 className="text-sm sm:text-base font-medium mb-2 sm:mb-3 md:mb-4">UBRA Platform</h4>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
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
            <h4 className="text-sm sm:text-base font-medium mb-2 sm:mb-3 md:mb-4">Support</h4>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
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
        <div className="pt-4 sm:pt-6 md:pt-8 border-t border-border/20">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4 text-xs sm:text-sm text-secondary-foreground/70">
            <p>© 2025 UBRA Museum. All rights reserved.</p>
            <p>Made with hands, priced with heart.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
