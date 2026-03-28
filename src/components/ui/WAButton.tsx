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
      "bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl shadow-primary/20",
    white:
      "bg-white text-primary hover:bg-primary/5 shadow-xl shadow-black/5",
    amber:
      "bg-zinc-900 text-white hover:bg-black shadow-xl shadow-black/10",
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