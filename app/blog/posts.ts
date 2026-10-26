import fs from "node:fs";
import path from "node:path";

/*
 * Blog posts are .mdx files in content/blog. Each one exports its own metadata:
 *
 *   export const metadata = { title, description, date: "2026-10-26", draft: true };
 *
 * Posts marked `draft: true` show up while developing locally (with a Draft
 * label) but are left out of the live site, the sitemap and the RSS feed.
 */

export type PostMeta = {
     title: string;
     description: string;
     /** ISO date, e.g. "2026-10-26". */
     date: string;
     draft?: boolean;
};

export type Post = PostMeta & { slug: string; readingMinutes: number };

const POSTS_DIR = path.join(process.cwd(), "content/blog");
const SHOW_DRAFTS = process.env.NODE_ENV !== "production";

export async function getPosts(): Promise<Post[]> {
     if (!fs.existsSync(POSTS_DIR)) return [];
     const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));
     const posts = await Promise.all(
          files.map(async (file) => {
               const slug = file.replace(/\.mdx$/, "");
               const { metadata } = (await import(`../../content/blog/${slug}.mdx`)) as { metadata: PostMeta };
               const words = fs.readFileSync(path.join(POSTS_DIR, file), "utf8").split(/\s+/).length;
               return { ...metadata, slug, readingMinutes: Math.max(1, Math.round(words / 230)) };
          }),
     );
     return posts.filter((p) => SHOW_DRAFTS || !p.draft).sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPost(slug: string) {
     return (await getPosts()).find((p) => p.slug === slug);
}

/** "2026-10-26" → "October 26, 2026", in a fixed time zone so it never shifts a day. */
export function formatDate(iso: string) {
     return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          timeZone: "UTC",
     });
}
