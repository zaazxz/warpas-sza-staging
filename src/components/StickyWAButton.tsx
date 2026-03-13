"use client"

import { WAButton } from "@/components/ui/WAButton"
import { BusinessInfo } from "@/types"

export function StickyWAButton({ business }: { business: BusinessInfo }) {
  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 md:hidden animate-bounce-in">
      <WAButton
        href={business.waBaseUrl}
        size="md"
        className="shadow-[0_8px_32px_rgba(249,115,22,0.6)] whitespace-nowrap font-syne"
      >
        Pesan via WhatsApp 🔥
      </WAButton>
    </div>
  )
}