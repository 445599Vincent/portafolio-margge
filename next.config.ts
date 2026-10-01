import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Disponible también en componentes cliente (ver `showPlaceholders` en src/lib/content.ts).
  env: { SHOW_PLACEHOLDERS: process.env.SHOW_PLACEHOLDERS ?? "" },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
