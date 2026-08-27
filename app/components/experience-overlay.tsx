"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { HalftoneDots, TechChip } from "./comic-elements";

export function ExperienceOverlay({ onClose, origin }: { onClose: () => void; origin: { x: number; y: number } | null }) {
     useEffect(() => {
          const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
          window.addEventListener("keydown", handler);
          return () => window.removeEventListener("keydown", handler);
     }, [onClose]);
     const experiences = [
          {
               company: "AHEAD",
               role: "AI Engineer Intern",
               period: "June 2026 - Present",
               color: "#2E1065",
               accent: "#FACC15",
               points: [
                    "Built and shipped a RAG onboarding assistant for a municipal government with source-attributed vector retrieval, SSE streaming, dynamic prompt guardrails, and three RBAC-scoped workflows; demonstrated it to executive stakeholders",
                    "Developed deployment guidance and operational workflows for running models including Kimi K2.6 on RunAI-managed NVIDIA B300 clusters with KServe and Triton Inference Server for a major financial exchange",
                    "Shipped Python automation, Jira integrations, and CI/CD improvements for an internal agentic-AI platform used by a Fortune 100 financial-services engineering team; fixed production bugs and merged changes into core repositories"
               ],
               tags: ["RAG", "Inference", "Python"]
          },
          {
               company: "Scoop",
               role: "Founding Software Engineer (Contract)",
               period: "March 2026 - May 2026",
               color: "#cc2200",
               accent: "#FFEB4D",
               points: [
                    "First engineer hired by the founding team; designed and deployed a PostgreSQL RPC matching engine that grouped 101 riders by geographic proximity and travel direction while preventing duplicate assignment during concurrent booking requests",
                    "Modeled multi-stop pooled trips in PostgreSQL JSONB and implemented idempotent Stripe settlement with retry and failure-recovery for bookings of up to 12 riders"
               ],
               tags: ["PostgreSQL", "Stripe", "Full-Stack"]
          },
          {
               company: "Vectr",
               role: "Co-founder & Lead Engineer",
               period: "January 2026 - May 2026",
               color: "#00bbcc",
               accent: "#003344",
               points: [
                    "Co-founded and engineered an AI product-management workspace from prototype through pilots with six startup teams, securing a seed grant from RedBrick VC within three months",
                    "Built the document ingestion and embedding pipeline (pgvector, Supabase) powering source-attributed retrieval and a knowledge graph linking interviews, tickets, and usage data",
                    "Shipped agentic document generation with stakeholder briefs and guardrails flagging scope creep; used in pilot sprint planning"
               ],
               tags: ["Startup", "pgvector", "Agents"]
          },
          {
               company: "CodeBox",
               role: "Technical Lead & President",
               period: "April 2025 - Present",
               color: "#ccbb00",
               accent: "#443300",
               points: [
                    "Founded a student-run project accelerator at Cal Poly, selecting 50+ builders from 200+ applicants and launching five products that collectively acquired 700+ registered users in their first week",
                    "Directed 10 engineers across seven parallel workstreams, introducing PR review gates, schema ownership, and API contracts to coordinate React Native, Prisma, and Supabase development",
                    "Built CodeBox’s internal operations platform for 50 daily active users, centralizing team administration through Prisma models and five-level RBAC"
               ],
               tags: ["Leadership", "Full-Stack", "Community"]
          },
          {
               company: "Cal Poly Quantitative Finance",
               role: "Software Engineering Lead",
               period: "Dec 2024 - Present",
               color: "#00aa88",
               accent: "#003322",
               points: [
                    "Engineered scalable trading algorithms in Python, integrating data pipelines with yfinance and analytics with pandas; built parameter optimization and evaluated strategies against multi-year historical data",
                    "Designed and optimized trading models using custom backtesting frameworks and automated parameter tuning",
                    "Engineered pairs trading models with extensive Matplotlib visualizations to analyze correlation breakdowns, cointegration, and entry/exit signal performance across strategy iterations"
               ],
               tags: ["Python", "Algorithms", "FinTech"]
          },
          {
               company: "Noyce School of Computing",
               role: "Teacher’s Assistant",
               period: "Jan 2026 - Present",
               color: "#059669",
               accent: "#001A12",
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
               color: "#6B21A8",
               accent: "#E9D5FF",
               points: [
                    "Collaborated with faculty and peers to design and deploy React-based surveys integrated with EEG hardware",
                    "Supported data collection and cleaning for a machine learning pipeline predicting student sense of belonging — processed and structured 50+ student datapoints from EEG-integrated surveys"
               ],
               tags: ["React", "Research", "NeuroTech"]
          }
     ];

     return (
          <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0, pointerEvents: "none" }}
               onClick={onClose}
               role="dialog"
               aria-label="Experience"
               aria-modal="true"
               style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
               <motion.div
                    initial={origin ? { scale: 0, opacity: 0, x: origin.x - (typeof window !== 'undefined' ? window.innerWidth / 2 : 0), y: origin.y - (typeof window !== 'undefined' ? window.innerHeight / 2 : 0) } : { scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
                    exit={origin ? { scale: 0, opacity: 0, x: origin.x - (typeof window !== 'undefined' ? window.innerWidth / 2 : 0), y: origin.y - (typeof window !== 'undefined' ? window.innerHeight / 2 : 0) } : { scale: 0.9, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    onClick={e => e.stopPropagation()}
                    className="expanded-card"
                    style={{ width: "min(1000px, 94vw)", height: "min(850px, 92vh)", background: "#fff", border: "5px solid #000", boxShadow: `12px 12px 0 #000`, position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}
               >

                    {/* Header */}
                    <div style={{ background: "#000", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "5px solid #000" }}>
                         <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                              <span style={{ fontSize: 32 }}>📜</span>
                              <h2 style={{ fontFamily: "'Bangers', system-ui, sans-serif", fontSize: 42, color: "#ccbb00", letterSpacing: "0.05em", margin: 0, textTransform: "uppercase" }}>experience</h2>
                         </div>
                         <button onClick={onClose} style={{ background: "#ccbb00", border: "3px solid #000", width: 44, height: 44, cursor: "pointer", fontFamily: "'Bangers', system-ui, sans-serif", fontSize: 24, color: "#000" }} onMouseEnter={e => e.currentTarget.style.background = "#fff"} onMouseLeave={e => e.currentTarget.style.background = "#ccbb00"}>✕</button>
                    </div>

                    {/* Content Area */}
                    <div className="comic-scroll" style={{ flex: 1, overflowY: "auto", background: "#f0f0f0", padding: 20 }}>
                         <style>{`
                              @media (max-width: 768px) {
                                   .experience-entry {
                                        display: flex !important;
                                        flex-direction: column !important;
                                   }

                                   .experience-entry-brand {
                                        border-right: none !important;
                                        border-bottom: 4px solid #000 !important;
                                        justify-content: flex-start !important;
                                        gap: 14px !important;
                                   }

                                   .experience-entry-role {
                                        position: static !important;
                                        transform: rotate(-2deg);
                                        display: inline-block;
                                        margin-bottom: 12px;
                                   }
                              }
                         `}</style>
                         <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                              {experiences.map((exp, i) => (
                                   <motion.div
                                        key={i}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, amount: 0.1 }}
                                        variants={{
                                             hidden: { opacity: 0, x: -30 },
                                             visible: {
                                                  opacity: 1,
                                                  x: 0,
                                                  transition: {
                                                       type: "spring",
                                                       damping: 20,
                                                       stiffness: 100,
                                                       // Only apply delay to the first couple items to simulate stagger on open
                                                       delay: i < 2 ? i * 0.15 + 0.2 : 0
                                                  }
                                             }
                                        }}
                                        style={{
                                             display: "grid",
                                             gridTemplateColumns: "250px 1fr",
                                             background: "#fff",
                                             border: "4px solid #000",
                                             boxShadow: "8px 8px 0 #000",
                                             minHeight: 180,
                                             position: "relative",
                                             overflow: "hidden"
                                        }}
                                        className="experience-entry"
                                   >
                                        {/* Left Side: Brand Panel */}
                                        <div
                                             className="experience-entry-brand"
                                             style={{
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
                                                  <div style={{ fontFamily: "'Kalam', cursive", fontWeight: 700, fontSize: 13, color: exp.accent, textTransform: "uppercase", letterSpacing: "0.02em" }}>{exp.period}</div>
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
                                             }}
                                             className="experience-entry-role"
                                             >
                                                  {exp.role}
                                             </div>

                                             <div style={{ marginTop: 24 }}>
                                                  <ul style={{
                                                       listStyle: "none", padding: 0, margin: 0,
                                                       fontFamily: "'Kalam', cursive", fontWeight: 700,
                                                       fontSize: 15, color: "#1f1f1f", lineHeight: 1.5, display: "flex",
                                                       flexDirection: "column", gap: 12
                                                  }}>
                                                       {exp.points.map((p, idx) => (
                                                            <li key={idx} style={{ display: "flex", gap: 8 }}>
                                                                 <span style={{ color: exp.color, fontSize: 18 }}>▶</span>
                                                                 <span>{p}</span>
                                                            </li>
                                                       ))}
                                                  </ul>
                                             </div>
                                        </div>
                                   </motion.div>
                              ))}
                         </div>
                    </div>

                    {/* Footer strip */}
                    <div style={{ height: 30, background: "#000", display: "flex", alignItems: "center", padding: "0 20px" }}>
                         {/* <div style={{ fontFamily: "'Kalam', cursive", fontWeight: 700, fontSize: 10, color: "#ccbb00" }}>SERVICE RECORD // RISHI THAKKAR // CAL POLY ENGINEERING</div> */}
                    </div>
               </motion.div>
          </motion.div>
     );
}
