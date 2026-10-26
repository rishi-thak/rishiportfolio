import type { Project } from "../content";

/*
 * Drawn previews of each project at a fixed 320×230 design size. They are
 * illustrations, so they're hidden from assistive tech; the project's title and
 * tagline always sit next to them as real text.
 */

export const ART_W = 320;
export const ART_H = 230;

export function Artboard({ project, className = "" }: { project: Project; className?: string }) {
     const { bg, ink } = project.colors;
     return (
          <div
               aria-hidden
               className={`artboard relative overflow-hidden select-none ${className}`}
               style={{ width: ART_W, height: ART_H, background: bg, color: ink }}
          >
               {project.slug === "nextcanvas" && <NextCanvasArt ink={ink} />}
               {project.slug === "haggle" && <HaggleArt ink={ink} />}
               {project.slug === "locus" && <LocusArt ink={ink} />}
               {project.slug === "bloom" && <BloomArt ink={ink} />}
          </div>
     );
}

/** A tiny app with one element selected, linked to the source line that renders it. */
function NextCanvasArt({ ink }: { ink: string }) {
     return (
          <>
               <div className="absolute top-5 right-5 left-5 h-[128px] rounded-[5px] bg-[#FFF7ED] px-4 pt-4 text-[#431407]">
                    <div className="flex gap-1">
                         <span className="size-1.5 rounded-full bg-[#431407]/25" />
                         <span className="size-1.5 rounded-full bg-[#431407]/25" />
                         <span className="size-1.5 rounded-full bg-[#431407]/25" />
                    </div>
                    <p className="mt-3 text-[17px] leading-tight font-semibold tracking-tight">Launch week</p>
                    <div className="mt-1.5 h-1.5 w-32 rounded-full bg-[#431407]/15" />
                    <div className="relative mt-3.5 inline-block">
                         <span className="block rounded-[4px] bg-[#7C2D12] px-2.5 py-1 text-[11px] font-medium text-[#FFF7ED]">
                              Get started
                         </span>
                         <span className="absolute -inset-[3px] border border-[var(--select)]" />
                         <span className="absolute -top-[18px] -left-[3px] bg-[var(--select)] px-1 font-mono text-[9px] leading-[15px] text-white">
                              Button
                         </span>
                    </div>
               </div>
               <div className="absolute right-5 bottom-5 left-5 font-mono text-[10.5px] leading-[1.6]">
                    <p className="opacity-55">app/page.tsx:14</p>
                    <p>
                         <span className="opacity-55">{"<Button>"}</span>
                         <span className="bg-[var(--select)]/35 px-0.5 text-white">Get started</span>
                         <span className="opacity-55">{"</Button>"}</span>
                    </p>
               </div>
               <svg className="absolute top-[118px] left-[118px]" width="14" height="64" viewBox="0 0 14 64" fill="none">
                    <path d="M7 0 V58" stroke={ink} strokeWidth="1" strokeDasharray="2 3" opacity="0.7" />
                    <path d="M3 54 L7 60 L11 54" stroke={ink} strokeWidth="1" opacity="0.7" />
               </svg>
          </>
     );
}

/** An iMessage thread with the agent. */
function HaggleArt({ ink }: { ink: string }) {
     const out = "ml-auto max-w-[70%] rounded-[14px] rounded-br-[4px] px-3 py-1.5 text-[#0a1033]";
     const inbound = "max-w-[78%] rounded-[14px] rounded-bl-[4px] bg-white/14 px-3 py-1.5 text-white";
     return (
          <div className="absolute inset-0 flex flex-col justify-end gap-1.5 p-5 text-[12px] leading-snug">
               <p className={out} style={{ background: ink }}>Find me a mover for Saturday</p>
               <p className={inbound}>Called 6 movers. Best offer is $340 for 9am. Book it?</p>
               <p className={out} style={{ background: ink }}>Book it</p>
               <p className="mt-0.5 text-right text-[9.5px] text-white/50">Paid into escrow</p>
          </div>
     );
}

const NODES = [
     { x: 62, y: 70, r: 7, label: "notes" },
     { x: 150, y: 48, r: 10, label: "Q3 plan" },
     { x: 240, y: 82, r: 6, label: "Maya" },
     { x: 112, y: 140, r: 8, label: "launch" },
     { x: 204, y: 160, r: 9, label: "pricing" },
     { x: 276, y: 178, r: 5, label: "" },
     { x: 44, y: 182, r: 5, label: "" },
];
const EDGES = [[0, 1], [1, 2], [1, 3], [3, 4], [2, 4], [4, 5], [3, 6], [0, 3]];

/** A small knowledge graph. */
function LocusArt({ ink }: { ink: string }) {
     return (
          <svg className="absolute inset-0" width={ART_W} height={ART_H} viewBox={`0 0 ${ART_W} ${ART_H}`}>
               {EDGES.map(([a, b]) => (
                    <line
                         key={`${a}-${b}`}
                         x1={NODES[a].x}
                         y1={NODES[a].y}
                         x2={NODES[b].x}
                         y2={NODES[b].y}
                         stroke={ink}
                         strokeOpacity="0.35"
                    />
               ))}
               {NODES.map((n) => (
                    <g key={`${n.x}-${n.y}`}>
                         <circle cx={n.x} cy={n.y} r={n.r + 5} fill={ink} fillOpacity="0.12" />
                         <circle cx={n.x} cy={n.y} r={n.r} fill={ink} />
                         {n.label && (
                              <text x={n.x + n.r + 7} y={n.y + 4} fill="#fff" fillOpacity="0.8" fontSize="11">
                                   {n.label}
                              </text>
                         )}
                    </g>
               ))}
          </svg>
     );
}

const WAVE = [8, 16, 28, 18, 36, 24, 12, 30, 40, 22, 14, 26, 34, 18, 10, 20, 30, 14, 8];
const FLOWERS = [
     { x: 44, stem: 34, r: 7 },
     { x: 96, stem: 52, r: 9 },
     { x: 150, stem: 26, r: 6 },
     { x: 200, stem: 60, r: 10 },
     { x: 254, stem: 40, r: 8 },
     { x: 292, stem: 22, r: 5 },
];

/** Someone explaining a topic out loud, with the study garden growing underneath. */
function BloomArt({ ink }: { ink: string }) {
     return (
          <>
               <div className="absolute top-5 left-5 flex items-center gap-2 text-[11.5px] text-white/80">
                    <span className="size-2 rounded-full" style={{ background: ink }} />
                    You&apos;re teaching: photosynthesis
               </div>
               <div className="absolute top-12 left-5 flex h-11 items-center gap-[3px]">
                    {WAVE.map((h, i) => (
                         <span key={i} className="w-[4px] rounded-full" style={{ height: h, background: ink, opacity: 0.55 + (h / 40) * 0.45 }} />
                    ))}
               </div>
               <svg className="absolute bottom-0 left-0" width={ART_W} height="96" viewBox={`0 0 ${ART_W} 96`}>
                    <line x1="0" y1="95" x2={ART_W} y2="95" stroke="#fff" strokeOpacity="0.15" />
                    {FLOWERS.map((f) => {
                         const cy = 95 - f.stem;
                         return (
                              <g key={f.x}>
                                   <line x1={f.x} y1="95" x2={f.x} y2={cy} stroke="#86EFAC" strokeOpacity="0.7" strokeWidth="2" />
                                   {[0, 72, 144, 216, 288].map((a) => (
                                        <circle
                                             key={a}
                                             cx={f.x + Math.cos((a * Math.PI) / 180) * f.r}
                                             cy={cy + Math.sin((a * Math.PI) / 180) * f.r}
                                             r={f.r * 0.62}
                                             fill={ink}
                                             fillOpacity="0.9"
                                        />
                                   ))}
                                   <circle cx={f.x} cy={cy} r={f.r * 0.45} fill="#FDE68A" />
                              </g>
                         );
                    })}
               </svg>
          </>
     );
}
