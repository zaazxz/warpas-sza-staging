import { WAButton } from "@/components/ui/WAButton"
import { BUSINESS } from "@/lib/constants"

export function UrgencySection() {
  const chips = [
    { icon: "🕘", label: `${BUSINESS.openHour} – ${BUSINESS.closeHour}` },
    { icon: "📍", label: `${BUSINESS.address}, ${BUSINESS.city.split(",")[0]}` },
    { icon: "💰", label: "Mulai 15K" },
  ]

  return (
    <section id="urgency" className="relative py-16 bg-amber-400 overflow-hidden">
      {/* decorative */}
      <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-[16rem] opacity-[0.07] select-none">
        ⚡
      </span>

      <div className="relative z-10 max-w-5xl mx-auto px-5">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Text */}
          <div>
            <h2 className="font-syne font-extrabold text-2xl md:text-3xl text-amber-900 mb-2">
              ⏰ Buka Cuma Sampai Jam 17.00!
            </h2>
            <p className="text-amber-800 text-sm">
              Biasanya udah habis sebelum sore. Jangan sampai kehabisan ya!
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {chips.map((chip) => (
                <span
                  key={chip.label}
                  className="flex items-center gap-1.5 bg-white/50 border-2 border-amber-800/20 rounded-full px-3 py-1.5 text-xs font-bold text-amber-900"
                >
                  {chip.icon} {chip.label}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <WAButton href={BUSINESS.waBaseUrl} variant="amber" size="md">
            Pesan Sekarang Sebelum Habis!
          </WAButton>
        </div>
      </div>
    </section>
  )
}