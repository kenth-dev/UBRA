import type React from "react"
import type { Metadata } from "next"
import { Poppins, Lora } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { AppProvider } from "@/lib/context"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
})
const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500"],
})

export const metadata: Metadata = {
  title: "UBRA - Made with Hands, Priced with Heart",
  description: "UBRA connects and empowers Filipino artisans through a community-driven online marketplace",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <AppProvider>
          <Navigation />
          {children}
        </AppProvider>
        <Analytics />
      </body>
    </html>
  )
}
