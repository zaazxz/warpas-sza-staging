import type { Metadata } from "next"
import { Syne, Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"], // Syne max weight is 800, no 900
  variable: "--font-syne",
  display: "swap",
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
})

export const metadata: Metadata = {
  title: "WARPAS SZA",
  description: "Warung Pasta SZA – Pasta enak, harga ramah.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${syne.variable} ${plusJakarta.variable}`}>
      <body className="font-jakarta bg-orange-50 text-gray-800 antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}