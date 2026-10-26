// All site copy lives here so the home page, project pages, sitemap and
// structured data stay in sync.

export const SITE_URL = "https://rishithakkar.com";

export const PROFILE = {
     name: "Rishi Thakkar",
     fullName: "Rishi Jay Thakkar",
     initials: "RT",
     role: "Software Engineer",
     school: { name: "Cal Poly SLO", url: "https://www.calpoly.edu" },
     degree: "CS + Entrepreneurship",
     graduation: "June 2028",
     github: "https://github.com/rishi-thak",
     linkedin: "https://www.linkedin.com/in/rishi-thakkar1/",
     description:
          "Rishi Thakkar is a CS student at Cal Poly SLO, former AI Engineer Intern at AHEAD, and creator of NextCanvas, a Rust/Wasm visual editor for Next.js.",
};

export type Experience = {
     company: string;
     url?: string;
     role: string;
     period: string;
     /** One line shown without expanding the row. Keep it to claims made in `points`. */
     summary: string;
     points: string[];
};

export const EXPERIENCE: Experience[] = [
     {
          company: "AHEAD",
          url: "https://www.ahead.com",
          role: "AI Engineer Intern",
          period: "Jun – Aug 2026",
          summary: "Engineering for Fortune 100 clients, specializing in financial services.",
          points: [
               "Merged 8 PRs of core-logic and CI/CD fixes, cutting manual code review by 40%",
               "Wrote model-serving deployment guides for RunAI, KServe and Triton",
               "Designed a shared knowledge base for client engagement teams",
               "Prototyped source-cited retrieval for client onboarding",
          ],
     },
     {
          company: "Scoop Technologies",
          role: "Founding Software Engineer (Contract)",
          period: "Mar – May 2026",
          summary: "First engineering hire at a ride-pooling startup.",
          points: [
               "Built a PostgreSQL ride-matching engine that grouped 101 riders by route",
               "Shipped pooled multi-stop trips with idempotent Stripe payments",
          ],
     },
     {
          company: "Vectr",
          url: "https://vectr.so",
          role: "Co-founder & Lead Software Engineer",
          period: "Jan – May 2026",
          summary: "Co-founded a product-management workspace backed by a VC seed grant.",
          points: [
               "Took it from prototype to pilots with six startup teams",
               "Built pgvector ingestion and search with source citations",
               "Shipped automated stakeholder briefs and scope-change alerts",
          ],
     },
     {
          company: "Cal Poly Quantitative Finance",
          role: "Software Engineering Lead",
          period: "2024 – 2026",
          summary: "Built financial models and mentored student engineers.",
          points: [
               "Built Python trading algorithms and backtests",
               "Modeled pairs trading with cointegration analysis",
          ],
     },
     {
          company: "Noyce School of Computing",
          role: "Teaching Assistant",
          period: "2026 – Present",
          summary: "CSC 101/1001, Fundamentals of Computer Science.",
          points: ["Lead lab sections for 35+ students"],
     },
];

// Shown in its own section, matching the resume.
export const LEADERSHIP: Experience[] = [
     {
          company: "CodeBox",
          url: "https://www.codebox.so",
          role: "Technical Lead & President",
          period: "2025 – Present",
          summary: "Scaling the fastest-growing club at Cal Poly, with 2,400+ users across its apps.",
          points: [
               "Founded a student project accelerator; two 50-person cohorts from 400+ applicants",
               "Launched five products, including MustangMaps (1,600+ iOS downloads)",
               "Led 10 engineers across seven parallel workstreams",
               "Built Assigned, the club's internal operations platform",
          ],
     },
];

export type Project = {
     slug: string;
     title: string;
     year: string;
     tagline: string;
     summary: string;
     body: string[];
     stack: string[];
     /** Labels are shown exactly as written (so "npm" stays lowercase). */
     stats: { value: string; label: string }[];
     links: { label: string; url: string }[];
     /** Artboard colours, carried over from the old site's project panels. */
     colors: { bg: string; ink: string };
};

export const PROJECTS: Project[] = [
     {
          slug: "nextcanvas",
          colors: { bg: "#7C2D12", ink: "#FDBA74" },
          title: "NextCanvas",
          year: "2026",
          tagline: "Drop-in visual editor for Next.js",
          summary:
               "A visual editor for Next.js that writes your edits back to source. 3,100+ npm downloads.",
          body: [
               "NextCanvas is a drop-in visual editor for Next.js. Click any element in your running app, change its text, attributes or styles, and the edit is written straight back into your source files.",
               "A Rust/WebAssembly SWC plugin maps rendered JSX back to its source locations at build time. ts-morph then applies formatting-preserving edits, and Fast Refresh shows the result instantly.",
               "Safe writeback covers static and bound text, mixed JSX children, attributes, and styles across imported data, path aliases, mapped collections, and component props. Full edit round trips are verified under both webpack and Turbopack.",
               "I use NextCanvas to build this site. It runs whenever I'm developing locally, so when I want to change a line of copy, like the intro on the home page, I double-click it in the browser and type, and the edit lands in the source file without me opening the code.",
          ],
          stack: ["Rust", "WebAssembly", "SWC", "TypeScript", "ts-morph", "Next.js"],
          stats: [
               { value: "3.1K+", label: "npm downloads" },
               { value: "2", label: "Bundlers verified" },
          ],
          links: [
               { label: "Website", url: "https://nextcanvas.rishithakkar.com" },
               { label: "npm", url: "https://www.npmjs.com/package/@rishi-thak/nextcanvas" },
          ],
     },
     {
          slug: "haggle",
          colors: { bg: "#0024cc", ink: "#e6adcf" },
          title: "Haggle",
          year: "2026",
          tagline: "Winner @ Y Combinator hackathon",
          summary:
               "An iMessage agent that finds service providers and negotiates with them over the phone.",
          body: [
               "Haggle is an iMessage-based agent that negotiates on your behalf. Ask it for a service and it discovers 5–10 providers, runs 4+ concurrent voice negotiations, and settles the offer you pick through an escrow-based payment flow.",
               "It won the Sponge track at Y Combinator's Call My Agents Hackathon.",
          ],
          stack: ["TypeScript", "Next.js", "Convex", "Gemini", "Sponge", "AgentPhone"],
          stats: [
               { value: "5–10", label: "Providers found" },
               { value: "4+", label: "Concurrent calls" },
          ],
          links: [
               { label: "Website", url: "https://callmyhaggle.vercel.app" },
               { label: "GitHub", url: "https://github.com/rishi-thak/haggle" },
          ],
     },
     {
          slug: "bloom",
          colors: { bg: "#123B2A", ink: "#F9A8D4" },
          title: "Bloom",
          year: "2026",
          tagline: "AI voice tutor that makes you the teacher",
          summary: "Learn by teaching: explain a topic out loud to a real-time AI voice agent. Built at Cal Poly's Poly Prompt hackathon.",
          body: [
               "Bloom is built on the Feynman technique: the best way to learn something is to teach it. You explain a topic out loud to a real-time AI voice agent, and Bloom turns you into the teacher.",
               "It also generates editable slide decks, flashcards and practice exams, connects to Canvas, and builds a concept map that grows as you learn, while a garden of flowers blooms alongside it.",
               "My team built it at Poly Prompt, a Cal Poly hackathon hosted by OpenAI, CodeBox and CSAI Cal Poly, using Next.js, Supabase, D3.js and OpenAI's Realtime, Whisper and DALL-E APIs.",
          ],
          stack: ["Next.js", "Supabase", "D3.js", "OpenAI Realtime", "Whisper", "DALL-E"],
          stats: [
               { value: "4", label: "Study tools" },
               { value: "Canvas", label: "Integration" },
          ],
          links: [{ label: "Website", url: "https://teachbloom.vercel.app" }],
     },
     {
          slug: "locus",
          colors: { bg: "#1a1a2e", ink: "#00d4ff" },
          title: "Locus",
          year: "2026",
          tagline: "100% local GraphRAG engine",
          summary:
               "Turns notes into a knowledge graph and answers questions about them, without any cloud calls.",
          body: [
               "Locus is a fully local GraphRAG engine. It converts natural-language notes into entities and relationships, stores them in Neo4j, and retrieves graph context to ground LLM responses, all on your own machine via Ollama.",
               "It runs a two-model local inference pipeline: qwen2.5-coder:14b for chat and qwen2.5:7b for extraction. You can query it through a React force-directed graph UI or a CLI.",
          ],
          stack: ["Python", "FastAPI", "Neo4j", "Ollama", "SQLite", "React"],
          stats: [
               { value: "0", label: "Cloud calls" },
               { value: "2", label: "Query surfaces" },
          ],
          links: [{ label: "GitHub", url: "https://github.com/rishi-thak/locus" }],
     },
];

export const SKILLS: { category: string; items: string[] }[] = [
     { category: "Languages", items: ["Python", "TypeScript", "JavaScript", "Java", "C", "Rust", "SQL"] },
     { category: "Model serving", items: ["KServe", "Triton Inference Server", "RunAI", "Ollama"] },
     { category: "Backend & data", items: ["FastAPI", "Node.js", "PostgreSQL", "pgvector", "Neo4j", "Prisma", "Supabase"] },
     { category: "Frontend & desktop", items: ["React", "Next.js", "React Native", "Expo", "Tauri"] },
     { category: "Tooling & cloud", items: ["SWC", "ts-morph", "WebAssembly", "AWS (S3, Lambda)", "Docker", "Linux", "CI/CD", "Git"] },
];

export function getProject(slug: string) {
     return PROJECTS.find((p) => p.slug === slug);
}
