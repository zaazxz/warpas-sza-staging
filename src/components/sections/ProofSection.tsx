import type { Testimonial } from "@/types"

function ChatBubble({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="relative bg-orange-50 border border-orange-100 rounded-3xl p-5 shadow-sm">
      {/* Big quote mark */}
      <span className="absolute top-0 left-4 font-syne font-extrabold text-5xl text-amber-400 leading-none select-none">
        "
      </span>
      <p className="mt-4 text-gray-800 text-sm font-medium leading-relaxed">
        {testimonial.text}
      </p>
      <div className="flex items-center gap-3 mt-4">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-lg shrink-0">
          {testimonial.avatar}
        </div>
        <div>
          <p className="font-bold text-gray-800 text-sm">{testimonial.name}</p>
          <p className="text-gray-400 text-xs">
            {"⭐".repeat(testimonial.rating)} · {testimonial.location}
          </p>
        </div>
      </div>
    </div>
  )
}

export function ProofSection({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section id="proof" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-5">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
            Kata Mereka
          </span>
          <h2 className="font-syne font-extrabold text-3xl md:text-4xl text-gray-800">
            Bukan Kami yang Bilang,
            <br />
            Tapi Pelanggan Kami 😍
          </h2>
        </div>

        {/* Bubbles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {testimonials.map((t) => (
            <ChatBubble key={t.id} testimonial={t} />
          ))}
        </div>

        {/* Aggregate rating */}
        <div className="bg-gradient-to-br from-orange-50 to-rose-50 rounded-3xl p-10 text-center">
          <p className="font-syne font-extrabold text-6xl text-orange-500">4.9</p>
          <p className="text-2xl text-amber-400 my-1">⭐⭐⭐⭐⭐</p>
          <p className="text-gray-400 text-sm">Dari ratusan pelanggan setia WARPAS SZA</p>
        </div>
      </div>
    </section>
  )
}