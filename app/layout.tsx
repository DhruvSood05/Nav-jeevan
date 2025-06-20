import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ReliefConnect - Emergency Relief Coordination Platform",
  description:
    "Emergency relief platform connecting victims, volunteers, and organizations with real-time coordination and instant response capabilities.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100`}>
        <div className="min-h-screen">
          <Header />
          <main>{children}</main>
          <Toaster />
        </div>
      </body>
    </html>
  )
}
