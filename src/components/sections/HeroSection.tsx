"use client"

import { WAButton } from "@/components/ui/WAButton"
import { BusinessInfo } from "@/types"

export function HeroSection({ business }: { business: BusinessInfo }) {
  return (
    <section
      id="hero"
      className="relative min-h-dvh flex items-center pt-20 overflow-hidden
                 bg-gradient-to-br from-background via-white/50 to-accent/5"
    >
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-[480px] h-[480px] rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 w-[360px] h-[360px] rounded-full bg-primary/10 blur-3xl" />

      <div className="relative z-10 max-w-5xl mx-auto px-5 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* ── TEXT ── */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            {/* Badge */}
            <span className="inline-flex items-center gap-1.5 bg-accent text-zinc-900 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 animate-fade-up">
              🔥 Mulai 15K Aja!
            </span>

            {/* Headline */}
            <h1 className="font-syne font-extrabold text-4xl md:text-5xl leading-tight text-gray-800 mb-4 animate-fade-up animation-delay-100">
              WARPAS SZA –<br />
              Pasta Hangat{" "}
              <span className="text-primary">15 Ribuan</span>
              <br />
              Favorit Karawang 🍝
            </h1>

            {/* Sub */}
            <p className="text-gray-500 text-lg leading-relaxed mb-7 max-w-md animate-fade-up animation-delay-200">
              Murah, kenyang, dan bikin nagih.
              <br />
              Comfort food harian yang gak bikin dompet nangis.
            </p>

            {/* CTA Group */}
            <div className="flex flex-col items-center md:items-start gap-3 animate-fade-up animation-delay-300">
              <WAButton
                href={business.waBaseUrl}
                size="lg"
                className="font-syne shadow-primary/20"
              >
                Pesan Sekarang via WhatsApp
              </WAButton>
              
              {/* Other Platforms */}
              {(business.shopeeFoodUrl || business.goFoodUrl || business.instagramUrl) && (
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 w-full md:w-auto">Atau pesan lewat:</span>
                  <div className="flex gap-3">
                    {business.shopeeFoodUrl && (
                      <a href={business.shopeeFoodUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-xl shadow-sm hover:scale-110 transition-transform" title="ShopeeFood">
                        🧡
                      </a>
                    )}
                    {business.goFoodUrl && (
                      <a href={business.goFoodUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-xl shadow-sm hover:scale-110 transition-transform" title="GoFood">
                        💚
                      </a>
                    )}
                    {business.instagramUrl && (
                      <a href={business.instagramUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-xl shadow-sm hover:scale-110 transition-transform" title="Instagram">
                        📸
                      </a>
                    )}
                  </div>
                </div>
              )}

              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tight mt-2">
                ✅ Balas cepat · Tanpa ribet · Tanpa minimum order
              </p>
            </div>
          </div>

          {/* ── VISUAL ── */}
          <div className="relative flex justify-center items-center order-first md:order-last animate-fade-up animation-delay-200">
            {/* Pasta blob */}
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-[60%_40%_55%_45%/50%_60%_40%_50%] bg-gradient-to-br from-accent to-primary flex items-center justify-center text-8xl md:text-9xl shadow-2xl shadow-primary/40 border-4 border-accent/50 animate-morph-blob">
              🍝
            </div>

            {/* Price pill */}
            <div className="absolute top-4 right-4 md:-right-2 bg-white border-2 border-accent rounded-full px-4 py-2 font-syne font-extrabold text-primary text-sm shadow-xl shadow-accent/20 animate-float-delayed">
              Mulai 15K 🤑
            </div>

            {/* Star pill */}
            <div className="absolute bottom-6 -left-2 md:-left-4 bg-white rounded-2xl px-3 py-2 text-sm font-bold text-gray-800 shadow-[0_4px_20px_rgba(0,0,0,0.1)] flex items-center gap-1 animate-float">
              ⭐⭐⭐⭐⭐ Favorit Karawang
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}