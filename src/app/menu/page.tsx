import Link from "next/link"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { MenuCard } from "@/components/MenuCard"
import { getDb } from "@/lib/data-service"
import { StickyWAButton } from "@/components/StickyWAButton"

export default async function MenuPage() {
  const db = getDb()
  const { business, menu } = db
  
  // Only show available items on public menu page
  const availableMenu = menu.filter(item => item.available !== false)

  return (
    <div className="min-h-screen bg-background">
      <Navbar business={business} />
      
      <main className="pt-24 pb-20 bg-background">
        <div className="max-w-5xl mx-auto px-5">
          {/* Header */}
          <div className="mb-12">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest mb-6 hover:translate-x-[-4px] transition-transform"
            >
              ← Kembali ke Beranda
            </Link>
            <h1 className="font-syne font-extrabold text-4xl md:text-5xl text-gray-900 mb-4 tracking-tighter">
              Katalog Menu <span className="text-primary">WARPAS SZA</span>
            </h1>
            <p className="text-gray-500 max-w-2xl leading-relaxed">
              Semua pasta favorit kamu ada di sini. Pilih, pesan via WhatsApp, and nikmati kelezatannya selagi hangat!
            </p>
          </div>

          {/* Menu Grid */}
          {availableMenu.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {availableMenu.map((item) => (
                <MenuCard key={item.id} item={item} business={business} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-gray-200">
              <span className="text-6xl mb-4 block">😔</span>
              <h3 className="text-xl font-bold text-gray-800">Ups, menu sedang tidak tersedia</h3>
              <p className="text-gray-500">Silakan cek kembali nanti atau hubungi kami via WhatsApp.</p>
            </div>
          )}
        </div>
      </main>

      <Footer business={business} />
      <StickyWAButton business={business} />
    </div>
  )
}
