import { describe, expect, it } from "vitest";

import robots from "./robots";
import { siteConfig } from "@/config/site";

/**
 * robots.txt is the first thing crawlers fetch. Mistakes here can
 * silently de-list the entire site (an accidental Disallow: /) or
 * leak preview routes into search results.
 */

describe("robots()", () => {
  const r = robots();
  // Normalize rules to a non-empty array so every test can index without
  // re-asserting on each call. Guards against the schema changing to
  // single-rule shape in a future Next bump.
  const rules = Array.isArray(r.rules) ? r.rules : [r.rules];
  const firstRule = rules[0];
  if (!firstRule) throw new Error("robots() emitted no rules — fixture invariant broken");

  it("has the catch-all rule first, then the named search and AI crawlers", () => {
    expect(rules).toHaveLength(2);
    expect(rules[1]?.userAgent).toContain("GPTBot");
    expect(rules[1]?.allow).toBe("/");
  });

  it("allows '/' for the catch-all user-agent", () => {
    expect(firstRule.userAgent).toBe("*");
    expect(firstRule.allow).toBe("/");
  });

  it("disallows non-content paths (api / dev / private) but not /_next/", () => {
    const disallow = Array.isArray(firstRule.disallow) ? firstRule.disallow : [firstRule.disallow];
    expect(disallow).toContain("/api/");
    expect(disallow).toContain("/dev/");
    expect(disallow).not.toContain("/_next/");
    expect(disallow).toContain("/private/");
  });

  it("does NOT disallow '/' (catastrophic de-listing protection)", () => {
    const disallow = Array.isArray(firstRule.disallow) ? firstRule.disallow : [firstRule.disallow];
    expect(disallow).not.toContain("/");
  });

  it("does NOT block AI crawlers (GPTBot/CCBot/anthropic-ai stay allowed)", () => {
    // Policy decision (see file docstring): AI surfaces should index
    // the portfolio. This test catches a future PR that quietly adds
    // an AI-bot block.
    const rules = Array.isArray(r.rules) ? r.rules : [r.rules];
    const aiBots = ["GPTBot", "CCBot", "anthropic-ai", "Google-Extended"];
    for (const bot of aiBots) {
      const blocked = rules.some(
        (rule) =>
          rule.userAgent === bot &&
          (Array.isArray(rule.disallow) ? rule.disallow.includes("/") : rule.disallow === "/"),
      );
      expect(blocked).toBe(false);
    }
  });

  it("points sitemap at the absolute /sitemap.xml URL", () => {
    expect(r.sitemap).toBe(`${siteConfig.url}/sitemap.xml`);
  });

  it("omits the Host line (Google ignores it)", () => {
    expect(r.host).toBeUndefined();
  });
});
