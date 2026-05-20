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
          issue: "2026",
          title: "Haggle",
          tagline: "Won Sponge Track @ YC Hackathon",
          description: "Integrated the Sponge SDK (SpongeWallet + SpongePlatform) to handle escrow-based payments: card onramp, USDC settlement on Base, virtual card issuance, and ACH release via Bridge. Built the surrounding iMessage concierge: Browser Use scrapes 5–10 providers, AgentPhone calls 4+ in parallel with Gemini voice negotiation, and Sponge settles the winning quote.",
          coverEmoji: "🤝",
          bg: "#0024cc",
          ink: "#e6adcf",
          techStack: ["Next.js", "TypeScript", "Sponge", "Convex", "Vercel AI SDK", "Gemini", "Browser Use"],
          stats: [{ v: "YC", l: "HACKATHON WIN" }, { v: "5-10", l: "PROVIDERS SCRAPED" }, { v: "4+", l: "PARALLEL CALLS" }],
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
          stats: [{ v: "100%", l: "LOCAL" }, { v: "2", l: "MODELS" }, { v: "0", l: "CLOUD DEPS" }],
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
     {
          id: 4,
          issue: "2026",
          title: "bloom",
          tagline: "Built @ Poly Prompt 2026 - AI Study Companion",
          description: "Shipped a multimodal Socratic AI tutor in 48 hours, combining GPT-4o, Whisper, and prompt iteration loops to drive text/voice tutoring and acquire 20+ signups. Built a mastery visualization layer with 0–100% concept progression and a force-directed graph, building a gamified product loop.",
          coverEmoji: "🧠",
          bg: "#059669",
          ink: "#fbcfe8",
          techStack: ["Next.js", "Supabase", "D3.js", "OpenAI GPT-4o", "Whisper", "Realtime API", "DALL-E"],
          stats: [{ v: "48hr", l: "BUILD TIME" }, { v: "20+", l: "SIGNUPS" }, { v: "0-100%", l: "MASTERY" }],
          demoUrl: "https://teachbloom.vercel.app",
     },
     {
          id: 5,
          issue: "2024-2025",
          title: "Rishi’s\nRecords",
          tagline: "Album Rating Tool",
          description: "Built an interactive music rating and discovery platform integrating the Spotify API for real-time metadata. Architected a Flask REST API with API-level caching and asynchronous fetching, powered by a multi-user Supabase schema featuring justifications, genre tagging, and community ratings.",
          coverEmoji: "🎧",
          bg: "#a7374b",
          ink: "#66ab56",
          techStack: ["Python", "Flask", "React", "TypeScript", "Supabase", "Spotify API"],
          stats: [{ v: "240ms", l: "TTFB" }, { v: "<750ms", l: "LCP" }, { v: "99.9%", l: "UPTIME" }],
          demoUrl: "https://rrecords.vercel.app",
     },
     {
          id: 6,
          issue: "2025",
          title: "WSB\nAnalyzer",
          tagline: "Reddit Sentiment Analysis",
          description: "A full-stack NLP tool analyzing 1,000+ WallStreetBets comments per request and scoring sentiment in real time. Features an asynchronous FastAPI backend for scraping/processing (improving data speed by 40%+) and a production-ready Next.js frontend achieving sub-200ms UI interactions.",
          coverEmoji: "🚀",
          bg: "#8B5CF6",
          ink: "#FDE68A",
          techStack: ["Python", "FastAPI", "PRAW", "React", "Next.js", "Vercel"],
          stats: [{ v: "1K+", l: "COMMENTS" }, { v: "40%", l: "SPEED GAIN" }, { v: "<200ms", l: "LATENCY" }],
          demoUrl: "",
     },
];

export const ACTIVE_PROJECT_INDEX = 0;
export const HUB_PROJECTS = COMIC_PROJECTS;
