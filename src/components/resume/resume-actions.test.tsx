// @vitest-environment happy-dom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";

import { RESUME } from "@/config/resume";
import { ResumeActions } from "./resume-actions";

afterEach(() => {
  cleanup();
});

/**
 * ResumeActions is a client component with two buttons:
 *   - Print · Save as PDF (always visible)
 *   - Download PDF (gated on RESUME.hasPDF)
 *
 * RESUME.hasPDF is true (the PDF shipped 2026-09-27), so we test that the
 * print button works, the download link points at the PDF, and the old
 * "coming soon" notice is gone.
 */

describe("<ResumeActions />", () => {
  it("renders the Print · Save as PDF button", () => {
    render(<ResumeActions />);
    expect(screen.getByRole("button", { name: /print/i })).toBeInTheDocument();
  });

  it("calls window.print() when the Print button is clicked", () => {
    // happy-dom doesn't define window.print by default — stub it.
    const printMock = vi.fn();
    Object.defineProperty(window, "print", { value: printMock, configurable: true });

    render(<ResumeActions />);
    fireEvent.click(screen.getByRole("button", { name: /print/i }));
    expect(printMock).toHaveBeenCalledTimes(1);
  });

  it("links the PDF download to /resume/<pdfFilename> now that RESUME.hasPDF is true", () => {
    render(<ResumeActions />);
    const link = screen.getByRole("link", { name: /download pdf/i });
    expect(link).toHaveAttribute("href", `/resume/${RESUME.pdfFilename}`);
  });

  it("no longer shows the 'coming soon' fallback", () => {
    render(<ResumeActions />);
    expect(screen.queryByText(/coming soon/i)).toBeNull();
  });

  it("Print button has type=button so it can't accidentally submit a form", () => {
    render(<ResumeActions />);
    const btn = screen.getByRole("button", { name: /print/i });
    expect(btn).toHaveAttribute("type", "button");
  });
});
