import type { CSSProperties } from "react";
import { process } from "@/data/process";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function Process() {
  return (
    <section id="metodologia" aria-labelledby="metodologia-title" className="bg-paper-2/60 py-24 sm:py-32 lg:py-40">
      <div className="container-site">
        <SectionTitle
          index="05"
          eyebrow="Metodología"
          id="metodologia-title"
          title="Un proceso detrás de cada idea"
          description="La creatividad funciona mejor con estructura. Así acompaño cada proyecto, de principio a fin."
        />
        <ol className="mt-16 grid gap-x-10 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-14">
          {process.map((step, i) => (
            <li
              key={step.title}
              className="group border-t border-ink/15 py-8 sm:py-10"
              data-reveal
              style={{ "--reveal-delay": `${(i % 3) * 90}ms` } as CSSProperties}
            >
              <span className="font-display block text-6xl text-accent/80 transition-colors duration-500 group-hover:text-accent sm:text-7xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 text-xl font-medium">{step.title}</h3>
              <p className="mt-3 max-w-xs leading-relaxed text-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
