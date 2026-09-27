import { describe, expect, it } from "vitest";

import { MILESTONES, getNextMilestone, type Milestone } from "./milestones";

/**
 * MILESTONES is the single source of truth for public academic dates
 * on the site. Tests verify the integrity of whatever data is there and
 * the correctness of getNextMilestone(), using a neutral fixture.
 */

const FIXTURE: readonly Milestone[] = [
  { id: "a", label: "First", at: "2030-03-01T08:00:00" },
  { id: "b", label: "Second", at: "2030-03-03T08:00:00" },
  { id: "c", label: "Third", at: "2030-03-03T12:00:00" },
  { id: "d", label: "Fourth", at: "2030-03-05T12:00:00" },
];

describe("MILESTONES", () => {
  it("never lists AP exams (Ali's choice, 2026-09-27)", () => {
    for (const m of MILESTONES) {
      expect(`${m.id} ${m.label}`).not.toMatch(/\bAP\b|^ap-/i);
    }
  });

  it("uses offset-naive ISO strings (browser-local time)", () => {
    // The architecture rule: ISO strings have NO trailing Z or +offset.
    // Browser interprets them as local time → "8 a.m. wherever you are".
    for (const m of MILESTONES) {
      expect(m.at).not.toMatch(/Z$/);
      expect(m.at).not.toMatch(/[+-]\d{2}:\d{2}$/);
      expect(m.at).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/);
    }
  });

  it("has dates in chronological order", () => {
    const times = MILESTONES.map((m) => new Date(m.at).getTime());
    const sorted = [...times].sort((a, b) => a - b);
    expect(times).toEqual(sorted);
  });

  it("has unique ids", () => {
    const ids = MILESTONES.map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("getNextMilestone", () => {
  it("returns the soonest future milestone when several are upcoming", () => {
    const next = getNextMilestone(new Date("2030-02-25T08:00:00"), FIXTURE);
    expect(next?.id).toBe("a");
  });

  it("skips past milestones and returns the next remaining one", () => {
    const next = getNextMilestone(new Date("2030-03-02T08:00:00"), FIXTURE);
    expect(next?.id).toBe("b");
  });

  it("walks correctly past midday boundaries", () => {
    const next = getNextMilestone(new Date("2030-03-03T10:00:00"), FIXTURE);
    expect(next?.id).toBe("c");
  });

  it("returns null when every milestone is in the past", () => {
    expect(getNextMilestone(new Date("2030-03-06T00:00:00"), FIXTURE)).toBeNull();
  });

  it("returns null exactly at the moment past the last milestone", () => {
    expect(getNextMilestone(new Date("2030-03-05T12:00:01"), FIXTURE)).toBeNull();
  });

  it("returns null for an empty list", () => {
    expect(getNextMilestone(new Date("2030-01-01T00:00:00"), [])).toBeNull();
  });

  it("uses the default `now` and list when not provided (smoke check)", () => {
    expect(() => getNextMilestone()).not.toThrow();
  });
});
