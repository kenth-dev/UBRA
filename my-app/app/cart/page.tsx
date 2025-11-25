"use client"

import { useApp } from "@/lib/context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { Trash2, CreditCard, Package, CheckCircle } from "lucide-react"
import { useState, useRef } from "react"

export default function CartPage() {
  const { cart, removeFromCart, getCartTotal, clearCart, updateCartQuantity } = useApp()
  const [checkoutMode, setCheckoutMode] = useState(false)
  const [paymentState, setPaymentState] = useState<"idle" | "processing" | "success" | "failed">("idle")
  const [paymentMethod, setPaymentMethod] = useState<"card" | "cash">("card")
  const [address, setAddress] = useState({
    fullName: "",
    line1: "",
    line2: "",
    city: "",
    province: "",
    postal: "",
    phone: "",
    email: "",
  })

  const [card, setCard] = useState({ name: "", number: "", expiry: "", cvv: "" })
  const receiptRef = useRef<HTMLDivElement | null>(null)
  const [orderId, setOrderId] = useState<string | null>(null)

  const isAddressValid = () => {
    return (
      address.fullName.trim() &&
      address.line1.trim() &&
      address.city.trim() &&
      address.province.trim() &&
      address.phone.trim() &&
      address.email.includes("@")
    )
  }

  const handleStartCheckout = () => {
    setCheckoutMode(true)
    setPaymentState("idle")
  }

  const handlePay = async () => {
    if (!isAddressValid()) {
      alert("Please fill the required address fields before proceeding.")
      return
    }
    // basic card validation (mock) only for card payments
    if (paymentMethod === "card") {
      if (!card.name || card.number.replace(/\s+/g, "").length < 12) {
        alert("Please provide valid card details.")
        return
      }
    }

    setPaymentState("processing")
    // simulate payment processing
    await new Promise((r) => setTimeout(r, 1200))
    // simulate success
    const id = `ORD-${Date.now()}`
    setOrderId(id)
    setPaymentState("success")
    // keep cart until user confirms/prints receipt; clearCart optionally
  }

  const handleComplete = () => {
    clearCart()
    setCheckoutMode(false)
    setPaymentState("idle")
    setOrderId(null)
    window.location.href = "/"
  }

  const printReceipt = () => {
    if (!orderId) return
    const html = receiptRef.current?.innerHTML || `Order ${orderId}`
    const w = window.open("", "_blank")
    if (w) {
      w.document.write(`<html><head><title>Receipt ${orderId}</title></head><body>${html}</body></html>`)
      w.document.close()
      w.focus()
      w.print()
    }
  }

  const downloadReceipt = () => {
    if (!orderId) return
    const data = {
      orderId,
      date: new Date().toISOString(),
      address,
      items: cart,
      total: getCartTotal(),
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${orderId}-receipt.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (paymentState === "success" && orderId) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-100 flex items-start gap-4">
            <CheckCircle className="w-8 h-8 text-green-600 mt-1" />
            <div>
              <h2 className="text-xl font-bold">Thank you for your purchase!</h2>
              <p className="text-sm text-gray-700">Your payment was confirmed. Below is your receipt and order details.</p>
              <p className="text-xs text-gray-500 mt-1">Order ID: <span className="font-mono">{orderId}</span></p>
            </div>
          </div>

          <div ref={receiptRef} className="bg-white rounded-lg p-6 shadow">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold">Receipt</h2>
                <p className="text-sm text-gray-600">Order ID: {orderId}</p>
                <p className="text-sm text-gray-600">Date: {new Date().toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">₱{getCartTotal()}</p>
                <p className="text-xs text-gray-500">Paid</p>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold">Shipping To</h3>
              <p className="text-sm">{address.fullName}</p>
              <p className="text-sm">{address.line1} {address.line2}</p>
              <p className="text-sm">{address.city}, {address.province} {address.postal}</p>
              <p className="text-sm">{address.phone}</p>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold">Items</h3>
              <div className="space-y-2">
                {cart.map((it) => (
                  <div key={it.id} className="flex justify-between text-sm">
                    <span>{it.name} x{it.quantity}</span>
                    <span>₱{it.price * it.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <Button onClick={printReceipt} className="flex-1">Print Receipt</Button>
            <Button variant="ghost" onClick={handleComplete} className="flex-1">Back to Shop</Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Shopping Cart</h1>

        {/* Progress steps */}
        <div className="mb-6">
          <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-600 flex-wrap">
            <div className={`flex items-center gap-3 ${!checkoutMode ? "text-[#0ea5a2]" : "text-gray-500"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${!checkoutMode ? "border-[#0ea5a2] bg-[#0ea5a2]/10" : "border-gray-300"}`}>1</div>
              <div>Shopping Cart</div>
            </div>

            <div className={`flex items-center gap-2 ${checkoutMode ? "text-[#0ea5a2]" : "text-gray-500"}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center border ${checkoutMode ? "border-[#0ea5a2] bg-[#0ea5a2]/10" : "border-gray-300"}`}>2</div>
              <div>Contact</div>
            </div>

            <div className={`flex items-center gap-2 ${checkoutMode && paymentState === "idle" ? "text-[#0ea5a2]" : "text-gray-500"}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center border ${checkoutMode && paymentState === "idle" ? "border-[#0ea5a2] bg-[#0ea5a2]/10" : "border-gray-300"}`}>3</div>
              <div>Payment</div>
            </div>

            <div className={`flex items-center gap-2 ${paymentState === "success" ? "text-[#0ea5a2]" : "text-gray-500"}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center border ${paymentState === "success" ? "border-[#0ea5a2] bg-[#0ea5a2]/10" : "border-gray-300"}`}>4</div>
              <div>Confirmation</div>
            </div>
          </div>
        </div>

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
                  <Card key={item.id} className="p-3">
                    <div className="flex items-center gap-3">
                      {/* Thumbnail */}
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 md:w-28 md:h-28 rounded overflow-hidden">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} width={160} height={160} className="w-full h-full object-cover" />
                        </div>
                      </div>

                      {/* Main info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <h3 className="font-semibold text-sm md:text-lg truncate">{item.name}</h3>
                            <div className="text-xs text-muted-foreground mt-1 md:mt-2">
                              <span>Style # {item.id}</span>
                              <span className="mx-2">•</span>
                              <span>Seller: Artisan {item.artisanId}</span>
                            </div>
                          </div>

                          {/* Price on the right (mobile compact) */}
                          <div className="text-right">
                            <div className="text-sm font-semibold md:text-lg">₱{item.price * item.quantity}</div>
                            <div className="md:hidden mt-1">
                              <button onClick={() => removeFromCart(item.id)} className="p-2 rounded-full text-destructive hover:bg-muted">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Qty and actions row */}
                        <div className="mt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <label className="text-sm">Qty</label>
                            <select value={item.quantity} onChange={(e) => updateCartQuantity(item.id, Number(e.target.value))} className="px-2 py-1 border rounded text-sm">
                              {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                                <option key={n} value={n}>{n}</option>
                              ))}
                            </select>
                          </div>

                          {/* Remove on md+ */}
                          <div className="flex items-center gap-2">
                            <div className="hidden md:block">
                              <button onClick={() => removeFromCart(item.id)} className="text-sm text-destructive hover:underline">Remove</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Cart Summary */}
            <div>
              <Card className="p-4 sm:p-6 lg:sticky lg:top-20 overflow-hidden max-w-full">
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

                <div className="mb-2">
                  <div className="flex justify-between mb-2">
                    <span>Subtotal</span>
                    <span>₱{getCartTotal()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Shipping</span>
                    <span>₱0 (Free)</span>
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-lg mb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-bold">Total</div>
                      <div className="text-sm text-gray-500">Includes taxes</div>
                    </div>
                    <div className="text-2xl font-bold text-primary">₱{getCartTotal()}</div>
                  </div>
                </div>

                {/* Delivery Address box */}
                <div className="bg-white p-4 rounded-lg border mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">Delivery Address</h4>
                      {isAddressValid() ? (
                        <div className="text-sm text-gray-700 mt-2">
                          <div>{address.fullName}</div>
                          <div>{address.line1} {address.line2}</div>
                          <div>{address.city}, {address.province} {address.postal}</div>
                          <div className="text-sm text-gray-500">{address.email}</div>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 mt-2">No address provided yet.</p>
                      )}
                    </div>
                    <div>
                      <button onClick={() => { setCheckoutMode(true); setTimeout(()=>{ window.scrollTo({ top: 0, behavior: 'smooth' }) }, 100) }} className="text-sm text-[#8B6F47] hover:underline">Edit</button>
                    </div>
                  </div>
                </div>

                {!checkoutMode ? (
                  <>
                    <Button
                      size="lg"
                      className="w-full bg-primary hover:bg-secondary text-primary-foreground mb-3"
                      onClick={handleStartCheckout}
                    >
                      Proceed to Checkout
                    </Button>

                    <Link href="/shop">
                      <Button variant="outline" className="w-full bg-transparent">
                        Continue Shopping
                      </Button>
                    </Link>
                  </>
                ) : (
                  <div className="space-y-4">
                    <h3 className="font-semibold">Shipping Address</h3>
                    <div className="space-y-2">
                      <input className="w-full px-3 py-2 border rounded" placeholder="Full name" value={address.fullName} onChange={(e) => setAddress({ ...address, fullName: e.target.value })} />
                      <input className="w-full px-3 py-2 border rounded" placeholder="Address line 1" value={address.line1} onChange={(e) => setAddress({ ...address, line1: e.target.value })} />
                      <input className="w-full px-3 py-2 border rounded" placeholder="Address line 2 (optional)" value={address.line2} onChange={(e) => setAddress({ ...address, line2: e.target.value })} />
                      <div className="grid grid-cols-2 gap-2">
                        <input className="px-3 py-2 border rounded" placeholder="City" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} />
                        <input className="px-3 py-2 border rounded" placeholder="Province" value={address.province} onChange={(e) => setAddress({ ...address, province: e.target.value })} />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <input className="px-3 py-2 border rounded" placeholder="Postal code" value={address.postal} onChange={(e) => setAddress({ ...address, postal: e.target.value })} />
                        <input className="px-3 py-2 border rounded" placeholder="Phone" value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value })} />
                      </div>
                      <input className="w-full px-3 py-2 border rounded" placeholder="Email" value={address.email} onChange={(e) => setAddress({ ...address, email: e.target.value })} />
                    </div>

                    <h3 className="font-semibold">Payment</h3>
                        <div>
                          {/* Payment method tabs */}
                          <div className="flex gap-2 mb-4">
                            <button
                              onClick={() => setPaymentMethod("card")}
                              className={`flex-1 flex items-center gap-2 px-3 py-2 rounded border ${paymentMethod === "card" ? "border-[#8B6F47] bg-[#8B6F47]/5" : "border-gray-200"}`}
                            >
                              <CreditCard className="w-4 h-4" />
                              <span className="text-sm">Credit Card</span>
                            </button>

                            <button
                              onClick={() => setPaymentMethod("cash")}
                              className={`flex-1 flex items-center gap-2 px-3 py-2 rounded border ${paymentMethod === "cash" ? "border-[#8B6F47] bg-[#8B6F47]/5" : "border-gray-200"}`}
                            >
                              <Package className="w-4 h-4" />
                              <span className="text-sm">Cash on Delivery</span>
                            </button>
                          </div>

                          {/* Method-specific fields */}
                          {paymentMethod === "card" && (
                            <div className="space-y-2">
                              <input className="w-full px-3 py-2 border rounded" placeholder="Name on card" value={card.name} onChange={(e) => setCard({ ...card, name: e.target.value })} />
                              <input className="w-full px-3 py-2 border rounded" placeholder="Card number" value={card.number} onChange={(e) => setCard({ ...card, number: e.target.value })} />
                              <div className="grid grid-cols-2 gap-2">
                                <input className="px-3 py-2 border rounded" placeholder="MM/YY" value={card.expiry} onChange={(e) => setCard({ ...card, expiry: e.target.value })} />
                                <input className="px-3 py-2 border rounded" placeholder="CVV" value={card.cvv} onChange={(e) => setCard({ ...card, cvv: e.target.value })} />
                              </div>
                            </div>
                          )}

                          {paymentMethod === "cash" && (
                            <div className="space-y-2 mt-3">
                              <p className="text-sm text-gray-600">Pay with cash when your order is delivered. A small verification may be required.</p>
                              <Button className="w-full whitespace-normal mt-2" onClick={handlePay} disabled={paymentState === "processing"}>{paymentState === "processing" ? "Processing…" : "Confirm Order (Cash)"}</Button>
                            </div>
                          )}

                      {paymentMethod === "card" && (
                        <div className="flex flex-col sm:flex-row gap-2 w-full mt-3">
                          <div className="w-full min-w-0">
                            <Button className="w-full whitespace-normal" onClick={handlePay} disabled={paymentState === "processing"}>
                              {paymentState === "processing" ? "Processing…" : "Pay Now"}
                            </Button>
                          </div>
                          <div className="w-full min-w-0">
                            <Button variant="outline" className="w-full whitespace-normal" onClick={() => setCheckoutMode(false)}>
                              Cancel
                            </Button>
                          </div>
                        </div>
                      )}
                        </div>
                  </div>
                )}
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
