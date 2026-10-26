"use client";

import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Project } from "../content";
import { Artboard } from "./artboards";
import { DISPLAY_H2 } from "./display";

/*
 * The project frames are laid out by a plain CSS grid — that's what crawlers,
 * no-JS visitors and reduced-motion visitors see. With motion allowed, each
 * frame is pulled out of its grid slot into a loose pile over the hero's
 * `pileAnchorId` element. Scrolling down the page deals the frames back into
 * the grid — nothing is pinned, so the deal costs no extra scroll.
 *
 * Motion, all driven by the visitor (scroll, pointer, drag):
 *  - the deal follows scroll through a smoothed value, so wheel steps glide;
 *  - each frame is tossed along an arc with a little 3D tilt, lifting off the
 *    canvas mid-flight, then overshoots its slot and snaps in with a flash of
 *    the selection box;
 *  - while still piled in the hero, the pile fans out under the pointer;
 *  - a dragged frame lifts and leans into the direction it's moving.
 */

// Pile pose per frame: nudge from the pile centre (px) and tilt (deg).
const PILE = [
     { x: -10, y: 8, r: -6 },
     { x: 14, y: -10, r: 5 },
     { x: -16, y: -6, r: -11 },
     { x: 8, y: 14, r: 9 },
     { x: -4, y: -16, r: 3 },
];

// How far each frame slides out when the pointer is over the pile.
const FAN = [
     { x: -46, y: -14, r: -9 },
     { x: 40, y: -26, r: 8 },
     { x: -60, y: 26, r: -15 },
     { x: 54, y: 30, r: 14 },
     { x: 4, y: -44, r: 4 },
];

// Fraction of the deal at which each frame starts moving, and how long it takes.
const DEAL_STAGGER = 0.1;
const DEAL_LENGTH = 0.6;

// Smoothing time constants (seconds): how quickly each value catches up with its target.
const TAU_PROGRESS = 0.14;
const TAU_FAN = 0.2;
const TAU_POINTER = 0.25;
const TAU_TILT = 0.12;

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
// Eases past 1 and back, so a frame overshoots its slot slightly before settling.
const easeOutBack = (t: number) => {
     const c1 = 1.25;
     const c3 = c1 + 1;
     return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};
const approach = (from: number, to: number, dt: number, tau: number) => from + (to - from) * (1 - Math.exp(-dt / tau));

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function ProjectCanvas({ projects, pileAnchorId }: { projects: Project[]; pileAnchorId: string }) {
     const sectionRef = useRef<HTMLElement>(null);
     const gridRef = useRef<HTMLUListElement>(null);
     const frameRefs = useRef<(HTMLLIElement | null)[]>([]);

     const n = projects.length;
     const motion = useRef({
          target: 1,
          current: 1,
          fanTarget: 0,
          fan: 0,
          pointerTarget: { x: 0, y: 0 },
          pointer: { x: 0, y: 0 },
          tiltTarget: Array.from({ length: n }, () => 0),
          tilt: Array.from({ length: n }, () => 0),
          landed: Array.from({ length: n }, () => true),
     });
     const toPile = useRef(projects.map(() => ({ x: 0, y: 0 })));
     const pileScale = useRef(1);
     const range = useRef({ start: 0, end: 1 });
     const dragOffset = useRef(projects.map(() => ({ x: 0, y: 0 })));
     const drag = useRef<{
          i: number; startX: number; startY: number; ox: number; oy: number;
          moved: boolean; id: number; lastX: number; lastT: number; vx: number;
     } | null>(null);
     const justDragged = useRef(false);
     const topZ = useRef(n);
     const animated = useRef(false);
     const raf = useRef(0);
     const lastFrame = useRef(0);

     const [ready, setReady] = useState(false);
     const [rearranged, setRearranged] = useState(false);
     const [tidying, setTidying] = useState(false);

     /** Briefly flash the selection box on a frame that just locked into its slot. */
     const snap = (el: HTMLLIElement) => {
          el.classList.remove("is-snapped");
          void el.offsetWidth; // restart the CSS animation
          el.classList.add("is-snapped");
          window.setTimeout(() => el.classList.remove("is-snapped"), 750);
     };

     const render = useCallback(() => {
          const m = motion.current;
          const still = !animated.current;
          const p = still ? 1 : m.current;
          const dealingDown = m.target >= m.current;

          frameRefs.current.forEach((el, i) => {
               if (!el) return;
               const off = dragOffset.current[i];
               const dragging = drag.current?.i === i && drag.current.moved;

               if (still) {
                    el.style.transform = `translate3d(${off.x}px, ${off.y}px, 0)`;
                    el.style.setProperty("--settle", "1");
                    el.style.setProperty("--lift", dragging ? "0.6" : "0");
                    return;
               }

               const tl = clamp((p - i * DEAL_STAGGER) / DEAL_LENGTH, 0, 1);
               const k = 1 - easeOutBack(tl); // slightly negative near the end: the overshoot
               const kPile = 1 - easeInOut(tl); // never negative: how "in the pile" the frame still is
               const arc = Math.sin(Math.PI * tl); // 0 at both ends, 1 mid-flight

               const home = toPile.current[i];
               const len = Math.hypot(home.x, home.y) || 1;
               // Unit vectors: along the flight (pile → slot) and across it.
               const fx = -home.x / len;
               const fy = -home.y / len;
               const side = i % 2 ? 1 : -1;
               const arcAmp = Math.min(150, len * 0.22) * side;

               const pile = PILE[i % PILE.length];
               const fan = FAN[i % FAN.length];
               const f = m.fan * kPile;
               const depth = 6 + i * 5;

               const x = home.x * k + pile.x * kPile + -fy * arcAmp * arc + fan.x * f + m.pointer.x * depth * kPile + off.x;
               const y = home.y * k + pile.y * kPile + fx * arcAmp * arc + fan.y * f + m.pointer.y * depth * kPile + off.y;
               const rz = pile.r * kPile + fan.r * f + side * 9 * arc + m.tilt[i];
               const rx = fy * 16 * arc;
               const ry = -fx * 16 * arc;
               const scale = 1 + (pileScale.current * 0.96 - 1) * kPile + 0.05 * arc + (dragging ? 0.03 : 0);

               el.style.transform =
                    `perspective(1000px) translate3d(${x}px, ${y}px, 0) rotateX(${rx}deg) rotateY(${ry}deg) rotate(${rz}deg) scale(${scale})`;
               el.style.setProperty("--settle", easeInOut(tl).toFixed(3));
               el.style.setProperty("--lift", Math.max(arc, dragging ? 0.6 : 0).toFixed(3));

               // Snap flash when a frame lands while dealing downward; re-arm once it leaves its slot.
               if (tl >= 1 && !m.landed[i]) {
                    m.landed[i] = true;
                    if (dealingDown) snap(el);
               } else if (tl < 0.9) {
                    m.landed[i] = false;
               }
          });
     }, []);

     // One animation loop for everything that eases: deal progress, fan, pointer parallax, drag tilt.
     const loop = useCallback(
          function frame(now: number) {
               const m = motion.current;
               const dt = Math.min(0.05, (now - lastFrame.current) / 1000);
               lastFrame.current = now;

               m.current = approach(m.current, m.target, dt, TAU_PROGRESS);
               m.fan = approach(m.fan, m.fanTarget, dt, TAU_FAN);
               m.pointer.x = approach(m.pointer.x, m.pointerTarget.x, dt, TAU_POINTER);
               m.pointer.y = approach(m.pointer.y, m.pointerTarget.y, dt, TAU_POINTER);
               let tiltMoving = false;
               for (let i = 0; i < n; i++) {
                    m.tilt[i] = approach(m.tilt[i], m.tiltTarget[i], dt, TAU_TILT);
                    if (Math.abs(m.tilt[i] - m.tiltTarget[i]) > 0.05) tiltMoving = true;
               }
               render();

               const settled =
                    Math.abs(m.current - m.target) < 0.0005 &&
                    Math.abs(m.fan - m.fanTarget) < 0.002 &&
                    Math.abs(m.pointer.x - m.pointerTarget.x) < 0.002 &&
                    Math.abs(m.pointer.y - m.pointerTarget.y) < 0.002 &&
                    !tiltMoving;
               raf.current = settled ? 0 : requestAnimationFrame(frame);
          },
          [n, render],
     );

     const kick = useCallback(() => {
          if (raf.current || !animated.current) return;
          lastFrame.current = performance.now();
          raf.current = requestAnimationFrame(loop);
     }, [loop]);

     // Vector from each frame's grid slot to the pile spot, plus the scroll range of the deal.
     const measure = useCallback(() => {
          const grid = gridRef.current;
          const section = sectionRef.current;
          const anchor = document.getElementById(pileAnchorId);
          if (!grid || !section || !anchor) return;

          const a = anchor.getBoundingClientRect();
          const g = grid.getBoundingClientRect(); // the grid itself is never transformed
          const ax = a.left + a.width / 2;
          const ay = a.top + a.height / 2;
          let artWidth = 320;

          frameRefs.current.forEach((el, i) => {
               if (!el) return;
               const art = el.querySelector<HTMLElement>(".frame-art");
               if (!art) return;
               artWidth = art.offsetWidth;
               const cx = art.offsetLeft + art.offsetWidth / 2;
               const cy = art.offsetTop + art.offsetHeight / 2;
               // Pivot on the artwork, not the whole frame, so the pile centres on the pictures.
               el.style.transformOrigin = `${cx}px ${cy}px`;
               toPile.current[i] = { x: ax - (g.left + el.offsetLeft + cx), y: ay - (g.top + el.offsetTop + cy) };
          });

          pileScale.current = clamp(a.width / (artWidth * 1.08), 0.85, 1.7);

          // Start dealing once the pile is a little above the middle of the screen;
          // finish when the Projects section reaches the top.
          const vh = window.innerHeight;
          const start = Math.max(0, a.top + window.scrollY + a.height / 2 - vh * 0.55);
          const end = Math.max(start + 200, section.getBoundingClientRect().top + window.scrollY - 8);
          range.current = { start, end };
     }, [pileAnchorId]);

     /** Recompute the scroll target; `jump` skips the easing (first paint, resizes). */
     const sync = useCallback(
          (jump: boolean) => {
               // Re-measure every time: it's only a few layout reads (transforms don't affect
               // them), and it means late layout shifts can never leave the pile pointing at a stale spot.
               measure();
               const { start, end } = range.current;
               const m = motion.current;
               m.target = clamp((window.scrollY - start) / (end - start), 0, 1);
               if (jump) {
                    m.current = m.target;
                    // Frames already in their slots shouldn't flash on load.
                    m.landed = m.landed.map((_, i) => clamp((m.current - i * DEAL_STAGGER) / DEAL_LENGTH, 0, 1) >= 1);
                    render();
               } else {
                    kick();
               }
          },
          [measure, render, kick],
     );

     useIsoLayoutEffect(() => {
          const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
          const finePointer = window.matchMedia("(pointer: fine)");

          const setup = () => {
               animated.current = !reduce.matches;
               sync(true);
          };
          const onScroll = () => sync(false);

          // The pile fans out and follows the pointer while it's still sitting in the hero.
          const onPointer = (e: PointerEvent) => {
               if (!animated.current || !finePointer.matches) return;
               const m = motion.current;
               if (m.current > 0.35 && m.fanTarget === 0) return; // pile already dealt: nothing to react
               const anchor = document.getElementById(pileAnchorId);
               if (!anchor) return;
               const a = anchor.getBoundingClientRect();
               const cx = a.left + a.width / 2;
               const cy = a.top + a.height / 2;
               m.pointerTarget = { x: clamp((e.clientX - cx) / 400, -1, 1), y: clamp((e.clientY - cy) / 400, -1, 1) };
               const pad = 40;
               const over = e.clientX > a.left - pad && e.clientX < a.right + pad && e.clientY > a.top - pad && e.clientY < a.bottom + pad;
               m.fanTarget = over ? 1 : 0;
               kick();
          };

          setup();
          setReady(true);

          // Anything that moves the hero or the grid (fonts loading, resizes) changes the vectors.
          const ro = new ResizeObserver(setup);
          ro.observe(document.body);
          window.addEventListener("scroll", onScroll, { passive: true });
          window.addEventListener("resize", setup);
          window.addEventListener("pointermove", onPointer, { passive: true });
          reduce.addEventListener("change", setup);
          return () => {
               cancelAnimationFrame(raf.current);
               raf.current = 0;
               ro.disconnect();
               window.removeEventListener("scroll", onScroll);
               window.removeEventListener("resize", setup);
               window.removeEventListener("pointermove", onPointer);
               reduce.removeEventListener("change", setup);
          };
     }, [sync, kick, pileAnchorId]);

     // Dragging: mouse and pen only, so touch keeps scrolling the page.
     const onPointerDown = (e: React.PointerEvent<HTMLLIElement>, i: number) => {
          if (e.pointerType === "touch" || e.button !== 0) return;
          const off = dragOffset.current[i];
          drag.current = {
               i, startX: e.clientX, startY: e.clientY, ox: off.x, oy: off.y,
               moved: false, id: e.pointerId, lastX: e.clientX, lastT: e.timeStamp, vx: 0,
          };
     };

     const onPointerMove = (e: React.PointerEvent<HTMLLIElement>) => {
          const d = drag.current;
          if (!d || d.id !== e.pointerId) return;
          const dx = e.clientX - d.startX;
          const dy = e.clientY - d.startY;
          if (!d.moved) {
               if (Math.hypot(dx, dy) < 4) return;
               // Only capture once it's a real drag, so a plain click still follows the link.
               d.moved = true;
               e.currentTarget.setPointerCapture(e.pointerId);
               e.currentTarget.style.zIndex = String(++topZ.current);
               e.currentTarget.dataset.dragging = "";
          }
          // Lean into the direction of travel, proportional to horizontal speed.
          const dt = Math.max(1, e.timeStamp - d.lastT);
          d.vx = d.vx * 0.7 + ((e.clientX - d.lastX) / dt) * 0.3;
          d.lastX = e.clientX;
          d.lastT = e.timeStamp;
          motion.current.tiltTarget[d.i] = clamp(d.vx * 9, -14, 14);

          dragOffset.current[d.i] = { x: d.ox + dx, y: d.oy + dy };
          render();
          kick();
     };

     const onPointerUp = (e: React.PointerEvent<HTMLLIElement>) => {
          const d = drag.current;
          if (!d || d.id !== e.pointerId) return;
          drag.current = null;
          delete e.currentTarget.dataset.dragging;
          motion.current.tiltTarget[d.i] = 0;
          render();
          kick();
          if (d.moved) {
               justDragged.current = true;
               setRearranged(true);
          }
     };

     const onClickCapture = (e: React.MouseEvent) => {
          if (justDragged.current) {
               e.preventDefault();
               justDragged.current = false;
          }
     };

     const tidyUp = () => {
          setTidying(true);
          dragOffset.current = projects.map(() => ({ x: 0, y: 0 }));
          render();
          setRearranged(false);
          window.setTimeout(() => setTidying(false), 450);
     };

     return (
          <section ref={sectionRef} aria-labelledby="projects" className="relative pt-6 pb-[clamp(64px,9vw,112px)]">
               <div className="mx-auto mb-8 flex w-full max-w-[1120px] items-end justify-between gap-6 px-5 sm:px-8">
                    <div>
                         <h2 id="projects" className={DISPLAY_H2}>
                              Projects
                         </h2>
                    </div>
                    <div className="flex shrink-0 items-center gap-5 text-[15px]">
                         {rearranged && (
                              <button type="button" onClick={tidyUp} className="tidy-button">
                                   Tidy up
                              </button>
                         )}
                         <Link href="/projects" className="link">All projects</Link>
                    </div>
               </div>

               <ul
                    ref={gridRef}
                    data-pending={ready ? undefined : ""}
                    // Three across on wide screens, unless that would strand one frame (four projects → 2×2).
                    data-wide-cols={n === 4 || n <= 2 ? 2 : 3}
                    className={`frame-grid relative mx-auto ${tidying ? "is-tidying" : ""}`}
               >
                    {projects.map((p, i) => (
                         <li
                              key={p.slug}
                              ref={(el) => {
                                   frameRefs.current[i] = el;
                              }}
                              className="frame relative"
                              style={{ zIndex: n - i }}
                              onPointerDown={(e) => onPointerDown(e, i)}
                              onPointerMove={onPointerMove}
                              onPointerUp={onPointerUp}
                              onPointerCancel={onPointerUp}
                              onClickCapture={onClickCapture}
                         >
                              <h3 className="frame-name">
                                   <Link href={`/projects/${p.slug}`} draggable={false} className="frame-link">
                                        {p.title}
                                   </Link>
                              </h3>
                              <div className="frame-art relative">
                                   <Artboard project={p} className="frame-zoom" />
                                   <span aria-hidden className="frame-selection" data-path={`/projects/${p.slug}`}>
                                        <i /><i /><i /><i />
                                   </span>
                              </div>
                              <p className="frame-tagline">{p.tagline}</p>
                         </li>
                    ))}
               </ul>
          </section>
     );
}
