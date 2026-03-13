import { MenuItem, Testimonial, BusinessInfo, Theme, DEFAULT_THEME } from "@/types"

export interface DbSchema {
  business: BusinessInfo
  menu: MenuItem[]
  testimonials: Testimonial[]
  theme: Theme
  user: {
    username: string
    passwordHash: string
  }
}

// Default initial data
export const INITIAL_DATA = {
  business: {
    name: "WARPAS SZA",
    tagline: "Warung Pasta SZA",
    address: "Dawuan Timur",
    city: "Karawang, Jawa Barat",
    whatsapp: "6281219537456",
    openHour: "09.00",
    closeHour: "17.00",
    minPrice: 15000,
    maxPrice: 30000,
    mapEmbedUrl: "https://maps.google.com/maps?q=-6.381605,107.452321&z=16&output=embed",
    waBaseUrl: "https://wa.me/6281219537456?text=Halo%20saya%20mau%20order%20WARPAS%20SZA",
  },
  menu: [
    {
      id: "carbonara",
      name: "Pasta Carbonara Creamy",
      description: "Saus carbonara creamy dengan keju leleh. Nagih banget, porsi gak pelit!",
      price: 15000,
      emoji: "🍝",
      badge: "Best Seller 🔥",
      badgeColor: "bg-orange-500",
      rating: 5,
      available: true,
      waText: "Halo%20saya%20mau%20order%20Pasta%20Carbonara%20WARPAS%20SZA",
    },
    {
      id: "bolognese",
      name: "Pasta Bolognese Spesial",
      description: "Saus tomat rich dengan daging cincang, bumbu rempah rahasia warung.",
      price: 18000,
      emoji: "🍅",
      badge: "Favorit!",
      badgeColor: "bg-rose-500",
      rating: 5,
      available: true,
      waText: "Halo%20saya%20mau%20order%20Pasta%20Bolognese%20WARPAS%20SZA",
    },
    {
      id: "aglio",
      name: "Aglio e Olio Pedas",
      description: "Bawang putih, cabai, olive oil. Simpel tapi bikin ketagihan!",
      price: 20000,
      emoji: "🧄",
      badge: "New!",
      badgeColor: "bg-green-600",
      rating: 5,
      available: true,
      waText: "Halo%20saya%20mau%20order%20Aglio%20e%20Olio%20WARPAS%20SZA",
    },
    {
      id: "formaggi",
      name: "Pasta 4 Formaggi",
      description: "Empat keju meleleh dalam satu mangkuk. Level comfort food selanjutnya!",
      price: 28000,
      emoji: "🧀",
      badge: "Premium",
      badgeColor: "bg-amber-600",
      rating: 5,
      available: true,
      waText: "Halo%20saya%20mau%20order%20Pasta%204%20Formaggi%20WARPAS%20SZA",
    },
  ],
  theme: DEFAULT_THEME,
  testimonials: [
    {
      id: "1",
      name: "Rina F.",
      location: "Karawang Barat",
      text: "Baru coba sekali langsung repeat order 😭🔥 Carbonara-nya beneran creamy, gak kalah sama resto mahal!",
      avatar: "👩",
      rating: 5,
    },
    {
      id: "2",
      name: "Dika P.",
      location: "Dawuan",
      text: "Ternyata seenak itu! Udah rekomendasiin ke semua temen kantor. Harganya bikin hepi banget 🙌",
      avatar: "👨",
      rating: 5,
    },
    {
      id: "3",
      name: "Sari M.",
      location: "Cikampek",
      text: "Langsung dibalas WA-nya, gak lama. Pesannya gampang banget. Rasa? Udah 5x order minggu ini 😂",
      avatar: "👩",
      rating: 5,
    },
  ],
}
