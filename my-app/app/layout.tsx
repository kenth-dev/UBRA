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
  icons: {
    icon: "/ubra.png",
    shortcut: "/ubra.png",
    apple: "/ubra.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/ubra.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/ubra.png" />
        <link rel="shortcut icon" href="/ubra.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/ubra.png" />
        <link rel="mask-icon" href="/ubra.png" color="#000000" />
      </head>
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
