"use client";

import { useState, useEffect } from "react";

const PROJECTS = [
     {
          id: 1, issue: "2024-2025",
          title: "Rishi's\nRecords", tagline: "Album Rating Tool",
          description: "An interactive music rating and discovery platform that lets users rate albums and explore recommendations. Flask REST API, persistent Supabase(PostgreSQL) storage, responsive UI, API-level caching, and asynchronous data fetching for real-time performance",
          coverEmoji: "🎧",
          bg: "#0024cc", ink: "#e6adcf",
          techStack: ["Python", "Flask", "React", "TypeScript", "Supabase", "Spotify API"],
          stats: [{ v: "240ms", l: "TTFB" }, { v: "<750ms", l: "LCP" }, { v: "99.9%", l: "UPTIME" }],
          demoUrl: "https://rrecords.vercel.app",
     },
     {
          id: 2, issue: "2024-2025",
          title: "WSB\nAnalyzer", tagline: "Reddit Sentiment Analysis",
          description: "A full-stack NLP tool analyzing 1,000+ WallStreetBets comments per request and scoring sentiment in real time. Features an asynchronous FastAPI backend for scraping/processing (improving data speed by 40%+) and a production-ready Next.js frontend achieving sub-200ms UI interactions.",
          coverEmoji: "🚀",
          bg: "#a7374b", ink: "#66ab56",
          techStack: ["Python", "FastAPI", "PRAW", "React", "Next.js", "Vercel"],
          stats: [{ v: "1K+", l: "COMMENTS" }, { v: "40%", l: "SPEED" }, { v: "<200ms", l: "LATENCY" }],
          demoUrl: "",
     }
];

type PanelDef = {
     clip: string;
     box: { left: string; top: string; width: string; height: string };
     type: "project" | "info";
     projectIndex?: number;
     bg?: string;
     accent?: string;
     emoji?: string;
     label?: string;
     effect?: "halftone" | "burst";
};

const PANELS: PanelDef[] = [
     {
          clip: "polygon(0 0, 36% 0, 39% 49%, 0 51%)",
          box: { left: "0", top: "0", width: "39%", height: "51%" },
          type: "project", projectIndex: 0
     },
     {
          clip: "polygon(37% 0, 69% 0, 66% 49%, 40% 49%)",
          box: { left: "37%", top: "0", width: "32%", height: "49%" },
          type: "project", projectIndex: 1
     },
     {
          clip: "polygon(70% 0, 100% 0, 100% 48%, 67% 49%)",
          box: { left: "67%", top: "0", width: "33%", height: "49%" },
          type: "info", bg: "#cc2200", accent: "#ffcc00", emoji: "💥", label: "ABOUT ME", effect: "burst"
     },
     {
          clip: "polygon(0 52%, 22% 51%, 26% 100%, 0 100%)",
          box: { left: "0", top: "51%", width: "26%", height: "49%" },
          type: "info", bg: "#00bbcc", accent: "#003344", emoji: "⚡", label: "SKILLS", effect: "halftone"
     },
     {
          clip: "polygon(23% 51%, 67% 50%, 64% 100%, 27% 100%)",
          box: { left: "23%", top: "50%", width: "44%", height: "50%" },
          type: "info", bg: "#ccbb00", accent: "#443300", emoji: "🔥", label: "PROJECTS", effect: "burst"
     },
     {
          clip: "polygon(68% 50%, 100% 49%, 100% 100%, 65% 100%)",
          box: { left: "65%", top: "49%", width: "35%", height: "51%" },
          type: "info", bg: "#00aa88", accent: "#003322", emoji: "🔗", label: "CONTACT", effect: "halftone"
     },
];

/* ═══ SVG EFFECTS ═══ */

function HalftoneDots({ color, size = 8, opacity = 0.2 }: { color: string; size?: number; opacity?: number }) {
     const id = `ht${color.replace(/[^a-z0-9]/gi, "")}${size}`;
     return (
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
               <defs>
                    <pattern id={id} x="0" y="0" width={size} height={size} patternUnits="userSpaceOnUse">
                         <circle cx={size / 2} cy={size / 2} r={size * 0.28} fill={color} opacity={opacity} />
                    </pattern>
               </defs>
               <rect width="100%" height="100%" fill={`url(#${id})`} />
          </svg>
     );
}

function RadialBurst({ color, opacity = 0.15 }: { color: string; opacity?: number }) {
     return (
          <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
               {[...Array(24)].map((_, i) => {
                    const angle = (i / 24) * Math.PI * 2;
                    const x2 = 100 + Math.cos(angle) * 150;
                    const y2 = 100 + Math.sin(angle) * 150;
                    return <line key={i} x1="100" y1="100" x2={x2} y2={y2} stroke={color} strokeWidth={i % 3 === 0 ? "3" : "1.5"} opacity={opacity} />;
               })}
          </svg>
     );
}

/* ═══ HELPERS ═══ */

function TechChip({ name, bg, ink }: { name: string; bg: string; ink: string }) {
     return (
          <span style={{
               display: "inline-block", background: ink, color: bg,
               border: "2px solid #000", padding: "2px 9px",
               fontSize: 10, fontFamily: "'Anton', 'Impact', sans-serif",
               letterSpacing: "0.12em", textTransform: "uppercase",
               lineHeight: "1.6", boxShadow: "2px 2px 0 #000", flexShrink: 0,
          }}>{name}</span>
     );
}

function StatBlock({ v, l, ink }: { v: string; l: string; ink: string }) {
     return (
          <div style={{
               display: "flex", flexDirection: "column", alignItems: "center",
               background: "#000", border: `3px solid ${ink}`,
               padding: "6px 10px", minWidth: 56, boxShadow: `3px 3px 0 ${ink}`,
          }}>
               <span style={{ fontFamily: "'Anton', 'Impact', sans-serif", fontSize: 20, color: ink, lineHeight: 1, letterSpacing: "0.04em" }}>{v}</span>
               <span style={{ fontFamily: "'Courier New', monospace", fontSize: 8, color: "#FFFFFF", letterSpacing: "0.15em", marginTop: 2 }}>{l}</span>
          </div>
     );
}

/* ═══ PANEL CONTENTS ═══ */

function ProjectPanel({ project, onClick }: { project: typeof PROJECTS[0]; onClick: () => void }) {
     const [hovered, setHovered] = useState(false);
     const { bg, ink } = project;
     return (
          <div
               onClick={onClick}
               onMouseEnter={() => setHovered(true)}
               onMouseLeave={() => setHovered(false)}
               style={{
                    width: "100%", height: "100%", background: bg,
                    display: "flex", flexDirection: "column", justifyContent: "center",
                    padding: "40px", position: "relative", overflow: "hidden",
                    cursor: "pointer", filter: hovered ? "brightness(1.12)" : "brightness(1)",
                    transition: "filter 0.2s",
               }}
          >
               <HalftoneDots color={ink} size={8} opacity={0.15} />
               {hovered && <RadialBurst color={ink} opacity={0.1} />}
               <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ fontFamily: "'Courier New', monospace", fontSize: 9, color: ink, letterSpacing: "0.2em", opacity: 0.8 }}>{project.issue}</div>
                    <div style={{
                         fontFamily: "'Anton', 'Impact', sans-serif", fontSize: "clamp(24px, 4vw, 54px)", lineHeight: 0.88,
                         color: ink, textShadow: `3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000`,
                         whiteSpace: "pre-line",
                    }}>{project.title}</div>
                    <div style={{
                         background: "#000", color: ink, fontFamily: "'Anton', 'Impact', sans-serif",
                         fontSize: 10, letterSpacing: "0.18em", padding: "3px 8px", alignSelf: "flex-start",
                    }}>{project.tagline}</div>
                    <div style={{ fontSize: "clamp(36px, 4.5vw, 64px)", lineHeight: 1, filter: "drop-shadow(3px 4px 0 #000)" }}>{project.coverEmoji}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 4 }}>
                         {project.techStack.slice(0, 3).map(t => <TechChip key={t} name={t} bg={bg} ink={ink} />)}
                    </div>
               </div>
          </div>
     );
}

function InfoPanel({ bg, accent, emoji, label, effect }: { bg: string; accent: string; emoji: string; label: string; effect: "halftone" | "burst" }) {
     const [hovered, setHovered] = useState(false);
     return (
          <div
               onMouseEnter={() => setHovered(true)}
               onMouseLeave={() => setHovered(false)}
               style={{
                    width: "100%", height: "100%", background: bg,
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    position: "relative", overflow: "hidden", cursor: "pointer",
                    filter: hovered ? "brightness(1.12)" : "brightness(1)", transition: "filter 0.2s",
               }}
          >
               {effect === "halftone" && <HalftoneDots color={accent} size={8} opacity={0.2} />}
               {effect === "burst" && <RadialBurst color={accent} opacity={0.15} />}
               <span style={{ fontSize: "clamp(32px, 5vw, 64px)", position: "relative", zIndex: 1 }}>{emoji}</span>
               <span style={{
                    fontFamily: "'Anton', 'Impact', sans-serif", fontSize: "clamp(16px, 2.5vw, 32px)",
                    color: accent, letterSpacing: "0.2em", position: "relative", zIndex: 1, marginTop: 8,
               }}>{label}</span>
          </div>
     );
}

/* ═══ EXPANDED PROJECT OVERLAY ═══ */

function ExpandedProject({ project, onClose }: { project: typeof PROJECTS[0]; onClose: () => void }) {
     const { bg, ink } = project;
     return (
          <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center" }}>
               <div onClick={e => e.stopPropagation()} className="expanded-card" style={{ width: "min(900px, 92vw)", background: bg, border: "4px solid #000", boxShadow: `8px 8px 0 #000`, position: "relative", overflow: "hidden" }}>
                    {/* Header */}
                    <div style={{ background: "#000", borderBottom: `4px solid ${ink}`, display: "flex", alignItems: "stretch" }}>
                         <div style={{ width: 10, background: bg, borderRight: `3px solid ${ink}`, flexShrink: 0 }} />
                         <div style={{ padding: "12px 20px", flex: 1, display: "flex", alignItems: "center", gap: 16 }}>
                              <span style={{ fontSize: 38 }}>{project.coverEmoji}</span>
                              <div>
                                   <div style={{ fontFamily: "'Courier New', monospace", fontSize: 9, color: "#fff", letterSpacing: "0.2em" }}>{project.issue}</div>
                                   <div style={{ fontFamily: "'Anton', 'Impact', sans-serif", fontSize: 26, color: ink, lineHeight: 1, textShadow: `2px 2px 0 ${bg}`, whiteSpace: "nowrap" }}>{project.title.replace("\n", " ")}</div>
                                   <div style={{ fontFamily: "'Courier New', monospace", fontSize: 10, color: "#fff", letterSpacing: "0.14em" }}>{project.tagline}</div>
                              </div>
                         </div>
                         <button onClick={onClose} style={{ background: ink, border: "none", borderLeft: "4px solid #000", width: 52, cursor: "pointer", fontFamily: "'Anton', 'Impact', sans-serif", fontSize: 22, color: "#000", flexShrink: 0 }} onMouseEnter={e => e.currentTarget.style.background = "#fff"} onMouseLeave={e => e.currentTarget.style.background = ink}>✕</button>
                    </div>
                    {/* Body */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 320 }}>
                         <div style={{ padding: 22, borderRight: "4px solid #000", display: "flex", flexDirection: "column", gap: 16, position: "relative", overflow: "hidden" }}>
                              <HalftoneDots color={ink} size={10} opacity={0.1} />
                              <div style={{ background: "#000", border: `3px solid ${ink}`, padding: "10px 14px", fontFamily: "'Courier New', monospace", fontSize: 12, color: "#e8e8e8", lineHeight: 1.65, position: "relative", zIndex: 1, boxShadow: `4px 4px 0 ${ink}` }}>
                                   <div style={{ position: "absolute", top: -14, left: 20, borderLeft: "10px solid transparent", borderRight: "10px solid transparent", borderBottom: `14px solid ${ink}` }} />
                                   <div style={{ position: "absolute", top: -9, left: 22, borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderBottom: "11px solid #000" }} />
                                   {project.description}
                              </div>
                              <div style={{ position: "relative", zIndex: 1 }}>
                                   <div style={{ fontFamily: "'Anton', 'Impact', sans-serif", fontSize: 10, color: "#fff", letterSpacing: "0.22em", marginBottom: 8, borderBottom: `2px solid ${ink}`, paddingBottom: 4 }}>BY THE NUMBERS</div>
                                   <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{project.stats.map(s => <StatBlock key={s.l} {...s} ink={ink} />)}</div>
                              </div>
                              <div style={{ position: "relative", zIndex: 1 }}>
                                   <div style={{ fontFamily: "'Anton', 'Impact', sans-serif", fontSize: 10, color: "#fff", letterSpacing: "0.22em", marginBottom: 8, borderBottom: `2px solid ${ink}`, paddingBottom: 4 }}>STACK</div>
                                   <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{project.techStack.map(t => <TechChip key={t} name={t} bg={bg} ink={ink} />)}</div>
                              </div>
                         </div>
                         <div style={{ padding: 22, background: "#000", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                              <HalftoneDots color={bg} size={9} opacity={0.07} />
                              <div style={{ flex: 1, position: "relative", zIndex: 1, display: "flex", flexDirection: "column" }}>
                                   {project.demoUrl ? (
                                        <div style={{ border: `4px solid ${ink}`, boxShadow: `6px 6px 0 ${bg}`, flex: 1, display: "flex", flexDirection: "column" }}>
                                             <div style={{ background: "#111", padding: "5px 10px", display: "flex", gap: 5, alignItems: "center", borderBottom: `2px solid ${ink}`, flexShrink: 0 }}>
                                                  {["#E8003A", "#FFE500", "#009933"].map(c => <span key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c, border: "1px solid #000", display: "inline-block" }} />)}
                                                  <span style={{ marginLeft: 6, fontFamily: "monospace", fontSize: 9, color: "#fff" }}>{project.demoUrl.replace("https://", "")}</span>
                                             </div>
                                             <iframe src={project.demoUrl} title={project.title} style={{ width: "100%", flex: 1, border: "none", background: "#0a0a0a" }} />
                                        </div>
                                   ) : (
                                        <div style={{ flex: 1, border: `4px dashed ${ink}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
                                             <span style={{ fontSize: 36 }}>🚧</span>
                                             <span style={{ fontFamily: "'Anton', 'Impact', sans-serif", fontSize: 16, color: ink, letterSpacing: "0.14em" }}>DEMO INCOMING!</span>
                                        </div>
                                   )}
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
}

/* ═══ MAIN COMIC PAGE ═══ */

export default function ComicPage() {
     const [expandedProject, setExpandedProject] = useState<number | null>(null);
     const [mounted, setMounted] = useState(false);

     useEffect(() => {
          setMounted(true);
     }, []);

     if (!mounted) {
          return <div style={{ background: "#fff", width: "100vw", height: "100vh" }} />;
     }

     return (
          <>
               <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
        .expanded-card {
          animation: popIn 0.3s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes popIn {
          0% { transform: scale(0.9); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>

               <div style={{ position: "relative", width: "100vw", height: "100vh", background: "#fff", overflow: "hidden" }}>
                    {PANELS.map((panel, i) => (
                         <div key={i} style={{
                              position: "absolute",
                              inset: 0,
                              clipPath: panel.clip,
                              pointerEvents: "none" // Allow clicks to pass through to the inner box
                         }}>
                              <div style={{
                                   position: "absolute",
                                   ...panel.box,
                                   pointerEvents: "auto" // Re-enable clicks for content
                              }}>
                                   {panel.type === "project" ? (
                                        <ProjectPanel
                                             project={PROJECTS[panel.projectIndex!]}
                                             onClick={() => setExpandedProject(panel.projectIndex!)}
                                        />
                                   ) : (
                                        <InfoPanel bg={panel.bg!} accent={panel.accent!} emoji={panel.emoji!} label={panel.label!} effect={panel.effect!} />
                                   )}
                              </div>
                         </div>
                    ))}
               </div>

               {expandedProject !== null && (
                    <ExpandedProject project={PROJECTS[expandedProject]} onClose={() => setExpandedProject(null)} />
               )}
          </>
     );
}
