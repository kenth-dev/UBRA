"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  artisanId: number
  image?: string
}

interface Comment {
  id: number
  name: string
  text: string
  timestamp: string
}

interface Post {
  id: number
  artisanId: number
  artisanName: string
  artisanAvatar: string
  image: string
  caption: string
  likes: number
  comments: Comment[]
}

interface User {
  id: number
  email: string
  name: string
  role: "buyer" | "artisan"
  avatar?: string
  bio?: string
  location?: string
  phone?: string
  // Artisan specific
  shopName?: string
  specialty?: string
  yearsOfExperience?: number
  // Buyer specific
  shippingAddress?: string
}

interface Order {
  id: number
  date: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  items: CartItem[]
  total: number
  trackingNumber?: string
}

interface AppContextType {
  cart: CartItem[]
  addToCart: (product: any) => void
  removeFromCart: (productId: number) => void
  updateCartQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  getCartTotal: () => number
  posts: Post[]
  likePost: (postId: number) => void
  addComment: (postId: number, name: string, text: string) => void
  favorites: number[]
  toggleFavorite: (productId: number) => void
  user: User | null
  login: (email: string, password: string, role: "buyer" | "artisan") => Promise<boolean>
  logout: () => void
  updateProfile: (updates: Partial<User>) => void
  orders: Order[]
  isAuthenticated: boolean
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [posts, setPosts] = useState<Post[]>([])
  const [favorites, setFavorites] = useState<number[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [orders, setOrders] = useState<Order[]>([])

  const addToCart = useCallback((product: any) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          artisanId: product.artisanId,
          image: product.image || "/placeholder.svg",
        },
      ]
    })
  }, [])

  const removeFromCart = useCallback((productId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== productId))
  }, [])

  const updateCartQuantity = useCallback((productId: number, quantity: number) => {
    setCart((prev) => prev.map((item) => (item.id === productId ? { ...item, quantity } : item)))
  }, [])

  const clearCart = useCallback(() => {
    setCart([])
  }, [])

  const getCartTotal = useCallback(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }, [cart])

  const likePost = useCallback((postId: number) => {
    setPosts((prev) => prev.map((post) => (post.id === postId ? { ...post, likes: post.likes + 1 } : post)))
  }, [])

  const addComment = useCallback((postId: number, name: string, text: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: post.comments.length + 1,
                  name,
                  text,
                  timestamp: "now",
                },
              ],
            }
          : post,
      ),
    )
  }, [])

  const toggleFavorite = useCallback((productId: number) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }, [])

  const login = useCallback(async (email: string, password: string, role: "buyer" | "artisan") => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    
    // Mock user data
    const mockUser: User = {
      id: 1,
      email,
      name: role === "artisan" ? "Maria Santos" : "John Doe",
      role,
      avatar: role === "artisan" ? "/images/profile/Rosario_Cruz.jpg" : "/images/profile/Rodrigo_Santos.jpg",
      bio: role === "artisan" ? "Master weaver with 40+ years of experience in traditional Inabel textiles" : "Art enthusiast and collector of Filipino handicrafts",
      location: role === "artisan" ? "Vigan, Ilocos Sur" : "Manila, Philippines",
      phone: "+63 912 345 6789",
      ...(role === "artisan" ? {
        shopName: "Maria's Traditional Weaving",
        specialty: "Inabel Weaving",
        yearsOfExperience: 40,
      } : {
        shippingAddress: "123 Main St, Manila, Philippines",
      }),
    }
    
    setUser(mockUser)
    
    // Mock orders for buyer
    if (role === "buyer") {
      setOrders([
        {
          id: 1001,
          date: "2025-11-20",
          status: "delivered",
          items: [
            { id: 1, name: "Abaca Wall Hanging", price: 2500, quantity: 1, artisanId: 1, image: "/images/shop/abaca_wall_hanging.jpg" },
          ],
          total: 2500,
          trackingNumber: "UBRA-1001-2025",
        },
        {
          id: 1002,
          date: "2025-11-22",
          status: "shipped",
          items: [
            { id: 5, name: "Ceramic Tea Set", price: 1800, quantity: 2, artisanId: 3, image: "/images/shop/ceramic_tea_set.jpg" },
          ],
          total: 3600,
          trackingNumber: "UBRA-1002-2025",
        },
        {
          id: 1003,
          date: "2025-11-25",
          status: "processing",
          items: [
            { id: 3, name: "Wooden Decorative Bowl", price: 3500, quantity: 1, artisanId: 2, image: "/images/shop/wooden_decorative_bowl.jpeg" },
          ],
          total: 3500,
        },
      ])
    }
    
    return true
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setOrders([])
  }, [])

  const updateProfile = useCallback((updates: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : null))
  }, [])

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        getCartTotal,
        posts,
        likePost,
        addComment,
        favorites,
        toggleFavorite,
        user,
        login,
        logout,
        updateProfile,
        orders,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useApp must be used within AppProvider")
  }
  return context
}
