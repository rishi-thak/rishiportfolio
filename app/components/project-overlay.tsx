"use client";

import React from "react";
import { HalftoneDots, TechChip, StatBlock } from "./comic-elements";

type Project = {
     id: number;
     issue: string;
     title: string;
     tagline: string;
     description: string;
     coverEmoji: string;
     bg: string;
     ink: string;
     techStack: string[];
     stats: { v: string; l: string }[];
     demoUrl: string;
};

export function ProjectOverlay({ project, onClose }: { project: Project; onClose: () => void }) {
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
                                   <div style={{ fontFamily: "'Kalam', cursive", fontWeight: 700, fontSize: 11, color: "#fff", letterSpacing: "0.05em", textTransform: "uppercase" }}>{project.issue}</div>
                                   <div style={{ fontFamily: "'Bangers', system-ui, sans-serif", fontSize: 30, color: ink, lineHeight: 1, textShadow: `2px 2px 0 ${bg}`, whiteSpace: "nowrap", textTransform: "uppercase", letterSpacing: "0.02em" }}>{project.title.replace("\n", " ")}</div>
                                   <div style={{ fontFamily: "'Kalam', cursive", fontWeight: 400, fontSize: 12, color: "#fff", letterSpacing: "0.05em", textTransform: "uppercase" }}>{project.tagline}</div>
                              </div>
                         </div>
                         <button onClick={onClose} style={{ background: ink, border: "none", borderLeft: "4px solid #000", width: 52, cursor: "pointer", fontFamily: "'Bangers', system-ui, sans-serif", fontSize: 26, color: "#000", flexShrink: 0 }} onMouseEnter={e => e.currentTarget.style.background = "#fff"} onMouseLeave={e => e.currentTarget.style.background = ink}>✕</button>
                    </div>
                    {/* Body */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 320 }}>
                         <div style={{ padding: 22, borderRight: "4px solid #000", display: "flex", flexDirection: "column", gap: 16, position: "relative", overflow: "hidden" }}>
                              <HalftoneDots color={ink} size={10} opacity={0.1} />
                              <div style={{ background: "#000", border: `3px solid ${ink}`, padding: "12px 16px", fontFamily: "'Kalam', cursive", fontWeight: 700, fontSize: 14, color: "#e8e8e8", lineHeight: 1.4, position: "relative", zIndex: 1, boxShadow: `4px 4px 0 ${ink}`, textTransform: "uppercase" }}>
                                   <div style={{ position: "absolute", top: -14, left: 20, borderLeft: "10px solid transparent", borderRight: "10px solid transparent", borderBottom: `14px solid ${ink}` }} />
                                   <div style={{ position: "absolute", top: -9, left: 22, borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderBottom: "11px solid #000" }} />
                                   {project.description}
                              </div>
                              <div style={{ position: "relative", zIndex: 1 }}>
                                   <div style={{ fontFamily: "'Bangers', system-ui, sans-serif", fontSize: 14, color: "#fff", letterSpacing: "0.1em", marginBottom: 8, borderBottom: `2px solid ${ink}`, paddingBottom: 4, textTransform: "uppercase" }}>BY THE NUMBERS</div>
                                   <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{project.stats.map(s => <StatBlock key={s.l} {...s} ink={ink} />)}</div>
                              </div>
                              <div style={{ position: "relative", zIndex: 1 }}>
                                   <div style={{ fontFamily: "'Bangers', system-ui, sans-serif", fontSize: 14, color: "#fff", letterSpacing: "0.1em", marginBottom: 8, borderBottom: `2px solid ${ink}`, paddingBottom: 4, textTransform: "uppercase" }}>STACK</div>
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
                                             <span style={{ fontFamily: "'Bangers', system-ui, sans-serif", fontSize: 20, color: ink, letterSpacing: "0.1em", textTransform: "uppercase" }}>DEMO INCOMING!</span>
                                        </div>
                                   )}
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
}
