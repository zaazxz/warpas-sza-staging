import type { Metadata } from "next"
import { HeroSection } from "@/components/sections/HeroSection"
import { ProblemSection } from "@/components/sections/ProblemSection"
import { MenuSection } from "@/components/sections/MenuSection"
import { ProofSection } from "@/components/sections/ProofSection"
import { UrgencySection } from "@/components/sections/UrgencySection"
import { LokasiSection } from "@/components/sections/LokasiSection"
import { FinalCTASection } from "@/components/sections/FinalCTASection"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { StickyWAButton } from "@/components/StickyWAButton"
import { OrderingPlatforms } from "@/components/OrderingPlatforms"
import { getDb } from "@/lib/data-service"

export const metadata: Metadata = {
  title: "WARPAS SZA – Warung Pasta Enak Karawang | Mulai 15K",
  description:
    "WARPAS SZA – Pasta hangat enak and murah di Karawang. Mulai 15K. Order via WhatsApp, balas cepat!",
  keywords: ["Warung Pasta Karawang", "Pasta Enak Karawang", "WARPAS SZA", "makanan murah Karawang"],
  openGraph: {
    title: "WARPAS SZA – Pasta Hangat Favorit Karawang",
    description: "Murah, kenyang, and bikin nagih. Mulai 15K aja!",
    type: "website",
  },
}

export default async function HomePage() {
  const db = getDb()
  const { business, menu, testimonials } = db

  return (
    <>
      <Navbar business={business} />
      <main>
        <HeroSection business={business} />
        <OrderingPlatforms business={business} />
        <ProblemSection business={business} />
        <MenuSection business={business} items={menu} />
        <ProofSection testimonials={testimonials} />
        <UrgencySection business={business} />
        <LokasiSection business={business} />
        <FinalCTASection business={business} />
      </main>
      <Footer business={business} />
      <StickyWAButton business={business} />
    </>
  )
}