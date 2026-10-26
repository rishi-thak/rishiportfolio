import type { MetadataRoute } from "next";
import { PROJECTS, SITE_URL } from "./content";

// Generated at build time, so lastModified tracks the latest deploy.
export default function sitemap(): MetadataRoute.Sitemap {
     const lastModified = new Date();
     return [
          { url: `${SITE_URL}/`, lastModified, changeFrequency: "monthly", priority: 1 },
          { url: `${SITE_URL}/projects`, lastModified, changeFrequency: "monthly", priority: 0.8 },
          ...PROJECTS.map((p) => ({
               url: `${SITE_URL}/projects/${p.slug}`,
               lastModified,
               changeFrequency: "monthly" as const,
               priority: 0.7,
          })),
     ];
}
