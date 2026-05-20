import { Analytics } from "@vercel/analytics/next"
import IntroZoom from "./components/intro-zoom";
import ComicPage from "./components/comic-page";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Rishi Jay Thakkar",
  url: "https://rishithakkar.com",
  jobTitle: "Software Engineer & Computer Science Student",
  worksFor: [
    { "@type": "Organization", name: "AHEAD", description: "Artificial Intelligence Intern" },
    { "@type": "Organization", name: "Scoop", description: "Founding Software Engineer" },
    { "@type": "Organization", name: "CodeBox", description: "Technical Lead & President" },
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "California Polytechnic State University, San Luis Obispo",
    alternateName: "Cal Poly SLO",
  },
  knowsAbout: ["Software Engineering", "Artificial Intelligence", "Full-Stack Development", "React", "Next.js", "Python", "Rust", "TypeScript", "Neo4j", "FastAPI"],
  sameAs: [
    "https://www.linkedin.com/in/rishi-thakkar1/",
    "https://github.com/rishi-thak",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="sr-only" aria-hidden="false">
        <h1>Rishi Jay Thakkar — Software Engineer & Computer Science Student at Cal Poly SLO</h1>
        <p>
          Rishi Thakkar is a Computer Science student at California Polytechnic State University, San Luis Obispo (Cal Poly SLO),
          graduating June 2028. Incoming AI Intern at AHEAD, Founding Software Engineer at Scoop, Co-founder & CTO of Vectr
          (backed by RedBrick VC), and Technical Lead & President of CodeBox — Cal Poly&apos;s first student project accelerator
          with 200+ applicants and 50+ admitted builders.
        </p>
        <p>
          Skills: Python, TypeScript, Rust, Java, SQL, JavaScript, Next.js, React, React Native, Node.js, FastAPI, Prisma, Tauri,
          Neo4j, Ollama, Supabase, Convex, Vercel, Git, Sponge (EVM/Base), TanStack Query, Pandas, NumPy, Matplotlib.
        </p>
        <p>
          Projects: Haggle (YC hackathon winner), Locus (local GraphRAG engine), Assigned (internal tooling for 50+ users),
          Bloom (AI study companion), Rishi&apos;s Records (album rating platform), WSB Analyzer (sentiment analysis tool).
        </p>
        <nav aria-label="External links">
          <a href="https://www.linkedin.com/in/rishi-thakkar1/">LinkedIn</a>
          <a href="https://github.com/rishi-thak">GitHub</a>
          <a href="mailto:rjthakka@calpoly.edu">Email</a>
        </nav>
      </header>
      <IntroZoom />
      <ComicPage />
      <Analytics />
    </>
  );
}
