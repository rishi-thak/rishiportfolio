import { PROFILE, SITE_URL } from "../../content";
import { getPosts } from "../posts";

// Built once at deploy time, like the rest of the blog.
export const dynamic = "force-static";

const escape = (s: string) =>
     s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function GET() {
     const posts = await getPosts();
     const items = posts
          .map(
               (p) => `    <item>
      <title>${escape(p.title)}</title>
      <link>${SITE_URL}/blog/${p.slug}</link>
      <guid>${SITE_URL}/blog/${p.slug}</guid>
      <pubDate>${new Date(`${p.date}T12:00:00Z`).toUTCString()}</pubDate>
      <description>${escape(p.description)}</description>
    </item>`,
          )
          .join("\n");

     const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escape(PROFILE.name)}: Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Notes on what I&apos;m building: developer tools, AI systems, and how they work under the hood. Sometimes, thoughts on life and getting better at it.</description>
    <language>en-us</language>
${items}
  </channel>
</rss>
`;
     return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
