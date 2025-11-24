"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Users, TrendingUp, ArrowUpRight, ArrowDownLeft, Target, Gift } from "lucide-react"
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function DonationPage() {
  // Weekly donation data for chart
  const weeklyData = [
    { day: "S", value: 12000 },
    { day: "M", value: 15000 },
    { day: "T", value: 18000 },
    { day: "W", value: 22000 },
    { day: "T", value: 19000 },
    { day: "F", value: 25000 },
    { day: "S", value: 28000 },
  ]

  // Category breakdown
  const categoryData = [
    { name: "Artisan Aid", value: 35, color: "#c8a97e", amount: "₱245,000" },
    { name: "Training Programs", value: 40, color: "#8b6f47", amount: "₱280,000" },
    { name: "Disaster Response", value: 25, color: "#d4b896", amount: "₱175,000" },
  ]

  // Recent donations/distributions
  const recentDonations = [
    {
      type: "distribution",
      title: "Weaving Skills Workshop",
      category: "Training Programs",
      amount: "₱45,000",
      date: "Dec 15, 2024",
      status: "Delivered",
      artisans: "25 artisans",
    },
    {
      type: "distribution",
      title: "Emergency Relief - Flood Victims",
      category: "Disaster Response",
      amount: "₱50,000",
      date: "Dec 10, 2024",
      status: "Delivered",
      families: "100 families",
    },
    {
      type: "distribution",
      title: "Equipment Support - Pottery Studio",
      category: "Artisan Aid",
      amount: "₱30,000",
      date: "Dec 5, 2024",
      status: "Delivered",
      artisans: "8 artisans",
    },
    {
      type: "collection",
      title: "Weekly Purchases",
      category: "Platform Revenue",
      amount: "₱72,500",
      date: "Dec 18, 2024",
      status: "Collected",
      transactions: "1,450 sales",
    },
  ]

  // Impact stats
  const impactStats = [
    { icon: Users, label: "Artisans Supported", value: "240+", change: "+15%" },
    { icon: Gift, label: "Total Donated", value: "₱700K+", change: "+32%" },
    { icon: TrendingUp, label: "Lives Impacted", value: "1,200+", change: "+45%" },
    { icon: Target, label: "Programs Active", value: "12", change: "+3" },
  ]

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="text-primary hover:underline mb-6 inline-block text-sm">
            ← Back to Home
          </Link>
          <div className="mb-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Community Fund Transparency</h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">Every purchase supports Filipino artisans and communities</p>
          </div>
        </div>

        {/* Total Donations Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <Card className="lg:col-span-2 p-4 sm:p-8 bg-gradient-to-br from-primary/10 to-secondary/10">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-muted-foreground text-sm font-medium mb-2">Total Donations Collected</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground">₱700,000</h2>
                <p className="text-xs sm:text-sm text-green-600 mt-2 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  +12.5% from last month
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Monthly Goal</p>
                <p className="text-xl sm:text-2xl font-bold text-secondary">₱500K</p>
                <p className="text-xs sm:text-xs text-muted-foreground mt-1">140% achieved</p>
              </div>
            </div>

            {/* Weekly Chart */}
            <div className="h-40 sm:h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                  <XAxis dataKey="day" stroke="rgba(0,0,0,0.5)" />
                  <YAxis stroke="rgba(0,0,0,0.5)" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#f5f1ec", border: "1px solid #c8a97e" }}
                    formatter={(value) => `₱${value.toLocaleString()}`}
                  />
                  <Bar dataKey="value" fill="#c8a97e" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Goal Progress */}
          <Card className="p-4 sm:p-8">
            <h3 className="font-semibold mb-6 flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              2024 Goal
            </h3>
            <div className="text-center mb-6">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto mb-4">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#eaddc8" strokeWidth="6" />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#c8a97e"
                    strokeWidth="6"
                    strokeDasharray={`${45 * 2 * Math.PI * 0.7} ${45 * 2 * Math.PI}`}
                    strokeLinecap="round"
                    style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-xl sm:text-2xl font-bold">70%</p>
                  <p className="text-xs text-muted-foreground">Progress</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-1">₱7M of ₱10M</p>
              <p className="text-xs font-medium">₱3M left to reach goal</p>
            </div>
          </Card>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {impactStats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <Card key={idx} className="p-6 hover:shadow-md transition">
                <Icon className="w-8 h-8 text-primary mb-3" />
                <p className="text-xl sm:text-2xl font-bold mb-1">{stat.value}</p>
                <p className="text-xs sm:text-xs text-muted-foreground mb-2">{stat.label}</p>
                <p className="text-xs text-green-600 font-medium">{stat.change}</p>
              </Card>
            )
          })}
        </div>

        {/* Category Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <Card className="lg:col-span-2 p-4 sm:p-8">
            <h2 className="text-2xl font-bold mb-6">Donation Breakdown by Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {categoryData.map((cat, idx) => (
                <div key={idx} className="p-3 sm:p-4 rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                      <h3 className="font-semibold text-sm">{cat.name}</h3>
                    </div>
                    <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">{cat.value}%</span>
                  </div>
                  <p className="text-base sm:text-lg font-bold mb-1">{cat.amount}</p>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{ width: `${cat.value}%`, backgroundColor: cat.color }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Pie Chart */}
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} dataKey="value">
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Category Details */}
          <div className="space-y-4">
            <Card className="p-6 bg-blue-50 border-blue-200">
              <h3 className="font-semibold mb-2 text-blue-900">Training Programs</h3>
              <p className="text-sm text-blue-800 mb-4">
                Workshops and skill development to help artisans improve their craft and business acumen.
              </p>
              <div className="text-2xl font-bold text-blue-900">40%</div>
              <p className="text-xs text-blue-700 mt-1">₱280,000</p>
            </Card>

            <Card className="p-6 bg-orange-50 border-orange-200">
              <h3 className="font-semibold mb-2 text-orange-900">Artisan Aid</h3>
              <p className="text-sm text-orange-800 mb-4">
                Direct financial support and equipment for artisans in need.
              </p>
              <div className="text-2xl font-bold text-orange-900">35%</div>
              <p className="text-xs text-orange-700 mt-1">₱245,000</p>
            </Card>

            <Card className="p-6 bg-red-50 border-red-200">
              <h3 className="font-semibold mb-2 text-red-900">Disaster Response</h3>
              <p className="text-sm text-red-800 mb-4">Emergency relief for artisans affected by natural disasters.</p>
              <div className="text-2xl font-bold text-red-900">25%</div>
              <p className="text-xs text-red-700 mt-1">₱175,000</p>
            </Card>
          </div>
        </div>

        {/* Recent Donations & Distributions */}
        <Card className="p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">Recent Donations & Distributions</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Activity</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Category</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentDonations.map((donation, idx) => (
                  <tr key={idx} className="border-b border-border hover:bg-muted/30 transition">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            donation.type === "distribution" ? "bg-orange-100" : "bg-green-100"
                          }`}
                        >
                          {donation.type === "distribution" ? (
                            <ArrowDownLeft
                              className={`w-5 h-5 ${donation.type === "distribution" ? "text-orange-600" : "text-green-600"}`}
                            />
                          ) : (
                            <ArrowUpRight className="w-5 h-5 text-green-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold">{donation.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {donation.artisans || donation.families || donation.transactions}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">{donation.category}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`font-semibold ${donation.type === "distribution" ? "text-orange-600" : "text-green-600"}`}
                      >
                        {donation.type === "distribution" ? "-" : "+"}
                        {donation.amount}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">{donation.date}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          donation.status === "Delivered" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {donation.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* How It Works */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">How Community Donations Work</h2>
            <div className="space-y-4">
              {[
                { num: "1", title: "You Shop", desc: "Every product purchased from UBRA" },
                { num: "2", title: "We Calculate", desc: "20% of auction sales goes to community fund" },
                { num: "3", title: "We Allocate", desc: "Funds distributed to three main categories" },
                { num: "4", title: "Impact Grows", desc: "Artisans thrive, communities flourish" },
              ].map((step, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Card className="p-8 bg-gradient-to-br from-secondary/10 to-primary/10 border border-primary/20">
            <h3 className="text-xl font-bold mb-4">Our Commitment</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>100% transparent fund allocation</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Monthly public reports on distributions</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Direct impact on artisan communities</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Zero administrative overhead</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Community-driven decision making</span>
              </li>
            </ul>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-amane-dark rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-4 text-foreground">Join the Artisan Movement</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Every purchase directly supports Filipino artisans and their communities. Shop handmade, impact lives, and
            build a sustainable future for traditional craftsmanship.
          </p>
          <Link href="/shop">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
              Shop & Make an Impact
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
