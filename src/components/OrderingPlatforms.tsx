import { BusinessInfo } from "@/types"

export function OrderingPlatforms({ business }: { business: BusinessInfo }) {
  const platforms = [
    {
      name: "ShopeeFood",
      url: business.shopeeFoodUrl,
      icon: "🧡",
      color: "bg-orange-50",
      textColor: "text-orange-600",
      borderColor: "border-orange-200",
      label: "Order Lewat Shopee"
    },
    {
      name: "GoFood",
      url: business.goFoodUrl,
      icon: "💚",
      color: "bg-green-50",
      textColor: "text-green-600",
      borderColor: "border-green-200",
      label: "Order Lewat Gojek"
    },
    {
      name: "Instagram",
      url: business.instagramUrl,
      icon: "📸",
      color: "bg-rose-50",
      textColor: "text-rose-600",
      borderColor: "border-rose-200",
      label: "Cek IG Kita"
    }
  ].filter(p => p.url)

  if (platforms.length === 0) return null

  return (
    <section className="py-12 bg-white">
      <div className="max-w-5xl mx-auto px-5">
        <div className="text-center mb-8">
           <h3 className="font-syne font-black text-xl text-gray-800 uppercase tracking-widest">
              Laper? Langsung Cek Di Sini 👇
           </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {platforms.map((p) => (
            <a 
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${p.color} ${p.borderColor} border-2 rounded-3xl p-6 flex flex-col items-center gap-3 transition-all hover:scale-[1.03] hover:shadow-xl active:scale-[0.98]`}
            >
              <span className="text-4xl">{p.icon}</span>
              <div className="text-center">
                <p className={`font-black uppercase tracking-widest text-[10px] ${p.textColor}`}>{p.name}</p>
                <p className="font-syne font-extrabold text-gray-800">{p.label}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
