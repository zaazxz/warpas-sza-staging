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

export const metadata: Metadata = {
  title: "WARPAS SZA – Warung Pasta Enak Karawang | Mulai 15K",
  description:
    "WARPAS SZA – Pasta hangat enak dan murah di Karawang. Mulai 15K. Order via WhatsApp, balas cepat!",
  keywords: ["Warung Pasta Karawang", "Pasta Enak Karawang", "WARPAS SZA", "makanan murah Karawang"],
  openGraph: {
    title: "WARPAS SZA – Pasta Hangat Favorit Karawang",
    description: "Murah, kenyang, dan bikin nagih. Mulai 15K aja!",
    type: "website",
  },
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <MenuSection />
        <ProofSection />
        <UrgencySection />
        <LokasiSection />
        <FinalCTASection />
      </main>
      <Footer />
      <StickyWAButton />
    </>
  )
}