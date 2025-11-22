"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  artisanId: number
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

interface AppContextType {
  cart: CartItem[]
  addToCart: (product: any) => void
  removeFromCart: (productId: number) => void
  clearCart: () => void
  getCartTotal: () => number
  posts: Post[]
  likePost: (postId: number) => void
  addComment: (postId: number, name: string, text: string) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [posts, setPosts] = useState<Post[]>([])

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
        },
      ]
    })
  }, [])

  const removeFromCart = useCallback((productId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== productId))
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

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
        posts,
        likePost,
        addComment,
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
