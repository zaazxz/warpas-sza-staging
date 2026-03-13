import { BusinessInfo } from "@/types"
import { WAButton } from "@/components/ui/WAButton"

export function FinalCTASection({ business }: { business: BusinessInfo }) {
  return (
    <section
      id="finalcta"
      className="relative py-24 text-center overflow-hidden bg-gradient-to-br from-orange-600 via-orange-500 to-amber-400"
    >
      {/* Decorative emoji bg */}
      <span className="pointer-events-none absolute left-0 bottom-0 text-[16rem] opacity-[0.07] leading-none select-none">
        🍝
      </span>
      <span className="pointer-events-none absolute right-0 top-0 text-[14rem] opacity-[0.07] leading-none select-none">
        🔥
      </span>

      <div className="relative z-10 max-w-2xl mx-auto px-5">
        <span className="inline-block bg-white/20 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-5">
          Tunggu Apa Lagi?
        </span>
        <h2 className="font-syne font-extrabold text-4xl md:text-5xl text-white mb-4 [text-shadow:0_2px_20px_rgba(0,0,0,0.2)]">
          Laper Gak Nunggu Nanti.
        </h2>
        <p className="text-white/85 text-lg mb-8">
          Klik sekarang. 1 menit langsung diproses.
        </p>

        <WAButton
          href={business.waBaseUrl}
          variant="white"
          size="lg"
          className="font-syne shadow-2xl"
        >
          Pesan via WhatsApp Sekarang 🔥
        </WAButton>

        <p className="text-white/60 text-sm mt-4">
          ✅ Tanpa minimum order · Balas cepat · Langsung diproses
        </p>
      </div>
    </section>
  )
}