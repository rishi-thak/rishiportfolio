import { ogCard, OG_SIZE } from "./og-card";

export const alt = "Rishi Thakkar — Software Engineer, CS at Cal Poly SLO";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
     return ogCard({
          title: "Rishi Thakkar",
          subtitle: "Software engineer building developer tools and AI systems. CS at Cal Poly SLO.",
     });
}
