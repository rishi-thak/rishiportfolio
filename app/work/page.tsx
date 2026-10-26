import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CLIENT_WORK, PROCESS, PROFILE, SERVICES } from "../content";
import { EmailAddress, InquiryButton } from "../components/email";
import { DISPLAY_H2, DISPLAY_TITLE, NEW_TAB, SelectedTitle, SiteFooter, SiteHeader, WRAP } from "../components/site-chrome";

const description = "I build web apps and AI features for early-stage startups. Client work, what I build, and how to start a project.";

export const metadata: Metadata = {
     title: "Work with me",
     description,
     alternates: { canonical: "/work" },
     openGraph: { title: `Work with me · ${PROFILE.name}`, description, url: "/work" },
};

export default function WorkPage() {
     return (
          <>
               <SiteHeader />
               <main>
                    <section className={`${WRAP} pt-[clamp(48px,8vw,96px)] pb-[clamp(40px,6vw,72px)]`}>
                         <SelectedTitle className={DISPLAY_TITLE}>Work with me</SelectedTitle>
                         <p className="mt-8 max-w-[34ch] text-[clamp(22px,2.6vw,30px)] leading-[1.25] font-medium tracking-[-0.015em]">
                              I build web apps and AI features for early-stage startups, and I build them to last: they
                              work for your customers on day one and keep working as you grow.
                         </p>
                         <p className="mt-5 max-w-[56ch] text-[17px] leading-relaxed text-slate">
                              Both clients below still run on what I built: Scoop is live on the App Store, and I&apos;m
                              still developing the GenAI Innovation Forum with its organizers.
                         </p>
                         <div className="mt-8 flex flex-wrap items-center gap-5">
                              <InquiryButton />
                              <a href="#client-work" className="link text-[16px]">See client work</a>
                         </div>
                    </section>

                    <section aria-labelledby="client-work" className="dot-grid py-[clamp(48px,7vw,88px)]">
                         <div className={WRAP}>
                              <h2 id="client-work" className={`mb-8 ${DISPLAY_H2}`}>Client work</h2>
                              <ul className="space-y-8">
                                   {CLIENT_WORK.map((c) => (
                                        <li key={c.slug} id={c.slug} className="scroll-mt-8">
                                             <article
                                                  className={`relative isolate overflow-hidden rounded-xl border border-rule p-[clamp(20px,3vw,36px)] ${
                                                       c.background ? "bg-white" : "bg-white/70"
                                                  }`}
                                             >
                                                  {c.background && (
                                                       <>
                                                            <Image
                                                                 src={c.background}
                                                                 alt=""
                                                                 fill
                                                                 sizes="(min-width: 1120px) 1056px, 100vw"
                                                                 className="-z-20 object-cover object-center"
                                                            />
                                                            {/* Same fade as the client's hero: near-solid white behind the text, the art showing on the right.
                                                                Phones get an even wash instead, since text runs the full width there. */}
                                                            <span
                                                                 aria-hidden
                                                                 className="absolute inset-0 -z-10 bg-white/80 md:bg-transparent md:bg-[linear-gradient(90deg,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.8)_55%,rgba(255,255,255,0.4)_100%)]"
                                                            />
                                                       </>
                                                  )}
                                                  {/* Logo sits top-right beside the name; on phones it moves above the name. */}
                                                  <header className="flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                                                       <h3 className="font-serif text-[clamp(30px,3.6vw,40px)] leading-tight font-normal">
                                                            {c.clientUrl ? (
                                                                 <a href={c.clientUrl} {...NEW_TAB} className="link">{c.client}</a>
                                                            ) : (
                                                                 c.client
                                                            )}
                                                       </h3>
                                                       {c.logo && (
                                                            <Image
                                                                 src={c.logo.src}
                                                                 alt={`${c.client} logo`}
                                                                 width={c.logo.width}
                                                                 height={c.logo.height}
                                                                 sizes={`${c.logo.displayWidth}px`}
                                                                 className="h-auto w-[var(--logo-w)] shrink-0 max-sm:w-[calc(var(--logo-w)*0.8)] sm:mt-1.5"
                                                                 style={{ "--logo-w": `${c.logo.displayWidth}px` } as React.CSSProperties}
                                                            />
                                                       )}
                                                  </header>
                                                  <p className="mt-1 text-[15px] text-slate">
                                                       {c.kind}. {c.role}.
                                                  </p>
                                                  <p className="mt-5 max-w-[60ch] text-[18px] leading-relaxed">{c.summary}</p>
                                                  {c.links && c.links.length > 0 && (
                                                       <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
                                                            {c.links.map((l) => (
                                                                 <li key={l.url}>
                                                                      <a href={l.url} {...NEW_TAB} className="link font-medium">{l.label}</a>
                                                                 </li>
                                                            ))}
                                                       </ul>
                                                  )}

                                                  {c.results && c.results.length > 0 && (
                                                       // Label first in the markup (dt before dd); flex-col-reverse shows the number on top.
                                                       <dl className="mt-8 flex flex-wrap gap-x-12 gap-y-6">
                                                            {c.results.map((r) => (
                                                                 <div key={r.label} className="flex flex-col-reverse">
                                                                      <dt className="mt-1 text-[14px] text-slate">{r.label}</dt>
                                                                      <dd className="font-serif text-[44px] leading-none">{r.value}</dd>
                                                                 </div>
                                                            ))}
                                                       </dl>
                                                  )}

                                                  <div className="mt-8">
                                                       <h4 className="text-[14px] font-semibold">What I built</h4>
                                                       <ul className="mt-3 max-w-[72ch] list-disc space-y-2 pl-5 text-[16px] leading-relaxed text-slate marker:text-rule">
                                                            {c.built.map((b) => (
                                                                 <li key={b}>{b}</li>
                                                            ))}
                                                       </ul>
                                                  </div>

                                                  {c.quote && (
                                                       <figure className="mt-8 border-t border-rule pt-6">
                                                            <blockquote className="font-serif text-[24px] leading-snug">“{c.quote.text}”</blockquote>
                                                            <figcaption className="mt-2 text-[14px] text-slate">
                                                                 {c.quote.name}, {c.quote.title}
                                                            </figcaption>
                                                       </figure>
                                                  )}
                                             </article>
                                        </li>
                                   ))}
                              </ul>
                         </div>
                    </section>

                    <section aria-labelledby="services" className={`${WRAP} mt-[clamp(56px,8vw,104px)]`}>
                         <h2 id="services" className={`mb-8 ${DISPLAY_H2}`}>What I build</h2>
                         <ul className="grid gap-x-10 gap-y-8 border-t border-rule pt-8 md:grid-cols-3">
                              {SERVICES.map((s) => (
                                   <li key={s.title}>
                                        <h3 className="text-[18px] font-semibold">{s.title}</h3>
                                        <p className="mt-2 leading-relaxed text-slate">{s.description}</p>
                                        <p className="mt-3 text-[15px]">
                                             <span className="text-slate">For example: </span>
                                             {s.examples.map((e, i) => (
                                                  <span key={e.label}>
                                                       {i > 0 && ", "}
                                                       {e.href.startsWith("#") ? (
                                                            <a href={e.href} className="link">{e.label}</a>
                                                       ) : (
                                                            <Link href={e.href} className="link">{e.label}</Link>
                                                       )}
                                                  </span>
                                             ))}
                                        </p>
                                   </li>
                              ))}
                         </ul>
                    </section>

                    <section aria-labelledby="process" className={`${WRAP} mt-[clamp(56px,8vw,104px)]`}>
                         <h2 id="process" className={`mb-8 ${DISPLAY_H2}`}>How it works</h2>
                         <ol className="grid gap-x-10 gap-y-8 border-t border-rule pt-8 sm:grid-cols-2 lg:grid-cols-4">
                              {PROCESS.map((step, i) => (
                                   <li key={step.title}>
                                        <p className="font-serif text-[40px] leading-none text-slate">{i + 1}</p>
                                        <h3 className="mt-3 text-[18px] font-semibold">{step.title}</h3>
                                        <p className="mt-2 leading-relaxed text-slate">{step.description}</p>
                                   </li>
                              ))}
                         </ol>
                    </section>

                    <section aria-labelledby="start" className={`${WRAP} mt-[clamp(56px,8vw,104px)]`}>
                         <div className="@container rounded-xl border border-rule bg-white/70 p-[clamp(24px,4vw,48px)]">
                              {/* From tablet width up, the size tracks the panel's width (cqi) so this stays on one line. */}
                              <h2
                                   id="start"
                                   className="font-serif text-[clamp(30px,8vw,40px)] leading-[1.05] font-normal tracking-[-0.015em] md:text-[5.1cqi] md:whitespace-nowrap"
                              >
                                   Have an idea, but not the time/ expertise to see it through?
                              </h2>
                              <p className="mt-4 max-w-[52ch] text-[17px] leading-relaxed text-slate">
                                   Tell me what you&apos;re building and when you need it. I&apos;d love to work with you!
                              </p>
                              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                                   <InquiryButton />
                                   <EmailAddress className="link text-[16px]" />
                              </div>
                         </div>
                    </section>
               </main>
               <SiteFooter minimal />
          </>
     );
}
