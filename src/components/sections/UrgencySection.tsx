import { WAButton } from "@/components/ui/WAButton"
import { BusinessInfo } from "@/types"

export function UrgencySection({ business }: { business: BusinessInfo }) {
  const chips = [
    { icon: "🕘", label: `${business.openHour} – ${business.closeHour}` },
    { icon: "📍", label: `${business.address}, ${business.city.split(",")[0]}` },
    { icon: "💰", label: `Mulai ${business.minPrice / 1000}K` },
  ]

  return (
    <section id="urgency" className="relative py-16 bg-primary overflow-hidden">
      {/* decorative */}
      <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-[16rem] opacity-[0.1] select-none text-white">
        ⚡
      </span>

      <div className="relative z-10 max-w-5xl mx-auto px-5">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Text */}
          <div>
            <h2 className="font-syne font-extrabold text-2xl md:text-3xl text-white mb-2">
              ⏰ Buka Cuma Sampai Jam {business.closeHour}!
            </h2>
            <p className="text-white/80 text-sm">
              Biasanya udah habis sebelum sore. Jangan sampai kehabisan ya!
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {chips.map((chip) => (
                <span
                  key={chip.label}
                  className="flex items-center gap-1.5 bg-white/20 border-2 border-white/20 rounded-full px-3 py-1.5 text-xs font-bold text-white uppercase tracking-wider"
                >
                  {chip.icon} {chip.label}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <WAButton href={business.waBaseUrl} variant="white" size="md">
            Pesan Sekarang Sebelum Habis!
          </WAButton>
        </div>
      </div>
    </section>
  )
}