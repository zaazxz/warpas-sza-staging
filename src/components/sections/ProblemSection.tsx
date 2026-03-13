import { BusinessInfo } from "@/types"

export function ProblemSection({ business }: { business: BusinessInfo }) {
  const painPoints = [
    "😩 Pengen makan enak, tapi kantong lagi tipis...",
    "😤 Makan di luar mahal, masak di rumah males...",
    "🥱 Menu itu-itu aja, bosen tapi gak tau mau makan apa...",
  ]

  return (
    <section id="problem" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Visual */}
          <div className="flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl h-72 md:h-80 shadow-inner text-8xl">
            🤔
          </div>

          {/* Content */}
          <div>
            <div className="mb-6">
              <span className="inline-block bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                Relate gak?
              </span>
              <h2 className="font-syne font-extrabold text-3xl md:text-4xl text-gray-800 leading-tight">
                Lagi laper tapi<br />males ribet?
              </h2>
            </div>

            <div className="flex flex-col gap-3 mb-5">
              {painPoints.map((pain, i) => (
                <div
                  key={i}
                  className="bg-rose-50 border-l-4 border-rose-400 rounded-xl px-5 py-3.5 text-gray-500 font-medium text-sm"
                >
                  {pain}
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-l-4 border-orange-500 rounded-xl p-5">
              <h3 className="font-syne font-bold text-xl text-gray-800 mb-2">
                🍝 {business.name} jawabannya!
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Pasta creamy dan lezat, harga cuma {business.minPrice / 1000}–{business.maxPrice / 1000} ribuan, langsung diproses
                tanpa antri. Tinggal chat, duduk, makan. Sesimple itu.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}