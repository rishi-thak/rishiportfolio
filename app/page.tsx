import { Analytics } from "@vercel/analytics/next"
import IntroZoom from "./components/intro-zoom";
import ComicPage from "./components/comic-page";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Rishi Jay Thakkar",
  url: "https://rishithakkar.com",
  jobTitle: "AI Engineer Intern & Computer Science Student",
  worksFor: [
    { "@type": "Organization", name: "AHEAD", description: "AI Engineer Intern" },
    { "@type": "Organization", name: "CodeBox", description: "Technical Lead & President" },
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "California Polytechnic State University, San Luis Obispo",
    alternateName: "Cal Poly SLO",
  },
  knowsAbout: ["Software Engineering", "Artificial Intelligence", "Retrieval-Augmented Generation", "Model Inference", "KServe", "Triton Inference Server", "WebAssembly", "React", "Next.js", "Python", "Rust", "TypeScript", "PostgreSQL", "pgvector", "Neo4j", "FastAPI"],
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
        {/* The visible <h1> is the on-page nameplate in ComicPage; this block carries
            the long-form keyword copy for crawlers as a secondary heading. */}
        <h2>Rishi Jay Thakkar — Software Engineer & Computer Science Student at Cal Poly SLO</h2>
        <p>
          Rishi Thakkar is a Computer Science student (minor in Entrepreneurship) at California Polytechnic State University,
          San Luis Obispo (Cal Poly SLO), graduating June 2028. AI Engineer Intern at AHEAD, where he shipped a source-attributed
          RAG onboarding assistant for a municipal government and deployment workflows for models on RunAI-managed NVIDIA B300
          clusters with KServe and Triton Inference Server. Previously Founding Software Engineer at Scoop and Co-founder &
          Lead Engineer of Vectr (seed grant from RedBrick VC). Technical Lead & President of CodeBox — Cal Poly&apos;s first
          student project accelerator, with 200+ applicants, 50+ admitted builders, and five products that reached 700+
          registered users in their first week.
        </p>
        <p>
          Skills: Python, TypeScript, Rust, SQL, KServe, Triton Inference Server, RunAI, Ollama, RAG, embedding pipelines,
          FastAPI, Node.js, PostgreSQL, pgvector, Neo4j, Prisma, Supabase, React, Next.js, React Native, Expo, Tauri, SWC,
          ts-morph, WebAssembly, AWS (S3, Lambda), Docker, Linux, CI/CD, Git.
        </p>
        <p>
          Projects: NextCanvas (drop-in Next.js visual editor built on a Rust/WebAssembly SWC plugin, 2,500+ downloads in its
          first month), Haggle (winner of the Sponge track at Y Combinator&apos;s Call My Agents Hackathon), Locus (100% local
          GraphRAG engine on Neo4j and Ollama), Assigned (internal operations platform used daily by 50+ CodeBox members).
        </p>
        {/* Crawlable, but kept out of the tab order — they are visually hidden, so a
            keyboard user would otherwise land on links they cannot see. The same
            links are reachable through the Contact panel. */}
        <nav aria-label="External links">
          <a href="https://www.linkedin.com/in/rishi-thakkar1/" tabIndex={-1}>LinkedIn</a>
          <a href="https://github.com/rishi-thak" tabIndex={-1}>GitHub</a>
          <a href="mailto:rjthakka@calpoly.edu" tabIndex={-1}>Email</a>
        </nav>
      </header>
      <IntroZoom />
      <ComicPage />
      <Analytics />
    </>
  );
}
