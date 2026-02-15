"use client";

import React from "react";

/* ═══ SVG EFFECTS ═══ */

export function HalftoneDots({ color, size = 8, opacity = 0.2 }: { color: string; size?: number; opacity?: number }) {
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

export function RadialBurst({ color, opacity = 0.15 }: { color: string; opacity?: number }) {
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

export function TechChip({ name, bg, ink }: { name: string; bg: string; ink: string }) {
     return (
          <span style={{
               display: "inline-block", background: ink, color: bg,
               border: "2px solid #000", padding: "2px 9px",
               fontSize: 10, fontFamily: "'Bangers', system-ui, sans-serif",
               letterSpacing: "0.08em", textTransform: "uppercase",
               lineHeight: "1.6", boxShadow: "2px 2px 0 #000", flexShrink: 0,
          }}>{name}</span>
     );
}

export function StatBlock({ v, l, ink }: { v: string; l: string; ink: string }) {
     return (
          <div style={{
               display: "flex", flexDirection: "column", alignItems: "center",
               background: "#000", border: `3px solid ${ink}`,
               padding: "6px 10px", minWidth: 56, boxShadow: `3px 3px 0 ${ink}`,
          }}>
               <span style={{ fontFamily: "'Bangers', system-ui, sans-serif", fontSize: 22, color: ink, lineHeight: 1, letterSpacing: "0.06em", textTransform: "uppercase" }}>{v}</span>
               <span style={{ fontFamily: "'Kalam', cursive", fontWeight: 700, fontSize: 9, color: "#FFFFFF", letterSpacing: "0.05em", marginTop: 2, textTransform: "uppercase" }}>{l}</span>
          </div>
     );
}
