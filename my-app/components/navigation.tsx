"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ShoppingBag, Heart, User } from "lucide-react"
import { useApp } from "@/lib/context"
import { usePathname } from "next/navigation"

export function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { cart, favorites } = useApp()
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const favoritesCount = favorites?.length ?? 0

  // Close mobile menu whenever the route changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Hide entire nav on Home page because home uses its own nav
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
            {[
              { href: "/feed", label: "Feed" },
              { href: "/shop", label: "Shop" },
              { href: "/museum", label: "Museum" },
              { href: "/auction", label: "Auction" },
              { href: "/donation", label: "Donation" },
            ].map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href))
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    `relative px-1 py-1 text-sm font-medium transition ${
                      isActive
                        ? "text-[#8B6F47] after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-full after:bg-gradient-to-r after:from-[#8B6F47] after:to-[#A0826D]"
                        : "text-foreground hover:text-primary"
                    }`
                  }
                >
                  {item.label}
                </Link>
              )
            })}
          </div>

          {/* Cart */}
          <div className="flex items-center gap-4">
            {/* Favorites */}
            <Link href="/favorites" className="relative">
              <Heart className="w-6 h-6" />
              {favoritesCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative">
              <ShoppingBag className="w-6 h-6" />

              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Profile */}
            <Link href="/profile" className="relative">
              <User className="w-6 h-6" />
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
            {[
              { href: "/feed", label: "Feed" },
              { href: "/shop", label: "Shop" },
              { href: "/museum", label: "Museum" },
              { href: "/auction", label: "Auction" },
              { href: "/donation", label: "Donation" },
            ].map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href))
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={
                    `block px-2 py-2 rounded-md transition ${
                      isActive ? "text-[#8B6F47] bg-card/40" : "text-foreground hover:text-primary"
                    }`
                  }
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </nav>
  )
}
