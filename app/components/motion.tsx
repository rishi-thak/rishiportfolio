"use client";

import { MotionConfig, motion } from "framer-motion";

/*
 * Small framer-motion pieces used around the site. Each one either answers
 * something the visitor did (hover, click) or plays once as a page loads.
 * MotionConfig's reducedMotion="user" turns the movement off for anyone who
 * has asked their OS for reduced motion.
 */

const EASE = [0.2, 0.8, 0.2, 1] as const;

export function MotionProvider({ children }: { children: React.ReactNode }) {
     return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/**
 * The editor-style selection around a page title, drawn on load: a marquee is
 * dragged out from the top-left corner, then the selection box and its handles
 * snap into place. The tag text comes from CSS (data-tag), so it never becomes
 * part of the heading's text.
 */
export function SelectionBox({ tag }: { tag: string }) {
     return (
          <>
               <motion.span
                    aria-hidden
                    className="selected-marquee"
                    style={{ transformOrigin: "0 0" }}
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 1, opacity: 0 }}
                    transition={{
                         scale: { duration: 0.55, ease: EASE, delay: 0.1 },
                         opacity: { duration: 0.25, delay: 0.6 },
                    }}
               />
               <motion.span
                    aria-hidden
                    className="selected-box"
                    data-tag={tag}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.15, delay: 0.6 }}
               >
                    {[0, 1, 2, 3].map((i) => (
                         <motion.i
                              key={i}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 520, damping: 20, delay: 0.62 + i * 0.04 }}
                         />
                    ))}
               </motion.span>
          </>
     );
}

/** Settles a project's artwork onto the canvas when its page loads. */
export function PlaceOnCanvas({ children, className = "" }: { children: React.ReactNode; className?: string }) {
     return (
          <motion.div
               className={className}
               initial={{ opacity: 0, y: 28, rotate: -4, scale: 0.96 }}
               animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
               transition={{ type: "spring", stiffness: 140, damping: 18, delay: 0.15 }}
          >
               {children}
          </motion.div>
     );
}

/** Lifts a card a few pixels while it's hovered, like picking up a layer. */
export function LiftOnHover({ children, className = "" }: { children: React.ReactNode; className?: string }) {
     return (
          <motion.div className={className} whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 400, damping: 26 }}>
               {children}
          </motion.div>
     );
}
