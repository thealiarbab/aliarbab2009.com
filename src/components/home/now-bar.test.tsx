// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";

import { NowBar } from "./now-bar";

afterEach(() => {
  cleanup();
});

/**
 * NowBar is a server component that calls getNextMilestone() at render
 * time. Tests freeze the clock so we can assert the rendered state for
 * specific calendar moments without flake.
 *
 * The "Next AP" branch and the "all four sat" fallback are exercised by
 * setting the system clock before/after the May 2026 AP window.
 */

describe("<NowBar />", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the school-year label", () => {
    vi.setSystemTime(new Date("2026-04-25T08:00:00"));
    render(<NowBar />);
    expect(screen.getByText(/Class XII · final year/)).toBeInTheDocument();
  });

  it("renders 'Now' / 'Live' chrome labels", () => {
    vi.setSystemTime(new Date("2026-04-25T08:00:00"));
    render(<NowBar />);
    expect(screen.getByText(/^Now$/i)).toBeInTheDocument();
    expect(screen.getByText(/^Live$/i)).toBeInTheDocument();
  });

  it("never mentions AP exams (scores and exams are private)", () => {
    vi.setSystemTime(new Date("2026-04-25T08:00:00"));
    const { container } = render(<NowBar />);
    expect(container.textContent).not.toMatch(/\bAPs?\b/);
  });

  it("uses semantic <aside> with aria-label", () => {
    vi.setSystemTime(new Date("2026-04-25T08:00:00"));
    const { container } = render(<NowBar />);
    const aside = container.querySelector("aside");
    expect(aside).not.toBeNull();
    expect(aside).toHaveAttribute("aria-label", "Current status");
  });

  it("links every current-work item to its project page", () => {
    render(<NowBar />);
    const links = screen.getAllByRole("link");
    expect(links.map((a) => a.getAttribute("href"))).toEqual(
      expect.arrayContaining(["/projects/stocksaathi", "/projects/bolhisaab", "/projects/maglock"]),
    );
  });
});
