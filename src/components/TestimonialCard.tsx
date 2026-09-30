import type { Testimonial } from "@/lib/types";

const relationLabel: Record<Testimonial["relation"], string> = {
  cliente: "Cliente",
  supervisor: "Supervisor/a",
  compañero: "Colega",
  marca: "Marca",
};

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full flex-col justify-between border-t border-ink/80 pt-8" data-reveal>
      <blockquote className="font-display text-2xl leading-snug sm:text-3xl">
        <p>“{testimonial.quote}”</p>
      </blockquote>
      <figcaption className="mt-8 text-sm">
        <span className="block font-medium">{testimonial.author}</span>
        <span className="block text-muted">
          {testimonial.role}, {testimonial.company} · {relationLabel[testimonial.relation]}
        </span>
      </figcaption>
    </figure>
  );
}
