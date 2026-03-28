import Link from "next/link"
import { cn } from "@/lib/utils"
import type { MenuItem, BusinessInfo } from "@/types"

interface MenuCardProps {
  item: MenuItem
  business: BusinessInfo
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

export function MenuCard({ item, business }: MenuCardProps) {
  const priceK = item.price / 1000
  const discountPriceK = item.discountPrice ? item.discountPrice / 1000 : null

  return (
    <Link href={`/menu/${item.id}`} className="block">
      <div className="bg-white rounded-3xl shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10 group h-full flex flex-col">
        {/* Thumb */}
        <div className="relative h-44 bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center text-7xl overflow-hidden">
          {item.emoji.startsWith("/") ? <img src={item.emoji} alt={item.name} className="w-full h-full object-cover" /> : item.emoji}
          <span
            className={cn(
              "absolute top-3 left-3 text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1.5 rounded-xl shadow-lg",
              item.badgeColor || "bg-orange-500"
            )}
          >
            {item.badge}
          </span>
        </div>

        {/* Body */}
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="font-syne font-black text-gray-800 text-lg mb-1.5 leading-tight group-hover:text-primary transition-colors">
            {item.name}
          </h3>
          <StarRating count={item.rating} />
          <p className="text-gray-400 text-xs leading-relaxed mt-2 mb-4 line-clamp-2 h-8 flex-1">
            {item.description}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
            <div className="flex flex-col">
              {discountPriceK ? (
                <>
                  <span className="font-syne font-black text-primary text-2xl tracking-tighter leading-none">
                    {discountPriceK}K
                  </span>
                  <span className="text-[10px] text-gray-400 line-through font-bold">
                    {priceK}K
                  </span>
                </>
              ) : (
                <span className="font-syne font-black text-primary text-2xl tracking-tighter leading-none">
                  {priceK}K
                </span>
              )}
            </div>
            
            <div className="bg-primary/5 text-primary text-[9px] font-black uppercase tracking-widest px-2.5 py-1.5 rounded-lg group-hover:bg-primary group-hover:text-white transition-all">
              Detail ➜
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}