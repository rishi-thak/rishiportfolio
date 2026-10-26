import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import { withCanvas } from '@rishi-thak/nextcanvas/next';

const nextConfig: NextConfig = {
  // Blog posts are .mdx files in content/blog, imported by app/blog.
  pageExtensions: ["ts", "tsx", "md", "mdx"],
};

const withMDX = createMDX();

export default withCanvas(withMDX(nextConfig));
