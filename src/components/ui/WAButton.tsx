"use client"

import { useUIStore } from "@/store/useUIStore"
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon"
import { cn } from "@/lib/utils"

interface WAButtonProps {
  href: string
  children: React.ReactNode
  className?: string
  variant?: "primary" | "white" | "amber"
  size?: "sm" | "md" | "lg"
}

export function WAButton({
  href,
  children,
  className,
  variant = "primary",
  size = "md",
}: WAButtonProps) {
  const incrementWaClick = useUIStore((s) => s.incrementWaClick)

  const base =
    "inline-flex items-center gap-2 rounded-full font-bold transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98]"

  const variants = {
    primary:
      "bg-orange-500 hover:bg-orange-600 text-white shadow-[0_6px_24px_rgba(249,115,22,0.45)] hover:shadow-[0_10px_32px_rgba(234,88,12,0.5)]",
    white:
      "bg-white text-orange-500 hover:bg-orange-50 hover:text-orange-600 shadow-[0_8px_32px_rgba(0,0,0,0.2)]",
    amber:
      "bg-amber-900 text-amber-100 hover:bg-amber-950 shadow-[0_6px_20px_rgba(0,0,0,0.25)]",
  }

  const sizes = {
    sm: "text-sm px-4 py-2",
    md: "text-base px-7 py-3.5",
    lg: "text-lg px-10 py-4",
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={incrementWaClick}
      className={cn(base, variants[variant], sizes[size], className)}
    >
      <WhatsAppIcon className="w-5 h-5 shrink-0" />
      {children}
    </a>
  )
}