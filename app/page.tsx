import type { Metadata } from "next";
import Link from "next/link";
import { EXPERIENCE, LEADERSHIP, PROFILE, PROJECTS, SITE_URL, SKILLS } from "./content";
import { DISPLAY_H2, NEW_TAB, SelectedTitle, SiteFooter, SiteHeader, WRAP } from "./components/site-chrome";
import { ProjectCanvas } from "./components/project-canvas";
import { RoleList } from "./components/role-list";
import { EmailAddress, EmailTemplates, TemplateLink } from "./components/email";

export const metadata: Metadata = {
     alternates: { canonical: "/" },
};

const jsonLd = {
     "@context": "https://schema.org",
     "@graph": [
          {
               "@type": "Person",
               "@id": `${SITE_URL}/#person`,
               name: PROFILE.fullName,
               alternateName: PROFILE.name,
               url: SITE_URL,
               jobTitle: "Software Engineer",
               description: PROFILE.description,
               alumniOf: {
                    "@type": "CollegeOrUniversity",
                    name: "California Polytechnic State University, San Luis Obispo",
                    alternateName: "Cal Poly SLO",
               },
               worksFor: { "@type": "Organization", name: "CodeBox", url: "https://www.codebox.so" },
               knowsAbout: SKILLS.flatMap((s) => s.items),
               sameAs: [PROFILE.linkedin, PROFILE.github],
          },
          {
               "@type": "WebSite",
               "@id": `${SITE_URL}/#website`,
               name: PROFILE.name,
               url: SITE_URL,
               author: { "@id": `${SITE_URL}/#person` },
          },
     ],
};

export default function Home() {
     return (
          <>
               <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
               {/* Without JS the frames never get moved into the pile, so show them where they are. */}
               <noscript dangerouslySetInnerHTML={{ __html: "<style>.frame-grid[data-pending] .frame{visibility:visible}</style>" }} />
               <SiteHeader />

               <main>
                    {/* Hero and projects share one canvas: the pile starts here and deals into the grid below. */}
                    <div className="dot-grid">
                         <section className={`${WRAP} pt-[clamp(48px,8vw,104px)] pb-[clamp(48px,7vw,88px)]`}>
                              <SelectedTitle className="font-serif text-[clamp(64px,14vw,176px)] leading-[0.9] font-normal tracking-[-0.025em]">
                                   {PROFILE.name}
                              </SelectedTitle>
                              <div className="mt-[clamp(32px,5vw,56px)] grid items-start gap-12 md:grid-cols-[minmax(0,1fr)_minmax(280px,380px)]">
                                   <div>
                                        <p className="max-w-[36ch] text-[clamp(22px,2.6vw,30px)] leading-[1.25] font-medium tracking-[-0.015em]">
                                             I build developer tools and AI systems.{" "}
                                             <Link href="/projects/nextcanvas" className="link">NextCanvas</Link>, my visual editor for
                                             Next.js, has 3,100+ npm downloads. I also run{" "}
                                             <a href="https://www.codebox.so" {...NEW_TAB} className="link">CodeBox</a>, Cal Poly&apos;s first student
                                             project accelerator. On the side, I{" "}
                                             <Link href="/work" className="link">develop software for startups</Link>.
                                        </p>
                                        <p className="mt-5 max-w-[56ch] text-[17px] leading-relaxed text-slate">
                                             I study CS and Entrepreneurship at{" "}
                                             <a href={PROFILE.school.url} {...NEW_TAB} className="link text-ink">Cal Poly SLO</a> and
                                             graduate in 2028. Most recently I was an AI Engineer Intern at{" "}
                                             <a href="https://www.ahead.com" {...NEW_TAB} className="link text-ink">AHEAD</a>, working on
                                             source-cited retrieval and model-serving deployments.
                                        </p>
                                   </div>
                                   {/* Where the project frames pile up before they're dealt out. */}
                                   <div id="project-pile" aria-hidden className="mx-auto h-[230px] w-full max-w-[300px] md:-mt-6 md:h-[300px] md:max-w-none" />
                              </div>
                         </section>

                         <ProjectCanvas projects={PROJECTS} pileAnchorId="project-pile" />
                    </div>

                    <div className={`${WRAP} mt-[clamp(56px,8vw,104px)] grid items-start gap-14 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16`}>
                         <div>
                              <section aria-labelledby="experience">
                                   <h2 id="experience" className={DISPLAY_H2}>
                                        Experience
                                   </h2>
                                   <p className="mt-3 mb-6 text-[15px] text-slate">Shortened for readability &amp; privacy! For the full details,{" "}
                                        <TemplateLink label="Request resume" className="link text-ink">request my resume</TemplateLink>.
                                   </p>
                                   <RoleList roles={EXPERIENCE} />
                              </section>

                              <section aria-labelledby="leadership" className="mt-16">
                                   <h2 id="leadership" className={`mb-6 ${DISPLAY_H2}`}>
                                        Leadership
                                   </h2>
                                   <RoleList roles={LEADERSHIP} />
                              </section>
                         </div>

                         {/* A settings panel, like a design tool's right-hand sidebar. */}
                         <aside aria-label="Skills and contact" className="rounded-xl border border-rule bg-white/60">
                              <section aria-labelledby="skills" className="p-5">
                                   <h2 id="skills" className="mb-3 text-[14px] font-semibold">Skills</h2>
                                   <dl className="space-y-3 text-[14px] leading-snug">
                                        {SKILLS.map((s) => (
                                             <div key={s.category}>
                                                  <dt className="text-slate">{s.category}</dt>
                                                  <dd className="mt-0.5">{s.items.join(", ")}</dd>
                                             </div>
                                        ))}
                                   </dl>
                              </section>

                              <section aria-labelledby="contact" className="border-t border-rule p-5">
                                   <h2 id="contact" className="mb-3 text-[14px] font-semibold">Contact</h2>
                                   <EmailAddress className="link text-[17px] font-semibold break-all" />
                                   <EmailTemplates className="mt-4" greeting />
                                   <ul className="mt-4 flex gap-5 text-[14px]">
                                        <li><a href={PROFILE.github} {...NEW_TAB} className="link">GitHub</a></li>
                                        <li><a href={PROFILE.linkedin} {...NEW_TAB} className="link">LinkedIn</a></li>
                                   </ul>
                              </section>
                         </aside>
                    </div>
               </main>

               <SiteFooter minimal />
          </>
     );
}
