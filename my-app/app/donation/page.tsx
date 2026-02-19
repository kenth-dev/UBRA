"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Users, TrendingUp, ArrowUpRight, ArrowDownLeft, Target, Gift } from "lucide-react"
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { donations } from "@/lib/donations"
import { businessModel } from "@/lib/businessModel"
import { MuseumFooter } from "@/components/museum/museum-footer"

export default function DonationPage() {
  const weeklyData = [
    { day: "S", value: 12000 },
    { day: "M", value: 15000 },
    { day: "T", value: 18000 },
    { day: "W", value: 22000 },
    { day: "T", value: 19000 },
    { day: "F", value: 25000 },
    { day: "S", value: 28000 },
  ]

  // Category breakdown (expanded to 7 categories). Amounts computed from donations.totalCollected
  const rawCategories = [
    { name: "Artisan Aid", value: 25, color: "#c8a97e" },
    { name: "Training Programs", value: 30, color: "#8b6f47" },
    { name: "Disaster Response", value: 15, color: "#d4b896" },
    { name: "Community Events", value: 10, color: "#b0855b" },
    { name: "Other Initiatives", value: 5, color: "#a1866f" },]

  const categoryData = rawCategories.map((c) => ({
    ...c,
    amount: `₱${Math.round((donations.totalCollected * c.value) / 100).toLocaleString()}`,
  }))

  // Recent donations/distributions (dates updated to 2025; amounts are 6-digit pesos)
  const recentDonations = [
    {
      type: "distribution",
      title: "Weaving Skills Workshop",
      category: "Training Programs",
      amount: "₱145,000",
      date: "Oct 15, 2025",
      status: "Delivered",
      artisans: "25 artisans",
    },
    {
      type: "distribution",
      title: "Emergency Relief - Flood Victims",
      category: "Disaster Response",
      amount: "₱150,000",
      date: "June 10, 2025",
      status: "Delivered",
      families: "100 families",
    },
    {
      type: "distribution",
      title: "Equipment Support - Pottery Studio",
      category: "Artisan Aid",
      amount: "₱130,000",
      date: "May 5, 2025",
      status: "Delivered",
      artisans: "8 artisans",
    },
    {
      type: "collection",
      title: "Weekly Purchases",
      category: "Platform Revenue",
      amount: "₱172,500",
      date: "Feb 18, 2025",
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

  const percent = Math.round((donations.totalCollected / donations.goal) * 100)

  return (
    <div className="min-h-screen bg-background pt-20 flex flex-col">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 flex-1">
        {/* Header */}
        <div className="mb-1">
          <Link href="/" className="text-primary hover:underline mb-6 inline-block text-sm">
            ← Back to Home
          </Link>
        </div>

        {/* Page title + top summary (added) */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">Community Fund Transparency</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2">Every purchase supports Filipino artisans and communities</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <Card className="lg:col-span-2 p-4 sm:p-6 lg:p-8 rounded-lg border border-border bg-[#f6f1ea]">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <p className="text-xs sm:text-sm text-muted-foreground">Total Donations Collected</p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-1 sm:mt-2">
                  <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-none">
                    <span className="text-lg sm:text-xl md:text-2xl align-top mr-1">₱</span>
                    {donations.totalCollected.toLocaleString()}
                  </p>
                  <p className="text-xs sm:text-sm text-green-600 font-medium">↗ +12.5% from last month</p>
                </div>
              </div>

              <div className="w-24 sm:w-32 lg:w-40 text-right hidden md:block">
                <p className="text-xs sm:text-sm text-muted-foreground">Goal</p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold">₱{donations.goal.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-1">{percent}% achieved</p>
              </div>
            </div>

            <div className="mt-4 sm:mt-6 h-32 sm:h-40 md:h-48 rounded-md overflow-hidden">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData} margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                  <XAxis dataKey="day" stroke="rgba(0,0,0,0.5)" tick={{ fontSize: 12 }} />
                  <YAxis stroke="rgba(0,0,0,0.5)" tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#f6f1ea", border: "1px solid #e1cfb7", fontSize: 12 }}
                    formatter={(value) => `₱${value.toLocaleString()}`}
                  />
                  <Bar dataKey="value" fill="#c8a97e" radius={[10, 10, 6, 6]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Goal Progress */}
          <Card className="p-3 sm:p-4 md:p-6 lg:p-8">
            <h3 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4 md:mb-6 flex items-center gap-2">
              <Target className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              2025 Goal
            </h3>
            <div className="text-center mb-3 sm:mb-4 md:mb-6">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto mb-3 sm:mb-4">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#eaddc8" strokeWidth="6" />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#c8a97e"
                    strokeWidth="6"
                    strokeDasharray={`${45 * 2 * Math.PI * (percent / 100)} ${45 * 2 * Math.PI}`}
                    strokeLinecap="round"
                    style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-lg sm:text-xl md:text-2xl font-bold">{percent}%</p>
                  <p className="text-xs text-muted-foreground">Progress</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mb-1">₱{donations.totalCollected.toLocaleString()} of ₱{donations.goal.toLocaleString()}</p>
              <p className="text-xs font-medium">₱{(donations.goal - donations.totalCollected).toLocaleString()} left to reach goal</p>
            </div>
          </Card>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-6 md:mb-8">
          {impactStats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <Card key={idx} className="p-3 sm:p-4 md:p-6 hover:shadow-md transition">
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-primary mb-2 sm:mb-3" />
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-1">{stat.value}</p>
                <p className="text-xs text-muted-foreground mb-1 sm:mb-2">{stat.label}</p>
                <p className="text-xs text-green-600 font-medium">{stat.change}</p>
              </Card>
            )
          })}
        </div>

        {/* Category Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 md:mb-10">
          <Card className="lg:col-span-2 p-3 sm:p-4 md:p-6 lg:p-8">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 md:mb-6">Donation Breakdown by Category</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8">
              {categoryData.map((cat, idx) => (
                <div key={idx} className="p-2 sm:p-3 md:p-4 rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-1 sm:mb-2">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                      <h3 className="font-semibold text-xs sm:text-sm">{cat.name}</h3>
                    </div>
                    <span className="text-xs font-bold text-primary bg-primary/10 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">{cat.value}%</span>
                  </div>
                  <p className="text-sm sm:text-base md:text-lg font-bold mb-1">{cat.amount}</p>
                  <div className="w-full bg-muted rounded-full h-1.5 sm:h-2">
                    <div
                      className="h-1.5 sm:h-2 rounded-full transition-all"
                      style={{ width: `${cat.value}%`, backgroundColor: cat.color }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Pie Chart */}
            <div className="h-32 sm:h-40 md:h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} dataKey="value">
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} contentStyle={{ fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Category Details */}
          <div className="space-y-2 sm:space-y-3 md:space-y-4">
            <Card className="p-3 sm:p-4 md:p-6 bg-blue-50 border-blue-200">
              <h3 className="text-sm sm:text-base font-semibold mb-1 sm:mb-2 text-blue-900">Training Programs</h3>
              <p className="text-xs sm:text-sm text-blue-800 mb-2 sm:mb-3 md:mb-4">
                Workshops and skill development to help artisans improve their craft and business acumen.
              </p>
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-blue-900">40%</div>
              <p className="text-xs text-blue-700 mt-1">₱280,000</p>
            </Card>

            <Card className="p-3 sm:p-4 md:p-6 bg-orange-50 border-orange-200">
              <h3 className="text-sm sm:text-base font-semibold mb-1 sm:mb-2 text-orange-900">Artisan Aid</h3>
              <p className="text-xs sm:text-sm text-orange-800 mb-2 sm:mb-3 md:mb-4">
                Direct financial support and equipment for artisans in need.
              </p>
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-orange-900">35%</div>
              <p className="text-xs text-orange-700 mt-1">₱245,000</p>
            </Card>

            <Card className="p-3 sm:p-4 md:p-6 bg-red-50 border-red-200">
              <h3 className="text-sm sm:text-base font-semibold mb-1 sm:mb-2 text-red-900">Disaster Response</h3>
              <p className="text-xs sm:text-sm text-red-800 mb-2 sm:mb-3 md:mb-4">Emergency relief for artisans affected by natural disasters.</p>
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-red-900">25%</div>
              <p className="text-xs text-red-700 mt-1">₱175,000</p>
            </Card>
          </div>
        </div>

        {/* Recent Donations & Distributions */}
        <Card className="p-3 sm:p-4 md:p-6 lg:p-8 mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 md:mb-6">Recent Donations & Distributions</h2>
          <div className="overflow-x-auto -mx-3 sm:mx-0">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold text-muted-foreground">Activity</th>
                  <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold text-muted-foreground hidden md:table-cell">Category</th>
                  <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold text-muted-foreground">Amount</th>
                  <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold text-muted-foreground hidden sm:table-cell">Date</th>
                  <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold text-muted-foreground hidden lg:table-cell">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentDonations.map((donation, idx) => (
                  <tr key={idx} className="border-b border-border hover:bg-muted/30 transition">
                    <td className="py-2 sm:py-3 md:py-4 px-2 sm:px-4">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div
                          className={`w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center ${
                            donation.type === "distribution" ? "bg-orange-100" : "bg-green-100"
                          }`}
                        >
                          {donation.type === "distribution" ? (
                            <ArrowDownLeft
                              className={`w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 ${donation.type === "distribution" ? "text-orange-600" : "text-green-600"}`}
                            />
                          ) : (
                            <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-green-600" />
                          )}
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm font-semibold">{donation.title}</p>
                          <p className="text-xs text-muted-foreground hidden sm:block">
                            {donation.artisans || donation.families || donation.transactions}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 sm:py-3 md:py-4 px-2 sm:px-4 text-muted-foreground hidden md:table-cell">{donation.category}</td>
                    <td className="py-2 sm:py-3 md:py-4 px-2 sm:px-4">
                      <span
                        className={`text-xs sm:text-sm font-semibold ${donation.type === "distribution" ? "text-orange-600" : "text-green-600"}`}
                      >
                        {donation.type === "distribution" ? "-" : "+"}
                        {donation.amount}
                      </span>
                    </td>
                    <td className="py-2 sm:py-3 md:py-4 px-2 sm:px-4 text-muted-foreground hidden sm:table-cell">{donation.date}</td>
                    <td className="py-2 sm:py-3 md:py-4 px-2 sm:px-4 hidden lg:table-cell">
                      <span
                        className={`inline-block px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-medium ${
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8 md:mb-12">
          <div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 md:mb-6">How Community Donations Work</h2>
            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              {[
                { num: "1", title: "You Shop", desc: "Every product purchased from UBRA" },
                {
                  num: "2",
                  title: "We Calculate",
                  desc: `Auctions: ${businessModel.auction.artisanPercent}% to artisans, ${businessModel.auction.donationPercent}% to community donations, ${businessModel.auction.platformPercent}% to platform. Marketplace: ${businessModel.marketplace.donationPercent}% of each sale is donated (platform commission ${businessModel.marketplace.commissionPercent}%).`,
                },
                { num: "3", title: "We Allocate", desc: "Funds distributed to three main categories" },
                { num: "4", title: "Impact Grows", desc: "Artisans thrive, communities flourish" },
              ].map((step, idx) => (
                <div key={idx} className="flex gap-2 sm:gap-3 md:gap-4">
                  <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs sm:text-sm">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-foreground">{step.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Card className="p-4 sm:p-6 md:p-8 bg-gradient-to-br from-secondary/10 to-primary/10 border border-primary/20">
            <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 md:mb-4">Our Commitment</h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
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

        </div>
      <MuseumFooter />
    </div>
  )
}
