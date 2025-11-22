"use client"

import { useApp } from "@/lib/context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { Trash2 } from "lucide-react"
import { useState } from "react"

export default function CartPage() {
  const { cart, removeFromCart, getCartTotal, clearCart } = useApp()
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
                  <Card key={item.id} className="p-4 flex gap-4 items-start">
                    <div className="w-20 h-20 bg-muted rounded flex-shrink-0">
                      <Image src="/diverse-products-still-life.png" alt={item.name} width={80} height={80} />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{item.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">Qty: {item.quantity}</p>
                      <p className="font-bold text-primary">₱{item.price} each</p>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-destructive hover:text-destructive/80 transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
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
                  <div className="flex justify-between mb-2">
                    <span>Community Donation (5%)</span>
                    <span>₱{Math.round(getCartTotal() * 0.05)}</span>
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-lg mb-6">
                  <div className="flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="text-2xl font-bold text-primary">₱{Math.round(getCartTotal() * 1.05)}</span>
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
