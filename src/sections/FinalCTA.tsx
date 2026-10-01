import { contactContent } from "@/data/contact";
import { CTA } from "@/components/CTA";
import { SocialLinks } from "@/components/SocialLinks";
import { getContactChannels } from "@/lib/content";

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
        {getContactChannels().length > 0 && <SocialLinks />}
      </CTA>
    </section>
  );
}
