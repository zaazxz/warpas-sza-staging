# WARPAS SZA – Landing Page

Landing page high-conversion untuk **WARPAS SZA (Warung Pasta SZA)**, Dawuan Timur, Karawang.

## Tech Stack

| Package | Versi |
|---|---|
| Next.js | 16.1 (App Router) |
| React | 19.2 |
| Zustand | 5 |
| Tailwind CSS | 3.4 |
| TypeScript | 5 |

## Requirements

- **Node.js >= 20.9.0** (requirement Next.js 16)
- npm / yarn / pnpm

## Setup

```bash
# Install dependencies
npm install

# Development server (Turbopack by default di Next.js 16)
npm run dev

# Production build
npm run build
npm start
```

## Struktur Project

```
src/
├── app/
│   ├── page.tsx          # Entry point – semua section disusun di sini
│   ├── layout.tsx        # Root layout + font (Syne + Plus Jakarta Sans)
│   └── globals.css       # Tailwind base + custom keyframes animasi
├── components/
│   ├── sections/         # Tiap section punya file sendiri
│   │   ├── HeroSection.tsx
│   │   ├── ProblemSection.tsx
│   │   ├── MenuSection.tsx
│   │   ├── ProofSection.tsx
│   │   ├── UrgencySection.tsx
│   │   ├── LokasiSection.tsx
│   │   └── FinalCTASection.tsx
│   ├── ui/
│   │   ├── WAButton.tsx  # Reusable WA button (variant: primary/white/amber)
│   │   └── FadeUp.tsx    # Scroll-triggered fade-up wrapper (IntersectionObserver)
│   ├── icons/
│   │   └── WhatsAppIcon.tsx
│   ├── MenuCard.tsx
│   ├── Navbar.tsx        # Scroll-aware via Zustand
│   ├── Footer.tsx
│   └── StickyWAButton.tsx  # Fixed bottom CTA (mobile only)
├── store/
│   └── useUIStore.ts     # Zustand store (scroll state, active section, WA click counter)
├── lib/
│   ├── constants.ts      # Data: menu, testimonial, info bisnis
│   └── utils.ts          # cn(), formatPrice(), buildWaUrl()
└── types/
    └── index.ts          # TypeScript interfaces
```

## Kustomisasi

Semua data bisnis ada di satu tempat: **`src/lib/constants.ts`**

```ts
export const BUSINESS = {
  name: "WARPAS SZA",
  whatsapp: "6281219537456",
  openHour: "09.00",
  closeHour: "17.00",
  // ...
}
```

Untuk ganti menu, edit array `MENU_ITEMS` di file yang sama.

## Next.js 16 – Hal Penting

- **Turbopack** adalah bundler default (dev & build). Tidak perlu flag `--turbopack` lagi.
- **React Compiler** tersedia (opsional) via `reactCompiler: true` di `next.config.mjs`.
- **`middleware.ts`** diganti `proxy.ts` — project ini tidak menggunakan middleware.
- **Node.js minimum 20.9.0**.
- Untuk upgrade otomatis dari versi lama: `npm run upgrade`
