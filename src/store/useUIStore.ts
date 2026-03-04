"use client"

import { create } from "zustand"

interface UIStore {
  // Navbar scroll state
  isScrolled: boolean
  setScrolled: (v: boolean) => void

  // Active section for scroll spy
  activeSection: string
  setActiveSection: (section: string) => void

  // Mobile menu (future use)
  mobileMenuOpen: boolean
  toggleMobileMenu: () => void
  closeMobileMenu: () => void

  // WA click tracking
  waClickCount: number
  incrementWaClick: () => void
}

export const useUIStore = create<UIStore>((set) => ({
  isScrolled: false,
  setScrolled: (v) => set({ isScrolled: v }),

  activeSection: "hero",
  setActiveSection: (section) => set({ activeSection: section }),

  mobileMenuOpen: false,
  toggleMobileMenu: () => set((s) => ({ mobileMenuOpen: !s.mobileMenuOpen })),
  closeMobileMenu: () => set({ mobileMenuOpen: false }),

  waClickCount: 0,
  incrementWaClick: () => set((s) => ({ waClickCount: s.waClickCount + 1 })),
}))