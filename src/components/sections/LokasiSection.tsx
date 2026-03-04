import { BUSINESS } from "@/lib/constants"
import { WAButton } from "@/components/ui/WAButton"

export function LokasiSection() {
  return (
    <section id="lokasi" className="py-20 bg-orange-50">
      <div className="max-w-5xl mx-auto px-5">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
            Lokasi Kami
          </span>
          <h2 className="font-syne font-extrabold text-3xl md:text-4xl text-gray-800 mb-2">
            Temukan WARPAS SZA 📍
          </h2>
          <p className="text-gray-400">Mudah dijangkau, suasana santai, parkir nyaman.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Map */}
          <div className="rounded-3xl overflow-hidden shadow-lg border-2 border-orange-200 h-72 md:h-80">
            <iframe
              src={BUSINESS.mapEmbedUrl}
              className="w-full h-full"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi WARPAS SZA"
            />
          </div>

          {/* Info card */}
          <div className="bg-white rounded-3xl p-7 shadow-md">
            <h3 className="font-syne font-bold text-xl text-gray-800 mb-5">Info Lengkap</h3>

            {[
              { icon: "📍", label: "Alamat", value: `${BUSINESS.address}, ${BUSINESS.city}` },
              {
                icon: "🕘",
                label: "Jam Operasional",
                value: `${BUSINESS.openHour} – ${BUSINESS.closeHour} WIB`,
                extra: (
                  <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-800 text-xs font-bold px-2.5 py-0.5 rounded-full mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    Buka Setiap Hari
                  </span>
                ),
              },
              {
                icon: "💰",
                label: "Harga",
                value: `Mulai Rp ${BUSINESS.minPrice.toLocaleString("id-ID")} – Rp ${BUSINESS.maxPrice.toLocaleString("id-ID")}`,
              },
              { icon: "📱", label: "WhatsApp Order", value: `+${BUSINESS.whatsapp}` },
            ].map((row) => (
              <div key={row.label} className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-lg shrink-0">
                  {row.icon}
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wide">{row.label}</p>
                  <p className="text-sm font-semibold text-gray-800 mt-0.5">{row.value}</p>
                  {row.extra}
                </div>
              </div>
            ))}

            <WAButton
              href={BUSINESS.waBaseUrl}
              className="w-full justify-center mt-5"
            >
              Chat & Tanya Lokasi
            </WAButton>
          </div>
        </div>
      </div>
    </section>
  )
}