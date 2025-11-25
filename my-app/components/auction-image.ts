export function toAuctionPath(p: string | undefined) {
  if (!p) return "/placeholder.svg"
  // if already in images/auction folder, return as-is
  if (p.startsWith("/images/auction/")) return p
  // strip leading slash then prefix
  if (p.startsWith("/")) return `/images/auction/${p.slice(1)}`
  return `/images/auction/${p}`
}
