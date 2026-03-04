import { MENU_ITEMS, BUSINESS } from "@/lib/constants"
import { MenuCard } from "@/components/MenuCard"
import { WAButton } from "@/components/ui/WAButton"

export function MenuSection() {
  return (
    <section id="menu" className="py-20 bg-orange-50">
      <div className="max-w-5xl mx-auto px-5">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
            Best Sellers
          </span>
          <h2 className="font-syne font-extrabold text-3xl md:text-4xl text-gray-800 mb-2">
            Menu Andalan WARPAS SZA 🔥
          </h2>
          <p className="text-gray-400">Dibuat segar, disajikan hangat, dibanderol murah.</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {MENU_ITEMS.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10">
          <WAButton
            href={`https://wa.me/${BUSINESS.whatsapp}?text=Halo%20saya%20mau%20lihat%20menu%20lengkap%20WARPAS%20SZA`}
          >
            Lihat Menu Lengkap via WhatsApp
          </WAButton>
        </div>
      </div>
    </section>
  )
}