export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  emoji: string
  badge: string
  badgeColor: string
  rating: number
  waText: string
  available: boolean
}

export interface Theme {
  primary: string    // hex color, e.g. "#f97316"
  accent: string     // hex color, e.g. "#fb923c"
  textOnPrimary: string // e.g. "#ffffff"
}

export interface Testimonial {
  id: string
  name: string
  location: string
  text: string
  avatar: string
  rating: number
}

export interface BusinessInfo {
  name: string
  tagline: string
  address: string
  city: string
  whatsapp: string
  openHour: string
  closeHour: string
  minPrice: number
  maxPrice: number
  mapEmbedUrl: string
  waBaseUrl: string
}

export const DEFAULT_THEME: Theme = {
  primary: "#f97316",
  accent: "#fb923c",
  textOnPrimary: "#ffffff",
}