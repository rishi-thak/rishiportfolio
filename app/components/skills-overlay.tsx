"use client";

import React from "react";
import { HalftoneDots } from "./comic-elements";

export const SKILLS = [
     {
          category: "LANGUAGES",
          label: "THE FOUNDATION",
          items: ["Python", "TypeScript", "Java", "SQL", "JavaScript", "RISC-V Assembly", "C"],
          color: "#00bbcc",
          accent: "#003344"
     },
     {
          category: "FRAMEWORKS",
          label: "THE INFRASTRUCTURE",
          items: ["React", "React Native", "Next.js", "Node.js", "Expo", "Flask", "FastAPI"],
          color: "#cc2200",
          accent: "#ffcc00"
     },
     {
          category: "TOOLS & CLOUD",
          label: "THE UTILITY BELT",
          items: ["AWS", "Azure", "GCP", "Supabase", "SQLite", "REST APIs", "Git", "Pandas", "NumPy"],
          color: "#ccbb00",
          accent: "#443300"
     }
];

export function SkillsOverlay({ onClose }: { onClose: () => void }) {
     return (
          <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center" }}>
               <div onClick={e => e.stopPropagation()} className="expanded-card" style={{ width: "min(900px, 94vw)", height: "auto", maxHeight: "90vh", background: "#fff", border: "5px solid #000", boxShadow: `12px 12px 0 #000`, position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                    {/* Header */}
                    <div style={{ background: "#000", padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "5px solid #000" }}>
                         <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                              <span style={{ fontSize: 32 }}>⚡</span>
                              <h2 style={{ fontFamily: "'Bangers', system-ui, sans-serif", fontSize: 42, color: "#00bbcc", letterSpacing: "0.05em", margin: 0, textTransform: "uppercase" }}>SKILLS</h2>
                         </div>
                         <button onClick={onClose} style={{ background: "#00bbcc", border: "3px solid #000", width: 44, height: 44, cursor: "pointer", fontFamily: "'Bangers', system-ui, sans-serif", fontSize: 24, color: "#000" }} onMouseEnter={e => e.currentTarget.style.background = "#fff"} onMouseLeave={e => e.currentTarget.style.background = "#00bbcc"}>✕</button>
                    </div>

                    {/* Content Grid */}
                    <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "auto auto", padding: 8, gap: 8, background: "#000" }}>
                         {SKILLS.map((s: any, idx: number) => (
                              <div key={s.category} style={{
                                   gridColumn: idx === 2 ? "1 / span 2" : "auto",
                                   background: s.color, border: "4px solid #000", position: "relative", padding: 18, overflow: "hidden",
                                   display: "flex", flexDirection: "column"
                              }}>
                                   <HalftoneDots color={s.accent} opacity={0.15} size={10} />

                                   {/* Caption Tag */}
                                   <div style={{
                                        position: "absolute", top: 8, left: 8, background: "#FFE500", border: "2px solid #000",
                                        padding: "2px 8px", fontFamily: "'Bangers', system-ui, sans-serif", fontSize: 12, color: "#000", zIndex: 1
                                   }}>
                                        {s.label}
                                   </div>

                                   <div style={{ marginTop: 18, position: "relative", zIndex: 1 }}>
                                        <h3 style={{ fontFamily: "'Bangers', system-ui, sans-serif", fontSize: 24, color: s.accent, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.category}</h3>
                                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                             {s.items.map((item: string) => (
                                                  <div key={item} style={{
                                                       background: "#000", color: "#fff", border: "2px solid #000", padding: "4px 12px",
                                                       fontFamily: "'Kalam', cursive", fontWeight: 700, fontSize: 14, textTransform: "uppercase",
                                                       boxShadow: `3px 3px 0 ${s.accent}`
                                                  }}>
                                                       {item}
                                                  </div>
                                             ))}
                                        </div>
                                   </div>
                              </div>
                         ))}
                    </div>

                    {/* Footer strip - temporarily commented as in source */}
                    {/* <div style={{ height: 30, background: "#FFE500", borderTop: "5px solid #000", display: "flex", alignItems: "center", padding: "0 20px" }}>
                         <div style={{ fontFamily: "'Kalam', cursive", fontWeight: 700, fontSize: 10, color: "#000" }}>CLASSIFIED DATA // RISHI PORTFOLIO // PAGE 24</div>
                    </div> */}
               </div>
          </div>
     );
}
