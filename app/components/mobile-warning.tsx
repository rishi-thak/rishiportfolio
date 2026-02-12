"use client";

import { useEffect, useState } from "react";

export default function MobileWarning() {
     const [mounted, setMounted] = useState(false);

     useEffect(() => {
          setMounted(true);
     }, []);

     if (!mounted) return null;

     return (
          <>
               <style>{`
                    @media (min-width: 769px) {
                         .mobile-warning-overlay {
                              display: none !important;
                         }
                    }
                    .mobile-warning-overlay {
                         position: fixed;
                         inset: 0;
                         /* Below the intro zoom layer (9999) but above content */
                         z-index: 9500;
                         background: #ffcc00;
                         display: flex;
                         flex-direction: column;
                         align-items: center;
                         justify-content: center;
                         padding: 30px;
                         text-align: center;
                         font-family: 'Anton', 'Impact', sans-serif;
                    }
                    .mobile-warning-box {
                         background: #fff;
                         border: 6px solid #000;
                         padding: 30px;
                         box-shadow: 12px 12px 0 #000;
                         max-width: 400px;
                         transform: rotate(-1deg);
                    }
                    .mobile-warning-title {
                         font-size: 36px;
                         line-height: 1;
                         margin-bottom: 20px;
                         color: #000;
                         text-transform: uppercase;
                         letter-spacing: 0.05em;
                    }
                    .mobile-warning-text {
                         font-family: 'Courier New', monospace;
                         font-size: 14px;
                         color: #333;
                         line-height: 1.4;
                         font-weight: bold;
                    }
                    .mobile-warning-emoji {
                         font-size: 60px;
                         margin-bottom: 20px;
                         display: block;
                    }
               `}</style>
               <div className="mobile-warning-overlay">
                    <div className="mobile-warning-box">
                         <span className="mobile-warning-emoji">🚧</span>
                         <h1 className="mobile-warning-title">ACCESS DENIED!</h1>
                         <p className="mobile-warning-text">
                              SORRY! THIS COMIC STRIP ADVENTURE IS BEST EXPERIENCED ON A LARGER SCREEN.
                              <br /><br />
                              THIS SITE IS NOT READY FOR MOBILE VIEWING YET.
                         </p>
                    </div>
               </div>
          </>
     );
}
