import { BUSINESS } from "@/lib/constants"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8 text-center text-sm">
      <div className="max-w-5xl mx-auto px-5">
        <p className="text-white/90 font-bold mb-2">
          {BUSINESS.name} – {BUSINESS.tagline}
        </p>
        <p>
          📍 {BUSINESS.address}, {BUSINESS.city} &nbsp;|&nbsp;{" "}
          📱{" "}
          <a
            href={BUSINESS.waBaseUrl}
            className="text-amber-400 hover:text-amber-300 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            +{BUSINESS.whatsapp}
          </a>{" "}
          &nbsp;|&nbsp; 🕘 {BUSINESS.openHour}–{BUSINESS.closeHour}
        </p>
        <p className="mt-3 text-gray-600">
          © {new Date().getFullYear()} WARPAS SZA. Pasta enak, harga ramah.
        </p>
      </div>
    </footer>
  )
}