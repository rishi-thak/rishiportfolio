import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";

export const alt = "Rishi Thakkar — AI Engineer Intern at AHEAD, CS at Cal Poly SLO";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const font = (file: string) => fs.readFileSync(path.join(process.cwd(), "app/fonts", file));

/* Satori has no clip-path, so the comic gutters are rebuilt as rotated blocks
   that bleed past the canvas edge — the white page shows through as the seam. */
const PANELS = [
     { bg: "#0024cc", left: -20, top: -20, width: 430, height: 350, rotate: -1.2 },
     { bg: "#a7374b", left: 424, top: -20, width: 372, height: 342, rotate: 0.8 },
     { bg: "#00aa88", left: 810, top: -20, width: 430, height: 348, rotate: -0.9 },
     { bg: "#00bbcc", left: -20, top: 336, width: 350, height: 330, rotate: 1.1 },
     { bg: "#ccbb00", left: 344, top: 330, width: 470, height: 330, rotate: -0.7 },
     { bg: "#cc2200", left: 828, top: 338, width: 412, height: 322, rotate: 1.0 },
];

export default async function Image() {
     return new ImageResponse(
          (
               <div
                    style={{
                         width: "100%",
                         height: "100%",
                         display: "flex",
                         position: "relative",
                         background: "#ffffff",
                    }}
               >
                    {PANELS.map((p, i) => (
                         <div
                              key={i}
                              style={{
                                   position: "absolute",
                                   left: p.left,
                                   top: p.top,
                                   width: p.width,
                                   height: p.height,
                                   background: p.bg,
                                   transform: `rotate(${p.rotate}deg)`,
                              }}
                         />
                    ))}

                    {/* Nameplate — same object as the one pinned to the live page */}
                    <div
                         style={{
                              position: "absolute",
                              left: 104,
                              top: 192,
                              width: 992,
                              display: "flex",
                              flexDirection: "column",
                              background: "#ffffff",
                              border: "8px solid #000000",
                              // Solid rather than translucent: a semi-transparent shadow
                              // muddied every panel seam it crossed.
                              boxShadow: "16px 16px 0 #000000",
                              padding: "38px 52px 42px",
                              transform: "rotate(-1.5deg)",
                         }}
                    >
                         <div
                              style={{
                                   fontFamily: "Anton",
                                   fontSize: 104,
                                   lineHeight: 1,
                                   letterSpacing: "0.04em",
                                   color: "#000000",
                              }}
                         >
                              RISHI THAKKAR
                         </div>
                         {/* Two deliberate lines — one long string orphaned "NextCanvas" */}
                         <div
                              style={{
                                   fontFamily: "Kalam",
                                   fontSize: 30,
                                   lineHeight: 1.3,
                                   color: "#1a1a1a",
                                   marginTop: 16,
                              }}
                         >
                              CS @ Cal Poly SLO · AI Engineer Intern at AHEAD
                         </div>
                         <div
                              style={{
                                   fontFamily: "Kalam",
                                   fontSize: 30,
                                   lineHeight: 1.3,
                                   color: "#1a1a1a",
                              }}
                         >
                              Creator of NextCanvas · 2,500+ downloads in month one
                         </div>
                    </div>

                    {/* Corner flash, like a comic cover price box */}
                    <div
                         style={{
                              position: "absolute",
                              right: 46,
                              bottom: 40,
                              display: "flex",
                              background: "#000000",
                              padding: "12px 22px 14px",
                              transform: "rotate(-1.5deg)",
                         }}
                    >
                         <div
                              style={{
                                   fontFamily: "Bangers",
                                   fontSize: 34,
                                   letterSpacing: "0.09em",
                                   color: "#FFE500",
                              }}
                         >
                              RISHITHAKKAR.COM
                         </div>
                    </div>
               </div>
          ),
          {
               ...size,
               fonts: [
                    { name: "Anton", data: font("Anton-Regular.ttf"), style: "normal", weight: 400 },
                    { name: "Kalam", data: font("Kalam-Regular.ttf"), style: "normal", weight: 400 },
                    { name: "Bangers", data: font("Bangers-Regular.ttf"), style: "normal", weight: 400 },
               ],
          }
     );
}
