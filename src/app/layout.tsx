import type { Metadata } from "next"
import { Syne, Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"
import { getDb } from "@/lib/data-service"
import { DEFAULT_THEME } from "@/types"

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
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
  const db = getDb()
  const theme = db.theme ?? DEFAULT_THEME

  const themeVars = `
    :root {
      --color-primary: ${theme.primary};
      --color-accent: ${theme.accent};
      --color-text-on-primary: ${theme.textOnPrimary};
    }
  `

  return (
    <html lang="id" className={`${syne.variable} ${plusJakarta.variable}`}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: themeVars }} />
      </head>
      <body className="font-jakarta bg-orange-50 text-gray-800 antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}