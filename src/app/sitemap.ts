import type { MetadataRoute } from "next";
import { publishedProjects } from "@/data/projects";
import { site } from "@/data/site";
import { absoluteSiteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url },
    ...publishedProjects.map((project) => ({
      url: absoluteSiteUrl(`/proyectos/${project.slug}`),
    })),
  ];
}
