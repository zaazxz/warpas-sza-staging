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