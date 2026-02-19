"use client";

import React from "react";
import { motion } from "framer-motion";
import { HalftoneDots } from "./comic-elements";

export function AboutOverlay({ onClose, origin }: { onClose: () => void; origin: { x: number; y: number } | null }) {
     const greenAccent = "#00aa88";
     const darkGreen = "#003322";
     const inkBlack = "#000000";

     return (
          <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0, pointerEvents: "none" }}
               onClick={onClose}
               style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
               <motion.div
                    initial={origin ? { scale: 0, opacity: 0, x: origin.x - (typeof window !== 'undefined' ? window.innerWidth / 2 : 0), y: origin.y - (typeof window !== 'undefined' ? window.innerHeight / 2 : 0) } : { scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
                    exit={origin ? { scale: 0, opacity: 0, x: origin.x - (typeof window !== 'undefined' ? window.innerWidth / 2 : 0), y: origin.y - (typeof window !== 'undefined' ? window.innerHeight / 2 : 0) } : { scale: 0.9, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    onClick={e => e.stopPropagation()}
                    className="expanded-card"
                    style={{ width: "min(850px, 92vw)", background: greenAccent, border: "4px solid #000", boxShadow: `10px 10px 0 #000`, position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}
               >
                    <HalftoneDots color={darkGreen} opacity={0.2} size={10} />

                    {/* Header */}
                    <div style={{ background: inkBlack, padding: "12px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "4px solid #000" }}>
                         <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                              <span style={{ fontSize: 32 }}>💥</span>
                              <h2 style={{ fontFamily: "'Bangers', system-ui, sans-serif", fontSize: 36, color: greenAccent, letterSpacing: "0.05em", margin: 0, textTransform: "uppercase" }}>ABOUT ME</h2>
                         </div>
                         <button onClick={onClose} style={{ background: greenAccent, border: "2px solid #000", width: 36, height: 36, cursor: "pointer", fontFamily: "'Bangers', system-ui, sans-serif", fontSize: 18, color: "#000" }} onMouseEnter={e => e.currentTarget.style.background = "#fff"} onMouseLeave={e => e.currentTarget.style.background = greenAccent}>✕</button>
                    </div>

                    {/* Content Section */}
                    <motion.div
                         initial="hidden"
                         animate="visible"
                         variants={{
                              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
                         }}
                         style={{ padding: "24px 30px", display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 24, position: "relative", zIndex: 1, minHeight: 420 }}
                    >

                         {/* Left Column: Stats & Status */}
                         <motion.div
                              variants={{
                                   hidden: { opacity: 0, x: -20 },
                                   visible: { opacity: 1, x: 0, transition: { staggerChildren: 0.08 } }
                              }}
                              style={{ display: "flex", flexDirection: "column", gap: 16 }}
                         >
                              <motion.div
                                   variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                                   style={{ background: inkBlack, border: `3px solid ${greenAccent}`, padding: 15, position: "relative", boxShadow: "4px 4px 0 #000" }}
                              >
                                   <div style={{ position: "absolute", top: -12, left: 10, background: greenAccent, padding: "1px 8px", fontFamily: "'Bangers', system-ui, sans-serif", fontSize: 11, color: "#000", border: "2px solid #000" }}>Real quick</div>
                                   <div style={{ fontFamily: "'Kalam', cursive", fontWeight: 700, fontSize: 15, color: "#fff", textTransform: "uppercase", lineHeight: 1.4 }}>
                                        CS + ENTREPRENEURSHIP<br />
                                        @ CAL POLY SLO<br />
                                        CLASS OF 2028
                                   </div>
                              </motion.div>

                              <motion.div
                                   variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                                   style={{ background: "#fff", border: "3px solid #000", padding: 15, boxShadow: "6px 6px 0 #000", position: "relative" }}>
                                   <div style={{ position: "absolute", top: -12, left: 10, background: darkGreen, padding: "1px 8px", fontFamily: "'Bangers', system-ui, sans-serif", fontSize: 11, color: "#fff", border: "2px solid #fff" }}>CURRENTly</div>
                                   <div style={{ fontFamily: "'Kalam', cursive", fontWeight: 700, fontSize: 13, color: "#000", textTransform: "uppercase", lineHeight: 1.5 }}>
                                        🏗️ Incoming President & CO-FOUNDER @ CODEBOX<br />
                                        📊 SWE LEAD @ CAL POLY Quant finance<br />
                                        🍎 Teacher's Assistant @ Cal Poly CSSE
                                   </div>
                              </motion.div>

                              <motion.div
                                   variants={{ hidden: { opacity: 0, scale: 0.5 }, visible: { opacity: 1, scale: 1 } }}
                                   style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.9 }}>
                                   <span style={{ fontSize: 90, filter: "drop-shadow(6px 6px 0 #000)" }}>🚀</span>
                              </motion.div>
                         </motion.div>

                         {/* Right Column: Narrative */}
                         <motion.div
                              variants={{
                                   hidden: { opacity: 0, x: 20 },
                                   visible: { opacity: 1, x: 0, transition: { staggerChildren: 0.1 } }
                              }}
                              style={{ display: "flex", flexDirection: "column", gap: 16 }}
                         >
                              <motion.div
                                   variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
                                   style={{ background: "#FFE500", border: "3px solid #000", padding: "20px 24px", boxShadow: "8px 8px 0 #000" }}
                              >
                                   <h3 style={{ fontFamily: "'Bangers', system-ui, sans-serif", fontSize: 18, color: "#000", margin: "0 0 10px 0", borderBottom: "2px solid #000", paddingBottom: 4 }}>Abstract</h3>
                                   <p style={{ fontFamily: "'Kalam', cursive", fontWeight: 700, fontSize: 15, color: "#000", lineHeight: 1.7, margin: 0, textTransform: "uppercase" }}>
                                        I strongly resonate WITH THE "LEARN BY DOING" PHILOSOPHY. I SPEND MY time building software with impact, and CONNECTING fellow STUDENTS WITH OPPORTUNITIES
                                        <br /><br />
                                        FROM PITCHING a club i co-founded TO AUDIENCES OF hundreds, TO REFINING DATA MODELS FOR QUANTITATIVE FINANCE, MY GOAL IS CONSTANT: BRIDGE THE GAP BETWEEN THEORY AND REALITY.
                                        <br /><br />
                                        CURRENTLY ARCHITECTING SYSTEMS THAT EMPOWER THE NEXT GENERATION OF SOFTWARE ENGINEERS AT CAL POLY.
                                   </p>
                              </motion.div>

                              <motion.div
                                   variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                                   style={{ display: "flex", gap: 10 }}
                              >
                                   <a
                                        href="https://github.com/rishi-thak"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                             flex: 1, background: inkBlack, color: greenAccent, padding: "6px 12px", border: "2px solid #000",
                                             fontFamily: "'Bangers', system-ui, sans-serif", fontSize: 11, textAlign: "center", textTransform: "uppercase",
                                             boxShadow: "4px 4px 0 #000", textDecoration: "none", transition: "transform 0.1s, filter 0.1s", cursor: "pointer"
                                        }}
                                        onMouseEnter={e => { e.currentTarget.style.transform = "translate(-1px, -1px)"; e.currentTarget.style.filter = "brightness(1.2)"; }}
                                        onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.filter = "none"; }}
                                   >
                                        ALWAYS BUILDING
                                   </a>
                                   <a
                                        href="mailto:rjthakka@calpoly.edu"
                                        style={{
                                             flex: 1, background: greenAccent, color: "#000", padding: "6px 12px", border: "2px solid #000",
                                             fontFamily: "'Bangers', system-ui, sans-serif", fontSize: 11, textAlign: "center", textTransform: "uppercase",
                                             boxShadow: "4px 4px 0 #000", textDecoration: "none", transition: "transform 0.1s, filter 0.1s", cursor: "pointer"
                                        }}
                                        onMouseEnter={e => { e.currentTarget.style.transform = "translate(-1px, -1px)"; e.currentTarget.style.filter = "brightness(1.1)"; }}
                                        onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.filter = "none"; }}
                                   >
                                        reach out to learn more
                                   </a>
                              </motion.div>
                         </motion.div>
                    </motion.div>

                    {/* Footer strip */}
                    <div style={{ height: 25, background: inkBlack, display: "flex", alignItems: "center", padding: "0 20px", borderTop: "3px solid #000" }}>
                         {/* <div style={{ fontFamily: "'Kalam', cursive", fontWeight: 700, fontSize: 9, color: greenAccent }}>CONTINUED IN ISSUE #1 // CAL POLY SLO // EST. 2024</div> */}
                    </div>
               </motion.div>
          </motion.div>
     );
}
