"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HalftoneDots, RadialBurst, TechChip } from "./comic-elements";
import { ProjectOverlay } from "./project-overlay";
import { SkillsOverlay } from "./skills-overlay";
import { ContactOverlay } from "./contact-overlay";
import { AboutOverlay } from "./about-overlay";
import { ExperienceOverlay } from "./experience-overlay";

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
          id: 2, issue: "2025",
          title: "WSB\nAnalyzer", tagline: "Reddit Sentiment Analysis",
          description: "A full-stack NLP tool analyzing 1,000+ WallStreetBets comments per request and scoring sentiment in real time. Features an asynchronous FastAPI backend for scraping/processing (improving data speed by 40%+) and a production-ready Next.js frontend achieving sub-200ms UI interactions.",
          coverEmoji: "🚀",
          bg: "#a7374b", ink: "#66ab56",
          techStack: ["Python", "FastAPI", "PRAW", "React", "Next.js", "Vercel"],
          stats: [{ v: "1K+", l: "COMMENTS" }, { v: "40%", l: "SPEED" }, { v: "<200ms", l: "LATENCY" }],
          demoUrl: "",
     }
];

type PanelDef = {
     clip: string;
     box: { left: string; top: string; width: string; height: string };
     type: "project" | "info";
     projectIndex?: number;
     bg?: string;
     accent?: string;
     emoji?: string;
     label?: string;
     effect?: "halftone" | "burst";
};

const PANELS: PanelDef[] = [
     {
          clip: "polygon(0 0, 36% 0, 39% 49%, 0 51%)",
          box: { left: "0", top: "0", width: "39%", height: "51%" },
          type: "project", projectIndex: 0
     },
     {
          clip: "polygon(37% 0, 69% 0, 66% 49%, 40% 49%)",
          box: { left: "37%", top: "0", width: "32%", height: "49%" },
          type: "project", projectIndex: 1
     },
     {
          clip: "polygon(70% 0, 100% 0, 100% 48%, 67% 49%)",
          box: { left: "67%", top: "0", width: "33%", height: "49%" },
          type: "info", bg: "#00aa88", accent: "#003322", emoji: "💥", label: "ABOUT ME", effect: "burst"
     },
     {
          clip: "polygon(0 52%, 22% 51%, 26% 100%, 0 100%)",
          box: { left: "0", top: "51%", width: "26%", height: "49%" },
          type: "info", bg: "#00bbcc", accent: "#003344", emoji: "⚡", label: "SKILLS", effect: "halftone"
     },
     {
          clip: "polygon(23% 51%, 67% 50%, 64% 100%, 27% 100%)",
          box: { left: "23%", top: "50%", width: "44%", height: "50%" },
          type: "info", bg: "#ccbb00", accent: "#443300", emoji: "🔥", label: "EXPERIENCE", effect: "burst"
     },
     {
          clip: "polygon(68% 50%, 100% 49%, 100% 100%, 65% 100%)",
          box: { left: "65%", top: "49%", width: "35%", height: "51%" },
          type: "info", bg: "#cc2200", accent: "#ffcc00", emoji: "🔗", label: "CONTACT", effect: "halftone"
     },
];

/* ═══ PANEL CONTENTS ═══ */

function ProjectPanel({ project, onClick }: { project: typeof PROJECTS[0]; onClick: (e: React.MouseEvent) => void }) {
     const [hovered, setHovered] = useState(false);
     const { bg, ink } = project;

     return (
          <div
               onClick={onClick}
               onMouseEnter={() => setHovered(true)}
               onMouseLeave={() => setHovered(false)}
               style={{
                    width: "100%", height: "100%", background: bg,
                    display: "flex", flexDirection: "column", justifyContent: "center",
                    padding: "40px", position: "relative", overflow: "hidden",
                    cursor: "pointer",
                    filter: hovered ? "brightness(1.12)" : "brightness(1)",
                    transition: "filter 0.2s",
               }}
          >
               <HalftoneDots color={ink} size={8} opacity={0.15} hovered={hovered} />
               <RadialBurst color={ink} opacity={0.1} hovered={hovered} />
               <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ fontFamily: "'Kalam', cursive", fontWeight: 700, fontSize: 11, color: ink, letterSpacing: "0.05em", opacity: 0.9, textTransform: "uppercase" }}>{project.issue}</div>
                    <div style={{
                         fontFamily: "'Bangers', system-ui, sans-serif", fontSize: "clamp(24px, 4vw, 54px)", lineHeight: 0.9,
                         color: ink, textShadow: `3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000`,
                         whiteSpace: "pre-line", textTransform: "uppercase", letterSpacing: "0.02em"
                    }}>{project.title}</div>
                    <div style={{
                         background: "#000", color: ink, fontFamily: "'Bangers', system-ui, sans-serif",
                         fontSize: 12, letterSpacing: "0.1em", padding: "4px 10px", alignSelf: "flex-start", textTransform: "uppercase"
                    }}>{project.tagline}</div>
                    <div style={{ fontSize: "clamp(36px, 4.5vw, 64px)", lineHeight: 1, filter: "drop-shadow(3px 4px 0 #000)" }}>{project.coverEmoji}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 4 }}>
                         {project.techStack.slice(0, 3).map(t => <TechChip key={t} name={t} bg={bg} ink={ink} />)}
                    </div>
               </div>
          </div>
     );
}

function InfoPanel({ bg, accent, emoji, label, effect, onClick }: { bg: string; accent: string; emoji: string; label: string; effect: "halftone" | "burst"; onClick?: (e: React.MouseEvent) => void }) {
     const [hovered, setHovered] = useState(false);

     return (
          <div
               onClick={onClick}
               onMouseEnter={() => setHovered(true)}
               onMouseLeave={() => setHovered(false)}
               style={{
                    width: "100%", height: "100%", background: bg,
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    position: "relative", overflow: "hidden", cursor: "pointer",
                    filter: hovered ? "brightness(1.12)" : "brightness(1)", transition: "filter 0.2s",
               }}
          >
               {effect === "halftone" && <HalftoneDots color={accent} size={8} opacity={0.2} hovered={hovered} />}
               {effect === "burst" && <RadialBurst color={accent} opacity={0.15} hovered={hovered} />}
               <span style={{ fontSize: "clamp(32px, 5vw, 64px)", position: "relative", zIndex: 1 }}>{emoji}</span>
               <span style={{
                    fontFamily: "'Bangers', system-ui, sans-serif", fontSize: "clamp(16px, 2.5vw, 32px)",
                    color: accent, letterSpacing: "0.1em", position: "relative", zIndex: 1, marginTop: 8,
                    textTransform: "uppercase"
               }}>{label}</span>
          </div>
     );
}

/* ═══ MAIN COMIC PAGE ═══ */

export default function ComicPage() {
     const [expandedProject, setExpandedProject] = useState<number | null>(null);
     const [skillsOpen, setSkillsOpen] = useState(false);
     const [contactOpen, setContactOpen] = useState(false);
     const [aboutOpen, setAboutOpen] = useState(false);
     const [experienceOpen, setExperienceOpen] = useState(false);
     const [mounted, setMounted] = useState(false);
     const [originRect, setOriginRect] = useState<{ x: number, y: number } | null>(null);

     useEffect(() => {
          setMounted(true);
     }, []);

     const openOverlay = (setter: (v: boolean) => void, e: React.MouseEvent) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setOriginRect({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
          setter(true);
     };

     const openProject = (index: number, e: React.MouseEvent) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setOriginRect({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
          setExpandedProject(index);
     };

     if (!mounted) {
          return <div style={{ background: "#fff", width: "100vw", height: "100vh" }} />;
     }

     return (
          <>
               <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Kalam:wght@300;400;700&display=swap');
      `}</style>

               <div style={{ position: "relative", width: "100vw", height: "100vh", background: "#fff", overflow: "hidden" }}>
                    {PANELS.map((panel, i) => (
                         <div key={i} style={{
                              position: "absolute",
                              inset: 0,
                              clipPath: panel.clip,
                              pointerEvents: "none"
                         }}>
                              <div style={{
                                   position: "absolute",
                                   ...panel.box,
                                   pointerEvents: "auto"
                              }}>
                                   {panel.type === "project" ? (
                                        <ProjectPanel
                                             project={PROJECTS[panel.projectIndex!]}
                                             onClick={(e) => openProject(panel.projectIndex!, e)}
                                        />
                                   ) : (
                                        <InfoPanel
                                             bg={panel.bg!}
                                             accent={panel.accent!}
                                             emoji={panel.emoji!}
                                             label={panel.label!}
                                             effect={panel.effect!}
                                             onClick={(e) => {
                                                  if (panel.label === "SKILLS") openOverlay(setSkillsOpen, e);
                                                  if (panel.label === "CONTACT") openOverlay(setContactOpen, e);
                                                  if (panel.label === "ABOUT ME") openOverlay(setAboutOpen, e);
                                                  if (panel.label === "EXPERIENCE") openOverlay(setExperienceOpen, e);
                                             }}
                                        />
                                   )}
                              </div>
                         </div>
                    ))}
               </div>

               <AnimatePresence>
                    {expandedProject !== null && (
                         <ProjectOverlay origin={originRect} project={PROJECTS[expandedProject]} onClose={() => setExpandedProject(null)} />
                    )}

                    {skillsOpen && (
                         <SkillsOverlay origin={originRect} onClose={() => setSkillsOpen(false)} />
                    )}

                    {contactOpen && (
                         <ContactOverlay origin={originRect} onClose={() => setContactOpen(false)} />
                    )}

                    {aboutOpen && (
                         <AboutOverlay origin={originRect} onClose={() => setAboutOpen(false)} />
                    )}

                    {experienceOpen && (
                         <ExperienceOverlay origin={originRect} onClose={() => setExperienceOpen(false)} />
                    )}
               </AnimatePresence>
          </>
     );
}
