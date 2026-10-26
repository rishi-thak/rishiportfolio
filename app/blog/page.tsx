import type { Metadata } from "next";
import Link from "next/link";
import { PROFILE } from "../content";
import { DISPLAY_TITLE, SelectedTitle, SiteFooter, SiteHeader, WRAP } from "../components/site-chrome";
import { formatDate, getPosts } from "./posts";

const description = `Notes by ${PROFILE.name} on building developer tools and AI systems, and how they work under the hood. Sometimes, thoughts on life and getting better at it.`;

export async function generateMetadata(): Promise<Metadata> {
     const posts = await getPosts();
     return {
          title: "Blog",
          description,
          alternates: { canonical: "/blog", types: { "application/rss+xml": "/blog/rss.xml" } },
          openGraph: { title: `Blog · ${PROFILE.name}`, description, url: "/blog" },
          // Keep an empty blog out of search results until the first post is live.
          ...(posts.length === 0 && { robots: { index: false, follow: true } }),
     };
}

export default async function BlogIndex() {
     const posts = await getPosts();
     return (
          <>
               <SiteHeader />
               <main className={WRAP}>
                    <section className="pt-[clamp(48px,8vw,96px)] pb-12">
                         <SelectedTitle className={DISPLAY_TITLE}>Blog</SelectedTitle>
                         <p className="mt-8 max-w-[44ch] text-[clamp(19px,2vw,22px)] leading-snug text-slate">
                              Notes on what I&apos;m building: developer tools, AI systems, and how they work under the hood. Sometimes, thoughts on life and getting better at it.
                         </p>
                    </section>

                    {posts.length === 0 ? (
                         <p className="border-t border-rule pt-8 text-[17px] text-slate">The first post is on its way.</p>
                    ) : (
                         <ol className="border-t border-rule">
                              {posts.map((p) => (
                                   <li key={p.slug} className="border-b border-rule">
                                        <article className="relative grid gap-x-10 gap-y-2 py-8 md:grid-cols-[180px_minmax(0,1fr)]">
                                             <p className="text-[15px] text-slate">
                                                  <time dateTime={p.date}>{formatDate(p.date)}</time>
                                                  {p.draft && <span className="ml-2 rounded bg-select px-1.5 py-0.5 text-[12px] text-white">Draft</span>}
                                             </p>
                                             <div>
                                                  <h2 className="font-serif text-[clamp(28px,3.4vw,38px)] leading-tight font-normal">
                                                       {/* The title link covers the whole row, so the row is one click target. */}
                                                       <Link href={`/blog/${p.slug}`} className="link after:absolute after:inset-0">
                                                            {p.title}
                                                       </Link>
                                                  </h2>
                                                  <p className="mt-2 max-w-[62ch] leading-relaxed text-slate">{p.description}</p>
                                                  <p className="mt-3 text-[14px] text-slate">{p.readingMinutes} min read</p>
                                             </div>
                                        </article>
                                   </li>
                              ))}
                         </ol>
                    )}
               </main>
               <SiteFooter minimal />
          </>
     );
}
