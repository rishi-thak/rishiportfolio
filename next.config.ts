import type { NextConfig } from "next";
import { withCanvas } from '@rishi-thak/nextcanvas/next';

// `satisfies` (not a type annotation) keeps this checked against NextConfig while
// leaving it assignable to withCanvas, whose parameter is typed Record<string, unknown>.
const nextConfig = {} satisfies NextConfig;

export default withCanvas(nextConfig);
