import type { MetadataRoute } from "next";
import { visibleProjects } from "@/data/projects";
import { site } from "@/data/site";
import { absoluteSiteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url },
    ...visibleProjects.map((project) => ({
      url: absoluteSiteUrl(`/proyectos/${project.slug}`),
    })),
  ];
}
