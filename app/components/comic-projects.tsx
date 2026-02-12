"use client";

import { useState, useEffect, useRef } from "react";

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

function ActionLines({ color }: { color: string }) {
     return (
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.15 }} viewBox="0 0 300 380" preserveAspectRatio="none">
               {[...Array(14)].map((_, i) => {
                    const y = (i / 13) * 380;
                    return <line key={i} x1={-10} y1={y} x2={310} y2={y + (i % 3 === 0 ? 14 : 6)} stroke={color} strokeWidth={i % 4 === 0 ? "2.5" : "1"} />;
               })}
          </svg>
     );
}

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

function ProjectCard({ project, isExpanded, onToggle }: { project: typeof PROJECTS[0]; isExpanded: boolean; onToggle: () => void }) {
     const [hovered, setHovered] = useState(false);
     const [techVisible, setTechVisible] = useState(false);
     const { bg, ink } = project;

     useEffect(() => {
          if (hovered && !isExpanded) { const t = setTimeout(() => setTechVisible(true), 60); return () => clearTimeout(t); }
          if (!hovered) setTechVisible(false);
     }, [hovered, isExpanded]);

     return (
          <div
               onClick={onToggle}
               onMouseEnter={() => setHovered(true)}
               onMouseLeave={() => setHovered(false)}
               style={{
                    position: "relative", background: bg,
                    border: "4px solid #000",
                    outline: hovered && !isExpanded ? `3px solid ${ink}` : "3px solid transparent",
                    outlineOffset: 3, cursor: "pointer", overflow: "hidden",
                    width: isExpanded ? "min(880px, 94vw)" : 280,
                    minHeight: isExpanded ? "auto" : 360,
                    boxShadow: isExpanded ? "8px 8px 0 #000" : hovered ? "12px 12px 0 #000" : "5px 5px 0 #000",
                    transform: hovered && !isExpanded ? "translate(-4px,-4px)" : "translate(0,0)",
                    transition: "width 0.42s cubic-bezier(0.22,1,0.36,1), min-height 0.4s ease, transform 0.2s, box-shadow 0.2s, outline-color 0.15s",
                    flexShrink: 0, userSelect: "none",
               }}
          >
               <HalftoneDots color={ink} size={7} opacity={0.17} />

               {/* COLLAPSED */}
               {!isExpanded && (
                    <div style={{ height: 360, display: "flex", flexDirection: "column", position: "relative", zIndex: 1 }}>
                         <div style={{ background: "#000", padding: "4px 10px", display: "flex", justifyContent: "space-between", borderBottom: `3px solid ${ink}` }}>
                              <span style={{ fontFamily: "'Courier New', monospace", fontSize: 9, color: ink, letterSpacing: "0.2em" }}>{project.issue}</span>
                         </div>

                         <div style={{ flex: 1, padding: "14px 14px 10px", position: "relative", display: "flex", flexDirection: "column" }}>
                              {hovered && <ActionLines color={ink} />}

                              <div style={{
                                   fontFamily: "'Anton', 'Impact', sans-serif", fontSize: 42, lineHeight: 0.88,
                                   letterSpacing: "0.03em", color: ink,
                                   textShadow: `3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000`,
                                   marginBottom: 8, whiteSpace: "pre-line", position: "relative", zIndex: 1,
                              }}>{project.title}</div>

                              <div style={{
                                   background: "#000", color: ink,
                                   fontFamily: "'Anton', 'Impact', sans-serif", fontSize: 10, letterSpacing: "0.18em",
                                   padding: "3px 8px", display: "inline-block", alignSelf: "flex-start",
                                   marginBottom: 12, position: "relative", zIndex: 1,
                              }}>{project.tagline}</div>

                              <div style={{
                                   fontSize: 68, lineHeight: 1,
                                   filter: hovered ? `drop-shadow(4px 5px 0 #000) drop-shadow(-1px -1px 0 ${ink})` : "drop-shadow(3px 4px 0 #000)",
                                   transition: "filter 0.2s", marginBottom: 8,
                                   position: "relative", zIndex: 1,
                              }}>{project.coverEmoji}</div>
                         </div>

                         <div style={{
                              position: "absolute", bottom: 0, left: 0, right: 0,
                              background: "#000", borderTop: `3px solid ${ink}`,
                              padding: "10px 12px",
                              transform: techVisible ? "translateY(0)" : "translateY(103%)",
                              transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                         }}>
                              <div style={{ fontFamily: "'Anton', 'Impact', sans-serif", fontSize: 10, color: ink, letterSpacing: "0.2em", marginBottom: 6 }}>⚡ POWERED BY:</div>
                              <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 6 }}>
                                   {project.techStack.map(t => <TechChip key={t} name={t} bg={bg} ink={ink} />)}
                              </div>
                              <div style={{ fontFamily: "'Courier New', monospace", fontSize: 8, color: "#FFFFFF", letterSpacing: "0.12em" }}>▶ CLICK TO EXPAND</div>
                         </div>
                    </div>
               )}

               {/* EXPANDED */}
               {isExpanded && (
                    <div style={{ display: "flex", flexDirection: "column", position: "relative", zIndex: 1 }}>
                         <div style={{ background: "#000", borderBottom: `4px solid ${ink}`, display: "flex", alignItems: "stretch" }}>
                              <div style={{ width: 10, background: bg, borderRight: `3px solid ${ink}`, flexShrink: 0 }} />
                              <div style={{ padding: "12px 20px", flex: 1, display: "flex", alignItems: "center", gap: 16 }}>
                                   <span style={{ fontSize: 38 }}>{project.coverEmoji}</span>
                                   <div>
                                        <div style={{ fontFamily: "'Courier New', monospace", fontSize: 9, color: "#FFFFFF", letterSpacing: "0.2em" }}>{project.issue}</div>
                                        <div style={{ fontFamily: "'Anton', 'Impact', sans-serif", fontSize: 26, letterSpacing: "0.05em", color: ink, lineHeight: 1, textShadow: `2px 2px 0 ${bg}`, whiteSpace: "nowrap" }}>
                                             {project.title.replace("\n", " ")}
                                        </div>
                                        <div style={{ fontFamily: "'Courier New', monospace", fontSize: 10, color: "#FFFFFF", letterSpacing: "0.14em" }}>{project.tagline}</div>
                                   </div>
                              </div>
                              <button
                                   onClick={e => { e.stopPropagation(); onToggle(); }}
                                   style={{ background: ink, border: "none", borderLeft: "4px solid #000", width: 52, cursor: "pointer", fontFamily: "'Anton', 'Impact', sans-serif", fontSize: 22, color: "#000", flexShrink: 0 }}
                                   onMouseEnter={e => e.currentTarget.style.background = "#fff"}
                                   onMouseLeave={e => e.currentTarget.style.background = ink}
                              >✕</button>
                         </div>

                         <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 320 }}>
                              <div style={{ padding: "22px", borderRight: "4px solid #000", display: "flex", flexDirection: "column", gap: 16, position: "relative", overflow: "hidden" }}>
                                   <HalftoneDots color={ink} size={10} opacity={0.1} />
                                   <div style={{
                                        background: "#000", border: `3px solid ${ink}`, padding: "10px 14px",
                                        fontFamily: "'Courier New', monospace", fontSize: 12, color: "#e8e8e8",
                                        lineHeight: 1.65, letterSpacing: "0.02em", position: "relative", zIndex: 1,
                                        boxShadow: `4px 4px 0 ${ink}`,
                                   }}>
                                        <div style={{ position: "absolute", top: -14, left: 20, borderLeft: "10px solid transparent", borderRight: "10px solid transparent", borderBottom: `14px solid ${ink}` }} />
                                        <div style={{ position: "absolute", top: -9, left: 22, borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderBottom: "11px solid #000" }} />
                                        {project.description}
                                   </div>

                                   <div style={{ position: "relative", zIndex: 1 }}>
                                        <div style={{ fontFamily: "'Anton', 'Impact', sans-serif", fontSize: 10, letterSpacing: "0.22em", color: "#FFFFFF", marginBottom: 8, borderBottom: `2px solid ${ink}`, paddingBottom: 4 }}>BY THE NUMBERS</div>
                                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                                             {project.stats.map(s => <StatBlock key={s.l} {...s} ink={ink} />)}
                                        </div>
                                   </div>

                                   <div style={{ position: "relative", zIndex: 1 }}>
                                        <div style={{ fontFamily: "'Anton', 'Impact', sans-serif", fontSize: 10, letterSpacing: "0.22em", color: "#FFFFFF", marginBottom: 8, borderBottom: `2px solid ${ink}`, paddingBottom: 4 }}>STACK</div>
                                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                                             {project.techStack.map(t => <TechChip key={t} name={t} bg={bg} ink={ink} />)}
                                        </div>
                                   </div>
                              </div>

                              <div style={{ padding: "22px", display: "flex", flexDirection: "column", gap: 14, background: "#000", position: "relative", overflow: "hidden" }}>
                                   <HalftoneDots color={bg} size={9} opacity={0.07} />

                                   <div style={{ flex: 1, position: "relative", zIndex: 1, display: "flex", flexDirection: "column" }}>
                                        {project.demoUrl ? (
                                             <div style={{ border: `4px solid ${ink}`, boxShadow: `6px 6px 0 ${bg}`, height: "100%", display: "flex", flexDirection: "column" }}>
                                                  <div style={{ background: "#111", padding: "5px 10px", display: "flex", gap: 5, alignItems: "center", borderBottom: `2px solid ${ink}`, flexShrink: 0 }}>
                                                       {["#E8003A", "#FFE500", "#009933"].map(c => <span key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c, border: "1px solid #000", display: "inline-block" }} />)}
                                                       <span style={{ marginLeft: 6, fontFamily: "monospace", fontSize: 9, color: "#FFFFFF" }}>{project.demoUrl.replace("https://", "")}</span>
                                                  </div>
                                                  <iframe src={project.demoUrl} title={project.title} onClick={e => e.stopPropagation()} style={{ width: "100%", flex: 1, display: "block", border: "none", background: "#0a0a0a" }} />
                                             </div>
                                        ) : (
                                             <div style={{ height: "100%", border: `4px dashed ${ink}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
                                                  <span style={{ fontSize: 36 }}>🚧</span>
                                                  <span style={{ fontFamily: "'Anton', 'Impact', sans-serif", fontSize: 16, color: ink, letterSpacing: "0.14em" }}>DEMO INCOMING!</span>
                                             </div>
                                        )}
                                   </div>
                              </div>
                         </div>
                    </div>
               )}
          </div>
     );
}

function DraggableCard({ project, initialPos }: { project: typeof PROJECTS[0]; initialPos: { x: number; y: number } }) {
     const [isExpanded, setIsExpanded] = useState(false);

     // Drag state
     const [position, setPosition] = useState(initialPos);
     const [isDragging, setIsDragging] = useState(false);
     const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
     const hasDragged = useRef(false);
     const cardRef = useRef<HTMLDivElement>(null);

     const toggle = () => {
          if (!hasDragged.current) {
               setIsExpanded(!isExpanded);
          }
     };

     const handleMouseDown = (e: React.MouseEvent) => {
          setIsDragging(true);
          hasDragged.current = false;
          setDragOffset({
               x: e.clientX - position.x,
               y: e.clientY - position.y
          });
          e.preventDefault();
     };

     useEffect(() => {
          const handleMouseMove = (e: MouseEvent) => {
               if (isDragging) {
                    hasDragged.current = true;

                    let newX = e.clientX - dragOffset.x;
                    let newY = e.clientY - dragOffset.y;

                    // Clamping logic
                    if (cardRef.current) {
                         const rect = cardRef.current.getBoundingClientRect();
                         const margin = 10;
                         const maxX = window.innerWidth - rect.width - margin;
                         const maxY = window.innerHeight - rect.height - margin;

                         if (newX < margin) newX = margin;
                         if (newX > maxX) newX = maxX;
                         if (newY < margin) newY = margin;
                         if (newY > maxY) newY = maxY;
                    }

                    setPosition({ x: newX, y: newY });
               }
          };

          const handleMouseUp = () => {
               setIsDragging(false);
          };

          if (isDragging) {
               window.addEventListener('mousemove', handleMouseMove);
               window.addEventListener('mouseup', handleMouseUp);
          }

          return () => {
               window.removeEventListener('mousemove', handleMouseMove);
               window.removeEventListener('mouseup', handleMouseUp);
          };
     }, [isDragging, dragOffset]);

     return (
          <div
               ref={cardRef}
               className="card-ink"
               onMouseDown={handleMouseDown}
               style={{
                    position: 'fixed',
                    left: position.x,
                    top: position.y,
                    cursor: isDragging ? 'grabbing' : 'grab',
                    zIndex: isDragging ? 60 : 50,
                    touchAction: 'none'
               }}
          >
               <ProjectCard project={project} isExpanded={isExpanded} onToggle={toggle} />
          </div>
     );
}

export default function ComicProjectCards() {
     const [mounted, setMounted] = useState(false);

     useEffect(() => {
          setMounted(true);
     }, []);

     if (!mounted) return null;

     const startX = window.innerWidth / 2;

     return (
          <>
               <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
        
        @keyframes inkDrop {
          0%   { opacity: 0; transform: scale(0.86) skewX(-2deg); }
          65%  { transform: scale(1.03) skewX(0.5deg); }
          100% { opacity: 1; transform: scale(1) skewX(0deg); }
        }
        .card-ink { animation: inkDrop 0.5s cubic-bezier(0.22, 1, 0.36, 1) both; }
      `}</style>

               {PROJECTS.map((p, i) => (
                    <DraggableCard
                         key={p.id}
                         project={p}
                         initialPos={{
                              x: startX + (i === 0 ? -300 : 20),
                              y: 200
                         }}
                    />
               ))}
          </>
     );
}
