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

const SOCIALS = [
     { label: "GitHub", url: PROFILE.github },
     { label: "LinkedIn", url: PROFILE.linkedin },
];

/** Async so the Blog link only shows once at least one post is published. */
export async function SiteHeader() {
     const hasPosts = (await getPosts()).length > 0;
     return (
          <header className={`${WRAP} flex items-center justify-between gap-6 py-6 text-[15px]`}>
               <Link href="/" className="font-serif text-[22px] leading-none">
                    {PROFILE.name}
               </Link>
               <nav aria-label="Main">
                    <ul className="flex gap-3.5 text-slate sm:gap-5">
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
                                   <a href={s.url} {...NEW_TAB} className="transition-colors hover:text-ink">{s.label}</a>
                              </li>
                         ))}
                         <li><EmailLink className="transition-colors hover:text-ink" /></li>
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
