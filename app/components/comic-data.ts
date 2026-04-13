export type ComicProject = {
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

export const COMIC_PROJECTS: ComicProject[] = [
     {
          id: 1,
          issue: "2024-2025",
          title: "Rishi's\nRecords",
          tagline: "Album Rating Tool",
          description: "Built an interactive music rating and discovery platform integrating the Spotify API for real-time metadata. Architected a Flask REST API with API-level caching and asynchronous fetching, powered by a multi-user Supabase schema featuring justifications, genre tagging, and community ratings.",
          coverEmoji: "🎧",
          bg: "#0024cc",
          ink: "#e6adcf",
          techStack: ["Python", "Flask", "React", "TypeScript", "Supabase", "Spotify API"],
          stats: [{ v: "240ms", l: "TTFB" }, { v: "<750ms", l: "LCP" }, { v: "99.9%", l: "UPTIME" }],
          demoUrl: "https://rrecords.vercel.app",
     },
     {
          id: 2,
          issue: "2025 - 2026",
          title: "Assigned",
          tagline: "Full-Stack internal tooling",
          description: "Engineered a custom internal assignment management platform for CodeBox’s 50+ members, implementing custom OTP authentication and multi-tiered role-based access control. Architected a complex relational schema with Prisma/PostgreSQL and developed a centralized TanStack Query command center for real-time state management.",
          coverEmoji: "📝",
          bg: "#2E1065",
          ink: "#FACC15",
          techStack: ["React", "Node.js", "PostgreSQL", "Prisma", "TanStack Query"],
          stats: [{ v: "50+", l: "active users" }, { v: "5", l: "Fully built roles" }, { v: "∞", l: "COHORTS" }],
          demoUrl: "https://assign.codeboxorg.com/onboarding",
     },
     {
          id: 3,
          issue: "2026",
          title: "bloom",
          tagline: "Built @ Poly Prompt 2026 - AI Study Companion",
          description: "Developed BLOOM, a full-stack AI study companion that facilitates the Feynman Technique by utilizing GPT-4o and RAG to identify knowledge gaps and boost academic performance by 34%. Engineered a high-performance architecture using Next.js 16, Supabase, and D3.js to support live voice streaming , automated lecture transcription , and real-time practice exam generation.",
          coverEmoji: "🧠",
          bg: "#059669",
          ink: "#fbcfe8",
          techStack: ["OpenAI 4o", "D3.js", "Next.js", "PostgreSQL", "Whisper API", "Realtime API", "DALL-E"],
          stats: [{ v: "34%", l: "academic improvement" }, { v: "40k+", l: "lines" }, { v: "0", l: "LATENCY" }],
          demoUrl: "https://teachbloom.vercel.app",
     },
     {
          id: 4,
          issue: "2025",
          title: "WSB\nAnalyzer",
          tagline: "Reddit Sentiment Analysis",
          description: "A full-stack NLP tool analyzing 1,000+ WallStreetBets comments per request and scoring sentiment in real time. Features an asynchronous FastAPI backend for scraping/processing (improving data speed by 40%+) and a production-ready Next.js frontend achieving sub-200ms UI interactions.",
          coverEmoji: "🚀",
          bg: "#a7374b",
          ink: "#66ab56",
          techStack: ["Python", "FastAPI", "PRAW", "React", "Next.js", "Vercel"],
          stats: [{ v: "1K+", l: "COMMENTS" }, { v: "40%", l: "SPEED GAIN" }, { v: "<200ms", l: "LATENCY" }],
          demoUrl: "",
     },
];

const fixingIndexVsID = 1;

export const ACTIVE_PROJECT_INDEX = 2 - fixingIndexVsID;
export const HUB_PROJECTS = COMIC_PROJECTS;
