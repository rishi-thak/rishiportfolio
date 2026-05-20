"use client";

import { useState, useEffect, useCallback } from "react";

export default function IntroZoom() {
     const [phase, setPhase] = useState<"hold" | "zoom" | "done">("hold");

     const skip = useCallback(() => {
          setPhase("done");
          window.dispatchEvent(new CustomEvent("intro-finished"));
     }, []);

     useEffect(() => {
          const zoomTimer = setTimeout(() => setPhase("zoom"), 1000);
          return () => clearTimeout(zoomTimer);
     }, []);

     useEffect(() => {
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
     }, [skip]);

     const handleAnimationEnd = useCallback(() => {
          setPhase("done");
          window.dispatchEvent(new CustomEvent("intro-finished"));
     }, []);

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
                         onAnimationEnd={handleAnimationEnd}
                    >
                         Rishi Thakkar
                    </span>
               </div>
          </>
     );
}
