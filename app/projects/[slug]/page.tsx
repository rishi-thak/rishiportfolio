import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, PROFILE, PROJECTS, SITE_URL } from "../../content";
import { DISPLAY_TITLE, NEW_TAB, SelectedTitle, SiteFooter, SiteHeader, WRAP } from "../../components/site-chrome";
import { Artboard } from "../../components/artboards";
import { PlaceOnCanvas } from "../../components/motion";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
     return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
     const project = getProject((await params).slug);
     if (!project) return {};
     const title = `${project.title} — ${project.tagline}`;
     const url = `/projects/${project.slug}`;
     return {
          title,
          description: project.summary,
          alternates: { canonical: url },
          openGraph: { type: "article", title: `${title} · ${PROFILE.name}`, description: project.summary, url },
     };
}

export default async function ProjectPage({ params }: Props) {
     const project = getProject((await params).slug);
     if (!project) notFound();

     const index = PROJECTS.indexOf(project);
     const next = PROJECTS[(index + 1) % PROJECTS.length];
     const url = `${SITE_URL}/projects/${project.slug}`;

     const jsonLd = {
          "@context": "https://schema.org",
          "@graph": [
               {
                    "@type": "SoftwareSourceCode",
                    name: project.title,
                    description: project.summary,
                    url,
                    programmingLanguage: project.stack,
                    author: { "@type": "Person", "@id": `${SITE_URL}/#person`, name: PROFILE.fullName },
                    sameAs: project.links.map((l) => l.url),
               },
               {
                    "@type": "BreadcrumbList",
                    itemListElement: [
                         { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
                         { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE_URL}/projects` },
                         { "@type": "ListItem", position: 3, name: project.title, item: url },
                    ],
               },
          ],
     };

     return (
          <>
               <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
               <SiteHeader />
               <main>
                    <article>
                         <header className={`${WRAP} pt-[clamp(40px,7vw,88px)] pb-12`}>
                              <nav aria-label="Breadcrumb" className="mb-10 text-[15px] text-slate">
                                   <Link href="/projects" className="link">Projects</Link>
                                   <span aria-hidden> / </span>
                                   <span aria-current="page">{project.title}</span>
                              </nav>
                              <SelectedTitle className={DISPLAY_TITLE}>
                                   {project.title}
                              </SelectedTitle>
                              <p className="mt-8 max-w-[36ch] text-[clamp(20px,2.4vw,28px)] leading-snug font-medium tracking-[-0.015em]">
                                   {project.tagline}
                              </p>
                         </header>

                         <div className="dot-grid flex justify-center py-[clamp(40px,7vw,88px)]">
                              <PlaceOnCanvas className="frame-static is-selected">
                                   <span className="frame-name">{project.title}</span>
                                   <span className="frame-art relative block">
                                        <Artboard project={project} className="hero-art" />
                                        <span aria-hidden className="frame-selection">
                                             <i /><i /><i /><i />
                                        </span>
                                   </span>
                              </PlaceOnCanvas>
                         </div>

                         <div className={`${WRAP} mt-16 grid gap-12 md:grid-cols-[220px_1fr]`}>
                              <aside className="space-y-8 text-[15px] md:order-none">
                                   <dl className="space-y-4">
                                        <div>
                                             <dt className="text-slate">Year</dt>
                                             <dd className="mt-0.5 font-semibold">{project.year}</dd>
                                        </div>
                                        {project.stats.map((s) => (
                                             <div key={s.label}>
                                                  <dt className="text-slate">{s.label}</dt>
                                                  <dd className="mt-0.5 font-semibold">{s.value}</dd>
                                             </div>
                                        ))}
                                   </dl>
                                   <div>
                                        <h2 className="text-slate">Built with</h2>
                                        <p className="mt-0.5">{project.stack.join(", ")}</p>
                                   </div>
                                   <div>
                                        <h2 className="text-slate">Links</h2>
                                        <ul className="mt-0.5 space-y-1">
                                             {project.links.map((l) => (
                                                  <li key={l.url}>
                                                       <a href={l.url} {...NEW_TAB} className="link font-semibold">{l.label}</a>
                                                  </li>
                                             ))}
                                        </ul>
                                   </div>
                              </aside>
                              <div className="max-w-[62ch] space-y-5 text-[18px] leading-[1.65]">
                                   {project.body.map((para) => (
                                        <p key={para}>{para}</p>
                                   ))}
                              </div>
                         </div>
                    </article>

                    <nav aria-label="Next project" className={`${WRAP} mt-24`}>
                         <Link href={`/projects/${next.slug}`} className="group block border-t border-rule pt-8">
                              <span className="text-[15px] text-slate">Next project</span>
                              <span className="mt-2 block font-serif text-[clamp(36px,4.8vw,52px)] leading-tight font-normal tracking-[-0.015em] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[0.15em]">
                                   {next.title}
                              </span>
                              <span className="mt-1 block text-slate">{next.tagline}</span>
                         </Link>
                    </nav>
               </main>
               <SiteFooter project={project.title} />
          </>
     );
}
