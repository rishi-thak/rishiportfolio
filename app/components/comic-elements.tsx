import { motion } from "framer-motion";

/* ═══ SVG EFFECTS ═══ */

export function HalftoneDots({ color, size = 8, opacity = 0.2, hovered = false }: { color: string; size?: number; opacity?: number; hovered?: boolean }) {
     const id = `ht${color.replace(/[^a-z0-9]/gi, "")}${size}`;
     return (
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
               <defs>
                    <pattern id={id} x="0" y="0" width={size} height={size} patternUnits="userSpaceOnUse">
                         <circle cx={size / 2} cy={size / 2} r={size * 0.28} fill={color} opacity={opacity} />
                    </pattern>
               </defs>
               <motion.rect
                    width="100%" height="100%" fill={`url(#${id})`}
                    animate={hovered ? { rotate: 2 } : { rotate: 0 }}
                    transition={{ duration: 0.2 }}
               />
          </svg>
     );
}

export function RadialBurst({ color, opacity = 0.15, hovered = false }: { color: string; opacity?: number; hovered?: boolean }) {
     return (
          <motion.svg
               viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice"
               style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
               animate={hovered ? { scale: 1.1, opacity: Math.min(opacity * 1.5, 1) } : { scale: 1, opacity }}
               transition={{ duration: 0.3 }}
          >
               {[...Array(24)].map((_, i) => {
                    const angle = (i / 24) * Math.PI * 2;
                    const x2 = 100 + Math.cos(angle) * 150;
                    const y2 = 100 + Math.sin(angle) * 150;
                    return <line key={i} x1="100" y1="100" x2={x2} y2={y2} stroke={color} strokeWidth={i % 3 === 0 ? "3" : "1.5"} />;
               })}
          </motion.svg>
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

export function ThinkingBox({ text, color = "#000" }: { text: string; color?: string }) {
     return (
          <div style={{
               position: "absolute",
               top: 20,
               right: 20,
               zIndex: 10,
               background: "#fff",
               border: `3px solid #000`,
               padding: "8px 14px",
               transform: "rotate(2deg)",
               boxShadow: "4px 4px 0 rgba(0,0,0,0.2)",
               pointerEvents: "none"
          }}>
               <div style={{
                    fontFamily: "'Kalam', cursive",
                    fontWeight: 400,
                    fontSize: 14,
                    color: "#000",
                    textTransform: "uppercase",
                    lineHeight: 1.2
               }}>
                    {text}
               </div>
               {/* Thought bubbles tail - now on the right side */}
               <div style={{
                    position: "absolute",
                    bottom: -12,
                    right: 25,
                    width: 12,
                    height: 12,
                    background: "#fff",
                    border: `2px solid #000`,
                    borderRadius: "50%"
               }} />
               <div style={{
                    position: "absolute",
                    bottom: -22,
                    right: 40,
                    width: 7,
                    height: 7,
                    background: "#fff",
                    border: `2px solid #000`,
                    borderRadius: "50%"
               }} />
          </div>
     );
}
