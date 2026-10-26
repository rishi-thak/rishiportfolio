import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";

export const OG_SIZE = { width: 1200, height: 630 };

const SELECT = "#2563ff";

// The site's fonts, as .woff files: the image renderer reads .woff and .ttf but not .woff2.
const fontFile = (pkg: string, file: string) =>
     fs.readFileSync(path.join(process.cwd(), "node_modules/@fontsource", pkg, "files", file));
const FONTS = [
     { name: "Instrument Serif", data: fontFile("instrument-serif", "instrument-serif-latin-400-normal.woff"), weight: 400 as const, style: "normal" as const },
     { name: "Instrument Sans", data: fontFile("instrument-sans", "instrument-sans-latin-400-normal.woff"), weight: 400 as const, style: "normal" as const },
];

function Handle({ style }: { style: React.CSSProperties }) {
     return (
          <div style={{ position: "absolute", width: 16, height: 16, background: "#fff", border: `3px solid ${SELECT}`, ...style }} />
     );
}

/** Share card in the site's editor-canvas style: a title selected on a dotted canvas. */
export function ogCard({ title, subtitle, titleSize = 150 }: { title: string; subtitle: string; titleSize?: number }) {
     return new ImageResponse(
          (
               <div
                    style={{
                         width: "100%",
                         height: "100%",
                         display: "flex",
                         flexDirection: "column",
                         justifyContent: "center",
                         background: "#eceef1",
                         backgroundImage: "radial-gradient(#c8ccd4 2px, transparent 2.4px)",
                         backgroundSize: "36px 36px",
                         color: "#15171c",
                         fontFamily: "Instrument Sans",
                         padding: "0 96px",
                    }}
               >
                    <div style={{ display: "flex" }}>
                         <div style={{ display: "flex", position: "relative", padding: "8px 22px" }}>
                              <div style={{ fontFamily: "Instrument Serif", fontSize: titleSize, letterSpacing: "-0.025em", lineHeight: 1.05, maxWidth: 960 }}>{title}</div>
                              {/* Satori has no `inset` shorthand, so spell out all four edges. */}
                              <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, border: `3px solid ${SELECT}`, display: "flex" }} />
                              <Handle style={{ top: -7, left: -7 }} />
                              <Handle style={{ top: -7, right: -7 }} />
                              <Handle style={{ bottom: -7, left: -7 }} />
                              <Handle style={{ bottom: -7, right: -7 }} />
                              <div
                                   style={{
                                        position: "absolute",
                                        left: 0,
                                        top: -52,
                                        background: SELECT,
                                        color: "#fff",
                                        fontSize: 24,
                                        padding: "6px 12px",
                                   }}
                              >
                                   h1
                              </div>
                         </div>
                    </div>
                    <div style={{ marginTop: 48, fontSize: 40, lineHeight: 1.3, color: "#5f6572", maxWidth: 900 }}>{subtitle}</div>
                    <div style={{ position: "absolute", left: 96, bottom: 56, fontSize: 26, color: "#5f6572" }}>rishithakkar.com</div>
               </div>
          ),
          { ...OG_SIZE, fonts: FONTS },
     );
}
