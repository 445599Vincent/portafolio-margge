import { contactContent } from "@/data/contact";
import { CTA } from "@/components/CTA";
import { SocialLinks } from "@/components/SocialLinks";

export function FinalCTA() {
  return (
    <section aria-labelledby="cta-title">
      <CTA
        headingId="cta-title"
        heading={contactContent.ctaHeading}
        text={contactContent.ctaText}
        buttonLabel={contactContent.ctaButton}
        href="/#contacto"
      >
        <SocialLinks />
      </CTA>
    </section>
  );
}
