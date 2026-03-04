"use client"

import { useEffect } from "react"
import { useUIStore } from "@/store/useUIStore"
import { WAButton } from "@/components/ui/WAButton"
import { BUSINESS } from "@/lib/constants"

export function Navbar() {
  const { isScrolled, setScrolled } = useUIStore()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [setScrolled])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-orange-50/95 backdrop-blur-md shadow-sm border-b border-orange-100"
          : "bg-orange-50/80 backdrop-blur-sm"
        }`}
    >
      <div className="max-w-5xl mx-auto px-5 py-3 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2 text-orange-500 font-extrabold text-xl font-syne no-underline">
          <span className="text-2xl">🍝</span>
          WARPAS SZA
        </a>

        {/* Desktop CTA */}
        <WAButton
          href={BUSINESS.waBaseUrl}
          size="sm"
          className="hidden md:inline-flex text-sm font-syne"
        >
          Pesan Sekarang
        </WAButton>
      </div>
    </nav>
  )
}