"use client";

import type { MouseEvent, ReactNode } from "react";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { AboutOverlay } from "./about-overlay";
import { ContactOverlay } from "./contact-overlay";
import { ExperienceOverlay } from "./experience-overlay";
import { HalftoneDots, RadialBurst } from "./comic-elements";
import { ACTIVE_PROJECT_INDEX, COMIC_PROJECTS, HUB_PROJECTS } from "./comic-data";
import { ProjectOverlay } from "./project-overlay";
import { ProjectsHubOverlay } from "./projects-hub-overlay";
import { SkillsOverlay } from "./skills-overlay";

const FEATURED_PROJECT = COMIC_PROJECTS[ACTIVE_PROJECT_INDEX];
const CARD_SEAM_OFFSET = 24;
const CARD_SEAM_GAP = 10;
const CARD_CLIPS = [
     "polygon(0 0, 100% 0, 100% 88%, 0 100%)",
     "polygon(0 12%, 100% 0, 100% 100%, 0 88%)",
     "polygon(0 0, 100% 12%, 100% 88%, 0 100%)",
     "polygon(0 12%, 100% 0, 100% 100%, 0 88%)",
     "polygon(0 0, 100% 12%, 100% 88%, 0 100%)",
     "polygon(0 12%, 100% 0, 100% 100%, 0 100%)",
] as const;

function MobileCardFrame({
     bg,
     clipPath,
     children,
     onClick,
     stackIndex = 0,
}: {
     bg: string;
     clipPath: string;
     children: ReactNode;
     onClick: (event: MouseEvent<HTMLButtonElement>) => void;
     stackIndex?: number;
}) {
     return (
          <button
               type="button"
               onClick={onClick}
               style={{
                    display: "block",
                    width: "100%",
                    padding: 0,
                    border: "none",
                    background: "transparent",
                    textAlign: "inherit",
                    cursor: "pointer",
                    position: "relative",
                    zIndex: 1,
                    marginTop: stackIndex ? -(CARD_SEAM_OFFSET - CARD_SEAM_GAP) : 0,
               }}
          >
               <div style={{ background: bg, clipPath, position: "relative", overflow: "hidden" }}>
                    {children}
               </div>
          </button>
     );
}

function TitleCard({
     title,
     emoji,
     accent,
     decoration,
}: {
     title: string;
     emoji: string;
     accent: string;
     decoration: ReactNode;
}) {
     return (
          <div
               style={{
                    minHeight: 196,
                    padding: "34px 22px 42px",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
               }}
          >
               {decoration}
               <div
                    style={{
                         position: "relative",
                         zIndex: 1,
                         display: "flex",
                         alignItems: "center",
                         gap: 14,
                         width: "100%",
                    }}
               >
                    <span style={{ fontSize: 34, lineHeight: 1, filter: "drop-shadow(2px 3px 0 #000)" }}>{emoji}</span>
                    <h2
                         style={{
                              margin: 0,
                              color: accent,
                              fontFamily: "'Bangers', system-ui, sans-serif",
                              fontSize: "clamp(40px, 9vw, 58px)",
                              letterSpacing: "0.05em",
                              lineHeight: 0.95,
                              textTransform: "uppercase",
                         }}
                    >
                         {title}
                    </h2>
               </div>
          </div>
     );
}

export default function MobileWarning() {
     const [expandedProject, setExpandedProject] = useState<number | null>(null);
     const [skillsOpen, setSkillsOpen] = useState(false);
     const [contactOpen, setContactOpen] = useState(false);
     const [aboutOpen, setAboutOpen] = useState(false);
     const [experienceOpen, setExperienceOpen] = useState(false);
     const [projectsOpen, setProjectsOpen] = useState(false);
     const [openedFromHub, setOpenedFromHub] = useState(false);
     const [originRect, setOriginRect] = useState<{ x: number; y: number } | null>(null);

     const openOverlay = (setter: (value: boolean) => void, event: MouseEvent<Element>) => {
          const rect = event.currentTarget.getBoundingClientRect();
          setOriginRect({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
          setter(true);
     };

     const openProject = (index: number, event: MouseEvent<Element>) => {
          const rect = event.currentTarget.getBoundingClientRect();
          setOriginRect({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
          setExpandedProject(index);
     };

     return (
          <>
               <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Kalam:wght@300;400;700&display=swap');

                    @media (min-width: 769px) {
                         .mobile-warning-overlay {
                              display: none !important;
                         }
                    }

                    .mobile-warning-overlay {
                         position: fixed;
                         inset: 0;
                         z-index: 50;
                         background:
                              radial-gradient(circle at top left, rgba(0, 170, 136, 0.18), transparent 28%),
                              radial-gradient(circle at top right, rgba(0, 36, 204, 0.14), transparent 24%),
                              radial-gradient(circle at bottom left, rgba(204, 34, 0, 0.12), transparent 26%),
                              linear-gradient(180deg, #f9f6ef 0%, #efe8db 100%);
                         overflow-y: auto;
                         overscroll-behavior: contain;
                         -webkit-overflow-scrolling: touch;
                    }

                    .mobile-warning-inner {
                         min-height: 100dvh;
                         padding:
                              env(safe-area-inset-top)
                              0
                              env(safe-area-inset-bottom);
                    }
               `}</style>

               <div className="mobile-warning-overlay">
                    <div className="mobile-warning-inner">
                         <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 0 }}>
                              <MobileCardFrame bg="#00aa88" clipPath={CARD_CLIPS[0]} onClick={(event) => openOverlay(setAboutOpen, event)} stackIndex={0}>
                                   <TitleCard title="About Me" emoji="💥" accent="#003322" decoration={<RadialBurst color="#003322" opacity={0.12} />} />
                              </MobileCardFrame>

                              <MobileCardFrame bg="#ccbb00" clipPath={CARD_CLIPS[1]} onClick={(event) => openOverlay(setExperienceOpen, event)} stackIndex={1}>
                                   <TitleCard title="Experience" emoji="🔥" accent="#443300" decoration={<RadialBurst color="#443300" opacity={0.12} />} />
                              </MobileCardFrame>

                              <MobileCardFrame bg="#0024cc" clipPath={CARD_CLIPS[2]} onClick={(event) => openOverlay(setProjectsOpen, event)} stackIndex={2}>
                                   <TitleCard title="Projects" emoji="📚" accent="#e6adcf" decoration={<HalftoneDots color="#e6adcf" opacity={0.16} size={10} />} />
                              </MobileCardFrame>

                              <MobileCardFrame bg="#cc2200" clipPath={CARD_CLIPS[3]} onClick={(event) => openOverlay(setContactOpen, event)} stackIndex={3}>
                                   <TitleCard title="Contact" emoji="🔗" accent="#ffcc00" decoration={<HalftoneDots color="#ffcc00" opacity={0.16} size={10} />} />
                              </MobileCardFrame>

                              <MobileCardFrame bg="#00bbcc" clipPath={CARD_CLIPS[4]} onClick={(event) => openOverlay(setSkillsOpen, event)} stackIndex={4}>
                                   <TitleCard title="Skills" emoji="⚡" accent="#003344" decoration={<HalftoneDots color="#003344" opacity={0.16} size={10} />} />
                              </MobileCardFrame>

                              <MobileCardFrame bg={FEATURED_PROJECT.bg} clipPath={CARD_CLIPS[5]} onClick={(event) => openProject(ACTIVE_PROJECT_INDEX, event)} stackIndex={5}>
                                   <TitleCard
                                        title={FEATURED_PROJECT.title.replace("\n", " ")}
                                        emoji={FEATURED_PROJECT.coverEmoji}
                                        accent={FEATURED_PROJECT.ink}
                                        decoration={<HalftoneDots color={FEATURED_PROJECT.ink} opacity={0.12} size={10} />}
                                   />
                              </MobileCardFrame>
                         </div>
                    </div>
               </div>

               <AnimatePresence>
                    {projectsOpen ? (
                         <ProjectsHubOverlay
                              key="projects-hub-mobile"
                              projects={HUB_PROJECTS}
                              origin={originRect}
                              onClose={() => setProjectsOpen(false)}
                              onSelectProject={(index, event) => {
                                   setOpenedFromHub(true);
                                   setProjectsOpen(false);
                                   const originalIndex = COMIC_PROJECTS.indexOf(HUB_PROJECTS[index]);
                                   openProject(originalIndex, event);
                              }}
                         />
                    ) : null}

                    {expandedProject !== null ? (
                         <ProjectOverlay
                              key={`mobile-project-${expandedProject}`}
                              origin={originRect}
                              project={COMIC_PROJECTS[expandedProject]}
                              onClose={() => {
                                   if (openedFromHub) {
                                        setProjectsOpen(true);
                                   }
                                   setExpandedProject(null);
                                   setOpenedFromHub(false);
                              }}
                         />
                    ) : null}

                    {skillsOpen ? <SkillsOverlay key="mobile-skills" origin={originRect} onClose={() => setSkillsOpen(false)} /> : null}
                    {contactOpen ? <ContactOverlay key="mobile-contact" origin={originRect} onClose={() => setContactOpen(false)} /> : null}
                    {aboutOpen ? <AboutOverlay key="mobile-about" origin={originRect} onClose={() => setAboutOpen(false)} /> : null}
                    {experienceOpen ? <ExperienceOverlay key="mobile-experience" origin={originRect} onClose={() => setExperienceOpen(false)} /> : null}
               </AnimatePresence>
          </>
     );
}
