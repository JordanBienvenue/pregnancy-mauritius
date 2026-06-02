"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Renders user-authored forum content as Markdown. react-markdown does NOT
 * render raw HTML by default, so this is XSS-safe; we additionally constrain
 * the element set (links open in a new tab, images are responsive).
 */
export function MarkdownContent({ children }: { children: string }) {
  return (
    <div className="prose prose-sm max-w-none text-foreground/90 leading-relaxed break-words">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ ...props }) => (
            <a {...props} target="_blank" rel="noopener noreferrer nofollow" />
          ),
          img: ({ ...props }) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              {...props}
              alt={props.alt ?? ""}
              className="my-2 max-h-96 w-auto rounded-lg border"
              loading="lazy"
            />
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
