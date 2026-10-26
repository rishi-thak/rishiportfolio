import type { MetadataRoute } from "next";
import { PROJECTS, SITE_URL } from "./content";
import { getPosts } from "./blog/posts";

// Generated at build time, so lastModified tracks the latest deploy.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
     const lastModified = new Date();
     const posts = await getPosts();
     return [
          { url: `${SITE_URL}/`, lastModified, changeFrequency: "monthly", priority: 1 },
          { url: `${SITE_URL}/projects`, lastModified, changeFrequency: "monthly", priority: 0.8 },
          { url: `${SITE_URL}/work`, lastModified, changeFrequency: "monthly", priority: 0.8 },
          ...PROJECTS.map((p) => ({
               url: `${SITE_URL}/projects/${p.slug}`,
               lastModified,
               changeFrequency: "monthly" as const,
               priority: 0.7,
          })),
          ...(posts.length > 0
               ? [{ url: `${SITE_URL}/blog`, lastModified, changeFrequency: "weekly" as const, priority: 0.7 }]
               : []),
          ...posts.map((p) => ({
               url: `${SITE_URL}/blog/${p.slug}`,
               lastModified: new Date(`${p.date}T12:00:00Z`),
               changeFrequency: "yearly" as const,
               priority: 0.6,
          })),
     ];
}
