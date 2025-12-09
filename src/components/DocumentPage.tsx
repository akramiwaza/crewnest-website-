import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DOMPurify from "isomorphic-dompurify";
import { FooterData, HeroData } from "@/lib/api";

interface DocumentPageProps {
  title: string;
  content: string;
  logoData: string;
  footerData: FooterData;
  heroData: HeroData;
}

export default function DocumentPage({
  title,
  content,
  logoData,
  footerData,
  heroData,
}: DocumentPageProps) {
  // Sanitize HTML content - only allow safe text formatting tags
  // Block: images, videos, iframes, scripts, styles, forms, colors, and all dangerous elements
  const sanitizedContent = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: [
      "p",
      "br",
      "strong",
      "em",
      "u",
      "b",
      "i",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "ul",
      "ol",
      "li",
      "a",
      "blockquote",
      "hr",
    ],
    // Only allow href for links - NO style, class, id, or any other attributes
    ALLOWED_ATTR: ["href"],
    // Explicitly forbid dangerous attributes including style (colors), class, id, and event handlers
    FORBID_ATTR: [
      "style",
      "class",
      "id",
      "onclick",
      "onerror",
      "onload",
      "onmouseover",
      "onfocus",
      "onblur",
      "onchange",
      "onsubmit",
      "data-*",
    ],
    // Only allow safe URL protocols (http, https, mailto, tel, relative paths, anchors)
    // Block: javascript:, data:, vbscript:, and other dangerous protocols
    ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel):|[^a-z]|\/|#)/i,
    // Remove all data attributes
    KEEP_CONTENT: true,
    // Strip all inline styles and CSS
    FORBID_TAGS: [
      "img",
      "video",
      "audio",
      "iframe",
      "embed",
      "object",
      "script",
      "style",
      "link",
      "form",
      "input",
      "button",
      "textarea",
      "select",
      "svg",
      "canvas",
      "applet",
      "frame",
      "frameset",
      "meta",
    ],
  });

  // Post-process to ensure all links are safe and add security attributes
  const processedContent = sanitizedContent.replace(
    /<a\s+([^>]*?)href=["']([^"']*?)["']([^>]*?)>/gi,
    (match, before, href, after) => {
      if (!href) return "";

      // Only allow safe protocols
      const safeProtocols = [
        "http://",
        "https://",
        "mailto:",
        "tel:",
        "/",
        "#",
      ];

      const isSafe = safeProtocols.some((protocol) =>
        href.toLowerCase().startsWith(protocol)
      );

      if (!isSafe) {
        // Remove dangerous links entirely
        return "";
      }

      // Add security attributes for external links
      const isExternal =
        href.startsWith("http://") || href.startsWith("https://");
      const securityAttrs = isExternal
        ? ' target="_blank" rel="noopener noreferrer"'
        : "";

      // Escape the href to prevent XSS
      const escapedHref = href
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;");
      return `<a href="${escapedHref}"${securityAttrs}>`;
    }
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header logoData={logoData} />
      <main className="flex-1 bg-white">
        <div className="container-default px-4 sm:px-6 lg:px-10 py-8 sm:py-12 lg:py-16">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 sm:mb-12">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                {title}
              </h1>
              <div className="h-1 w-20 bg-primary rounded-full"></div>
            </div>
            <div className="bg-white rounded-lg">
              <div
                className="prose prose-slate max-w-none 
                  prose-headings:text-slate-900 prose-headings:font-semibold prose-headings:mt-8 prose-headings:mb-4
                  prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                  prose-p:text-slate-700 prose-p:leading-relaxed prose-p:mb-4
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-a:font-medium
                  prose-strong:text-slate-900 prose-strong:font-semibold
                  prose-ul:text-slate-700 prose-ul:my-4 prose-ul:pl-6
                  prose-ol:text-slate-700 prose-ol:my-4 prose-ol:pl-6
                  prose-li:text-slate-700 prose-li:my-2 prose-li:leading-relaxed
                  prose-blockquote:border-l-4 prose-blockquote:border-l-primary prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-slate-600 prose-blockquote:my-6
                  prose-hr:border-slate-200 prose-hr:my-8"
                dangerouslySetInnerHTML={{ __html: processedContent }}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer footerData={footerData} heroData={heroData} />
    </div>
  );
}

