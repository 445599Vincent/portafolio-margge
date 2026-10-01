import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Geist, Instrument_Serif } from "next/font/google";
import { site } from "@/data/site";
import { personJsonLd } from "@/lib/seo";
import { validateContent } from "@/lib/validate-content";
import { Navbar } from "@/components/layout/Navbar";
import { visibleNavigation } from "@/data/sections";
import { Footer } from "@/components/layout/Footer";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { Analytics } from "@/components/analytics/Analytics";
import "./globals.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.seo.title, template: `%s | ${site.name}` },
  description: site.seo.description,
  keywords: [...site.seo.keywords],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: "/",
    siteName: site.name,
    title: site.seo.title,
    description: site.seo.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.title,
    description: site.seo.description,
  },
  robots: site.indexable ? { index: true, follow: true } : { index: false, follow: false },
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
    : undefined,
};

const INLINE_HEAD_SCRIPT =
  "document.documentElement.classList.add('js');" +
  // Comentario de Netlify + el espacio en blanco que inserta antes (nodo de texto que React no espera).
  "Array.prototype.slice.call(document.head.childNodes).forEach(function(n){" +
  "if((n.nodeType===8&&/Netlify/.test(n.data))||(n.nodeType===3&&!n.data.trim()))n.remove()});";

export const viewport: Viewport = {
  themeColor: "#f5f2ec",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  // Revisa /src/data: en producción, un error de contenido detiene el build.
  validateContent();
  const jsonLd = personJsonLd();
  return (
    <html
      lang="es"
      className={`${sans.variable} ${serif.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        {/*
          1) Activa las animaciones de aparición solo si hay JavaScript.
          2) Netlify inyecta un comentario HTML dentro de <head>; React no lo espera y la hidratación
             falla (error #418 → re-render completo en el cliente). Se elimina antes de hidratar.
        */}
        <script dangerouslySetInnerHTML={{ __html: INLINE_HEAD_SCRIPT }} />
        {jsonLd && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        )}
      </head>
      <body>
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-paper"
        >
          Saltar al contenido
        </a>
        <Navbar items={visibleNavigation} />
        <main id="contenido">{children}</main>
        <Footer />
        <RevealObserver />
        <Analytics />
      </body>
    </html>
  );
}
