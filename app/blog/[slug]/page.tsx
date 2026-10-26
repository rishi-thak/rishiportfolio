import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROFILE, SITE_URL } from "../../content";
import { SelectedTitle, SiteFooter, SiteHeader, WRAP } from "../../components/site-chrome";
import { formatDate, getPost, getPosts } from "../posts";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
     return (await getPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
     const post = await getPost((await params).slug);
     if (!post) return {};
     const url = `/blog/${post.slug}`;
     return {
          title: post.title,
          description: post.description,
          alternates: { canonical: url },
          openGraph: {
               type: "article",
               title: post.title,
               description: post.description,
               url,
               publishedTime: post.date,
               authors: [PROFILE.fullName],
          },
     };
}

export default async function BlogPost({ params }: Props) {
     const { slug } = await params;
     const post = await getPost(slug);
     if (!post) notFound();
     const { default: Content } = await import(`../../../content/blog/${slug}.mdx`);
     const url = `${SITE_URL}/blog/${slug}`;

     const jsonLd = {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          url,
          mainEntityOfPage: url,
          author: { "@type": "Person", "@id": `${SITE_URL}/#person`, name: PROFILE.fullName, url: SITE_URL },
     };

     return (
          <>
               <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
               <SiteHeader />
               <main className={WRAP}>
                    <article className="mx-auto max-w-[720px] pt-[clamp(40px,7vw,80px)]">
                         <nav aria-label="Breadcrumb" className="mb-10 text-[15px] text-slate">
                              <Link href="/blog" className="link">Blog</Link>
                         </nav>

                         {post.draft && (
                              <p className="mb-8 rounded-lg border border-select/40 bg-white/70 px-4 py-3 text-[15px]">
                                   <span className="font-semibold text-select">Draft.</span> Only visible while developing
                                   locally. Remove <code className="font-mono text-[0.9em]">draft: true</code> to publish it.
                              </p>
                         )}

                         <header>
                              <SelectedTitle className="font-serif text-[clamp(40px,6vw,68px)] leading-[1.02] font-normal tracking-[-0.02em]">
                                   {post.title}
                              </SelectedTitle>
                              <p className="mt-8 text-[clamp(19px,2vw,22px)] leading-snug text-slate">{post.description}</p>
                              <p className="mt-5 flex flex-wrap gap-x-4 text-[15px] text-slate">
                                   <span>{PROFILE.name}</span>
                                   <time dateTime={post.date}>{formatDate(post.date)}</time>
                                   <span>{post.readingMinutes} min read</span>
                              </p>
                         </header>

                         <div className="mt-10 border-t border-rule pt-4">
                              <Content />
                         </div>

                         <nav aria-label="More posts" className="mt-16 border-t border-rule pt-8 text-[15px]">
                              <Link href="/blog" className="link">All posts</Link>
                              <span className="text-slate"> or </span>
                              <a href="/blog/rss.xml" className="link">subscribe via RSS</a>
                         </nav>
                    </article>
               </main>
               <SiteFooter minimal />
          </>
     );
}
