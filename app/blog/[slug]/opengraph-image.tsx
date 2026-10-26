import { getPost, getPosts } from "../posts";
import { ogCard, OG_SIZE } from "../../og-card";

export const alt = "Blog post by Rishi Thakkar";
export const size = OG_SIZE;
export const contentType = "image/png";

export async function generateStaticParams() {
     return (await getPosts()).map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
     const post = (await getPost((await params).slug))!;
     // Post titles are long, so they get a smaller title size than project names. The
     // description is too long for the card (link previews show it as text anyway), so
     // the subtitle is just a byline.
     return ogCard({ title: post.title, subtitle: "By Rishi Thakkar", titleSize: 76 });
}
