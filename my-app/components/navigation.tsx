"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ShoppingBag } from "lucide-react"
import { useApp } from "@/lib/context"
import { usePathname } from "next/navigation"

export function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { cart } = useApp()
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  // ❗ Hide entire nav on Home page because home uses its own nav
  if (pathname === "/") {
    return null
  }

  return (
    <nav className="fixed w-full top-0 z-50 bg-background/95 backdrop-blur shadow-sm border-b border-muted">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo-ubra.png" alt="UBRA Logo" width={90} height={90} />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            <Link href="/" className="hover:text-primary transition">
              Home
            </Link>
            <Link href="/feed" className="hover:text-primary transition">
              Feed
            </Link>
            <Link href="/shop" className="hover:text-primary transition">
              Shop
            </Link>
            <Link href="/museum" className="hover:text-primary transition">
              Museum
            </Link>
            <Link href="/auction" className="hover:text-primary transition">
              Auction
            </Link>
          </div>

          {/* Cart */}
          <div className="flex items-center gap-4">
            <Link href="/cart" className="relative">
              <ShoppingBag className="w-6 h-6" />

              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-muted pt-4 space-y-3">
            <Link href="/" className="block hover:text-primary transition">
              Home
            </Link>
            <Link href="/feed" className="block hover:text-primary transition">
              Feed
            </Link>
            <Link href="/shop" className="block hover:text-primary transition">
              Shop
            </Link>
            <Link href="/museum" className="block hover:text-primary transition">
              Museum
            </Link>
            <Link href="/auction" className="block hover:text-primary transition">
              Auction
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
