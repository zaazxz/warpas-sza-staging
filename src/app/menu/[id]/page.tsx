import Link from "next/link"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { WAButton } from "@/components/ui/WAButton"
import { getDb } from "@/lib/data-service"
import { StickyWAButton } from "@/components/StickyWAButton"

export default async function MenuDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = getDb()
  const { business, menu } = db
  const item = menu.find((i) => i.id === id)

  if (!item) {
    notFound()
  }

  const priceK = item.price / 1000
  const discountPriceK = item.discountPrice ? item.discountPrice / 1000 : null

  return (
    <div className="min-h-screen bg-background">
      <Navbar business={business} />
      
      <main className="pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-5">
           {/* Back Button */}
           <Link 
             href="/menu" 
             className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest mb-10 hover:translate-x-[-4px] transition-transform"
           >
             ← Kembali ke Menu
           </Link>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              {/* Product Visual */}
              <div className="aspect-square bg-white rounded-[3rem] shadow-2xl flex items-center justify-center text-[10rem] border border-gray-100 overflow-hidden relative group">
                  {item.emoji.startsWith("/") ? (
                    <img src={item.emoji} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <span className="drop-shadow-2xl group-hover:scale-110 transition-transform duration-500">{item.emoji}</span>
                  )}
                  {item.badge && (
                    <span className={`absolute top-8 left-8 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-2xl text-white shadow-xl ${item.badgeColor || "bg-orange-500"}`}>
                      {item.badge}
                    </span>
                  )}
              </div>

              {/* Product Info */}
              <div className="space-y-8">
                <div>
                  <h1 className="font-syne font-black text-4xl md:text-5xl text-gray-900 leading-tight tracking-tighter mb-4">
                    {item.name}
                  </h1>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1 text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i}>⭐</span>
                      ))}
                    </div>
                    <span className="text-gray-400 font-bold ml-2">Rating {item.rating}/5</span>
                  </div>
                </div>

                <div className="flex items-end gap-3 pb-6 border-b border-gray-100">
                   {discountPriceK ? (
                     <>
                        <span className="font-syne font-black text-primary text-5xl tracking-tighter">
                          {discountPriceK}K
                        </span>
                        <span className="text-xl text-gray-300 line-through font-bold mb-1.5">
                          {priceK}K
                        </span>
                        <span className="bg-rose-500 text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1.5 rounded-xl mb-2 ml-2 shadow-lg animate-bounce">
                          Hemat {priceK - discountPriceK}K!
                        </span>
                     </>
                   ) : (
                      <span className="font-syne font-black text-primary text-5xl tracking-tighter">
                        {priceK}K
                      </span>
                   )}
                </div>

                <div className="space-y-4">
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Tentang Menu Ini</h4>
                   <p className="text-gray-600 text-lg leading-relaxed">
                     {item.description}
                   </p>
                </div>

                <div className="pt-6 space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Pesan Sekarang di:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <WAButton 
                      href={`https://wa.me/${business.whatsapp}?text=${item.waText}`}
                      className="w-full text-base font-black uppercase tracking-widest py-4 h-auto rounded-2xl shadow-xl shadow-orange-500/20"
                    >
                      Pesan via WhatsApp
                    </WAButton>
                    
                    {business.goFoodUrl && (
                      <a 
                        href={business.goFoodUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 bg-green-50 hover:bg-green-100 text-green-700 font-black uppercase tracking-widest py-4 rounded-2xl border-2 border-green-100 transition-all active:scale-[0.98]"
                      >
                        <span className="text-2xl">💚</span> GoFood
                      </a>
                    )}

                    {business.shopeeFoodUrl && (
                      <a 
                        href={business.shopeeFoodUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 bg-orange-50 hover:bg-orange-100 text-orange-700 font-black uppercase tracking-widest py-4 rounded-2xl border-2 border-orange-100 transition-all active:scale-[0.98]"
                      >
                        <span className="text-2xl">🧡</span> ShopeeFood
                      </a>
                    )}

                    {business.grabFoodUrl && (
                      <a 
                        href={business.grabFoodUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-black uppercase tracking-widest py-4 rounded-2xl border-2 border-emerald-100 transition-all active:scale-[0.98]"
                      >
                        <span className="text-2xl">🛵</span> GrabFood
                      </a>
                    )}
                  </div>
                </div>
              </div>
           </div>
        </div>
      </main>

      <Footer business={business} />
      <StickyWAButton business={business} />
    </div>
  )
}
