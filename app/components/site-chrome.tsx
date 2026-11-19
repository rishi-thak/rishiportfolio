import Link from "next/link";
import { PROFILE } from "../content";
import { EmailAddress, EmailLink, EmailTemplates } from "./email";
import { SelectionBox } from "./motion";
import { getPosts } from "../blog/posts";

/** Props for links that leave the site: open in a new tab without giving it access to this one. */
export const NEW_TAB = { target: "_blank", rel: "noopener noreferrer" } as const;

// Re-exported so pages can keep importing everything from site-chrome.
export { DISPLAY_H2, DISPLAY_TITLE } from "./display";

/** Page width shared by every section. */
export const WRAP = "mx-auto w-full max-w-[1120px] px-5 sm:px-8";

// Header icons: currentColor so they match the nav text; labels stay for screen readers.
function GitHubIcon() {
     return (
          <svg aria-hidden width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
               <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
     );
}

function LinkedInIcon() {
     return (
          <svg aria-hidden width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
               <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
     );
}

function MailIcon() {
     return (
          <svg aria-hidden width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
               <rect x="2" y="4" width="20" height="16" rx="2" />
               <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
     );
}

const SOCIALS = [
     { label: "GitHub", url: PROFILE.github, icon: <GitHubIcon /> },
     { label: "LinkedIn", url: PROFILE.linkedin, icon: <LinkedInIcon /> },
];

/** Async so the Blog link only shows once at least one post is published. */
export async function SiteHeader() {
     const hasPosts = (await getPosts()).length > 0;
     return (
          <header className={`${WRAP} flex items-center justify-between gap-4 py-6 text-[15px] sm:gap-6`}>
               <Link href="/" className="font-serif text-[22px] leading-none whitespace-nowrap">
                    {PROFILE.name}
               </Link>
               <nav aria-label="Main">
                    <ul className="flex items-center gap-3 text-slate sm:gap-5">
                         <li><Link href="/projects" className="transition-colors hover:text-ink">Projects</Link></li>
                         <li>
                              <Link href="/work" className="transition-colors hover:text-ink">
                                   Work<span className="hidden sm:inline"> with me</span>
                              </Link>
                         </li>
                         {hasPosts && (
                              <li><Link href="/blog" className="transition-colors hover:text-ink">Blog</Link></li>
                         )}
                         {SOCIALS.map((s) => (
                              <li key={s.label} className="hidden sm:block">
                                   <a href={s.url} {...NEW_TAB} className="flex transition-colors hover:text-ink">
                                        {s.icon}
                                        <span className="sr-only">{s.label}</span>
                                   </a>
                              </li>
                         ))}
                         <li>
                              <EmailLink className="flex transition-colors hover:text-ink">
                                   <MailIcon />
                                   <span className="sr-only">Email</span>
                              </EmailLink>
                         </li>
                    </ul>
               </nav>
          </header>
     );
}

/** `project` makes the email templates ask about that project (used on project pages). */
export function SiteFooter({ minimal = false, project }: { minimal?: boolean; project?: string }) {
     if (minimal) {
          return (
               <footer className={`${WRAP} mt-[clamp(56px,8vw,104px)] pb-10`}>
                    <p className="border-t border-rule pt-6 text-[13px] text-slate">© {new Date().getFullYear()} {PROFILE.fullName}</p>
               </footer>
          );
     }
     return (
          <footer className={`${WRAP} mt-28 pb-12`}>
               <div className="grid gap-6 border-t border-rule pt-10 md:grid-cols-[220px_1fr]">
                    <h2 className="text-[15px] text-slate">Contact</h2>
                    <div>
                         <EmailAddress className="link text-[clamp(24px,4.4vw,44px)] leading-tight font-semibold tracking-[-0.03em] break-all sm:break-normal" />
                         <EmailTemplates className="mt-6" project={project} />
                         <ul className="mt-6 flex gap-5 text-[15px]">
                              <li><a href={PROFILE.github} {...NEW_TAB} className="link">GitHub</a></li>
                              <li><a href={PROFILE.linkedin} {...NEW_TAB} className="link">LinkedIn</a></li>
                         </ul>
                         <p className="mt-16 text-[13px] text-slate">© {new Date().getFullYear()} {PROFILE.fullName}</p>
                    </div>
               </div>
          </footer>
     );
}

/**
 * A page title drawn as if it were selected in an editor: blue box, corner
 * handles, and a tag naming the element.
 */
export function SelectedTitle({ tag = "h1", className = "", children }: { tag?: string; className?: string; children: React.ReactNode }) {
     return (
          <h1 className={`selected ${className}`}>
               {children}
               <SelectionBox tag={tag} />
          </h1>
     );
}
