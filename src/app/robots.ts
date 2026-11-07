import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

/**
 * robots.txt for aliarbab2009.com.
 * Served at /robots.txt by Next 15 App Router conventions.
 *
 * Policy:
 *   - Allow all crawlers full access by default.
 *   - Disallow non-content paths: API routes, dev preview routes and
 *     anything we ever stash under /private/. /_next/ stays crawlable:
 *     Googlebot needs the CSS and JS to render the pages.
 *
 * Search and AI crawlers are named explicitly, the same list as
 * stocksaathi.co.in, and are deliberately NOT blocked. The portfolio should be discoverable by every
 * surface, including AI search and answer engines — when an
 * admissions officer asks an LLM "tell me about Ali Arbab's
 * projects," that LLM should have read this site.
 *
 * Per P4.03.
 */
const NAMED_CRAWLERS = [
  "Googlebot",
  "Bingbot",
  "DuckDuckBot",
  "YandexBot",
  "Applebot",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dev/", "/private/"],
      },
      {
        userAgent: NAMED_CRAWLERS,
        allow: "/",
        disallow: ["/api/", "/dev/", "/private/"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
