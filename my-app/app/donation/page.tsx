"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Heart, Users, TrendingUp } from "lucide-react"

export default function DonationPage() {
  const stats = [
    { icon: Users, label: "Artisans Supported", value: "150+" },
    { icon: Heart, label: "Community Donations", value: "₱500K+" },
    { icon: TrendingUp, label: "Lives Impacted", value: "500+" },
  ]

  const initiatives = [
    {
      title: "Artisan Skills Training",
      description: "Funding workshops and training programs to help artisans improve their craft and business skills.",
      progress: 75,
    },
    {
      title: "Equipment & Materials",
      description: "Providing quality materials and tools to help artisans create better products.",
      progress: 60,
    },
    {
      title: "Market Access Program",
      description: "Connecting artisans with new markets and opportunities to expand their reach.",
      progress: 45,
    },
  ]

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link href="/" className="text-primary hover:underline mb-6 inline-block">
          ← Back to Home
        </Link>

        <div className="mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Community Donation</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Every purchase you make supports Filipino artisans. A portion of each sale goes directly to community
            initiatives that help artisans thrive.
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <Card key={idx} className="p-6 text-center">
                <Icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
              </Card>
            )
          })}
        </div>

        {/* How It Works */}
        <div className="mb-16 bg-card border border-muted rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">How Community Donation Works</h2>
          <p className="text-muted-foreground mb-8">
            When you shop on UBRA, a percentage of your purchase automatically goes to our community donation fund.
          </p>

          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-sm font-bold text-primary">1</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">You Make a Purchase</h3>
                <p className="text-sm text-muted-foreground">Every transaction on UBRA supports our initiatives</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-sm font-bold text-primary">2</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Funds Allocated</h3>
                <p className="text-sm text-muted-foreground">5% of each purchase goes to the community fund</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-sm font-bold text-primary">3</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Projects Funded</h3>
                <p className="text-sm text-muted-foreground">
                  Donations support training, equipment, and market access programs
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-sm font-bold text-primary">4</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Impact Created</h3>
                <p className="text-sm text-muted-foreground">Artisans grow, communities flourish, lives improve</p>
              </div>
            </div>
          </div>
        </div>

        {/* Active Initiatives */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Active Initiatives</h2>

          <div className="grid grid-cols-1 gap-6">
            {initiatives.map((initiative, idx) => (
              <Card key={idx} className="p-6 hover:shadow-lg transition">
                <h3 className="font-semibold text-lg mb-2">{initiative.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{initiative.description}</p>

                <div className="mb-2 flex justify-between text-sm">
                  <span>Progress</span>
                  <span className="font-semibold">{initiative.progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${initiative.progress}%` }}
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Join Movement */}
        <div className="bg-gradient-to-r from-secondary to-secondary/90 rounded-lg p-12 text-center text-primary-foreground">
          <h2 className="text-3xl font-bold mb-4">Join the Movement</h2>
          <p className="text-lg mb-8 max-w-xl mx-auto">
            Support Filipino artisans with every purchase. Together, we're building a sustainable future for handmade
            craftsmanship.
          </p>
          <Link href="/shop">
            <Button
              size="lg"
              className="bg-primary hover:bg-accent text-secondary font-semibold h-12 text-base transition-all hover:shadow-lg"
            >
              Shop & Support Artisans
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
