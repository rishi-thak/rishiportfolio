import type { MetadataRoute } from "next";

// Generated at build time so lastModified tracks the latest deploy on its own —
// the previous public/sitemap.xml was hand-written and had gone three months stale.
export default function sitemap(): MetadataRoute.Sitemap {
     return [
          {
               url: "https://rishithakkar.com/",
               lastModified: new Date(),
               changeFrequency: "weekly",
               priority: 1.0,
          },
     ];
}
