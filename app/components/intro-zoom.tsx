"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export default function IntroZoom() {
     const [phase, setPhase] = useState<"hold" | "zoom" | "done">("hold");
     const skippedRef = useRef(false);

     const skip = useCallback(() => {
          if (skippedRef.current) return;
          skippedRef.current = true;
          setPhase("done");
          window.dispatchEvent(new CustomEvent("intro-finished"));
     }, []);

     useEffect(() => {
          // Reduced-motion users skip straight to the page instead of the 3s zoom.
          const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          const zoomTimer = setTimeout(() => {
               if (skippedRef.current) return;
               if (reduced) skip();
               else setPhase("zoom");
          }, reduced ? 0 : 1000);

          // Dismissal hangs off onAnimationEnd, which never fires if the tab is
          // backgrounded or throttled — that would strand the visitor on a black
          // screen. This guarantees the page appears regardless.
          const failsafe = setTimeout(skip, 4000);

          return () => {
               clearTimeout(zoomTimer);
               clearTimeout(failsafe);
          };
     }, [skip]);

     useEffect(() => {
          // This component renders null once done but stays mounted, so the listeners
          // must be torn down explicitly — otherwise handleKey keeps swallowing every
          // Enter/Space on the page and the panel buttons can't be activated.
          if (phase === "done") return;

          const handleKey = (e: KeyboardEvent) => {
               if (e.code === "Space" || e.code === "Enter" || e.code === "Escape") {
                    e.preventDefault();
                    skip();
               }
          };
          const handleClick = () => skip();

          window.addEventListener("keydown", handleKey);
          window.addEventListener("click", handleClick);
          return () => {
               window.removeEventListener("keydown", handleKey);
               window.removeEventListener("click", handleClick);
          };
     }, [skip, phase]);

     if (phase === "done") return null;

     return (
          <>
               <style>{`
        @keyframes zoomThrough {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(100);
            opacity: 0;
          }
        }

        @keyframes overlayReveal {
          0% { background: #000; }
          10% { background: #000; }
          100% { background: transparent; }
        }

        .intro-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .intro-overlay--zooming {
          animation: overlayReveal 2.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .intro-name {
          font-family: 'Anton', 'Impact', sans-serif;
          font-size: 45px;
          color: #fff;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          white-space: nowrap;
          will-change: transform, opacity;
          transform-origin: 38% 50%;
        }

        .intro-name--zooming {
          animation: zoomThrough 2.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>

               <div
                    className={`intro-overlay ${phase === "zoom" ? "intro-overlay--zooming" : ""}`}
                    role="button"
                    aria-label="Skip intro animation"
                    tabIndex={0}
               >
                    <span
                         className={`intro-name ${phase === "zoom" ? "intro-name--zooming" : ""}`}
                         onAnimationEnd={skip}
                    >
                         Rishi Thakkar
                    </span>
               </div>
          </>
     );
}
