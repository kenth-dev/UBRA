"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Users, ShoppingBag, Palette, Gavel, Heart, Zap } from "lucide-react"

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const features = [
    {
      icon: Users,
      title: "Social Feed",
      description: "Connect with artisans through posts and stories",
      href: "/feed",
    },
    {
      icon: ShoppingBag,
      title: "Shop",
      description: "Browse and buy handmade products directly from artisans",
      href: "/shop",
    },
    {
      icon: Palette,
      title: "Artisan Museum",
      description: "Discover the stories and cultural heritage behind each craft",
      href: "/museum",
    },
    {
      icon: Gavel,
      title: "Auction Feature",
      description: "Bid on exclusive and limited-edition artisan pieces",
      href: "/auction",
    },
    {
      icon: Heart,
      title: "Community Donation",
      description: "Support a cause with every purchase you make",
      href: "/donation",
    },
  ]

  const models = [
    {
      title: "One-for-One Model",
      description: "Auctions distribute 70% to artisans, 15% to community donations, and 15% to platform sustainability.",
    },
    {
      title: "Advertising Model",
      description: "Optional paid promotional services to boost visibility and market reach",
    },
    {
      title: "Commission-Based Model",
      description:
        "10% commission on marketplace sales funds platform operations — an additional 5% of each sale is donated to community programs.",
    },
  ]

  const team = [
    { name: "Kenneth Gasmen", role: "CEO / Full Stack Developer", image: "/team/kenneth-gasmen.png" },
    { name: "Jomer Ignacio", role: "CTO / Full Stack Developer", image: "/team/jomer-ignacio.png" },
    { name: "Bill Richmond Udarbe", role: "CMO / Marketing", image: "/team/bill-richmond-udarbe.png" },
    { name: "Sander Sedano", role: "Adviser / Mentor", image: "/team/sander-sedano.png" },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/95 backdrop-blur shadow-sm border-b border-muted" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo-ubra.png" alt="UBRA Logo" width={90} height={90} />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8">
              <a href="#features" className="hover:text-primary transition">
                Features
              </a>
              <a href="#business" className="hover:text-primary transition">
                Business
              </a>
              <a href="#team" className="hover:text-primary transition">
                Team
              </a>
              <a href="#footer" className="hover:text-primary transition">
                Contact
              </a>
            </div>

            {/* CTA Button */}
            <div className="hidden sm:block">
              <Link href="/shop">
                <Button className="bg-primary hover:bg-secondary text-primary-foreground">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 gradient-amane-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-muted/10 to-transparent pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block mb-6 px-3 py-1.5 bg-muted rounded-full text-xs sm:text-sm font-medium text-secondary">
            Empowering Filipino Artisans
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 leading-tight text-balance">
            Made with Hands, <span className="text-primary">Priced with Heart.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed text-balance max-w-2xl mx-auto">
            UBRA connects and empowers Filipino artisans through a community-driven online marketplace. Support local
            talent. Celebrate handmade craftsmanship.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link href="/shop">
              <Button
                size="lg"
                className="bg-primary hover:bg-secondary text-primary-foreground text-sm sm:text-base h-10 sm:h-12 transition-all hover:shadow-lg hover:scale-105"
              >
                Shop Now
              </Button>
            </Link>
            <a href="#features">
            </a>
          </div>
        </div>

        {/* Decorative element */}
        <div className="absolute top-20 right-10 w-20 h-20 bg-primary/10 rounded-full blur-2xl" />
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-muted/10 rounded-full blur-3xl" />
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">What You'll Find on UBRA</h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Everything you need to discover, support, and celebrate artisan craftsmanship
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <Link key={idx} href={feature.href}>
                  <Card className="p-6 border-muted hover:shadow-lg hover:border-primary transition-all duration-300 hover:scale-105 cursor-pointer bg-background h-full">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mb-4">
                      <Icon size={24} className="text-secondary" />
                    </div>
                    <h3 className="font-semibold text-base sm:text-lg mb-2">{feature.title}</h3>
                    <p className="text-sm sm:text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Business Model Section */}
      <section id="business" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 texture-woven">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Sustainable by Design</h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Multiple revenue models ensure artisans thrive and the platform grows responsibly
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {models.map((model, idx) => (
              <div key={idx} className="p-8 bg-card rounded-xl border border-muted hover:border-primary transition-all">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap size={24} className="text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3">{model.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{model.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-base sm:text-lg text-muted-foreground">Passionate builders dedicated to empowering artisans</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="text-center">
                <div className="w-20 h-20 sm:w-32 sm:h-32 mx-auto mb-4 rounded-full overflow-hidden shadow-lg border-4 border-primary/20">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-base sm:text-lg mb-1">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-t from-[#dcccae] via-[#e4d4b8] py-16 sm:py-20 text-center text-[#5c3a21]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-secondary">Ready to Support Artisans?</h2>
          <p className="text-base sm:text-lg text-secondary/90 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Join the movement to celebrate and empower Filipino artisans. Your support makes a difference.
          </p>
          <Link href="/shop">
            <Button
              size="lg"
              className="bg-primary hover:bg-accent text-secondary font-semibold h-12 text-base transition-all hover:shadow-lg"
            >
              Start Exploring
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="bg-gradient-to-t from-[#5c3a21] via-[#b58a60] to-[#dcccae] text-white py-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Link href="/">
                                <Image src="/logo-ubra.png" alt="UBRA Logo" width={90} height={90} />
                </Link>
              </div>
              <p className="text-sm text-primary-foreground/80">Handmade. Heart-made. Community-driven.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-primary transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/shop" className="hover:text-primary transition">
                    Shop
                  </Link>
                </li>
                <li>
                  <Link href="/feed" className="hover:text-primary transition">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="/museum" className="hover:text-primary transition">
                    Museum
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-primary/20 pt-8">
            <p className="text-center text-sm text-primary-foreground/70">
              © 2025 UBRA. All rights reserved. Made with ❤️ for Filipino artisans.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
