import { Analytics } from "@vercel/analytics/next"
import ComicProjectCards from "./components/comic-projects";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-12 pt-24">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Rishi&apos;s Portfolio</h1>
      </div>
      <ComicProjectCards />
      <Analytics />
    </main>
  );
}
