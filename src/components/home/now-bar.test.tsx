// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";

import { NowBar } from "./now-bar";

afterEach(() => {
  cleanup();
});

/**
 * NowBar is a server component. Tests freeze the clock so rendered
 * state is deterministic. The AP-exam chip was retired on 2026-09-27;
 * one test guards that it never comes back.
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
