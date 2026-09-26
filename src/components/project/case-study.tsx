import Link from "next/link";
import type { ReactNode } from "react";

import { PROJECTS, type Project } from "@/config/projects";
import { siteConfig } from "@/config/site";

/**
 * <CaseStudy> — the shared skeleton for project pages that don't need a
 * bespoke interactive world (SpendInCheck, Sovereign Alpha, LameCRAFT).
 *
 * Colour comes entirely from the `.theme-<slug>` class the route's
 * layout wraps around it, so the markup here only ever reads
 * --color-* tokens. Numbering follows the site convention: § 01 pitch,
 * § 02 access, then the page's own sections from § 03.
 *
 * Server component — no client state.
 */

export type CaseStudyStat = {
  value: string;
  label: string;
};

export type CaseStudySection = {
  /** Short uppercase rail label, e.g. "Architecture". */
  label: string;
  heading: string;
  body: ReactNode;
};

type Props = {
  project: Project;
  stats: readonly CaseStudyStat[];
  /** Absolute date the stats were read, shown under the tiles. */
  statsAsOf?: string;
  sections: readonly CaseStudySection[];
};

function Rail({ number, label }: { number: string; label: string }) {
  return (
    <div className="col-span-12 flex flex-col gap-1 md:col-span-2">
      <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
        § {number}
      </p>
      <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase">
        {label}
      </p>
    </div>
  );
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export function CaseStudy({ project, stats, statsAsOf, sections }: Props) {
  const position = PROJECTS.findIndex((p) => p.slug === project.slug) + 1;

  return (
    <div className="relative mx-auto w-full max-w-[1400px] px-6 pt-16 pb-16 sm:pt-20">
      <div className="brutalist-grid" aria-hidden />

      {/* MASTHEAD */}
      <header className="mb-16 grid grid-cols-12 gap-4 border-b-2 border-[var(--color-border)] pb-6">
        <div className="col-span-6 flex flex-col gap-2 md:col-span-3">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            Author
          </p>
          <p className="font-mono text-sm font-medium">{siteConfig.author}</p>
        </div>
        <div className="col-span-6 flex flex-col gap-2 md:col-span-3">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            Project
          </p>
          <p className="font-mono text-sm font-medium">
            {pad(position)} / {project.name}
          </p>
        </div>
        <div className="col-span-6 flex flex-col gap-2 md:col-span-3">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            Status
          </p>
          <p className="font-mono text-sm font-medium text-[var(--color-primary)]">
            {project.statusLabel}
          </p>
        </div>
        <div className="col-span-6 flex flex-col gap-2 md:col-span-3">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            Navigate
          </p>
          <p className="font-mono text-sm font-medium">
            <Link href="/projects" className="hover:text-[var(--color-primary)]">
              ← projects
            </Link>
          </p>
        </div>
      </header>

      {/* § 01 — PITCH */}
      <section className="mb-20 grid grid-cols-12 gap-4">
        <Rail number="01" label="Pitch" />
        <div className="col-span-12 flex flex-col gap-8 md:col-span-10">
          <h1
            className="text-[clamp(3rem,8vw,6.5rem)] leading-[0.9] font-medium tracking-[-0.02em] text-[var(--color-primary)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {project.name}
          </h1>
          <p
            className="max-w-3xl text-2xl leading-snug font-medium text-[var(--color-fg)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {project.tagline}.
          </p>
          <p className="max-w-prose text-base leading-relaxed text-[var(--color-fg)]">
            {project.description}
          </p>
        </div>
      </section>

      {/* STATS */}
      {stats.length > 0 && (
        <section className="mb-20 grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-10 md:col-start-3">
            <ul className="grid grid-cols-2 gap-0 border-2 border-[var(--color-border)] md:grid-cols-4">
              {stats.map((s, i) => (
                <li
                  key={s.label}
                  className={
                    "flex flex-col gap-2 border-[var(--color-border)] p-5" +
                    (i % 2 === 0 ? " border-r-2" : "") +
                    (i < stats.length - 2 ? " border-b-2 md:border-b-0" : "") +
                    (i % 4 !== 3 && i !== stats.length - 1 ? " md:border-r-2" : " md:border-r-0")
                  }
                >
                  <span
                    className="text-3xl leading-none font-medium text-[var(--color-primary)]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {s.value}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--color-muted)] uppercase">
                    {s.label}
                  </span>
                </li>
              ))}
            </ul>
            {statsAsOf && (
              <p className="mt-3 font-mono text-[10px] tracking-[0.2em] text-[var(--color-muted)] uppercase">
                As of <time dateTime={statsAsOf}>{statsAsOf}</time>
              </p>
            )}
          </div>
        </section>
      )}

      {/* § 02 — ACCESS */}
      <section className="mb-20 grid grid-cols-12 gap-4 border-t-2 border-[var(--color-border)] pt-10">
        <Rail number="02" label="Access" />
        <div className="col-span-12 md:col-span-10">
          <ul className="grid grid-cols-1 gap-0 border-2 border-[var(--color-border)] md:grid-cols-2">
            <li className="flex flex-col gap-2 border-b-2 border-[var(--color-border)] p-6 md:border-r-2 md:border-b-0">
              <p className="font-mono text-[10px] tracking-[0.25em] text-[var(--color-muted)] uppercase">
                Live
              </p>
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-lg font-medium underline decoration-2 underline-offset-4 hover:text-[var(--color-primary)]"
                >
                  {project.liveUrl.replace(/^https?:\/\//, "")} ↗
                </a>
              ) : (
                <p className="font-mono text-lg font-medium text-[var(--color-muted)]">
                  Not publicly hosted
                </p>
              )}
            </li>
            <li className="flex flex-col gap-2 p-6">
              <p className="font-mono text-[10px] tracking-[0.25em] text-[var(--color-muted)] uppercase">
                Source
              </p>
              {project.repoUrl ? (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-lg font-medium underline decoration-2 underline-offset-4 hover:text-[var(--color-primary)]"
                >
                  {project.repoUrl.replace(/^https?:\/\//, "")} ↗
                </a>
              ) : (
                <p className="font-mono text-lg font-medium text-[var(--color-muted)]">
                  {project.sourceNote}
                </p>
              )}
            </li>
          </ul>
        </div>
      </section>

      {/* § 03+ — PAGE SECTIONS */}
      {sections.map((section, i) => (
        <section
          key={section.heading}
          className="mb-20 grid grid-cols-12 gap-4 border-t-2 border-[var(--color-border)] pt-10"
        >
          <Rail number={pad(i + 3)} label={section.label} />
          <div className="col-span-12 md:col-span-10">
            <h2
              className="mb-6 text-[clamp(1.75rem,3.5vw,3rem)] leading-tight font-medium tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {section.heading}
            </h2>
            <div className="case-study-prose max-w-3xl space-y-5 text-base leading-relaxed text-[var(--color-fg)]">
              {section.body}
            </div>
          </div>
        </section>
      ))}

      {/* STACK */}
      <section className="grid grid-cols-12 gap-4 border-t-2 border-[var(--color-border)] pt-10">
        <Rail number={pad(sections.length + 3)} label="Stack" />
        <div className="col-span-12 md:col-span-10">
          <ul className="flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <li
                key={item}
                className="border-2 border-[var(--color-border)] px-3 py-1.5 font-mono text-xs tracking-wide"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-10 font-mono text-[10px] tracking-[0.25em] text-[var(--color-muted)] uppercase">
            Started <time dateTime={project.startedISO}>{project.startedISO}</time>
            {project.lastUpdatedISO && (
              <>
                {" "}
                &middot; page reviewed{" "}
                <time dateTime={project.lastUpdatedISO}>{project.lastUpdatedISO}</time>
              </>
            )}
          </p>
        </div>
      </section>
    </div>
  );
}

/** Inline code span that reads the active theme. */
export function Code({ children }: { children: ReactNode }) {
  return (
    <code className="border border-[var(--color-border)] px-1 py-0.5 font-mono text-[0.9em]">
      {children}
    </code>
  );
}

/** A bulleted list styled for case-study prose. */
export function Points({ items }: { items: readonly ReactNode[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item, i) => (
        <li key={i} className="grid grid-cols-[1.25rem_1fr] gap-2">
          <span aria-hidden className="text-[var(--color-primary)]">
            ◈
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
