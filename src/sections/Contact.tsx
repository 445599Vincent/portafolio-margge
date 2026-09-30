import { contactContent } from "@/data/contact";
import { site } from "@/data/site";
import { publishedProjects } from "@/data/projects";
import { isPlaceholder } from "@/lib/content";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SocialLinks } from "@/components/SocialLinks";
import { Content } from "@/components/ui/Content";
import { ContactForm } from "./ContactForm";

export function Contact() {
  // Títulos para el mensaje sugerido al llegar desde un caso de estudio (null si aún es provisional)
  const projectTitles = Object.fromEntries(
    publishedProjects.map((p) => [p.slug, isPlaceholder(p.title) ? null : p.title]),
  );

  return (
    <section id="contacto" aria-labelledby="contacto-title" className="py-24 sm:py-32 lg:py-40">
      <div className="container-site grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
        <div>
          <SectionTitle
            index="06"
            eyebrow="Contacto"
            id="contacto-title"
            title={contactContent.formHeading}
            description={contactContent.formText}
          />
          <div className="mt-12 space-y-8 border-t border-line pt-8" data-reveal>
            <div>
              <h3 className="eyebrow text-muted">Contacto directo</h3>
              <SocialLinks className="mt-3 flex-col gap-y-0!" />
            </div>
            <div>
              <h3 className="eyebrow text-muted">Ubicación</h3>
              <Content text={site.contact.location} as="p" className="mt-3 text-sm" />
            </div>
          </div>
        </div>
        <div data-reveal>
          <ContactForm projectTitles={projectTitles} />
        </div>
      </div>
    </section>
  );
}
