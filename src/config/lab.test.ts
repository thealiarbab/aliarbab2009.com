import { describe, expect, it } from "vitest";

import { LAB } from "./lab";

/**
 * /lab mixes finished designs with one physical prototype. The status is
 * the claim a visitor will hold Ali to, so the tests guard it — and the
 * privacy line for a page that describes sensors near home.
 */

describe("LAB", () => {
  it("every entry has a unique id usable as an anchor", () => {
    const ids = LAB.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(id).toMatch(/^[a-z][a-z0-9-]*$/);
  });

  it("every entry has a summary, reasoning and at least one spec", () => {
    for (const e of LAB) {
      expect(e.summary.length).toBeGreaterThan(40);
      expect(e.body.length).toBeGreaterThan(0);
      expect(e.specs.length).toBeGreaterThan(0);
    }
  });

  it("only the bionic hand is marked built", () => {
    expect(LAB.filter((e) => e.status === "built").map((e) => e.id)).toEqual(["bionic-hand"]);
  });

  it("never names a school, route or place", () => {
    const suspicious =
      /(?:[A-Z][a-z]+ )+(?:School|Academy|Institute|College)\b|\b(?:road|street|lane|colony|sector)\b/i;
    for (const e of LAB) {
      const text = [e.summary, ...e.body, ...e.specs.map((s) => s.value), ...(e.cut ?? [])].join(
        " ",
      );
      expect(text).not.toMatch(suspicious);
    }
  });
});
