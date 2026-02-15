"use client";

import React from "react";
import { HalftoneDots } from "./comic-elements";

export function ContactOverlay({ onClose }: { onClose: () => void }) {
     const contactLinks = [
          { label: "EMAIL", value: "rjthakka@calpoly.edu", url: "mailto:rjthakka@calpoly.edu", icon: "📧" },
          { label: "LINKEDIN", value: "linkedin.com/in/rishi-thakkar1", url: "https://linkedin.com/in/rishi-thakkar1", icon: "💼" },
          { label: "GITHUB", value: "github.com/rishi-thak", url: "https://github.com/rishi-thak", icon: "💻" }
     ];

     return (
          <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center" }}>
               <div onClick={e => e.stopPropagation()} className="expanded-card" style={{ width: "min(600px, 90vw)", background: "#00aa88", border: "5px solid #000", boxShadow: `12px 12px 0 #000`, position: "relative", overflow: "hidden" }}>
                    <HalftoneDots color="#003322" opacity={0.15} size={10} />

                    {/* Header */}
                    <div style={{ background: "#000", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "5px solid #000" }}>
                         <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                              <span style={{ fontSize: 32 }}>🔗</span>
                              <h2 style={{ fontFamily: "'Bangers', system-ui, sans-serif", fontSize: 36, color: "#00aa88", letterSpacing: "0.05em", margin: 0, textTransform: "uppercase" }}>Contact</h2>
                         </div>
                         <button onClick={onClose} style={{ background: "#00aa88", border: "3px solid #000", width: 40, height: 40, cursor: "pointer", fontFamily: "'Bangers', system-ui, sans-serif", fontSize: 20, color: "#000" }} onMouseEnter={e => e.currentTarget.style.background = "#fff"} onMouseLeave={e => e.currentTarget.style.background = "#00aa88"}>✕</button>
                    </div>

                    {/* Content */}
                    <div style={{ padding: 30, display: "flex", flexDirection: "column", gap: 20, position: "relative", zIndex: 1 }}>
                         <div style={{ background: "#FFE500", border: "3px solid #000", padding: "10px 15px", fontFamily: "'Bangers', system-ui, sans-serif", fontSize: 14, color: "#000", alignSelf: "flex-start", marginBottom: 10, boxShadow: "4px 4px 0 #000" }}>
                              WANT TO REACH OUT? DON'T HESITATE!
                         </div>

                         {contactLinks.map((link) => (
                              <a
                                   key={link.label}
                                   href={link.url}
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   style={{
                                        display: "flex", alignItems: "center", gap: 15, background: "#000", border: "3px solid #000",
                                        padding: "12px 20px", textDecoration: "none", transition: "transform 0.1s", cursor: "pointer",
                                        boxShadow: "6px 6px 0 #003322"
                                   }}
                                   onMouseEnter={e => e.currentTarget.style.transform = "translate(-2px, -2px)"}
                                   onMouseLeave={e => e.currentTarget.style.transform = "none"}
                              >
                                   <span style={{ fontSize: 28 }}>{link.icon}</span>
                                   <div style={{ display: "flex", flexDirection: "column" }}>
                                        <span style={{ fontFamily: "'Bangers', system-ui, sans-serif", fontSize: 14, color: "#00aa88", letterSpacing: "0.05em" }}>{link.label}</span>
                                        <span style={{ fontFamily: "'Kalam', cursive", fontWeight: 700, fontSize: 16, color: "#fff", textTransform: "uppercase" }}>{link.value}</span>
                                   </div>
                              </a>
                         ))}
                    </div>

                    {/* Footer strip */}
                    <div style={{ height: 25, background: "#003322", display: "flex", alignItems: "center", padding: "0 20px", marginTop: 10 }}>
                         
                    </div>
               </div>
          </div>
     );
}
