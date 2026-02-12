import { Analytics } from "@vercel/analytics/next"
import IntroZoom from "./components/intro-zoom";
import ComicPage from "./components/comic-page";

export default function Home() {
  return (
    <>
      <IntroZoom />
      <ComicPage />
      <Analytics />
    </>
  );
}
