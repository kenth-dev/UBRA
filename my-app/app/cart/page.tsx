"use client"

import { useApp } from "@/lib/context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { Trash2 } from "lucide-react"
import { useState } from "react"

export default function CartPage() {
  const { cart, removeFromCart, getCartTotal, clearCart, updateCartQuantity } = useApp()
  const [proceedToCheckout, setProceedToCheckout] = useState(false)

  if (proceedToCheckout) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="mb-6 text-6xl">✓</div>
          <h1 className="text-4xl font-bold mb-4">Thank You for Your Purchase!</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Your order has been confirmed. Your support directly helps Filipino artisans.
          </p>
          <div className="mb-8 bg-muted p-6 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Order Total</p>
            <p className="text-3xl font-bold">₱{getCartTotal()}</p>
          </div>
          <Button
            onClick={() => {
              clearCart()
              setProceedToCheckout(false)
              window.location.href = "/"
            }}
            className="bg-primary hover:bg-secondary"
          >
            Back to Home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

        {cart.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-lg text-muted-foreground mb-4">Your cart is empty</p>
            <Link href="/shop">
              <Button className="bg-primary hover:bg-secondary">Continue Shopping</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cart.map((item) => (
                  <Card key={item.id} className="p-4">
                    <div className="flex items-center gap-4">
                      {/* Image */}
                      <div className="w-28 h-28 flex-shrink-0 overflow-hidden rounded">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={112}
                          height={112}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">Style # {item.id}</p>
                        <p className="text-sm text-muted-foreground">Seller: Artisan {item.artisanId}</p>
                        <div className="mt-3 flex items-center gap-4">
                          <p className="font-semibold text-[#8B6F47]">₱{item.price}</p>
                          <div className="flex items-center gap-2">
                            <label className="text-sm text-muted-foreground">Qty</label>
                            <select
                              value={item.quantity}
                              onChange={(e) => updateCartQuantity(item.id, Number(e.target.value))}
                              className="px-3 py-1 border rounded text-sm"
                            >
                              {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                                <option key={n} value={n}>
                                  {n}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Price & Actions */}
                      <div className="w-40 text-right">
                        <p className="text-sm text-muted-foreground">Item Price</p>
                        <p className="font-semibold text-lg">₱{item.price * item.quantity}</p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="mt-3 text-sm text-destructive hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Cart Summary */}
            <div>
              <Card className="p-6 sticky top-20">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                <div className="mb-4 pb-4 border-b border-muted space-y-2">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>
                        {item.name} x{item.quantity}
                      </span>
                      <span>₱{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span>Subtotal</span>
                    <span>₱{getCartTotal()}</span>
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-lg mb-6">
                  <div className="flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="text-2xl font-bold text-primary">₱{getCartTotal()}</span>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full bg-primary hover:bg-secondary text-primary-foreground mb-3"
                  onClick={() => setProceedToCheckout(true)}
                >
                  Proceed to Checkout
                </Button>

                <Link href="/shop">
                  <Button variant="outline" className="w-full bg-transparent">
                    Continue Shopping
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
