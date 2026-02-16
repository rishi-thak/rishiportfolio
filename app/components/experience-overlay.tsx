"use client";

import React from "react";
import { HalftoneDots, TechChip } from "./comic-elements";

export function ExperienceOverlay({ onClose }: { onClose: () => void }) {
     const experiences = [
          {
               company: "CodeBox",
               role: "Co-Founder & Incoming President",
               period: "April 2025 - Present",
               color: "#ccbb00",
               accent: "#443300",
               points: [
                    "Co-founded a CS club attracting 200+ applicants in its first year, with 35 selected to develop full-stack software projects",
                    "Built extensive internal tooling, including AssignCB - a full stack webapp for CodeBox to facilitate assignments through both club-wide initiatives and project-team specific tasks.",
                    "Successfully worked with a small team to launch codeboxorg.com, achieving 500+ users in under a month.",
                    "Building a project accelerator that empowers Cal Poly student engineers to design full-stack software"
               ],
               tags: ["Leadership", "Full-Stack", "Community"]
          },
          {
               company: "Cal Poly Quantitative Finance",
               role: "Software Engineering Lead",
               period: "Dec 2024 - Present",
               color: "#cc2200",
               accent: "#ffcc00",
               points: [
                    "Engineered scalable trading algorithms in Python, integrating yfinance and pandas",
                    "Optimized parameters and tested over multi-year data, achieving a 55% hypothetical return",
                    "Designed and optimized trading models using custom backtesting frameworks",
               ],
               tags: ["Python", "Algorithms", "FinTech"]
          },
          {
               company: "Noyce School of Computing",
               role: "Course Assistant",
               period: "Jan 2026 - Present",
               color: "#00bbcc",
               accent: "#003344",
               points: [
                    "Lead lab sections for 35+ students in CSC 101, guiding implementation of fundamental algorithms",
                    "Translate abstract programming concepts into actionable guidance in Python"
               ],
               tags: ["Education", "Mentoring", "Python"]
          },
          {
               company: "Belonging Beyond Boundaries",
               role: "Research Assistant",
               period: "Feb 2025 - May 2025",
               color: "#00aa88",
               accent: "#003322",
               points: [
                    "Designed and deployed React-based surveys integrated with EEG hardware",
                    "Contributed to data cleaning and neural network planning for cognitive analysis"
               ],
               tags: ["React", "Research", "NeuroTech"]
          }
     ];

     return (
          <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center" }}>
               <div onClick={e => e.stopPropagation()} className="expanded-card" style={{ width: "min(1000px, 94vw)", height: "min(850px, 92vh)", background: "#fff", border: "5px solid #000", boxShadow: `12px 12px 0 #000`, position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}>

                    {/* Header */}
                    <div style={{ background: "#000", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "5px solid #000" }}>
                         <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                              <span style={{ fontSize: 32 }}>📜</span>
                              <h2 style={{ fontFamily: "'Bangers', system-ui, sans-serif", fontSize: 42, color: "#ccbb00", letterSpacing: "0.05em", margin: 0, textTransform: "uppercase" }}>experience</h2>
                         </div>
                         <button onClick={onClose} style={{ background: "#ccbb00", border: "3px solid #000", width: 44, height: 44, cursor: "pointer", fontFamily: "'Bangers', system-ui, sans-serif", fontSize: 24, color: "#000" }} onMouseEnter={e => e.currentTarget.style.background = "#fff"} onMouseLeave={e => e.currentTarget.style.background = "#ccbb00"}>✕</button>
                    </div>

                    {/* Content Area */}
                    <div style={{ flex: 1, overflowY: "auto", background: "#f0f0f0", padding: 20 }}>
                         <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                              {experiences.map((exp, i) => (
                                   <div key={i} style={{
                                        display: "grid",
                                        gridTemplateColumns: "250px 1fr",
                                        background: "#fff",
                                        border: "4px solid #000",
                                        boxShadow: "8px 8px 0 #000",
                                        minHeight: 180,
                                        position: "relative",
                                        overflow: "hidden"
                                   }}>
                                        {/* Left Side: Brand Panel */}
                                        <div style={{
                                             background: exp.color,
                                             padding: 20,
                                             display: "flex",
                                             flexDirection: "column",
                                             justifyContent: "space-between",
                                             borderRight: "4px solid #000",
                                             position: "relative"
                                        }}>
                                             <HalftoneDots color={exp.accent} opacity={0.2} size={8} />
                                             <div style={{ position: "relative", zIndex: 1 }}>
                                                  <div style={{ fontFamily: "'Bangers', system-ui, sans-serif", fontSize: 28, color: exp.accent, lineHeight: 1, marginBottom: 4 }}>{exp.company}</div>
                                                  <div style={{ fontFamily: "'Kalam', cursive", fontWeight: 700, fontSize: 13, color: "#000", textTransform: "uppercase", letterSpacing: "0.02em" }}>{exp.period}</div>
                                             </div>
                                             <div style={{ display: "flex", flexWrap: "wrap", gap: 4, position: "relative", zIndex: 1 }}>
                                                  {exp.tags.map(t => <TechChip key={t} name={t} bg={exp.color} ink={exp.accent} />)}
                                             </div>
                                        </div>

                                        {/* Right Side: Mission Details */}
                                        <div style={{ padding: 20, position: "relative" }}>
                                             <div style={{
                                                  position: "absolute", top: 12, left: -10,
                                                  background: "#FFE500", border: "2px solid #000",
                                                  padding: "2px 10px", fontFamily: "'Bangers', system-ui, sans-serif",
                                                  fontSize: 12, transform: "rotate(-2deg)", zIndex: 5, color: "#000"
                                             }}>
                                                  {exp.role}
                                             </div>

                                             <div style={{ marginTop: 24 }}>
                                                  <ul style={{
                                                       listStyle: "none", padding: 0, margin: 0,
                                                       fontFamily: "'Kalam', cursive", fontWeight: 700,
                                                       fontSize: 14, color: "#333", display: "flex",
                                                       flexDirection: "column", gap: 10
                                                  }}>
                                                       {exp.points.map((p, idx) => (
                                                            <li key={idx} style={{ display: "flex", gap: 8 }}>
                                                                 <span style={{ color: exp.color, fontSize: 18 }}>▶</span>
                                                                 <span style={{ textTransform: "uppercase" }}>{p}</span>
                                                            </li>
                                                       ))}
                                                  </ul>
                                             </div>
                                        </div>
                                   </div>
                              ))}
                         </div>
                    </div>

                    {/* Footer strip */}
                    <div style={{ height: 30, background: "#000", display: "flex", alignItems: "center", padding: "0 20px" }}>
                         {/* <div style={{ fontFamily: "'Kalam', cursive", fontWeight: 700, fontSize: 10, color: "#ccbb00" }}>SERVICE RECORD // RISHI THAKKAR // CAL POLY ENGINEERING</div> */}
                    </div>
               </div>
          </div>
     );
}
