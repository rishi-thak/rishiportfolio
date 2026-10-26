"use client";

import { motion } from "framer-motion";
import { useId, useState } from "react";
import type { Experience } from "../content";

const NEW_TAB = { target: "_blank", rel: "noopener noreferrer" } as const;

/**
 * Expandable role rows: role, company and dates, a one-line summary, and the
 * short bullets on expand. The bullets are always in the HTML (so search
 * engines read them); they're just collapsed to zero height until opened.
 */
export function RoleList({ roles }: { roles: Experience[] }) {
     return (
          <ol className="border-t border-rule">
               {roles.map((e) => (
                    <RoleRow key={e.company} role={e} />
               ))}
          </ol>
     );
}

function RoleRow({ role: e }: { role: Experience }) {
     const [open, setOpen] = useState(false);
     const panelId = useId();

     return (
          <li className="border-b border-rule">
               <div className="relative flex gap-4 py-5">
                    <div className="min-w-0 flex-1">
                         <p className="grid gap-x-6 gap-y-0.5 text-[18px] leading-snug sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline">
                              <span>
                                   <span className="font-semibold">{e.role}</span>
                                   <span className="text-slate"> at </span>
                                   {e.url ? (
                                        // Sits above the row's toggle button so the link stays clickable.
                                        <a href={e.url} {...NEW_TAB} className="link relative z-10">{e.company}</a>
                                   ) : (
                                        e.company
                                   )}
                              </span>
                              <span className="text-[15px] text-slate tabular-nums">{e.period}</span>
                         </p>
                         <p className="mt-1 text-[16px] leading-snug text-slate">{e.summary}</p>
                    </div>
                    {/* The toggle stretches over the whole row, so clicking anywhere on it opens the details. */}
                    <button
                         type="button"
                         aria-expanded={open}
                         aria-controls={panelId}
                         onClick={() => setOpen((v) => !v)}
                         className="self-start pt-0.5 text-[20px] leading-none text-slate after:absolute after:inset-0 after:cursor-pointer focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-select"
                    >
                         <span className="sr-only">{open ? "Hide" : "Show"} details for {e.role} at {e.company}</span>
                         <motion.span
                              aria-hidden
                              className="inline-block"
                              animate={{ rotate: open ? 45 : 0 }}
                              transition={{ type: "spring", stiffness: 420, damping: 24 }}
                         >
                              +
                         </motion.span>
                    </button>
               </div>
               <motion.div
                    id={panelId}
                    inert={!open}
                    initial={false}
                    animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
                    transition={{ height: { duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }, opacity: { duration: 0.2 } }}
                    className="overflow-hidden"
               >
                    <motion.ul
                         className="max-w-[66ch] list-disc space-y-2 pb-6 pl-5 text-[16px] leading-relaxed text-slate marker:text-rule"
                         animate={{ y: open ? 0 : -6 }}
                         transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
                    >
                         {e.points.map((pt) => (
                              <li key={pt}>{pt}</li>
                         ))}
                    </motion.ul>
               </motion.div>
          </li>
     );
}
