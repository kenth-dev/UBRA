"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heart, MessageCircle, Send, Plus, Video, Image as ImageIcon, Smile, TrendingUp, Calendar, ShoppingCart, Gift, Star } from "lucide-react"
import Image from "next/image"
import { liveAuctions, featuredItem } from "@/components/auction-data"
import { donations as donationTotals } from "@/lib/donations"

interface Post {
  id: number
  artisanId: number
  artisanName: string
  artisanAvatar: string
  image: string
  caption: string
  likes: number
  comments: any[]
  liked?: boolean
  timestamp?: string
}

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [filter, setFilter] = useState("newest")
  const [commentInputs, setCommentInputs] = useState<{ [key: number]: string }>({})
  const [userNames, setUserNames] = useState<{ [key: number]: string }>({})
  const [expandedComments, setExpandedComments] = useState<{ [key: number]: boolean }>({})
  const [showComposer, setShowComposer] = useState(false)
  const [composerName, setComposerName] = useState("")
  const [composerText, setComposerText] = useState("")

  useEffect(() => {
    fetch("/data/posts.json")
      .then((res) => res.json())
      .then((data) => {
        const fetched = (data.posts || []).map((p: any) => ({
          ...p,
          liked: false,
          timestamp: p.timestamp || "2h",
          comments: p.comments && p.comments.length ? p.comments : [{ id: 1, name: "Community", text: "Beautiful craftsmanship!", timestamp: "1h" }],
        }))

        // load posts directly from the JSON file (includes seeded auction posts)
        setPosts(fetched)
      })
  }, [])

  const [shopProducts, setShopProducts] = useState<any[]>([])

  // Sample Filipino buyer names used for the Activity feed
  const filipinoNames = [
    "Maria Santos",
    "Ana Mendoza",
    "Ramon Garcia",
    "Liza Navarro",
    "Miguel Bautista",
    "Carla Reyes",
    "Andres Lopez",
    "Isabel Villanueva",
  ]

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => setShopProducts(data.products || []))
      .catch(() => setShopProducts([]))
  }, [])

  const [artisans, setArtisans] = useState<any[]>([])
  useEffect(() => {
    fetch("/data/artisans.json")
      .then((res) => res.json())
      .then((data) => setArtisans(data.artisans || []))
      .catch(() => setArtisans([]))
  }, [])

  // donation totals are pulled from shared module to avoid a separate json file
  

  const handleLike = (postId: number) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post
        const liked = !post.liked
        return { ...post, liked, likes: post.likes + (liked ? 1 : -1) }
      }),
    )
  }

  const handleCommentSubmit = (postId: number) => {
    const text = commentInputs[postId]?.trim()
    const name = userNames[postId]?.trim() || "Anonymous"

    if (!text) return

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
                  timestamp: "just now",
                },
              ],
            }
          : post,
      ),
    )

    setCommentInputs({ ...commentInputs, [postId]: "" })
  }

  const sortedPosts = [...posts].sort((a, b) => {
    if (filter === "trending") {
      return b.likes - a.likes
    }
    return 0
  })

  // Donation percent based on shared totals
  const percent = Math.min(100, Math.round((donationTotals.totalCollected / donationTotals.goal) * 100))

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-5xl mx-auto px-3 sm:px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left sidebar */}
          <aside className="hidden lg:block lg:col-span-3">
            <Card className="p-3 sticky top-24 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-white">
                    <Image src="/ubra.png" alt="UBRA Marketplace" width={48} height={48} className="object-cover" />
                  </div>
                <div>
                  <div className="font-semibold">UBRA Marketplace</div>
                  <div className="text-xs text-muted-foreground">Handmade • Local • Sustainable</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-center">
                <div>
                  {/* show product count (minimum 10 for double-digit) */}
                  <div className="text-sm font-semibold">{String(Math.max(shopProducts.length || 0, 10)).padStart(2, "0")}</div>
                  <div className="text-xs text-muted-foreground">Items</div>
                </div>
                <div>
                  {/* show artisan count (minimum 10 for double-digit) */}
                  <div className="text-sm font-semibold">{String(Math.max(artisans.length || 0, 10)).padStart(2, "0")}</div>
                  <div className="text-xs text-muted-foreground">Artisans</div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <a className="flex items-center gap-2 text-sm text-foreground hover:underline" href="/shop">
                  <ShoppingCart className="w-4 h-4" /> Shop
                </a>
                <a className="flex items-center gap-2 text-sm text-foreground hover:underline" href="/favorites">
                  <Star className="w-4 h-4" /> Favorites
                </a>
                <a className="flex items-center gap-2 text-sm text-foreground hover:underline" href="/cart">
                  <Gift className="w-4 h-4" /> Cart
                </a>
              </div>

              <div className="pt-2 border-t border-muted">
                <div className="text-xs text-muted-foreground mb-2">Featured</div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded overflow-hidden bg-white relative">
                      <Image src={"/images/shop/abaca_tote_bag.jpeg"} alt="featured" fill className="object-cover" />
                  </div>
                  <div>
                    <div className="text-sm">Abaca Tote Bag</div>
                    <div className="text-xs text-muted-foreground">₱1,200</div>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-muted">
                <div className="text-xs text-muted-foreground mb-2">Categories</div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 rounded bg-muted text-xs">Home</span>
                  <span className="px-2 py-1 rounded bg-muted text-xs">Wearables</span>
                  <span className="px-2 py-1 rounded bg-muted text-xs">Ceramics</span>
                </div>
              </div>
            </Card>
          </aside>

          {/* Main feed */}
          <main className="lg:col-span-6">
        {/* Top Controls */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              className={`px-3 py-1 rounded-full text-sm font-medium ${filter === "newest" ? "bg-[#1f2937] text-white" : "bg-transparent border"}`}
              onClick={() => setFilter("newest")}
            >
              Newest
            </button>
            <button
              className={`px-3 py-1 rounded-full text-sm font-medium ${filter === "trending" ? "bg-[#1f2937] text-white" : "bg-transparent border"}`}
              onClick={() => setFilter("trending")}
            >
              Trending
            </button>
          </div>
          {/* desktop extras removed — posting UI moved below stories for a cleaner flow */}
        </div>

        {/* Composer is shown below the stories (moved further down) */}

        {/* Mobile composer bottom sheet */}
        {showComposer && (
          <div className="fixed inset-x-0 bottom-0 z-50 sm:hidden">
            <div className="bg-card border-t border-muted p-3">
              <input
                placeholder="Your name"
                value={composerName}
                onChange={(e) => setComposerName(e.target.value)}
                className="w-full px-3 py-2 mb-2 border border-muted rounded-lg text-sm"
              />
              <textarea
                placeholder="What's happening?"
                value={composerText}
                onChange={(e) => setComposerText(e.target.value)}
                className="w-full px-3 py-2 mb-2 border border-muted rounded-lg text-sm resize-none h-24"
              />
              <div className="flex items-center justify-between">
                <button className="text-sm text-muted-foreground" onClick={() => setShowComposer(false)}>
                  Cancel
                </button>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    onClick={() => {
                      const name = composerName.trim() || "You"
                      const text = composerText.trim()
                      if (!text) return
                      const newPost = {
                        id: Date.now(),
                        artisanId: 0,
                        artisanName: name,
                        artisanAvatar: "/placeholder.svg",
                        image: "/placeholder.svg",
                        caption: text,
                          likes: 0,
                          timestamp: "just now",
                        liked: false,
                          comments: [{ id: 1, name: name || "You", text: "Nice!", timestamp: "just now" }],
                      }
                      setPosts((prev) => [newPost, ...(prev || [])])
                      setComposerName("")
                      setComposerText("")
                      setShowComposer(false)
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" /> Post
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile floating button to open composer */}
        <button
          onClick={() => setShowComposer(true)}
          className="fixed bottom-6 right-4 z-40 sm:hidden bg-primary text-primary-foreground rounded-full p-3 shadow-lg"
          aria-label="New post"
        >
          <Plus className="w-5 h-5" />
        </button>

        {/* Stories / Quick avatars (artisans currently in auctions) */}
        <div className="mb-4 flex gap-3 overflow-x-auto py-2">
          {(
            [featuredItem, ...liveAuctions]
              .reduce((acc: { id: string; name: string; avatar: string }[], item) => {
                const exists = acc.find((a) => a.name === item.artisan)
                if (!exists) acc.push({ id: `auction-${item.id}`, name: item.artisan, avatar: item.artisanImage || "/placeholder.svg" })
                return acc
              }, [])
              .slice(0, 12)
          ).map((s) => (
            <div key={s.id} className="flex-shrink-0 text-center w-20">
              <div className="w-14 h-14 mx-auto rounded-full overflow-hidden ring-2 ring-[#c8a97e] bg-white relative">
                <Image src={s.avatar} alt={s.name} fill className="object-cover" />
              </div>
              <div className="text-xs mt-2 truncate">{s.name}</div>
            </div>
          ))}
        </div>

        {/* Composer quick post UI below stories (redesigned) */}
        <div className="mb-4">
          <div className="bg-gradient-to-b from-card/60 to-card/40 border border-muted rounded-xl p-3 shadow-sm overflow-hidden">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white relative flex-shrink-0">
                <Image src="/images/profile/Rodrigo_Santos.jpg" alt="Rodrigo Santos" fill className="object-cover" />
              </div>

              <div className="flex-1 min-w-0">
                <textarea
                  value={composerText}
                  onChange={(e) => setComposerText(e.target.value)}
                  placeholder="What did you make or discover today?"
                  onFocus={() => {
                    if (typeof window !== "undefined" && window.innerWidth >= 640) setShowComposer(true)
                  }}
                  className="w-full resize-none h-12 sm:h-9.5 p-2 sm:p-2 rounded-md bg-transparent border border-dashed border-muted text-sm text-foreground placeholder:text-muted-foreground focus:outline-none min-w-0"
                />

                <div className="mt-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
                    <button
                      type="button"
                      title="Add photo"
                      className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-muted/50"
                      onClick={() => {
                        if (typeof window !== "undefined" && window.innerWidth >= 640) setShowComposer(true)
                      }}
                    >
                      <ImageIcon className="w-4 h-4 text-green-500" />
                      <span className="hidden sm:inline">Photo</span>
                    </button>

                    <button
                      type="button"
                      title="Video"
                      className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-muted/50"
                      onClick={() => {
                        if (typeof window !== "undefined" && window.innerWidth >= 640) setShowComposer(true)
                      }}
                    >
                      <Video className="w-4 h-4 text-yellow-400" />
                      <span className="hidden sm:inline">Video</span>
                    </button>
                  </div>

                  <div className="flex-shrink-0">
                    <Button
                      size="sm"
                      className="w-28 sm:w-36 flex items-center justify-center bg-[#8b5a2b] hover:bg-[#6f4426] text-white disabled:opacity-50"
                      disabled={!composerText.trim()}
                      onClick={() => {
                        const name = composerName.trim() || "You"
                        const text = composerText.trim()
                        if (!text) return
                        const newPost = {
                          id: Date.now(),
                          artisanId: 0,
                          artisanName: name,
                          artisanAvatar: "/images/profile/Rodrigo_Santos.jpg",
                          image: "/placeholder.svg",
                          caption: text,
                          likes: 0,
                          timestamp: "just now",
                          liked: false,
                          comments: [{ id: 1, name: name || "You", text: "Nice!", timestamp: "just now" }],
                        }
                        setPosts((prev) => [newPost, ...(prev || [])])
                        setComposerName("")
                        setComposerText("")
                        setShowComposer(false)
                      }}
                    >
                      <Send className="w-4 h-4 mr-2" /> Share
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Posts */}
        <div className="grid grid-cols-1 gap-6">
          {sortedPosts.map((post) => {
            const commentsShown = expandedComments[post.id] ? post.comments : post.comments.slice(-2)
            const hasMoreComments = post.comments.length > 2 && !expandedComments[post.id]
            return (
              <Card key={post.id} className="overflow-hidden bg-card border border-muted">
                {/* Post Header */}
                <div className="py-0.5 px-2 border-b border-muted flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full overflow-hidden bg-white relative">
                    <Image src={post.artisanAvatar || "/placeholder.svg"} alt={post.artisanName} fill className="object-cover" />
                  </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-sm text-foreground">{post.artisanName}</h3>
                        <span className="text-xs text-muted-foreground">· {post.timestamp || "2h"}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Master Artisan</p>
                    </div>
                </div>

                {/* Post Image: keep a consistent 3:2 aspect ratio to avoid height gaps */}
                <div className="relative overflow-hidden rounded-b-lg -mt-3 w-full" style={{ paddingBottom: "66.66%" }}>
                  <Image src={post.image || "/placeholder.svg"} alt={post.caption} fill className="object-cover" />
                </div>

                {/* Post Actions */}
                <div className="p-2 -mt-2">
                  <div className="flex items-center gap-3 mb-1">
                    <button onClick={() => handleLike(post.id)} aria-pressed={post.liked} className="flex items-center gap-2 text-sm">
                      <Heart
                        className={`${post.liked ? "w-5 h-5 text-red-500" : "w-5 h-5 text-muted-foreground"} transition-colors duration-150`}
                        fill={post.liked ? "currentColor" : "none"}
                      />
                      <span className="text-foreground">{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MessageCircle className="w-5 h-5 text-gray-500" /> <span className="text-foreground">{post.comments.length}</span>
                    </button>
                  </div>
                  <p className="mb-1 text-sm text-foreground">
                    <strong className="font-semibold">{post.artisanName}</strong> <span className="text-muted-foreground">{post.caption}</span>
                  </p>

                  {/* Comments */}
                  <div className="space-y-2 mb-2">
                    {hasMoreComments && (
                      <button
                        className="text-xs text-muted-foreground"
                        onClick={() => setExpandedComments({ ...expandedComments, [post.id]: true })}
                      >
                        View previous comments
                      </button>
                    )}
                    {commentsShown.map((comment: any) => (
                      <div key={comment.id} className="text-xs">
                        <span className="font-semibold text-sm text-foreground">{comment.name}</span>{" "}
                        <span className="text-muted-foreground">{comment.text}</span>
                        <div className="text-[11px] text-muted-foreground">{comment.timestamp}</div>
                      </div>
                    ))}
                  </div>

                  {/* Comment Input Compact */}
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      value={commentInputs[post.id] || ""}
                      onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                      className="flex-1 px-3 py-2 rounded-lg bg-muted border border-muted text-sm text-foreground"
                    />
                    <button onClick={() => handleCommentSubmit(post.id)} className="p-2 rounded-lg bg-primary">
                      <Send className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
          </main>

          {/* Right sidebar */}
          <aside className="hidden lg:block lg:col-span-3">
            <Card className="p-4 sticky top-24 space-y-4">
              <div className="flex items-center justify-between">
                <div className="font-semibold">Activity</div>
                <a className="text-xs text-muted-foreground" href="/activity">See all</a>
              </div>

              <div className="space-y-3">
                {posts.slice(0, 3).map((p, i) => {
                  // pick a buyer name and a product from the shopProducts list
                  const buyer = filipinoNames[i % filipinoNames.length]
                  const product = shopProducts.length
                    ? shopProducts[i % shopProducts.length]
                    : { name: p.caption?.slice(0, 20) || "item", price: 1200 + i * 300, image: p.image }

                  const price = product?.price ? Number(product.price) : 1200 + i * 300

                  return (
                    <div key={p.id || i} className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded overflow-hidden bg-white relative">
                          <Image src={product?.image || p.image || "/placeholder.svg"} alt={product?.name || p.caption} fill className="object-cover" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">{buyer}</div>
                            <div className="text-xs text-muted-foreground">bought {product?.name?.slice(0, 20) || 'item'}</div>
                        </div>
                      </div>
                      <div className="text-right">
                          <div className="text-sm font-semibold text-primary">₱{price.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Completed</div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="pt-2 border-t border-muted">
                <div className="text-xs text-muted-foreground mb-2">Top categories</div>
                <div className="flex flex-col gap-2">
                  {(() => {
                    const counts: Record<string, number> = {}
                    shopProducts.forEach((p) => {
                      counts[p.category] = (counts[p.category] || 0) + 1
                    })
                    const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 4)
                    return entries.length ? (
                      entries.map(([cat, cnt]) => (
                        <div key={cat} className="flex items-center justify-between">
                          <div className="text-sm">{cat}</div>
                          <div className="text-xs text-muted-foreground">{cnt}</div>
                        </div>
                      ))
                    ) : (
                      <div className="text-xs text-muted-foreground">No categories yet</div>
                    )
                  })()}
                </div>
              </div>

              <div className="pt-2 border-t border-muted">
                <div className="text-xs text-muted-foreground mb-2">Top artisans</div>
                <div className="flex flex-col gap-2 mb-3">
                  {artisans.slice(0, 3).map((a, idx) => (
                    <div key={a.id || idx} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-white relative">
                        <Image src={a.image || "/placeholder.svg"} alt={a.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{a.name}</div>
                        <div className="text-xs text-muted-foreground">{a.specialty || a.role}</div>
                      </div>
                      <div className="text-xs text-muted-foreground">{(a.productCount || 0).toString().padStart(2, "0")}</div>
                    </div>
                  ))}
                </div>

              </div>

              <div className="pt-2 border-t border-muted">
                <div className="text-xs text-muted-foreground mb-2">Donation progress</div>
                <div className="w-full bg-muted rounded h-3 overflow-hidden">
                  <div className="h-3 bg-primary rounded-full transition-all" style={{ width: `${percent}%` }} />
                </div>
                <div className="text-xs text-muted-foreground mt-1">₱{donationTotals.totalCollected.toLocaleString()} raised of ₱{donationTotals.goal.toLocaleString()}</div>
              </div>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  )
}
