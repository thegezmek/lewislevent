import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/bio";
import { projects } from "@/data/projects";

// Nothing on the site links to the project pages any more, so they are orphans.
// The sitemap is what keeps them discoverable for search and direct links.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projects.map((project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
