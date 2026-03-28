import { BusinessInfo } from "@/types"

export function Footer({ business }: { business: BusinessInfo }) {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8 text-center text-sm">
      <div className="max-w-5xl mx-auto px-5">
        <p className="text-white/90 font-bold mb-2">
          {business.name} – {business.tagline}
        </p>
        <p>
          📍 {business.address}, {business.city} &nbsp;|&nbsp;{" "}
          📱{" "}
          <a
            href={business.waBaseUrl}
            className="text-accent hover:text-accent/80 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            +{business.whatsapp}
          </a>
          
          {business.instagramUrl && (
            <>
              &nbsp;|&nbsp; 📸{" "}
              <a href={business.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/80 transition-colors">
                Instagram
              </a>
            </>
          )}

          {business.shopeeFoodUrl && (
             <>
               &nbsp;|&nbsp; 🧡{" "}
               <a href={business.shopeeFoodUrl} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/80 transition-colors">
                 ShopeeFood
               </a>
             </>
          )}

          {business.goFoodUrl && (
             <>
               &nbsp;|&nbsp; 💚{" "}
               <a href={business.goFoodUrl} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/80 transition-colors">
                 GoFood
               </a>
             </>
          )}

          &nbsp;|&nbsp; 🕘 {business.openHour}–{business.closeHour}
        </p>
        <p className="mt-3 text-gray-600">
          © {new Date().getFullYear()} {business.name}. Pasta enak, harga ramah.
        </p>
      </div>
    </footer>
  )
}