"use client";

import { motion } from "framer-motion";
import { useSyncExternalStore } from "react";

/*
 * The email address never appears in the server-rendered HTML. It's stored
 * reversed and in pieces, and only assembled in the browser, after the page
 * has loaded or when someone clicks. Most scraping bots read the raw HTML
 * and never see it.
 */
const PARTS = ["1rakkahtihsir", "moc.liamg"];
const reverse = (s: string) => s.split("").reverse().join("");
const address = () => `${reverse(PARTS[0])}@${reverse(PARTS[1])}`;

function openMail(subject?: string, body?: string) {
     const params = new URLSearchParams();
     if (subject) params.set("subject", subject);
     if (body) params.set("body", body);
     // URLSearchParams encodes spaces as "+", which mail apps show literally.
     const query = params.toString().replace(/\+/g, "%20");
     window.location.href = `mailto:${address()}${query ? `?${query}` : ""}`;
}

const noSubscribe = () => () => {};

/** The address as text: null in the server HTML, filled in once the page is running in a browser. */
function useAddress() {
     return useSyncExternalStore(noSubscribe, address, () => null);
}

/** A button styled like a link that opens a blank email. */
export function EmailLink({ className = "", children }: { className?: string; children?: React.ReactNode }) {
     return (
          <button type="button" onClick={() => openMail()} className={`cursor-pointer ${className}`}>
               {children ?? "Email"}
          </button>
     );
}

/** The address written out, opening a blank email on click. */
export function EmailAddress({ className = "" }: { className?: string }) {
     const value = useAddress();
     return (
          <button type="button" onClick={() => openMail()} className={`cursor-pointer text-left ${className}`}>
               {value ?? "Send me an email"}
          </button>
     );
}

type Template = { label: string; subject: string; body: string };

export const EMAIL_TEMPLATES: Template[] = [
     {
          label: "Hiring",
          subject: "Software engineering role",
          body: "Hi Rishi,\n\nI'm [your name] from [company]. We're hiring for [role] and I think you'd be a good fit. Would you be open to a quick call?\n\nThanks,\n[your name]",
     },
     {
          label: "Request resume",
          subject: "Resume request",
          body: "Hi Rishi,\n\nI'm [your name] from [company]. Could you send me your resume? We're looking at candidates for [role].\n\nThanks,\n[your name]",
     },
     {
          label: "Ask about CodeBox",
          subject: "How you grew CodeBox",
          body: "Hi Rishi,\n\nI'm [your name], and I'm working on [your club or community]. I'd love to hear how you grew CodeBox, especially [what you're curious about].\n\nThanks,\n[your name]",
     },
];

/** A question about one project, shown only on that project's page. */
const askAbout = (project: string): Template => ({
     label: `Ask about ${project}`,
     subject: `Question about ${project}`,
     body: `Hi Rishi,\n\nI've been looking at ${project} and wanted to ask about [your question].\n\nThanks,\n[your name]`,
});

/** A no-agenda hello, offered first on the home page. */
const SAY_HI: Template = {
     label: "Just say hi",
     subject: "Hi Rishi",
     body: "Hi Rishi,\n\n[Say hello, or tell me what you're working on.]\n\n[your name]",
};


/** The client-facing inquiry, used by the "Start a project" button on /work. */
const PROJECT_INQUIRY: Template = {
     label: "Start a project",
     subject: "Project inquiry",
     body: "Hi Rishi,\n\nI'm [your name] from [company]. We're looking to build [what you need], ideally by [timeline]. Our budget is around [range].\n\nThanks,\n[your name]",
};

/** Primary call-to-action button that opens the project inquiry email. */
export function InquiryButton({ className = "" }: { className?: string }) {
     return (
          <motion.button
               type="button"
               onClick={() => openMail(PROJECT_INQUIRY.subject, PROJECT_INQUIRY.body)}
               className={`cursor-pointer rounded-full bg-ink px-5 py-2.5 text-[16px] font-medium text-canvas ${className}`}
               whileHover={{ y: -1 }}
               whileTap={{ scale: 0.96 }}
               transition={{ type: "spring", stiffness: 600, damping: 30 }}
          >
               {PROJECT_INQUIRY.label}
          </motion.button>
     );
}

/** Inline link-style button that opens one of the templates above, picked by its label. */
export function TemplateLink({ label, className = "", children }: { label: string; className?: string; children: React.ReactNode }) {
     const t = EMAIL_TEMPLATES.find((x) => x.label === label);
     return (
          <button type="button" onClick={() => openMail(t?.subject, t?.body)} className={`cursor-pointer ${className}`}>
               {children}
          </button>
     );
}

/**
 * One-click email templates: each opens the visitor's mail app with a draft filled in.
 * `greeting` puts "Just say hi" first (home page); `project` adds a question about that
 * project at the end (project pages).
 */
export function EmailTemplates({
     className = "",
     project,
     greeting = false,
}: {
     className?: string;
     project?: string;
     greeting?: boolean;
}) {
     const templates = [
          ...(greeting ? [SAY_HI] : []),
          ...EMAIL_TEMPLATES,
          // CodeBox already has its own template, so don't add a second one for it.
          ...(project && project !== "CodeBox" ? [askAbout(project)] : []),
     ];
     return (
          <div className={className}>
               <p className="text-[14px] text-slate">Start an email:</p>
               <ul className="mt-2 flex flex-wrap gap-2">
                    {templates.map((t) => (
                         <li key={t.label}>
                              <motion.button
                                   type="button"
                                   onClick={() => openMail(t.subject, t.body)}
                                   className="template-button"
                                   whileTap={{ scale: 0.94 }}
                                   transition={{ type: "spring", stiffness: 600, damping: 30 }}
                              >
                                   {t.label}
                              </motion.button>
                         </li>
                    ))}
               </ul>
          </div>
     );
}
