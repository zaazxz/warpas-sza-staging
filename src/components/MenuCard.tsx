import { cn } from "@/lib/utils"
import { WAButton } from "@/components/ui/WAButton"
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

  return (
    <div className="bg-white rounded-3xl shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10 group">
      {/* Thumb */}
      <div className="relative h-44 bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center text-7xl overflow-hidden">
        {item.emoji.startsWith("/") ? <img src={item.emoji} alt={item.name} className="w-full h-full object-cover" /> : item.emoji}
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
        <h3 className="font-syne font-extrabold text-gray-800 text-base mb-1.5 truncate">
          {item.name}
        </h3>
        <StarRating count={item.rating} />
        <p className="text-gray-400 text-xs leading-relaxed mt-2 mb-4 line-clamp-2 h-8">
          {item.description}
        </p>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="font-syne font-extrabold text-primary text-2xl">
              {priceK}K
            </span>
            <WAButton
              href={`https://wa.me/${business.whatsapp}?text=${item.waText}`}
              size="sm"
              className="text-[10px] px-3 py-1.5 h-auto uppercase tracking-wider h-8"
            >
              Order WA
            </WAButton>
          </div>
          
          {/* Third-party delivery links */}
          {(business.shopeeFoodUrl || business.goFoodUrl) && (
            <div className="flex gap-2 pt-2 border-t border-gray-50">
              {business.goFoodUrl && (
                <a 
                  href={business.goFoodUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex-1 bg-green-50 hover:bg-green-100 text-green-700 font-black text-[9px] uppercase tracking-tighter py-2 rounded-xl text-center border border-green-100 transition-colors"
                >
                  💚 GoFood
                </a>
              )}
              {business.shopeeFoodUrl && (
                <a 
                  href={business.shopeeFoodUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex-1 bg-orange-50 hover:bg-orange-100 text-orange-700 font-black text-[9px] uppercase tracking-tighter py-2 rounded-xl text-center border border-orange-100 transition-colors"
                >
                  🧡 Shopee
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}