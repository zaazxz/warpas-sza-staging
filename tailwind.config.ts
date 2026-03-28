import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--color-primary)",
          foreground: "var(--color-text-on-primary)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
        },
        background: "var(--color-background)",
        "on-primary": "var(--color-text-on-primary)",
      },
      fontFamily: {
        syne: ["var(--font-syne)", "sans-serif"],
        jakarta: ["var(--font-jakarta)", "sans-serif"],
      },
      animation: {
        "morph-blob": "morphBlob 7s ease-in-out infinite, floatY 3.5s ease-in-out infinite",
        "float": "floatY 3.5s ease-in-out infinite",
        "float-delayed": "floatY 3.5s ease-in-out 0.5s infinite",
        "fade-up": "fadeUp 0.65s ease both",
        "bounce-in": "bounceIn 0.6s 0.8s ease both",
      },
      keyframes: {
        morphBlob: {
          "0%, 100%": { borderRadius: "60% 40% 55% 45% / 50% 60% 40% 50%" },
          "33%": { borderRadius: "40% 60% 45% 55% / 60% 40% 60% 40%" },
          "66%": { borderRadius: "55% 45% 60% 40% / 40% 55% 45% 60%" },
        },
        floatY: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(28px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        bounceIn: {
          from: { transform: "translateX(-50%) scale(0.8)", opacity: "0" },
          to: { transform: "translateX(-50%) scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
}

export default config
