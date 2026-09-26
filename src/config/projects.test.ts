import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { PROJECTS, getProjectBySlug } from "./projects";

/**
 * PROJECTS is the catalog the home featured grid, the projects index,
 * and per-project route metadata all read from. Bugs here surface as
 * 404s, broken OG images, or wrong colors on per-project pages.
 */

describe("PROJECTS catalog", () => {
  it("contains the six project worlds, live products first", () => {
    expect(PROJECTS.map((p) => p.slug)).toEqual([
      "stocksaathi",
      "spendincheck",
      "bolhisaab",
      "maglock",
      "sovereign-alpha",
      "lamecraft",
    ]);
  });

  it("every theme matches its slug, so .theme-<slug> resolves", () => {
    for (const p of PROJECTS) {
      expect(p.theme).toBe(p.slug);
    }
  });

  it("every project has dark + light theme blocks in globals.css", () => {
    const css = readFileSync(join(process.cwd(), "src/app/globals.css"), "utf8");
    for (const p of PROJECTS) {
      expect(css).toContain(`.theme-${p.slug} {`);
      // Dark-first worlds override for light; BolHisaab is light-first
      // and overrides for dark. Either way the other mode must exist.
      const hasOverride =
        css.includes(`:root[data-theme="light"] .theme-${p.slug} {`) ||
        css.includes(`:root[data-theme="dark"] .theme-${p.slug} {`);
      expect(hasOverride).toBe(true);
    }
  });

  it("every slug matches a .theme-<slug> CSS class convention", () => {
    // Slugs must be lowercase + hyphen-safe so .theme-<slug> works as a CSS class
    for (const p of PROJECTS) {
      expect(p.slug).toMatch(/^[a-z][a-z0-9-]*$/);
    }
  });

  it("every project has a non-empty stack", () => {
    for (const p of PROJECTS) {
      expect(p.stack.length).toBeGreaterThan(0);
    }
  });

  it("primaryColor is a 7-char hex string", () => {
    for (const p of PROJECTS) {
      expect(p.primaryColor).toMatch(/^#[0-9A-Fa-f]{6}$/);
    }
  });

  it("year is a plausible build year (2024-2027)", () => {
    for (const p of PROJECTS) {
      expect(p.year).toBeGreaterThanOrEqual(2024);
      expect(p.year).toBeLessThanOrEqual(2027);
    }
  });

  it("every published repo url sits under the thealiarbab namespace", () => {
    for (const p of PROJECTS) {
      if (p.repoUrl) expect(p.repoUrl).toMatch(/^https:\/\/github\.com\/thealiarbab\//);
    }
  });

  it("a project without public source says why instead", () => {
    for (const p of PROJECTS) {
      if (!p.repoUrl) expect(p.sourceNote?.length ?? 0).toBeGreaterThan(10);
    }
  });

  it("startedISO is a YYYY-MM-DD date in the same year as `year`", () => {
    for (const p of PROJECTS) {
      expect(p.startedISO).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number(p.startedISO.slice(0, 4))).toBe(p.year);
    }
  });

  it("only live projects carry a live url", () => {
    for (const p of PROJECTS) {
      if (p.liveUrl) expect(p.status).toBe("live");
    }
  });
});

describe("getProjectBySlug", () => {
  it("returns the matching project for known slugs", () => {
    expect(getProjectBySlug("stocksaathi")?.name).toBe("StockSaathi");
    expect(getProjectBySlug("bolhisaab")?.name).toBe("BolHisaab");
    expect(getProjectBySlug("maglock")?.name).toBe("MagLock Protocol");
    expect(getProjectBySlug("spendincheck")?.name).toBe("SpendInCheck");
    expect(getProjectBySlug("sovereign-alpha")?.name).toBe("Sovereign Alpha");
    expect(getProjectBySlug("lamecraft")?.name).toBe("LameCRAFT");
  });

  it("returns undefined for unknown slugs", () => {
    expect(getProjectBySlug("nope")).toBeUndefined();
    expect(getProjectBySlug("")).toBeUndefined();
  });

  it("is case-sensitive (catches a common typo class)", () => {
    expect(getProjectBySlug("StockSaathi")).toBeUndefined();
    expect(getProjectBySlug("STOCKSAATHI")).toBeUndefined();
  });
});
