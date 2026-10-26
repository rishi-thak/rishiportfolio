import { getProject, PROJECTS } from "../../content";
import { ogCard, OG_SIZE } from "../../og-card";

export const alt = "Project by Rishi Thakkar";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
     return PROJECTS.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
     const project = getProject((await params).slug)!;
     return ogCard({
          title: project.title,
          subtitle: project.tagline,
     });
}
