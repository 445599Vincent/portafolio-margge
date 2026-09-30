import { approvedTestimonials } from "@/data/testimonials";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { TestimonialCard } from "@/components/TestimonialCard";

/** Se oculta por completo mientras no existan testimonios reales aprobados. */
export function Testimonials() {
  if (approvedTestimonials.length === 0) return null;
  return (
    <section id="testimonios" aria-labelledby="testimonios-title" className="py-24 sm:py-32 lg:py-40">
      <div className="container-site">
        <SectionTitle eyebrow="Testimonios" id="testimonios-title" title="Lo que dicen de mi trabajo" />
        <div className="mt-16 grid gap-14 md:grid-cols-2 lg:gap-20">
          {approvedTestimonials.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
