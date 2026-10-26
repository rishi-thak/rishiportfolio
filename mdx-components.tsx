import type { MDXComponents } from "mdx/types";
import Link from "next/link";

/*
 * How Markdown in blog posts renders. Required by @next/mdx at the project root.
 * Styled to match the rest of the site: Instrument Serif headings, Instrument
 * Sans body, JetBrains Mono for code, selection blue only for focus/links.
 */

const NEW_TAB = { target: "_blank", rel: "noopener noreferrer" } as const;

const components: MDXComponents = {
     h2: (props) => <h2 className="mt-14 mb-4 font-serif text-[clamp(30px,3.6vw,40px)] leading-tight font-normal tracking-[-0.015em]" {...props} />,
     h3: (props) => <h3 className="mt-10 mb-3 text-[20px] font-semibold" {...props} />,
     p: (props) => <p className="my-5 text-[18px] leading-[1.7]" {...props} />,
     ul: (props) => <ul className="my-5 list-disc space-y-2 pl-6 text-[18px] leading-[1.7] marker:text-slate" {...props} />,
     ol: (props) => <ol className="my-5 list-decimal space-y-2 pl-6 text-[18px] leading-[1.7] marker:text-slate" {...props} />,
     blockquote: (props) => <blockquote className="my-6 border-l-2 border-rule pl-5 text-slate" {...props} />,
     hr: () => <hr className="my-12 border-rule" />,
     a: ({ href = "", ...props }) =>
          href.startsWith("/") || href.startsWith("#") ? (
               <Link href={href} className="link" {...props} />
          ) : (
               <a href={href} {...NEW_TAB} className="link" {...props} />
          ),
     // Inline code; code inside <pre> is restyled by the pre rule below.
     code: (props) => <code className="rounded bg-white/70 px-1.5 py-0.5 font-mono text-[0.85em]" {...props} />,
     pre: (props) => (
          <pre
               className="my-6 overflow-x-auto rounded-lg border border-rule bg-white/70 p-5 font-mono text-[14px] leading-[1.6] [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-[1em]"
               {...props}
          />
     ),
     img: ({ alt = "", ...props }) => (
          // Post images are plain <img> so authors can drop in any file; they're decorative-to-explanatory, alt is required in the post.
          // eslint-disable-next-line @next/next/no-img-element
          <img alt={alt} className="my-8 w-full rounded-lg border border-rule" {...props} />
     ),
};

export function useMDXComponents(): MDXComponents {
     return components;
}
