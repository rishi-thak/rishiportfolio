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
          id: 0,
          issue: "2026",
          title: "NextCanvas",
          tagline: "Drop-in Next.js Visual Editor",
          description: "Published a drop-in visual editor for Next.js that crossed 2,500+ downloads in its first month. A Rust/WebAssembly SWC plugin maps rendered JSX back to its source locations, and ts-morph applies formatting-preserving edits followed by Fast Refresh. Safe writeback covers static and bound text, mixed JSX children, attributes, and styles across imported data, path aliases, mapped collections, and component props — with full edit round trips verified under both webpack and Turbopack.",
          coverEmoji: "🎨",
          bg: "#7C2D12",
          ink: "#FDBA74",
          techStack: ["Rust", "WebAssembly", "SWC", "TypeScript", "ts-morph", "Next.js"],
          stats: [{ v: "2.5K+", l: "DOWNLOADS, MONTH 1" }, { v: "2", l: "BUNDLERS VERIFIED" }, { v: "RUST", l: "WASM SWC PLUGIN" }],
          demoUrl: "https://nextcanvas.rishithakkar.com",
     },
     {
          id: 1,
          issue: "2026",
          title: "Haggle",
          tagline: "Winner, Sponge Track — YC Hackathon",
          description: "Built an iMessage-based agent that discovers 5–10 providers for a requested service, conducts 4+ concurrent voice negotiations, and settles the selected offer through an escrow-based payment flow.",
          coverEmoji: "🤝",
          bg: "#0024cc",
          ink: "#e6adcf",
          techStack: ["TypeScript", "Next.js", "Convex", "Gemini", "Sponge", "AgentPhone"],
          stats: [{ v: "YC", l: "HACKATHON WIN" }, { v: "5-10", l: "PROVIDERS FOUND" }, { v: "4+", l: "CONCURRENT CALLS" }],
          demoUrl: "https://github.com/rishi-thak/haggle",
     },
     {
          id: 2,
          issue: "2026",
          title: "Locus",
          tagline: "100% Local GraphRAG Engine",
          description: "Built a 100% local GraphRAG engine that converts natural-language notes into entities/relationships, persists them in Neo4j, and retrieves graph context for privacy-preserving LLM responses via Ollama. Architected a 2-model local inference pipeline using qwen2.5-coder:14b for chat and qwen2.5:7b for extraction, then shipped 2 query surfaces: a React force-directed graph UI and a CLI.",
          coverEmoji: "🌐",
          bg: "#1a1a2e",
          ink: "#00d4ff",
          techStack: ["Python", "FastAPI", "Neo4j", "Ollama", "SQLite", "React"],
          stats: [{ v: "2", l: "QUERY SURFACES" }, { v: "14B", l: "LARGEST LOCAL MODEL" }, { v: "0", l: "CLOUD CALLS" }],
          demoUrl: "https://github.com/rishi-thak/locus",
     },
     {
          id: 3,
          issue: "2025 - 2026",
          title: "Assigned",
          tagline: "Full-Stack internal tooling",
          description: "Built and owned Assigned, the internal management system used daily by 50+ CodeBox members; shipped custom OTP auth, many-to-many Prisma cohort/team models, and 5-tier RBAC for project operations. Centralized team administration for 50+ daily users via a TanStack Query dashboard.",
          coverEmoji: "📝",
          bg: "#2E1065",
          ink: "#FACC15",
          techStack: ["React", "TypeScript", "Node.js", "Supabase", "Prisma"],
          stats: [{ v: "50+", l: "DAILY USERS" }, { v: "5", l: "RBAC TIERS" }, { v: "∞", l: "COHORTS" }],
          demoUrl: "https://assign.codeboxorg.com",
     },
];

export const ACTIVE_PROJECT_INDEX = 0;
export const HUB_PROJECTS = COMIC_PROJECTS;
