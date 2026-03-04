/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbopack is stable & default in Next.js 16 — no flag needed

  // React Compiler (stable in Next.js 16): auto-memoizes components
  // set to true to enable (slightly longer compile, faster runtime)
  reactCompiler: false,

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
  },
}

export default nextConfig
