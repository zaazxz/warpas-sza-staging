import { MenuCard } from "@/components/MenuCard"
import { WAButton } from "@/components/ui/WAButton"
import { BusinessInfo, MenuItem } from "@/types"

export function MenuSection({ business, items }: { business: BusinessInfo, items: MenuItem[] }) {
  return (
    <section id="menu" className="py-20 bg-background">
      <div className="max-w-5xl mx-auto px-5">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
            Best Sellers
          </span>
          <h2 className="font-syne font-extrabold text-3xl md:text-4xl text-gray-800 mb-2">
            Menu Andalan WARPAS SZA 🔥
          </h2>
          <p className="text-gray-400">Dibuat segar, disajikan hangat, dibanderol murah.</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.filter(i => i.available !== false).slice(0, 4).map((item) => (
            <MenuCard key={item.id} item={item} business={business} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="/menu" 
            className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-primary/10 text-primary font-syne font-extrabold rounded-2xl hover:bg-primary/5 transition-all text-center"
          >
            Lihat Semua Menu
          </a>
          <WAButton
            href={`https://wa.me/${business.whatsapp}?text=Halo%20saya%20mau%20order%20WARPAS%20SZA`}
            className="w-full sm:w-auto"
          >
            Order via WhatsApp
          </WAButton>
        </div>
      </div>
    </section>
  )
}