"use client";

import { useState, useCallback } from "react";
import type { MouseEvent } from "react";

export function useOverlayState() {
     const [expandedProject, setExpandedProject] = useState<number | null>(null);
     const [skillsOpen, setSkillsOpen] = useState(false);
     const [contactOpen, setContactOpen] = useState(false);
     const [aboutOpen, setAboutOpen] = useState(false);
     const [experienceOpen, setExperienceOpen] = useState(false);
     const [projectsOpen, setProjectsOpen] = useState(false);
     const [openedFromHub, setOpenedFromHub] = useState(false);
     const [originRect, setOriginRect] = useState<{ x: number; y: number } | null>(null);

     const openOverlay = useCallback((setter: (v: boolean) => void, e: MouseEvent<Element>) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setOriginRect({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
          setter(true);
     }, []);

     const openProject = useCallback((index: number, e: MouseEvent<Element>) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setOriginRect({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
          setExpandedProject(index);
     }, []);

     const closeProject = useCallback(() => {
          if (openedFromHub) {
               setProjectsOpen(true);
          }
          setExpandedProject(null);
          setOpenedFromHub(false);
     }, [openedFromHub]);

     const selectFromHub = useCallback((originalIndex: number, e: MouseEvent<Element>) => {
          setOpenedFromHub(true);
          setProjectsOpen(false);
          openProject(originalIndex, e);
     }, [openProject]);

     return {
          expandedProject,
          skillsOpen, setSkillsOpen,
          contactOpen, setContactOpen,
          aboutOpen, setAboutOpen,
          experienceOpen, setExperienceOpen,
          projectsOpen, setProjectsOpen,
          originRect,
          openOverlay,
          openProject,
          closeProject,
          selectFromHub,
     };
}
