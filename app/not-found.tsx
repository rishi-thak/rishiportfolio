import Link from "next/link";
import { DISPLAY_TITLE, SelectedTitle, SiteFooter, SiteHeader, WRAP } from "./components/site-chrome";

export default function NotFound() {
     return (
          <>
               <SiteHeader />
               <main className="dot-grid">
                    <section className={`${WRAP} pt-[clamp(56px,10vw,120px)] pb-[clamp(56px,9vw,104px)]`}>
                         {/* Same selected-title treatment as every page, tagged "404" instead of "h1". */}
                         <SelectedTitle tag="404" className={DISPLAY_TITLE}>
                              Nothing here
                         </SelectedTitle>
                         <p className="mt-8 max-w-[40ch] text-[clamp(19px,2vw,22px)] leading-snug text-slate">
                              This page doesn&apos;t exist, or it moved. Try one of these instead:
                         </p>
                         <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[17px]">
                              <li><Link href="/" className="link">Home</Link></li>
                              <li><Link href="/projects" className="link">Projects</Link></li>
                              <li><Link href="/work" className="link">Work with me</Link></li>
                              <li><Link href="/blog" className="link">Blog</Link></li>
                         </ul>
                    </section>
               </main>
               <SiteFooter minimal />
          </>
     );
}
