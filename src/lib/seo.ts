import { heroPhoto } from "@/data/about";
import { site } from "@/data/site";
import { isPlaceholder } from "@/lib/content";
import type { Project } from "@/lib/types";

function confirmed(text: string | undefined | null): string | undefined {
  if (isPlaceholder(text)) return undefined;
  return text?.trim() || undefined;
}

export function absoluteSiteUrl(path: string): string {
  return new URL(path, site.url).toString();
}

export function personJsonLd(): Record<string, unknown> | null {
  const name = confirmed(site.name);
  if (!name) return null;

  const jobTitle = confirmed(site.title);
  const image = confirmed(heroPhoto.src);
  const sameAs = [site.social.linkedin, site.social.instagram]
    .map(confirmed)
    .filter((url): url is string => Boolean(url));

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    ...(jobTitle && { jobTitle }),
    url: site.url,
    ...(image && { image: absoluteSiteUrl(image) }),
    ...(sameAs.length > 0 && { sameAs }),
  };
}

export function projectJsonLd(project: Project): Record<string, unknown> | null {
  const identifier = confirmed(project.slug);
  if (!identifier) return null;

  const personName = confirmed(site.name);
  const name = confirmed(project.title);
  const description = confirmed(project.summary);
  const dateCreated = confirmed(project.year);
  const genre = confirmed(project.type);
  const about = confirmed(project.industry);
  const image = confirmed(project.cover.src);
  const hasConfirmedResponsibility = project.involvement.responsibleFor.some(
    (item) => Boolean(confirmed(item)),
  );
  const url = absoluteSiteUrl(`/proyectos/${identifier}`);

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    identifier,
    url,
    mainEntityOfPage: url,
    inLanguage: site.locale.replace("_", "-"),
    isPartOf: {
      "@type": "WebSite",
      url: site.url,
      ...(personName && { name: personName }),
    },
    ...(name && { name }),
    ...(description && { description }),
    ...(dateCreated && { dateCreated }),
    ...(genre && { genre }),
    ...(about && { about }),
    ...(image && { image: absoluteSiteUrl(image) }),
    ...(hasConfirmedResponsibility && personName && {
      contributor: { "@type": "Person", name: personName, url: site.url },
    }),
  };
}
