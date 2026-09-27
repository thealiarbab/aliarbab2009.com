export const siteConfig = {
  name: "Ali Arbab",
  shortDescription: "Class XII · builds fintech, voice, and hardware systems",
  longDescription:
    "Personal portfolio of Ali Arbab: StockSaathi, a paper-trading coach for Indian teens that placed 2nd nationally at an AI buildathon, plus SpendInCheck, BolHisaab, MagLock Protocol, Sovereign Alpha and LameCRAFT.",
  url: "https://aliarbab2009.com",
  ogImage: "https://aliarbab2009.com/opengraph-image",
  author: "Ali Arbab",
  email: "ali@aliarbab2009.com",
  github: "https://github.com/thealiarbab",
  githubHandle: "thealiarbab",
  x: "https://x.com/thealiarbab",
  xHandle: "thealiarbab",
  instagram: "https://www.instagram.com/thealiarbab/",
  instagramHandle: "thealiarbab",
  /**
   * ISO date Ali last did an intentional content review of the deployed
   * site end-to-end. Bump this when shipping a content change you want
   * Google to notice. Sitemap reads it for `lastModified` on the static
   * routes; honest dates beat `new Date()` (which would tell crawlers
   * "everything was edited just now" on every crawl).
   */
  lastReviewedISO: "2026-09-27",
  /**
   * Bumped specifically when public/resume/*.pdf is replaced. Sitemap
   * reports this for /resume so search engines recrawl when the PDF
   * rolls without invalidating every other route's lastModified.
   */
  resumeLastUpdated: "2026-09-27",
  nav: [
    { href: "/projects", label: "Projects" },
    { href: "/lab", label: "Lab" },
    { href: "/about", label: "About" },
    { href: "/resume", label: "Resume" },
    { href: "/contact", label: "Contact" },
  ],
} as const;
