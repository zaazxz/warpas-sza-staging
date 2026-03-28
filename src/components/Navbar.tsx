"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useUIStore } from "@/store/useUIStore"
import { WAButton } from "@/components/ui/WAButton"
import { BusinessInfo } from "@/types"

export function Navbar({ business }: { business: BusinessInfo }) {
  const { isScrolled, setScrolled } = useUIStore()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [setScrolled])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-primary/10"
          : "bg-white/80 backdrop-blur-sm"
        }`}
    >
      <div className="max-w-5xl mx-auto px-5 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-primary font-extrabold text-xl font-syne no-underline">
          <span className="text-2xl">🍝</span>
          {business.name}
        </Link>

        {/* Desktop CTA */}
        <WAButton
          href={business.waBaseUrl}
          size="sm"
          className="hidden md:inline-flex text-sm font-syne"
        >
          Pesan Sekarang
        </WAButton>
      </div>
    </nav>
  )
}