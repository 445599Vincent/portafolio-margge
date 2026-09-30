import type { CSSProperties } from "react";
import { brands } from "@/data/brands";
import { BrandLogo } from "@/components/BrandLogo";

export function Brands() {
  if (brands.length === 0) return null;
  return (
    <section aria-labelledby="marcas-title" className="border-y border-line">
      <div className="container-site grid gap-8 py-14 sm:py-20 lg:grid-cols-[14rem_1fr] lg:gap-16">
        <div data-reveal>
          <h2 id="marcas-title" className="eyebrow text-muted">
            Marcas con las que he trabajado
          </h2>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            Experiencia en agencia con marcas de distintos sectores.
          </p>
        </div>
        <ul
          className="grid grid-cols-2 gap-px overflow-hidden bg-line sm:grid-cols-4"
          data-reveal
          style={{ "--reveal-delay": "100ms" } as CSSProperties}
        >
          {brands.map((brand) => (
            <li key={brand.id} className="bg-paper">
              <BrandLogo brand={brand} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
