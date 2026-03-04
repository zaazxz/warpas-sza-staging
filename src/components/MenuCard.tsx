import { cn } from "@/lib/utils"
import { WAButton } from "@/components/ui/WAButton"
import type { MenuItem } from "@/types"

interface MenuCardProps {
  item: MenuItem
}

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 text-amber-400 text-sm">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i}>⭐</span>
      ))}
    </div>
  )
}

export function MenuCard({ item }: MenuCardProps) {
  const priceK = item.price / 1000

  return (
    <div className="bg-white rounded-3xl shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-[0_14px_44px_rgba(249,115,22,0.2)] group">
      {/* Thumb */}
      <div className="relative h-44 bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center text-7xl">
        {item.emoji}
        <span
          className={cn(
            "absolute top-3 left-3 text-white text-xs font-bold px-2.5 py-1 rounded-full",
            item.badgeColor
          )}
        >
          {item.badge}
        </span>
      </div>

      {/* Body */}
      <div className="p-5">
        <h3 className="font-syne font-extrabold text-gray-800 text-base mb-1.5">
          {item.name}
        </h3>
        <StarRating count={item.rating} />
        <p className="text-gray-400 text-sm leading-relaxed mt-2 mb-4">
          {item.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-syne font-extrabold text-orange-500 text-2xl">
            {priceK}K
          </span>
          <WAButton
            href={`https://wa.me/6281219537456?text=${item.waText}`}
            size="sm"
            className="text-xs px-4 py-2"
          >
            Order Ini
          </WAButton>
        </div>
      </div>
    </div>
  )
}