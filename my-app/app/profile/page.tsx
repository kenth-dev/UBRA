"use client"

import { useState, useEffect } from "react"
import { useApp } from "@/lib/context"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import Link from "next/link"
import { 
  User, 
  Settings, 
  Heart, 
  Package, 
  ShoppingBag, 
  Store, 
  LogOut, 
  Edit2, 
  Save, 
  X,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  TrendingUp,
  DollarSign,
  Eye,
  Plus,
  Trash2,
  BarChart2,
  Wallet,
} from "lucide-react"

interface Product {
  id: number
  artisanId: number
  name: string
  price: number
  image: string
  description: string
  category: string
  rating?: number
  reviews?: number
  discount?: number
}

export default function ProfilePage() {
  const { user, isAuthenticated, logout, updateProfile, orders, favorites, login, addToCart, toggleFavorite } = useApp()
  const [activeTab, setActiveTab] = useState<"profile" | "orders" | "wishlist" | "shop" | "products" | "settings">("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState<any>(user || {})
  const [showLoginModal, setShowLoginModal] = useState(!isAuthenticated)
  const [loginData, setLoginData] = useState({ email: "", password: "", role: "buyer" as "buyer" | "artisan" })
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((err) => console.error("Failed to load products:", err))
  }, [])

  const wishlistProducts = products.filter((product) => favorites.includes(product.id))

  const handleLogin = async () => {
    const success = await login(loginData.email, loginData.password, loginData.role)
    if (success) {
      setShowLoginModal(false)
    }
  }

  const handleSaveProfile = () => {
    updateProfile(editedProfile)
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditedProfile(user || {})
    setIsEditing(false)
  }

  const handleLogout = () => {
    logout()
    setShowLoginModal(true)
  }

  // Mock products for artisan
  const artisanProducts = [
    { id: 1, name: "Abaca Wall Hanging", price: 2500, stock: 12, views: 234, sales: 45, image: "/images/shop/abaca_wall_hanging.jpg" },
    { id: 2, name: "Ceramic Tea Set", price: 1200, stock: 8, views: 189, sales: 32, image: "/images/shop/ceramic_tea_set.jpg" },
    { id: 3, name: "Wooden Decorative Bowl", price: 3500, stock: 5, views: 156, sales: 18, image: "/images/shop/wooden_decorative_bowl.jpeg" },
    { id: 4, name: "Abaca Tote Bag", price: 1800, stock: 15, views: 312, sales: 56, image: "/images/shop/abaca_tote_bag.jpeg" },
  ]

  const artisanStats = {
    totalSales: 95,
    totalRevenue: 185000,
    totalViews: 1247,
    activeProducts: 8,
  }

  if (showLoginModal && !isAuthenticated) {
    return (
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-3 sm:px-4 py-16 sm:py-20">
        {/* Subtle Background with Website Colors */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#fffdf9] via-[#eaddc8] to-[#dcccae]">
          {/* Woven Texture Pattern */}
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(200, 169, 126, 0.1) 2px, rgba(200, 169, 126, 0.1) 4px)`
          }}></div>
          
          {/* Subtle Floating Shapes */}
          <div className="absolute top-20 left-10 w-32 h-32 sm:w-48 sm:h-48 bg-[#c8a97e]/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 sm:w-64 sm:h-64 bg-[#5c3a21]/10 rounded-full blur-3xl"></div>
        </div>

        {/* Compact Login Card */}
        <div className="relative w-full max-w-md">
          <Card className="p-4 sm:p-5 backdrop-blur-sm bg-white/95 dark:bg-[#2b2219]/95 border-[#eaddc8] shadow-xl">
            {/* Logo/Icon */}
            <div className="text-center mb-4">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-2.5 sm:mb-3">
                {/* Animated gradient ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#c8a97e] via-[#8b6f47] to-[#5c3a21] animate-spin-slow opacity-75"></div>
                <div className="absolute inset-1 rounded-full bg-gradient-to-br from-[#eaddc8] to-white"></div>
                {/* Logo container */}
                <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center shadow-2xl border-2 border-[#eaddc8]">
                  <div className="w-full h-full p-2 sm:p-2.5">
                    <Image src="/ubra.png" alt="UBRA Logo" width={80} height={80} className="w-full h-full object-contain" />
                  </div>
                </div>
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-[#2b2b2b] dark:text-[#f5f1ec] mb-0.5">
                Welcome to UBRA
              </h1>
              <p className="text-xs text-[#5c3a21] dark:text-[#c8a97e]">Authentic Filipino Craftsmanship</p>
            </div>

            <div className="space-y-2.5 sm:space-y-3">
              {/* Account Type Selector */}
              <div>
                <label className="text-xs font-semibold mb-1 block text-[#5c3a21] dark:text-[#eaddc8]">Account Type</label>
                <div className="grid grid-cols-2 gap-2 p-1 bg-[#eaddc8]/30 rounded-lg">
                  <button
                    onClick={() => setLoginData({ ...loginData, role: "buyer" })}
                    className={`relative py-1.5 sm:py-2 px-2 rounded-md text-xs font-medium transition-all duration-300 ${
                      loginData.role === "buyer"
                        ? "bg-gradient-to-r from-[#c8a97e] to-[#8b6f47] text-white shadow-md"
                        : "text-[#5c3a21] hover:bg-[#eaddc8]/50"
                    }`}
                  >
                    <ShoppingBag className="w-3 h-3 sm:w-4 sm:h-4 mx-auto mb-0.5" />
                    <span className="text-xs">Buyer</span>
                  </button>
                  <button
                    onClick={() => setLoginData({ ...loginData, role: "artisan" })}
                    className={`relative py-1.5 sm:py-2 px-2 rounded-md text-xs font-medium transition-all duration-300 ${
                      loginData.role === "artisan"
                        ? "bg-gradient-to-r from-[#8b6f47] to-[#5c3a21] text-white shadow-md"
                        : "text-[#5c3a21] hover:bg-[#eaddc8]/50"
                    }`}
                  >
                    <Store className="w-3 h-3 sm:w-4 sm:h-4 mx-auto mb-0.5" />
                    <span className="text-xs">Artisan</span>
                  </button>
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-1">
                <label className="text-xs font-medium block text-[#5c3a21] dark:text-[#eaddc8]">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b6f47]" />
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    className="pl-8 sm:pl-9 h-9 sm:h-10 text-xs sm:text-sm bg-background/50 border-[#eaddc8] focus:border-[#c8a97e] focus:ring-[#c8a97e]"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1">
                <label className="text-xs font-medium block text-[#5c3a21] dark:text-[#eaddc8]">Password</label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  className="h-9 sm:h-10 text-xs sm:text-sm bg-background/50 border-[#eaddc8] focus:border-[#c8a97e] focus:ring-[#c8a97e]"
                />
                <div className="flex items-center justify-end pt-1">
                  <a href="#" className="text-xs text-[#c8a97e] hover:text-[#8b6f47] font-medium">
                    Forgot password?
                  </a>
                </div>
              </div>

              {/* Sign In Button */}
              <Button 
                onClick={handleLogin} 
                className="w-full h-9 sm:h-10 text-xs sm:text-sm font-semibold bg-gradient-to-r from-[#c8a97e] to-[#8b6f47] hover:from-[#8b6f47] hover:to-[#5c3a21] text-white shadow-md hover:shadow-lg transition-all duration-300"
              >
                Sign In
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Button>

              {/* Divider */}
              <div className="relative py-1.5 sm:py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#eaddc8]"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-[#8b6f47] text-[10px]">Or continue with</span>
                </div>
              </div>

              {/* Social Login Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant="outline" 
                  className="h-8 sm:h-9 text-xs border border-[#eaddc8] hover:border-[#c8a97e] hover:bg-[#eaddc8]/20 transition-all duration-300"
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 sm:mr-1.5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="hidden sm:inline">Google</span>
                  <span className="sm:hidden">Google</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-8 sm:h-9 text-xs border border-[#eaddc8] hover:border-[#c8a97e] hover:bg-[#eaddc8]/20 transition-all duration-300"
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 sm:mr-1.5" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="hidden sm:inline">Facebook</span>
                  <span className="sm:hidden">Facebook</span>
                </Button>
              </div>

              {/* Sign Up Link */}
              <p className="text-xs text-center text-[#5c3a21] dark:text-[#c8a97e] pt-1">
                Don't have an account?{" "}
                <a href="#" className="font-semibold text-[#c8a97e] hover:text-[#8b6f47] dark:text-[#eaddc8] dark:hover:text-white">
                  Create one now
                </a>
              </p>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  if (!user) return null

  const isArtisan = user.role === "artisan"

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-16 sm:pt-20">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8">
          {/* Header */}
          <div className="mb-4 sm:mb-6">
            <Link href="/" className="text-[#c8a97e] hover:text-[#8b6f47] mb-3 sm:mb-4 inline-block text-xs sm:text-sm font-medium transition-colors">
              ← Back to Home
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#2b2b2b] dark:text-[#f5f1ec]">My Account</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="p-3 sm:p-4 bg-gradient-to-br from-white to-[#fffdf9] dark:from-[#2b2219] dark:to-[#1a1410] border-2 border-[#eaddc8] dark:border-[#5c3a21] shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className="text-center mb-4 sm:mb-6">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto mb-2 sm:mb-3 overflow-hidden border-3 sm:border-4 border-[#eaddc8]">{user.avatar ? (
                      <Image src={user.avatar} alt={user.name} width={96} height={96} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#c8a97e] to-[#8b6f47]">
                        <User className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold text-base sm:text-lg text-[#2b2b2b] dark:text-[#f5f1ec]">{user.name}</h3>
                  <p className="text-xs sm:text-sm text-[#5c3a21] dark:text-[#c8a97e] truncate">{user.email}</p>
                  {isArtisan && (
                    <div className="mt-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-[#c8a97e] to-[#8b6f47] text-white shadow-sm">
                        <Award className="w-3 h-3 mr-1" />
                        Artisan
                      </span>
                    </div>
                  )}
                </div>

                <nav className="space-y-1">
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`w-full flex items-center gap-2 sm:gap-3 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all ${
                      activeTab === "profile" 
                        ? "bg-gradient-to-r from-[#c8a97e] to-[#8b6f47] text-white shadow-sm" 
                        : "text-[#5c3a21] hover:bg-[#eaddc8]/50"
                    }`}
                  >
                    <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    Profile
                  </button>

                  {!isArtisan && (
                    <>
                      <button
                        onClick={() => setActiveTab("orders")}
                        className={`w-full flex items-center gap-2 sm:gap-3 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all ${
                          activeTab === "orders" 
                            ? "bg-gradient-to-r from-[#c8a97e] to-[#8b6f47] text-white shadow-sm" 
                            : "text-[#5c3a21] hover:bg-[#eaddc8]/50"
                        }`}
                      >
                        <Package className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        Orders
                      </button>

                      <button
                        onClick={() => setActiveTab("wishlist")}
                        className={`w-full flex items-center gap-2 sm:gap-3 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all ${
                          activeTab === "wishlist" 
                            ? "bg-gradient-to-r from-[#c8a97e] to-[#8b6f47] text-white shadow-sm" 
                            : "text-[#5c3a21] hover:bg-[#eaddc8]/50"
                        }`}
                      >
                      <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      Wishlist
                    </button>
                  </>
                )}

                {isArtisan && (
                  <>
                    <button
                      onClick={() => setActiveTab("shop")}
                      className={`w-full flex items-center gap-2 sm:gap-3 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all ${
                        activeTab === "shop" 
                          ? "bg-gradient-to-r from-[#c8a97e] to-[#8b6f47] text-white shadow-sm" 
                          : "text-[#5c3a21] hover:bg-[#eaddc8]/50"
                      }`}
                    >
                      <Store className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      My Shop
                    </button>

                    <button
                      onClick={() => setActiveTab("products")}
                      className={`w-full flex items-center gap-2 sm:gap-3 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all ${
                        activeTab === "products" 
                          ? "bg-gradient-to-r from-[#c8a97e] to-[#8b6f47] text-white shadow-sm" 
                          : "text-[#5c3a21] hover:bg-[#eaddc8]/50"
                      }`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      Products
                    </button>
                  </>
                )}

                <button
                  onClick={() => setActiveTab("settings")}
                  className={`w-full flex items-center gap-2 sm:gap-3 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all ${
                    activeTab === "settings" 
                      ? "bg-gradient-to-r from-[#c8a97e] to-[#8b6f47] text-white shadow-sm" 
                      : "text-[#5c3a21] hover:bg-[#eaddc8]/50"
                  }`}
                >
                  <Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  Settings
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 sm:gap-3 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium text-red-700 hover:bg-red-50 dark:text-red-500 dark:hover:bg-red-950/20 transition-all"
                >
                  <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  Logout
                </button>
              </nav>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <Card className="p-4 sm:p-6 bg-gradient-to-br from-white via-[#fffdf9] to-white dark:from-[#2b2219] dark:via-[#1a1410] dark:to-[#2b2219] border-2 border-[#eaddc8] dark:border-[#5c3a21] shadow-xl">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h2 className="text-lg sm:text-xl font-bold text-[#2b2b2b] dark:text-[#f5f1ec]">Profile Information</h2>
                  {!isEditing ? (
                    <Button onClick={() => setIsEditing(true)} variant="outline" size="sm" className="border-[#eaddc8] text-[#5c3a21] hover:bg-[#eaddc8]/30 h-8 sm:h-9 px-2.5 sm:px-3">
                      <Edit2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                      <span className="text-xs sm:text-sm">Edit</span>
                    </Button>
                  ) : (
                    <div className="flex gap-1.5 sm:gap-2">
                      <Button onClick={handleSaveProfile} size="sm" className="bg-gradient-to-r from-[#c8a97e] to-[#8b6f47] hover:from-[#8b6f47] hover:to-[#5c3a21] text-white h-8 sm:h-9 px-2.5 sm:px-3">
                        <Save className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                        <span className="text-xs sm:text-sm">Save</span>
                      </Button>
                      <Button onClick={handleCancelEdit} variant="outline" size="sm" className="border-[#eaddc8] text-[#5c3a21] hover:bg-[#eaddc8]/30 h-8 sm:h-9 px-2.5 sm:px-3">
                        <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                        <span className="text-xs sm:text-sm">Cancel</span>
                      </Button>
                    </div>
                  )}
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="text-xs sm:text-sm font-medium mb-1 sm:mb-1.5 block text-[#5c3a21] dark:text-[#eaddc8]">Full Name</label>
                      {isEditing ? (
                        <Input
                          value={editedProfile.name || ""}
                          onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                          className="border-[#eaddc8] focus:border-[#c8a97e] focus:ring-[#c8a97e] h-9 sm:h-10 text-xs sm:text-sm"
                        />
                      ) : (
                        <p className="text-xs sm:text-sm text-[#5c3a21] dark:text-[#c8a97e]">{user.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-xs sm:text-sm font-medium mb-1 sm:mb-1.5 block">Email</label>
                      <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1.5 sm:gap-2">
                        <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        {user.email}
                      </p>
                    </div>

                    <div>
                      <label className="text-xs sm:text-sm font-medium mb-1 sm:mb-1.5 block">Phone</label>
                      {isEditing ? (
                        <Input
                          value={editedProfile.phone || ""}
                          onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                          className="h-9 sm:h-10 text-xs sm:text-sm"
                        />
                      ) : (
                        <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1.5 sm:gap-2">
                          <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          {user.phone || "Not provided"}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-xs sm:text-sm font-medium mb-1 sm:mb-1.5 block">Location</label>
                      {isEditing ? (
                        <Input
                          value={editedProfile.location || ""}
                          onChange={(e) => setEditedProfile({ ...editedProfile, location: e.target.value })}
                          className="h-9 sm:h-10 text-xs sm:text-sm"
                        />
                      ) : (
                        <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1.5 sm:gap-2">
                          <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          {user.location || "Not provided"}
                        </p>
                      )}
                    </div>
                  </div>

                  {isArtisan && (
                    <>
                      <div>
                        <label className="text-xs sm:text-sm font-medium mb-1 sm:mb-1.5 block">Shop Name</label>
                        {isEditing ? (
                          <Input
                            value={editedProfile.shopName || ""}
                            onChange={(e) => setEditedProfile({ ...editedProfile, shopName: e.target.value })}
                            className="h-9 sm:h-10 text-xs sm:text-sm"
                          />
                        ) : (
                          <p className="text-xs sm:text-sm text-muted-foreground">{user.shopName}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                          <label className="text-xs sm:text-sm font-medium mb-1 sm:mb-1.5 block">Specialty</label>
                          {isEditing ? (
                            <Input
                              value={editedProfile.specialty || ""}
                              onChange={(e) => setEditedProfile({ ...editedProfile, specialty: e.target.value })}
                              className="h-9 sm:h-10 text-xs sm:text-sm"
                            />
                          ) : (
                            <p className="text-xs sm:text-sm text-muted-foreground">{user.specialty}</p>
                          )}
                        </div>

                        <div>
                          <label className="text-xs sm:text-sm font-medium mb-1 sm:mb-1.5 block">Years of Experience</label>
                          {isEditing ? (
                            <Input
                              type="number"
                              value={editedProfile.yearsOfExperience || 0}
                              onChange={(e) => setEditedProfile({ ...editedProfile, yearsOfExperience: parseInt(e.target.value) })}
                              className="h-9 sm:h-10 text-xs sm:text-sm"
                            />
                          ) : (
                            <p className="text-xs sm:text-sm text-muted-foreground">{user.yearsOfExperience} years</p>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  {!isArtisan && (
                    <div>
                      <label className="text-xs sm:text-sm font-medium mb-1 sm:mb-1.5 block">Shipping Address</label>
                      {isEditing ? (
                        <Textarea
                          value={editedProfile.shippingAddress || ""}
                          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEditedProfile({ ...editedProfile, shippingAddress: e.target.value })}
                          rows={3}
                          className="text-xs sm:text-sm"
                        />
                      ) : (
                        <p className="text-xs sm:text-sm text-muted-foreground">{user.shippingAddress || "Not provided"}</p>
                      )}
                    </div>
                  )}

                  <div>
                    <label className="text-xs sm:text-sm font-medium mb-1 sm:mb-1.5 block">Bio</label>
                    {isEditing ? (
                      <Textarea
                        value={editedProfile.bio || ""}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                        rows={4}
                        className="text-xs sm:text-sm"
                      />
                    ) : (
                      <p className="text-xs sm:text-sm text-muted-foreground">{user.bio || "No bio yet"}</p>
                    )}
                  </div>
                </div>
              </Card>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && !isArtisan && (
              <Card className="p-4 sm:p-6 bg-gradient-to-br from-white via-[#fffdf9] to-white dark:from-[#2b2219] dark:via-[#1a1410] dark:to-[#2b2219] border-2 border-[#eaddc8] dark:border-[#5c3a21] shadow-xl">
                <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Order History</h2>
                
                {orders.length === 0 ? (
                  <div className="text-center py-8 sm:py-12">
                    <Package className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground mx-auto mb-3 sm:mb-4" />
                    <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">No orders yet</p>
                    <Link href="/shop">
                      <Button className="h-9 sm:h-10 px-4 sm:px-6 text-xs sm:text-sm">Start Shopping</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3 sm:space-y-4">
                    {orders.map((order) => (
                      <Card key={order.id} className="p-3 sm:p-4">
                        <div className="flex items-start justify-between mb-3 sm:mb-4">
                          <div>
                            <p className="font-semibold text-sm sm:text-base">Order #{order.id}</p>
                            <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1 mt-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(order.date).toLocaleDateString()}
                            </p>
                          </div>
                          <span
                            className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-medium ${
                              order.status === "delivered"
                                ? "bg-green-100 text-green-700"
                                : order.status === "shipped"
                                ? "bg-blue-100 text-blue-700"
                                : order.status === "processing"
                                ? "bg-yellow-100 text-yellow-700"
                                : order.status === "cancelled"
                                ? "bg-red-100 text-red-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>

                        <div className="space-y-2 sm:space-y-3">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex gap-2 sm:gap-3">
                              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-muted rounded overflow-hidden flex-shrink-0">
                                <Image src={item.image || "/placeholder.svg"} alt={item.name} width={64} height={64} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-xs sm:text-sm">{item.name}</p>
                                <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                                <p className="text-xs sm:text-sm font-semibold text-primary mt-0.5 sm:mt-1">₱{item.price.toLocaleString()}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="border-t mt-3 sm:mt-4 pt-3 sm:pt-4 flex items-center justify-between">
                          <div>
                            <p className="text-xs sm:text-sm text-muted-foreground">Total</p>
                            <p className="font-bold text-base sm:text-lg">₱{order.total.toLocaleString()}</p>
                          </div>
                          {order.trackingNumber && (
                            <Button variant="outline" size="sm" className="h-8 sm:h-9 px-2.5 sm:px-3 text-xs sm:text-sm">Track Order</Button>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </Card>
            )}

            {/* Wishlist Tab */}
            {activeTab === "wishlist" && !isArtisan && (
              <Card className="p-4 sm:p-6 bg-gradient-to-br from-white via-[#fffdf9] to-white dark:from-[#2b2219] dark:via-[#1a1410] dark:to-[#2b2219] border-2 border-[#eaddc8] dark:border-[#5c3a21] shadow-xl">
                <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-[#2b2b2b] dark:text-[#f5f1ec]">My Wishlist</h2>
                
                {wishlistProducts.length === 0 ? (
                  <div className="text-center py-8 sm:py-12">
                    <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-[#c8a97e]/50 mx-auto mb-3 sm:mb-4" />
                    <p className="text-sm sm:text-base text-[#5c3a21] dark:text-[#c8a97e] mb-3 sm:mb-4">Your wishlist is empty</p>
                    <Link href="/shop">
                      <Button className="bg-gradient-to-r from-[#c8a97e] to-[#8b6f47] hover:from-[#8b6f47] hover:to-[#5c3a21] text-white h-9 sm:h-10 px-4 sm:px-6 text-xs sm:text-sm">Browse Products</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {wishlistProducts.map((product) => (
                      <Card key={product.id} className="p-2.5 sm:p-3 bg-white dark:bg-[#2b2219] border border-[#eaddc8] dark:border-[#5c3a21] hover:border-[#c8a97e] hover:shadow-xl transition-all duration-300">
                        <div className="relative aspect-square bg-[#eaddc8]/30 rounded mb-2 sm:mb-3 overflow-hidden">
                          <Image 
                            src={product.image} 
                            alt={product.name} 
                            fill
                            className="object-cover"
                          />
                          <button
                            onClick={() => toggleFavorite(product.id)}
                            className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 p-1.5 sm:p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                          >
                            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-red-500 text-red-500" />
                          </button>
                        </div>
                        <p className="font-medium text-xs sm:text-sm mb-0.5 sm:mb-1 text-[#2b2b2b] dark:text-[#f5f1ec]">{product.name}</p>
                        <p className="text-xs sm:text-sm text-[#5c3a21] dark:text-[#c8a97e] mb-1.5 sm:mb-2">{product.category}</p>
                        <p className="text-xs sm:text-sm text-[#c8a97e] font-semibold mb-2 sm:mb-3">₱{product.price.toLocaleString()}</p>
                        <Button 
                          onClick={() => addToCart(product)}
                          className="w-full bg-gradient-to-r from-[#c8a97e] to-[#8b6f47] hover:from-[#8b6f47] hover:to-[#5c3a21] text-white h-8 sm:h-9 text-xs sm:text-sm" 
                          size="sm"
                        >
                          Add to Cart
                        </Button>
                      </Card>
                    ))}
                  </div>
                )}
              </Card>
            )}

            {/* Artisan Shop Tab */}
            {activeTab === "shop" && isArtisan && (
              <Card className="p-4 sm:p-6 bg-gradient-to-br from-white via-[#fffdf9] to-white dark:from-[#2b2219] dark:via-[#1a1410] dark:to-[#2b2219] border-2 border-[#eaddc8] dark:border-[#5c3a21] shadow-xl">
                <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">My Shop Dashboard</h2>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <Card className="p-3 sm:p-4 bg-gradient-to-br from-white to-[#fffdf9] dark:from-[#2b2219] dark:to-[#1a1410] border border-[#eaddc8] dark:border-[#5c3a21] hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#c8a97e] to-[#8b6f47] flex items-center justify-center shadow-sm">
                        <BarChart2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-muted-foreground">Total Sales</p>
                        <p className="text-lg sm:text-xl font-bold">{artisanStats.totalSales}</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-3 sm:p-4 bg-gradient-to-br from-white to-[#fffdf9] dark:from-[#2b2219] dark:to-[#1a1410] border border-[#eaddc8] dark:border-[#5c3a21] hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-sm">
                        <Wallet className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-muted-foreground">Revenue</p>
                        <p className="text-lg sm:text-xl font-bold">₱{(artisanStats.totalRevenue / 1000).toFixed(0)}k</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-3 sm:p-4 bg-gradient-to-br from-white to-[#fffdf9] dark:from-[#2b2219] dark:to-[#1a1410] border border-[#eaddc8] dark:border-[#5c3a21] hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-sm">
                        <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-muted-foreground">Total Views</p>
                        <p className="text-lg sm:text-xl font-bold">{artisanStats.totalViews}</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-3 sm:p-4 bg-gradient-to-br from-white to-[#fffdf9] dark:from-[#2b2219] dark:to-[#1a1410] border border-[#eaddc8] dark:border-[#5c3a21] hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-sm">
                        <Package className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-muted-foreground">Products</p>
                        <p className="text-lg sm:text-xl font-bold">{artisanStats.activeProducts}</p>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Shop Info */}
                <div className="bg-muted/30 rounded-lg p-6">
                  <h3 className="font-semibold mb-4">Shop Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Shop Name</p>
                      <p className="font-medium">{user.shopName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Specialty</p>
                      <p className="font-medium">{user.specialty}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Location</p>
                      <p className="font-medium">{user.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Experience</p>
                      <p className="font-medium">{user.yearsOfExperience} years</p>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Products Management Tab */}
            {activeTab === "products" && isArtisan && (
              <Card className="p-4 sm:p-6 bg-gradient-to-br from-white via-[#fffdf9] to-white dark:from-[#2b2219] dark:via-[#1a1410] dark:to-[#2b2219] border-2 border-[#eaddc8] dark:border-[#5c3a21] shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Product Management</h2>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                  </Button>
                </div>

                <div className="space-y-4">
                  {artisanProducts.map((product) => (
                    <Card key={product.id} className="p-4">
                      <div className="flex gap-4">
                        <div className="w-24 h-24 bg-muted rounded overflow-hidden flex-shrink-0">
                          <Image src={product.image} alt={product.name} width={96} height={96} className="w-full h-full object-cover" />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold">{product.name}</h3>
                              <p className="text-lg font-bold text-primary">₱{product.price.toLocaleString()}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Edit2 className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-4 mt-3">
                            <div>
                              <p className="text-xs text-muted-foreground">Stock</p>
                              <p className="font-medium">{product.stock} units</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Views</p>
                              <p className="font-medium">{product.views}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Sales</p>
                              <p className="font-medium">{product.sales}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <Card className="p-4 sm:p-6 bg-gradient-to-br from-white via-[#fffdf9] to-white dark:from-[#2b2219] dark:via-[#1a1410] dark:to-[#2b2219] border-2 border-[#eaddc8] dark:border-[#5c3a21] shadow-xl">
                <h2 className="text-xl font-bold mb-6">Account Settings</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">Change Password</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Current Password</label>
                        <Input type="password" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">New Password</label>
                        <Input type="password" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Confirm New Password</label>
                        <Input type="password" />
                      </div>
                      <Button>Update Password</Button>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="font-semibold mb-3">Notifications</h3>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3">
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                        <span className="text-sm">Email notifications for new orders</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                        <span className="text-sm">Marketing emails</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input type="checkbox" className="w-4 h-4" />
                        <span className="text-sm">SMS notifications</span>
                      </label>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="font-semibold mb-3 text-red-600">Danger Zone</h3>
                    <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                      Delete Account
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
