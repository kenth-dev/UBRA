"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heart, MessageCircle } from "lucide-react"
import Image from "next/image"

interface Post {
  id: number
  artisanId: number
  artisanName: string
  artisanAvatar: string
  image: string
  caption: string
  likes: number
  comments: any[]
}

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [filter, setFilter] = useState("newest")
  const [commentInputs, setCommentInputs] = useState<{ [key: number]: string }>({})
  const [userNames, setUserNames] = useState<{ [key: number]: string }>({})

  useEffect(() => {
    fetch("/data/posts.json")
      .then((res) => res.json())
      .then((data) => setPosts(data.posts))
  }, [])

  const handleLike = (postId: number) => {
    setPosts((prev) => prev.map((post) => (post.id === postId ? { ...post, likes: post.likes + 1 } : post)))
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

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Filter */}
        <div className="mb-8 flex gap-4 justify-center">
          <Button variant={filter === "newest" ? "default" : "outline"} onClick={() => setFilter("newest")}>
            Newest
          </Button>
          <Button variant={filter === "trending" ? "default" : "outline"} onClick={() => setFilter("trending")}>
            Trending
          </Button>
        </div>

        {/* Posts */}
        <div className="space-y-8">
          {sortedPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              {/* Post Header */}
              <div className="p-4 border-b border-muted flex items-center gap-3">
                <Image
                  src={post.artisanAvatar || "/placeholder.svg"}
                  alt={post.artisanName}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-semibold">{post.artisanName}</h3>
                  <p className="text-sm text-muted-foreground">{post.artisanName} • Master Artisan</p>
                </div>
              </div>

              {/* Post Image */}
              <div className="aspect-square relative overflow-hidden">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.caption}
                  fill
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Post Actions */}
              <div className="p-4">
                <div className="flex gap-4 mb-4">
                  <button
                    onClick={() => handleLike(post.id)}
                    className="flex items-center gap-2 hover:text-primary transition"
                  >
                    <Heart className="w-6 h-6" />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-primary transition">
                    <MessageCircle className="w-6 h-6" />
                    <span>{post.comments.length}</span>
                  </button>
                </div>

                {/* Caption */}
                <p className="mb-4">
                  <strong>{post.artisanName}</strong> {post.caption}
                </p>

                {/* Comments */}
                <div className="space-y-3 mb-4 bg-muted/30 p-3 rounded">
                  {post.comments.map((comment: any) => (
                    <div key={comment.id}>
                      <p className="text-sm">
                        <strong>{comment.name}</strong> {comment.text}
                      </p>
                      <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
                    </div>
                  ))}
                </div>

                {/* Comment Input */}
                <div className="border-t border-muted pt-4 space-y-2">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={userNames[post.id] || ""}
                    onChange={(e) => setUserNames({ ...userNames, [post.id]: e.target.value })}
                    className="w-full px-3 py-2 border border-muted rounded-lg text-sm"
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      value={commentInputs[post.id] || ""}
                      onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                      className="flex-1 px-3 py-2 border border-muted rounded-lg text-sm"
                    />
                    <Button size="sm" onClick={() => handleCommentSubmit(post.id)}>
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
