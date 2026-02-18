"use client";

import React from "react";
import { motion } from "framer-motion";
import { HalftoneDots, TechChip } from "./comic-elements";

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

export function ProjectsHubOverlay({
     projects,
     onClose,
     onSelectProject,
     origin
}: {
     projects: Project[];
     onClose: () => void;
     onSelectProject: (index: number, e: React.MouseEvent) => void;
     origin: { x: number; y: number } | null
}) {
     return (
          <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0, pointerEvents: "none" }}
               onClick={onClose}
               style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
               <motion.div
                    initial={origin ? { scale: 0, opacity: 0, x: origin.x - (typeof window !== 'undefined' ? window.innerWidth / 2 : 0), y: origin.y - (typeof window !== 'undefined' ? window.innerHeight / 2 : 0) } : { scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
                    exit={origin ? { scale: 0, opacity: 0, x: origin.x - (typeof window !== 'undefined' ? window.innerWidth / 2 : 0), y: origin.y - (typeof window !== 'undefined' ? window.innerHeight / 2 : 0) } : { scale: 0.9, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    onClick={e => e.stopPropagation()}
                    style={{
                         width: "min(1000px, 94vw)",
                         height: "min(850px, 92vh)",
                         background: "#fff",
                         border: "5px solid #000",
                         boxShadow: `12px 12px 0 #000`,
                         position: "relative",
                         overflow: "hidden",
                         display: "flex",
                         flexDirection: "column"
                    }}
               >
                    {/* Header */}
                    <div style={{ background: "#000", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "5px solid #000" }}>
                         <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                              <span style={{ fontSize: 32 }}>📚</span>
                              <h2 style={{ fontFamily: "'Bangers', system-ui, sans-serif", fontSize: 42, color: "#fff", letterSpacing: "0.05em", margin: 0 }}>Projects</h2>
                         </div>
                         <button
                              onClick={onClose}
                              style={{
                                   background: "#fff",
                                   border: "3px solid #000",
                                   width: 44,
                                   height: 44,
                                   cursor: "pointer",
                                   fontFamily: "'Bangers', system-ui, sans-serif",
                                   fontSize: 24,
                                   color: "#000",
                                   boxShadow: "3px 3px 0 #000",
                                   display: "flex",
                                   alignItems: "center",
                                   justifyContent: "center"
                              }}
                              onMouseEnter={e => e.currentTarget.style.transform = "translate(-2px, -2px)"}
                              onMouseLeave={e => e.currentTarget.style.transform = "translate(0, 0)"}
                         >✕</button>
                    </div>

                    {/* Project Grid / Scrollable Area */}
                    <motion.div
                         initial="hidden"
                         animate="visible"
                         variants={{
                              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
                         }}
                         style={{
                              flex: 1,
                              overflowY: "auto",
                              background: "#f0f0f0",
                              padding: "30px",
                              position: "relative"
                         }}
                    >
                         <HalftoneDots color="#000" opacity={0.05} size={12} />

                         <div style={{
                              display: "grid",
                              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                              gap: 24
                         }}>
                              {projects.map((project, idx) => (
                                   <motion.div
                                        key={project.id}
                                        variants={{
                                             hidden: { opacity: 0, x: -20 },
                                             visible: {
                                                  opacity: 1,
                                                  x: 0,
                                                  transition: { type: "spring", damping: 25, stiffness: 200 }
                                             }
                                        }}
                                        whileHover={{ scale: 1.02, rotate: idx % 2 === 0 ? 0.5 : -0.5 }}
                                        onClick={(e) => onSelectProject(idx, e)}
                                        style={{
                                             background: project.bg,
                                             border: "4px solid #000",
                                             boxShadow: "8px 8px 0 #000",
                                             padding: "24px",
                                             cursor: "pointer",
                                             position: "relative",
                                             overflow: "hidden",
                                             minHeight: "260px",
                                             display: "flex",
                                             flexDirection: "column",
                                             justifyContent: "center"
                                        }}
                                   >
                                        <HalftoneDots color={project.ink} opacity={0.15} size={8} />
                                        <div style={{ position: "relative", zIndex: 1, pointerEvents: "none" }}>
                                             <div style={{ fontFamily: "'Kalam', cursive", fontWeight: 700, fontSize: 12, color: project.ink, opacity: 0.9, textTransform: "uppercase" }}>{project.issue}</div>
                                             <div style={{
                                                  fontFamily: "'Bangers', system-ui, sans-serif",
                                                  fontSize: 42,
                                                  color: project.ink,
                                                  lineHeight: 0.9,
                                                  textShadow: "2px 2px 0 #000",
                                                  margin: "8px 0",
                                                  textTransform: "uppercase"
                                             }}>{project.title}</div>
                                             <div style={{
                                                  background: "#000",
                                                  color: project.ink,
                                                  fontFamily: "'Bangers', system-ui, sans-serif",
                                                  fontSize: 12,
                                                  padding: "4px 10px",
                                                  display: "inline-block",
                                                  textTransform: "uppercase",
                                                  marginBottom: 12
                                             }}>{project.tagline}</div>
                                             <div style={{ fontSize: 54, filter: "drop-shadow(3px 3px 0 #000)" }}>{project.coverEmoji}</div>

                                             <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
                                                  {project.techStack.slice(0, 3).map(t => (
                                                       <TechChip key={t} name={t} bg={project.bg} ink={project.ink} />
                                                  ))}
                                             </div>
                                        </div>
                                   </motion.div>
                              ))}
                         </div>
                    </motion.div>

                    {/* Footer / Tip */}
                    <div style={{ background: "#000", height: 30, display: "flex", alignItems: "center", padding: "0 20px" }}>
                         {/* <p style={{ fontFamily: "'Kalam', cursive", color: "#666", fontSize: 11, margin: 0, textTransform: "uppercase" }}>
                              // service record // multiple entries detected // select for deep dive
                         </p> */}
                    </div>
               </motion.div>
          </motion.div>
     );
}
