import "./globals.css"

import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { Navbar, Footer } from "@/components/base"
import { headers } from "next/headers"
import Script from "next/script"
import { cn } from "@/utils"

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  preload: true,
  display: "swap",
  subsets: ["latin-ext"],
})

export const metadata: Metadata = {
  title: {
    default: "",
    template: "%s | SponsorExplorer",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const nonce = headers().get("x-nonce")

  return (
    <html lang="en" dir="ltr">
      <body
        className={cn(inter.className, "antialiased text-sm overflow-x-hidden")}
      >
        <Script
          id="umami"
          async
          nonce={nonce!}
          src="https://eu.umami.is/script.js"
        />
        <Navbar />
        <div className="min-h-[calc(100dvh-5.75rem)]">{children}</div>
        <Footer />
      </body>
    </html>
  )
}
