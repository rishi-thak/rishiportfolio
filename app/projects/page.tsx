import type { Metadata } from "next";
import Link from "next/link";
import { PROFILE, PROJECTS } from "../content";
import { Artboard } from "../components/artboards";
import { LiftOnHover } from "../components/motion";
import { DISPLAY_TITLE, SelectedTitle, SiteFooter, SiteHeader, WRAP } from "../components/site-chrome";

const description = `Projects by ${PROFILE.name}: ${PROJECTS.map((p) => p.title).join(", ")}.`;

export const metadata: Metadata = {
     title: "Projects",
     description,
     alternates: { canonical: "/projects" },
     openGraph: { title: `Projects · ${PROFILE.name}`, description, url: "/projects" },
};

export default function ProjectsPage() {
     return (
          <>
               <SiteHeader />
               <main>
                    <section className={`${WRAP} pt-[clamp(48px,8vw,96px)] pb-12`}>
                         <SelectedTitle className={DISPLAY_TITLE}>
                              Projects
                         </SelectedTitle>
                         <p className="mt-8 max-w-[44ch] text-[clamp(19px,2vw,22px)] leading-snug text-slate">
                              Developer tools and AI products I&apos;ve built, most recent first.
                         </p>
                    </section>

                    <div className="dot-grid py-[clamp(40px,6vw,72px)]">
                         <ul className={`${WRAP} grid gap-x-12 gap-y-16 md:grid-cols-2`}>
                              {PROJECTS.map((p) => (
                                   <li key={p.slug}>
                                        <article className="frame-static relative">
                                             <LiftOnHover className="frame-art relative w-max">
                                                  <Artboard project={p} className="index-art" />
                                                  <span aria-hidden className="frame-selection">
                                                       <i /><i /><i /><i />
                                                  </span>
                                             </LiftOnHover>
                                             <div className="mt-6 flex items-baseline justify-between gap-4">
                                                  <h2 className="font-serif text-[34px] leading-tight font-normal tracking-[-0.01em]">
                                                       <Link href={`/projects/${p.slug}`} className="frame-link link">{p.title}</Link>
                                                  </h2>
                                                  <span className="shrink-0 text-[15px] text-slate tabular-nums">{p.year}</span>
                                             </div>
                                             <p className="mt-1 text-[17px] text-slate">{p.tagline}</p>
                                             <p className="mt-3 max-w-[52ch] leading-relaxed">{p.summary}</p>
                                             <p className="mt-3 text-[15px] text-slate">Built with {p.stack.join(", ")}</p>
                                        </article>
                                   </li>
                              ))}
                         </ul>
                    </div>
               </main>
               <SiteFooter />
          </>
     );
}
